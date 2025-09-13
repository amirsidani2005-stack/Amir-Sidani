import React, { useState, useCallback } from 'react';
import { Header } from './components/ui/Header';
import { GradeForm } from './components/GradeForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { AllDepartmentsScreen } from './components/AllDepartmentsScreen';
import { FullListScreen } from './components/FullListScreen';
import { PdfViewScreen } from './components/PdfViewScreen';
import { getAiCollegeSuggestions } from './services/geminiService';
import type { Branch, System, CollegeType, HistoricalSuggestion } from './types';

const ITEMS_PER_PAGE = 10;

const App: React.FC = () => {
  const [allSuggestions, setAllSuggestions] = useState<HistoricalSuggestion[]>([]);
  const [displayedSuggestions, setDisplayedSuggestions] = useState<HistoricalSuggestion[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [searchYears, setSearchYears] = useState<{ start: string; end: string } | null>(null);
  const [lastUsedSystem, setLastUsedSystem] = useState<System>('zankoline');
  const [lastUsedGpa, setLastUsedGpa] = useState<number>(0);

  const [view, setView] = useState<'calculator' | 'allDepartments' | 'fullList' | 'pdfView'>('calculator');

  const handleCalculate = useCallback(async (gpa: string, branch: Branch, system: System, city: string, collegeType: CollegeType, startYear: string, endYear: string) => {
    setIsCalculating(true);
    setError(null);
    setDisplayedSuggestions([]);
    setAllSuggestions([]);
    setCurrentPage(1);
    setHasMore(false);
    setSearchYears({ start: startYear, end: endYear });
    setLastUsedSystem(system);
    setLastUsedGpa(parseFloat(gpa));
    
    try {
      const results = await getAiCollegeSuggestions(gpa, branch, system, city, collegeType, startYear, endYear);
      setAllSuggestions(results);
      setDisplayedSuggestions(results.slice(0, ITEMS_PER_PAGE));
      setHasMore(results.length > ITEMS_PER_PAGE);
    } catch (err) {
      console.error("Error during AI calculation:", err);
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`ببورە، کێشەیەک دروست بوو.هیڤییە جارەکا دی هەول بدە. ${message}`);
    } finally {
      setIsCalculating(false);
      setTimeout(() => {
        document.getElementById('results-anchor')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);
  
  const handleLoadMore = () => {
    if (isFetchingMore) return;
    setIsFetchingMore(true);
    setTimeout(() => {
        const newPage = currentPage + 1;
        const newSuggestions = allSuggestions.slice(0, newPage * ITEMS_PER_PAGE);
        setDisplayedSuggestions(newSuggestions);
        setCurrentPage(newPage);
        setHasMore(allSuggestions.length > newSuggestions.length);
        setIsFetchingMore(false);
    }, 300);
  };
  
  const renderView = () => {
    switch(view) {
      case 'calculator':
        return (
          <>
            <GradeForm onCalculate={handleCalculate} isCalculating={isCalculating} />
            <div id="results-anchor" className="mt-12"></div>
            <ResultsDisplay
              suggestions={displayedSuggestions}
              error={error}
              isCalculating={isCalculating}
              searchYears={searchYears}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              isFetchingMore={isFetchingMore}
              system={lastUsedSystem}
              studentGpa={lastUsedGpa}
            />
          </>
        );
      case 'allDepartments':
        return <AllDepartmentsScreen onBack={() => setView('calculator')} />;
      case 'fullList':
        return <FullListScreen onBack={() => setView('calculator')} />;
      case 'pdfView':
        return <PdfViewScreen onBack={() => setView('calculator')} />;
      default:
        return <GradeForm onCalculate={handleCalculate} isCalculating={isCalculating} />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {renderView()}
      </main>
      <footer className="text-center py-6 text-slate-500 space-y-4">
         <div className="flex justify-center items-center gap-4 flex-wrap">
            <button onClick={() => setView('calculator')} className={`text-indigo-500 hover:underline px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors ${view === 'calculator' ? 'font-bold' : ''}`}>
              ژمێرەری زیرەک
            </button>
             <button onClick={() => setView('allDepartments')} className={`text-indigo-500 hover:underline px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors ${view === 'allDepartments' ? 'font-bold' : ''}`}>
              لیستا هەمی بەشان
            </button>
             <button onClick={() => setView('fullList')} className={`text-indigo-500 hover:underline px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors ${view === 'fullList' ? 'font-bold' : ''}`}>
              لیستا گشتی یا کونمران
            </button>
            <button onClick={() => setView('pdfView')} className={`text-indigo-500 hover:underline px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors ${view === 'pdfView' ? 'font-bold' : ''}`}>
              کونمرێن پارێزگەها دهۆک
            </button>
         </div>
        <p>
          &copy; {new Date().getFullYear()} Amir Sidani. All rights reserved. &bull; Developed by{' '}
          <a href="https://snapchat.com/t/kwnquCVU" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
            Amir Sidani
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
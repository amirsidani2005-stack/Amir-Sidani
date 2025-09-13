import React from 'react';
import type { HistoricalSuggestion, System } from '../types';

interface ResultsDisplayProps {
  suggestions: HistoricalSuggestion[];
  error: string | null;
  isCalculating: boolean;
  searchYears: { start: string; end: string } | null;
  onLoadMore: () => void;
  hasMore: boolean;
  isFetchingMore: boolean;
  system: System;
  studentGpa: number;
}

const LoadingSpinner: React.FC<{text: string}> = ({ text }) => (
    <div className="flex flex-col items-center justify-center gap-4 text-slate-600 py-10" role="status" aria-live="polite">
        <svg 
            className="animate-spin h-10 w-10 text-blue-600" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24"
        >
            <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
            ></circle>
            <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
        <p className="text-lg font-medium lang-ku" dir="rtl">{text}</p>
        <span className="sr-only">Loading...</span>
    </div>
);

const SuggestionCard: React.FC<{ suggestion: HistoricalSuggestion; system: System; studentGpa: number; }> = ({ suggestion, system, studentGpa }) => {
    const targetGpa = system === 'parallel'
        ? suggestion.matchedGpa.minGpaParallel
        : suggestion.matchedGpa.minGpa;
    
    if (!targetGpa || targetGpa <= 0) return null;

    const isAccepted = studentGpa >= targetGpa;
    const statusText = isAccepted ? 'وەرگرتنا تە مسوگەرە' : 'چانسێ وەرگرتنێ کێمە';
    const statusColor = isAccepted ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800';

    return (
        <div className="bg-white p-5 rounded-xl shadow-md border border-slate-200 transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 lang-ku" dir="rtl">
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-slate-800">{suggestion.name}</h3>
                    <p className="text-slate-600">{suggestion.university}</p>
                    <p className="text-sm text-slate-500">{suggestion.city} • {suggestion.type === 'college' ? 'کۆلیژ' : 'پەیمانگەه'}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                    <div className="text-sm text-slate-500">کونمرە ({suggestion.matchedGpa.year})</div>
                    <div className="text-2xl font-extrabold text-indigo-600">{targetGpa.toFixed(2)}</div>
                </div>
            </div>
            <div className={`mt-4 text-center text-sm font-bold px-3 py-1.5 rounded-md ${statusColor}`}>
                {statusText}
            </div>
        </div>
    );
}


export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ suggestions, error, isCalculating, searchYears, onLoadMore, hasMore, isFetchingMore, system, studentGpa }) => {
  if (isCalculating) {
    return (
       <div id="results" className="w-full max-w-5xl mx-auto animate-fade-in">
         <LoadingSpinner text="لدیڤ ئەنجامان دگەڕیێت..." />
       </div>
    );
  }
  
  if (error) {
    return (
       <div id="results" className="w-full max-w-5xl mx-auto animate-fade-in text-center bg-red-100 border border-red-400 text-red-700 px-4 py-6 rounded-lg">
          <h3 className="font-bold text-xl lang-ku" dir="rtl">کێشەیەک ڕوویدا</h3>
          <p>{error}</p>
       </div>
    );
  }

  if (suggestions.length === 0 && searchYears) {
     return (
        <div id="results" className="w-full max-w-5xl mx-auto animate-fade-in mt-8 text-center bg-white p-8 rounded-lg shadow-md border border-amber-300">
          <p className="text-lg font-semibold text-slate-700 lang-ku" dir="rtl">
            ببورە، هیچ ئەنجامەک لدیڤ هەلبژارتنێن تە نەهاتە دیتن.
          </p>
           <p className="text-slate-500 mt-2 lang-ku" dir="rtl">
             تکایە هەلبژارتنێن خۆ بگوهۆڕە و دووبارە هەول بدە.
          </p>
        </div>
      );
  }

  if (suggestions.length === 0) {
      return null;
  }
  
  const resultsTitle = searchYears
    ? `ئەنجامێن وەرگرتنێ (${searchYears.start} - ${searchYears.end})`
    : 'ئەنجامێن وەرگرتنێ';

  return (
    <div id="results" className="w-full max-w-5xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center lang-ku" dir="rtl">
        {resultsTitle}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestions.map((suggestion) => (
          <SuggestionCard 
            key={`${suggestion.name}-${suggestion.university}`} 
            suggestion={suggestion}
            system={system}
            studentGpa={studentGpa}
          />
        ))}
      </div>

       {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={onLoadMore}
            disabled={isFetchingMore}
            className="px-8 py-3 bg-indigo-100 text-indigo-700 font-bold rounded-lg hover:bg-indigo-200 disabled:opacity-50 transition-colors"
          >
            {isFetchingMore ? 'بارکرن...' : 'پتر ببینە'}
          </button>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import type { Level, Unit, Progress } from '../../types';

interface LevelScreenProps {
  level: Level;
  progress: Progress;
  isUnitUnlocked: (unitId: string) => boolean;
  onSelectUnit: (unit: Unit) => void;
  onGenerateUnit: () => void;
  isGenerating: boolean;
}

const BookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
);

const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export const LevelScreen: React.FC<LevelScreenProps> = ({ level, progress, isUnitUnlocked, onSelectUnit, onGenerateUnit, isGenerating }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-2">{level.title}</h1>
      <p className="text-lg text-slate-600 text-center mb-10">Select a unit to start learning.</p>

      <div className="relative flex flex-col items-center gap-12">
        {/* Dashed line path */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 h-[calc(100%-4rem)] border-l-2 border-dashed border-slate-300"></div>

        {level.units.map((unit) => {
          const unitProgress = progress[unit.id];
          const isCompleted = unitProgress && unitProgress.completedLessons.length === unit.lessons.length;
          const isUnlocked = isUnitUnlocked(unit.id);
          
          let statusClasses = 'bg-slate-400 text-white';
          let Icon = LockIcon;
          if (isUnlocked) {
            statusClasses = 'bg-blue-500 text-white';
            Icon = BookIcon;
          }
          if (isCompleted) {
            statusClasses = 'bg-green-500 text-white';
            Icon = CheckCircleIcon;
          }

          return (
            <div key={unit.id} className="relative z-10 w-full max-w-lg">
               <button
                onClick={() => isUnlocked && onSelectUnit(unit)}
                disabled={!isUnlocked}
                className="group w-full flex items-center gap-4 p-4 rounded-xl border bg-white shadow-sm transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:enabled:scale-105 hover:enabled:shadow-md"
               >
                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${statusClasses} transition-colors duration-300`}>
                    <Icon className="w-8 h-8"/>
                </div>
                <div className="text-left flex-grow">
                    <h3 className="text-lg font-bold text-slate-800">{unit.title}</h3>
                    <p className="text-slate-500">{unit.description}</p>
                </div>
               </button>
            </div>
          );
        })}
        
        <div className="relative z-10 w-full max-w-lg mt-8">
            <button
                onClick={onGenerateUnit}
                disabled={isGenerating}
                className="w-full py-3 px-6 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-wait transition-all duration-200 flex items-center justify-center gap-2"
            >
                {isGenerating ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Creating New Unit...
                    </>
                ) : (
                    '✨ Generate New Unit with AI'
                )}
            </button>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import type { Unit } from '../types';

interface UnitPathProps {
  units: Unit[];
  completedUnits: string[];
  onSelectUnit: (unit: Unit) => void;
}

const BookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
);

const LockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

export const UnitPath: React.FC<UnitPathProps> = ({ units, completedUnits, onSelectUnit }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative flex flex-col items-center gap-12">
        {/* Dashed line path */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 h-full border-l-2 border-dashed border-slate-300"></div>

        {units.map((unit, index) => {
          const isCompleted = completedUnits.includes(unit.id);
          const isCurrent = completedUnits.length === index;
          const isLocked = index > completedUnits.length;

          let statusClasses = 'bg-slate-400 text-white';
          if (isCompleted) statusClasses = 'bg-green-500 text-white';
          if (isCurrent) statusClasses = 'bg-blue-500 text-white animate-pulse';

          return (
            <div key={unit.id} className="relative z-10 w-full max-w-md">
               <button
                onClick={() => !isLocked && onSelectUnit(unit)}
                disabled={isLocked}
                className="group w-full flex items-center gap-4 p-4 rounded-xl border bg-white shadow-sm transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:scale-105 hover:enabled:shadow-md"
               >
                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${statusClasses}`}>
                    {isLocked ? <LockIcon className="w-8 h-8"/> : <BookIcon className="w-8 h-8"/>}
                </div>
                <div className="text-left">
                    <h3 className="text-lg font-bold">{unit.title}</h3>
                    <p className="text-slate-500">{unit.description}</p>
                </div>
               </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

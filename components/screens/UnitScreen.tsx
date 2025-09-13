import React from 'react';
import type { Unit, Lesson } from '../../types';

interface UnitScreenProps {
  unit: Unit;
  progress?: { completedLessons: string[] };
  onSelectLesson: (unit: Unit, lesson: Lesson) => void;
  onBack: () => void;
}

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export const UnitScreen: React.FC<UnitScreenProps> = ({ unit, progress, onSelectLesson, onBack }) => {
  const completedLessons = progress?.completedLessons || [];

  return (
    <div className="w-full max-w-3xl mx-auto">
        <button onClick={onBack} className="mb-6 text-sm font-medium text-slate-600 hover:text-slate-800 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Level Path
        </button>

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 mb-8">
        <h1 className="text-3xl font-bold text-slate-800">{unit.title}</h1>
        <p className="mt-2 text-slate-600 text-lg">{unit.description}</p>
      </div>

      <div className="space-y-4">
        {unit.lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          // A lesson is unlocked if it's the first one, or the previous one is completed.
          const isUnlocked = index === 0 || completedLessons.includes(unit.lessons[index - 1]?.id);

          return (
            <button
              key={lesson.id}
              onClick={() => isUnlocked && onSelectLesson(unit, lesson)}
              disabled={!isUnlocked}
              className="w-full flex items-center justify-between p-4 sm:p-5 bg-white rounded-xl shadow-sm border-2 border-transparent transition-all duration-200 hover:enabled:border-blue-500 hover:enabled:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-100 text-green-500' : 'bg-blue-100 text-blue-500'}`}>
                    {isCompleted ? <CheckCircleIcon className="w-7 h-7" /> : <PlayIcon className="w-7 h-7" />}
                </div>
                <span className="text-lg font-semibold text-slate-700">{lesson.title}</span>
              </div>
              {!isUnlocked && <div className="text-slate-400">Locked</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
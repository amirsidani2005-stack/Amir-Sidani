import React, { useState } from 'react';
import type { ImageChoiceActivity as ActivityProps } from '../../types';

interface ImageChoiceActivityProps {
  activity: ActivityProps;
  onAnswer: (isCorrect: boolean) => void;
}

export const ImageChoiceActivity: React.FC<ImageChoiceActivityProps> = ({ activity, onAnswer }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleCheck = () => {
    if (isAnswered || !selectedId) return;
    
    setIsAnswered(true);
    onAnswer(selectedId === activity.correctAnswerId);
  };
  
  const getButtonClass = (optionId: string) => {
    if (isAnswered) {
        if (optionId === activity.correctAnswerId) {
            return 'border-green-500 bg-green-100 ring-2 ring-green-500';
        }
        if (optionId === selectedId) {
            return 'border-red-500 bg-red-100';
        }
        return 'border-slate-200 bg-slate-100 opacity-50';
    }
    if (optionId === selectedId) {
        return 'border-blue-500 bg-blue-100 ring-2 ring-blue-500';
    }
    return 'border-slate-200 bg-white hover:bg-slate-100';
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-xl text-slate-700 font-semibold mb-6">Which one is "{activity.prompt}"?</p>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {activity.options.map(option => (
          <button
            key={option.id}
            onClick={() => setSelectedId(option.id)}
            disabled={isAnswered}
            className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 aspect-square ${getButtonClass(option.id)}`}
          >
            <span className="text-6xl">{option.label}</span>
          </button>
        ))}
      </div>

       {!isAnswered && (
          <div className="w-full max-w-sm pt-6">
              <button
                onClick={handleCheck}
                disabled={!selectedId}
                className="w-full p-4 rounded-xl bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                >
                Check
              </button>
          </div>
      )}
    </div>
  );
};

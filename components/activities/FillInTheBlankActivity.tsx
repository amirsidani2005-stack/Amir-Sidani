import React, { useState } from 'react';
import type { FillInTheBlankActivity as ActivityProps } from '../../types';

interface FillInTheBlankActivityProps {
  activity: ActivityProps;
  onAnswer: (isCorrect: boolean) => void;
}

export const FillInTheBlankActivity: React.FC<FillInTheBlankActivityProps> = ({ activity, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleCheck = () => {
    if (isAnswered || !selectedOption) return;

    setIsAnswered(true);
    onAnswer(selectedOption === activity.correctAnswer);
  };
  
  const getButtonClass = (option: string) => {
    if (isAnswered) {
        if (option === activity.correctAnswer) {
            return 'bg-green-100 border-green-500 text-green-700 font-bold';
        }
        if (option === selectedOption) {
            return 'bg-red-100 border-red-500 text-red-700';
        }
        return 'bg-slate-100 border-slate-200 text-slate-400 opacity-70';
    }
    
    if (option === selectedOption) {
        return 'bg-blue-100 border-blue-500';
    }
    
    return 'bg-white hover:bg-slate-50 border-slate-200';
  };

  const blank = <span className="inline-block bg-slate-200 rounded-md px-4 py-1 mx-2 text-slate-400">___</span>;
  const filledAnswer = (
    <span className={`font-bold mx-2 px-2 rounded-md ${selectedOption === activity.correctAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {selectedOption}
    </span>
    );


  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <p className="text-lg text-slate-600">Complete the sentence:</p>
      
      <div className="bg-slate-100 p-6 rounded-lg w-full text-center">
        <p className="text-2xl font-medium text-slate-800 leading-relaxed">
            {activity.promptParts.part1}
            {isAnswered ? filledAnswer : blank}
            {activity.promptParts.part2}
        </p>
      </div>
      
      <div className="w-full grid grid-cols-2 gap-3 pt-4">
        {activity.options.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedOption(option)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-xl border-2 text-center text-lg font-semibold transition-all duration-200 ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>

       {!isAnswered && (
          <div className="w-full pt-4">
              <button
                onClick={handleCheck}
                disabled={!selectedOption}
                className="w-full p-4 rounded-xl bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                >
                Check
              </button>
          </div>
      )}
    </div>
  );
};

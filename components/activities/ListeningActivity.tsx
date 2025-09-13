import React, { useState, useEffect } from 'react';
import type { ListeningActivity as ActivityProps } from '../../types';

interface ListeningActivityProps {
  activity: ActivityProps;
  onAnswer: (isCorrect: boolean) => void;
}

const SpeakerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
);

export const ListeningActivity: React.FC<ListeningActivityProps> = ({ activity, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      // Cancel any previous speech to prevent overlap
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activity.prompt);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  useEffect(() => {
    // A small delay can help ensure speech synthesis is ready
    const timer = setTimeout(() => speak(), 100);
    return () => clearTimeout(timer);
  }, [activity.id]);

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

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p className="text-lg text-slate-600">Select what you hear:</p>
      <button 
        onClick={speak}
        className="p-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform hover:scale-110"
        aria-label="Listen to the phrase again"
      >
        <SpeakerIcon className="w-10 h-10" />
      </button>
      
      <div className="w-full space-y-3 pt-4">
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

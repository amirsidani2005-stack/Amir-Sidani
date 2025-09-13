import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import type { MultipleChoiceActivity as ActivityProps } from '../../types';
import { getWordTranslation } from '../../services/geminiService';

interface TooltipState {
  word: string;
  text: string;
  rect: DOMRect;
}

interface MultipleChoiceActivityProps {
  activity: ActivityProps;
  onAnswer: (isCorrect: boolean) => void;
}

export const MultipleChoiceActivity: React.FC<MultipleChoiceActivityProps> = ({ activity, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [translationsCache, setTranslationsCache] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('[data-word]')) {
        return;
      }
      setTooltip(null);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
  const handleCheck = () => {
      if (isAnswered || !selectedOption) return;

      setIsAnswered(true);
      setTooltip(null);
      const isCorrect = selectedOption === activity.correctAnswer;
      onAnswer(isCorrect);
  };

  const handleWordClick = async (word: string, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); 
    const cleanWord = word.replace(/[.,?؟]/g, '');

    if (!cleanWord || isAnswered) return;

    if (tooltip && tooltip.word === word) {
      setTooltip(null);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();

    if (translationsCache[cleanWord]) {
      setTooltip({ word, text: translationsCache[cleanWord], rect });
      return;
    }

    setTooltip({ word, text: '...', rect }); 
    try {
      const translation = await getWordTranslation(cleanWord);
      setTranslationsCache(prev => ({ ...prev, [cleanWord]: translation }));
      setTooltip(currentTooltip => {
        if (currentTooltip && currentTooltip.word === word) {
          return { ...currentTooltip, text: translation };
        }
        return currentTooltip;
      });
    } catch (err) {
      console.error(err);
      setTooltip(currentTooltip => (currentTooltip && currentTooltip.word === word ? null : currentTooltip));
    }
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
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg text-slate-600">Translate this phrase:</p>
      <h2 className="text-4xl font-bold lang-ku flex flex-wrap justify-center gap-x-4 gap-y-2 leading-loose text-center">
        {activity.kurdishPrompt.split(' ').map((word, index) => (
          <span
            key={index}
            data-word={word}
            onClick={(e) => handleWordClick(word, e)}
            className={`cursor-pointer hover:bg-blue-100 rounded-md px-1 transition-colors duration-200 ${isAnswered ? 'cursor-default hover:bg-transparent' : ''}`}
          >
            {word}
          </span>
        ))}
      </h2>
      
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
      
      {tooltip && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            top: `${tooltip.rect.top}px`,
            left: `${tooltip.rect.left + tooltip.rect.width / 2}px`,
            transform: 'translate(-50%, -110%)',
            zIndex: 100,
          }}
          className="bg-slate-800 text-white text-sm font-semibold rounded-md px-3 py-1.5 shadow-lg animate-fade-in-up"
        >
          {tooltip.text}
          <div 
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-slate-800"
            style={{ transform: 'translateX(-50%) translateY(100%)' }}
          ></div>
        </div>,
        document.body
      )}
    </div>
  );
};

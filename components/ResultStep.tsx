import React, { useState } from 'react';
// Fix: Use the existing 'MultipleChoiceActivity' type instead of the missing 'Quiz' type.
import type { MultipleChoiceActivity as QuizType } from '../types';

interface QuizProps {
  quiz: QuizType;
  onAnswer: (isCorrect: boolean) => void;
}

export const Quiz: React.FC<QuizProps> = ({ quiz, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    
    setSelectedOption(option);
    setIsAnswered(true);
    // Fix: Use 'correctAnswer' property from 'MultipleChoiceActivity' type.
    const isCorrect = option === quiz.correctAnswer;
    onAnswer(isCorrect);
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-slate-50 border-slate-200';
    }
    // Fix: Use 'correctAnswer' property.
    if (option === quiz.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-700 font-bold';
    }
    // Fix: Use 'correctAnswer' property.
    if (option === selectedOption && option !== quiz.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-700';
    }
    return 'bg-slate-100 border-slate-200 text-slate-400';
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-lg text-slate-600">Translate this word:</p>
      {/* // Fix: Use 'kurdishPrompt' property from 'MultipleChoiceActivity' type. */}
      <h2 className="text-4xl font-bold lang-ku" dir="rtl">{quiz.kurdishPrompt}</h2>
      
      <div className="w-full space-y-3 pt-4">
        {quiz.options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelectOption(option)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-xl border-2 text-center text-lg font-semibold transition-all duration-200 ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        // Fix: Use 'correctAnswer' property for comparison.
        <div className={`fixed bottom-0 left-0 right-0 p-4 text-white text-center font-bold text-xl transition-transform duration-300 ${isAnswered ? 'translate-y-0' : 'translate-y-full'} ${selectedOption === quiz.correctAnswer ? 'bg-green-500' : 'bg-red-500'}`}>
          {selectedOption === quiz.correctAnswer ? 'Correct! +10 XP' : 'Incorrect!'}
        </div>
      )}
    </div>
  );
};

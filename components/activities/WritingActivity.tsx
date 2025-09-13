import React, { useState } from 'react';
import type { WritingActivity as ActivityProps } from '../../types';

interface WritingActivityProps {
  activity: ActivityProps;
  onAnswer: (isCorrect: boolean) => void;
}

export const WritingActivity: React.FC<WritingActivityProps> = ({ activity, onAnswer }) => {
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered) return;

    const formattedUserInput = userInput.trim().toLowerCase();
    const formattedCorrectAnswer = activity.correctAnswer.trim().toLowerCase();
    const correct = formattedUserInput === formattedCorrectAnswer;
    
    setIsCorrect(correct);
    setIsAnswered(true);
    onAnswer(correct);
  };

  const getInputClass = () => {
    if (!isAnswered) {
      return 'border-slate-300 focus:border-blue-500 focus:ring-blue-500';
    }
    return isCorrect 
      ? 'border-green-500 bg-green-50 ring-green-500' 
      : 'border-red-500 bg-red-50 ring-red-500';
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <p className="text-lg text-slate-600">Write this in English:</p>
      <h2 className="text-4xl font-bold lang-ku text-center">{activity.kurdishPrompt}</h2>
      
      <form onSubmit={handleSubmit} className="w-full space-y-4 pt-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type in English..."
          disabled={isAnswered}
          aria-label="Your answer"
          autoCapitalize="none"
          autoFocus
          className={`w-full p-4 rounded-xl border-2 text-center text-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 ${getInputClass()}`}
        />
        <button
          type="submit"
          disabled={isAnswered || userInput.trim() === ''}
          className="w-full p-4 rounded-xl bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
        >
          Check
        </button>
      </form>
    </div>
  );
};

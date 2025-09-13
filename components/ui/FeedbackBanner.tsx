import React from 'react';

interface FeedbackBannerProps {
  status: 'correct' | 'incorrect' | null;
  onContinue: () => void;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({ status, onContinue }) => {
  if (!status) return null;

  const isCorrect = status === 'correct';
  
  const baseBg = isCorrect ? 'bg-green-100' : 'bg-red-100';
  const accentColor = isCorrect ? 'text-green-600' : 'text-red-600';
  const buttonBg = isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';

  const text = isCorrect ? 'Excellent!' : 'Incorrect.';

  return (
    <div className={`fixed bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${status ? 'translate-y-0' : 'translate-y-full'} ${baseBg}`}>
       <div className="container mx-auto max-w-2xl flex justify-between items-center">
            <h2 className={`text-xl font-bold ${accentColor}`}>{text}</h2>
            <button 
                onClick={onContinue}
                className={`px-8 py-3 text-white font-bold rounded-lg shadow-md transition-colors ${buttonBg}`}
            >
                Continue
            </button>
       </div>
    </div>
  );
};

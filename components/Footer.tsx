import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-stone-500 fade-in-delay-3">
        <p>
          Powered by the Gemini API &bull; Developed by <a href="https://snapchat.com/t/kwnquCVU" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Vauzher</a>
        </p>
      </div>
    </footer>
  );
};

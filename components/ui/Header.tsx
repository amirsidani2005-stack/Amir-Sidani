import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md z-10 sticky top-0">
      <div className="container mx-auto px-4 py-5 text-center">
        <h1 className="text-3xl font-bold lang-ku" dir="rtl">
          ڕێبەری وەرگرتن بۆ پۆلا دوازدێ
        </h1>
        <p className="text-blue-100 mt-1">Kurdistan 12th Grade College Guide </p>
      </div>
    </header>
  );
};

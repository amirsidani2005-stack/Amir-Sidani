import React from 'react';
import type { VocabularyWord } from '../../types';

interface LearningCardProps {
    word: VocabularyWord;
}

export const LearningCard: React.FC<LearningCardProps> = ({ word }) => {
    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 flex flex-col items-center gap-4">
            {word.emoji && <div className="text-7xl mb-4">{word.emoji}</div>}
            <div className="text-center">
                <p className="text-4xl font-bold text-slate-800">{word.english}</p>
                <p className="text-3xl font-semibold text-blue-600 lang-ku mt-2">{word.kurdish}</p>
            </div>
        </div>
    );
};

import React, { useState, useMemo, useEffect } from 'react';
import type { MatchPairsActivity as ActivityProps, MatchPair } from '../../types';

// Utility to shuffle an array
const shuffle = <T,>(array: T[]): T[] => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

interface MatchPairsActivityProps {
  activity: ActivityProps;
  onAnswer: (isCorrect: boolean) => void;
}

export const MatchPairsActivity: React.FC<MatchPairsActivityProps> = ({ activity, onAnswer }) => {
  const [selectedKurdish, setSelectedKurdish] = useState<MatchPair | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<MatchPair | null>(null);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);

  const { kurdishWords, englishWords } = useMemo(() => {
    const pairs = activity.pairs;
    return {
      kurdishWords: shuffle([...pairs]),
      englishWords: shuffle([...pairs]),
    };
  }, [activity.id]);

  useEffect(() => {
    if (selectedKurdish && selectedEnglish) {
      if (selectedKurdish.id === selectedEnglish.id) {
        // Correct match
        setMatchedIds(prev => [...prev, selectedKurdish.id]);
        setSelectedKurdish(null);
        setSelectedEnglish(null);
      } else {
        // Incorrect match, reset after a delay
        setTimeout(() => {
          setSelectedKurdish(null);
          setSelectedEnglish(null);
        }, 800);
      }
    }
  }, [selectedKurdish, selectedEnglish]);

  useEffect(() => {
    if (matchedIds.length === activity.pairs.length) {
      onAnswer(true);
    }
  }, [matchedIds]);

  const getButtonClass = (word: MatchPair, type: 'kurdish' | 'english') => {
    if (matchedIds.includes(word.id)) {
      return 'bg-green-100 border-green-500 text-green-700 cursor-not-allowed';
    }
    if ((type === 'kurdish' && selectedKurdish?.id === word.id) || (type === 'english' && selectedEnglish?.id === word.id)) {
        // Check for incorrect selection
        if (selectedKurdish && selectedEnglish && selectedKurdish.id !== selectedEnglish.id) {
            return 'bg-red-100 border-red-500 animate-shake';
        }
        return 'bg-blue-100 border-blue-500';
    }
    return 'bg-white hover:bg-slate-50 border-slate-200';
  };

  const handleSelect = (word: MatchPair, type: 'kurdish' | 'english') => {
    if (matchedIds.includes(word.id)) return;
    
    if (type === 'kurdish') {
      setSelectedKurdish(word);
    } else {
      setSelectedEnglish(word);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p className="text-lg text-slate-600 font-semibold">Match the pairs</p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <div className="space-y-3">
          {kurdishWords.map(word => (
            <button
              key={`ku-${word.id}`}
              onClick={() => handleSelect(word, 'kurdish')}
              disabled={matchedIds.includes(word.id) || !!selectedKurdish}
              className={`w-full p-4 rounded-xl border-2 text-center text-lg font-semibold transition-all duration-200 lang-ku disabled:opacity-70 ${getButtonClass(word, 'kurdish')}`}
            >
              {word.kurdish}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {englishWords.map(word => (
            <button
              key={`en-${word.id}`}
              onClick={() => handleSelect(word, 'english')}
              disabled={matchedIds.includes(word.id) || !!selectedEnglish}
              className={`w-full p-4 rounded-xl border-2 text-center text-lg font-semibold transition-all duration-200 disabled:opacity-70 ${getButtonClass(word, 'english')}`}
            >
              {word.english}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

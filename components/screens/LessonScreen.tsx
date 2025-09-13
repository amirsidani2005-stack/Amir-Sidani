import React, { useState, useEffect } from 'react';
import type { Unit, Lesson, Activity, VocabularyWord } from '../../types';
import { generateActivity, generateLessonVocabulary } from '../../services/geminiService';

import { ProgressBar } from '../ui/ProgressBar';
import { FeedbackBanner } from '../ui/FeedbackBanner';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { LearningCard } from '../ui/LearningCard';

import { MultipleChoiceActivity } from '../activities/MultipleChoiceActivity';
import { ImageChoiceActivity } from '../activities/ImageChoiceActivity';
import { WritingActivity } from '../activities/WritingActivity';
import { ListeningActivity } from '../activities/ListeningActivity';
import { MatchPairsActivity } from '../activities/MatchPairsActivity';
import { FillInTheBlankActivity } from '../activities/FillInTheBlankActivity';

interface LessonScreenProps {
  unit: Unit;
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

const TOTAL_ROUNDS = 20;
const LEARNING_ROUNDS = 10;
const QUIZ_ROUNDS = TOTAL_ROUNDS - LEARNING_ROUNDS;

export const LessonScreen: React.FC<LessonScreenProps> = ({ unit, lesson, onComplete, onBack }) => {
  const [vocabulary, setVocabulary] = useState<VocabularyWord[] | null>(null);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [phase, setPhase] = useState<'loading' | 'learning' | 'quizzing'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const fetchNextActivity = async (vocab: VocabularyWord[], quizIndex: number) => {
    setPhase('loading');
    setCurrentActivity(null);
    setError(null);
    try {
      const activity = await generateActivity("A1: Beginner", lesson.title, vocab, quizIndex);
      setCurrentActivity(activity);
      setPhase('quizzing');
    } catch (err) {
      console.error("Failed to generate activity", err);
      const errorMessage = err instanceof Error ? err.message : "Please try again.";
      setError(`Could not create a new activity. ${errorMessage}`);
      setPhase('quizzing'); // Set back to quizzing to show error message
    }
  };

  useEffect(() => {
    const startLesson = async () => {
        setPhase('loading');
        setError(null);
        try {
            const vocab = await generateLessonVocabulary(lesson.title);
            if (vocab.length < LEARNING_ROUNDS) {
              console.warn(`Generated vocabulary (${vocab.length}) is less than required learning rounds (${LEARNING_ROUNDS}). The lesson might be shorter.`);
            }
            setVocabulary(vocab);
            setPhase('learning');
            setCompletedCount(0);
        } catch (err) {
            console.error("Failed to generate vocabulary", err);
            const errorMessage = err instanceof Error ? err.message : "Please try again.";
            setError(`Could not start the lesson. ${errorMessage}`);
        }
    };
    startLesson();
  }, [lesson.id, lesson.title]);

  const handleContinue = () => {
    setFeedback(null);
    const newCompletedCount = completedCount + 1;

    if (newCompletedCount >= TOTAL_ROUNDS) {
      setCompletedCount(TOTAL_ROUNDS);
      setTimeout(onComplete, 500);
      return;
    }

    setCompletedCount(newCompletedCount);

    if (newCompletedCount === LEARNING_ROUNDS) {
      if (vocabulary) {
        fetchNextActivity(vocabulary, 0); // Start quizzes
      } else {
        setError("Lesson vocabulary is missing. Cannot proceed.");
      }
    } else if (newCompletedCount > LEARNING_ROUNDS) {
      if (vocabulary) {
        const quizIndex = newCompletedCount - LEARNING_ROUNDS;
        fetchNextActivity(vocabulary, quizIndex);
      } else {
        setError("Lesson vocabulary is missing. Cannot proceed.");
      }
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    setFeedback(isCorrect ? 'correct' : 'incorrect');
  };

  const renderActivity = (activity: Activity) => {
    switch (activity.type) {
      case 'MULTIPLE_CHOICE':
        return <MultipleChoiceActivity activity={activity} onAnswer={handleAnswer} />;
      case 'IMAGE_CHOICE':
        return <ImageChoiceActivity activity={activity} onAnswer={handleAnswer} />;
      case 'WRITING':
        return <WritingActivity activity={activity} onAnswer={handleAnswer} />;
      case 'LISTENING':
        return <ListeningActivity activity={activity} onAnswer={handleAnswer} />;
      case 'MATCH_PAIRS':
        return <MatchPairsActivity activity={activity} onAnswer={handleAnswer} />;
      case 'FILL_IN_THE_BLANK':
        return <FillInTheBlankActivity activity={activity} onAnswer={handleAnswer} />;
      default:
        // This should not happen with well-defined types
        return <div>Unsupported activity type</div>;
    }
  };

  const renderContent = () => {
    if (phase === 'loading' && !error) {
      const loadingText = completedCount >= LEARNING_ROUNDS 
        ? `Generating quiz ${completedCount - LEARNING_ROUNDS + 1} of ${QUIZ_ROUNDS}...` 
        : 'Preparing your lesson...';
      return <LoadingSpinner text={loadingText} />;
    }

    if (error) {
      return (
        <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button onClick={onBack} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to Unit
          </button>
        </div>
      );
    }
    
    if (phase === 'learning' && vocabulary && vocabulary.length > completedCount) {
      return (
        <div className="w-full flex flex-col items-center gap-8 animate-fade-in">
          <LearningCard word={vocabulary[completedCount]} />
          <div className="w-full max-w-md">
            <button
              onClick={handleContinue}
              className="w-full p-4 rounded-xl bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      );
    }

    if (phase === 'quizzing' && currentActivity) {
      return (
        <div key={currentActivity.id} className="w-full animate-fade-in">
          {renderActivity(currentActivity)}
        </div>
      );
    }
    
    return <LoadingSpinner text="Getting things ready..." />;
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-full flex-grow">
      <div className="flex justify-between items-center mb-4 gap-4">
        <button onClick={onBack} className="text-2xl text-slate-400 hover:text-slate-600 p-1" aria-label="Close lesson">&times;</button>
        <ProgressBar current={completedCount} total={TOTAL_ROUNDS} />
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        {renderContent()}
      </div>

      <FeedbackBanner status={feedback} onContinue={handleContinue} />
    </div>
  );
};

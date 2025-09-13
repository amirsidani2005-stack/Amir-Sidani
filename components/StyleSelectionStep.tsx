// Fix: Updated component to use the new Gemini service for generating quizzes in empty lessons.
import React, { useState } from 'react';
// Fix: Import MultipleChoiceActivity type to correctly type the filtered activities.
import type { Unit, Lesson, MultipleChoiceActivity } from '../types';
import { Quiz } from './ResultStep'; // Repurposed from ResultStep
import { generateQuizzes } from '../services/geminiService';

interface LessonScreenProps {
  unit: Unit;
  onCompleteLesson: () => void;
  addXp: (amount: number) => void;
}

export const LessonScreen: React.FC<LessonScreenProps> = ({ unit, onCompleteLesson, addXp }) => {
  const [lessons, setLessons] = useState<Lesson[]>(unit.lessons);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentLesson = lessons[lessonIndex];
  
  // Fix: Use activities from rounds, and filter for MULTIPLE_CHOICE since the Quiz component expects it.
  const allActivities = currentLesson?.rounds
    .flatMap(round => round.activities)
    .filter(activity => activity.type === 'MULTIPLE_CHOICE') as MultipleChoiceActivity[] || [];


  const handleGenerateQuizzes = async () => {
    // Fix: Add check for currentLesson before using it.
    if (!currentLesson) {
      setError("Cannot generate quizzes: current lesson is not available.");
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      // Fix: The original call used unit title and description, which is incorrect for generating lesson-specific quizzes.
      // Now it calls with the lesson title. The level is hardcoded as "A1: Beginner", similar to the other LessonScreen component.
      const newQuizzes = await generateQuizzes("A1: Beginner", currentLesson.title);
      if (newQuizzes.length > 0) {
        const newLessons = [...lessons];
        const updatedLesson = { ...newLessons[lessonIndex] };
        
        // Fix: Populate the 'rounds' array with new activities instead of a non-existent 'quizzes' property.
        const rounds = [];
        const activitiesPerRound = Math.ceil(newQuizzes.length / 5);
        for (let i = 0; i < 5; i++) {
          const roundActivities = newQuizzes.slice(i * activitiesPerRound, (i + 1) * activitiesPerRound);
          if (roundActivities.length > 0) {
            rounds.push({
              id: `gen-r${i + 1}`,
              activities: roundActivities,
            });
          }
        }
        updatedLesson.rounds = rounds;
        newLessons[lessonIndex] = updatedLesson;

        setLessons(newLessons);
      } else {
        setError("The AI couldn't generate quizzes for this topic. Please try another unit.");
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Sorry, we couldn't generate quizzes. ${errorMessage}`);
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      addXp(10);
    }
    // Move to next quiz or lesson after a short delay
    setTimeout(() => {
      // Fix: Check against the length of the flattened activities array.
      if (quizIndex < allActivities.length - 1) {
        setQuizIndex(quizIndex + 1);
      } else {
        // End of lesson
        if (lessonIndex < lessons.length - 1) {
          // Go to next lesson
          setLessonIndex(lessonIndex + 1);
          setQuizIndex(0);
        } else {
          // End of unit
          onCompleteLesson();
        }
      }
    }, 1500);
  };
  
  // Fix: Check the length of the flattened activities array to determine if the lesson is empty.
  if (!currentLesson || allActivities.length === 0) {
    return (
      <div className="text-center p-8 flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-2">{unit.title}</h3>
        <p className="text-lg font-semibold text-slate-700 mb-2">{currentLesson?.title}</p>
        <p className="text-slate-600 mb-6">This lesson is empty. Let's create some quizzes with AI!</p>
        <button
          onClick={handleGenerateQuizzes}
          disabled={isGenerating}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-wait transition-colors"
        >
          {isGenerating ? 'Generating...' : '✨ Generate Quizzes'}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button onClick={onCompleteLesson} className="mt-8 text-sm text-slate-500 hover:underline">Back to Path</button>
      </div>
    );
  }

  // Fix: Get the current quiz from the flattened activities array.
  const currentQuiz = allActivities[quizIndex];
  // Fix: Calculate progress based on the flattened activities array.
  const progress = ((quizIndex) / allActivities.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <h2 className="text-center text-xl font-bold text-slate-700 mb-4">{currentLesson.title}</h2>
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-4 mb-6">
        <div className="bg-green-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
      
      <Quiz quiz={currentQuiz} onAnswer={handleAnswer} key={`${lessonIndex}-${quizIndex}`} />
    </div>
  );
};

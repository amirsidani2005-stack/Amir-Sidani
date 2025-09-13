import { useState, useEffect, useCallback } from 'react';
import type { Progress, Level, Unit } from '../types';

const PROGRESS_KEY = 'languageAppProgress';

const initializeProgress = (level: Level): Progress => {
  const initial: Progress = {};
  level.units.forEach(unit => {
    initial[unit.id] = { completedLessons: [] };
  });
  return initial;
};

export const useProgress = (level: Level) => {
  const [progress, setProgress] = useState<Progress>(() => {
    try {
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        // Ensure all units from the current level exist in progress
        level.units.forEach(unit => {
          if (!parsed[unit.id]) {
            parsed[unit.id] = { completedLessons: [] };
          }
        });
        return parsed;
      }
    } catch (error) {
      console.error("Could not parse progress from localStorage", error);
    }
    return initializeProgress(level);
  });

  const [courseUnits, setCourseUnits] = useState(level.units);

  useEffect(() => {
    setCourseUnits(level.units);
  }, [level.units]);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Could not save progress to localStorage", error);
    }
  }, [progress]);

  const completeLesson = useCallback((unitId: string, lessonId: string) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      const unitProgress = { ...(newProgress[unitId] || { completedLessons: [] }) };
      if (!unitProgress.completedLessons.includes(lessonId)) {
        unitProgress.completedLessons = [...unitProgress.completedLessons, lessonId];
      }
      newProgress[unitId] = unitProgress;
      return newProgress;
    });
  }, []);
  
  const addUnit = useCallback((newUnit: Unit) => {
    // This function ensures the progress state is aware of the new unit.
    setProgress(prev => {
      if (prev[newUnit.id]) {
        return prev; // Unit already exists in progress
      }
      const newProgress = { ...prev };
      newProgress[newUnit.id] = { completedLessons: [] };
      return newProgress;
    });
    // And this updates the local reference of units for unlock logic
    setCourseUnits(prevUnits => [...prevUnits, newUnit]);
  }, []);

  const isUnitUnlocked = useCallback((unitId: string): boolean => {
    const unitIndex = courseUnits.findIndex(u => u.id === unitId);
    if (unitIndex === 0) return true; // First unit is always unlocked
    if (unitIndex < 0) return false; // Unit not found

    const prevUnit = courseUnits[unitIndex - 1];
    const prevUnitProgress = progress[prevUnit.id];
    
    if (!prevUnitProgress) return false; // Previous unit's progress not found

    // Unit is unlocked if all lessons in the previous unit are complete
    // A unit with 0 lessons is considered complete.
    return prevUnit.lessons.length === 0 || prevUnitProgress.completedLessons.length === prevUnit.lessons.length;
  }, [courseUnits, progress]);

  return { progress, completeLesson, isUnitUnlocked, addUnit };
};

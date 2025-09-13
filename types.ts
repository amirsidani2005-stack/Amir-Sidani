export type Branch = 'scientific' | 'literary';
export type System = 'zankoline' | 'parallel';
export type CollegeType = 'all' | 'college' | 'institute';

export interface YearlyGpa {
  year: number;
  minGpa: number;
  minGpaParallel?: number;
}

export interface College {
  name: string;
  university: string;
  city: string;
  branch: Branch | 'both';
  historicalGpas: YearlyGpa[];
  type: 'college' | 'institute';
}

export interface HistoricalSuggestion extends College {
  matchedGpa: YearlyGpa;
}

export interface DepartmentData {
  university: string;
  college: string;
  department: string;
  branch: string;
  city: string;
  zankoline: number | string;
  parallel: number | string;
  evening: number | string;
}

// FIX: Add missing types for the language learning app feature to resolve compilation errors.
export interface VocabularyWord {
  english: string;
  kurdish: string;
  emoji?: string;
}

export type ActivityType =
  | 'MULTIPLE_CHOICE'
  | 'IMAGE_CHOICE'
  | 'WRITING'
  | 'LISTENING'
  | 'MATCH_PAIRS'
  | 'FILL_IN_THE_BLANK';

export interface BaseActivity {
  id: string;
  type: ActivityType;
}

export interface MultipleChoiceActivity extends BaseActivity {
  type: 'MULTIPLE_CHOICE';
  kurdishPrompt: string;
  options: string[];
  correctAnswer: string;
}

export interface ImageChoiceActivity extends BaseActivity {
  type: 'IMAGE_CHOICE';
  prompt: string;
  options: { id: string; label: string }[];
  correctAnswerId: string;
}

export interface WritingActivity extends BaseActivity {
  type: 'WRITING';
  kurdishPrompt: string;
  correctAnswer: string;
}

export interface ListeningActivity extends BaseActivity {
  type: 'LISTENING';
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export interface MatchPair {
  id: number;
  kurdish: string;
  english: string;
}

export interface MatchPairsActivity extends BaseActivity {
  type: 'MATCH_PAIRS';
  pairs: MatchPair[];
}

export interface FillInTheBlankActivity extends BaseActivity {
  type: 'FILL_IN_THE_BLANK';
  promptParts: {
    part1: string;
    part2: string;
  };
  options: string[];
  correctAnswer: string;
}

export type Activity =
  | MultipleChoiceActivity
  | ImageChoiceActivity
  | WritingActivity
  | ListeningActivity
  | MatchPairsActivity
  | FillInTheBlankActivity;

export interface Round {
  id: string;
  activities: Activity[];
}

export interface Lesson {
  id: string;
  title: string;
  rounds: Round[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Level {
  id: string;
  title: string;
  units: Unit[];
}

export interface Progress {
  [unitId: string]: {
    completedLessons: string[];
  };
}

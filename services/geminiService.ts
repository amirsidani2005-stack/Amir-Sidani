import { GoogleGenAI, Type } from "@google/genai";
import { COLLEGES } from '../data';
// FIX: Add missing type imports for the language learning app feature.
import type { Branch, System, CollegeType, HistoricalSuggestion, MultipleChoiceActivity, VocabularyWord, Activity } from '../types';

if (!process.env.API_KEY) {
  alert("API_KEY is not set. Please configure it to use AI features.");
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiCollegeSuggestions = async (
    gpa: string, 
    branch: Branch, 
    system: System, 
    city: string, 
    collegeType: CollegeType, 
    startYear: string, 
    endYear: string
): Promise<HistoricalSuggestion[]> => {

    const prompt = `
    You are an expert college admissions advisor for students in Kurdistan.
    Your task is to filter a given list of colleges based on the student's criteria and return a list of suitable suggestions.

    Student's criteria:
    - GPA: ${gpa}
    - Branch: ${branch}
    - System: ${system}
    - City: ${city}
    - College Type: ${collegeType}
    - Desired Year Range: ${startYear} to ${endYear}

    Here is the list of all available colleges and their historical data:
    ${JSON.stringify(COLLEGES)}

    Follow these rules precisely:
    1. Filter the colleges based on 'branch', 'city', and 'type'. For 'branch', a college with "both" is a match for any student branch. For 'city' or 'collegeType', a value of "all" means you should not filter by that field.
    2. For each remaining college, examine its 'historicalGpas' array. Only consider entries where the 'year' is between ${startYear} and ${endYear} (inclusive).
    3. From the valid yearly GPAs for a college, find the single best matching year for the student. The "best match" is the one with the required GPA closest to the student's GPA.
    4. When checking a yearly GPA, use the 'minGpa' property if the student's system is 'zankoline'. Use the 'minGpaParallel' property if the system is 'parallel'.
    5. A college is a potential suggestion if the student's GPA is greater than or equal to the required GPA minus 5 (studentGPA >= requiredGPA - 5). You MUST ignore any required GPAs that are 0, null, or undefined for the selected system.
    6. If a college meets these criteria, include it in the results. The result for each college must be the original college object, but with an added 'matchedGpa' property containing the specific yearly GPA object that was the best match.
    7. Sort the final list of suggestions based on the difference between the required GPA (from the matchedGpa object) and the student's GPA.
        a. Suggestions where the student's GPA is greater than or equal to the required GPA (accepted) should come first. Sort these in descending order of the required GPA.
        b. Suggestions where the student's GPA is lower than the required GPA (near-misses) should come after. Sort these in ascending order of the required GPA.
    8. Return the final sorted list as a JSON array of objects that strictly follows the defined schema.
    `;

    const schema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            university: { type: Type.STRING },
            city: { type: Type.STRING },
            branch: { type: Type.STRING },
            type: { type: Type.STRING },
            historicalGpas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  year: { type: Type.INTEGER },
                  minGpa: { type: Type.NUMBER },
                  minGpaParallel: { type: Type.NUMBER, nullable: true },
                },
                required: ['year', 'minGpa'],
              },
            },
            matchedGpa: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.INTEGER },
                minGpa: { type: Type.NUMBER },
                minGpaParallel: { type: Type.NUMBER, nullable: true },
              },
              required: ['year', 'minGpa'],
            },
          },
          required: ['name', 'university', 'city', 'branch', 'type', 'historicalGpas', 'matchedGpa'],
        },
      };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                thinkingConfig:{thinkingBudget:128}
            },
        });
        const jsonStr = response.text.trim();
        if (!jsonStr) {
            // AI returned empty string, which is not valid JSON
            return [];
        }
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error(`Error during Gemini API call for college suggestions:`, error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate suggestions: ${error.message}`);
        }
        throw new Error(`An unknown error occurred while communicating with the AI model.`);
    }
};

// FIX: Add missing service functions for the language learning app feature to resolve compilation errors.

export const generateQuizzes = async (levelTitle: string, lessonTitle: string): Promise<MultipleChoiceActivity[]> => {
  const prompt = `
  You are an expert curriculum designer for a language learning app that teaches English to Kurdish (Badini) speakers.
  Your task is to create a set of 5 multiple-choice quiz questions for the following lesson.
  
  Lesson Level: ${levelTitle}
  Lesson Title: ${lessonTitle}
  
  For each question, provide:
  - A Kurdish word or phrase to be translated into English.
  - 4 English options.
  - The correct English answer.
  
  Return the result as a JSON array of objects that strictly follows the defined schema. Do not include any extra text or explanations.
  `;

  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: "A unique ID for the quiz, e.g., 'mcq-1'" },
        type: { type: Type.STRING, description: "Should always be 'MULTIPLE_CHOICE'" },
        kurdishPrompt: { type: Type.STRING, description: "The Kurdish word/phrase to translate." },
        options: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of 4 English options."
        },
        correctAnswer: { type: Type.STRING, description: "The correct English option." },
      },
      required: ['id', 'type', 'kurdishPrompt', 'options', 'correctAnswer'],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    const jsonStr = response.text.trim();
    if (!jsonStr) return [];
    const quizzes = JSON.parse(jsonStr) as Omit<MultipleChoiceActivity, 'type'>[];
    // Ensure the 'type' property is set correctly.
    return quizzes.map(q => ({ ...q, type: 'MULTIPLE_CHOICE' }));
  } catch (error) {
    console.error(`Error generating quizzes for lesson "${lessonTitle}":`, error);
    throw new Error(`Failed to generate quizzes: ${error instanceof Error ? error.message : 'Unknown AI error'}`);
  }
};

export const generateActivity = async (level: string, lessonTitle: string, vocabulary: VocabularyWord[], quizIndex: number): Promise<Activity> => {
    const prompt = `
    You are an expert curriculum designer for a language learning app that teaches English to Kurdish (Badini) speakers.
    Your task is to create a single, engaging quiz activity based on a given vocabulary list.
    
    Lesson Level: ${level}
    Lesson Title: ${lessonTitle}
    Vocabulary List: ${JSON.stringify(vocabulary)}
    Current Quiz Index: ${quizIndex} (out of 10)

    Based on the quiz index, vary the activity type. For early quizzes, use simpler types like MULTIPLE_CHOICE. For later quizzes, use more complex types like WRITING or FILL_IN_THE_BLANK.
    
    Choose ONE of the following activity types: MULTIPLE_CHOICE, WRITING, FILL_IN_THE_BLANK, LISTENING.
    - MULTIPLE_CHOICE: Translate a Kurdish word/phrase to English. Provide 4 options.
    - WRITING: Translate a Kurdish phrase to English. The user must type the answer.
    - FILL_IN_THE_BLANK: Provide an English sentence with a blank. The user chooses the correct word from 4 options to fill it.
    - LISTENING: Provide an English phrase to be read by text-to-speech. The user chooses the correct written phrase from 4 options.

    Return a single JSON object for the chosen activity that strictly follows ONE of the defined schemas. Do not include any extra text or explanations.
    The response must be valid JSON.
    Generate a unique ID for the activity.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            },
        });
        const jsonStr = response.text.trim();
        if (!jsonStr) {
            throw new Error("AI returned empty response for activity generation.");
        }
        return JSON.parse(jsonStr) as Activity;
    } catch (error) {
        console.error(`Error generating activity for lesson "${lessonTitle}":`, error);
        throw new Error(`Failed to generate activity: ${error instanceof Error ? error.message : 'Unknown AI error'}`);
    }
};

export const generateLessonVocabulary = async (lessonTitle: string): Promise<VocabularyWord[]> => {
    const prompt = `
    You are a curriculum designer for a language learning app that teaches English to Kurdish (Badini) speakers.
    Generate a list of 10 vocabulary words/phrases for a lesson titled "${lessonTitle}".
    For each item, provide the English word, the Kurdish (Badini) translation, and a relevant emoji.
    
    Return the result as a JSON array of objects that strictly follows the defined schema.
    `;

    const schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          english: { type: Type.STRING },
          kurdish: { type: Type.STRING },
          emoji: { type: Type.STRING },
        },
        required: ['english', 'kurdish', 'emoji'],
      }
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        const jsonStr = response.text.trim();
        if (!jsonStr) return [];
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error(`Error generating vocabulary for lesson "${lessonTitle}":`, error);
        throw new Error(`Failed to generate vocabulary: ${error instanceof Error ? error.message : 'Unknown AI error'}`);
    }
};

export const getWordTranslation = async (word: string): Promise<string> => {
    const prompt = `Translate the following Kurdish (Badini dialect) word to English: "${word}". Return only the English translation, nothing else.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error(`Error translating word "${word}":`, error);
        throw new Error(`Failed to translate word: ${error instanceof Error ? error.message : 'Unknown AI error'}`);
    }
};

import type { College, YearlyGpa, Branch } from './types';

// New function to process 2024 data and generate historical GPAs
const createCollegeEntry = (
  name: string,
  university: string,
  city: string,
  branch: Branch | 'both',
  type: 'college' | 'institute',
  gpa2024: number | null,
  gpa2024Parallel: number | null = null
): College => {
  const historicalGpas: YearlyGpa[] = [];

  // Add the accurate 2024 data if it exists
  if (gpa2024 !== null) {
    const entry: YearlyGpa = { year: 2024, minGpa: gpa2024 };
    if (gpa2024Parallel !== null && gpa2024Parallel > 0) {
      entry.minGpaParallel = gpa2024Parallel;
    }
    historicalGpas.push(entry);
  }

  // Generate mock data for previous years based on 2024
  let baseGpa = gpa2024 ?? (gpa2024Parallel ? gpa2024Parallel + 5 : 70);
  let baseParallel = gpa2024Parallel ?? (gpa2024 ? gpa2024 - 7 : null);

  for (let year = 2023; year >= 2020; year--) {
    const fluctuation = (Math.random() - 0.5) * 1.5; // Fluctuation between -0.75 and +0.75
    const currentGpa = parseFloat((baseGpa + fluctuation).toFixed(2));
    const entry: YearlyGpa = { year, minGpa: currentGpa };
    if (baseParallel) {
      const parallelFluctuation = (Math.random() - 0.5) * 2;
      entry.minGpaParallel = parseFloat((baseParallel + parallelFluctuation).toFixed(2));
    }
    historicalGpas.push(entry);
    baseGpa = currentGpa; // base next year on this year
    if (baseParallel && entry.minGpaParallel) {
        baseParallel = entry.minGpaParallel;
    }
  }

  return { name, university, city, branch, type, historicalGpas };
};


export const COLLEGES: College[] = [
    // Data from images - Zankoy Duhok
    createCollegeEntry("پزیشکی", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 97.7, null),
    createCollegeEntry("پزیشکیا ددانا", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 96.3, null),
    createCollegeEntry("دەرمانسازی", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 95.4, null),
    createCollegeEntry("پەرستاری", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 94.0, 91.1),
    createCollegeEntry("پزیشکیا ڤێتێرنەری", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 83.0, 78.8),
    createCollegeEntry("زانستێن ساخلەمیێ - زانستێن تاقیگەهێن پزیشکی", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 94.6, 93.0),
    createCollegeEntry("زانستێن ساخلەمیێ - سڕکرن", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 93.7, 91.6),
    createCollegeEntry("ئەندازیاری - تەلارسازی", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 94.6, 93.9),
    createCollegeEntry("ئەندازیاری - شارستانی", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 93.2, 91.0),
    createCollegeEntry("ئەندازیاری - کارەبا و کۆمپیوتەر", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 91.0, 87.4),
    createCollegeEntry("ئەندازیاری - بایۆمێدیکال", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 86.5, null),
    createCollegeEntry("ئەندازیاری - میکانیک", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 86.3, 83.0),
    createCollegeEntry("پلاندانانا شار و هەرێمان - پلاندانانا شار", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 72.2, 66.3),
    createCollegeEntry("زانست - زیندەزانی", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 87.6, 83.0),
    createCollegeEntry("زانست - کیمیا", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 84.2, 78.8),
    createCollegeEntry("زانست - زانستێن کۆمپیوتەری", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 81.1, 76.1),
    createCollegeEntry("زانست - فیزیک", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 77.0, 66.7),
    createCollegeEntry("زانست - ماتماتیک", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 72.8, 66.7),
    createCollegeEntry("یاسا", "زانکویا دهۆک", "دهۆک", 'both', 'college', 85.6, 81.0),
    createCollegeEntry("زانستێن سیاسی", "زانکویا دهۆک", "دهۆک", 'both', 'college', 76.6, 71.2),
    createCollegeEntry("کارگێری و ئابووری - زانستێن دارایی و بانک", "زانکویا دهۆک", "دهۆک", 'both', 'college', 64.6, 61.3),
    createCollegeEntry("کارگێری و ئابووری - ئابووری", "زانکویا دهۆک", "دهۆک", 'both', 'college', 71.5, 65.4),
    createCollegeEntry("کارگێری و ئابووری - ژمێریاری", "زانکویا دهۆک", "دهۆک", 'scientific', 'college', 68.0, 63.4),

    // Data from images - Zankoy Hawleri Pzishky
    createCollegeEntry("پزیشکی گشتی", "زانکۆی هەولێری پزیشکی", "هەولێر", 'scientific', 'college', 98.0, 97.429),
    createCollegeEntry("ددانسازی", "زانکۆی هەولێری پزیشکی", "هەولێر", 'scientific', 'college', 96.857, 96.444),
    createCollegeEntry("دەرمانسازی", "زانکۆی هەولێری پزیشکی", "هەولێر", 'scientific', 'college', 96.1, 95.8),
    createCollegeEntry("پەرستاری", "زانکۆی هەولێری پزیشکی", "هەولێر", 'scientific', 'college', 93.6, 92.3),

    // Data from images - Zankoy Salahedin
    createCollegeEntry("پزیشکی ڤێتێرنەری", "زانکۆی سەڵاحەدین", "هەولێر", 'scientific', 'college', 88.7, 0),
    createCollegeEntry("ئەندازیاری - تەلارسازی", "زانکۆی سەڵاحەدین", "هەولێر", 'scientific', 'college', 95.2, 0),
    createCollegeEntry("ئەندازیاری - شارستانی", "زانکۆی سەڵاحەدین", "هەولێر", 'scientific', 'college', 92.1, 90.7),
    createCollegeEntry("ئەندازیاری - کیمیا و پترۆکیمیا", "زانکۆی سەڵاحەدین", "هەولێر", 'scientific', 'college', 86.7, 84.7),
    createCollegeEntry("ئەندازیاری - کارەبا و کۆمپیوتەر", "زانکۆی سەڵاحەدین", "هەولێر", 'scientific', 'college', 89.8, 86.8),
    createCollegeEntry("یاسا", "زانکۆی سەڵاحەدین", "هەولێر", 'both', 'college', 84.4, 80.8),
    createCollegeEntry("زمان - زمانی ئینگلیزی", "زانکۆی سەڵاحەدین", "هەولێر", 'both', 'college', 79.2, 75.9),
    createCollegeEntry("زمان - زمانی کوردی", "زانکۆی سەڵاحەدین", "هەولێر", 'both', 'college', 62.5, 59.5),
    createCollegeEntry("کارگێری و ئابووری - کارگێری کار", "زانکۆی سەڵاحەدین", "هەولێر", 'both', 'college', 72.4, 68.0),
    createCollegeEntry("کارگێری و ئابووری - ئابوری", "زانکۆی سەڵاحەدین", "هەولێر", 'both', 'college', 66.0, 61.6),
    createCollegeEntry("کارگێری و ئابووری - ژمێریاری", "زانکۆی سەڵاحەدین", "هەولێر", 'both', 'college', 72.0, 67.9),

    // Data from images - Zankoy Sulaimani
    createCollegeEntry("پزیشکی", "زانکۆی سلێمانی", "سلێمانی", 'scientific', 'college', 98.571, 97.714),
    createCollegeEntry("ددانسازی", "زانکۆی سلێمانی", "سلێمانی", 'scientific', 'college', 97.2, 96.8),
    createCollegeEntry("دەرمانسازی", "زانکۆی سلێمانی", "سلێمانی", 'scientific', 'college', 96.4, 96.0),
    createCollegeEntry("پەرستاری", "زانکۆی سلێمانی", "سلێمانی", 'scientific', 'college', 94.667, 92.667),
    createCollegeEntry("ئەندازیاری - تەلارسازی", "زانکۆی سلێمانی", "سلێمانی", 'scientific', 'college', 95.336, 94.7),
    createCollegeEntry("ئەندازیاری - کۆمپیوتەر", "زانکۆی سلێمانی", "سلێمانی", 'scientific', 'college', 94.626, 93.352),
    createCollegeEntry("ئەندازیاری - شارستانی", "زانکۆی سلێمانی", "سلێمانی", 'scientific', 'college', 92.133, 90.56),
    createCollegeEntry("یاسا", "زانکۆی سلێمانی", "سلێمانی", 'both', 'college', 88.6, 85.25),
    createCollegeEntry("زمان - زمانی ئینگلیزی", "زانکۆی سلێمانی", "سلێمانی", 'both', 'college', 84.2, 81.078),
    createCollegeEntry("کارگێری و ئابوری - کارگێری کار", "زانکۆی سلێمانی", "سلێمانی", 'both', 'college', 71.3, 65.8),
    createCollegeEntry("کارگێری و ئابوری - ژمێریاری", "زانکۆی سلێمانی", "سلێمانی", 'both', 'college', 69.121, 64.263),

    // Data from images - Zankoy Zakho
    createCollegeEntry("پزیشکی گشتی", "زانکۆی زاخۆ", "زاخۆ", 'scientific', 'college', 97.633, 96.872),
    createCollegeEntry("زانست - بایۆلۆجی", "زانکۆی زاخۆ", "زاخۆ", 'scientific', 'college', 85.433, 80.812),
    createCollegeEntry("زانست - کیمیا", "زانکۆی زاخۆ", "زاخۆ", 'scientific', 'college', 82.366, 77.6),
    createCollegeEntry("زانست - فیزیک", "زانکۆی زاخۆ", "زاخۆ", 'scientific', 'college', 70.3, 65.169),
    createCollegeEntry("یاسا", "زانکۆی زاخۆ", "زاخۆ", 'both', 'college', 85.3, 80.9),
    createCollegeEntry("کارگێری و ئابوری - زانستی ئابووری", "زانکۆی زاخۆ", "زاخۆ", 'both', 'college', 69.8, 66.5),

    // Data from images - Zankoy Koye
    createCollegeEntry("پزیشکی گشتی", "زانکۆی کۆیە", "کۆیە", 'scientific', 'college', 97.667, 97.333),
    createCollegeEntry("ئەندازیاری - تەلارسازی", "زانکۆی کۆیە", "کۆیە", 'scientific', 'college', 94.322, 93.564),
    createCollegeEntry("ئەندازیاری - نەوت", "زانکۆی کۆیە", "کۆیە", 'scientific', 'college', 82.662, 79.155),
    createCollegeEntry("زانستی تاقیگەی پزیشکی", "زانکۆی کۆیە", "کۆیە", 'scientific', 'college', 88.122, 83.143),
    createCollegeEntry("یاسا", "زانکۆی کۆیە", "کۆیە", 'both', 'college', 77.533, 73.473),
    createCollegeEntry("زمانی ئینگلیزی", "زانکۆی کۆیە", "کۆیە", 'both', 'college', 81.7, 75.272),
    
    // Polytechnic Institutes - Duhok
    createCollegeEntry("پەرستاری", "کولیژا تەکنیکی تەندروستی شێخان", "شێخان", 'scientific', 'college', 91.5, 88.6),
    createCollegeEntry("ته ندروستی گشتی", "کولیژا تەکنیکی تەندروستی شێخان", "شێخان", 'scientific', 'college', 86.6, 81.1),
    createCollegeEntry("دەرمانسازی", "پەیمانگەها تەکنیکی دهۆک", "دهۆک", 'scientific', 'institute', 85.1, 82.0),
    createCollegeEntry("پەرستاری", "پەیمانگەها تەکنیکی دهۆک", "دهۆک", 'scientific', 'institute', 84.0, 77.7),
    createCollegeEntry("کارگێری یاسا", "پەیمانگەها تەکنیکی کارگێری دهۆک", "دهۆک", 'both', 'institute', 62.5, 59.5),
    createCollegeEntry("ژمێریاری", "پەیمانگەها تەکنیکی کارگێری دهۆک", "دهۆک", 'both', 'institute', 62.6, 59.6),
    createCollegeEntry("پەرستاری", "پەیمانگەها تەکنیکی ئاکرێ", "ئاکرێ", 'scientific', 'institute', 80.9, 75.4),
    createCollegeEntry("پەرستاری", "پەیمانگەها تەکنیکی زاخۆ", "زاخۆ", 'scientific', 'institute', 81.5, 75.9),
    createCollegeEntry("تەکنەلۆژیای تاقیگەی پزیشکی", "پەیمانگەها تەکنیکی زاخۆ", "زاخۆ", 'scientific', 'institute', 78.2, 73.7),

    // Polytechnic Institutes - Erbil
    createCollegeEntry("شیکاری نەخۆشی", "کۆلێژی تەکنیکی تەندروستی هەولێر", "هەولێر", 'scientific', 'college', 92.4, 91.2),
    createCollegeEntry("پەرستاری", "پەیمانگای تەکنیکی پزیشکی هەولێر", "هەولێر", 'scientific', 'institute', 84.0, 82.1),
    createCollegeEntry("دەرمانسازی", "پەیمانگای تەکنیکی پزیشکی هەولێر", "هەولێر", 'scientific', 'institute', 86.6, 84.1),
    createCollegeEntry("کارگێری یاسا", "پەیمانگای تەکنیکی کارگێری هەولێر", "هەولێر", 'both', 'institute', 60.0, 58.3),
    createCollegeEntry("ژمێریاری", "پەیمانگای تەکنیکی کارگێری هەولێر", "هەولێر", 'both', 'institute', 61.7, 59.2),
];

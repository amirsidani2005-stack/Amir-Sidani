import type { DepartmentData } from './types';

const parseScore = (score: string | number): number | string => {
    if (typeof score === 'number') return score;
    if (score === '***' || score === '' || score === null) return '***';
    const num = parseFloat(score);
    return isNaN(num) ? '***' : num;
};

export const PDF_DATA: DepartmentData[] = [
  // Zankoy Duhok (Pages 13-14)
  { university: 'زانکوی دهوک', college: 'کولیژی پزیشکی', department: 'پزیشکی', branch: 'زانستی', city: 'دهوک', zankoline: 97.7, parallel: 96.8, evening: '***' },
  { university: 'زانکوی دهوک', college: 'کولیژی پزیشکی', department: 'پزیشکی ددان', branch: 'زانستی', city: 'دهوک', zankoline: 96.3, parallel: 95.7, evening: '***' },
  { university: 'زانکوی دهوک', college: 'کولیژی پزیشکی', department: 'دەرمانسازی', branch: 'زانستی', city: 'دهوک', zankoline: 95.4, parallel: 94.8, evening: '***' },
  { university: 'زانکوی دهوک', college: 'کولیژی پزیشکی', department: 'پەرستاری', branch: 'زانستی', city: 'دهوک', zankoline: 94, parallel: 91.1, evening: '***' },
  { university: 'زانکوی دهوک', college: 'کولیژی فیتیرنەری', department: 'پزیشکی فیتیرنەری', branch: 'زانستی', city: 'دهوک', zankoline: 83, parallel: 78.8, evening: '***' },
  { university: 'زانکوی دهوک', college: 'کولیژی زانستی تەندرووستی', department: 'زانستی لابوری پزیشکی', branch: 'زانستی', city: 'دهوک', zankoline: 94.6, parallel: 93, evening: '***' },
  { university: 'زانکوی دهوک', college: 'کولیژی زانستی تەندرووستی', department: 'زانستی سرکرد', branch: 'زانستی', city: 'دهوک', zankoline: 93.7, parallel: 91.6, evening: '***' },
  { university: 'زانکوی دهوک', college: 'ئەندازیاری', department: 'تەلارسازی', branch: 'زانستی', city: 'دهوک', zankoline: 94.6, parallel: 93.9, evening: '***' },
  { university: 'زانکوی دهوک', college: 'ئەندازیاری', department: 'شارستانی', branch: 'زانستی', city: 'دهوک', zankoline: 93.2, parallel: 91, evening: '***' },
  { university: 'زانکوی دهوک', college: 'ئەندازیاری', department: 'کارەبا و کومپیته ر', branch: 'زانستی', city: 'دهوک', zankoline: 91, parallel: 87.4, evening: '***' },
  { university: 'زانکوی دهوک', college: 'ئەندازیاری', department: 'با يومئديكه ل', branch: 'زانستی', city: 'دهوک', zankoline: 86.5, parallel: 0, evening: '***' },
  { university: 'زانکوی دهوک', college: 'ئەندازیاری', department: 'میکانیک', branch: 'زانستی', city: 'دهوک', zankoline: 86.3, parallel: 83, evening: '***' },
  { university: 'زانکوی دهوک', college: 'کولیژی پلانسازی شار و هەریمان', department: 'پلانسازی شار', branch: 'زانستی', city: 'دهوک', zankoline: 72.2, parallel: 66.3, evening: '***' },
  { university: 'زانکوی دهوک', college: 'کولیژی پلانسازی شار و هەریمان', department: 'پلان دانانا جھی', branch: 'زانستی', city: 'دهوک', zankoline: 66.6, parallel: 0, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانست', department: 'زیندەزانی', branch: 'زانستی', city: 'دهوک', zankoline: 87.6, parallel: 83, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانست', department: 'کیمیا', branch: 'زانستی', city: 'دهوک', zankoline: 84.2, parallel: 78.8, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانست', department: 'زانستی کومپیته ر', branch: 'زانستی', city: 'دهوک', zankoline: 81.1, parallel: 76.1, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانست', department: 'فیزیک', branch: 'زانستی', city: 'دهوک', zankoline: 77, parallel: 66.7, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانست', department: 'زه وی ناسی', branch: 'زانستی', city: 'دهوک', zankoline: 68.2, parallel: 61.8, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانست', department: 'ماتماتیک', branch: 'زانستی', city: 'دهوک', zankoline: 72.8, parallel: 66.7, evening: '***' },
  { university: 'زانکوی دهوک', college: 'یاسا', department: 'یاسا', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 85.6, parallel: 81, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانستی سیاسی', department: 'په یوه ندییه نیوده وله تیه کان و دیبلوماسی', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 76.6, parallel: 71.2, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانستی سیاسی', department: 'سیسته می سیاسی و سیاسه تا گشتی', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 74.2, parallel: 68.8, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانستی مروفایه تی', department: 'زمانی ئینگلیزی', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 80.6, parallel: 74.2, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانستی مروفایه تی', department: 'وه رگیران', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 78.4, parallel: 72.3, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانستی مروفایه تی', department: 'زمانی کوردی', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 66.7, parallel: 61.6, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانستی مروفایه تی', department: 'شوینه وار', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 64.3, parallel: 60, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانستی مروفایه تی', department: 'جوگرافیا', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 68.2, parallel: 63.4, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانستی مروفایه تی', department: 'ده روونناسی', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 70.1, parallel: 65, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانستی مروفایه تی', department: 'میژوو', branch: 'وێژەیی', city: 'دهوک', zankoline: 67.6, parallel: 62.6, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانستی مروفایه تی', department: 'خویندنی ئاشتی و مافی مروف', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 63.5, parallel: 60, evening: '***' },
  { university: 'زانکوی دهوک', college: 'زانستی مروفایه تی', department: 'کومه لناسی', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 63.9, parallel: 60.7, evening: '***' },

  // Zankoy Politekniki Duhok (Page 15)
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی تەکنیکی تەندروستی شێخان', department: 'پەرستاری', branch: 'زانستی', city: 'دهوک', zankoline: 91.5, parallel: 88.6, evening: '***' },
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی تەکنیکی تەندروستی شێخان', department: 'ته کنه لوجیای تاقیگه ی نوژداری', branch: 'زانستی', city: 'دهوک', zankoline: 91.2, parallel: 87.7, evening: '***' },
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی تەکنیکی تەندروستی شێخان', department: 'ته ندوستی گشتی', branch: 'زانستی', city: 'دهوک', zankoline: 86.6, parallel: 81.1, evening: '***' },
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی تەکنیکی ئەندازیاری دهوک', department: 'وزه', branch: 'زانستی', city: 'دهوک', zankoline: 83.2, parallel: 79.3, evening: '***' },
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی تەکنیکی ئەندازیاری دهوک', department: 'ریگا وبان', branch: 'زانستی', city: 'دهوک', zankoline: 85.6, parallel: 81.8, evening: '***' },
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی تەکنیکی ئەندازیاری دهوک', department: 'ئه ندازیاری کیمیاوی', branch: 'زانستی', city: 'دهوک', zankoline: 85.2, parallel: 80.4, evening: '***' },
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی تەکنیکی دهوک', department: 'كولیژی جیکرنا ددان', branch: 'زانستی', city: 'دهوک', zankoline: 93.3, parallel: 0, evening: '***' },
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی تەکنیکی دهوک', department: 'ته کنه لوجیای زانیاری', branch: 'زانستی', city: 'دهوک', zankoline: 75.6, parallel: 71, evening: '***' },
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی ته کنیکی به رهه م هینانی ته کنه لوجیای خورااک زاخو', department: 'جیولوجی پترول', branch: 'زانستی', city: 'زاخو', zankoline: 0, parallel: 0, evening: '***' },
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی ته کنیکی کارگیری دهوک', department: 'سیسته می زانیاری', branch: 'زانستی', city: 'دهوک', zankoline: 72.4, parallel: 67.8, evening: '***' },
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی ته کنیکی کارگیری دهوک', department: 'ته کنه لوجیای کارگیری', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 70.7, parallel: 66.8, evening: '***' },
  { university: 'زانکوی پۆلیتەکنیکی دهوک', college: 'کولیژی ته کنیکی کارگیری دهوک', department: 'بازارگه ری', branch: 'زانستی و وێژەیی', city: 'دهوک', zankoline: 64.2, parallel: 61.3, evening: 58.6 },
  
  // Zankoy Zakho (Page 16)
  { university: 'زانکۆی زاخۆ', college: 'پزیشکی', department: 'پزیشکی گشتی', branch: 'زانستی', city: 'زاخۆ', zankoline: 97.633, parallel: 96.872, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'ئەندازیاری', department: 'زیرەکی دەستکرد', branch: 'زانستی', city: 'زاخۆ', zankoline: 90.766, parallel: 87.318, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'ئەندازیاری', department: 'ئەندازیاری پترۆل', branch: 'زانستی', city: 'زاخۆ', zankoline: 89.999, parallel: 87.218, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'ئەندازیاری', department: 'شارستانی و ژینگە', branch: 'زانستی', city: 'زاخۆ', zankoline: 86.6, parallel: 84.566, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'ئەندازیاری', department: 'میکانیک', branch: 'زانستی', city: 'زاخۆ', zankoline: 83.9, parallel: 80.75, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'زانست', department: 'بایۆلۆجی', branch: 'زانستی', city: 'زاخۆ', zankoline: 85.433, parallel: 80.812, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'زانست', department: 'کیمیا', branch: 'زانستی', city: 'زاخۆ', zankoline: 82.366, parallel: 77.6, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'زانست', department: 'زانستی کۆمپیوتەر', branch: 'زانستی', city: 'زاخۆ', zankoline: 78.04, parallel: 73.04, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'زانست', department: 'فیزیک', branch: 'زانستی', city: 'زاخۆ', zankoline: 75.013, parallel: 68.892, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'زانست', department: 'ماتماتیک', branch: 'زانستی', city: 'زاخۆ', zankoline: 70.3, parallel: 65.169, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'زانست', department: 'ژینگە', branch: 'زانستی', city: 'زاخۆ', zankoline: 64.188, parallel: 60.948, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'یاسا', department: 'یاسا', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 85.3, parallel: 80.9, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'زانستی مرۆڤایەتی', department: 'زمانی ئینگلیزی', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 77.5, parallel: 72.2, evening: 64.706 },
  { university: 'زانکۆی زاخۆ', college: 'زانستی مرۆڤایەتی', department: 'زمانی کوردی', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 65.899, parallel: 61.013, evening: 58.27 },
  { university: 'زانکۆی زاخۆ', college: 'زانستی مرۆڤایەتی', department: 'میژوو', branch: 'وێژەیی', city: 'زاخۆ', zankoline: 66.9, parallel: 62.404, evening: 59.2 },
  { university: 'زانکۆی زاخۆ', college: 'زانستی مرۆڤایەتی', department: 'زمانی عەرەبی', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 70.499, parallel: 65.177, evening: 60.382 },
  { university: 'زانکۆی زاخۆ', college: 'زانستی مرۆڤایەتی', department: 'خویندنی ئیسلامی', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 0, parallel: 0, evening: 0 },
  { university: 'زانکۆی زاخۆ', college: 'پەروەردە', department: 'جوگرافیا', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 68.6, parallel: 63.1, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'پەروەردە', department: 'ماتماتیک', branch: 'زانستی', city: 'زاخۆ', zankoline: 68.56, parallel: 63.476, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'پەروەردە', department: 'دەرونناسی', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 67.319, parallel: 63.199, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'پەروەردەی بنەرەت', department: 'زمانی ئینگلیزی', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 76.499, parallel: 70.199, evening: 64.199 },
  { university: 'زانکۆی زاخۆ', college: 'پەروەردەی بنەرەت', department: 'زانستی کومەلایەتی', branch: 'وێژەیی', city: 'زاخۆ', zankoline: 65.9, parallel: 61.099, evening: 58.599 },
  { university: 'زانکۆی زاخۆ', college: 'پەروەردەی بنەرەت', department: 'زمانی عەرەبی', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 71.15, parallel: 66.299, evening: 61.35 },
  { university: 'زانکۆی زاخۆ', college: 'پەروەردەی بنەرەت', department: 'زانستی گشتی', branch: 'زانستی', city: 'زاخۆ', zankoline: 70.674, parallel: 64.907, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'پەروەردەی بنەرەت', department: 'زمانی کوردی', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 67.044, parallel: 61.7, evening: 59.4 },
  { university: 'زانکۆی زاخۆ', college: 'کارگیری و ئابوری', department: 'زانستی ئابووری', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 69.015, parallel: 63.146, evening: 60.199 },
  { university: 'زانکۆی زاخۆ', college: 'کارگیری و ئابوری', department: 'ژمیریاری', branch: 'زانستی', city: 'زاخۆ', zankoline: 66.9, parallel: 60.5, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'کارگیری و ئابوری', department: 'زانستی دارایی و بانک', branch: 'زانستی', city: 'زاخۆ', zankoline: 63.672, parallel: 59.41, evening: '***' },
  { university: 'زانکۆی زاخۆ', college: 'کارگیری و ئابوری', department: 'زانستی کارگیری کار', branch: 'زانستی و وێژەیی', city: 'زاخۆ', zankoline: 66.812, parallel: 62.386, evening: 59.999 }
];

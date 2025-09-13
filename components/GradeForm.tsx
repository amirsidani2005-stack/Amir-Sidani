import React, { useState, useMemo } from 'react';
import type { Branch, System, CollegeType } from '../types';
import { COLLEGES } from '../data';

interface GradeFormProps {
  onCalculate: (gpa: string, branch: Branch, system: System, city: string, collegeType: CollegeType, startYear: string, endYear: string) => void;
  isCalculating: boolean;
}

export const GradeForm: React.FC<GradeFormProps> = ({ onCalculate, isCalculating }) => {
  const [branch, setBranch] = useState<Branch>('scientific');
  const [system, setSystem] = useState<System>('zankoline');
  const [city, setCity] = useState<string>('all');
  const [collegeType, setCollegeType] = useState<CollegeType>('all');
  const [gpa, setGpa] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [startYear, setStartYear] = useState<string>('2020');
  const [endYear, setEndYear] = useState<string>('2024');
  
  const cities = useMemo(() => ['all', ...Array.from(new Set(COLLEGES.map(c => c.city)))], []);
  const availableYears = useMemo(() => ['2024', '2023', '2022', '2021', '2020'], []);


  // Pure validation function for use during render.
  const isGpaValid = (value: string): boolean => {
    if (value.trim() === '') return false;
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
  };
  
  // Validation function with side-effects (setting error state) for event handlers.
  const validateGpaAndSetError = (value: string): boolean => {
      const isValid = isGpaValid(value);
      if (!isValid && value.trim() !== '') {
          setError('کۆنمرە دڤێت د ناڤبەرا ٠ و ١٠٠ دا بیت');
      } else {
          setError(null);
      }
      return isValid;
  };
  
  const handleGpaChange = (value: string) => {
    setGpa(value);
    if (error) {
        setError(null); // Clear error on change for better UX
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateGpaAndSetError(gpa)) {
        onCalculate(gpa, branch, system, city, collegeType, startYear, endYear);
    }
  };
  
  // Calculate form validity for the button state without side-effects.
  const formIsValid = isGpaValid(gpa);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200">
      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Branch Selection */}
          <fieldset>
            <legend className="text-xl font-bold text-slate-800 mb-4 text-center lang-ku" dir="rtl">
              ١. بەشێ خۆ هەلبژێرە:
            </legend>
            <div className="flex justify-center gap-4">
              {(['scientific', 'literary'] as Branch[]).map(b => (
                <label key={b} className={`w-full text-center cursor-pointer px-6 py-3 rounded-lg border-2 font-semibold transition-all ${branch === b ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-300 text-slate-700 hover:border-indigo-400'}`}>
                  <input
                    type="radio"
                    name="branch"
                    value={b}
                    checked={branch === b}
                    onChange={() => setBranch(b)}
                    className="sr-only"
                  />
                  {b === 'scientific' ? 'زانستی' : 'وێژەیی'}
                </label>
              ))}
            </div>
          </fieldset>

           {/* System Selection */}
          <fieldset>
            <legend className="text-xl font-bold text-slate-800 mb-4 text-center lang-ku" dir="rtl">
              ٢. سیستەمێ خۆ هەلبژێرە:
            </legend>
             <div className="flex justify-center gap-4">
              {(['zankoline', 'parallel'] as System[]).map(s => (
                <label key={s} className={`w-full text-center cursor-pointer px-6 py-3 rounded-lg border-2 font-semibold transition-all ${system === s ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-300 text-slate-700 hover:border-indigo-400'}`}>
                  <input
                    type="radio"
                    name="system"
                    value={s}
                    checked={system === s}
                    onChange={() => setSystem(s)}
                    className="sr-only"
                  />
                  {s === 'zankoline' ? 'زانکۆلاین' : 'پارالێل'}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* City Selection */}
            <fieldset className="lang-ku" dir="rtl">
                <label htmlFor="city" className="block text-xl font-bold text-slate-800 mb-4 text-center">
                  ٣. باژێرێ خۆ هەلبژێرە:
                </label>
                <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                >
                    {cities.map(c => (
                        <option key={c} value={c}>{c === 'all' ? 'هەمی باژێر' : c}</option>
                    ))}
                </select>
            </fieldset>

             {/* Type Selection */}
            <fieldset className="lang-ku" dir="rtl">
                <label className="block text-xl font-bold text-slate-800 mb-4 text-center">
                  ٤. جۆرێ دەزگەهی هەلبژێرە:
                </label>
                <div className="flex justify-center gap-2 sm:gap-4">
                    {(['all', 'college', 'institute'] as CollegeType[]).map(t => (
                        <label key={t} className={`w-full text-center cursor-pointer px-4 py-3 rounded-lg border-2 font-semibold transition-all text-sm sm:text-base ${collegeType === t ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-300 text-slate-700 hover:border-indigo-400'}`}>
                            <input
                                type="radio"
                                name="collegeType"
                                value={t}
                                checked={collegeType === t}
                                onChange={() => setCollegeType(t)}
                                className="sr-only"
                            />
                            {t === 'all' ? 'هەمی' : (t === 'college' ? 'کۆلیژ' : 'پەیمانگەه')}
                        </label>
                    ))}
                </div>
            </fieldset>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Year Range Start */}
            <fieldset className="lang-ku" dir="rtl">
                <label htmlFor="startYear" className="block text-xl font-bold text-slate-800 mb-4 text-center">
                  ٥. ژ سالا:
                </label>
                <select
                    id="startYear"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                >
                    {availableYears.slice().reverse().map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </fieldset>

             {/* Year Range End */}
            <fieldset className="lang-ku" dir="rtl">
                <label htmlFor="endYear" className="block text-xl font-bold text-slate-800 mb-4 text-center">
                  ٦. حەتا سالا:
                </label>
                <select
                    id="endYear"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                >
                    {availableYears.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </fieldset>
        </div>
        
        <fieldset>
           <legend className="text-xl font-bold text-slate-800 mb-4 text-center lang-ku" dir="rtl">
            ٧. کۆنمرەیا خۆ داخل بکە:
          </legend>
          <div className="max-w-xs mx-auto">
             <input
              type="number"
              id="gpa"
              name="gpa"
              value={gpa}
              onChange={e => handleGpaChange(e.target.value)}
              onBlur={e => validateGpaAndSetError(e.target.value)}
              placeholder="بۆ نموونە: 85.54"
              min="0"
              max="100"
              step="any"
              required
              className={`w-full p-3 border-2 rounded-md transition-colors text-center font-bold text-2xl bg-white text-slate-900 ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
              aria-describedby="gpa-error"
            />
            {error && <p id="gpa-error" className="text-red-600 text-sm mt-2 text-center">{error}</p>}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={!formIsValid || isCalculating}
          className="w-full flex justify-center items-center gap-3 p-4 bg-indigo-600 text-white font-bold text-xl rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          {isCalculating && <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
          ئەنجامان ببینە
        </button>
      </form>
    </div>
  );
};

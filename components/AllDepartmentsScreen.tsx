import React from 'react';
import { COLLEGES } from '../data';
import type { College } from '../types';

interface AllDepartmentsScreenProps {
  onBack: () => void;
}

export const AllDepartmentsScreen: React.FC<AllDepartmentsScreenProps> = ({ onBack }) => {

  const collegesByCity = COLLEGES.reduce((acc, college) => {
    const city = college.city;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(college);
    return acc;
  }, {} as Record<string, College[]>);

  const cities = Object.keys(collegesByCity).sort((a,b) => a.localeCompare(b, 'ku'));

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 lang-ku" dir="rtl">
          لیستا هەمی بەشێن زانکۆ و پەیمانگەهان
        </h1>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
        >
          بزڤڕە
        </button>
      </div>

      <div className="space-y-12">
        {cities.map(city => (
          <div key={city}>
            <h2 className="text-2xl font-bold text-slate-700 mb-4 pb-2 border-b-2 border-indigo-500 lang-ku" dir="rtl">
              {city}
            </h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="w-full text-right border-collapse lang-ku" dir="rtl">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-4 font-semibold text-slate-600">بەش</th>
                    <th className="p-4 font-semibold text-slate-600">زانکۆ/پەیمانگەه</th>
                    <th className="p-4 font-semibold text-slate-600 text-center">کۆنمرە (زانکۆلاین)</th>
                    <th className="p-4 font-semibold text-slate-600 text-center">کۆنمرە (پارالێل)</th>
                    <th className="p-4 font-semibold text-slate-600">جۆر</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {collegesByCity[city]
                    .sort((a,b) => a.name.localeCompare(b.name, 'ku'))
                    .map(college => {
                    const gpa2024 = college.historicalGpas.find(g => g.year === 2024);
                    return (
                      <tr key={`${college.name}-${college.university}`} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium text-slate-800">{college.name}</td>
                        <td className="p-4 text-slate-600">{college.university}</td>
                        <td className="p-4 text-center font-bold text-indigo-700">
                          {gpa2024 ? gpa2024.minGpa.toFixed(2) : '-'}
                        </td>
                        <td className="p-4 text-center font-semibold text-blue-600">
                          {gpa2024?.minGpaParallel ? gpa2024.minGpaParallel.toFixed(2) : '-'}
                        </td>
                        <td className="p-4 text-slate-500">
                           {college.type === 'college' ? 'کۆلیژ' : 'پەیمانگەه'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

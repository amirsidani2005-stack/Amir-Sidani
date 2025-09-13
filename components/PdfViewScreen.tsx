import React from 'react';
import { PDF_DATA } from '../pdfData';
import type { DepartmentData } from '../types';

interface PdfViewScreenProps {
  onBack: () => void;
}

export const PdfViewScreen: React.FC<PdfViewScreenProps> = ({ onBack }) => {

  const dataByUniversity = PDF_DATA.reduce((acc, department) => {
    const university = department.university;
    if (!acc[university]) {
      acc[university] = [];
    }
    acc[university].push(department);
    return acc;
  }, {} as Record<string, DepartmentData[]>);

  const universities = Object.keys(dataByUniversity).sort((a,b) => a.localeCompare(b, 'ku'));

  const formatGpa = (gpa: number | string) => {
    if (typeof gpa === 'number' && gpa > 0) {
      return gpa.toFixed(3).replace(/\.?0+$/, '');
    }
    return gpa === 0 ? '-' : gpa;
  };


  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-slate-800 lang-ku" dir="rtl">
          کونمرێن وەرگرتنێ پارێزگەها دهۆک (٢٠٢٤-٢٠٢٥)
        </h1>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
        >
          بزڤڕە
        </button>
      </div>

      <div className="space-y-12">
        {universities.map(uni => (
          <div key={uni}>
            <h2 className="text-2xl font-bold text-slate-700 mb-4 pb-2 border-b-2 border-indigo-500 lang-ku" dir="rtl">
              {uni}
            </h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="w-full text-right border-collapse lang-ku" dir="rtl">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-4 font-semibold text-slate-600">کولیژ/پەیمانگەه</th>
                    <th className="p-4 font-semibold text-slate-600">بەش</th>
                    <th className="p-4 font-semibold text-slate-600">لق</th>
                    <th className="p-4 font-semibold text-slate-600 text-center">زانکۆلاین</th>
                    <th className="p-4 font-semibold text-slate-600 text-center">پارالێل</th>
                    <th className="p-4 font-semibold text-slate-600 text-center">ئیڤاران</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {dataByUniversity[uni]
                    .sort((a,b) => a.college.localeCompare(b.college, 'ku'))
                    .map((item, index) => {
                    return (
                      <tr key={`${item.college}-${item.department}-${index}`} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium text-slate-800">{item.college}</td>
                        <td className="p-4 text-slate-600">{item.department}</td>
                        <td className="p-4 text-slate-500">{item.branch}</td>
                        <td className="p-4 text-center font-bold text-indigo-700">
                           {formatGpa(item.zankoline)}
                        </td>
                        <td className="p-4 text-center font-semibold text-blue-600">
                           {formatGpa(item.parallel)}
                        </td>
                         <td className="p-4 text-center font-semibold text-purple-600">
                           {formatGpa(item.evening)}
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

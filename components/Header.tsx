import React from 'react';

const FlagIcon: React.FC<{ lang: 'uk' | 'kurdistan' }> = ({ lang }) => {
    if (lang === 'uk') {
        return <div className="w-8 h-5 rounded-sm bg-white shadow"><svg width="32" height="20" viewBox="0 0 640 480"><path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="M0 0v59l521 362V480h59L80 59V0h-2z m640 0v59L119 421V480h-59L560 59V0h80z"/><path fill="#C8102E" d="M246 0h148v480H246zM0 166h640v148H0z"/><path fill="#FFF" d="M0 206h640v68H0z"/><path fill="#C8102E" d="M0 219h640v42H0z"/><path fill="#FFF" d="M281 0h78v480h-78zM0 192h640v96H0z"/></svg></div>
    }
    return <div className="w-8 h-5 rounded-sm bg-red-600 flex flex-col justify-around shadow"><div className="h-1/3 bg-red-500"></div><div className="h-1/3 bg-white flex justify-center items-center"><div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div></div><div className="h-1/3 bg-green-600"></div></div>
};

const XpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

const StreakIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
);


interface HeaderProps {
    xp: number;
    streak: number;
}

export const Header: React.FC<HeaderProps> = ({ xp, streak }) => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-lg shadow-sm z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Badini English</h1>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-orange-500 font-bold">
                <StreakIcon className="w-5 h-5" />
                <span>{streak}</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 font-bold">
                <XpIcon className="w-5 h-5" />
                <span>{xp}</span>
            </div>
        </div>
      </div>
    </header>
  );
};
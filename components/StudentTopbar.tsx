import React from 'react';
import { Search } from './Search';

export function StudentTopbar() {
  return (
    <header className="h-20 border-b border-white/40 bg-white/10 backdrop-blur-md sticky top-0 flex items-center justify-between px-8 z-20">
      <div className="flex-1 max-w-xl">
        <Search width={420} />
      </div>
      <div className="flex items-center gap-4 ml-6">
        <button className="w-10 h-10 rounded-full bg-white/40 border border-white/60 flex items-center justify-center text-on-surface hover:bg-white/60 transition-colors shadow-sm">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="flex items-center gap-3 bg-white/40 border border-white/60 pl-2 pr-4 py-1.5 rounded-full shadow-sm cursor-pointer hover:bg-white/60 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500"></div>
          <span className="font-body-md text-sm font-semibold text-on-surface">Aarav M.</span>
        </div>
      </div>
    </header>
  );
}

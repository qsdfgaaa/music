
import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div className="h-16 flex items-center justify-between px-8 z-20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.history.back()}
            className="p-1.5 hover:bg-white/10 rounded-full text-slate-400 transition-colors active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={() => window.history.forward()}
            className="p-1.5 hover:bg-white/10 rounded-full text-slate-400 transition-colors active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="p-1.5 hover:bg-white/10 rounded-full text-slate-400 transition-colors active:scale-95"
          >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          </button>
        </div>

        <div className="relative group">
          <input 
            type="text" 
            placeholder="搜索音乐、歌手、专辑..." 
            className="w-80 bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-500"
          />
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
      </div>

      <div className="flex items-center gap-5 invisible">
      </div>
    </div>
  );
};

export default TopBar;

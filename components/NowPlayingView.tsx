
import React, { useRef, useEffect } from 'react';
import { Song, LyricLine } from '../types';

interface NowPlayingViewProps {
  isOpen: boolean;
  onClose: () => void;
  currentSong: Song;
  isPlaying: boolean;
  currentTime: number;
  onTogglePlay: () => void;
  onOpenComments: () => void;
  onSeek: (time: number) => void;
}

const NowPlayingView: React.FC<NowPlayingViewProps> = ({ 
  isOpen, onClose, currentSong, isPlaying, currentTime, onTogglePlay, onOpenComments, onSeek 
}) => {
  const lyricContainerRef = useRef<HTMLDivElement>(null);

  const durationParts = currentSong.duration.split(':');
  const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
  const progressPercent = (currentTime / totalSeconds) * 100;

  // 找出当前活跃的歌词行
  const activeLyricIndex = (currentSong.lyrics || []).reduce((acc, lyric, index) => {
    if (currentTime >= lyric.time) return index;
    return acc;
  }, 0);

  // 自动滚动歌词
  useEffect(() => {
    if (lyricContainerRef.current) {
      const activeLine = lyricContainerRef.current.children[activeLyricIndex] as HTMLElement;
      if (activeLine) {
        lyricContainerRef.current.scrollTo({
          top: activeLine.offsetTop - 150,
          behavior: 'smooth'
        });
      }
    }
  }, [activeLyricIndex]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    onSeek(Math.floor(percent * totalSeconds));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 animate-in fade-in zoom-in-95 duration-500 flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={currentSong.cover} className="w-full h-full object-cover blur-[100px] opacity-30 scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950" />
      </div>

      <div className="relative z-10 flex items-center justify-between px-10 py-8">
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center gap-32 px-20 -mt-10">
        <div className="relative flex-shrink-0">
          <div className="w-[420px] h-[420px] bg-white rounded-[40px] shadow-2xl relative flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-200" />
             <div className={`relative w-[320px] h-[320px] rounded-full bg-[#111] shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center ${isPlaying ? 'animate-[spin_20s_linear_infinite]' : ''}`}>
                <div className="absolute inset-0 rounded-full border-[10px] border-black/40" />
                <img src={currentSong.cover} className="w-[190px] h-[190px] rounded-full object-cover ring-4 ring-black" alt="Cover" />
             </div>
             <div className={`absolute top-10 right-14 transition-transform duration-700 origin-[30px_30px] z-20 ${isPlaying ? 'rotate-[25deg]' : 'rotate-0'}`}>
                <div className="w-10 h-10 bg-slate-300 rounded-full shadow-lg border-4 border-white flex items-center justify-center">
                   <div className="w-4 h-4 bg-slate-500 rounded-full" />
                </div>
                <div className="w-2 h-36 bg-gradient-to-b from-slate-300 to-slate-400 ml-[14px] -mt-2 rounded-full shadow-sm" />
                <div className="w-6 h-10 bg-slate-400 ml-[10px] -mt-2 rounded-lg shadow-md border-b-2 border-slate-600" />
             </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/40 blur-2xl rounded-full" />
        </div>

        <div className="flex-1 max-w-xl text-center md:text-left">
           <div className="mb-8">
             <h1 className="text-4xl font-black mb-4 tracking-tight text-white drop-shadow-sm">{currentSong.title}</h1>
             <div className="flex items-center gap-4 text-lg font-medium text-emerald-400">
                <span>{currentSong.artist}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span className="text-slate-400 italic">专辑：{currentSong.album}</span>
             </div>
           </div>

           {/* 动态歌词滚动区 */}
           <div 
            ref={lyricContainerRef}
            className="space-y-6 text-slate-500 font-bold text-2xl h-[360px] overflow-y-auto overflow-x-hidden custom-scrollbar pr-4 relative"
           >
              {currentSong.lyrics?.map((lyric, index) => (
                <p 
                  key={index}
                  className={`transition-all duration-500 cursor-pointer hover:text-slate-300 ${index === activeLyricIndex ? 'text-white scale-110 origin-left text-3xl' : 'opacity-40'}`}
                  onClick={() => onSeek(lyric.time)}
                >
                  {lyric.text}
                </p>
              ))}
              {!currentSong.lyrics && <p className="text-slate-400">暂无歌词</p>}
           </div>
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between mb-8 px-10">
           <div className="flex items-center gap-8 text-slate-400">
             <button className="hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
             </button>
             <button className="hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
             </button>
             {/* 恢复评论图标 */}
             <button onClick={onOpenComments} className="hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
             </button>
           </div>

           <div className="flex items-center gap-8">
              <button className="text-slate-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg></button>
              <button 
                onClick={onTogglePlay}
                className="w-14 h-14 bg-white text-slate-950 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>
                ) : (
                  <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                )}
              </button>
              <button className="text-slate-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg></button>
           </div>

           <div className="flex items-center gap-6">
              <button className="px-3 py-1 rounded border border-white/20 text-[9px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">标准</button>
              <button className="px-2 py-0.5 bg-emerald-500 text-slate-950 rounded text-[10px] font-black">词</button>
              <button className="text-slate-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg></button>
           </div>
        </div>

        <div className="w-full max-w-6xl mx-auto flex items-center gap-5 px-10 pb-12 group">
          <span className="text-xs font-mono text-slate-500 w-10 text-right opacity-80">{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer relative"
            onClick={handleSeek}
          >
             <div className="absolute inset-0 bg-emerald-500/5 rounded-full" />
             <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
             <div className="absolute left-[0%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] scale-0 group-hover:scale-100 transition-transform duration-200" style={{ left: `${progressPercent}%` }} />
          </div>
          <span className="text-xs font-mono text-slate-500 w-10 opacity-80">{currentSong.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingView;

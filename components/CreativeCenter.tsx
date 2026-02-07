
import React, { useState } from 'react';
import { USER_CREATIONS } from '../constants';
import { Song } from '../types';

interface CreativeCenterProps {
  onPlaySong: (song: Partial<Song>) => void;
}

const CATEGORIES = ["全部", "流行", "摇滚", "电子", "民谣", "说唱", "古典", "爵士", "轻音乐", "其他"];

const CreativeCenter: React.FC<CreativeCenterProps> = ({ onPlaySong }) => {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // 模拟排序：1, 2, 3
  const rank1 = USER_CREATIONS[0];
  const rank2 = USER_CREATIONS[1];
  const rank3 = USER_CREATIONS[2];

  const renderRankCard = (song: typeof USER_CREATIONS[0], rank: number, isCenter: boolean) => {
    // 统一使用项目翡翠绿色系
    const borderColor = rank === 1 ? 'border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'border-white/10 shadow-black/20';
    const highlightColor = rank === 1 ? 'text-emerald-400' : 'text-slate-400';
    
    return (
      <div 
        className={`relative flex flex-col items-center justify-center p-6 rounded-[32px] glass border-2 transition-all duration-700 group cursor-pointer ${borderColor} ${isCenter ? 'h-[340px] scale-110 z-10 bg-emerald-500/5' : 'h-[280px] opacity-70 hover:opacity-100 hover:bg-white/5'}`}
        onClick={() => onPlaySong(song)}
      >
        {/* 背景光晕 (仅第一名) */}
        {rank === 1 && (
          <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full -z-10 animate-pulse" />
        )}

        {/* 背景大数字 */}
        <div className="absolute top-6 right-8 text-8xl font-black text-white/[0.03] select-none transition-transform group-hover:scale-110 group-hover:text-white/[0.06]">
          {rank}
        </div>

        {/* 头像 */}
        <div className={`relative mb-5 rounded-full p-1.5 border-2 transition-transform duration-500 group-hover:rotate-12 ${rank === 1 ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-white/20'}`}>
          <img src={song.cover} className="w-24 h-24 rounded-full object-cover shadow-2xl" alt={song.title} />
          {rank === 1 && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="m12 15 3.5 3.5 1.5-1.5-5-5-5 5 1.5 1.5L12 15Z"/><path d="m12 9 3.5 3.5 1.5-1.5-5-5-5 5 1.5 1.5L12 9Z"/></svg>
            </div>
          )}
        </div>

        {/* 标题与艺人 */}
        <div className="text-center mb-8 relative z-10">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <h3 className={`text-xl font-black truncate max-w-[160px] transition-colors ${rank === 1 ? 'text-white' : 'text-slate-200'}`}>{song.title}</h3>
            <span className="text-[9px] bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded-sm">VIP</span>
          </div>
          <p className="text-sm text-slate-400 font-bold tracking-wide">{song.artist}</p>
        </div>

        {/* 热度 Badge */}
        <div className={`flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${rank === 1 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-500 group-hover:bg-white/10 group-hover:text-slate-300'}`}>
          <svg className={rank === 1 ? 'animate-bounce' : ''} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          {song.playCount || '250.0万'} 热度
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto px-10 pb-40 pt-10 bg-slate-950 custom-scrollbar relative">
      {/* 背景动态装饰 */}
      <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* 创作热度榜 Header */}
      <header className="flex items-center justify-between mb-16 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
            <svg className="text-emerald-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 7-5-5-5 5"/><path d="m17 17-5 5-5-5"/></svg>
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">创作热度榜</h1>
            <p className="text-xs text-slate-500 font-bold tracking-[0.3em] uppercase mt-1">Creation Hot Ranking</p>
          </div>
        </div>
        
        <button className="px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-xl text-xs font-black transition-all active:scale-95 flex items-center gap-3">
          {/* Fixed malformed SVG close tag */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          我的创作室
        </button>
      </header>

      {/* 2-1-3 阶梯式布局 */}
      <div className="grid grid-cols-[1fr_1.1fr_1fr] items-end gap-10 mb-28 max-w-6xl mx-auto px-4">
        <div className="animate-in slide-in-from-left-10 duration-1000">
           {renderRankCard(rank2, 2, false)}
        </div>
        <div className="animate-in zoom-in duration-700">
           {renderRankCard(rank1, 1, true)}
        </div>
        <div className="animate-in slide-in-from-right-10 duration-1000">
           {renderRankCard(rank3, 3, false)}
        </div>
      </div>

      {/* 最新发布 Section */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-white">最新发布</h2>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${activeCategory === cat ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 歌曲列表 - 统一翡翠绿风格 */}
        <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-5 duration-700">
          {USER_CREATIONS.map((song, idx) => {
            const isTop3 = idx < 3;
            return (
              <div 
                key={song.id}
                onMouseEnter={() => setHoveredId(song.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`grid grid-cols-[60px_40px_1fr_200px_100px_120px] items-center px-8 py-5 rounded-2xl transition-all group border border-transparent ${hoveredId === song.id ? 'bg-white/5 border-white/5 shadow-xl translate-x-1' : 'hover:bg-white/[0.02]'}`}
              >
                {/* 排名 */}
                <div className={`text-xl font-black italic tracking-tighter ${isTop3 ? 'text-emerald-500' : 'text-slate-700 group-hover:text-slate-500'}`}>
                  {(idx + 1).toString().padStart(2, '0')}
                </div>

                {/* 喜欢 */}
                <button className="text-slate-600 hover:text-emerald-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>

                {/* 信息 (标题与封面) */}
                <div className="flex items-center gap-5 min-w-0 pr-6">
                  <div 
                    className="relative w-12 h-12 flex-shrink-0 rounded-xl overflow-hidden group/cover cursor-pointer border-2 border-transparent hover:border-emerald-500/50 shadow-lg"
                    onClick={() => onPlaySong(song)}
                  >
                    <img src={song.cover} className="w-full h-full object-cover transition-transform group-hover/cover:scale-110" alt={song.title} />
                    <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover/cover:opacity-100 flex items-center justify-center transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 truncate">
                    <span className={`text-base font-bold transition-colors truncate ${isTop3 ? 'text-emerald-400 group-hover:text-white' : 'text-slate-200 group-hover:text-emerald-400'}`}>
                      {song.title}
                    </span>
                    <div className="flex gap-1">
                      <span className="text-[8px] bg-emerald-500 text-white font-black px-1 rounded-sm leading-none py-0.5">VIP</span>
                      <span className="text-[8px] border border-emerald-500/40 text-emerald-400 px-1 rounded-sm leading-none py-0.5 bg-emerald-500/5">SQ</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-bold ml-auto opacity-0 group-hover:opacity-100 transition-opacity">by {song.artist}</span>
                </div>

                {/* 类型/专辑 */}
                <div className="text-xs font-bold text-slate-600 truncate pr-6 uppercase tracking-widest group-hover:text-slate-400">
                  {song.album}
                </div>

                {/* 时长 */}
                <div className="text-xs font-mono font-bold text-slate-700 group-hover:text-emerald-500">
                  {song.duration || '04:59'}
                </div>

                {/* 热度统计 */}
                <div className="flex items-center justify-end gap-2 text-[11px] font-black text-slate-600 pr-4">
                   <div className="flex items-center gap-1 group-hover:text-emerald-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="opacity-40"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      {song.playCount || '250.0万'}
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CreativeCenter;

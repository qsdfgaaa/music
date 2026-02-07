
import React from 'react';
import { Playlist, Song } from '../types';
import { RECOMMENDED_SONGS } from '../constants';

interface PlaylistDetailViewProps {
  playlist: Playlist;
  onBack: () => void;
  onPlaySong: (song: Partial<Song>) => void;
}

const PlaylistDetailView: React.FC<PlaylistDetailViewProps> = ({ playlist, onBack, onPlaySong }) => {
  // 基础背景色
  const bgColor = playlist.color || "from-emerald-500/20";

  return (
    <div className={`flex-1 flex flex-col overflow-hidden bg-gradient-to-b ${bgColor} via-slate-950/80 to-slate-950 animate-in fade-in duration-1000 relative`}>
      {/* 动态背景装饰 */}
      <div className="absolute top-0 left-0 right-0 h-full opacity-[0.02] pointer-events-none select-none flex items-center justify-center overflow-hidden">
        <span className="text-[38rem] font-black text-white leading-none rotate-12 tracking-tighter">
          {playlist.isRanking ? 'TOPCHART' : 'MUSEFLOW'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
        {/* 顶部返回导航 */}
        <div className="px-8 py-6">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-white/50 hover:text-emerald-400 transition-all active:scale-95"
          >
            <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-2xl border border-white/10 group-hover:border-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </div>
          </button>
        </div>

        {/* 头部详情区 */}
        <header className="px-12 pt-4 pb-16 flex gap-12 items-end">
          <div className="relative group flex-shrink-0">
            {/* 封面发光效果 */}
            <div className="absolute -inset-4 bg-emerald-500/10 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative w-60 h-60 rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/10">
              <img 
                src={playlist.cover} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                alt={playlist.title} 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                 <div className="w-16 h-16 bg-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col pb-2">
            <div className="flex items-center gap-3 mb-5">
              <span className={`px-2.5 py-0.5 rounded border text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${playlist.isRanking ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                {playlist.isRanking ? 'Official Ranking' : 'Curated Playlist'}
              </span>
            </div>
            <h1 className="text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">{playlist.title}</h1>
            
            <div className="flex items-center gap-8 text-slate-400 text-xs font-bold mb-10 tracking-wide uppercase">
              {playlist.isRanking ? (
                <span className="flex items-center gap-2">
                  <svg className="text-emerald-500" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  更新：2026-02-07
                </span>
              ) : (
                <p className="max-w-xl line-clamp-1 italic opacity-80 normal-case font-medium">{playlist.description || "聆听灵魂深处的回响，发现不一样的音乐世界。"}</p>
              )}
              <span className="flex items-center gap-2">
                <svg className="text-emerald-500" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                {playlist.playCount} 热度
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => onPlaySong(RECOMMENDED_SONGS[0])}
                className="flex items-center gap-3 px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full transition-all active:scale-95 shadow-[0_15px_40px_rgba(16,185,129,0.3)] group"
              >
                <div className="w-6 h-6 bg-slate-950/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <span className="font-black text-sm uppercase tracking-widest">立即播放</span>
              </button>

              <button className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all active:scale-95 border border-white/5 font-bold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                下载全部
              </button>

              <button className="flex items-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all active:scale-95 border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
            </div>
          </div>
        </header>

        {/* 歌曲列表区 */}
        <section className="px-12 pb-40">
          <div className="grid grid-cols-[60px_1fr_200px_200px_100px] px-8 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 border-b border-white/5">
            <span>#</span>
            <span>标题 / 格式</span>
            <span>艺人</span>
            <span>专辑</span>
            <span className="text-right pr-4">时长</span>
          </div>

          <div className="space-y-1.5">
            {RECOMMENDED_SONGS.map((song, idx) => (
              <div 
                key={song.id}
                className="grid grid-cols-[60px_1fr_200px_200px_100px] items-center px-8 py-4 rounded-[20px] transition-all group hover:bg-white/5 hover:translate-x-1 border border-transparent hover:border-white/5"
              >
                <div className="text-xs font-mono font-bold text-slate-700 group-hover:text-emerald-500 transition-colors">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>

                <div className="flex items-center gap-6 min-w-0 pr-8">
                  <button className="text-slate-700 hover:text-emerald-400 transition-colors flex-shrink-0 active:scale-90">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                  <div className="flex items-center gap-3 truncate">
                    <span 
                      onClick={() => onPlaySong(song)}
                      className="text-base font-bold text-slate-200 cursor-pointer hover:text-emerald-400 truncate transition-colors"
                    >
                      {song.title}
                    </span>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {song.isHiRes && (
                        <span className="text-[8px] font-black border border-emerald-500/30 text-emerald-500/80 px-1.5 rounded-sm bg-emerald-500/5 leading-none py-1 uppercase tracking-tighter">
                          臻品母带
                        </span>
                      )}
                      {song.isVip && (
                        <span className="text-[8px] font-black bg-emerald-500 text-slate-950 px-1.5 rounded-sm leading-none py-1 uppercase tracking-tighter shadow-sm">
                          VIP
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors truncate pr-6">
                  {song.artist}
                </div>

                <div className="text-sm font-medium text-slate-600 group-hover:text-slate-400 transition-colors truncate pr-6 italic opacity-70">
                  {song.album}
                </div>

                <div className="text-xs font-mono font-black text-slate-700 text-right pr-4 group-hover:text-emerald-500 transition-colors">
                  {song.duration}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlaylistDetailView;

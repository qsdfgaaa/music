
import React from 'react';
import { Playlist, Song } from '../types';
import { RECOMMENDED_SONGS } from '../constants';

interface PlaylistDetailViewProps {
  playlist: Playlist;
  onBack: () => void;
  onPlaySong: (song: Partial<Song>) => void;
}

const PlaylistDetailView: React.FC<PlaylistDetailViewProps> = ({ playlist, onBack, onPlaySong }) => {
  // 使用项目统一的翡翠绿作为主色调背景，根据榜单或歌单属性匹配颜色
  const bgColor = playlist.color || "from-emerald-500/20";

  return (
    <div className={`flex-1 flex flex-col overflow-hidden bg-gradient-to-b ${bgColor} via-slate-950/80 to-slate-950 animate-in fade-in duration-700 relative`}>
      {/* 装饰性背景水印 */}
      <div className="absolute top-0 left-0 right-0 h-full opacity-[0.03] pointer-events-none select-none flex items-center justify-center overflow-hidden">
        <span className="text-[35rem] font-black text-white leading-none rotate-12 tracking-tighter">
          {playlist.isRanking ? 'TOPCHART' : 'PLAYLIST'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
        {/* 顶部导航 */}
        <div className="px-8 py-6 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </div>
          </button>
        </div>

        {/* 头部详情区 */}
        <header className="px-12 pt-4 pb-16 flex gap-12 items-end">
          <div className="relative group flex-shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src={playlist.cover} 
              className="relative w-56 h-56 rounded-2xl object-cover border border-white/10" 
              alt={playlist.title} 
            />
            <div className="absolute bottom-3 left-3 w-8 h-8 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
          </div>

          <div className="flex-1 flex flex-col pb-2">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-2 py-0.5 rounded border text-[10px] font-black uppercase tracking-widest ${playlist.isRanking ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                {playlist.isRanking ? 'Official Chart' : 'Curated Playlist'}
              </span>
            </div>
            <h1 className="text-6xl font-black text-white mb-6 tracking-tighter drop-shadow-lg">{playlist.title}</h1>
            
            <div className="flex items-center gap-6 text-slate-400 text-xs font-bold mb-10">
              {playlist.isRanking ? (
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  更新时间：2026-02-07
                </span>
              ) : (
                <p className="max-w-xl line-clamp-1 italic opacity-80">{playlist.description}</p>
              )}
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                {playlist.playCount} 次收听
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => onPlaySong(RECOMMENDED_SONGS[0])}
                className="flex items-center gap-3 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full transition-all active:scale-95 shadow-xl shadow-emerald-500/20 group"
              >
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <span className="font-black text-sm uppercase tracking-widest">播放全部</span>
              </button>

              <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all active:scale-95 border border-white/5 font-bold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                下载
              </button>

              <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all active:scale-95 border border-white/5 font-bold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v1H4zm0 6h1v1H4zm0 6h1v1H4z"/></svg>
                批量操作
              </button>
            </div>
          </div>
        </header>

        {/* 歌曲列表 */}
        <section className="px-12 pb-40">
          <div className="grid grid-cols-[60px_1fr_200px_200px_100px] px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-2 border-b border-white/5 bg-white/[0.01]">
            <span>#</span>
            <span>歌曲</span>
            <span>歌手</span>
            <span>专辑</span>
            <span className="text-right pr-4">时长</span>
          </div>

          <div className="space-y-1">
            {RECOMMENDED_SONGS.map((song, idx) => (
              <div 
                key={song.id}
                className="grid grid-cols-[60px_1fr_200px_200px_100px] items-center px-6 py-3 rounded-xl transition-all group hover:bg-white/5 hover:translate-x-1"
              >
                <div className="text-xs font-mono font-bold text-slate-600 group-hover:text-emerald-500 transition-colors">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>

                <div className="flex items-center gap-5 min-w-0 pr-8">
                  <button className="text-slate-600 hover:text-emerald-400 transition-colors flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                  <div className="flex items-center gap-3 truncate">
                    <span 
                      onClick={() => onPlaySong(song)}
                      className="text-base font-bold text-slate-200 cursor-pointer hover:text-emerald-400 truncate transition-colors"
                    >
                      {song.title}
                    </span>
                    {song.isHiRes && (
                      <span className="text-[8px] font-black border border-emerald-500/40 text-emerald-400 px-1 rounded-sm bg-emerald-500/5 leading-none py-1 flex-shrink-0">
                        臻品母带
                      </span>
                    )}
                    {song.isVip && (
                      <span className="text-[8px] font-black bg-emerald-500 text-slate-950 px-1 rounded-sm leading-none py-1 flex-shrink-0">
                        VIP
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors truncate pr-6">
                  {song.artist}
                </div>

                <div className="text-sm font-medium text-slate-500 group-hover:text-slate-300 transition-colors truncate pr-6 italic opacity-60">
                  {song.album}
                </div>

                <div className="text-xs font-mono font-bold text-slate-600 text-right pr-4 group-hover:text-emerald-500 transition-colors">
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

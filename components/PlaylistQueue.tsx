
import React from 'react';
import { RECOMMENDED_SONGS } from '../constants';
import { Song } from '../types';

interface PlaylistQueueProps {
  isOpen: boolean;
  onClose: () => void;
  currentSongId: string;
  onPlaySong: (song: Song) => void;
}

const PlaylistQueue: React.FC<PlaylistQueueProps> = ({ isOpen, onClose, currentSongId, onPlaySong }) => {
  return (
    <div 
      className={`fixed top-0 right-0 bottom-24 w-[380px] bg-slate-950 border-l border-white/5 z-[55] flex flex-col transition-transform duration-500 ease-in-out shadow-[0_0_50px_rgba(0,0,0,0.8)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/5 bg-slate-900/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black tracking-tight text-slate-100">播放队列</h2>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button className="text-slate-400 hover:text-red-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
          <span>共 {RECOMMENDED_SONGS.length} 首歌曲</span>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 bg-slate-950">
        <div className="space-y-0.5">
          {RECOMMENDED_SONGS.map((song) => {
            const isActive = song.id === currentSongId;
            return (
              <div 
                key={song.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all group relative ${isActive ? 'bg-white/5' : 'hover:bg-white/[0.03]'}`}
              >
                {/* 封面图 - 包含悬停播放按钮 */}
                <div 
                  className={`relative w-11 h-11 flex-shrink-0 group/cover cursor-pointer rounded-lg overflow-hidden transition-all duration-300 border-2 ${isActive ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-transparent group-hover/cover:border-white/40'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlaySong(song);
                  }}
                >
                  <img src={song.cover} className="w-full h-full object-cover transition-transform group-hover/cover:scale-110" alt={song.title} />
                  
                  {/* 黑色阴影完全覆盖图片 (参考用户提供图) */}
                  <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover/cover:opacity-100'}`}>
                    {isActive ? (
                      <div className="flex items-center gap-[2px] h-3">
                        <div className="w-[2px] h-full bg-emerald-400 animate-[bounce_1s_infinite_0ms]" />
                        <div className="w-[2px] h-3/4 bg-emerald-400 animate-[bounce_1s_infinite_200ms]" />
                        <div className="w-[2px] h-full bg-emerald-400 animate-[bounce_1s_infinite_400ms]" />
                      </div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    )}
                  </div>
                </div>
                
                {/* 歌曲详情区 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-sm font-bold truncate tracking-tight transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-200 group-hover:text-emerald-400'}`}>
                          {song.title}
                        </span>
                        {/* 状态标签 */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {song.isVip && (
                            <span className="text-[8px] font-black border border-emerald-500/40 text-emerald-400 px-1 rounded-sm leading-none py-0.5 bg-emerald-500/5">VIP</span>
                          )}
                          {song.isHiRes && (
                            <span className="text-[8px] font-black border border-amber-500/40 text-amber-500 px-1 rounded-sm leading-none py-0.5 bg-amber-500/5 uppercase">Hi-Res</span>
                          )}
                        </div>
                      </div>
                      <p className={`text-[10px] truncate transition-colors ${isActive ? 'text-emerald-400/60' : 'text-slate-500 group-hover:text-slate-400'}`}>{song.artist}</p>
                    </div>

                    {/* 交互图标组 */}
                    <div className="flex items-center gap-3 text-slate-500 pr-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                      <button className="hover:text-emerald-400 transition-colors p-1" title="喜欢">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                      </button>
                      <button className="hover:text-emerald-400 transition-colors p-1" title="链接">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                      </button>
                      <button className="hover:text-emerald-400 transition-colors p-1" title="更多">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlaylistQueue;

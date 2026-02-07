
import React from 'react';
import { MOCK_PLAYLISTS } from '../constants';
import { Song, Playlist } from '../types';

interface HomeProps {
  onPlaySong: (song?: Partial<Song>) => void;
  onPlaylistClick: (playlist: Playlist) => void;
  onNavigate: () => void;
}

const Home: React.FC<HomeProps> = ({ onPlaySong, onPlaylistClick, onNavigate }) => {
  const getGreetingInfo = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { text: '早安，音乐探索者', sub: '开启充满活力的一天' };
    if (hour >= 12 && hour < 18) return { text: '午后好，放松时刻', sub: '用旋律滤掉午后的喧嚣' };
    return { text: '晚安，沉溺音海', sub: '让梦境伴随柔和的节拍' };
  };

  const info = getGreetingInfo();

  return (
    <div className="flex-1 overflow-y-auto px-10 pb-32 pt-8 custom-scrollbar animate-in fade-in duration-700">
      {/* 动态头部 */}
      <header className="mb-14 relative group">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/5 blur-[80px] -z-10 animate-pulse" />
        <h1 className="text-5xl font-black text-white mb-3 tracking-tighter">
          {info.text}
        </h1>
        <p className="text-slate-500 font-black text-xs uppercase tracking-[0.4em] opacity-80">
          {info.sub}
        </p>
      </header>

      {/* 推荐歌单 */}
      <section>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-white tracking-tight">甄选歌单</h2>
            <div className="h-px w-20 bg-gradient-to-r from-emerald-500/50 to-transparent" />
          </div>
          <button 
            onClick={onNavigate}
            className="group flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/5 hover:border-emerald-500/30 text-xs font-black text-slate-400 hover:text-emerald-400 transition-all active:scale-95"
          >
            探索更多专栏
            <svg className="transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {MOCK_PLAYLISTS.map((playlist) => (
            <div 
              key={playlist.id} 
              className="group cursor-pointer"
              onClick={() => onPlaylistClick(playlist)}
            >
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-4 shadow-2xl transition-all duration-700 border-2 border-transparent group-hover:border-emerald-500/40 group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)]">
                <img 
                  src={playlist.cover} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={playlist.title} 
                />
                
                {/* 悬停播放光圈 */}
                <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div 
                    onClick={(e) => { e.stopPropagation(); onPlaySong({ title: playlist.title, cover: playlist.cover }); }}
                    className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="slate-950"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>

                {/* 播放数标签 */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-950/40 backdrop-blur-xl text-[10px] font-black flex items-center gap-1.5 text-white/90 border border-white/10 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-400"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  {playlist.playCount}
                </div>
              </div>
              
              <div className="px-2">
                <h4 className="text-sm font-bold line-clamp-2 text-slate-200 group-hover:text-emerald-400 transition-colors leading-snug tracking-tight">{playlist.title}</h4>
                <p className="mt-1 text-[10px] font-bold text-slate-600 uppercase tracking-widest">{playlist.playCount} LISTENERS</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

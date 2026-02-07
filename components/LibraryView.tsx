
import React from 'react';
import { Song } from '../types';
import { RECOMMENDED_SONGS } from '../constants';

interface LibraryViewProps {
  type: 'favorites' | 'recent';
  onPlaySong: (song: Partial<Song>) => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({ type, onPlaySong }) => {
  const getConfig = () => {
    switch (type) {
      case 'favorites':
        return {
          title: "我喜欢",
          subtitle: "Favorite Music",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
          gradient: "from-emerald-600/20",
          desc: "这里收藏着你最珍视的每一缕音符。"
        };
      case 'recent':
        return {
          title: "最近播放",
          subtitle: "Recently Played",
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
          gradient: "from-blue-600/20",
          desc: "记录你与音乐擦肩而过的每一个瞬间。"
        };
      default:
        return {
          title: "",
          subtitle: "",
          icon: null,
          gradient: "",
          desc: ""
        };
    }
  };

  const config = getConfig();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 animate-in fade-in duration-500">
      {/* 沉浸式背景 */}
      <div className={`absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b ${config.gradient} to-transparent opacity-50 -z-0`} />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 px-12 pt-16">
        <header className="flex items-end gap-10 mb-12">
          <div className="w-48 h-48 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-xl group">
             <div className="transition-transform duration-500 group-hover:scale-110">
               {config.icon}
             </div>
          </div>
          
          <div className="flex-1 pb-4">
            <h4 className="text-xs font-black text-emerald-400 uppercase tracking-[0.4em] mb-4">{config.subtitle}</h4>
            <h1 className="text-6xl font-black text-white mb-6 tracking-tight">{config.title}</h1>
            <p className="text-slate-400 font-medium mb-8 max-w-lg italic opacity-80">{config.desc}</p>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onPlaySong(RECOMMENDED_SONGS[0])}
                className="flex items-center gap-3 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-xl shadow-emerald-500/20 transition-all active:scale-95 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <span className="font-black text-sm uppercase tracking-widest">播放全部</span>
              </button>
            </div>
          </div>
        </header>

        {/* 歌曲列表部分 */}
        <section className="pb-40">
          <div className="grid grid-cols-[60px_1fr_250px_100px] px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.25em] mb-2 border-b border-white/5">
            <span>#</span>
            <span>歌名/歌手</span>
            <span>专辑</span>
            <span className="text-right pr-4">时长</span>
          </div>

          <div className="space-y-1">
            {RECOMMENDED_SONGS.map((song, idx) => (
              <div 
                key={song.id}
                className="grid grid-cols-[60px_1fr_250px_100px] items-center px-6 py-4 rounded-2xl transition-all group hover:bg-emerald-500/5 hover:translate-x-1 border border-transparent hover:border-emerald-500/10"
              >
                <div className="text-xs font-mono font-bold text-slate-600 group-hover:text-emerald-500 transition-colors">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>

                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-12 h-12 flex-shrink-0 group/cover cursor-pointer rounded-lg overflow-hidden border-2 border-transparent group-hover:border-emerald-500/30 transition-all" onClick={() => onPlaySong(song)}>
                    <img src={song.cover} className="w-full h-full object-cover group-hover/cover:scale-110 transition-transform" alt={song.title} />
                    <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover/cover:opacity-100 flex items-center justify-center transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-200 group-hover:text-emerald-400 transition-colors truncate">{song.title}</span>
                      {song.isVip && <span className="text-[8px] bg-emerald-500 text-white font-black px-1 py-0.5 rounded-sm">VIP</span>}
                    </div>
                    <span className="text-xs text-slate-500 font-bold group-hover:text-slate-400 transition-colors">{song.artist}</span>
                  </div>
                </div>

                <div className="text-sm font-medium text-slate-600 group-hover:text-slate-400 transition-colors truncate pr-6">
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

export default LibraryView;

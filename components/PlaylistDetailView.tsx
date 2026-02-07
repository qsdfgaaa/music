
import React from 'react';
import { Playlist, Song } from '../types';
import { RECOMMENDED_SONGS } from '../constants';

interface PlaylistDetailViewProps {
  playlist: Playlist;
  onBack: () => void;
  onPlaySong: (song: Partial<Song>) => void;
}

const PlaylistDetailView: React.FC<PlaylistDetailViewProps> = ({ playlist, onBack, onPlaySong }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 animate-in fade-in slide-in-from-right-5 duration-500">
      {/* 顶部模糊背景 */}
      <div className="absolute top-0 left-0 right-0 h-[450px] overflow-hidden -z-0">
        <img src={playlist.cover} className="w-full h-full object-cover blur-[100px] opacity-20 scale-125" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950" />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
        {/* 顶部导航 */}
        <div className="sticky top-0 px-8 py-6 flex items-center justify-between z-20">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </div>
            <span className="font-bold text-sm">返回</span>
          </button>

          {/* 右侧扫码区域已根据要求删除 */}
          <div className="invisible">
            {/* 保持布局平衡的占位符 */}
          </div>
        </div>

        {/* 歌单信息头部 */}
        <header className="px-12 pt-4 pb-12 flex gap-10">
          <div className="relative group flex-shrink-0">
            <div className="absolute -inset-2 bg-emerald-500/20 blur-2xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src={playlist.cover} 
              className="relative w-64 h-64 rounded-[40px] object-cover shadow-2xl border-2 border-white/5" 
              alt={playlist.title} 
            />
          </div>

          <div className="flex-1 flex flex-col justify-center min-w-0">
            <h1 className="text-5xl font-black text-white mb-4 tracking-tight leading-tight">{playlist.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <img src="https://picsum.photos/seed/user/32/32" className="w-6 h-6 rounded-full" alt="User" />
                <span className="text-sm text-slate-300 font-bold hover:text-emerald-400 cursor-pointer transition-colors">又该换耳机了</span>
              </div>
              <div className="flex gap-2">
                {["#伤感", "#网络歌曲", "#国语"].map(tag => (
                  <span key={tag} className="text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors cursor-pointer">{tag}</span>
                ))}
              </div>
            </div>

            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-2xl line-clamp-2 mb-8 italic">
              {playlist.description || "我思念你却无法去找你，更不能向他人倾诉。这份思念仅仅只是空想。即使如此，我依旧思念你。爱随风而起，风起意难平。"}
            </p>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => onPlaySong(RECOMMENDED_SONGS[0])}
                className="flex items-center gap-3 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-xl shadow-emerald-500/20 transition-all active:scale-95 group"
              >
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <span className="font-black text-sm uppercase tracking-widest">播放全部</span>
              </button>

              <button className="flex items-center gap-3 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 transition-all active:scale-95 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <span className="font-black text-sm uppercase tracking-widest">收藏</span>
              </button>

              <button className="w-12 h-12 bg-white/5 hover:bg-white/10 flex items-center justify-center rounded-full border border-white/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
            </div>
          </div>
        </header>

        {/* 标签页选择 */}
        <nav className="px-12 flex gap-10 border-b border-white/5 mb-6">
          <button className="relative py-4 text-base font-black text-emerald-400">
            歌曲 61
            <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-full" />
          </button>
          <button className="py-4 text-base font-bold text-slate-500 hover:text-white transition-colors">
            评论 10
          </button>
        </nav>

        {/* 歌曲列表 */}
        <section className="px-12 pb-40">
          <div className="grid grid-cols-[60px_1fr_40px_250px_100px] px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.25em] mb-2">
            <span>#</span>
            <span>歌名/歌手</span>
            <span></span>
            <span>专辑</span>
            <span className="text-right pr-4">时长</span>
          </div>

          <div className="space-y-1">
            {RECOMMENDED_SONGS.map((song, idx) => (
              <div 
                key={song.id}
                className="grid grid-cols-[60px_1fr_40px_250px_100px] items-center px-6 py-4 rounded-2xl transition-all group hover:bg-emerald-500/5 hover:translate-x-1 border border-transparent hover:border-emerald-500/10"
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
                      {song.isHiRes && <span className="text-[8px] border border-emerald-500 text-emerald-500 px-1 py-0.5 rounded-sm bg-emerald-500/5">臻品母带</span>}
                    </div>
                    <span className="text-xs text-slate-500 font-bold group-hover:text-slate-400 transition-colors">{song.artist}</span>
                  </div>
                </div>

                <button className="text-slate-600 hover:text-emerald-500 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>

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

export default PlaylistDetailView;

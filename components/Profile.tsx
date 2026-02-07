
import React, { useState } from 'react';
import { RECOMMENDED_SONGS, MOCK_PLAYLISTS } from '../constants';
import { Playlist, Song } from '../types';

interface ProfileProps {
  onPlaylistClick?: (playlist: Playlist) => void;
  onPlaySong?: (song: Partial<Song>) => void;
}

const Profile: React.FC<ProfileProps> = ({ onPlaylistClick, onPlaySong }) => {
  const [activeMainTab, setActiveMainTab] = useState('我喜欢');
  const [activeSubTab, setActiveSubTab] = useState('歌曲');

  const mainTabs = ['我喜欢', '创建的歌单', '上传的视频'];
  // 按照要求，我喜欢下仅保留 歌曲 和 歌单
  const subTabs = ['歌曲', '歌单'];

  const renderSongs = () => (
    <div className="animate-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-[1fr_300px_350px] px-8 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 border-b border-white/5">
        <span>歌曲</span>
        <span>歌手</span>
        <span>专辑</span>
      </div>

      <div className="space-y-1">
        {RECOMMENDED_SONGS.map((song) => (
          <div 
            key={song.id} 
            onClick={() => onPlaySong?.(song)}
            className="grid grid-cols-[1fr_300px_350px] items-center px-8 py-4 rounded-2xl transition-all group hover:bg-white/5 border border-transparent hover:border-white/5 cursor-pointer"
          >
            <div className="flex items-center gap-5 min-w-0 pr-10">
              <svg className="text-rose-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <div className="flex items-center gap-3 truncate">
                <span className="text-base font-bold text-slate-200 group-hover:text-emerald-400 transition-colors truncate">{song.title}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {song.isVip && <span className="text-[8px] font-black bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded-sm">VIP</span>}
                  {song.isHiRes && <span className="text-[8px] font-black border border-emerald-500/40 text-emerald-400/80 px-1.5 py-0.5 rounded-sm bg-emerald-500/5">臻品母带</span>}
                  {song.hasVideo && (
                    <div className="text-emerald-400/60 hover:text-emerald-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="14" x="3" y="5" rx="2" ry="2"/><path d="m10 9 5 3-5 3V9z"/></svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-sm font-bold text-slate-500 group-hover:text-slate-300 transition-colors truncate pr-6">{song.artist}</div>
            <div className="text-sm font-medium text-slate-600 group-hover:text-slate-400 transition-colors truncate pr-6">{song.album}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlaylistCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 animate-in slide-in-from-bottom-4 duration-700">
      {MOCK_PLAYLISTS.map((playlist) => (
        <div 
          key={playlist.id} 
          className="group cursor-pointer"
          onClick={() => onPlaylistClick?.(playlist)}
        >
          <div className="relative aspect-square rounded-[32px] overflow-hidden mb-4 shadow-2xl transition-all duration-700 border-2 border-transparent group-hover:border-emerald-500/40 group-hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)]">
            <img 
              src={playlist.cover} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              alt={playlist.title} 
            />
            <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <div 
                onClick={(e) => { e.stopPropagation(); onPlaySong?.({ title: playlist.title, cover: playlist.cover }); }}
                className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="slate-950"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-950/40 backdrop-blur-xl text-[10px] font-black flex items-center gap-1.5 text-white/90 border border-white/10 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-400"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              {playlist.playCount}
            </div>
          </div>
          <div className="px-2">
            <h4 className="text-sm font-bold line-clamp-1 text-slate-200 group-hover:text-emerald-400 transition-colors tracking-tight">{playlist.title}</h4>
            <p className="mt-1 text-[9px] font-black text-slate-600 uppercase tracking-widest">{playlist.playCount} 次播放</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto pb-32 custom-scrollbar relative bg-slate-950 animate-in fade-in duration-1000">
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03]">
        <span className="text-[40rem] font-black text-emerald-500 rotate-12 select-none">MUSE</span>
      </div>

      <div className="relative z-10">
        <header className="px-12 pt-16 pb-12 flex gap-10 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500/40 to-blue-500/40 rounded-full blur-2xl opacity-50" />
            <img src="https://picsum.photos/seed/avatar/300/300" className="relative w-44 h-44 rounded-full object-cover border-4 border-white/10 shadow-2xl" alt="Avatar" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-5xl font-black text-white tracking-tight">陈子墨 (Alex)</h1>
              <div className="flex gap-1.5">
                 <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 text-[9px] font-black rounded italic flex items-center">VIP1 续费</span>
                 <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[9px] font-black rounded flex items-center gap-1">
                   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                   5 勋章
                 </span>
              </div>
            </div>
            <p className="text-slate-500 text-sm font-bold mb-6 tracking-wide">暂无简介</p>
            <div className="flex gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <span>粉丝：<span className="text-emerald-400">1.2w</span></span>
              <span>关注：<span className="text-emerald-400">286</span></span>
            </div>
          </div>
        </header>

        <nav className="px-12 mb-8">
          <div className="flex gap-12 border-b border-white/5">
            {mainTabs.map(tab => (
              <button 
                key={tab} 
                onClick={() => {
                  setActiveMainTab(tab);
                  if (tab !== '我喜欢') setActiveSubTab('默认');
                  else setActiveSubTab('歌曲');
                }}
                className={`pb-5 text-lg font-black tracking-tight relative transition-all ${activeMainTab === tab ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {tab}
                {activeMainTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />}
              </button>
            ))}
          </div>
        </nav>

        {activeMainTab === '我喜欢' && (
          <nav className="px-12 mb-10 flex gap-10">
            {subTabs.map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveSubTab(tab)}
                className={`text-sm font-bold tracking-widest transition-all relative pb-2 ${activeSubTab === tab ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'}`}
              >
                {tab}
                {activeSubTab === tab && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full" />}
              </button>
            ))}
          </nav>
        )}

        <main className="px-12">
          {activeMainTab === '我喜欢' ? (
            activeSubTab === '歌曲' ? renderSongs() : renderPlaylistCards()
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[40px] opacity-20">
              <p className="text-xl font-black uppercase tracking-widest">暂无内容</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;

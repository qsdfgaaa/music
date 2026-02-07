
import React from 'react';
import { MOCK_PLAYLISTS } from '../constants';
import { Song, Playlist } from '../types';

interface HomeProps {
  onPlaySong: (song?: Partial<Song>) => void;
  onPlaylistClick: (playlist: Playlist) => void;
  onNavigate: () => void;
}

const Home: React.FC<HomeProps> = ({ onPlaySong, onPlaylistClick, onNavigate }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return '早安，小菜逼学Java';
    if (hour >= 12 && hour < 18) return 'Hi 小菜逼学Java 今日为你推荐';
    return '晚安，小菜逼学Java';
  };

  return (
    <div className="flex-1 overflow-y-auto px-8 pb-32 pt-6 custom-scrollbar animate-in fade-in duration-500">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          {getGreeting()}
        </h1>
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-100">推荐歌单</h2>
          <button 
            onClick={onNavigate}
            className="text-sm text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            查看更多 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {MOCK_PLAYLISTS.map((playlist) => (
            <div 
              key={playlist.id} 
              className="group cursor-pointer"
              onClick={() => onPlaylistClick(playlist)}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-xl shadow-black/20 border-2 border-transparent hover:border-emerald-500/50 transition-all">
                <img 
                  src={playlist.cover} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={playlist.title} 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div 
                    onClick={(e) => { e.stopPropagation(); onPlaySong({ title: playlist.title, cover: playlist.cover }); }}
                    className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-all shadow-xl shadow-emerald-500/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] flex items-center gap-1 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  {playlist.playCount}
                </div>
              </div>
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-emerald-400 transition-colors leading-tight text-slate-200">{playlist.title}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

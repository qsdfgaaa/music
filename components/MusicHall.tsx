
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_BANNERS, MOCK_PLAYLISTS, RECOMMENDED_SONGS, MOCK_RANKINGS, MOCK_ARTISTS } from '../constants';
import { Song, Playlist } from '../types';

interface MusicHallProps {
  onPlaySong: (song?: Partial<Song>) => void;
  onPlaylistClick: (playlist: Playlist) => void;
  initialCategory?: string;
}

const MusicHall: React.FC<MusicHallProps> = ({ onPlaySong, onPlaylistClick, initialCategory = '精选' }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const bannerScrollRef = useRef<HTMLDivElement>(null);
  
  const tabs = ['精选', '排行', '歌手', '分类歌单', '新歌'];

  useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (activeCategory === '精选') {
      const interval = setInterval(() => {
        setActiveBannerIndex((prev) => (prev + 1) % MOCK_BANNERS.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (bannerScrollRef.current) {
      const width = bannerScrollRef.current.offsetWidth;
      bannerScrollRef.current.scrollTo({ left: activeBannerIndex * width, behavior: 'smooth' });
    }
  }, [activeBannerIndex]);

  const renderRankings = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {MOCK_RANKINGS.map((rank) => (
        <div 
          key={rank.id} 
          onClick={() => onPlaylistClick({ id: rank.id, title: rank.title, cover: rank.cover, playCount: '99w+' })}
          className={`group relative aspect-[4/5] rounded-[32px] overflow-hidden bg-gradient-to-br ${rank.color} to-slate-900 border border-white/5 hover:border-emerald-500/50 transition-all cursor-pointer shadow-2xl`}
        >
          <img src={rank.cover} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt={rank.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <h3 className="text-3xl font-black text-white mb-2">{rank.title}</h3>
            <p className="text-slate-400 text-sm font-medium">每日更新 · 50首</p>
          </div>
          <div 
            onClick={(e) => { e.stopPropagation(); onPlaySong({ title: rank.title, cover: rank.cover }); }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all shadow-2xl shadow-emerald-500/20"
          >
            <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      ))}
    </div>
  );

  const renderArtists = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 animate-in fade-in duration-500">
      {MOCK_ARTISTS.map((artist) => (
        <div key={artist.id} className="group text-center cursor-pointer">
          <div className="relative aspect-square rounded-full overflow-hidden mb-4 border-4 border-transparent group-hover:border-emerald-500/50 transition-all shadow-xl">
            <img src={artist.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={artist.name} />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </div>
          <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">{artist.name}</h4>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{artist.fans} 粉丝</p>
        </div>
      ))}
    </div>
  );

  const renderSongList = (songs: any[]) => (
    <div className="space-y-1 animate-in fade-in duration-700">
      <div className="grid grid-cols-[60px_1fr_200px_200px_100px] px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.25em] mb-2 border-b border-white/5 bg-white/[0.01] rounded-t-xl">
        <span>序号</span><span>歌曲标题</span><span>艺人</span><span>专辑名称</span><span className="text-right pr-4">时长</span>
      </div>
      {songs.map((song) => (
        <div 
          key={song.id}
          onMouseEnter={() => setHoveredId(song.id)}
          onMouseLeave={() => setHoveredId(null)}
          className={`grid grid-cols-[60px_1fr_200px_200px_100px] items-center px-6 py-3 rounded-xl transition-all group border border-transparent ${hoveredId === song.id ? 'bg-white/5 border-white/10 shadow-lg shadow-black/20' : 'hover:bg-white/[0.02]'}`}
        >
          <div className="text-xs font-mono font-bold text-slate-500 group-hover:text-emerald-400">{song.id}</div>
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative w-11 h-11 flex-shrink-0 group/cover cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-white/50 transition-all" onClick={() => onPlaySong(song)}>
              <img src={song.cover} className="w-full h-full object-cover transition-transform group-hover/cover:scale-110" alt={song.title} />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/cover:opacity-100 flex items-center justify-center transition-opacity"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
            </div>
            <div className="flex items-center gap-3 truncate">
              <span className="text-base font-bold text-slate-200 group-hover:text-white truncate">{song.title}</span>
              {song.isVip && <span className="text-[8px] font-black border border-emerald-500/40 text-emerald-400 px-1.5 rounded-sm bg-emerald-500/5">VIP</span>}
            </div>
          </div>
          <div className="text-sm font-medium text-slate-400 truncate">{song.artist}</div>
          <div className="text-sm font-medium text-slate-400 truncate italic opacity-60">{song.album}</div>
          <div className="text-xs font-mono font-bold text-slate-500 text-right pr-4 group-hover:text-emerald-400">{song.duration}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto px-8 pb-32 scroll-smooth custom-scrollbar animate-in fade-in duration-500">
      <h1 className="text-4xl font-bold mb-6 tracking-tight text-white pt-6">音乐馆</h1>
      <div className="flex gap-8 mb-8 border-b border-white/5">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveCategory(tab)} className={`pb-4 text-base font-semibold transition-all relative ${activeCategory === tab ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}>
            {tab}{activeCategory === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 rounded-full animate-in slide-in-from-left-2" />}
          </button>
        ))}
      </div>

      {activeCategory === '精选' && (
        <div className="animate-in fade-in duration-700">
          <div className="relative group/banners mb-12">
            <div ref={bannerScrollRef} className="flex overflow-x-hidden rounded-[40px] snap-x snap-mandatory shadow-2xl shadow-black/40 border border-white/5">
              {MOCK_BANNERS.map((banner, idx) => (
                <div key={banner.id} className="relative flex-shrink-0 w-full snap-start aspect-[21/8] overflow-hidden group/item">
                  <img src={banner.image} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ${activeBannerIndex === idx ? 'scale-110' : 'scale-100'}`} alt={banner.title} />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/30 to-transparent" />
                  <div className="absolute inset-0 p-16 flex flex-col justify-center select-none pointer-events-none">
                    <h3 className="text-6xl font-black text-white mb-4 drop-shadow-2xl leading-tight">{banner.title}</h3>
                    <p className="text-xl text-slate-200 font-medium opacity-90 tracking-wide drop-shadow-md">{banner.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl font-black flex items-center gap-3 mb-6 px-2">猜你喜欢 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /></h2>
            {renderSongList(RECOMMENDED_SONGS)}
          </div>
        </div>
      )}

      {activeCategory === '排行' && renderRankings()}
      {activeCategory === '歌手' && renderArtists()}
      {activeCategory === '新歌' && renderSongList(RECOMMENDED_SONGS)}
      {activeCategory === '分类歌单' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {MOCK_PLAYLISTS.map((pl) => (
            <div key={pl.id} className="group cursor-pointer" onClick={() => onPlaylistClick(pl)}>
              <div className="relative aspect-square rounded-[32px] overflow-hidden mb-3 border-2 border-transparent hover:border-emerald-500/50 transition-all shadow-xl">
                <img src={pl.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={pl.title} />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div onClick={(e) => { e.stopPropagation(); onPlaySong({ title: pl.title, cover: pl.cover }); }} className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
                </div>
              </div>
              <h4 className="text-sm font-bold line-clamp-2 px-1 group-hover:text-emerald-400 transition-colors leading-tight">{pl.title}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicHall;

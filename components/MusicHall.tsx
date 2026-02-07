
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_BANNERS, MOCK_PLAYLISTS, RECOMMENDED_SONGS } from '../constants';
import { Song } from '../types';

interface MusicHallProps {
  onPlaySong: (song?: Partial<Song>) => void;
  initialCategory?: string;
}

const MusicHall: React.FC<MusicHallProps> = ({ onPlaySong, initialCategory = '精选' }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [hoveredSongId, setHoveredSongId] = useState<string | null>(null);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const bannerScrollRef = useRef<HTMLDivElement>(null);
  
  const tabs = ['精选', '排行', '歌手', '分类歌单', '新歌'];

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  // 轮播图自动播放
  useEffect(() => {
    if (activeCategory === '精选') {
      const interval = setInterval(() => {
        setActiveBannerIndex((prev) => (prev + 1) % MOCK_BANNERS.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeCategory]);

  // 当索引改变时滚动
  useEffect(() => {
    if (bannerScrollRef.current) {
      const width = bannerScrollRef.current.offsetWidth;
      bannerScrollRef.current.scrollTo({
        left: activeBannerIndex * width,
        behavior: 'smooth'
      });
    }
  }, [activeBannerIndex]);
  
  return (
    <div className="flex-1 overflow-y-auto px-8 pb-32 scroll-smooth">
      <h1 className="text-4xl font-bold mb-6 tracking-tight text-white">音乐馆</h1>
      
      {/* Category Tabs */}
      <div className="flex gap-8 mb-8 border-b border-white/5">
        {tabs.map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveCategory(tab)}
            className={`pb-4 text-base font-semibold transition-all relative ${activeCategory === tab ? 'text-emerald-400' : 'text-slate-400 hover:text-white'}`}
          >
            {tab}
            {activeCategory === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 rounded-full animate-in slide-in-from-left-2" />}
          </button>
        ))}
      </div>

      {activeCategory === '精选' ? (
        <div className="animate-in fade-in duration-700">
          
          {/* Banner Carousel */}
          <div className="relative group/banners mb-12">
            <div 
              ref={bannerScrollRef}
              className="flex overflow-x-hidden rounded-3xl snap-x snap-mandatory shadow-2xl shadow-black/40"
            >
              {MOCK_BANNERS.map((banner, idx) => (
                <div 
                  key={banner.id} 
                  className="relative flex-shrink-0 w-full snap-start aspect-[21/7] overflow-hidden group/item"
                >
                  <img 
                    src={banner.image} 
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${activeBannerIndex === idx ? 'scale-110' : 'scale-100'}`} 
                    alt={banner.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/30 to-transparent" />
                  
                  {/* 已根据要求移除轮播图上的播放按钮 */}

                  <div className="absolute inset-0 p-16 flex flex-col justify-center select-none pointer-events-none">
                    <h3 className="text-6xl font-black text-white mb-4 max-w-2xl drop-shadow-2xl leading-tight tracking-tight">
                      {banner.title}
                    </h3>
                    <p className="text-xl text-slate-200 font-medium max-w-lg opacity-90 tracking-wide drop-shadow-md">
                      {banner.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); setActiveBannerIndex((prev) => (prev - 1 + MOCK_BANNERS.length) % MOCK_BANNERS.length); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/banners:opacity-100 transition-all duration-300 border border-white/5 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setActiveBannerIndex((prev) => (prev + 1) % MOCK_BANNERS.length); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/banners:opacity-100 transition-all duration-300 border border-white/5 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            <div className="absolute bottom-8 right-12 flex gap-2 z-10">
              {MOCK_BANNERS.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setActiveBannerIndex(idx); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${activeBannerIndex === idx ? 'w-8 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </div>

          {/* Recommended Songs List */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black flex items-center gap-3">
                猜你喜欢 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </h2>
              <button className="text-xs font-black text-slate-500 hover:text-emerald-400 uppercase tracking-[0.2em] transition-colors flex items-center gap-2">
                播放全部 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-[60px_1fr_200px_200px_100px] px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.25em] mb-2 border-b border-white/5 bg-white/[0.01] rounded-t-xl">
              <span>序号</span>
              <span>歌曲标题</span>
              <span>艺人</span>
              <span>专辑名称</span>
              <span className="text-right pr-4">时长</span>
            </div>

            {/* Song List */}
            <div className="space-y-1">
              {RECOMMENDED_SONGS.map((song) => (
                <div 
                  key={song.id}
                  onMouseEnter={() => setHoveredSongId(song.id)}
                  onMouseLeave={() => setHoveredSongId(null)}
                  className={`grid grid-cols-[60px_1fr_200px_200px_100px] items-center px-6 py-3 rounded-xl transition-all group border border-transparent ${hoveredSongId === song.id ? 'bg-white/5 border-white/10 shadow-lg shadow-black/20' : 'hover:bg-white/[0.02]'}`}
                >
                  {/* Column 1: Index */}
                  <div className="flex items-center gap-3 text-slate-500 group-hover:text-emerald-400 transition-colors">
                    <span className="text-xs font-mono font-bold w-6">{song.id}</span>
                  </div>

                  {/* Column 2: Song Title & Cover */}
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Cover with Play Button on Hover */}
                    <div 
                      className="relative w-11 h-11 flex-shrink-0 group/cover cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-white/50 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlaySong(song);
                      }}
                    >
                      <img src={song.cover} className="w-full h-full object-cover rounded-sm transition-transform group-hover/cover:scale-110" alt={song.title} />
                      {/* 黑色阴影完全覆盖图片 (参考用户提供图) */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/cover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="text-base font-bold truncate text-slate-200 group-hover:text-white transition-colors tracking-tight">{song.title}</span>
                      
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {song.isVip && (
                          <span className="text-[8px] font-black border border-emerald-500/40 text-emerald-400 px-1.5 rounded-sm leading-none py-0.5 bg-emerald-500/5">VIP</span>
                        )}
                        {song.isHiRes && (
                          <span className="text-[8px] font-black border border-amber-500/40 text-amber-500 px-1.5 rounded-sm leading-none py-0.5 bg-amber-500/5 uppercase">Hi-Res</span>
                        )}
                      </div>
                    </div>

                    {/* Hover Interaction Icons */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all pr-4 duration-300 translate-x-2 group-hover:translate-x-0">
                      <button className="p-2 rounded-full hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                      </button>
                      <button className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                      </button>
                    </div>
                  </div>

                  {/* Column 3: Artist */}
                  <div className="text-sm font-medium text-slate-400 truncate pr-4 group-hover:text-slate-200 transition-colors">
                    {song.artist}
                  </div>

                  {/* Column 4: Album */}
                  <div className="text-sm font-medium text-slate-400 truncate pr-4 group-hover:text-slate-200 italic opacity-60 transition-colors">
                    {song.album}
                  </div>

                  {/* Column 5: Duration */}
                  <div className="text-xs font-mono font-bold text-slate-500 text-right pr-4 group-hover:text-emerald-400 transition-colors">
                    {song.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeCategory === '分类歌单' ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-wrap gap-3 mb-10">
            {['流行', '摇滚', '民谣', '电子', '爵士', '古典', 'ACG', '说唱', '国风'].map((tag) => (
              <button key={tag} className="px-5 py-2 rounded-full bg-white/5 border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-sm font-medium transition-all">
                {tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 text-white">
            {MOCK_PLAYLISTS.map((playlist) => (
              <div key={playlist.id} className="group cursor-pointer">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 border-2 border-transparent hover:border-white/50 transition-all">
                  <img src={playlist.cover} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={playlist.title} />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div 
                      onClick={(e) => { e.stopPropagation(); onPlaySong({ title: playlist.title, cover: playlist.cover }); }}
                      className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-emerald-400 transition-colors">{playlist.title}</h4>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
           <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-20 animate-bounce"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
           <p className="text-lg font-bold tracking-widest uppercase">正在努力加载 {activeCategory} 内容...</p>
        </div>
      )}
    </div>
  );
};

export default MusicHall;

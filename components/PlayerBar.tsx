
import React, { useState } from 'react';
import { Song } from '../types';

interface PlayerBarProps {
  currentSong: Song;
  isPlaying: boolean;
  currentTime: number;
  onTogglePlay: () => void;
  onToggleQueue: () => void;
  onOpenNowPlaying: () => void;
  onOpenComments: () => void;
  isQueueOpen: boolean;
  isLoggedIn: boolean;
  onProfileClick: () => void;
  onSeek: (time: number) => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ 
  currentSong, 
  isPlaying, 
  currentTime,
  onTogglePlay, 
  onToggleQueue, 
  onOpenNowPlaying,
  onOpenComments,
  isQueueOpen, 
  isLoggedIn, 
  onProfileClick,
  onSeek
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const durationParts = currentSong.duration.split(':');
  const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
  const progressPercent = (currentTime / totalSeconds) * 100;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedPercent = x / rect.width;
    onSeek(Math.floor(clickedPercent * totalSeconds));
  };

  const handleLike = () => {
    if (isLoggedIn) {
      setIsLiked(!isLiked);
    } else {
      onProfileClick();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 glass border-t border-white/5 px-8 flex items-center justify-between z-[60]">
      {/* 歌曲信息与交互 (左侧) */}
      <div className="flex items-center gap-4 w-[350px]">
        <div 
          onClick={onOpenNowPlaying}
          className="relative group overflow-hidden rounded-lg flex-shrink-0 shadow-lg shadow-black/40 cursor-pointer"
        >
          <img src={currentSong.cover} className="w-14 h-14 rounded-lg object-cover group-hover:scale-110 transition-transform duration-500" alt="Cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 3h6v6"/><path d="M10 14 21 3"/></svg>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h4 
            onClick={onOpenNowPlaying}
            className="text-sm font-bold truncate hover:text-emerald-400 cursor-pointer transition-colors" 
          >
            {currentSong.title}
          </h4>
          <p className="text-xs text-slate-500 truncate">
            {currentSong.artist}
          </p>
        </div>
        <div className="flex items-center gap-4 ml-2">
          {/* 喜欢按钮 */}
          <button 
            onClick={handleLike}
            className={`transition-all active:scale-90 ${isLiked && isLoggedIn ? 'text-emerald-500' : 'text-slate-500 hover:text-white'}`}
            title="喜欢"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isLiked && isLoggedIn ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
          {/* 恢复评论按钮 */}
          <button onClick={onOpenComments} className="text-slate-500 hover:text-white transition-colors" title="评论">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>
      </div>

      {/* 控制中心 (中间) */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl px-12">
        <div className="flex items-center gap-8 mb-1 text-slate-400">
          <button className="hover:text-white transition-all active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/></svg>
          </button>
          <button 
            onClick={onTogglePlay}
            className="w-11 h-11 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/30"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>
            ) : (
              <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>
          <button className="hover:text-white transition-all active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/></svg>
          </button>
        </div>
        
        <div className="w-full flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-500 w-10 text-right">{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer relative group"
            onClick={handleProgressBarClick}
          >
            <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}>
               <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-500 w-10">{currentSong.duration}</span>
        </div>
      </div>

      {/* 音量、下载、列表 (右侧) */}
      <div className="flex items-center justify-end gap-8 w-[350px]">
        {/* 音量控制 */}
        <div className="flex items-center gap-3 group/vol">
          <svg className="text-slate-400 group-hover/vol:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          <div className="w-24 h-1 bg-white/10 rounded-full cursor-pointer relative">
            <div className="absolute top-0 left-0 h-full bg-slate-500 rounded-full w-2/3 group-hover/vol:bg-emerald-500 transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-5 text-slate-400">
          {/* 恢复下载图标 */}
          <button className="hover:text-white transition-colors" title="下载">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
          {/* 播放队列按钮 */}
          <button 
            onClick={onToggleQueue}
            className={`transition-colors ${isQueueOpen ? 'text-emerald-400' : 'hover:text-white'}`}
            title="播放队列"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;

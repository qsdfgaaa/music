
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_MY_PLAYLISTS, MOCK_COLLECTED_PLAYLISTS } from '../constants';
import { Playlist } from '../types';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-300 group ${active ? 'bg-emerald-500/15 text-emerald-400 shadow-[0_4px_12px_rgba(16,185,129,0.1)]' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
  >
    <span className={`transition-transform duration-500 group-hover:scale-110 ${active ? 'scale-110' : ''}`}>{icon}</span>
    <span className={`text-sm font-bold truncate tracking-wide ${active ? 'text-emerald-400' : ''}`}>{label}</span>
  </div>
);

interface SidebarProps {
  activeTab: string;
  isLoggedIn: boolean;
  onTabChange: (tab: string) => void;
  onProfileClick: () => void;
  onLogoutClick: () => void;
  onPlaylistClick?: (playlist: Playlist) => void;
  selectedPlaylistId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  isLoggedIn, 
  onTabChange, 
  onProfileClick, 
  onLogoutClick,
  onPlaylistClick,
  selectedPlaylistId
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [playlistTab, setPlaylistTab] = useState<'mine' | 'collected'>('mine');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentPlaylists = playlistTab === 'mine' ? MOCK_MY_PLAYLISTS : MOCK_COLLECTED_PLAYLISTS;

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col h-full border-r border-white/5 bg-slate-950/40 backdrop-blur-3xl relative z-30">
      {/* 顶部个人信息 */}
      <div className="p-6 pb-2">
        {isLoggedIn ? (
          <div 
            className="flex items-center gap-3 mb-8 cursor-pointer group/profile relative"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover/profile:opacity-100 transition-opacity" />
              <img src="https://picsum.photos/seed/avatar/64/64" className="relative w-11 h-11 rounded-full border-2 border-white/10 group-hover/profile:border-emerald-500/50 transition-all" alt="Avatar" />
              <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-slate-950" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="font-black text-sm truncate text-slate-100">陈子墨 (Alex)</h3>
                <svg className={`text-slate-500 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
              <span className="text-[9px] font-black bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-full uppercase tracking-tighter border border-emerald-500/20">SVIP 10</span>
            </div>

            {isUserMenuOpen && (
              <div ref={menuRef} className="absolute top-full left-0 w-full mt-3 bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-200">
                <div onClick={() => { onProfileClick(); setIsUserMenuOpen(false); }} className="px-4 py-2.5 hover:bg-emerald-500/10 cursor-pointer text-sm font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-3 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  个人中心
                </div>
                <div className="h-px bg-white/5 my-1.5 mx-3" />
                <div onClick={() => { onLogoutClick(); setIsUserMenuOpen(false); }} className="px-4 py-2.5 hover:bg-red-500/10 cursor-pointer text-sm font-bold text-red-400 flex items-center gap-3 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  退出登录
                </div>
              </div>
            )}
          </div>
        ) : (
          <div onClick={() => onTabChange('auth')} className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 cursor-pointer hover:bg-emerald-500/20 transition-all group">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <p className="text-xs font-black text-white">立即登录</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">同步曲库</p>
            </div>
          </div>
        )}

        {/* 基础导航 */}
        <div className="space-y-1.5">
          <NavItem icon={<HomeIcon />} label="在线音乐" active={activeTab === 'home'} onClick={() => onTabChange('home')} />
          <NavItem icon={<RadioIcon />} label="音乐馆" active={activeTab === 'hall'} onClick={() => onTabChange('hall')} />
          <NavItem icon={<SparklesIcon />} label="AI 灵感" active={activeTab === 'ai'} onClick={() => onTabChange('ai')} />
          <NavItem icon={<MicIcon />} label="创作中心" active={activeTab === 'creative'} onClick={() => onTabChange('creative')} />
        </div>
      </div>

      {/* 滚动区域 */}
      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
        <div className="mb-8">
          <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">我的音乐</p>
          <div className="space-y-1">
            <NavItem icon={<HeartIcon />} label="我喜欢" active={activeTab === 'favorites'} onClick={() => onTabChange('favorites')} />
            <NavItem icon={<ClockIcon />} label="最近播放" active={activeTab === 'recent'} onClick={() => onTabChange('recent')} />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between px-4 mb-5 border-b border-white/5 pb-2">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setPlaylistTab('mine')}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative pb-1 ${playlistTab === 'mine' ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'}`}
              >
                自建歌单
                {playlistTab === 'mine' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />}
              </button>
              <button 
                onClick={() => setPlaylistTab('collected')}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative pb-1 ${playlistTab === 'collected' ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'}`}
              >
                收藏歌单
                {playlistTab === 'collected' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 rounded-full" />}
              </button>
            </div>
            <button className="text-slate-600 hover:text-emerald-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
          <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {currentPlaylists.map((playlist) => (
              <NavItem 
                key={playlist.id} 
                icon={<PlaylistIcon />} 
                label={playlist.title} 
                active={selectedPlaylistId === playlist.id}
                onClick={() => onPlaylistClick?.(playlist)}
              />
            ))}
            {currentPlaylists.length === 0 && (
              <p className="text-[10px] text-slate-700 italic px-4 py-2">暂无歌单</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

// 极简风格图标组件
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const RadioIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M7.76 7.76a6 6 0 0 0 0 8.49"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const MicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const PlaylistIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v15l5-2 5 2V10"/><path d="M3 10h4"/></svg>;

export default Sidebar;


import React, { useState, useRef, useEffect } from 'react';
import { MOCK_MY_PLAYLISTS } from '../constants';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${active ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
  >
    <span className={`transition-transform group-hover:scale-110`}>{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

interface SidebarProps {
  activeTab: string;
  isLoggedIn: boolean;
  onTabChange: (tab: string) => void;
  onProfileClick: () => void;
  onLogoutClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, isLoggedIn, onTabChange, onProfileClick, onLogoutClick }) => {
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

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col h-full border-r border-white/5 glass relative z-30">
      <div className="p-6 pb-2 relative">
        {isLoggedIn ? (
          <div 
            className="flex items-center gap-3 mb-8 cursor-pointer group/profile relative"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="relative">
              <img src="https://picsum.photos/seed/avatar/64/64" className="w-12 h-12 rounded-full ring-2 ring-emerald-500/20 group-hover/profile:ring-emerald-500/50 transition-all" alt="Avatar" />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-slate-900" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="font-semibold text-sm truncate">陈子墨 (Alex)</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" height="14" 
                  viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" 
                  strokeLinecap="round" strokeLinejoin="round"
                  className={`text-slate-500 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 mt-1 bg-emerald-500/10 text-emerald-400 rounded-full w-fit">
                <span className="text-[10px] font-bold uppercase tracking-wider">超级会员</span>
              </div>
            </div>

            {isUserMenuOpen && (
              <div 
                ref={menuRef}
                className="absolute top-full left-0 w-full mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div 
                  onClick={() => { onProfileClick(); setIsUserMenuOpen(false); }}
                  className="px-4 py-2 hover:bg-white/5 cursor-pointer text-sm text-slate-300 hover:text-white flex items-center gap-3 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  个人中心
                </div>
                <div className="h-px bg-white/5 my-1 mx-2"></div>
                <div 
                  onClick={() => { onLogoutClick(); setIsUserMenuOpen(false); }}
                  className="px-4 py-2 hover:bg-red-500/10 cursor-pointer text-sm text-red-400 hover:text-red-300 flex items-center gap-3 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                  退出登录
                </div>
              </div>
            )}
          </div>
        ) : (
          <div 
            onClick={() => onTabChange('auth')}
            className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 cursor-pointer hover:bg-emerald-500/20 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-white">立即登录</p>
              <p className="text-[10px] text-slate-400">同步你的云端曲库</p>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <NavItem icon={<HomeIcon />} label="首页" active={activeTab === 'home'} onClick={() => onTabChange('home')} />
          <NavItem icon={<RadioIcon />} label="乐馆" active={activeTab === 'hall'} onClick={() => onTabChange('hall')} />
          <NavItem icon={<SparklesIcon />} label="AI 灵感" active={activeTab === 'ai'} onClick={() => onTabChange('ai')} />
          <NavItem icon={<MicIcon />} label="用户创作" active={activeTab === 'creative'} onClick={() => onTabChange('creative')} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
        <div className="mb-8">
          <p className="px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">我的音乐</p>
          <div className="space-y-1">
            <NavItem icon={<HeartIcon />} label="我喜欢" />
            <NavItem icon={<ClockIcon />} label="最近播放" />
            <NavItem icon={<DownloadIcon />} label="本地下载" />
          </div>
        </div>

        {/* 个人歌单模块 (参考图1风格) */}
        <div className="mt-8">
          <div className="px-4 flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
              <button 
                onClick={() => setPlaylistTab('mine')}
                className={`transition-colors ${playlistTab === 'mine' ? 'text-white' : 'hover:text-slate-200'}`}
              >
                自建歌单
              </button>
              <span className="text-slate-700 font-light">|</span>
              <button 
                onClick={() => setPlaylistTab('collected')}
                className={`transition-colors ${playlistTab === 'collected' ? 'text-white' : 'hover:text-slate-200'}`}
              >
                收藏歌单
              </button>
            </div>
            <button className="text-slate-500 hover:text-emerald-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </button>
          </div>

          <div className="space-y-1">
            {MOCK_MY_PLAYLISTS.map((pl) => (
              <div 
                key={pl.id} 
                className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/5 group transition-all"
              >
                <img src={pl.cover} className="w-8 h-8 rounded-md object-cover shadow-md group-hover:scale-105 transition-transform" alt={pl.title} />
                <span className="text-sm font-medium text-slate-400 group-hover:text-white truncate transition-colors">{pl.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const RadioIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M7.76 7.76a6 6 0 0 0 0 8.49"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>;
const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const MicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;

export default Sidebar;

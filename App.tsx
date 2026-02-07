
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Home from './components/Home';
import MusicHall from './components/MusicHall';
import PlayerBar from './components/PlayerBar';
import Profile from './components/Profile';
import AuthView from './components/AuthView';
import PlaylistQueue from './components/PlaylistQueue';
import NowPlayingView from './components/NowPlayingView';
import AIInspiration from './components/AIInspiration';
import { CURRENT_SONG } from './constants';
import { Song } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [hallTab, setHallTab] = useState('精选');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentSong, setCurrentSong] = useState<Song>(CURRENT_SONG);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // 模拟播放计时器
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const durationParts = currentSong.duration.split(':');
          const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong.duration]);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setActiveTab('profile');
    } else {
      setActiveTab('auth');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home'); 
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveTab('home');
  };

  const handlePlaySong = (song?: Partial<Song>) => {
    if (song) {
      // 这里的逻辑可以优化为从 RECOMMENDED_SONGS 中查找更完整的数据
      setCurrentSong({ ...currentSong, ...song } as Song);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handleNavigateToHall = (category?: string) => {
    setActiveTab('hall');
    if (category) {
      setHallTab(category);
    }
  };

  const handleSidebarTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'hall') {
      setHallTab('精选');
    }
  };

  const renderContent = () => {
    if (activeTab === 'auth') {
      return <AuthView onLoginSuccess={handleLoginSuccess} />;
    }

    switch (activeTab) {
      case 'home':
        return <Home onPlaySong={handlePlaySong} onNavigate={() => handleNavigateToHall('分类歌单')} />;
      case 'hall':
        return <MusicHall onPlaySong={handlePlaySong} initialCategory={hallTab} />;
      case 'ai':
        return <AIInspiration onPlaySong={handlePlaySong} />;
      case 'profile':
        return isLoggedIn ? <Profile /> : <AuthView onLoginSuccess={handleLoginSuccess} />;
      default:
        return <Home onPlaySong={handlePlaySong} onNavigate={() => handleNavigateToHall('分类歌单')} />;
    }
  };

  return (
    <div className="flex h-screen w-full relative overflow-hidden bg-slate-950 text-slate-100">
      <div className="flex flex-1 overflow-hidden">
        {activeTab !== 'auth' && (
          <Sidebar 
            activeTab={activeTab} 
            isLoggedIn={isLoggedIn}
            onTabChange={handleSidebarTabChange} 
            onProfileClick={handleProfileClick}
            onLogoutClick={handleLogout}
          />
        )}
        
        <main className={`flex-1 flex flex-col min-w-0 transition-colors duration-500 ${activeTab === 'auth' ? 'bg-slate-900' : 'bg-slate-950'}`}>
          {activeTab !== 'auth' && <TopBar />}
          {renderContent()}
        </main>
      </div>

      {isQueueOpen && (
        <div 
          className="fixed inset-0 z-[54] bg-transparent" 
          onClick={() => setIsQueueOpen(false)}
        />
      )}

      {activeTab !== 'auth' && (
        <>
          <PlayerBar 
            currentSong={currentSong} 
            isPlaying={isPlaying}
            currentTime={currentTime}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onToggleQueue={() => setIsQueueOpen(!isQueueOpen)} 
            onOpenNowPlaying={() => setIsNowPlayingOpen(true)}
            isQueueOpen={isQueueOpen}
            isLoggedIn={isLoggedIn}
            onProfileClick={handleProfileClick}
            onSeek={handleSeek}
          />
          <PlaylistQueue 
            isOpen={isQueueOpen} 
            onClose={() => setIsQueueOpen(false)} 
            currentSongId={currentSong.id}
            onPlaySong={handlePlaySong}
          />
          <NowPlayingView 
            isOpen={isNowPlayingOpen} 
            onClose={() => setIsNowPlayingOpen(false)} 
            currentSong={currentSong} 
            isPlaying={isPlaying}
            currentTime={currentTime}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onSeek={handleSeek}
          />
        </>
      )}
    </div>
  );
};

export default App;


import React from 'react';
import { MOCK_PLAYLISTS } from '../constants';

const Profile: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto px-12 pb-32 pt-10">
      {/* Header Info */}
      <div className="flex items-end gap-8 mb-12">
        <div className="relative group">
          <img 
            src="https://picsum.photos/seed/avatar/200/200" 
            className="w-48 h-48 rounded-2xl object-cover shadow-2xl ring-4 ring-emerald-500/10" 
            alt="Avatar" 
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center cursor-pointer">
            <span className="text-white text-sm font-medium">编辑头像</span>
          </div>
        </div>
        
        <div className="flex-1 pb-2">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-black tracking-tight">陈子墨 (Alex)</h1>
            <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded italic">SVIP 10</span>
          </div>
          <p className="text-slate-400 text-sm mb-6 max-w-lg">
            专注于全栈开发与设计，热爱爵士乐。这里记录着我每一个深夜的代码与音符。
          </p>
          
          <div className="flex gap-10">
            <div className="text-center">
              <p className="text-2xl font-bold">1.2k</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">粉丝</p>
            </div>
            <div className="text-center border-x border-white/5 px-10">
              <p className="text-2xl font-bold">286</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">关注</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">1,842</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">听歌量</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Medals */}
      <div className="mb-12">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          成就勋章 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </h2>
        <div className="flex gap-4">
          {[
            { name: '音乐头号粉', color: 'bg-rose-500/20 text-rose-400' },
            { name: '代码节拍器', color: 'bg-blue-500/20 text-blue-400' },
            { name: '收藏艺术家', color: 'bg-amber-500/20 text-amber-400' },
            { name: '深夜创作者', color: 'bg-purple-500/20 text-purple-400' }
          ].map((m, i) => (
            <div key={i} className={`px-4 py-2 rounded-xl border border-white/5 font-bold text-xs ${m.color}`}>
              {m.name}
            </div>
          ))}
        </div>
      </div>

      {/* My Favorite Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">我喜欢的歌单</h2>
          <button className="text-sm text-slate-500 hover:text-white transition-colors">管理</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {MOCK_PLAYLISTS.slice(0, 6).map((pl) => (
            <div key={pl.id} className="group cursor-pointer">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                <img src={pl.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={pl.title} />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium line-clamp-1">{pl.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

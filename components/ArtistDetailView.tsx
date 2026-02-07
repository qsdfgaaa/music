
import React, { useState } from 'react';
import { Artist } from '../constants';
import { Song } from '../types';
import { RECOMMENDED_SONGS } from '../constants';

interface ArtistDetailViewProps {
  artist: Artist;
  onBack: () => void;
  onPlaySong: (song: Partial<Song>) => void;
}

const ArtistDetailView: React.FC<ArtistDetailViewProps> = ({ artist, onBack, onPlaySong }) => {
  const [activeTab, setActiveTab] = useState('精选');
  const tabs = ['精选', '歌曲', '专辑', '视频', '详情'];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 animate-in fade-in duration-700 relative">
      {/* 沉浸式动态背景修饰 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-3xl" />
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
        {/* 返回导航 */}
        <div className="px-10 py-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-all active:scale-95"
          >
            <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-2xl border border-white/10 group-hover:border-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </div>
          </button>
        </div>

        {/* 歌手头部信息 - 采用沉浸式排版 */}
        <header className="px-16 pb-16 flex gap-12 items-end">
          <div className="relative group flex-shrink-0">
            <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
              <img src={artist.avatar} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={artist.name} />
            </div>
          </div>

          <div className="flex-1 flex flex-col pb-4">
            <div className="flex items-center gap-4 mb-4">
               <h1 className="text-6xl font-black text-white tracking-tighter drop-shadow-2xl">{artist.name}</h1>
               <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                  <svg className="text-emerald-500" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">认证艺人</span>
               </div>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-bold mb-8 text-slate-400 uppercase tracking-widest opacity-80">
              <span className="flex items-center gap-2">国籍：<span className="text-slate-200">中国</span></span>
              <span className="flex items-center gap-2">职业：<span className="text-slate-200">歌手、词曲创作者</span></span>
              <span className="flex items-center gap-2">粉丝：<span className="text-emerald-400">{artist.fans}</span></span>
            </div>

            <div className="flex items-center gap-4">
              <button className="px-10 py-3.5 bg-emerald-500 text-slate-950 rounded-full font-black text-sm flex items-center gap-3 hover:bg-emerald-400 transition-all active:scale-95 shadow-xl shadow-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                关注歌手
              </button>
              <button className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full font-black text-sm text-white transition-all active:scale-95 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                听他的歌
              </button>
              <button className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
            </div>
          </div>
        </header>

        {/* 导航标签栏 */}
        <div className="px-16 mb-12">
          <div className="flex gap-12 border-b border-white/5">
            {tabs.map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`pb-5 text-base font-black uppercase tracking-[0.2em] relative transition-colors ${activeTab === tab ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 主内容区域 */}
        <main className="px-16 pb-40">
          {activeTab === '精选' && (
            <div className="animate-in slide-in-from-bottom-6 duration-700">
               <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-6">
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                      热门作品 <div className="h-px w-12 bg-emerald-500/50" />
                    </h2>
                    <button 
                      onClick={() => onPlaySong(RECOMMENDED_SONGS[0])}
                      className="flex items-center gap-2 px-6 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-full text-xs font-black text-emerald-400 transition-all active:scale-95"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      播放全部
                    </button>
                  </div>
                  <button className="text-xs font-black text-slate-500 hover:text-emerald-400 flex items-center gap-2 uppercase tracking-widest transition-colors">
                    查看全部 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
               </div>

               {/* 歌曲列表 - 复用项目标准网格 */}
               <div className="space-y-1">
                  <div className="grid grid-cols-[60px_1fr_250px_100px] px-8 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-2 border-b border-white/5 bg-white/[0.01] rounded-t-xl">
                    <span>#</span><span>标题 / 专辑</span><span>发行时间</span><span className="text-right pr-4">时长</span>
                  </div>
                  {RECOMMENDED_SONGS.map((song, idx) => (
                    <div 
                      key={song.id} 
                      className="grid grid-cols-[60px_1fr_250px_100px] items-center px-8 py-4 rounded-2xl transition-all group hover:bg-white/5 border border-transparent hover:border-white/5 cursor-pointer"
                      onClick={() => onPlaySong(song)}
                    >
                      <div className="text-xs font-mono font-bold text-slate-600 group-hover:text-emerald-400 transition-colors">
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                      
                      <div className="flex items-center gap-5 min-w-0 pr-6">
                        <div className="relative w-11 h-11 flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-emerald-500/40 shadow-lg">
                          <img src={song.cover} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          </div>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-3">
                            <span className="text-base font-bold text-slate-200 group-hover:text-emerald-400 transition-colors truncate">{song.title}</span>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                               {song.isVip && <span className="text-[8px] font-black bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded-sm">VIP</span>}
                               {song.isHiRes && <span className="text-[8px] font-black border border-emerald-500/30 text-emerald-500/80 px-1.5 py-0.5 rounded-sm bg-emerald-500/5">Hi-Res</span>}
                            </div>
                          </div>
                          <span className="text-xs text-slate-500 font-bold mt-1 truncate">{song.album}</span>
                        </div>
                      </div>

                      <div className="text-sm font-bold text-slate-500 group-hover:text-slate-300 transition-colors truncate">
                        2024-12-05
                      </div>
                      
                      <div className="text-xs font-mono font-black text-slate-600 group-hover:text-emerald-500 text-right pr-4 transition-colors">
                        {song.duration}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === '详情' && (
            <div className="animate-in fade-in duration-700 max-w-5xl">
               <div className="flex items-center justify-between mb-10">
                 <h2 className="text-2xl font-black text-white flex items-center gap-4">
                    艺人档案 <div className="h-px w-16 bg-emerald-500/50" />
                 </h2>
                 <button className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-emerald-400 transition-colors uppercase tracking-widest">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    修订信息
                 </button>
               </div>
               
               <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[40px] backdrop-blur-3xl shadow-2xl">
                 <p className="text-slate-400 leading-loose mb-12 text-justify text-base font-medium first-letter:text-5xl first-letter:font-black first-letter:text-emerald-500 first-letter:mr-3 first-letter:float-left">
                    周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲创作人、MV及电影导演、编剧及制作人。2000年被吴宗宪发掘，发行首张个人专辑《Jay》。2001年发行专辑《范特西》。2002年在台湾、新加坡、马来西亚、美国等地举办首场个人世界巡回演唱会。2003年登上美国《时代周刊》亚洲版封面人物。周杰伦的音乐融合中西方元素，风格多变，四次获得世界音乐大奖最畅销亚洲艺人。凭借专辑《Jay》、《范特西》、《叶惠美》及《跨时代》四次获得金曲奖“最佳国语专辑奖”，并凭借《魔杰座》、《跨时代》获得第20届和第22届金曲奖“最佳国语男歌手奖”。2005年开始涉足影视，以电影《头文字D》获第42届台湾电影金马奖及第25届香港电影金像奖“最佳新人奖”。
                 </p>

                 <h3 className="text-lg font-black text-white mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-emerald-500 rounded-full" /> 基本资料
                 </h3>
                 <div className="grid grid-cols-2 gap-x-12 gap-y-8 border-t border-white/5 pt-10">
                    {[
                      { l: '外文名', v: 'Jay Chou' },
                      { l: '别名', v: '周董' },
                      { l: '国籍', v: '中国' },
                      { l: '出生地', v: '台湾省新北市' },
                      { l: '主要职业', v: '歌手、音乐人、导演' },
                      { l: '出道年份', v: '2000年' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">{item.l}</span>
                        <span className="text-slate-200 font-bold text-base">{item.v}</span>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ArtistDetailView;

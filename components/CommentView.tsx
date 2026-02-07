
import React, { useState } from 'react';
import { Song, Comment } from '../types';
import { MOCK_COMMENTS, RECOMMENDED_SONGS, MOCK_PLAYLISTS } from '../constants';

interface CommentViewProps {
  onBack: () => void;
  song: Song;
}

const CommentItem: React.FC<{ comment: Comment; isReply?: boolean }> = ({ comment, isReply }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className={`flex gap-4 group ${isReply ? 'mt-4 p-5 bg-white/5 rounded-2xl border border-white/5' : 'py-8 border-b border-white/5'}`}>
      <div className="relative flex-shrink-0">
        <img src={comment.user.avatar} className="w-11 h-11 rounded-full border border-white/10" alt="" />
        {comment.user.vipLevel && (
           <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
             <span className="text-[7px] font-black text-white italic">V</span>
           </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors cursor-pointer">{comment.user.name}</span>
          {comment.user.vipLevel && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-emerald-400 px-1.5 py-0.5 rounded-sm shadow-lg shadow-emerald-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              <span className="text-[8px] font-black text-slate-950 uppercase leading-none">VIP {comment.user.vipLevel}</span>
            </div>
          )}
        </div>
        <div className="text-[11px] text-slate-500 mb-3 font-bold flex gap-4 uppercase tracking-wider">
          <span>{comment.time}</span>
          <span className="opacity-60">{comment.location}</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed mb-5 font-medium">{comment.content}</p>
        
        <div className="flex items-center gap-8">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 text-xs transition-all active:scale-90 ${liked ? 'text-emerald-500 font-bold' : 'text-slate-500 hover:text-white'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
            {likesCount}
          </button>
          <button className="text-xs text-slate-500 font-bold hover:text-emerald-400 transition-colors">回复</button>
          <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2 space-y-0">
            {comment.replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CommentView: React.FC<CommentViewProps> = ({ onBack, song }) => {
  const [activeTab, setActiveTab] = useState('评论');
  const [commentText, setCommentText] = useState('');

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative bg-slate-950 animate-in fade-in duration-700">
      {/* 沉浸式动态背景 */}
      <div className="absolute inset-0 z-0">
        <img src={song.cover} className="w-full h-full object-cover blur-[140px] opacity-20 scale-125" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950" />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
        {/* 顶部返回导航 */}
        <div className="px-10 py-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-white/50 hover:text-emerald-400 transition-all active:scale-95"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-2xl border border-white/10 group-hover:border-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </div>
          </button>
        </div>

        <div className="max-w-[1400px] mx-auto">
          {/* 歌曲头部信息 */}
          <header className="px-10 pb-16 flex gap-12 items-end">
            <div className="relative group flex-shrink-0">
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-[40px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative w-56 h-56 rounded-[32px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-white/10">
                <img src={song.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
              </div>
            </div>

            <div className="flex-1 flex flex-col pb-4">
              <h1 className="text-6xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">{song.title}</h1>
              <div className="flex items-center gap-10 text-sm font-bold text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-2">歌手：<span className="text-emerald-400">{song.artist}</span></span>
                <span className="flex items-center gap-2">专辑：<span className="text-slate-200">{song.album}</span></span>
              </div>
            </div>
          </header>

          <div className="flex gap-16 px-10 pb-40">
            {/* 左侧主栏：评论列表 */}
            <div className="flex-1 min-w-0">
              {/* 交互标签栏 */}
              <div className="mb-10">
                <div className="flex gap-12 border-b border-white/5">
                  {['评论', '详情'].map(tab => (
                    <button 
                      key={tab} 
                      onClick={() => setActiveTab(tab)}
                      className={`pb-5 text-base font-black uppercase tracking-[0.2em] relative transition-colors ${activeTab === tab ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      {tab === '评论' ? `评论 (120983)` : tab}
                      {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 创作评论输入区 */}
              <div className="mb-16 p-8 bg-white/[0.03] backdrop-blur-3xl rounded-[32px] border border-white/5 shadow-2xl relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[32px] blur opacity-0 group-hover:opacity-100 transition duration-1000" />
                <div className="relative">
                  <textarea 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="期待你的神评论..."
                    className="w-full bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-600 font-bold text-lg resize-none min-h-[100px]"
                  />
                  <div className="flex items-center justify-between mt-6 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-6 text-slate-500">
                      <button className="hover:text-emerald-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                      </button>
                      <span className="text-[10px] font-black font-mono tracking-widest">{commentText.length}/300</span>
                    </div>
                    <button 
                      disabled={!commentText.trim()}
                      className={`px-10 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all ${commentText.trim() ? 'bg-emerald-500 text-slate-950 shadow-xl shadow-emerald-500/20 active:scale-95' : 'bg-white/5 text-slate-600 cursor-not-allowed'}`}
                    >
                      发布评论
                    </button>
                  </div>
                </div>
              </div>

              {/* 精彩评论分段 */}
              <div className="mb-16">
                <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                  精彩评论 <div className="h-1 w-8 bg-emerald-500 rounded-full" />
                </h2>
                <div className="space-y-0">
                  {MOCK_COMMENTS.map(c => <CommentItem key={c.id} comment={c} />)}
                </div>
              </div>

              {/* 最新评论分段 */}
              <div>
                <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                  最新评论 <div className="h-1 w-8 bg-slate-700 rounded-full" />
                </h2>
                <div className="space-y-0">
                  {MOCK_COMMENTS.map(c => <CommentItem key={`new-${c.id}`} comment={c} />)}
                  <button className="w-full py-10 text-slate-500 font-black text-xs uppercase tracking-[0.4em] hover:text-emerald-400 transition-colors">
                    点击加载更多评论
                  </button>
                </div>
              </div>
            </div>

            {/* 右侧边栏：推荐信息 */}
            <div className="w-[320px] flex-shrink-0 space-y-12">
              {/* 包含这首歌的歌单 */}
              <section>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                  包含这首歌的歌单
                  <button className="text-[10px] text-emerald-400 hover:text-emerald-300">更多</button>
                </h3>
                <div className="space-y-4">
                  {MOCK_PLAYLISTS.slice(0, 3).map(pl => (
                    <div key={pl.id} className="flex gap-4 items-center group cursor-pointer bg-white/5 p-3 rounded-2xl hover:bg-white/10 transition-all border border-transparent hover:border-white/5">
                      <img src={pl.cover} className="w-12 h-12 rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform" alt="" />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-200 truncate group-hover:text-emerald-400 transition-colors">{pl.title}</p>
                        <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">{pl.playCount} 播放</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 相似歌曲 */}
              <section>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
                  相似歌曲
                  <button className="text-[10px] text-emerald-400 hover:text-emerald-300">换一批</button>
                </h3>
                <div className="space-y-4">
                  {RECOMMENDED_SONGS.slice(0, 5).map(s => (
                    <div key={s.id} className="flex gap-4 items-center group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                        <img src={s.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                        <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-200 truncate group-hover:text-emerald-400 transition-colors">{s.title}</p>
                        <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">{s.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 歌手其他热门 */}
              <section className="p-6 bg-emerald-500/5 rounded-[32px] border border-emerald-500/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                </div>
                <h3 className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em] mb-4">歌手其他作品</h3>
                <p className="text-sm font-bold text-white mb-2">{song.artist}</p>
                <p className="text-[10px] text-emerald-500/60 font-black mb-6 uppercase tracking-widest">32 张专辑 · 451 首单曲</p>
                <button className="w-full py-3 bg-emerald-500 text-slate-950 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20">
                  查看艺人详情
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentView;


import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Song } from '../types';

interface AIRecommendation {
  title: string;
  artist: string;
  reason: string;
}

interface AIInspirationProps {
  onPlaySong: (song: Partial<Song>) => void;
}

const PRESET_TAGS = [
  "深夜食堂", "硬核健身", "赛博朋克", "下雨天", "冥想专注", "复古怀旧", "日落漫步", "游戏激战"
];

const AIInspiration: React.FC<AIInspirationProps> = ({ onPlaySong }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const generateInspiration = async (inputPrompt: string) => {
    if (!inputPrompt.trim()) return;
    
    setIsLoading(true);
    setRecommendations([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `你是一位资深音乐评论家和情感电台主持人。请根据以下关键词或描述，推荐 5 首最契合的音乐，并给出简短的推荐理由。
        
        用户描述: "${inputPrompt}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "歌曲名称" },
                artist: { type: Type.STRING, description: "艺人名称" },
                reason: { type: Type.STRING, description: "推荐理由，控制在 30 字以内" }
              },
              required: ["title", "artist", "reason"]
            }
          }
        }
      });

      const result = JSON.parse(response.text || '[]');
      setRecommendations(result);
    } catch (error) {
      console.error("AI Generation Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagClick = (tag: string) => {
    setPrompt(tag);
    generateInspiration(tag);
  };

  return (
    <div className="flex-1 overflow-y-auto px-12 pb-32 pt-10 relative">
      {/* 背景光晕 */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            AI Muse Engine
          </div>
          <h1 className="text-5xl font-black mb-6 tracking-tight text-white">AI 灵感电台</h1>
          <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto">输入任何心境、场景或关键词，让 AI 为你编织完美的背景旋律。</p>
        </header>

        {/* 输入区域 */}
        <div className="relative mb-8 group max-w-3xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[32px] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex items-center bg-slate-900/40 border border-white/10 rounded-[28px] p-2 backdrop-blur-xl">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateInspiration(prompt)}
              placeholder="在此输入你的心境描述，例如：凌晨三点在雨夜开车..." 
              className="flex-1 bg-transparent border-none outline-none py-4 px-6 text-lg placeholder:text-slate-600 font-medium text-white"
            />
            <button 
              onClick={() => generateInspiration(prompt)}
              disabled={isLoading || !prompt.trim()}
              className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3 ${isLoading || !prompt.trim() ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95'}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              )}
              生成
            </button>
          </div>
        </div>

        {/* 快捷标签 */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {PRESET_TAGS.map(tag => (
            <button 
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-5 py-2 rounded-full bg-white/5 border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-all active:scale-95"
            >
              # {tag}
            </button>
          ))}
        </div>

        {/* 歌曲列表重构 - 采用与音乐馆一致的五栏网格布局 */}
        <div className="animate-in fade-in duration-700">
          {recommendations.length > 0 && (
            <>
              {/* Table Header - 同步样式 */}
              <div className="grid grid-cols-[60px_1fr_200px_350px_100px] px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.25em] mb-2 border-b border-white/5 bg-white/[0.01] rounded-t-xl">
                <span>序号</span>
                <span>歌曲标题</span>
                <span>艺人</span>
                <span>AI 推荐理由</span>
                <span className="text-right pr-4">来源</span>
              </div>

              {/* Result List */}
              <div className="space-y-1">
                {recommendations.map((rec, idx) => {
                  const songId = (idx + 1).toString().padStart(2, '0');
                  const coverUrl = `https://picsum.photos/seed/${rec.title}/400/400`;
                  
                  return (
                    <div 
                      key={idx}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className={`grid grid-cols-[60px_1fr_200px_350px_100px] items-center px-6 py-3 rounded-xl transition-all group border border-transparent ${hoveredIdx === idx ? 'bg-white/5 border-white/10 shadow-lg shadow-black/20' : 'hover:bg-white/[0.02]'}`}
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      {/* Column 1: Index */}
                      <div className="flex items-center gap-3 text-slate-500 group-hover:text-emerald-400 transition-colors">
                        <span className="text-xs font-mono font-bold w-6">{songId}</span>
                      </div>

                      {/* Column 2: Song Title & Cover */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div 
                          className="relative w-11 h-11 flex-shrink-0 group/cover cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-white/50 transition-all duration-300"
                          onClick={() => onPlaySong({ title: rec.title, artist: rec.artist, cover: coverUrl })}
                        >
                          <img src={coverUrl} className="w-full h-full object-cover transition-transform group-hover/cover:scale-110" alt={rec.title} />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/cover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" className="drop-shadow-lg"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="text-base font-bold truncate text-slate-200 group-hover:text-white transition-colors tracking-tight">{rec.title}</span>
                          <span className="text-[8px] font-black border border-emerald-500/40 text-emerald-400 px-1.5 rounded-sm leading-none py-0.5 bg-emerald-500/5 uppercase tracking-tighter flex-shrink-0">AI Recommended</span>
                        </div>

                        {/* Hover Icons */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all pr-4 duration-300 translate-x-2 group-hover:translate-x-0">
                          <button className="p-2 rounded-full hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                          </button>
                          <button className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                          </button>
                        </div>
                      </div>

                      {/* Column 3: Artist */}
                      <div className="text-sm font-medium text-slate-400 truncate pr-4 group-hover:text-slate-200 transition-colors">
                        {rec.artist}
                      </div>

                      {/* Column 4: Reason (Replcaing Album) */}
                      <div className="text-sm font-medium text-slate-500 truncate pr-4 group-hover:text-slate-300 italic transition-colors">
                        “{rec.reason}”
                      </div>

                      {/* Column 5: Meta/Duration placeholder */}
                      <div className="text-[10px] font-black text-slate-600 text-right pr-4 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">
                        AI Gen
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
              <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
              <p className="text-sm font-black text-slate-500 uppercase tracking-[0.3em]">AI 正在深度检索与匹配...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && recommendations.length === 0 && (
            <div className="text-center py-24 opacity-20 select-none border-2 border-dashed border-white/5 rounded-[40px]">
              <svg className="mx-auto mb-6" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <p className="text-lg font-black uppercase tracking-[0.4em]">等待您的音乐灵感</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInspiration;

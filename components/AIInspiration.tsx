
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
      // 可以在这里添加错误提示逻辑
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

      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            AI Muse Engine
          </div>
          <h1 className="text-5xl font-black mb-6 tracking-tight text-white">AI 灵感电台</h1>
          <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto">输入任何心境、场景或关键词，让 AI 为你编织完美的背景旋律。</p>
        </header>

        {/* 输入区域 */}
        <div className="relative mb-12 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[32px] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex items-center bg-slate-900/40 border border-white/10 rounded-[28px] p-2 backdrop-blur-xl">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateInspiration(prompt)}
              placeholder="在此输入你的心境描述..." 
              className="flex-1 bg-transparent border-none outline-none py-4 px-6 text-lg placeholder:text-slate-600 font-medium"
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
              生成推荐
            </button>
          </div>
        </div>

        {/* 快捷标签 */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
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

        {/* 结果展示 */}
        <div className="grid gap-4">
          {recommendations.map((rec, idx) => (
            <div 
              key={idx}
              className="group relative bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex items-center gap-6 hover:bg-white/[0.06] hover:border-white/10 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="text-emerald-500" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-black text-white truncate">{rec.title}</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  <span className="text-sm font-bold text-emerald-400">{rec.artist}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed italic">“{rec.reason}”</p>
              </div>
              <button 
                onClick={() => onPlaySong({ title: rec.title, artist: rec.artist, cover: `https://picsum.photos/seed/${rec.title}/300/300` })}
                className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all hover:scale-110 active:scale-95"
              >
                <svg className="ml-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </button>
            </div>
          ))}

          {/* 空状态建议 */}
          {!isLoading && recommendations.length === 0 && (
            <div className="text-center py-20 opacity-30 select-none">
              <svg className="mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              <p className="text-sm font-black uppercase tracking-[0.3em]">等待灵感的迸发...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIInspiration;

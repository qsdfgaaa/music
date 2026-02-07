
import React, { useState } from 'react';

interface AuthViewProps {
  onLoginSuccess: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟登录成功过程
    onLoginSuccess();
  };

  return (
    <div className="flex-1 relative flex items-center justify-center overflow-hidden animate-in fade-in duration-700">
      {/* Dynamic Background with Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse duration-5000" />
      </div>

      <div className="relative z-10 w-full max-w-lg bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-12 shadow-2xl shadow-black/40">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-emerald-500/30">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </div>
          <h2 className="text-3xl font-black mb-3 tracking-tight">{isLogin ? '欢迎回来 MuseFlow' : '开启极简音乐之旅'}</h2>
          <p className="text-slate-400 font-medium">让每一缕音符精准触达灵魂</p>
        </div>

        <div className="flex p-1.5 bg-white/5 rounded-2xl mb-8">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 text-sm font-black rounded-xl transition-all duration-300 ${isLogin ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            登录
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-sm font-black rounded-xl transition-all duration-300 ${!isLogin ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            注册
          </button>
        </div>

        <form className="space-y-5 mb-10" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="group">
              <input 
                type="text" 
                placeholder="用户名" 
                required
                className="w-full bg-white/[0.05] border border-white/5 rounded-2xl py-4 px-6 text-base outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all placeholder:text-slate-600"
              />
            </div>
          )}
          <div className="group">
            <input 
              type="email" 
              placeholder="邮箱地址" 
              required
              className="w-full bg-white/[0.05] border border-white/5 rounded-2xl py-4 px-6 text-base outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="group">
            <input 
              type="password" 
              placeholder="密码" 
              required
              className="w-full bg-white/[0.05] border border-white/5 rounded-2xl py-4 px-6 text-base outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all placeholder:text-slate-600"
            />
          </div>
          
          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-xs font-bold text-slate-500 hover:text-emerald-400 transition-colors uppercase tracking-widest">忘记密码?</button>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-2xl shadow-2xl shadow-emerald-500/20 transition-all active:scale-95 text-lg"
          >
            {isLogin ? '立即登录' : '立即注册'}
          </button>
        </form>

        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em] text-slate-600">
            <span className="bg-[#111827] px-4 rounded-full">第三方快捷登录</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[
            { name: 'WeChat', color: 'hover:text-emerald-500 hover:bg-emerald-500/5' },
            { name: 'QQ', color: 'hover:text-blue-500 hover:bg-blue-500/5' },
            { name: 'Apple', color: 'hover:text-white hover:bg-white/5' }
          ].map((social) => (
            <button key={social.name} className={`flex items-center justify-center py-3 rounded-2xl border border-white/5 bg-white/5 text-slate-400 font-bold text-xs ${social.color} transition-all duration-300`}>
              {social.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthView;

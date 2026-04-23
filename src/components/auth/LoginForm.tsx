"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useApp } from "@/context/AppContext";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onGoogleSignIn: () => void;
}

export function LoginForm({
  onSwitchToRegister,
  onGoogleSignIn,
}: LoginFormProps) {
  const router = useRouter();
  const { language } = useApp();
  const t = useTranslation(language);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("[LOGIN FORM] Attempting login with:", formData.login);
      
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.login,
        password: formData.password,
      });

      console.log("[LOGIN FORM] Result:", res);

      if (res?.error) {
        setError("Неверные данные для входа");
        return;
      }
      
      if (res?.ok) {
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      console.error("[LOGIN FORM] Exception:", err);
      setError("Произошла непредвиденная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-10 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-2xl border border-white/5 shadow-[0_0_100px_rgba(99,102,241,0.08)] relative overflow-hidden group/modal animate-[fadeIn_0.6s_ease-out_forwards,scaleUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]">
      
      {/* Мягкое свечение внутри карточки */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none transition-opacity duration-700 opacity-50 group-hover/modal:opacity-80" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px] pointer-events-none transition-opacity duration-700 opacity-30 group-hover/modal:opacity-60" />

      <div className="relative z-10 space-y-8">
        
        {/* Хедер */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 shadow-lg shadow-black/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Добро пожаловать обратно</h1>
          <p className="text-sm text-gray-400 font-medium">Войдите в аккаунт DreamDesk</p>
        </div>

        {/* Social Login */}
        <button 
          onClick={onGoogleSignIn}
          disabled={isLoading}
          type="button"
          className="relative w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 group/google overflow-hidden disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/google:animate-[shimmer_1.5s_infinite]" />
          <svg className="w-5 h-5 text-white transition-transform group-hover/google:scale-110" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-sm font-bold text-white tracking-wide">Войти через Google</span>
        </button>

        {/* Разделитель */}
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-white/10" />
          <span className="flex-shrink-0 mx-4 text-xs font-black text-gray-500 uppercase tracking-widest">Или</span>
          <div className="flex-grow border-t border-white/10" />
        </div>

        {/* Форма */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Поле Email (Floating Label) */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className={`w-5 h-5 transition-colors duration-300 ${emailFocus ? "text-indigo-400" : "text-gray-500"}`} />
            </div>
            <input 
              type="email" 
              id="email"
              disabled={isLoading}
              value={formData.login}
              onChange={(e) => setFormData({ ...formData, login: e.target.value })}
              className="peer w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-4 pl-12 text-sm text-white focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] focus:bg-indigo-500/5 transition-all duration-300 placeholder-transparent disabled:opacity-50"
              placeholder="name@example.com"
              onFocus={() => setEmailFocus(true)}
              onBlur={(e) => setEmailFocus(e.target.value !== "")}
              autoComplete="off"
            />
            <label 
              htmlFor="email"
              className="absolute left-12 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-85 peer-focus:text-indigo-400 origin-left"
              style={{ transform: emailFocus ? 'translateY(-1.2rem) scale(0.85)' : 'translateY(0) scale(1)' }}
            >
              Email адрес
            </label>
          </div>

          {/* Поле Пароль */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className={`w-5 h-5 transition-colors duration-300 ${passFocus ? "text-violet-400" : "text-gray-500"}`} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password"
              disabled={isLoading}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="peer w-full bg-dark-bg/50 border border-white/10 rounded-xl px-4 py-4 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-violet-500 focus:shadow-[0_0_15px_rgba(124,58,237,0.2)] focus:bg-violet-500/5 transition-all duration-300 placeholder-transparent disabled:opacity-50"
              placeholder="••••••••"
              onFocus={() => setPassFocus(true)}
              onBlur={(e) => setPassFocus(e.target.value !== "")}
            />
            <label 
              htmlFor="password"
              className="absolute left-12 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none origin-left"
              style={{ transform: passFocus ? 'translateY(-1.2rem) scale(0.85)' : 'translateY(0) scale(1)' }}
            >
              Пароль
            </label>
            <button 
              type="button"
              disabled={isLoading}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors focus:outline-none disabled:opacity-50"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="flex justify-end pt-1">
            <a href="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline transition-all">
              Забыли пароль?
            </a>
          </div>

          {/* Кнопка войти */}
          <button 
            type="submit"
            disabled={isLoading}
            className="group/btn relative w-full flex items-center justify-center py-4 rounded-xl font-black text-sm uppercase tracking-widest text-white overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] mt-4 disabled:opacity-50"
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]" />
            {/* Inner Glow */}
            <div className="absolute inset-0 border-[0.5px] border-white/30 rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]" />
            
            <div className="relative z-10 flex items-center gap-2">
              <span>{isLoading ? "Вход..." : "Войти"}</span>
              {!isLoading && <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
            </div>
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 font-medium pt-4">
          Нет аккаунта?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-indigo-400 font-bold hover:text-indigo-300 hover:shadow-[0_2px_10px_rgba(99,102,241,0.5)] transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            Зарегистрироваться
          </button>
        </p>
        
      </div>
    </div>
  );
}

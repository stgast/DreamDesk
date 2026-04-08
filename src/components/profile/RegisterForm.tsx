// ============================================
// DreamDesk — Компонент регистрации (Register)
// Dark Minimalism + Soft UI Style
// ============================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onGoogleSignIn: () => void;
}

export function RegisterForm({
  onSwitchToLogin,
  onGoogleSignIn,
}: RegisterFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // States for floating labels
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [pass2Focus, setPass2Focus] = useState(false);

  const passwordsMismatch: boolean = !!(
    password &&
    password2 &&
    password !== password2
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Заполните Email и пароль");
      return;
    }
    if (password !== password2) {
      setError("Пароли не совпадают");
      return;
    }

    setIsLoading(true);

    try {
      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: name || null,
          nickname: name || email.split("@")[0],
        }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.error || "Ошибка регистрации");
        return;
      }

      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      router.push("/profile");
      router.refresh();
    } catch (err) {
      setError("Произошла непредвиденная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-12 rounded-[2rem] bg-white/[0.015] backdrop-blur-[40px] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] relative overflow-hidden group/modal transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
      
      {/* Soft Ambient Inner Glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none opacity-30 group-hover/modal:opacity-50 transition-opacity duration-1000" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none opacity-20 group-hover/modal:opacity-40 transition-opacity duration-1000" />

      <div className="relative z-10 space-y-8">
        
        {/* Хедер */}
        <div className="text-center space-y-4 animate-fade-in-up" style={{ animationFillMode: 'both' }}>
          <h1 className="text-3xl font-black text-white tracking-tight leading-tight font-headline">Регистрация</h1>
          <p className="text-sm text-gray-400 font-medium">Создайте новый аккаунт DreamDesk</p>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          
          {/* Поле Name */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className={`w-5 h-5 transition-colors duration-500 ${nameFocus ? "text-indigo-400" : "text-gray-600"}`} />
            </div>
            <input 
              type="text" 
              className="peer w-full bg-[#0B0B0F]/50 border border-white/5 rounded-xl px-4 py-4 pl-12 text-sm text-white focus:outline-none focus:border-indigo-500/30 focus:shadow-[0_0_0_1px_rgba(99,102,241,0.2)] focus:bg-[#0B0B0F]/80 transition-all duration-300 placeholder-transparent disabled:opacity-50"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocus(true)}
              onBlur={(e) => setNameFocus(e.target.value !== "")}
              disabled={isLoading}
            />
            <label className="absolute left-12 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none origin-left font-medium" style={{ transform: nameFocus ? 'translateY(-1.4rem) scale(0.85)' : 'translateY(0) scale(1)' }}>
              Имя (необязательно)
            </label>
          </div>

          {/* Поле Email */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className={`w-5 h-5 transition-colors duration-500 ${emailFocus ? "text-indigo-400" : "text-gray-600"}`} />
            </div>
            <input 
              type="email" 
              className="peer w-full bg-[#0B0B0F]/50 border border-white/5 rounded-xl px-4 py-4 pl-12 text-sm text-white focus:outline-none focus:border-indigo-500/30 focus:shadow-[0_0_0_1px_rgba(99,102,241,0.2)] focus:bg-[#0B0B0F]/80 transition-all duration-300 placeholder-transparent disabled:opacity-50"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={(e) => setEmailFocus(e.target.value !== "")}
              disabled={isLoading}
            />
            <label className="absolute left-12 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none origin-left font-medium" style={{ transform: emailFocus ? 'translateY(-1.4rem) scale(0.85)' : 'translateY(0) scale(1)' }}>
              Email адрес
            </label>
          </div>

          {/* Поле Пароль */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className={`w-5 h-5 transition-colors duration-500 ${passFocus ? "text-indigo-400" : "text-gray-600"}`} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              className="peer w-full bg-[#0B0B0F]/50 border border-white/5 rounded-xl px-4 py-4 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-indigo-500/30 focus:shadow-[0_0_0_1px_rgba(99,102,241,0.2)] focus:bg-[#0B0B0F]/80 transition-all duration-300 placeholder-transparent disabled:opacity-50"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPassFocus(true)}
              onBlur={(e) => setPassFocus(e.target.value !== "")}
              disabled={isLoading}
            />
            <label className="absolute left-12 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none origin-left font-medium" style={{ transform: passFocus ? 'translateY(-1.4rem) scale(0.85)' : 'translateY(0) scale(1)' }}>
              Пароль
            </label>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-white transition-colors focus:outline-none">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Поле Повторите пароль */}
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className={`w-5 h-5 transition-colors duration-500 ${pass2Focus ? (passwordsMismatch ? "text-red-400" : "text-indigo-400") : "text-gray-600"}`} />
            </div>
            <input 
              type="password" 
              className={`peer w-full bg-[#0B0B0F]/50 border rounded-xl px-4 py-4 pl-12 text-sm text-white focus:outline-none transition-all duration-300 placeholder-transparent disabled:opacity-50 ${
                passwordsMismatch ? "border-red-500/30 focus:border-red-500/50 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.2)]" : "border-white/5 focus:border-indigo-500/30 focus:shadow-[0_0_0_1px_rgba(99,102,241,0.2)]"
              }`}
              placeholder="••••••••"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              onFocus={() => setPass2Focus(true)}
              onBlur={(e) => setPass2Focus(e.target.value !== "")}
              disabled={isLoading}
            />
            <label className="absolute left-12 top-4 text-sm text-gray-500 transition-all duration-300 pointer-events-none origin-left font-medium" style={{ transform: pass2Focus ? 'translateY(-1.4rem) scale(0.85)' : 'translateY(0) scale(1)' }}>
              Повторите пароль
            </label>
            {passwordsMismatch && <p className="text-[10px] text-red-400 font-bold uppercase mt-1 px-1">Пароли не совпадают</p>}
          </div>

          {error && <p className="text-xs text-red-100 p-3 bg-red-500/20 border border-red-500/30 rounded-xl animate-shake">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || passwordsMismatch}
            className="group/btn relative w-full flex items-center justify-center py-4 rounded-xl font-bold text-sm text-white overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(99,102,241,0.25)] active:scale-[0.99] mt-6 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90 transition-transform duration-500 scale-[1.02] group-hover/btn:scale-110" />
            <div className="relative z-10 flex items-center gap-3">
              <span className="tracking-widest uppercase">{isLoading ? "Создание..." : "Зарегистрироваться"}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </div>
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center py-2 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <div className="flex-grow border-t border-white/5" />
          <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">или</span>
          <div className="flex-grow border-t border-white/5" />
        </div>

        {/* Google button */}
        <button
          onClick={onGoogleSignIn}
          type="button"
          disabled={isLoading}
          className="relative w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group/google overflow-hidden animate-fade-in-up shadow-sm disabled:opacity-50"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          <svg className="w-5 h-5 transition-transform duration-300 group-hover/google:scale-110" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-sm font-medium text-gray-300 tracking-wide group-hover/google:text-white transition-colors">Войти через Google</span>
        </button>

        {/* Switch to login */}
        <p className="text-center text-xs text-gray-500 pt-6 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          Уже есть аккаунт?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-white font-medium hover:text-indigo-300 transition-colors duration-300 ml-1"
          >
            Войти
          </button>
        </p>
      </div>
    </div>
  );
}

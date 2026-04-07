// ============================================
// DreamDesk — Страница профиля (/profile)
// Сохранённые сборки (localStorage) + регистрация / вход (NextAuth)
// ============================================

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Trash2,
  ExternalLink,
  Wrench,
  Calendar,
  Package,
  LogOut,
  Pencil,
} from "lucide-react";
import type { SavedConfig } from "@/lib/saved-configs";
import {
  loadSavedConfigs,
  deleteSavedConfig as removeConfig,
} from "@/lib/saved-configs";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/currency";
import { useTranslation } from "@/lib/i18n";

type AuthMode = "login" | "register";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { currency, language } = useApp();
  const t = useTranslation(language);
  const [configs, setConfigs] = useState<SavedConfig[]>([]);
  const [mode, setMode] = useState<AuthMode>("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  
  // Аватарка
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [avatarUploading, setAvatarUploading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      // Загрузить из базы
      fetch("/api/setups")
        .then((res) => res.json())
        .then((data) => {
          if (data.setups) {
            setConfigs(data.setups.map((s: any) => ({
              id: s.id,
              name: s.name,
              items: s.items,
              totalPrice: s.totalPrice,
              savedAt: s.createdAt,
            })));
          }
        })
        .catch(() => {
          setConfigs([]);
        });
    } else {
      // localStorage
      setConfigs(loadSavedConfigs());
    }
  }, [session]);

  const refreshConfigs = () => setConfigs(loadSavedConfigs());

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить эту конфигурацию?")) return;

    if (session?.user) {
      // Удалить из базы
      try {
        const res = await fetch(`/api/setups/${id}`, { method: "DELETE" });
        if (res.ok) {
          setConfigs(configs.filter((c) => c.id !== id));
        }
      } catch {
        // ignore
      }
    } else {
      // localStorage
      removeConfig(id);
      refreshConfigs();
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSubmitting(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setAuthError("Неверный email или пароль");
      } else {
        setPassword("");
      }
    } catch {
      setAuthError("Сеть недоступна");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (password !== password2) {
      setAuthError("Пароли не совпадают");
      return;
    }
    setAuthSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: name || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error ?? "Ошибка регистрации");
        return;
      }
      // После регистрации войти
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setPassword("");
      setPassword2("");
    } catch {
      setAuthError("Сеть недоступна");
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile || !session?.user) return;

    setAvatarUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", avatarFile);

      const res = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setAvatarFile(null);
        // Обновить сессию
        window.location.reload();
      }
    } catch {
      // Ошибка
    } finally {
      setAvatarUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-surface text-on-surface py-12 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-surface-container rounded-2xl p-6 border border-white/5">
            {session?.user ? (
              <>
                <h2 className="text-xl font-headline font-bold text-white mb-4">
                  {t("account")}
                </h2>
                
                {/* Аватарка */}
                <div className="flex flex-col items-center mb-6">
                  <label className="relative group cursor-pointer inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-all relative">
                      {avatarPreview ? (
                        <img 
                          src={avatarPreview} 
                          alt="Avatar preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : session.user.image ? (
                        <img 
                          src={session.user.image} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-3xl font-bold text-white">
                          {(session.user.name || session.user.email)?.[0].toUpperCase()}
                        </div>
                      )}
                      
                      {/* Иконка карандашика при наведении */}
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Pencil className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </label>
                  
                  {/* Кнопка сохранения (показывается только если выбран файл) */}
                  {avatarFile && (
                    <button
                      onClick={handleAvatarUpload}
                      disabled={avatarUploading}
                      className="mt-4 bg-primary text-on-primary font-semibold py-2.5 px-6 rounded-xl hover:bg-primary-container transition-colors disabled:opacity-50 text-sm"
                    >
                      {avatarUploading ? "Загрузка..." : "Сохранить фото"}
                    </button>
                  )}
                </div>

                <div className="border-t border-white/5 pt-4 mb-4">
                  <p className="text-sm text-on-surface-variant mb-3">
                    <span className="text-white font-medium">{session.user.email}</span>
                    {session.user.name ? (
                      <>
                        {" "}
                        ({session.user.name})
                      </>
                    ) : null}
                  </p>
                </div>
              </>
            ) : status === "loading" ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                <p className="text-sm text-gray-400 mt-2">Загрузка...</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-headline font-bold text-white mb-2">
                  {mode === "login" ? "Вход в систему" : "Регистрация"}
                </h2>
                <p className="text-sm text-on-surface-variant mb-6">
                  Сохраните прогресс. Иначе вы потеряете то, что собрали, так как
                  вы находитесь в гостевом режиме!
                </p>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white text-black font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors mb-4"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Войти через Google
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-outline-variant"></div>
                  <span className="flex-shrink-0 mx-4 text-on-surface-variant text-xs">
                    или
                  </span>
                  <div className="flex-grow border-t border-outline-variant"></div>
                </div>

                {authSubmitting ? (
                  <p className="text-sm text-on-surface-variant">Загрузка…</p>
                ) : mode === "login" ? (
                  <form onSubmit={handleLogin} className="space-y-3">
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="password"
                      required
                      autoComplete="current-password"
                      placeholder="Пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    />
                    {authError && (
                      <p className="text-sm text-red-400">{authError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={authSubmitting}
                      className="w-full bg-primary text-on-primary font-bold py-3 px-4 rounded-xl hover:bg-primary-container transition-colors disabled:opacity-50"
                    >
                      {authSubmitting ? "…" : "Войти"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("register");
                        setAuthError(null);
                      }}
                      className="w-full py-2 text-sm text-primary hover:underline"
                    >
                      Зарегистрироваться
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Имя (необязательно)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="password"
                      required
                      autoComplete="new-password"
                      placeholder="Пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="password"
                      required
                      autoComplete="new-password"
                      placeholder="Повторите пароль"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors"
                    />
                    {authError && (
                      <p className="text-sm text-red-400">{authError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={authSubmitting}
                      className="w-full bg-primary text-on-primary font-bold py-3 px-4 rounded-xl hover:bg-primary-container transition-colors disabled:opacity-50"
                    >
                      {authSubmitting ? "…" : "Создать аккаунт"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setAuthError(null);
                      }}
                      className="w-full py-2 text-sm text-on-surface-variant hover:text-white"
                    >
                      Уже есть аккаунт? Войти
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-white uppercase tracking-tight">
              {t("your_setups")}
            </h1>
            <p className="text-on-surface-variant mt-2">
              {t("saved_configs")}. {t("saved_configs_hint")}
            </p>
          </div>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-white">
                {t("archive")}
              </h2>
              <span className="text-sm text-primary font-mono bg-primary/10 px-3 py-1 rounded-full">
                {configs.length} {t("saved")}
              </span>
            </div>

            {configs.length === 0 ? (
              <div className="rounded-2xl bg-surface-container border border-white/5 p-12 text-center">
                <Wrench className="w-12 h-12 text-outline-variant mx-auto mb-4" />
                <p className="text-on-surface-variant mb-4">
                  {t("no_configs")}
                </p>
                <Link
                  href="/build"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-container transition px-6 py-3 bg-primary/10 rounded-full"
                >
                  {t("create_first_setup")}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {configs.map((c) => (
                  <div
                    key={c.id}
                    className="group rounded-2xl bg-surface-container border border-white/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-surface-container-high transition-colors duration-300"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-lg text-white truncate mb-2">
                        {c.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                          <Package className="w-4 h-4" />
                          {c.items.length} {t("devices")}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                          <Calendar className="w-4 h-4" />
                          {new Date(c.savedAt).toLocaleDateString("ru-RU")}
                        </span>
                        <span className="text-sm font-bold text-secondary">
                          {formatPrice(c.totalPrice, currency)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        href="/build"
                        className="rounded-xl bg-primary/10 text-primary border border-primary/20 px-5 py-2.5 text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        {t("open")}
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(c.id)}
                        className="rounded-xl border border-white/10 text-on-surface-variant p-2.5 hover:text-error hover:border-error/30 hover:bg-error/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

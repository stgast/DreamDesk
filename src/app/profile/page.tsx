// ============================================
// DreamDesk — Страница профиля (/profile)
// Сохранённые сборки (localStorage)
// ============================================

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, ExternalLink, Wrench, Calendar, Package, LogIn, Mail } from "lucide-react";

interface SavedConfig {
  id: string;
  name: string;
  items: Array<{ name: string; category: string; price: number }>;
  totalPrice: number;
  savedAt: string;
}

const STORAGE_KEY = "dreamdesk-saved-configs";

function getSavedConfigs(): SavedConfig[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function deleteConfig(id: string) {
  const configs = getSavedConfigs().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
}

export default function ProfilePage() {
  const [configs, setConfigs] = useState<SavedConfig[]>([]);

  useEffect(() => {
    setConfigs(getSavedConfigs());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Удалить эту конфигурацию?")) {
      deleteConfig(id);
      setConfigs(getSavedConfigs());
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-surface text-on-surface py-12 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* User Auth Section */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-surface-container rounded-2xl p-6 border border-white/5">
            <h2 className="text-xl font-headline font-bold text-white mb-2">Вход в систему</h2>
            <p className="text-sm text-on-surface-variant mb-6">
              Сохраните прогресс. Иначе вы потеряете то, что собрали, так как вы находитесь в гостевом режиме!
            </p>
            
            <div className="space-y-3">
              <button className="w-full bg-white text-black font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Войти через Google
              </button>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-outline-variant"></div>
                <span className="flex-shrink-0 mx-4 text-on-surface-variant text-xs">или</span>
                <div className="flex-grow border-t border-outline-variant"></div>
              </div>

              <div className="space-y-3">
                <input type="email" placeholder="Email" className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors" />
                <input type="password" placeholder="Пароль" className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-3 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary transition-colors" />
                <button className="w-full bg-primary text-on-primary font-bold py-3 px-4 rounded-xl hover:bg-primary-container transition-colors">
                  Войти
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Setups Section */}
        <div className="md:col-span-2">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-white uppercase tracking-tight">Ваши сетапы</h1>
            <p className="text-on-surface-variant mt-2">
              Сохранённые конфигурации оборудования. Вы можете сравнить их или продолжить сборку.
            </p>
          </div>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-white">
                Архив
              </h2>
              <span className="text-sm text-primary font-mono bg-primary/10 px-3 py-1 rounded-full">
                {configs.length} СОХРАНЕНО
              </span>
            </div>

            {configs.length === 0 ? (
              <div className="rounded-2xl bg-surface-container border border-white/5 p-12 text-center">
                <Wrench className="w-12 h-12 text-outline-variant mx-auto mb-4" />
                <p className="text-on-surface-variant mb-4">
                  У вас пока нет сохранённых конфигураций
                </p>
                <Link
                  href="/build"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-container transition px-6 py-3 bg-primary/10 rounded-full"
                >
                  Собрать первый сетап
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
                      <h3 className="font-bold text-lg text-white truncate mb-2">{c.name}</h3>
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                          <Package className="w-4 h-4" />
                          {c.items.length} устройств
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                          <Calendar className="w-4 h-4" />
                          {new Date(c.savedAt).toLocaleDateString("ru-RU")}
                        </span>
                        <span className="text-sm font-bold text-secondary">
                          {c.totalPrice.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Link
                        href="/build"
                        className="rounded-xl bg-primary/10 text-primary border border-primary/20 px-5 py-2.5 text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        Открыть
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

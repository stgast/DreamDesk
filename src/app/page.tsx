// ============================================
// DreamDesk — Главная страница (Landing)
// ============================================

"use client";

import Link from "next/link";
import {
  ArrowRight,
  Monitor,
  Keyboard,
  Mouse,
  Mic,
  Headphones,
  AudioLines,
  Grip,
  Antenna,
  Sparkles,
  Wrench,
  ShieldCheck,
} from "lucide-react";

const CATEGORIES = [
  { slug: "monitors", label: "Мониторы", icon: Monitor, color: "text-blue-400" },
  { slug: "arms", label: "Кронштейны", icon: Grip, color: "text-orange-400" },
  { slug: "keyboards", label: "Клавиатуры", icon: Keyboard, color: "text-purple-400" },
  { slug: "mice", label: "Мыши", icon: Mouse, color: "text-cyan-400" },
  { slug: "microphones", label: "Микрофоны", icon: Mic, color: "text-red-400" },
  { slug: "boom-arms", label: "Пантографы", icon: Antenna, color: "text-amber-400" },
  { slug: "audio-interfaces", label: "Звуковые карты", icon: AudioLines, color: "text-emerald-400" },
  { slug: "headphones", label: "Наушники", icon: Headphones, color: "text-pink-400" },
];

const FEATURES = [
  {
    icon: Wrench,
    title: "Конфигуратор",
    desc: "Собирай сетап из каталога: выбирай по категориям, сравнивай цены и характеристики",
  },
  {
    icon: ShieldCheck,
    title: "Совместимость",
    desc: "Автоматические предупреждения: XLR без звуковой карты, тяжёлый монитор без кронштейна",
  },
  {
    icon: Sparkles,
    title: "AI-ассистент",
    desc: "Google Gemini анализирует твою сборку и даёт персональные рекомендации",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-56px)]">
      {/* Hero */}
      <div className="relative flex items-center justify-center overflow-hidden py-20 px-6">
        <div className="absolute inset-0 starfield" aria-hidden />
        <section className="relative z-10 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">
              Умный конфигуратор рабочего места
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Собери свой
            <br />
            <span className="text-accent">идеальный сетап</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Выбери периферию из каталога, проверь совместимость подключений
            и получи AI-рекомендации под свой стиль.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/build"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-white font-medium hover:bg-accent-hover shadow-glow transition-all duration-200"
            >
              Начать сборку
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 rounded-xl border border-dark-border px-6 py-3 text-gray-300 font-medium hover:border-gray-500 hover:text-white transition-all duration-200"
            >
              Каталог
            </Link>
          </div>
        </section>
      </div>

      {/* Категории */}
      <div className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-xl font-semibold text-white mb-6">
            Категории устройств
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="rounded-xl border border-dark-border bg-dark-card p-4 hover:border-dark-hover hover:shadow-card-hover transition-all duration-200"
              >
                <cat.icon className={`w-7 h-7 mb-2 ${cat.color}`} />
                <h3 className="font-heading font-semibold text-white text-sm">
                  {cat.label}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Возможности */}
      <div className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="rounded-xl bg-dark-card border border-dark-border p-6 hover:border-dark-hover transition"
              >
                <f.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-heading font-semibold text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

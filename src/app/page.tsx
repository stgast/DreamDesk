"use client";

import Link from "next/link";
import { ArrowRight, Mouse, Keyboard, Headphones, Square, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: Package_,
    title: "Каталог",
    desc: "27+ устройств от ведущих брендов с фильтрами и поиском",
  },
  {
    icon: Desk_,
    title: "Визуализация",
    desc: "Перетаскивай устройства на виртуальном столе в реальном времени",
  },
  {
    icon: AI_,
    title: "AI-рекомендации",
    desc: "Умный подбор периферии по твоим предпочтениям и бюджету",
  },
];

function Package_({ className }: { className?: string }) {
  return <Mouse className={className} />;
}
function Desk_({ className }: { className?: string }) {
  return <Keyboard className={className} />;
}
function AI_({ className }: { className?: string }) {
  return <Sparkles className={className} />;
}

const CATEGORIES = [
  { type: "mouse", label: "Мыши", icon: Mouse, color: "cat-mouse", count: 6 },
  { type: "keyboard", label: "Клавиатуры", icon: Keyboard, color: "cat-keyboard", count: 7 },
  { type: "headphones", label: "Наушники", icon: Headphones, color: "cat-headphones", count: 7 },
  { type: "mousepad", label: "Коврики", icon: Square, color: "cat-mousepad", count: 7 },
];

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-56px)]">
      {/* Hero */}
      <div className="relative flex items-center justify-center overflow-hidden py-24 px-6">
        <div className="absolute inset-0 starfield" aria-hidden />
        <section className="relative z-10 max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">
              Интерактивный конфигуратор
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Собери свой
            <br />
            <span className="text-accent">идеальный сетап</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Выбери периферию из каталога, расставь на виртуальном столе и получи
            AI-рекомендации под свой стиль.
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

      {/* Categories */}
      <div className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-xl font-semibold text-white mb-6">
            Категории устройств
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.type}
                href={`/catalog?type=${cat.type}`}
                className={`rounded-xl border p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-card-hover cat-${cat.type}-bg`}
              >
                <cat.icon className={`w-8 h-8 mb-3 ${cat.color}`} />
                <h3 className="font-heading font-semibold text-white text-base">
                  {cat.label}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{cat.count} устройств</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
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

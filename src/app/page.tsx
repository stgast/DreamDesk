// ============================================
// DreamDesk — Главная страница (Landing)
// ============================================

"use client";

import Link from "next/link";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Settings2,
  ShieldCheck,
  GitCompareArrows,
  Puzzle,
  Zap,
  Brain,
} from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Конфигуратор DreamDesk подсказал, что мой микрофон слишком тяжел для пантографа, прежде чем я сделал заказ.",
    author: "Артём К., стример"
  },
  {
    quote: "Наконец-то я собрал сетап, где каждое устройство идеально сочетается. Подбор занял 10 минут вместо двух недель.",
    author: "Мария С., дизайнер"
  },
  {
    quote: "AI-ассистент предложил заменить звуковую карту на более совместимую с моим микрофоном. Сэкономил мне 15 000₽ на возвратах.",
    author: "Дмитрий В., подкастер"
  },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToTestimonial = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveTestimonial(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToTestimonial((activeTestimonial + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeTestimonial, goToTestimonial]);

  return (
    <div className="bg-surface text-on-surface w-full overflow-hidden">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center px-12 overflow-hidden">
          <ParticleBackground />
          
          <div className="container mx-auto flex items-center justify-center relative z-10">
            <div className="max-w-3xl text-center flex flex-col items-center">
              <span className="inline-block py-1 px-4 rounded-full bg-primary-container/20 text-primary font-label text-xs tracking-widest uppercase mb-6">
                Новый уровень эргономики
              </span>
              <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-white mb-8 leading-none uppercase">
                СОБЕРИТЕ СВОЙ <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container">СЕТАП</span>
              </h1>
              <p className="text-on-surface-variant text-xl max-w-lg mb-12 leading-relaxed">
                Ультимативный конфигуратор периферии. Профессиональное аппаратное обеспечение, спроектированное вами. Идеальная совместимость.
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <Link href="/build">
                  <button className="px-8 py-4 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold transition-transform hover:scale-105 active:scale-95">
                    Начать сборку
                  </button>
                </Link>
                <Link href="/catalog">
                  <button className="px-8 py-4 rounded-full bg-surface-container-high text-white font-medium border border-outline-variant/15 hover:bg-surface-container-highest transition-colors">
                    Каталог устройств
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 px-12 bg-surface-container-lowest">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tight text-white mb-6 uppercase">Как это работает</h2>
                <p className="text-on-surface-variant text-lg">Бесшовный процесс от идеи до вашего рабочего стола.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="group p-8 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <Settings2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Интеллектуальный Конфигуратор</h3>
                <p className="text-on-surface-variant leading-relaxed">Выбирайте устройства в реальном времени. Каталог топовой периферии поможет создать рабочее пространство мечты.</p>
              </div>
              {/* Step 2 */}
              <div className="group p-8 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Авто-совместимость</h3>
                <p className="text-on-surface-variant leading-relaxed">Система анализирует ваш сет и предупредит о недостающих элементах вроде кронштейна для тяжелого монитора.</p>
              </div>
              {/* Step 3 */}
              <div className="group p-8 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-tertiary-container/20 flex items-center justify-center text-tertiary mb-8 group-hover:scale-110 transition-transform">
                  <GitCompareArrows className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Глубокое сравнение</h3>
                <p className="text-on-surface-variant leading-relaxed">Сравнивайте вес, отклик и визуальный стиль вариантов вашей сборки с помощью ИИ ассистента.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories (Bento Grid) */}
        <section className="py-32 px-12">
          <div className="container mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-black font-headline tracking-tight text-white uppercase">Каталог</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 min-h-[600px]">
              {/* Keyboards */}
              <Link href="/catalog?category=keyboards" className="md:col-span-2 md:row-span-2 relative rounded-lg overflow-hidden group cursor-pointer block">
                <img alt="Keyboards" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6WG9Lvpkvp18r8gnwBPNN7DDglYl9DRM-gdeCArFENbAeDiCArgMDn2WD4qYzvn7alJ0KL1xA5YqCo82_1EsEyi7b54vAqZcc31LgjIwAys5LzOVr9eE6RJGD1dPxlCboTaYiK5cq24qdjZATw50EaziDW7d2YZhhfZF72T62hwujeK9wwLmBDj2v0ptvMV2Uo4QFJGJFbv3QIS6lGkG0q92P2kzT3H4Qma797pwcjxvoCr9qXDmKSKk_K9afimu6Yb-NVXNtWcA" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-bold text-white mb-2">Клавиатуры</h3>
                  <p className="text-on-surface-variant mb-6">60%, TKL, Полноразмерные механики.</p>
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </Link>
              {/* Mice */}
              <Link href="/catalog?category=mice" className="md:col-span-2 relative rounded-lg overflow-hidden group cursor-pointer block">
                <img alt="Mice" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuCOuoG5YGDyle_OVO24igUae_EEzVKBuDjIgk4gXOoV60HA-UC1eaO3kWuC2nyWsIumhHP1a45ocUSc_0OmfJh2R8CPpOauQ_OI7-RLILi8tVuoUblCJ1nSEYy4pnI6byowzaxU50i6gh7pB4uj9eCbKFNnCvvewmiFsDykuuXKIWWf5XByTK6mSNFoPvW3XFZ3DVVJNOPlGeN3xA2PRbNokAgDmzx40hFFh13l2o_xocJXoR9cez_2ktAnJKpN81yOZKBUNmSSA" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-bold text-white mb-1">Мыши</h3>
                  <span className="text-on-surface-variant">Прецизионная оптика.</span>
                </div>
              </Link>
              {/* Audio */}
              <Link href="/catalog?category=headphones" className="relative rounded-lg overflow-hidden group cursor-pointer block">
                <img alt="Audio" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKoXe3LLLmWqai27QeSMw9foFmJGBgViEhZ4dFpwtXPpVfAhB7rKewcBefsuDViJau7c4lIjbKuVw52kZ0PW6m8OKbSST64YnK-3H92f8AcBCEPkEzZfs07E1AVQLbIvO8lzJqUViEu26Ds3foMnOKVQyqkxa_i56zJ_HZwjheC25A3b9taJA9wW8hbasN7ZioJIR_j3fn9lIywFQBrj1wa0hhri7MtRWjXDcfNKDDEA_VYOonsZevDquxXe7zBJkJbOspp6KME7o" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-xl font-bold text-white">Аудио</h4>
                </div>
              </Link>
              {/* Microphones */}
              <Link href="/catalog?category=microphones" className="relative rounded-lg overflow-hidden group cursor-pointer block">
                <img alt="Microphones" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANbpBs90cumT8Yt6wt_tFLupaLmzWIb5ifkFJmuKNyCexr0Avm-i0nWl-9EQj-eJs7ttj27FUSjYL6gN4iHBKuLKbfZ9OKrd6wjsVoyK7vUoDnZAaRrLDTnfBxGzdKnSWI4o0BbOiAt3OT--Sq3tkVIZS4liQXrZPNSng7zgyF0ACA-QzlubtFdLGSrfdzlsn0yCFirxrHLF4cn_LfcBJrN7lf_oKdp9EhK-iQ20kEcE8ZRvyVfgab8hY8n2zAxDRJaNcTtt-jOFs" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-xl font-bold text-white">Микрофоны</h4>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Why DreamDesk */}
        <section className="py-32 px-12 bg-surface">
          <div className="container mx-auto bg-surface-container-low rounded-lg p-12 md:p-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -mr-48 -mt-48 rounded-full pointer-events-none"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div>
                <h2 className="text-5xl font-black font-headline tracking-tight text-white mb-8 uppercase">Почему DreamDesk?</h2>
                <div className="space-y-12">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                      <Puzzle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Модульная экосистема</h4>
                      <p className="text-on-surface-variant">Собирайте сетап как конструктор — каждый компонент заменяем. Обновите одно устройство без пересборки всей системы.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                      <Zap className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Мгновенная валидация</h4>
                      <p className="text-on-surface-variant">Система за миллисекунды проверит, подойдёт ли ваш 34&quot; монитор к выбранному кронштейну по весу и креплению VESA.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-tertiary/15 flex items-center justify-center shrink-0">
                      <Brain className="w-6 h-6 text-tertiary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">AI-ассистент на базе Gemini</h4>
                      <p className="text-on-surface-variant">Задайте вопрос прямо в конфигураторе — ИИ подскажет оптимальную комбинацию устройств под ваш бюджет и задачи.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="aspect-square w-full glass-panel bg-white/5 border border-white/10 rounded-lg p-12 flex flex-col justify-center text-center overflow-hidden">
                  <h3 className="text-8xl font-black text-white mb-4">99%</h3>
                  <p className="text-2xl text-primary font-headline uppercase tracking-widest mb-8">Совместимости</p>
                  
                  {/* Testimonial Carousel */}
                  <div className="relative h-24 overflow-hidden">
                    {TESTIMONIALS.map((t, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out"
                        style={{
                          transform: `translateX(${(i - activeTestimonial) * 100}%)`,
                          opacity: i === activeTestimonial ? 1 : 0,
                        }}
                      >
                        <p className="text-on-surface-variant italic text-sm leading-relaxed">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <p className="text-primary/70 text-xs mt-2 font-medium">— {t.author}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center gap-2">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToTestimonial(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === activeTestimonial
                            ? "bg-primary w-6"
                            : "bg-outline-variant hover:bg-on-surface-variant"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-12 text-center relative">
          <div className="container mx-auto">
            <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-white mb-12 uppercase">Готовы собрать сетап?</h2>
            <Link href="/build">
              <button className="px-12 py-6 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary text-xl font-bold transition-all hover:scale-110 active:scale-95 shadow-[0px_24px_48px_rgba(173,198,255,0.2)]">
                К конфигуратору
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-12 border-t border-white/5 bg-surface-container-lowest">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-[1920px] mx-auto">
          <div className="text-white font-bold text-lg font-headline">DreamDesk</div>
          <div className="flex gap-10">
            <Link href="/privacy" className="text-[#9ea3af] hover:text-[#adc6ff] transition-opacity opacity-80 hover:opacity-100 text-sm font-label">Политика</Link>
            <Link href="/terms" className="text-[#9ea3af] hover:text-[#adc6ff] transition-opacity opacity-80 hover:opacity-100 text-sm font-label">Условия</Link>
            <Link href="/contact" className="text-[#9ea3af] hover:text-[#adc6ff] transition-opacity opacity-80 hover:opacity-100 text-sm font-label">Контакты</Link>
          </div>
          <div className="text-[#9ea3af] text-sm font-label">
            © 2026 DreamDesk. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

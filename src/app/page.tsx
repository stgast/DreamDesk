// ============================================
// DreamDesk — Главная страница (Landing)
// ============================================

"use client";

import Link from "next/link";
import { ParticleBackground } from "@/components/ParticleBackground";
import { HeroSection } from "@/components/HeroSection";
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
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import type { Language } from "@/types";

const TESTIMONIALS_BY_LANGUAGE: Record<Language, Array<{ quote: string; author: string }>> = {
  RU: [
    {
      quote: "Конфигуратор DreamDesk подсказал, что мой микрофон слишком тяжел для пантографа, прежде чем я сделал заказ.",
      author: "Артём К., стример",
    },
    {
      quote: "Наконец-то я собрал сетап, где каждое устройство идеально сочетается. Подбор занял 10 минут вместо двух недель.",
      author: "Мария С., дизайнер",
    },
    {
      quote: "AI-ассистент предложил заменить звуковую карту на более совместимую с моим микрофоном. Сэкономил мне 15 000₽ на возвратах.",
      author: "Дмитрий В., подкастер",
    },
  ],
  EN: [
    {
      quote: "DreamDesk flagged that my mic was too heavy for the boom arm before I placed the order.",
      author: "Artem K., streamer",
    },
    {
      quote: "I finally built a setup where every device works perfectly together. It took 10 minutes instead of two weeks.",
      author: "Maria S., designer",
    },
    {
      quote: "The AI assistant suggested a more compatible audio interface for my microphone. I saved $200 on returns.",
      author: "Dmitriy V., podcaster",
    },
  ],
  UK: [
    {
      quote: "DreamDesk підказав, що мікрофон занадто важкий для пантографа, перш ніж я замовив його.",
      author: "Артем К., стример",
    },
    {
      quote: "Нарешті я зібрав сетап, де кожен пристрій ідеально поєднується. Підбір зайняв 10 хвилин замість двох тижнів.",
      author: "Марія С., дизайнерка",
    },
    {
      quote: "AI-асистент запропонував більш сумісний аудіоінтерфейс для мого мікрофона. Я заощадив 15 000₴ на поверненнях.",
      author: "Дмитрій В., підкастер",
    },
  ],
  PL: [
    {
      quote: "DreamDesk ostrzegł, że mój mikrofon jest za ciężki dla ramienia przed złożeniem zamówienia.",
      author: "Artem K., streamer",
    },
    {
      quote: "W końcu zbudowałem zestaw, w którym każde urządzenie idealnie do siebie pasuje. Zajęło to 10 minut zamiast dwóch tygodni.",
      author: "Maria S., projektantka",
    },
    {
      quote: "Asystent AI zasugerował bardziej kompatybilny interfejs audio do mojego mikrofonu. Zaoszczędziłem 200 USD na zwrotach.",
      author: "Dmitriy V., podcaster",
    },
  ],
};

export default function HomePage() {
  const { language } = useApp();
  const t = useTranslation(language);
  const testimonials = TESTIMONIALS_BY_LANGUAGE[language] || TESTIMONIALS_BY_LANGUAGE.EN;
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
      goToTestimonial((activeTestimonial + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeTestimonial, goToTestimonial, testimonials.length]);

  return (
    <div className="bg-surface text-on-surface w-full overflow-hidden">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* How It Works Section */}
        <section className="py-32 px-12 bg-surface-container-lowest">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-black font-headline tracking-tight text-white mb-6 uppercase">{t("how_it_works")}</h2>
                <p className="text-on-surface-variant text-lg">{t("seamless_process")}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="group p-8 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <Settings2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t("intelligent_configurator")}</h3>
                <p className="text-on-surface-variant leading-relaxed">{t("intelligent_configurator_desc")}</p>
              </div>
              {/* Step 2 */}
              <div className="group p-8 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t("auto_compatibility")}</h3>
                <p className="text-on-surface-variant leading-relaxed">{t("auto_compatibility_desc")}</p>
              </div>
              {/* Step 3 */}
              <div className="group p-8 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all duration-500">
                <div className="w-16 h-16 rounded-2xl bg-tertiary-container/20 flex items-center justify-center text-tertiary mb-8 group-hover:scale-110 transition-transform">
                  <GitCompareArrows className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t("deep_comparison")}</h3>
                <p className="text-on-surface-variant leading-relaxed">{t("deep_comparison_desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories (Bento Grid) */}
        <section className="py-32 px-12">
          <div className="max-w-[1920px] mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-black font-headline tracking-tight text-white uppercase">{t("catalog")}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 min-h-[600px]">
              {/* Keyboards */}
              <Link href="/catalog?category=keyboards" className="md:col-span-2 md:row-span-2 relative rounded-lg overflow-hidden group cursor-pointer block">
                <img alt="Keyboards" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6WG9Lvpkvp18r8gnwBPNN7DDglYl9DRM-gdeCArFENbAeDiCArgMDn2WD4qYzvn7alJ0KL1xA5YqCo82_1EsEyi7b54vAqZcc31LgjIwAys5LzOVr9eE6RJGD1dPxlCboTaYiK5cq24qdjZATw50EaziDW7d2YZhhfZF72T62hwujeK9wwLmBDj2v0ptvMV2Uo4QFJGJFbv3QIS6lGkG0q92P2kzT3H4Qma797pwcjxvoCr9qXDmKSKk_K9afimu6Yb-NVXNtWcA" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{t("keyboards")}</h3>
                  <p className="text-on-surface-variant mb-6">{t("keyboards_description")}</p>
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </Link>
              {/* Mice */}
              <Link href="/catalog?category=mice" className="md:col-span-2 relative rounded-lg overflow-hidden group cursor-pointer block">
                <img alt="Mice" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuCOuoG5YGDyle_OVO24igUae_EEzVKBuDjIgk4gXOoV60HA-UC1eaO3kWuC2nyWsIumhHP1a45ocUSc_0OmfJh2R8CPpOauQ_OI7-RLILi8tVuoUblCJ1nSEYy4pnI6byowzaxU50i6gh7pB4uj9eCbKFNnCvvewmiFsDykuuXKIWWf5XByTK6mSNFoPvW3XFZ3DVVJNOPlGeN3xA2PRbNokAgDmzx40hFFh13l2o_xocJXoR9cez_2ktAnJKpN81yOZKBUNmSSA" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-bold text-white mb-1">{t("mice")}</h3>
                  <span className="text-on-surface-variant">{t("mice_description")}</span>
                </div>
              </Link>
              {/* Audio */}
              <Link href="/catalog?category=headphones" className="relative rounded-lg overflow-hidden group cursor-pointer block">
                <img alt="Audio" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKoXe3LLLmWqai27QeSMw9foFmJGBgViEhZ4dFpwtXPpVfAhB7rKewcBefsuDViJau7c4lIjbKuVw52kZ0PW6m8OKbSST64YnK-3H92f8AcBCEPkEzZfs07E1AVQLbIvO8lzJqUViEu26Ds3foMnOKVQyqkxa_i56zJ_HZwjheC25A3b9taJA9wW8hbasN7ZioJIR_j3fn9lIywFQBrj1wa0hhri7MtRWjXDcfNKDDEA_VYOonsZevDquxXe7zBJkJbOspp6KME7o" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-xl font-bold text-white">{t("audio")}</h4>
                </div>
              </Link>
              {/* Microphones */}
              <Link href="/catalog?category=microphones" className="relative rounded-lg overflow-hidden group cursor-pointer block">
                <img alt="Microphones" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANbpBs90cumT8Yt6wt_tFLupaLmzWIb5ifkFJmuKNyCexr0Avm-i0nWl-9EQj-eJs7ttj27FUSjYL6gN4iHBKuLKbfZ9OKrd6wjsVoyK7vUoDnZAaRrLDTnfBxGzdKnSWI4o0BbOiAt3OT--Sq3tkVIZS4liQXrZPNSng7zgyF0ACA-QzlubtFdLGSrfdzlsn0yCFirxrHLF4cn_LfcBJrN7lf_oKdp9EhK-iQ20kEcE8ZRvyVfgab8hY8n2zAxDRJaNcTtt-jOFs" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-xl font-bold text-white">{t("microphones")}</h4>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Why DreamDesk */}
        <section className="py-32 px-12 bg-surface">
          <div className="max-w-[1920px] mx-auto bg-surface-container-low rounded-lg p-12 md:p-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -mr-48 -mt-48 rounded-full pointer-events-none"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div>
                <h2 className="text-5xl font-black font-headline tracking-tight text-white mb-8 uppercase">{t("why_dreamdesk")}</h2>
                <div className="space-y-12">
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                      <Puzzle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{t("modular_ecosystem")}</h4>
                      <p className="text-on-surface-variant">{t("modular_ecosystem_desc")}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                      <Zap className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{t("instant_validation")}</h4>
                      <p className="text-on-surface-variant">{t("instant_validation_desc")}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-tertiary/15 flex items-center justify-center shrink-0">
                      <Brain className="w-6 h-6 text-tertiary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{t("ai_assistant")}</h4>
                      <p className="text-on-surface-variant">{t("ai_assistant_desc")}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="aspect-square w-full glass-panel bg-white/5 border border-white/10 rounded-lg p-12 flex flex-col justify-center text-center overflow-hidden">
                  <h3 className="text-8xl font-black text-white mb-4">99%</h3>
                  <p className="text-2xl text-primary font-headline uppercase tracking-widest mb-8">{t("compatibility")}</p>

                  {/* Testimonial Carousel */}
                  <div className="relative h-24 overflow-hidden">
                    {testimonials.map((testimonial, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-in-out"
                        style={{
                          transform: `translateX(${(i - activeTestimonial) * 100}%)`,
                          opacity: i === activeTestimonial ? 1 : 0,
                        }}
                      >
                        <p className="text-on-surface-variant italic text-sm leading-relaxed">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <p className="text-primary/70 text-xs mt-2 font-medium">— {testimonial.author}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToTestimonial(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeTestimonial
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
          <div className="max-w-[1920px] mx-auto">
            <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-white mb-12 uppercase">{t("ready_to_build")}</h2>
            <Link href="/build">
              <button className="px-12 py-6 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary text-xl font-bold transition-all hover:scale-110 active:scale-95 shadow-[0px_24px_48px_rgba(173,198,255,0.2)]">
                {t("to_configurator")}
              </button>
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}

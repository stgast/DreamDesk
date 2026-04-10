// ============================================
// DreamDesk — Секция "Почему DreamDesk"
// ============================================

"use client";

import { Puzzle, Zap, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

export function WhyDreamDesk() {
  const { language } = useApp();
  const t = useTranslation(language);

  // Fallback для ключей, которых может не быть напрямую в типе (или добавленных позже)
  const safeT = (key: string, fallback: string) => {
    try {
      return t(key as any) || fallback;
    } catch {
      return fallback;
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-dark-bg">
      <div className="max-w-[1920px] mx-auto bg-surface-container-lowest rounded-[3rem] p-8 md:p-16 lg:p-24 relative overflow-hidden border border-white/5">
        
        {/* Фоновые декорации */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -mr-48 -mt-48 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[100px] -ml-48 -mb-48 rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Левая часть: Описание */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-white mb-12 uppercase">
              {t("why_dreamdesk")}
            </h2>
            
            <div className="space-y-12">
              <div className="flex gap-6 group">
                <div className="text-primary mt-1 group-hover:scale-110 transition-transform">
                  <Puzzle className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {t("modular_ecosystem")}
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    {t("modular_ecosystem_desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="text-secondary mt-1 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {t("instant_validation")}
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    {t("instant_validation_desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="text-tertiary mt-1 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {safeT("ai_assistant", "AI-ассистент")}
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    {safeT("ai_assistant_desc", "Рекомендует оптимальные комбинации устройств на основе ваших задач")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть: Статистика */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="aspect-square w-full max-w-md bg-white/5 border border-white/10 rounded-[2.5rem] p-12 flex flex-col justify-center items-center text-center backdrop-blur-md shadow-2xl relative overflow-hidden">
               {/* Внутренее свечение */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
               
               <h3 className="text-7xl md:text-8xl font-black text-white mb-4 drop-shadow-lg tracking-tighter">
                 99%
               </h3>
               <p className="text-xl md:text-2xl text-primary font-headline uppercase tracking-widest mb-8 font-bold">
                 {t("compatibility")}
               </p>
               <p className="text-on-surface-variant italic text-sm md:text-base opacity-80 leading-relaxed max-w-xs">
                 "AI-ассистент предложил заменить звуковую карту на более совместимую с моим микрофоном. Сэкономил мне 15 000₽ на возвратах."
               </p>
               <div className="mt-6 text-sm text-gray-500 font-medium">— Дмитрий К., подкастер</div>
               
               {/* Декоративные точки */}
               <div className="mt-10 flex justify-center gap-2">
                 <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                 <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                 <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

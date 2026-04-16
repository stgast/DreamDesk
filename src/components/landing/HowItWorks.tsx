// ============================================
// DreamDesk — Секция "Как это работает"
// ============================================

"use client";

import { Cpu, ShieldCheck, ArrowLeftRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { ScrollFloat } from "@/components/ui/ScrollFloat";
import { RotatingText } from "@/components/ui/RotatingText";
import BorderGlow from "@/components/ui/BorderGlow";

export function HowItWorks() {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <section className="py-24 px-6 md:px-12 bg-surface-container-lowest border-t border-white/5 relative z-10">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-white uppercase">
            <ScrollFloat animationDuration={1} stagger={0.03}>
              КАК ЭТО РАБОТАЕТ
            </ScrollFloat>
          </div>
          <div className="text-gray-400 text-lg flex flex-col md:flex-row items-center justify-center gap-2 mt-4">
            <span>Соберите свой идеальный сетап</span>
            <RotatingText 
              texts={['быстро', 'без ошибок', 'с помощью ИИ']} 
              mainClassName="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg overflow-hidden"
              staggerDuration={0.02}
              rotationInterval={3000}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Шаг 1 */}
          <BorderGlow 
            className="group p-8 w-full shadow-lg h-full"
            borderRadius={24}
            backgroundColor="#1e1e24"
            animated={true}
            colors={['#3b82f6', '#8b5cf6', '#a855f7']}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
              <Cpu className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              {t("intelligent_configurator")}
            </h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
              {t("intelligent_configurator_desc")}
            </p>
          </BorderGlow>

          {/* Шаг 2 */}
          <BorderGlow 
            className="group p-8 w-full shadow-lg h-full"
            borderRadius={24}
            backgroundColor="#1e1e24"
            animated={true}
            colors={['#10b981', '#34d399', '#059669']}
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
              <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              {t("auto_compatibility")}
            </h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
              {t("auto_compatibility_desc")}
            </p>
          </BorderGlow>

          {/* Шаг 3 */}
          <BorderGlow 
            className="group p-8 w-full shadow-lg h-full"
            borderRadius={24}
            backgroundColor="#1e1e24"
            animated={true}
            colors={['#f59e0b', '#fbbf24', '#d97706']}
          >
            <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-8 group-hover:scale-110 group-hover:bg-tertiary/20 transition-all">
              <ArrowLeftRight className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              {t("deep_comparison")}
            </h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
              {t("deep_comparison_desc")}
            </p>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}

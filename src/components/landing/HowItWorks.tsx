// ============================================
// DreamDesk — Секция "Как это работает"
// ============================================

"use client";

import { Cpu, ShieldCheck, ArrowLeftRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

export function HowItWorks() {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <section className="py-24 px-6 md:px-12 bg-surface-container-lowest border-t border-white/5 relative z-10">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-white mb-6 uppercase">
              {t("how_it_works")}
            </h2>
            <p className="text-on-surface-variant text-lg">
              {t("seamless_process")}
            </p>
          </div>
          <span className="text-primary font-mono text-sm tracking-widest hidden md:block">
            PROCESS_01-03
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Шаг 1 */}
          <div className="group p-8 rounded-3xl bg-surface hover:bg-surface-container-high transition-all duration-500 border border-white/5 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
              <Cpu className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              {t("intelligent_configurator")}
            </h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
              {t("intelligent_configurator_desc")}
            </p>
          </div>

          {/* Шаг 2 */}
          <div className="group p-8 rounded-3xl bg-surface hover:bg-surface-container-high transition-all duration-500 border border-white/5 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 group-hover:bg-secondary/20 transition-all">
              <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              {t("auto_compatibility")}
            </h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
              {t("auto_compatibility_desc")}
            </p>
          </div>

          {/* Шаг 3 */}
          <div className="group p-8 rounded-3xl bg-surface hover:bg-surface-container-high transition-all duration-500 border border-white/5 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-8 group-hover:scale-110 group-hover:bg-tertiary/20 transition-all">
              <ArrowLeftRight className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              {t("deep_comparison")}
            </h3>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">
              {t("deep_comparison_desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// DreamDesk — Секция "Финальный призыв к действию"
// ============================================

"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { MagicButton } from "@/components/MagicButton";

export function FinalCTA() {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <section className="py-32 px-6 md:px-12 text-center bg-dark-bg relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(173, 198, 255, 0.15) 0%, transparent 70%)
          `
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-white mb-12 uppercase leading-tight">
          {t("ready_to_build")}
        </h2>
        
        <div className="flex justify-center">
          <Link href="/build">
             <button className="px-12 py-5 rounded-full bg-gradient-to-br from-primary to-primary-container text-dark-bg text-lg md:text-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-[0px_20px_40px_rgba(173,198,255,0.25)] hover:shadow-[0px_20px_50px_rgba(173,198,255,0.4)]">
                {t("to_configurator")}
             </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

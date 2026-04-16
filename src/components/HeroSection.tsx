// ============================================
// DreamDesk — Hero Section with Dynamic Gradients
// ============================================

"use client";

import Link from "next/link";
import { ParticleBackground } from "@/components/ParticleBackground";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { MagicButton } from "@/components/MagicButton";
import { useEffect, useState } from "react";

export function HeroSection() {
  const { language } = useApp();
  const t = useTranslation(language);
  const [gradientIndex, setGradientIndex] = useState(0);

  const gradients = [
    "from-blue-600/30 via-purple-600/20 to-pink-600/30",
    "from-purple-600/30 via-pink-600/20 to-red-600/30",
    "from-cyan-600/30 via-blue-600/20 to-purple-600/30",
    "from-emerald-600/30 via-cyan-600/20 to-blue-600/30",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center px-6 md:px-12 overflow-hidden">
      <ParticleBackground />

      {/* Animated gradient background layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Moving gradient orbs */}
        <div
          className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${
            gradients[gradientIndex]
          } rounded-full blur-[120px] transition-all duration-2000 ease-in-out -mr-32 -mt-32`}
        />
        <div
          className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr ${
            gradients[(gradientIndex + 2) % gradients.length]
          } rounded-full blur-[120px] transition-all duration-2000 ease-in-out delay-1000 -ml-32 -mb-32`}
        />
        <div
          className={`absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br ${
            gradients[(gradientIndex + 1) % gradients.length]
          } rounded-full blur-[100px] transition-all duration-2000 ease-in-out delay-500 -translate-x-1/2 -translate-y-1/2 opacity-50`}
        />
      </div>

      {/* Mesh gradient overlay for extra sophistication */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.3] to-black/[0.6] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[1920px] mx-auto w-full flex items-center justify-center">
        <div className="max-w-3xl text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-primary/20 to-primary-container/20 border border-primary/30 text-primary font-label text-xs tracking-widest uppercase mb-6 backdrop-blur-sm">
            {t("new_level")}
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-headline tracking-tighter text-white mb-8 leading-none uppercase relative">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-primary-container">
              {t("hero_title")}
            </span>
            {/* Underline accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-primary-container rounded-full mt-4 max-w-xs mx-auto" />
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-lg mb-12 leading-relaxed">
            {t("hero_subtitle")}
          </p>

          {/* CTA Buttons with Magic Button */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full">
            <Link href="/build" className="flex-shrink-0">
              <MagicButton variant="primary">
                {t("start_building")}
              </MagicButton>
            </Link>
            <Link href="/catalog" className="flex-shrink-0">
              <MagicButton variant="secondary">
                {t("catalog_devices")}
              </MagicButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

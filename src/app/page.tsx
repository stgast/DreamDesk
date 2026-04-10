// ============================================
// DreamDesk — Главная страница (Landing Page)
// ============================================

"use client";

import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CatalogPreview } from "@/components/landing/CatalogPreview";
import { WhyDreamDesk } from "@/components/landing/WhyDreamDesk";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      <HeroSection />
      <HowItWorks />
      <CatalogPreview />
      <WhyDreamDesk />
      <FinalCTA />
    </div>
  );
}

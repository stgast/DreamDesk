"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-56px)] flex items-center justify-center overflow-hidden">
      {/* Звёздное небо */}
      <div className="absolute inset-0 starfield" aria-hidden />

      <section className="relative z-10 rounded-3xl bg-dark-surface/90 border border-dark-border p-8 md:p-12 max-w-lg mx-4 shadow-glow">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Собери свой сетап
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Выбери периферию и расставь её на виртуальном столе. AI подберёт устройства под тебя.
        </p>
        <div className="flex justify-center">
          <Link
            href="/build"
            className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-white font-medium hover:bg-accent-hover shadow-glow transition"
          >
            Начать
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

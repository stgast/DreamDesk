// ============================================
// DreamDesk — Верхняя панель (Header)
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function Header() {
  const { theme, toggleTheme } = useApp();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 w-full z-50 bg-[#000000]/70 backdrop-blur-3xl saturate-150 border-b border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.03] before:to-transparent before:pointer-events-none transition-all duration-300">
      <div className="flex justify-between items-center px-12 py-6 max-w-[1920px] mx-auto">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white uppercase font-headline hover:text-primary transition-colors">
          DreamDesk
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/build"
            className={`${pathname === '/build' ? 'text-[#adc6ff] border-b-2 border-[#adc6ff] pb-1' : 'text-on-surface-variant dark:text-[#9ea3af] hover:text-white'} font-label text-sm tracking-wide transition-colors duration-300`}
          >
            Конфигуратор
          </Link>
          <Link
            href="/catalog"
            className={`${pathname === '/catalog' ? 'text-[#adc6ff] border-b-2 border-[#adc6ff] pb-1' : 'text-on-surface-variant dark:text-[#9ea3af] hover:text-white'} font-label text-sm tracking-wide transition-colors duration-300`}
          >
            Каталог
          </Link>
          <Link
            href="/compare"
            className={`${pathname === '/compare' ? 'text-[#adc6ff] border-b-2 border-[#adc6ff] pb-1' : 'text-on-surface-variant dark:text-[#9ea3af] hover:text-white'} font-label text-sm tracking-wide transition-colors duration-300`}
          >
            Сравнение
          </Link>
          <Link
            href="/profile"
            className={`${pathname === '/profile' ? 'text-[#adc6ff] border-b-2 border-[#adc6ff] pb-1' : 'text-on-surface-variant dark:text-[#9ea3af] hover:text-white'} font-label text-sm tracking-wide transition-colors duration-300`}
          >
            Профиль
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <button className="scale-95 transition-transform duration-200 active:scale-90 text-[#adc6ff] hover:text-white">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container border border-white/10 hover:border-white/30 transition-colors">
              <img
                alt="User profile avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpsiPhbPul_ANa_6cachBSc2SALevtLvib7d38zOYB9twQ41c1t1bVm9iH7RM9plRd31VYGnNcH0HwsbvzNSfD4j2uVFq_V-ARD0yln9IfkCLSACWYAMdNeT1m8HQprLmJjbaOHHkYNAqTKwO3tRX_a3F1ZtpWg0tjRTJIEgDdj6Bfrjt0WJzxuGyaaNuwt1BcvPY60hDPRMvvaZtJUJSPIH7QwHCO96aO0mFyEH3PGS7Y-O823MwHBmMFxXbV76AAi00f89N6UsQ"
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

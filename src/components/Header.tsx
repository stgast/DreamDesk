// ============================================
// DreamDesk — Верхняя панель (Header)
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <nav className="sticky top-0 w-full z-50 bg-[#000000]/70 backdrop-blur-3xl saturate-150 border-b border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.03] before:to-transparent before:pointer-events-none transition-all duration-300">
      <div className="w-full max-w-[1920px] mx-auto px-12 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white uppercase font-headline hover:text-primary transition-smooth">
            DreamDesk
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/build"
              className={`${pathname === '/build' ? 'text-[#adc6ff] border-b-2 border-[#adc6ff] pb-1' : 'text-on-surface-variant dark:text-[#9ea3af] hover:text-white'} font-label text-sm tracking-wide transition-smooth duration-300`}
            >
              {t("configurator")}
            </Link>
            <Link
              href="/catalog"
              className={`${pathname === '/catalog' ? 'text-[#adc6ff] border-b-2 border-[#adc6ff] pb-1' : 'text-on-surface-variant dark:text-[#9ea3af] hover:text-white'} font-label text-sm tracking-wide transition-smooth duration-300`}
            >
              {t("catalog")}
            </Link>
            <Link
              href="/compare"
              className={`${pathname === '/compare' ? 'text-[#adc6ff] border-b-2 border-[#adc6ff] pb-1' : 'text-on-surface-variant dark:text-[#9ea3af] hover:text-white'} font-label text-sm tracking-wide transition-smooth duration-300`}
            >
              {t("compare")}
            </Link>
            <Link
              href="/profile"
              className={`${pathname === '/profile' ? 'text-[#adc6ff] border-b-2 border-[#adc6ff] pb-1' : 'text-on-surface-variant dark:text-[#9ea3af] hover:text-white'} font-label text-sm tracking-wide transition-smooth duration-300`}
            >
              {t("profile")}
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/profile"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container border border-white/10 hover:border-white/30 transition-colors text-[#adc6ff] hover:text-white overflow-hidden"
              aria-label={t("profile")}
            >
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5" strokeWidth={1.75} />
              )}
            </Link>
          </div>
        </div>
      </nav>
    );
  }

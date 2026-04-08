// ============================================
// DreamDesk — Верхняя панель (Header)
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X, Globe, Coins } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { useTranslation, TranslationKey } from "@/lib/i18n";
import { CustomDropdown } from "./CustomDropdown";
import { useState, useEffect } from "react";
import { Language, Currency } from "@/types";

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { language, setLanguage, currency, setCurrency } = useApp();
  const t = useTranslation(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);

  // Load user image separately to keep session cookie small
  useEffect(() => {
    if (session?.user?.id) {
      fetch("/api/user/me")
        .then(res => res.json())
        .then(data => setUserImage(data.image))
        .catch(err => console.error("Header avatar fetch error:", err));
    }
  }, [session]);

  const navItems: { href: string; label: TranslationKey }[] = [
    { href: "/build", label: "configurator" },
    { href: "/catalog", label: "catalog" },
    { href: "/compare", label: "compare" },
    { href: "/profile", label: "profile" },
  ];

  const NavLink = ({ href, label }: { href: string; label: TranslationKey }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`relative px-1 py-2 text-sm font-label tracking-wide transition-colors duration-300 ${
          isActive ? "text-[#adc6ff]" : "text-[#9ea3af] hover:text-white"
        } group`}
      >
        {t(label)}
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#adc6ff] to-[#7c9cff] transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 w-full z-50 backdrop-blur-lg transition-all duration-300">
      {/* Glassmorphism background layers */}
      <div className="absolute inset-0 bg-[#000000]/40 backdrop-blur-xl backdrop-saturate-150" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
      <div className="absolute -inset-0 bg-[radial-gradient(circle_at_top,rgba(173,198,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="relative w-full max-w-[1920px] mx-auto px-6 md:px-12 h-16 md:h-20 grid grid-cols-3 items-center">
        {/* Logo - Left aligned */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase font-headline hover:text-[#adc6ff] transition-colors duration-300 flex-shrink-0"
          >
            DreamDesk
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex items-center gap-8 justify-center">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </div>

        {/* Right Actions - Right aligned */}
        <div className="flex items-center gap-4 md:gap-6 justify-end">
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 text-[#adc6ff]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={2} />
            )}
          </button>

          {/* Profile Avatar */}
          <Link
            href="/profile"
            className="relative w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-white/[0.1] to-white/[0.05] border border-white/[0.15] hover:border-white/[0.3] transition-all duration-300 text-[#adc6ff] hover:text-white overflow-hidden group flex-shrink-0"
            aria-label={t("profile")}
          >
            {userImage || session?.user?.image ? (
              <img
                src={userImage || (session?.user?.image as string)}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.75} />
            )}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.05] transition-colors duration-300" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden relative border-t border-white/[0.1]">
          <div className="px-6 py-4 space-y-2 bg-gradient-to-b from-white/[0.05] to-transparent">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2.5 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-white/[0.1] text-[#adc6ff] border border-white/[0.2]"
                      : "text-[#9ea3af] hover:bg-white/[0.05] hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-sm font-label tracking-wide">{t(item.label)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

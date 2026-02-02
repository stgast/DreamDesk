"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, KeyRound, User } from "lucide-react";
import { clsx } from "clsx";
import { useState, useRef, useEffect } from "react";

const nav = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/catalog", label: "Каталог", icon: Package },
  { href: "/build", label: "Конфигурация", icon: KeyRound },
  { href: "/profile", label: "Профиль", icon: User },
];

const HOVER_EXPAND_DELAY_MS = 0;

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearTimer();
    hoverTimerRef.current = setTimeout(() => setExpanded(true), HOVER_EXPAND_DELAY_MS);
  };

  const handleMouseLeave = () => {
    clearTimer();
    setExpanded(false);
  };

  useEffect(() => clearTimer, []);

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        "fixed left-0 top-0 bottom-0 z-30 border-r border-dark-border bg-dark-surface flex flex-col items-center transition-all duration-300 ease-out rounded-r-2xl",
        expanded ? "w-52" : "w-[72px]"
      )}
    >
      <nav className="flex-1 flex flex-col items-center justify-center gap-1 py-4 w-full">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center justify-center gap-3 rounded-xl text-sm font-medium transition py-2.5 w-full",
              expanded ? "px-4 w-[calc(100%-16px)] mx-2" : "px-0 w-12",
              pathname === href || (href !== "/" && pathname.startsWith(href))
                ? "bg-accent/20 text-accent border border-accent/30"
                : "text-gray-400 hover:text-white hover:bg-dark-hover"
            )}
            title={!expanded ? label : undefined}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {expanded && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

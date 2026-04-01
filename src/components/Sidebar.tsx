// ============================================
// DreamDesk — Боковое меню (Sidebar)
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wrench, Package, User, ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { useApp } from "@/context/AppContext";

const nav = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/build", label: "Конфигуратор", icon: Wrench },
  { href: "/catalog", label: "Каталог", icon: Package },
  { href: "/profile", label: "Профиль", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useApp();

  return (
    <aside
      className={clsx(
        "sticky top-0 h-screen flex flex-col border-r border-dark-border bg-dark-surface transition-all duration-300 ease-out shrink-0 z-30",
        sidebarCollapsed ? "w-16" : "w-56"
      )}
    >
      {/* Логотип */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-dark-border">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm font-heading">D</span>
        </div>
        {!sidebarCollapsed && (
          <span className="font-heading font-bold text-white text-lg tracking-tight">
            DreamDesk
          </span>
        )}
      </div>

      {/* Навигация */}
      <nav className="flex-1 flex flex-col gap-1 p-2 mt-2">
        {nav.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 h-10",
                sidebarCollapsed ? "justify-center px-0" : "px-3",
                active
                  ? "bg-accent/15 text-accent"
                  : "text-gray-400 hover:text-white hover:bg-dark-hover"
              )}
              title={sidebarCollapsed ? label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Кнопка сворачивания */}
      <button
        type="button"
        onClick={toggleSidebar}
        className="flex items-center justify-center h-10 border-t border-dark-border text-gray-500 hover:text-white transition"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, User } from "lucide-react";
import { useApp } from "@/context/AppContext";

const PAGE_TITLES: Record<string, string> = {
  "/": "Главная",
  "/catalog": "Каталог периферии",
  "/build": "Конфигуратор",
  "/profile": "Профиль",
};

export function Header() {
  const { theme, toggleTheme } = useApp();
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "";

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-14 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border px-6">
      <h2 className="font-heading font-semibold text-white text-lg">{title}</h2>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-hover transition"
          aria-label={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
        <Link
          href="/profile"
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-hover transition"
          aria-label="Профиль"
        >
          <User className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}

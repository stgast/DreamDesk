"use client";

import Link from "next/link";
import { Sun, Moon, User } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function Header() {
  const { theme, toggleTheme } = useApp();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-end gap-2 bg-dark-bg/90 backdrop-blur px-4 md:px-6 py-2">
      <button
        type="button"
        onClick={toggleTheme}
        className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-dark-hover transition"
        aria-label={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <Link
        href="/profile"
        className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-dark-hover transition"
        aria-label="Профиль"
      >
        <User className="w-5 h-5" />
      </Link>
    </header>
  );
}

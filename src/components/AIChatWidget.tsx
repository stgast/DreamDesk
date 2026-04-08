"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sparkles, X, Bot } from "lucide-react";
import { AIChat } from "./AIChat";
import { useSetup } from "@/context/SetupContext";

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useSetup();
  const pathname = usePathname();

  // Открытие по Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Глобальное событие для вызова из других компонентов
    const handleToggleEvent = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-dreamdesk-ai", handleToggleEvent);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-dreamdesk-ai", handleToggleEvent);
    };
  }, []);

  if (pathname !== "/build" && pathname !== "/compare" && pathname !== "/profile") {
    return null;
  }

  const isComparePage = pathname === "/compare";

  return (
    <>
      {/* Кнопка вызова (скрыта в конфигураторе и сравнении, так как там она встроена в поиск) */}
      {pathname !== "/build" && pathname !== "/compare" && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed ${isComparePage ? "bottom-24" : "bottom-8"} left-8 z-50 flex items-center justify-center gap-2 rounded-full glass-panel bg-surface-container-highest/80 border border-primary/30 px-5 py-3 text-primary shadow-[0px_8px_32px_rgba(173,198,255,0.15)] transition-all hover:scale-105 active:scale-95 hover:border-primary/50 hover:shadow-[0px_8px_32px_rgba(173,198,255,0.3)]`}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              <span className="font-bold text-sm tracking-wide">DreamDesk AI</span>
            </>
          )}
        </button>
      )}

      {/* Окно чата */}
      <div
        className={`fixed ${isComparePage ? "bottom-[164px]" : "bottom-24"} left-8 z-50 flex h-[600px] max-h-[calc(100vh-140px)] w-[380px] origin-bottom-left flex-col overflow-hidden rounded-2xl glass-panel bg-surface-container/90 border border-white/10 shadow-[0px_24px_48px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out sm:w-[420px] ${
          isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 bg-surface-container-high px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Bot className="h-4 w-4" />
            </div>
            <span className="font-headline text-lg font-black text-white tracking-tighter">
              Dream Desk AI
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <AIChat />
        </div>
      </div>
    </>
  );
}

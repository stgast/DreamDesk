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
          className={`fixed ${isComparePage ? "bottom-24" : "bottom-8"} left-8 z-50 flex items-center justify-center gap-2 rounded-full glass-panel bg-surface-container-highest/80 border border-primary/30 px-5 py-3 text-primary shadow-[0px_8px_32px_rgba(173,198,255,0.15)] transition-all hover:scale-105 active:scale-95 hover:border-primary/50 hover:shadow-[0px_8px_32px_rgba(173,198,255,0.3)] ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <Sparkles className="h-5 w-5" />
          <span className="font-bold text-sm tracking-wide">DreamDesk AI</span>
        </button>
      )}


      {/* Окно чата */}
      <div
        className={`fixed ${isComparePage ? "bottom-[164px]" : "bottom-24"} left-8 z-50 flex h-[620px] max-h-[calc(100vh-140px)] w-[400px] origin-bottom-left flex-col overflow-hidden rounded-[2.5rem] glass-chat shadow-[0px_32px_64px_rgba(0,0,0,0.6)] transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) sm:w-[440px] ${isOpen ? "scale-100 opacity-100 pointer-events-auto translate-y-0" : "scale-90 opacity-0 pointer-events-none translate-y-10"
          }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 bg-white/[0.02] backdrop-blur-md px-6 py-5">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center text-accent shadow-inner">
                <Bot className="h-5 w-5" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#1a1b20] rounded-full shadow-sm" />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-white tracking-tight leading-tight">
                Dream Desk AI
              </h3>
              <p className="text-[11px] text-accent/60 font-medium uppercase tracking-widest">
                Online Assistant
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <AIChat />
        </div>
      </div>
    </>
  );
}

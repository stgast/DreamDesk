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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (pathname !== "/build" && pathname !== "/compare") {
    return null;
  }

  return (
    <>
      {/* Кнопка вызова */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center gap-2 rounded-full glass-panel bg-surface-container-highest/80 border border-primary/30 px-5 py-3 text-primary shadow-[0px_8px_32px_rgba(173,198,255,0.15)] transition-all hover:scale-105 active:scale-95 hover:border-primary/50 hover:shadow-[0px_8px_32px_rgba(173,198,255,0.3)]"
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

      {/* Окно чата */}
      <div
        className={`fixed bottom-24 right-8 z-50 flex h-[600px] max-h-[calc(100vh-140px)] w-[380px] origin-bottom-right flex-col overflow-hidden rounded-2xl glass-panel bg-surface-container/90 border border-white/10 shadow-[0px_24px_48px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out sm:w-[420px] ${
          isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/5 bg-surface-container-high px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Bot className="h-4 w-4" />
            </div>
            <span className="font-headline text-base font-bold text-white tracking-tight">
              AI Core
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-on-surface-variant font-mono border border-white/10 px-2 py-1 rounded bg-surface/50">
              ⌘ K
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-on-surface-variant hover:text-white transition-colors"
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

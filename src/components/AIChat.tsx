// ============================================
// DreamDesk — AI-чат с Google Gemini
// Отправляет сборку + историю сообщений на /api/chat
// ============================================

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { useSetup } from "@/context/SetupContext";
import type { ChatMessage } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export function AIChat() {
  const { items } = useSetup();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Привет! Я DreamDesk AI. Добавь товары в сборку и спроси меня «Оцени мою сборку» — я проверю совместимость и дам рекомендации.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Автоскролл при новом сообщении
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Отправка сообщения в AI
  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    // Добавляем сообщение пользователя
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Формируем текущую сборку для ИИ
      const currentSetup = items.map((i) => ({
        name: i.product.name,
        category: i.product.category?.name ?? "Неизвестно",
        price: i.product.price,
        connectionType: i.product.connectionType,
        features: i.product.features as string[],
        weight: i.product.weight,
      }));

      // Подготавливаем историю (без welcome-сообщения)
      const history = [...messages.filter((m) => m.id !== "welcome"), userMsg].map(
        (m) => ({
          role: m.role,
          content: m.content,
        })
      );

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, currentSetup }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: "assistant",
            content: `Ошибка: ${data.error}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant",
            content: data.message || data.content,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "Не удалось связаться с AI. Проверьте настройку GEMINI_API_KEY в .env",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, items, messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Сообщения */}
       <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scroll-smooth custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={m.id}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Аватар */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  m.role === "user"
                    ? "bg-accent/15 border border-accent/20"
                    : "bg-dark-card border border-white/5"
                }`}
              >
                {m.role === "user" ? (
                  <User className="w-4 h-4 text-accent" />
                ) : (
                  <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                )}
              </div>

              {/* Текст сообщения */}
              <div
                className={`max-w-[85%] rounded-[1.25rem] px-4 py-3 text-[13px] leading-relaxed whitespace-pre-wrap shadow-xl relative group ${
                  m.role === "user"
                    ? "bg-accent text-white rounded-tr-none"
                    : "bg-[#1A1A1E] border border-white/5 text-gray-200 rounded-tl-none"
                }`}
              >
                {m.content}
                {/* Subtle depth for AI blocks */}
                {m.role === "assistant" && (
                  <div className="absolute inset-0 rounded-[1.25rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Индикатор загрузки */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-dark-card border border-white/5 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent animate-spin" />
            </div>
            <div className="bg-[#1A1A1E] border border-white/5 rounded-[1.25rem] rounded-tl-none px-4 py-3 shadow-xl flex items-center">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-1 rounded-full bg-accent"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Быстрые команды */}
      {items.length > 0 && messages.length <= 2 && (
        <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
          {["Оцени мою сборку", "Есть проблемы с совместимостью?", "Как улучшить?"].map(
            (q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  setInput(q);
                }}
                className="text-[10px] text-gray-400 bg-dark-card border border-dark-border rounded-md px-2 py-1 hover:text-white hover:border-dark-hover transition"
              >
                {q}
              </button>
            )
          )}
        </div>
      )}

       {/* Поле ввода */}
      <div className="px-5 py-4 border-t border-white/5 bg-[#121216] shrink-0">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={
                items.length === 0
                  ? "Сначала добавьте товары в сборку..."
                  : "Спросите AI про вашу сборку..."
              }
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-[13px] text-white placeholder-gray-600 focus:border-accent/50 focus:bg-white/[0.05] focus:outline-none transition-all pr-12"
              disabled={loading}
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-accent text-dark-bg flex items-center justify-center transition-all hover:scale-110 active:scale-90 hover:shadow-[0_0_15px_rgba(173,198,255,0.4)] disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

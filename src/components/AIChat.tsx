// ============================================
// DreamDesk — AI-чат с Google Gemini
// Отправляет сборку + историю сообщений на /api/chat
// ============================================

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { useSetup } from "@/context/SetupContext";
import type { ChatMessage } from "@/types";

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
            content: data.message,
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
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Аватар */}
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                m.role === "user"
                  ? "bg-accent/15"
                  : "bg-dark-card border border-dark-border"
              }`}
            >
              {m.role === "user" ? (
                <User className="w-3 h-3 text-accent" />
              ) : (
                <Bot className="w-3 h-3 text-gray-400" />
              )}
            </div>

            {/* Текст сообщения */}
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-accent text-white"
                  : "bg-dark-card border border-dark-border text-gray-200"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {/* Индикатор загрузки */}
        {loading && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-md bg-dark-card border border-dark-border flex items-center justify-center">
              <Bot className="w-3 h-3 text-gray-400" />
            </div>
            <div className="bg-dark-card border border-dark-border rounded-xl px-3 py-2">
              <Loader2 className="w-4 h-4 text-accent animate-spin" />
            </div>
          </div>
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
      <div className="px-3 py-2 border-t border-dark-border shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={
              items.length === 0
                ? "Сначала добавьте товары..."
                : "Спросите AI про сборку..."
            }
            className="flex-1 rounded-lg border border-dark-border bg-dark-card px-3 py-2 text-xs text-white placeholder-gray-600 focus:border-accent focus:outline-none"
            disabled={loading}
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="rounded-lg bg-accent p-2 text-white hover:bg-accent-hover transition disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

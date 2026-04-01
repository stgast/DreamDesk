"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, Sparkles, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const CONTEXT_RESPONSES: Record<string, string[]> = {
  игр: [
    "Для игр рекомендую лёгкую мышь Logitech G Pro X Superlight (63г) — она идеальна для быстрых шутеров. В пару к ней механическая клавиатура Keychron Q1 с линейными свитчами для мгновенного отклика.",
    "Игровой сетап: Razer Viper V2 Pro (мышь) + Razer BlackWidow V3 (клава) + SteelSeries Arctis 7 (наушники). Всё беспроводное, минимум кабелей на столе.",
  ],
  работ: [
    "Для продуктивной работы советую Logitech MX Master 3S — эргономичная, тихая, с функцией Flow между устройствами. Клавиатура — Keychron K2 с тактильными свитчами.",
    "Офисный сетап: Logitech MX Master 3S + Keychron K2 + Sennheiser HD 560S. Комфортный набор для многочасовой работы.",
  ],
  бюджет: [
    "При ограниченном бюджете смотри: Glorious Model O (мышь, ~5000₽) + HyperX Alloy Origins (клава, ~9000₽) + HyperX Cloud II (наушники, ~8000₽) + HyperX Fury S (коврик, ~1800₽). Итого: ~24000₽ — отличное соотношение цена/качество.",
    "Бюджетный вариант: SteelSeries Rival 5 + Keychron K2 + HyperX Cloud II + SteelSeries QcK Heavy. Около 24500₽ за весь сетап.",
  ],
  хват: [
    "Для хвата «коготь» (claw grip) подойдут компактные мыши: Glorious Model O или Razer Viper V2 Pro. Они лёгкие и узкие — пальцы удобно согнуты.",
    "Для хвата «ладонь» (palm grip) нужна мышь побольше: Razer DeathAdder V3 или Logitech MX Master 3S. Полная поддержка ладони.",
  ],
};

const DEFAULT_REPLIES = [
  "Отличный выбор! Хочешь, подберу устройства из каталога, которые будут сочетаться по стилю?",
  "Расскажи подробнее: какой у тебя бюджет и для чего нужен сетап — для игр, работы или стриминга?",
  "Попробуй открыть каталог и добавить мышь и клавиатуру на стол — я подскажу, если что-то не подходит.",
  "Хороший вопрос! Для максимального комфорта важно подобрать мышь под тип хвата. Расскажи, как ты держишь мышь.",
];

function getSmartReply(userText: string): string {
  const lower = userText.toLowerCase();
  for (const [keyword, responses] of Object.entries(CONTEXT_RESPONSES)) {
    if (lower.includes(keyword)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  return DEFAULT_REPLIES[Math.floor(Math.random() * DEFAULT_REPLIES.length)];
}

export function AIChatSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      text: "Привет! Я помогу подобрать периферию для твоего стола. Расскажи, для чего нужен сетап (игры, работа, стрим) и какой у тебя бюджет.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text || typing) return;
    setInput("");
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    // Simulate AI "thinking" with context-aware response
    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      const reply = getSmartReply(text);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: reply,
        },
      ]);
      setTyping(false);
    }, delay);
  };

  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 z-40 h-full w-full max-w-sm bg-dark-surface border-l border-dark-border shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-dark-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">AI помощник</h2>
            <p className="text-[10px] text-gray-500">Подбор периферии</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-dark-hover transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                m.role === "user"
                  ? "bg-accent/15"
                  : "bg-dark-card border border-dark-border"
              }`}
            >
              {m.role === "user" ? (
                <User className="w-3.5 h-3.5 text-accent" />
              ) : (
                <Bot className="w-3.5 h-3.5 text-gray-400" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-accent text-white"
                  : "bg-dark-card border border-dark-border text-gray-200"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-dark-card border border-dark-border flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="bg-dark-card border border-dark-border rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-dark-border shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Опиши свои предпочтения..."
            className="flex-1 rounded-lg border border-dark-border bg-dark-card px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none"
            disabled={typing}
          />
          <button
            type="button"
            onClick={send}
            disabled={typing || !input.trim()}
            className="rounded-lg bg-accent p-2.5 text-white hover:bg-accent-hover transition disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

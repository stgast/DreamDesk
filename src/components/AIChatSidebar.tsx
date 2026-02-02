"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const MOCK_REPLIES: string[] = [
  "Для игр советую лёгкую мышь вроде Logitech G Pro X Superlight и механическую клавиатуру с линейными свитчами.",
  "Если бюджет ограничен, смотри Keychron K2 и Razer DeathAdder V3 — хорошее соотношение цена/качество.",
  "Для офиса подойдут тихие клавиатуры и наушники с шумоподавлением, например Beyerdynamic DT 770 Pro.",
  "Под твой тип хвата (коготь) лучше мыши поменьше и легче. Можешь выбрать Glorious Model O или аналог.",
];

export function AIChatSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      text: "Привет! Опиши, для чего нужен сетап (игры, работа, стрим) и бюджет — подберу периферию под слоты.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const reply =
        MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", text: reply },
      ]);
    }, 600);
  };

  if (!open) return null;

  return (
    <div className={`fixed top-0 right-0 z-40 h-full w-full max-w-md bg-dark-surface border-l border-dark-border shadow-xl flex flex-col transform transition-all duration-300 ease-in-out ${open ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}`}>
      <div className="flex items-center justify-between p-4 border-b border-dark-border">
        <h2 className="text-lg font-semibold text-white">AI помощник</h2>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-dark-hover transition-all duration-200 ease-in-out"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                m.role === "user"
                  ? "bg-accent text-white"
                  : "bg-dark-card border border-dark-border text-gray-200"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 border-t border-dark-border flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Спроси про периферию..."
          className="flex-1 rounded-xl border border-dark-border bg-dark-card px-4 py-2.5 text-white placeholder-gray-500 focus:border-accent focus:outline-none"
        />
        <button
          type="button"
          onClick={send}
          className="rounded-xl bg-accent p-2.5 text-white hover:bg-accent-hover transition-all duration-200 ease-in-out"
          aria-label="Отправить"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

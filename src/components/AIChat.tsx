// ============================================
// DreamDesk — AI-чат с Google Gemini
// Версия: Premium (Diploma Edition)
// Особенности: Typewriter, Feedback, Animated Avatar, Sounds, Voice
// ============================================

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, Loader2, Sparkles, Mic, MicOff, ThumbsUp, ThumbsDown, Volume2, VolumeX } from "lucide-react";
import { useSetup } from "@/context/SetupContext";
import { useApp } from "@/context/AppContext";
import type { ChatMessage } from "@/types";
import { useTranslation } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

// Компонент для эффекта печатающейся машинки
const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let index = 0;
    const chars = Array.from(text);
    setDisplayedText("");

    intervalRef.current = setInterval(() => {
      index++;
      setDisplayedText(chars.slice(0, index).join(""));
      if (index >= chars.length) {
        clearInterval(intervalRef.current!);
        if (onComplete) onComplete();
      }
    }, 15);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

export function AIChat() {
  const { items, addItem } = useSetup();
  const { currency, language } = useApp();
  const t = useTranslation(language);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const soundsEnabled = true;
  const [activeSetups, setActiveSetups] = useState<any[]>([]);
  const [suggestionButtons, setSuggestionButtons] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Функция для получения приветственного сообщения на нужном языке
  const getWelcomeMessage = (): ChatMessage => {
    return {
      id: "welcome",
      role: "assistant" as const,
      content: t("ai_welcome_message"),
    };
  };

  // Звуковые уведомления
  const playSound = (type: "send" | "receive") => {
    if (!soundsEnabled) return;
    try {
      const audio = new Audio(
        type === "send"
          ? "https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3"
          : "https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3"
      );
      audio.volume = 0.15;
      audio.play();
    } catch (e) {
      console.warn("Sound play failed", e);
    }
  };

  // 1. История сообщений (LocalStorage)
  useEffect(() => {
    const saved = localStorage.getItem("dreamdesk_chat_history");
    if (saved) {
      const parsedHistory = JSON.parse(saved);
      // Если в истории только приветствие, обновляем его язык
      if (parsedHistory.length === 1 && parsedHistory[0].id === "welcome") {
        setMessages([getWelcomeMessage()]);
      } else {
        setMessages(parsedHistory);
      }
    } else {
      setMessages([getWelcomeMessage()]);
    }
  }, [language]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("dreamdesk_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // 3. Голосовой ввод (Web Speech API)
  const startVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert(t("ai_voice_error"));
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    const locales: Record<string, string> = {
      RU: "ru-RU",
      EN: "en-US",
      UK: "uk-UA",
      PL: "pl-PL",
    };
    recognition.lang = locales[language] || "ru-RU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;


    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setSuggestionButtons([]); // Скрываем саджесты при вводе
    };

    recognition.start();
  };

  const confirmClear = () => {
    setMessages([getWelcomeMessage()]);
    localStorage.removeItem("dreamdesk_chat_history");
    setSuggestionButtons([]); // Очищаем саджесты сборок
    setActiveSetups([]);
    setShowConfirmClear(false);
  };

  // Автоскролл при новом сообщении
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Функция для "Оцени мою сборку"
  const handleEvaluateSetup = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/setups");
      const data = await res.json();
      const setups = data.setups || [];
      setActiveSetups(setups);

      if (setups.length > 0) {
        // Если сборки есть, просим ИИ их перечислить и предлагаем кнопки
        setSuggestionButtons(setups.slice(-5).map((s: any) => s.name));
      }

      await sendMessage(t("ai_evaluate_setup"), { userSetups: setups });
    } catch (err) {
      console.error("Failed to fetch setups", err);
      await sendMessage(t("ai_evaluate_setup"));
    }
  };

  // Функция для выбора конкретной сборки из саджеста
  const handleSelectSetup = async (setupName: string) => {
    const selected = activeSetups.find(s => s.name === setupName);
    setSuggestionButtons([]); // Убираем кнопки после выбора

    if (selected) {
      // Парсим айтемы сборки (они в JSON строке в базе)
      const setupItems = typeof selected.items === 'string' ? JSON.parse(selected.items) : selected.items;

      await sendMessage(`${t("ai_evaluate_setup")} "${setupName}"`, {
        targetSetup: {
          name: selected.name,
          items: setupItems,
          totalPrice: selected.totalPrice
        }
      });
    } else {
      await sendMessage(`${t("ai_evaluate_setup")} "${setupName}"`);
    }
  };

  // Отправка сообщения в AI
  const sendMessage = useCallback(async (forcedText?: string, extraContext?: any) => {
    const text = forcedText || input.trim();
    if (!text || loading) return;

    if (!forcedText) setSuggestionButtons([]); // Убираем саджесты если юзер пишет сам

    playSound("send");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!forcedText) setInput("");
    setLoading(true);

    try {
      const currentSetup = items.map((i) => ({
        name: i.product.name,
        category: i.product.category?.name ?? "Unknown",
        price: i.product.price,
        connectionType: i.product.connectionType,
        features: i.product.features as string[],
        weight: i.product.weight,
      }));

      const history = [...messages.filter((m) => m.id !== "welcome"), userMsg].map(
        (m) => ({
          role: m.role,
          content: m.content,
        })
      );

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          currentSetup,
          userCurrency: currency,
          userLanguage: language,
          ...extraContext
        }),
      });

      const data = await response.json();

      if (data.addedProduct) {
        addItem(data.addedProduct);
      }


      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: "assistant" as const,
            content: `${t("loading")}: ${data.error}`,
          },
        ]);
      } else {
        playSound("receive");
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant" as const,
            content: data.message || data.content,
            isNew: true,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant" as const,
          content: "Failed to connect to AI. Please check your network.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, items, messages, language, t]);

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* Кастомное модальное окно */}
      <AnimatePresence>
        {showConfirmClear && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-black/40"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1e1f24] border border-white/10 rounded-3xl p-6 shadow-2xl max-w-[280px] w-full text-center"
            >
              <h4 className="text-white font-bold mb-2">{t("ai_clear_confirm_title")}</h4>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                {t("ai_clear_confirm_desc")}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 text-white text-xs font-bold hover:bg-white/10 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={confirmClear}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/80 text-white text-xs font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-500/20"
                >
                  {t("delete")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-10 scroll-smooth custom-scrollbar">
        <AnimatePresence initial={false} mode="popLayout">
          {messages.map((m) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                opacity: { duration: 0.2 }
              }}
              key={m.id}
              className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: m.role === "user" ? -5 : 5 }}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border relative ${m.role === "user"
                    ? "bg-accent/10 border-accent/20"
                    : "bg-white/5 border-white/10"
                  }`}
              >
                {m.role === "user" ? (
                  <User className="w-5 h-5 text-accent" />
                ) : (
                  <div className="relative z-10">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <motion.div
                      animate={{
                        scale: [1, 1.25, 1],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 90, 180, 270, 360]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-tr from-accent/50 to-purple-500/50 blur-xl rounded-full -z-10"
                    />
                  </div>
                )}
              </motion.div>

              <div className="flex flex-col gap-2 max-w-[80%]">
                <div
                  className={`rounded-3xl px-5 py-3.5 text-[14px] leading-relaxed relative group transition-all duration-300 ${m.role === "user"
                      ? "user-message-gradient text-dark-bg font-medium rounded-tr-none shadow-[0_10px_20px_rgba(173,198,255,0.2)]"
                      : "ai-message-gradient border border-white/10 text-gray-100 rounded-tl-none shadow-2xl backdrop-blur-md"
                    }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-code:text-accent prose-li:my-1 font-body">
                      {(m as any).isNew ? (
                        <TypewriterText text={m.content} onComplete={() => { (m as any).isNew = false; }} />
                      ) : (
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      )}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap font-body text-[13px]">{m.content}</div>
                  )}

                  {m.role === "assistant" && (
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                  )}
                </div>


                {/* Система обратной связи */}
                {m.role === "assistant" && m.id !== "welcome" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2 ml-1"
                  >
                    <button 
                      onClick={() => {
                        const feedback = m.feedback === 'like' ? undefined : 'like';
                        setMessages(prev => prev.map(msg => 
                          msg.id === m.id ? { ...msg, feedback } : msg
                        ));
                      }}
                      className={`p-1.5 rounded-lg border transition-all ${
                        m.feedback === 'like' 
                          ? 'bg-accent/20 border-accent/50 text-accent shadow-lg shadow-accent/20' 
                          : 'bg-white/5 border-white/5 text-gray-500 hover:text-accent hover:border-accent/30'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => {
                        const feedback = m.feedback === 'dislike' ? undefined : 'dislike';
                        setMessages(prev => prev.map(msg => 
                          msg.id === m.id ? { ...msg, feedback } : msg
                        ));
                      }}
                      className={`p-1.5 rounded-lg border transition-all ${
                        m.feedback === 'dislike' 
                          ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-lg shadow-red-500/20' 
                          : 'bg-white/5 border-white/5 text-gray-500 hover:text-red-400 hover:border-red-400/30'
                      }`}
                    >
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-purple-500/20"
              />
              <Sparkles className="w-5 h-5 text-accent animate-pulse relative z-10" />
            </div>
            <div className="ai-message-gradient border border-white/10 rounded-3xl rounded-tl-none px-5 py-3.5 shadow-xl flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -4, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-accent"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Кнопки-саджесты для сборок */}
        {suggestionButtons.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 ml-14"
          >
            {suggestionButtons.map((name) => (
              <button
                key={name}
                onClick={() => handleSelectSetup(name)}
                className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-[12px] font-medium hover:bg-accent/20 transition-all"
              >
                📁 {name}
              </button>
            ))}
          </motion.div>
        )}

        <div ref={bottomRef} className="h-4" />
      </div>


      <div className="p-6 pt-2 backdrop-blur-xl border-t border-white/5 bg-[#121216]/50 shrink-0">
        <div className="pb-4 flex justify-between items-center">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="text-[11px] font-bold text-accent bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 hover:bg-accent/20 transition-all shadow-sm flex items-center gap-2 font-headline"
              onClick={() => handleEvaluateSetup()}
            >
              {t("ai_evaluate_setup")}
            </motion.button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowConfirmClear(true)}
              className="text-[10px] text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest font-bold"
            >
              {t("ai_clear_history")}
            </button>
          </div>
        </div>

        <div className="relative group neon-border">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={
              isListening ? t("ai_listening") : t("ai_placeholder")
            }
            className={`w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-6 pr-24 py-4 text-[14px] text-white placeholder-gray-600 focus:border-accent/40 focus:bg-white/[0.05] focus:outline-none transition-all font-body ${isListening ? "ring-2 ring-accent/30 shadow-[0_0_15px_rgba(173,198,255,0.2)]" : ""}`}
            disabled={loading}
          />

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={startVoiceInput}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isListening ? "bg-accent/20 text-accent shadow-[0_0_10px_rgba(173,198,255,0.3)]" : "bg-white/5 text-gray-400 hover:text-white"}`}
            >
              {isListening ? <Mic className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-accent text-dark-bg flex items-center justify-center transition-all shadow-[0_4px_15px_rgba(173,198,255,0.3)] disabled:opacity-20 disabled:grayscale disabled:shadow-none"
            >
              <Send className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

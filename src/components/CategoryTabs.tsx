// ============================================
// DreamDesk — Табы категорий
// Скроллируемый список для фильтрации товаров
// ============================================

"use client";

import { motion } from "framer-motion";
import type { Category } from "@/types";
import { useTranslation } from "@/lib/i18n";
import { useApp } from "@/context/AppContext";
import { 
  Monitor, 
  Gamepad2, 
  Keyboard, 
  MousePointer2, 
  Mic2, 
  Speaker, 
  Headphones, 
  Layers,
  LayoutGrid
} from "lucide-react";

interface CategoryTabsProps {
  categories: Category[];
  active: string;
  onChange: (id: string) => void;
}

// Маппинг иконок по slug категории
const ICON_MAP: Record<string, any> = {
  all: LayoutGrid,
  monitors: Monitor,
  arms: Layers,
  keyboards: Keyboard,
  mice: MousePointer2,
  microphones: Mic2,
  "boom-arms": Gamepad2, // Или подходящая иконка
  "audio-interfaces": Speaker,
  headphones: Headphones,
};

export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  const { language } = useApp();
  const t = useTranslation(language);

  // Добавляем категорию "Все" в начало списка
  const allCategories = [
    { id: "all", name: t("all"), slug: "all" },
    ...categories,
  ];

  return (
    <div className="w-full bg-dark-bg/50 backdrop-blur-md border-b border-dark-border px-4 py-2 overflow-x-auto custom-scrollbar no-scrollbar scroll-smooth">
      <div className="flex items-center gap-2 min-w-max px-2">
        {allCategories.map((cat) => {
          const isActive = active === cat.id;
          const IconComp = ICON_MAP[cat.slug] || LayoutGrid;

          // Пытаемся найти перевод по слагу категории
          // Напр. slug: "monitors" -> key: "category_monitors"
          const translationKey = `category_${cat.slug.replace("-", "_")}` as any;
          const translatedName = cat.slug === "all" ? t("all") : (t(translationKey) !== translationKey ? t(translationKey) : cat.name);

          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 outline-none ${
                isActive ? "text-dark-bg" : "text-gray-400 hover:text-white"
              }`}
            >
              {/* Активный фон с анимацией раскладки */}
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-accent rounded-xl shadow-lg shadow-accent/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Иконка и Текст (поверх фона) */}
              <IconComp 
                className={`relative z-10 w-4 h-4 transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`} 
              />
              <span className="relative z-10 text-[13px] font-bold tracking-tight whitespace-nowrap">
                {translatedName}
              </span>
              
              {!isActive && (
                 <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full mx-4" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Стили для скрытия скроллбара */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

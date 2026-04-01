// ============================================
// DreamDesk — Табы категорий для фильтрации каталога
// ============================================

"use client";

import type { Category } from "@/types";
import {
  Monitor,
  Grip,
  Keyboard,
  Mouse,
  Mic,
  Antenna,
  AudioLines,
  Headphones,
  LayoutGrid,
} from "lucide-react";

// Маппинг иконок из БД на компоненты Lucide
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Grip,
  Keyboard,
  Mouse,
  Mic,
  Antenna,
  AudioLines,
  Headphones,
};

interface CategoryTabsProps {
  categories: Category[];
  active: string;
  onChange: (categoryId: string) => void;
}

export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-1 px-6 pb-3 overflow-x-auto">
      {/* Таб "Все" */}
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
          active === "all"
            ? "bg-accent/15 text-accent"
            : "text-gray-500 hover:text-gray-300 hover:bg-dark-hover"
        }`}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        Все
      </button>

      {/* Табы по категориям */}
      {categories.map((cat) => {
        const Icon = cat.icon ? ICON_MAP[cat.icon] : LayoutGrid;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
              active === cat.id
                ? "bg-accent/15 text-accent"
                : "text-gray-500 hover:text-gray-300 hover:bg-dark-hover"
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}

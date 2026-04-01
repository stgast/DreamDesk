// ============================================
// DreamDesk — Карточка товара в каталоге
// Показывает название, цену, характеристики, кнопку добавления
// ============================================

"use client";

import { Plus, Check } from "lucide-react";
import type { Product } from "@/types";
import { useSetup } from "@/context/SetupContext";

// Цвета категорий (по slug)
const CATEGORY_COLORS: Record<string, string> = {
  monitors: "text-blue-400",
  arms: "text-orange-400",
  keyboards: "text-purple-400",
  mice: "text-cyan-400",
  microphones: "text-red-400",
  "boom-arms": "text-amber-400",
  "audio-interfaces": "text-emerald-400",
  headphones: "text-pink-400",
};

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const { hasCategory } = useSetup();
  const isInSetup = hasCategory(product.categoryId);
  const catSlug = product.category?.slug ?? "";
  const catColor = CATEGORY_COLORS[catSlug] ?? "text-gray-400";

  return (
    <div className="group rounded-xl border border-dark-border bg-dark-card p-4 hover:border-dark-hover hover:shadow-card-hover transition-all duration-200">
      {/* Заголовок: категория + тип подключения */}
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[11px] font-semibold uppercase tracking-wider ${catColor}`}>
          {product.category?.name ?? "Товар"}
        </span>
        <span className="text-[10px] text-gray-600 bg-dark-surface rounded px-1.5 py-0.5">
          {product.connectionType}
        </span>
      </div>

      {/* Изображение */}
      <div className="h-32 flex items-center justify-center rounded-lg bg-dark-surface mb-3 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-dark-border" />
        )}
      </div>

      {/* Название и описание */}
      <h3 className="font-medium text-white text-sm leading-tight">
        {product.name}
      </h3>
      {product.description && (
        <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      )}

      {/* Характеристики (features) — как теги */}
      {product.features.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {(product.features as string[]).slice(0, 4).map((feat, i) => (
            <span
              key={i}
              className="text-[10px] text-gray-400 bg-dark-surface rounded px-1.5 py-0.5"
            >
              {feat}
            </span>
          ))}
          {product.features.length > 4 && (
            <span className="text-[10px] text-gray-600">
              +{product.features.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Цена + кнопка добавления */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-border">
        <span className="text-sm font-bold text-lime">
          {product.price.toLocaleString("ru-RU")} ₽
        </span>
        <button
          type="button"
          onClick={onAdd}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            isInSetup
              ? "bg-lime/15 text-lime"
              : "bg-accent/10 text-accent hover:bg-accent/20"
          }`}
        >
          {isInSetup ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Заменить
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              В сборку
            </>
          )}
        </button>
      </div>
    </div>
  );
}

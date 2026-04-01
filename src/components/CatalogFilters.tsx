"use client";

import { X } from "lucide-react";

const TYPES = [
  { value: "", label: "Все типы" },
  { value: "mouse", label: "Мыши" },
  { value: "keyboard", label: "Клавиатуры" },
  { value: "headphones", label: "Наушники" },
  { value: "mousepad", label: "Коврики" },
];

const BRANDS = [
  "",
  "Logitech",
  "Razer",
  "SteelSeries",
  "HyperX",
  "Keychron",
  "Glorious",
  "Beyerdynamic",
  "Sennheiser",
  "Audio-Technica",
  "Corsair",
];
const COLORS = ["", "black", "white"];

interface Filters {
  type: string;
  brand: string;
  color: string;
  minPrice: string;
  maxPrice: string;
}

export function CatalogFilters({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const activeCount = [
    filters.type,
    filters.brand,
    filters.color,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  const reset = () =>
    onChange({ type: "", brand: "", color: "", minPrice: "", maxPrice: "" });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
        className="rounded-lg border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white focus:border-accent focus:outline-none appearance-none cursor-pointer"
      >
        {TYPES.map((t) => (
          <option key={t.value || "all"} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <select
        value={filters.brand}
        onChange={(e) => onChange({ ...filters, brand: e.target.value })}
        className="rounded-lg border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white focus:border-accent focus:outline-none appearance-none cursor-pointer"
      >
        <option value="">Все бренды</option>
        {BRANDS.filter(Boolean).map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <select
        value={filters.color}
        onChange={(e) => onChange({ ...filters, color: e.target.value })}
        className="rounded-lg border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white focus:border-accent focus:outline-none appearance-none cursor-pointer"
      >
        <option value="">Все цвета</option>
        {COLORS.filter(Boolean).map((c) => (
          <option key={c} value={c}>
            {c === "black" ? "Чёрный" : "Белый"}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-1">
        <input
          type="number"
          placeholder="от ₽"
          value={filters.minPrice}
          onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
          className="w-20 rounded-lg border border-dark-border bg-dark-surface px-2.5 py-2 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none"
        />
        <span className="text-gray-600 text-xs">—</span>
        <input
          type="number"
          placeholder="до ₽"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
          className="w-20 rounded-lg border border-dark-border bg-dark-surface px-2.5 py-2 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none"
        />
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1 rounded-lg bg-dark-hover px-2.5 py-2 text-xs text-gray-400 hover:text-white transition"
        >
          <X className="w-3 h-3" />
          Сбросить ({activeCount})
        </button>
      )}
    </div>
  );
}

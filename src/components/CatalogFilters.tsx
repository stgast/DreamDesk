"use client";

const TYPES = [
  { value: "", label: "Все типы" },
  { value: "mouse", label: "Мыши" },
  { value: "keyboard", label: "Клавиатуры" },
  { value: "headphones", label: "Наушники" },
  { value: "mousepad", label: "Коврики" },
];

const BRANDS = ["", "Logitech", "Razer", "SteelSeries", "HyperX", "Keychron", "Glorious", "Beyerdynamic", "Sennheiser", "Audio-Technica", "Corsair"];
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
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
        className="rounded-xl border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
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
        className="rounded-xl border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
      >
        <option value="">Бренд</option>
        {BRANDS.filter(Boolean).map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <select
        value={filters.color}
        onChange={(e) => onChange({ ...filters, color: e.target.value })}
        className="rounded-xl border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
      >
        <option value="">Цвет</option>
        {COLORS.filter(Boolean).map((c) => (
          <option key={c} value={c}>
            {c === "black" ? "Чёрный" : "Белый"}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Мин. цена"
        value={filters.minPrice}
        onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
        className="w-24 rounded-xl border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-accent focus:outline-none"
      />
      <input
        type="number"
        placeholder="Макс. цена"
        value={filters.maxPrice}
        onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
        className="w-24 rounded-xl border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-accent focus:outline-none"
      />
    </div>
  );
}

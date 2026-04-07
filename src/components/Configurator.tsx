// ============================================
// DreamDesk — Главный компонент конфигуратора
// Client Component: управляет UI каталога + сборки + чата
// ============================================

"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import type { Product, Category } from "@/types";
import { useSetup } from "@/context/SetupContext";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";
import { SetupPanel } from "./SetupPanel";
import { CategoryTabs } from "./CategoryTabs";

interface ConfiguratorProps {
  products: Product[];
  categories: Category[];
}

export function Configurator({ products, categories }: ConfiguratorProps) {
  const { language } = useApp();
  const t = useTranslation(language);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useSetup();

  // Фильтрация товаров по категории и поиску
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Фильтр по категории
    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.categoryId === activeCategory);
    }

    // Фильтр по поисковому запросу
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.connectionType.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="flex h-[calc(100vh-72px)] overflow-hidden">
      {/* ─── ЛЕВАЯ КОЛОНКА: Каталог товаров ─── */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-dark-border">
        {/* Шапка каталога: поиск + табы */}
        <div className="shrink-0 border-b border-dark-border bg-dark-bg">
          <div className="flex items-center gap-4 px-6 py-3">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="search"
                  placeholder={t("search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-dark-border bg-dark-surface py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Табы категорий */}
          <CategoryTabs
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Сетка товаров */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <SlidersHorizontal className="w-10 h-10 text-gray-600 mb-3" />
              <p className="text-gray-400">{t("nothing_found")}</p>
              <p className="text-sm text-gray-600 mt-1">
                {t("try_change_filters")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={() => addItem(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── ПРАВАЯ КОЛОНКА: Сборка + AI ─── */}
      <div className="w-[420px] shrink-0 h-[calc(100vh-72px)] flex flex-col bg-dark-surface overflow-hidden">
        <SetupPanel />
      </div>
    </div>
  );
}

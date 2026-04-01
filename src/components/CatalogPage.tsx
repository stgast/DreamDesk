// ============================================
// DreamDesk — Страница каталога (клиентская часть)
// Полный просмотр товаров с фильтрами и поиском
// ============================================

"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import type { Product, Category } from "@/types";
import { ProductCard } from "./ProductCard";
import { CategoryTabs } from "./CategoryTabs";
import { useSetup } from "@/context/SetupContext";

interface CatalogPageProps {
  products: Product[];
  categories: Category[];
}

export function CatalogPage({ products, categories }: CatalogPageProps) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") ?? "";

  // Найти categoryId по slug из URL
  const initialCatId = categoryFromUrl
    ? categories.find((c) => c.slug === categoryFromUrl)?.id ?? "all"
    : "all";

  const [activeCategory, setActiveCategory] = useState<string>(initialCatId);
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useSetup();

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (activeCategory !== "all") {
      filtered = filtered.filter((p) => p.categoryId === activeCategory);
    }

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
    <div className="p-6 space-y-5">
      {/* Поиск */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="search"
            placeholder="Поиск по названию, бренду, характеристикам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-dark-border bg-dark-surface py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Табы категорий */}
      <CategoryTabs
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Счётчик */}
      <div className="text-sm text-gray-500">
        Найдено: {filteredProducts.length}
      </div>

      {/* Сетка товаров */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-xl bg-dark-card border border-dark-border p-12 text-center">
          <p className="text-gray-400 mb-2">Ничего не найдено</p>
          <p className="text-sm text-gray-600">Попробуйте изменить фильтры</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
  );
}

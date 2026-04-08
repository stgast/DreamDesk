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
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

interface CatalogPageProps {
  products: Product[];
  categories: Category[];
}

export function CatalogPage({ products, categories }: CatalogPageProps) {
  const { language } = useApp();
  const t = useTranslation(language);
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
    <div className="min-h-[calc(100vh-5rem)] bg-surface">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-white/[0.05] to-transparent border-b border-white/[0.1] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black font-headline text-white mb-3 uppercase tracking-tighter">
            {t("catalog")}
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl">
            {t("catalog_description")}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Search Bar */}
        <div className="sticky top-24 z-40 bg-surface/80 backdrop-blur-md rounded-2xl p-6 border border-white/[0.1]">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
              <input
                type="search"
                placeholder={t("search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/[0.15] bg-white/[0.05] backdrop-blur-sm py-3 pl-12 pr-4 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:bg-white/[0.1] transition-all duration-300"
              />
            </div>
            <div className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2.5 rounded-xl border border-primary/20 whitespace-nowrap">
              {t("found_count")}: {filteredProducts.length}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        {/* Products Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="relative rounded-2xl overflow-hidden py-20 px-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-lg border border-white/[0.15]" />
            <div className="relative z-10 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <p className="text-on-surface-variant text-lg mb-2 font-semibold">
                {t("nothing_found")}
              </p>
              <p className="text-on-surface-variant/70 text-sm">
                {t("try_change_filters")}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
  );
}

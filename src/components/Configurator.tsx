// ============================================
// DreamDesk — Главный компонент конфигуратора
// Client Component: управляет UI каталога + сборки + чата
// ============================================

"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Sparkles, ShoppingCart } from "lucide-react";
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
  const { addItem, items, totalPrice } = useSetup();
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Детектор направления скролла для "Умного скрытия" (Вариант 3)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Скрываем если скроллим вниз и пролистали больше 150px
      // Показываем если скроллим вверх
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsSidebarHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsSidebarHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    <div className="relative min-h-[calc(100vh-80px)] bg-dark-bg overflow-x-hidden">
      {/* ─── ЛЕВАЯ КОЛОНКА: Каталог товаров ─── */}
      <div className={`flex flex-col min-w-0 border-r border-dark-border transition-all duration-500 ease-in-out ${
        isSidebarHidden ? "pr-0" : "lg:pr-[420px]"
      }`}>
        {/* Шапка каталога: поиск + табы */}
        <div className="shrink-0 sticky top-[80px] z-20 border-b border-dark-border bg-dark-bg/95 backdrop-blur-sm">
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

            {/* Встроенная кнопка ИИ */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-dreamdesk-ai"))}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest/50 border border-primary/20 text-primary hover:bg-surface-container-highest hover:border-primary/40 transition-all group shrink-0"
            >
              <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold tracking-wide hidden sm:inline">DreamDesk AI</span>
            </button>
          </div>

          {/* Табы категорий */}
          <CategoryTabs
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Сетка товаров */}
        <div className="flex-1 p-6">
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

      {/* ─── ПРАВАЯ КОЛОНКА: Сборка + AI (Overlay) ─── */}
      <div 
        className={`fixed top-[80px] right-0 bottom-0 w-full lg:w-[420px] z-30 flex flex-col bg-dark-surface/90 backdrop-blur-md border-l border-dark-border transition-all duration-500 ease-in-out ${
          isSidebarHidden 
            ? "translate-x-full opacity-0 pointer-events-none" 
            : "translate-x-0 opacity-100"
        }`}
      >
        <SetupPanel />
      </div>

      {/* Плавающая кнопка сборки (появляется когда основная панель скрыта) */}
      <div 
        className={`fixed bottom-6 right-6 z-40 transition-all duration-500 transform ${
          isSidebarHidden && items.length > 0
            ? "translate-y-0 opacity-100" 
            : "translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => {
            window.scrollTo({ top: window.scrollY - 1, behavior: 'smooth' });
            setIsSidebarHidden(false);
          }}
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-accent text-dark-bg font-bold shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-transform"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{items.length} товара — {totalPrice.toLocaleString()} ₽</span>
        </button>
      </div>
    </div>
  );
}

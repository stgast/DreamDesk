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
import { FilterSidebar } from "./FilterSidebar";
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
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const { addItem } = useSetup();

  const toggleFeature = (filter: string) => {
    setActiveFeatures((prev) => 
      prev.includes(filter) 
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleConnection = (conn: string) => {
    setActiveConnections((prev) => 
      prev.includes(conn) 
        ? prev.filter((c) => c !== conn)
        : [...prev, conn]
    );
  };

  const updatePriceRange = (range: [number, number]) => {
    setPriceRange(range);
  };

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

    if (activeFeatures.length > 0) {
      filtered = filtered.filter((p) => {
        return activeFeatures.every(filterVal => {
          if (filterVal.startsWith("brand:")) {
            const brand = filterVal.replace("brand:", "").toLowerCase();
            return p.name.toLowerCase().includes(brand);
          }
          
          if (filterVal.startsWith("bool:")) {
            const [, group, val] = filterVal.split(":");
            const keywordsMap: Record<string, string[]> = {
              filter_curved: ["Изогнутый", "Curved", "1000R", "1800R", "1500R"],
              filter_hdr: ["HDR"],
              filter_height_adj: ["Height", "Регулировка по высоте"],
              filter_hot_swap: ["Hot-Swap", "Хот-свап"],
              filter_wireless: ["Wireless", "Беспроводная", "2.4GHz", "Bluetooth"],
              filter_backlight: ["RGB", "Light", "Подсветка"],
              filter_mute_button: ["Mute", "Отключение"],
              filter_rotate_360: ["360", "поворот"],
              filter_asio: ["ASIO"],
              filter_headphone_amp: ["Amp", "Усилитель", "мониторинг"],
              filter_mic_included: ["Микрофон", "Microphone", "Гарнитура"],
              filter_anc: ["ANC", "Шумоподавление"]
            };
            const keywords = keywordsMap[group] || [];
            const hasFeature = p.features.some(f => keywords.some(k => f.toLowerCase().includes(k.toLowerCase())));
            return val === "yes" ? hasFeature : !hasFeature;
          }

          if (filterVal.startsWith("feat:")) {
            const feat = filterVal.replace("feat:", "");
            return p.features.includes(feat);
          }

          return p.features.includes(filterVal);
        });
      });
    }

    if (activeConnections.length > 0) {
      filtered = filtered.filter((p) => 
        activeConnections.includes(p.connectionType)
      );
    }

    if (priceRange[0] > 0 || priceRange[1] < 1000000) {
      filtered = filtered.filter((p) => {
        return p.price >= priceRange[0] && p.price <= priceRange[1];
      });
    }

    return filtered;
  }, [products, activeCategory, searchQuery, activeFeatures, activeConnections, priceRange]);


  const handleCategoryChange = (catId: string) => {
     setActiveCategory(catId);
     setActiveFeatures([]);
     setActiveConnections([]);
     setPriceRange([0, 1000000]); // Reset to wide range; Sidebar will clamp to data
  };

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

      {/* Content Section (Sidebar + Grid) */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-72 lg:sticky lg:top-24 flex-shrink-0">
             <FilterSidebar 
               categories={categories}
               products={products}
               activeCategoryId={activeCategory}
               onSelectCategory={handleCategoryChange}
               activeFeatures={activeFeatures}
               onToggleFeature={toggleFeature}
               activeConnections={activeConnections}
               onToggleConnection={toggleConnection}
               activePriceRange={priceRange}
               onPriceChange={updatePriceRange}
             />
          </aside>

          {/* Right Content */}
          <div className="flex-1 space-y-6 w-full min-w-0">
            {/* Search Bar */}
            <div className="bg-surface/80 backdrop-blur-md rounded-[1.5rem] p-5 border border-white/[0.05] shadow-lg">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="search"
                    placeholder={t("search_placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent focus:bg-white/[0.05] transition-all duration-300"
                  />
                </div>
                <div className="text-[13px] font-bold text-accent bg-accent/10 px-4 py-3 rounded-xl border border-accent/20 whitespace-nowrap tracking-wide uppercase">
                  {t("found_count")}: {filteredProducts.length}
                </div>
              </div>
            </div>

            {/* Products Grid or Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="relative rounded-3xl overflow-hidden py-24 px-8 border border-white/5 bg-dark-card mt-6">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />
                <div className="relative z-10 text-center max-w-md mx-auto">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-accent/10 flex items-center justify-center mx-auto mb-6 border border-accent/20">
                    <Search className="w-10 h-10 text-accent/80" />
                  </div>
                  <p className="text-white text-xl mb-3 font-bold">
                    {t("nothing_found")}
                  </p>
                  <p className="text-gray-400 text-sm font-medium">
                    {t("try_change_filters")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 mt-6">
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
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Check } from "lucide-react";
import type { Category, Product } from "@/types";
import { useTranslation } from "@/lib/i18n";
import { useApp } from "@/context/AppContext";

interface FilterSidebarProps {
  categories: Category[];
  products: Product[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  // Filters
  activeFeatures: string[];
  onToggleFeature: (feat: string) => void;
  activeConnections: string[];
  onToggleConnection: (conn: string) => void;
  activePriceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export function FilterSidebar({
  categories,
  products,
  activeCategoryId,
  onSelectCategory,
  activeFeatures,
  onToggleFeature,
  activeConnections,
  onToggleConnection,
  activePriceRange,
  onPriceChange,
}: FilterSidebarProps) {
  const { language } = useApp();
  const t = useTranslation(language);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    [activeCategoryId]: true,
  });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getCategoryLabel = (slug: string, fallback: string) => {
    switch (slug) {
      case "monitors": return t("category_monitors");
      case "arms": return t("category_arms");
      case "keyboards": return t("category_keyboards");
      case "mice": return t("category_mice");
      case "microphones": return t("category_microphones");
      case "boom-arms": return t("category_boom_arms");
      case "audio-interfaces": return t("category_audio_interfaces");
      case "headphones": return t("category_headphones");
      default: return fallback;
    }
  };

  // Helper for numeric sorting (extracting digits from "144Hz", "1ms", etc.)
  const extractNumber = (s: string) => {
    const match = s.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  };

  // Organize filters into structured groups per category
  const categoryFilters = useMemo(() => {
    const map: Record<string, {
      connections: string[],
      speed: string[],
      display: string[],
      physical: string[],
      others: string[],
      priceLimit: { min: number, max: number },
      headers: { speed: string, display: string, physical: string, others: string }
    }> = {};

    categories.forEach((cat) => {
      const catProducts = products.filter((p) => p.categoryId === cat.id);
      
      // 1. Price Limits - Fix: Use actual data bounds
      const prices = catProducts.map(p => p.price);
      const minP = prices.length > 0 ? Math.min(...prices) : 0;
      const maxP = prices.length > 0 ? Math.max(...prices) : 100000;

      // 2. Connections
      const connections = Array.from(new Set(catProducts.map(p => p.connectionType))).sort();

      // 3. Categorize Features
      const speedSet = new Set<string>();
      const displaySet = new Set<string>();
      const physSet = new Set<string>();
      const otherSet = new Set<string>();

      // Heuristics
      const speedKeywords = ["Hz", "Гц", "ms", "мс", "DPI", "Refresh", "Response", "Sync", "Reflex", "Latency"];
      const displayKeywords = ["4K", "1440p", "IPS", "OLED", "VA", "TN", "Resolution", "Panel", "Curved", "HDR", "\"", "”", "1000R", "1800R"];
      const physKeywords = ["g", "г", "кг", "kg", "RGB", "Wireless", "Bluetooth", "Ergonomic", "Weight", "Вес", "Симметричная", "Эргономичная"];
      const sizeKeywords = ["До 27", "До 34", "До 32", "До 49"];

      // Category specific naming
      let speedHeader = "Скорость";
      let displayHeader = "Экран и панель";
      let physHeader = "Физические свойства";
      let otherHeader = "Дополнительно";

      if (cat.slug === "monitors") {
          speedHeader = "Частота и отклик";
          displayHeader = "Разрешение и тип матрицы";
      } else if (cat.slug === "keyboards") {
          speedHeader = "Скорость отклика";
      } else if (cat.slug === "arms") {
          physHeader = "Макс. вес";
          displayHeader = "Размер экрана";
      }

      catProducts.forEach((p) => {
        p.features.forEach((f) => {
          const feat = f as string;
          
          // Logic for arms - strip all except weight and size
          if (cat.slug === "arms") {
             if (physKeywords.some(k => feat.toLowerCase().includes(k)) && (feat.includes("кг") || feat.includes("kg"))) {
                 physSet.add(feat);
             } else if (sizeKeywords.some(k => feat.includes(k))) {
                 displaySet.add(feat);
             }
             return; // Discard others for arms
          }

          if (speedKeywords.some(k => feat.includes(k))) speedSet.add(feat);
          else if (displayKeywords.some(k => feat.includes(k))) displaySet.add(feat);
          else if (physKeywords.some(k => feat.includes(k))) physSet.add(feat);
          else otherSet.add(feat);
        });
      });

      map[cat.id] = {
        connections,
        speed: Array.from(speedSet).sort((a, b) => extractNumber(a) - extractNumber(b)),
        display: Array.from(displaySet).sort((a, b) => extractNumber(a) - extractNumber(b)),
        physical: Array.from(physSet).sort((a, b) => extractNumber(a) - extractNumber(b)),
        others: Array.from(otherSet).sort(),
        priceLimit: { min: minP, max: maxP },
        headers: { speed: speedHeader, display: displayHeader, physical: physHeader, others: otherHeader }
      };
    });
    return map;
  }, [categories, products]);

  // Price Range Component
  const PriceSlider = ({ min, max }: { min: number, max: number }) => {
    // Current state values clamped to the range
    const valMin = Math.max(min, activePriceRange[0]);
    const valMax = Math.min(max, activePriceRange[1]);

    const handleChange = (newMin: number, newMax: number) => {
        onPriceChange([newMin, newMax]);
    };

    return (
        <div className="px-3 mb-6">
            <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">Цена</h4>
            <div className="flex gap-2 mb-4">
                <input 
                    type="number" 
                    value={valMin === 0 ? "" : valMin} 
                    onChange={(e) => handleChange(Number(e.target.value), valMax)}
                    placeholder={min.toString()}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-1.5 text-[12px] text-white focus:outline-none focus:border-accent/40"
                />
                <input 
                    type="number" 
                    value={valMax >= 1000000 ? "" : valMax} 
                    onChange={(e) => handleChange(valMin, Number(e.target.value))}
                    placeholder={max.toString()}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-1.5 text-[12px] text-white focus:outline-none focus:border-accent/40"
                />
            </div>
            
            <div className="relative w-full h-1 bg-white/10 rounded-full">
                <div 
                    className="absolute h-full bg-accent rounded-full shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]"
                    style={{
                        left: `${min === max ? 0 : ((valMin - min) / (max - min)) * 100}%`,
                        right: `${min === max ? 0 : 100 - ((valMax - min) / (max - min)) * 100}%`
                    }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={valMin}
                    onChange={(e) => handleChange(Math.min(Number(e.target.value), valMax - 1), valMax)}
                    className="absolute inset-0 w-full h-1 bg-transparent appearance-none pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:shadow-lg"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={valMax}
                    onChange={(e) => handleChange(valMin, Math.max(Number(e.target.value), valMin + 1))}
                    className="absolute inset-0 w-full h-1 bg-transparent appearance-none pointer-events-none cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:shadow-lg"
                />
            </div>
        </div>
    );
  };

  const FilterSection = ({ title, items, activeItems, onToggle }: any) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4">
        <h4 className="px-3 mb-2 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          {title}
        </h4>
        <div className="flex flex-col gap-0.5">
          {items.map((item: any) => {
            const isChecked = activeItems.includes(item);
            return (
              <button
                key={item}
                onClick={() => onToggle(item)}
                className="group flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-all text-left w-full"
              >
                <div className={`flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  isChecked 
                    ? "bg-accent border-accent text-dark-bg shadow-sm shadow-accent/20" 
                    : "border-gray-600 bg-dark-surface group-hover:border-gray-400"
                }`}>
                  {isChecked && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                </div>
                <span className={`text-[12px] font-medium leading-tight ${isChecked ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}>
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => onSelectCategory("all")}
        className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
          activeCategoryId === "all"
            ? "bg-accent/10 border border-accent/20 text-accent font-bold"
            : "bg-dark-surface hover:bg-white/5 border border-white/5 text-gray-300 font-semibold"
        }`}
      >
        <span>{t("all")}</span>
      </button>

      {categories.map((cat) => {
        const isExpanded = expanded[cat.id];
        const isActiveCat = activeCategoryId === cat.id;
        const filters = categoryFilters[cat.id];

        return (
          <div key={cat.id} className="flex flex-col rounded-2xl bg-dark-card border border-dark-border overflow-hidden">
            <div 
              className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all ${
                 isActiveCat ? "bg-accent/5" : "hover:bg-white/5"
              }`}
              onClick={() => {
                toggleExpand(cat.id);
                if (!isExpanded) onSelectCategory(cat.id);
              }}
            >
              <span className={`font-bold text-sm ${isActiveCat ? "text-accent" : "text-white"}`}>
                {getCategoryLabel(cat.slug, cat.name)}
              </span>
              <ChevronDown 
                className={`w-4 h-4 text-gray-400 opacity-60 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
              />
            </div>

            <div 
              className={`transition-all duration-300 ease-in-out origin-top overflow-hidden ${
                isExpanded ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-4">
                <hr className="border-white/5 mb-4 mx-4" />
                
                {filters && <PriceSlider min={filters.priceLimit.min} max={filters.priceLimit.max} />}

                <FilterSection 
                  title="Подключение" 
                  items={filters?.connections} 
                  activeItems={activeConnections} 
                  onToggle={(val: string) => {
                    if (activeCategoryId !== cat.id) onSelectCategory(cat.id);
                    onToggleConnection(val);
                  }} 
                />

                <FilterSection 
                  title={filters?.headers.speed || "Скорость"} 
                  items={filters?.speed} 
                  activeItems={activeFeatures} 
                  onToggle={(val: string) => {
                    if (activeCategoryId !== cat.id) onSelectCategory(cat.id);
                    onToggleFeature(val);
                  }} 
                />

                <FilterSection 
                  title={filters?.headers.display || "Экран"} 
                  items={filters?.display} 
                  activeItems={activeFeatures} 
                  onToggle={(val: string) => {
                    if (activeCategoryId !== cat.id) onSelectCategory(cat.id);
                    onToggleFeature(val);
                  }} 
                />

                <FilterSection 
                  title={filters?.headers.physical || "Физические свойства"} 
                  items={filters?.physical} 
                  activeItems={activeFeatures} 
                  onToggle={(val: string) => {
                    if (activeCategoryId !== cat.id) onSelectCategory(cat.id);
                    onToggleFeature(val);
                  }} 
                />

                <FilterSection 
                  title={filters?.headers.others || "Дополнительно"} 
                  items={filters?.others} 
                  activeItems={activeFeatures} 
                  onToggle={(val: string) => {
                    if (activeCategoryId !== cat.id) onSelectCategory(cat.id);
                    onToggleFeature(val);
                  }} 
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import type { Category, Product } from "@/types";
import { useTranslation, TranslationKey } from "@/lib/i18n";
import { useApp } from "@/context/AppContext";

// ============================================
// Standalone PriceSlider — extracted outside FilterSidebar
// to prevent React from remounting during parent re-renders
// ============================================
function PriceSlider({
  min,
  max,
  value,
  onChange,
}: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (range: [number, number]) => void;
}) {
  const valMin = Math.max(min, value[0]);
  const valMax = Math.min(max, value[1]);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<"min" | "max" | null>(null);
  const valMinRef = useRef(valMin);
  const valMaxRef = useRef(valMax);
  const onChangeRef = useRef(onChange);
  valMinRef.current = valMin;
  valMaxRef.current = valMax;
  onChangeRef.current = onChange;

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(min + percent * (max - min));
    },
    [min, max]
  );

  const getValueFromPositionRef = useRef(getValueFromPosition);
  getValueFromPositionRef.current = getValueFromPosition;

  useEffect(() => {
    const handleMove = (clientX: number) => {
      if (!draggingRef.current) return;
      const val = getValueFromPositionRef.current(clientX);
      if (draggingRef.current === "min") {
        onChangeRef.current([Math.min(val, valMaxRef.current - 1), valMaxRef.current]);
      } else {
        onChangeRef.current([valMinRef.current, Math.max(val, valMinRef.current + 1)]);
      }
    };

    const handleEnd = () => {
      draggingRef.current = null;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", handleEnd);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, []);

  const startDrag = (thumb: "min" | "max") => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    draggingRef.current = thumb;
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  };

  const leftPercent = min === max ? 0 : ((valMin - min) / (max - min)) * 100;
  const rightPercent = min === max ? 0 : 100 - ((valMax - min) / (max - min)) * 100;

  return (
    <div className="px-3 mb-6">
      <h4 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">{t("price")}</h4>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={valMin === 0 ? "" : valMin}
          onChange={(e) => onChange([Number(e.target.value), valMax])}
          placeholder={min.toString()}
          className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-1.5 text-[12px] text-white focus:outline-none focus:border-accent/40"
        />
        <input
          type="number"
          value={valMax >= 1000000 ? "" : valMax}
          onChange={(e) => onChange([valMin, Number(e.target.value)])}
          placeholder={max.toString()}
          className="w-full bg-black/20 border border-white/10 rounded-lg px-2 py-1.5 text-[12px] text-white focus:outline-none focus:border-accent/40"
        />
      </div>

      <div ref={trackRef} className="relative w-full h-6 flex items-center select-none">
        <div className="absolute left-0 right-0 h-1 bg-white/10 rounded-full" />
        <div
          className="absolute h-1 bg-accent rounded-full shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]"
          style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
        />
        <div
          onMouseDown={startDrag("min")}
          onTouchStart={startDrag("min")}
          className="absolute w-5 h-5 rounded-full bg-white border-2 border-accent shadow-lg cursor-grab active:cursor-grabbing active:scale-110 transition-transform z-[3] -translate-x-1/2 hover:shadow-accent/30 hover:shadow-xl"
          style={{ left: `${leftPercent}%` }}
        />
        <div
          onMouseDown={startDrag("max")}
          onTouchStart={startDrag("max")}
          className="absolute w-5 h-5 rounded-full bg-white border-2 border-accent shadow-lg cursor-grab active:cursor-grabbing active:scale-110 transition-transform z-[4] -translate-x-1/2 hover:shadow-accent/30 hover:shadow-xl"
          style={{ left: `${100 - rightPercent}%` }}
        />
      </div>
    </div>
  );
}

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
      groups: { title: string, items: { label: string, value: string }[] }[],
      priceLimit: { min: number, max: number }
    }> = {};

    categories.forEach((cat) => {
      const catProducts = products.filter((p) => p.categoryId === cat.id);
      
      const prices = catProducts.map(p => p.price);
      const minP = prices.length > 0 ? Math.min(...prices) : 0;
      const maxP = prices.length > 0 ? Math.max(...prices) : 100000;

      const brands = Array.from(new Set(catProducts.map(p => p.name.split(" ")[0]))).sort();

      type GroupConfig = { title: string, keys?: string[], isBoolean?: boolean, booleanKeywords?: string[] };
      const config: GroupConfig[] = [];

      if (cat.slug === "monitors") {
        config.push(
          { title: "filter_brand" },
          { title: "filter_diagonal", keys: ["\"", "”", " диагональ"] },
          { title: "filter_resolution_max", keys: ["4K", "1440p", "QHD", "FHD", "2160", "1080", "Resolution"] },
          { title: "filter_refresh_rate_hz", keys: ["Hz", "Гц"] },
          { title: "filter_panel_type", keys: ["IPS", "OLED", "VA", "TN", "QD-OLED"] },
          { title: "filter_curved", isBoolean: true, booleanKeywords: ["Изогнутый", "Curved", "1000R", "1800R", "1500R"] },
          { title: "filter_aspect_ratio", keys: ["21:9", "16:9", "32:9"] },
          { title: "filter_hdr", isBoolean: true, booleanKeywords: ["HDR"] },
          { title: "filter_height_adj", isBoolean: true, booleanKeywords: ["Height", "Регулировка по высоте"] },
          { title: "filter_video_ports", keys: ["HDMI", "DisplayPort", "DP", "USB-C", "Thunderbolt"] }
        );
      } else if (cat.slug === "arms") {
        config.push(
          { title: "filter_brand" },
          { title: "filter_mount_type", keys: ["C-Clamp", "Grommet", "Зажим", "Втулка", "Настольный"] },
          { title: "filter_vesa", keys: ["VESA"] },
          { title: "filter_screen_size_max", keys: ["До ", "Up to "] },
          { title: "filter_load_max", keys: ["кг", "kg", "lbs", "Макс. "] },
          { title: "filter_swivel", keys: ["поворот", "angle", "Swivel", "°"] }
        );
      } else if (cat.slug === "keyboards") {
        config.push(
          { title: "filter_brand" },
          { title: "filter_connection", keys: ["Bluetooth", "Wireless", "Wired", "2.4GHz", "Bolt", "USB-C"] },
          { title: "filter_kb_type", keys: ["Mechanical", "Membrane", "Magnetic", "Механическая", "Мембранная", "Магнитная"] },
          { title: "filter_hot_swap", isBoolean: true, booleanKeywords: ["Hot-Swap", "Хот-свап"] },
          { title: "filter_color", keys: ["White", "Black", "Silver", "Gray", "Белый", "Черный", "Серый"] },
          { title: "filter_switches" as TranslationKey, keys: ["Switch", "Gateron", "Cherry", "Brown", "Red", "Blue", "Yellow", "Speed"] }
        );
      } else if (cat.slug === "mice") {
        config.push(
          { title: "filter_brand" },
          { title: "filter_wireless", isBoolean: true, booleanKeywords: ["Wireless", "Беспроводная", "2.4GHz", "Bluetooth"] },
          { title: "filter_wireless_type", keys: ["Bluetooth", "Logi Bolt", "HyperSpeed", "LIGHTSPEED", "Radio"] },
          { title: "filter_grip", keys: ["Claw", "Palm", "Fingertip", "Хват"] },
          { title: "filter_color", keys: ["White", "Black", "Pink", "Blue", "Red", "Белый", "Черный"] },
          { title: "filter_buttons_count", keys: ["кнопок", "buttons"] },
          { title: "filter_mouse_shape", keys: ["Symmetric", "Ergonomic", "Симметричная", "Эргономичная"] },
          { title: "filter_dpi_max", keys: ["DPI", "CPI"] }
        );
      } else if (cat.slug === "microphones") {
        config.push(
          { title: "filter_brand" },
          { title: "filter_mic_type", keys: ["Dynamic", "Condenser", "Динамический", "Конденсаторный"] },
          { title: "filter_mic_interface", keys: ["USB", "XLR", "3.5mm"] },
          { title: "filter_ports", keys: ["XLR", "Jack", "Monitoring"] },
          { title: "filter_polar_pattern", keys: ["Cardioid", "Omni", "Bi", "Pattern", "Направленность"] },
          { title: "filter_backlight", isBoolean: true, booleanKeywords: ["RGB", "Light", "Подсветка"] },
          { title: "filter_mute_button", isBoolean: true, booleanKeywords: ["Mute", "Отключение"] },
          { title: "filter_color", keys: ["White", "Black", "Silver", "Белый", "Черный"] }
        );
      } else if (cat.slug === "boom-arms") {
        config.push(
          { title: "filter_brand" },
          { title: "filter_color", keys: ["White", "Black", "Silver", "Белый", "Черный"] },
          { title: "filter_payload", keys: ["кг", "kg", "lbs", " нагрузка"] },
          { title: "filter_height_max", keys: ["max height", "макс. высота"] },
          { title: "filter_height_min", keys: ["min height", "мин. высота"] },
          { title: "filter_rotate_360", isBoolean: true, booleanKeywords: ["360", "поворот"] }
        );
      } else if (cat.slug === "audio-interfaces") {
        config.push(
          { title: "filter_brand" },
          { title: "filter_connection", keys: ["USB", "Thunderbolt", "Firewire"] },
          { title: "filter_asio", isBoolean: true, booleanKeywords: ["ASIO"] },
          { title: "filter_audio_format", keys: ["2.0", "5.1", "7.1"] },
          { title: "filter_dac_bitrate", keys: ["bit", "бит"] },
          { title: "filter_dac_freq", keys: ["kHz", "кГц"] },
          { title: "filter_headphone_amp", isBoolean: true, booleanKeywords: ["Amp", "Усилитель", "мониторинг"] },
          { title: "filter_os_support", keys: ["Win", "Mac", "iOS", "Android", "OS"] }
        );
      } else if (cat.slug === "headphones") {
        config.push(
          { title: "filter_brand" },
          { title: "filter_headphones_design", keys: ["Open", "Closed", "Закрытые", "Открытые", "In-ear", "Over-ear"] },
          { title: "filter_headphones_type", keys: ["Studio", "Gaming", "Consumer", "Студийные", "Игровые"] },
          { title: "filter_mic_included", isBoolean: true, booleanKeywords: ["Микрофон", "Microphone", "Гарнитура"] },
          { title: "filter_anc", isBoolean: true, booleanKeywords: ["ANC", "Шумоподавление"] },
          { title: "filter_port_connection", keys: ["3.5mm", "6.3mm", "USB", "Bluetooth", "Wireless"] }
        );
      }

      const finalGroups: { title: string, items: { label: string, value: string }[] }[] = [];

      config.forEach(group => {
          const itemsMap = new Map<string, string>();
          
          if (group.title === "filter_brand") {
              brands.forEach(b => itemsMap.set(b, `brand:${b}`));
          } else if (group.isBoolean) {
              const hasYes = catProducts.some(p => p.features.some(f => group.booleanKeywords?.some(k => f.toLowerCase().includes(k.toLowerCase()))));
              if (hasYes) {
                itemsMap.set(t("yes"), `bool:${group.title}:yes`);
                itemsMap.set(t("no"), `bool:${group.title}:no`);
              }
          } else {
              catProducts.forEach(p => {
                  p.features.forEach(f => {
                      if (group.keys?.some(k => f.toLowerCase().includes(k.toLowerCase()))) {
                          itemsMap.set(f, `feat:${f}`);
                      }
                  });
              });
          }

          if (itemsMap.size > 0) {
              const sortedItems = Array.from(itemsMap.entries())
                  .sort(([a], [b]) => {
                      if (a === t("yes")) return -1;
                      if (b === t("yes")) return 1;
                      return extractNumber(a) - extractNumber(b);
                  })
                  .map(([label, value]) => ({ label, value }));

              finalGroups.push({
                  title: t(group.title as TranslationKey),
                  items: sortedItems
              });
          }
      });

      map[cat.id] = {
        groups: finalGroups,
        priceLimit: { min: minP, max: maxP }
      };
    });
    return map;
  }, [categories, products, language, t]);


  const FilterSection = ({ title, items, activeItems, onToggle }: any) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4">
        <h4 className="px-3 mb-2 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          {title}
        </h4>
        <div className="flex flex-col gap-0.5">
          {items.map((item: any) => {
            const isChecked = activeItems.includes(item.value);
            return (
              <button
                key={item.value}
                onClick={() => onToggle(item.value)}
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
                  {item.label}
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
                
                {filters && <PriceSlider min={filters.priceLimit.min} max={filters.priceLimit.max} value={activePriceRange} onChange={onPriceChange} />}

                {filters?.groups.map((group, idx) => {
                  const isConnection = group.title === t("filter_connection");
                  return (
                    <FilterSection 
                      key={idx}
                      title={group.title} 
                      items={group.items} 
                      activeItems={isConnection ? activeConnections : activeFeatures} 
                      onToggle={(val: string) => {
                        if (activeCategoryId !== cat.id) onSelectCategory(cat.id);
                        if (isConnection) onToggleConnection(val);
                        else onToggleFeature(val);
                      }} 
                    />
                  );
                })}
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}

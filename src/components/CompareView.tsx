// ============================================
// Сравнение мышей: карточки, поиск, фильтры, формы (вид сверху / сбоку)
// ============================================

"use client";

import { useMemo, useState, useEffect } from "react";
import {
  X,
  GitCompare,
  Search,
  Sparkles,
} from "lucide-react";
import type { Product } from "@/types";
import {
  COMPARE_MOUSE_COLORS,
  mouseTopGeometry,
  mouseSidePathD,
} from "@/lib/mouseShapeSvg";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/currency";
import { useTranslation } from "@/lib/i18n";
import { WhereToBuy } from "./WhereToBuy";
import { MouseShapeCompare } from "./MouseShapeCompare";

const COMPARE_KEY = "dreamdesk-compare-ids";
const MAX = 4;
const MICE_SLUG = "mice";

function loadIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    const arr = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(arr) ? arr.slice(0, MAX) : [];
  } catch {
    return [];
  }
}

function saveIds(ids: string[]) {
  localStorage.setItem(COMPARE_KEY, JSON.stringify(ids.slice(0, MAX)));
}

function hasShape(p: Product): boolean {
  return (
    p.category?.slug === MICE_SLUG &&
    p.lengthMm != null &&
    p.widthMm != null &&
    p.heightMm != null &&
    p.humpPercent != null
  );
}

function formatWeightG(w: number | null): string {
  if (w == null) return "—";
  if (w < 2000) return `${Math.round(w)} г`;
  return `${(w / 1000).toFixed(2)} кг`;
}

type ConnFilter = "all" | string;
type SortKey = "name" | "weight" | "length";

interface CompareViewProps {
  products: Product[];
}

export function CompareView({ products }: CompareViewProps) {
  const { currency, language } = useApp();
  const t = useTranslation(language);
  const mice = useMemo(
    () => products.filter((p) => p.category?.slug === MICE_SLUG && hasShape(p)),
    [products]
  );

  const [ids, setIdsState] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");
  const [conn, setConn] = useState<ConnFilter>("all");
  const [sort, setSort] = useState<SortKey>("name");

  useEffect(() => {
    setIdsState(loadIds());
    setMounted(true);
  }, []);

  const setIds = (next: string[]) => {
    saveIds(next);
    setIdsState(next);
  };

  const byId = useMemo(() => {
    const m = new Map<string, Product>();
    mice.forEach((p) => m.set(p.id, p));
    return m;
  }, [mice]);

  const compared = useMemo(
    () => ids.map((id) => byId.get(id)).filter(Boolean) as Product[],
    [ids, byId]
  );

  const maxL = useMemo(
    () => Math.max(1, ...compared.map((p) => p.lengthMm ?? 1)),
    [compared]
  );
  const maxW = useMemo(
    () => Math.max(1, ...compared.map((p) => p.widthMm ?? 1)),
    [compared]
  );
  const maxH = useMemo(
    () => Math.max(1, ...compared.map((p) => p.heightMm ?? 1)),
    [compared]
  );

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggle = (id: string) => {
    if (ids.includes(id)) {
      setIds(ids.filter((x) => x !== id));
      return;
    }
    if (ids.length >= MAX) return;
    setIds([...ids, id]);
  };

  const remove = (id: string) => setIds(ids.filter((x) => x !== id));

  if (!mounted) {
    return (
      <div className="p-6 max-w-[1920px] mx-auto">
        <div className="h-40 rounded-2xl bg-dark-card border border-dark-border animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-[1920px] mx-auto space-y-8 pb-24 pt-10">
      {/* Поиск */}
      <div className="sticky top-[80px] z-20 bg-dark-bg/95 backdrop-blur-sm py-6 -mx-4 px-4 overflow-visible">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("compare_search_placeholder")}
                className="w-full rounded-xl border border-dark-border bg-dark-surface py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-accent focus:outline-none"
              />
              {q.trim() && (
                <div className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-2xl border border-dark-border bg-dark-card shadow-xl">
                  {mice.filter(m => m.name.toLowerCase().includes(q.toLowerCase())).slice(0, 8).map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => { toggle(product.id); setQ(""); }}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-smooth hover:bg-white/5"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">{product.name}</p>
                        <p className="text-xs text-gray-500 truncate">{product.category?.name}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {ids.includes(product.id) ? t("added_to_compare") : t("add_to_compare")}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-dreamdesk-ai"))}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-highest/50 border border-primary/20 text-primary hover:bg-surface-container-highest hover:border-primary/40 transition-all group shrink-0"
            >
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold tracking-wide hidden sm:inline">DreamDesk AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Сравнение */}
      {compared.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-xl font-heading font-bold text-white mt-4 px-2">
            {t("compare_shapes")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
            {/* Карточки выбранных (слева) */}
            <div className="flex flex-col gap-3">
              {compared.map((p, i) => {
                const col = COMPARE_MOUSE_COLORS[i % COMPARE_MOUSE_COLORS.length];
                return (
                  <div
                    key={p.id}
                    onMouseEnter={() => setHoveredId(p.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`rounded-lg border border-white/5 p-3 flex flex-col gap-2 transition-all duration-300 ${hoveredId === p.id
                      ? "bg-dark-card border-white/20 shadow-lg shadow-black/40 scale-[1.02]"
                      : "bg-dark-card/30 hover:bg-dark-card/50"
                      }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-4 h-4 rounded-full shrink-0"
                          style={{ backgroundColor: col }}
                        />
                        <span className="text-sm font-bold text-white truncate">
                          {p.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(p.id)}
                        className="p-1 rounded-md text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-col text-[11px] text-gray-500 font-medium">
                      <span>{p.lengthMm} × {p.widthMm} × {p.heightMm} мм</span>
                      <span className="text-gray-400">{formatWeightG(p.weight)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Область силуэтов */}
            <div className="flex-1 flex items-center justify-center min-h-[500px]">
              <MouseShapeCompare 
                compared={compared} 
                hoveredId={hoveredId}
                maxL={maxL}
              />
            </div>
          </div>

          <WhereToBuy products={compared} />
        </section>
      )}

      {mice.length === 0 && (
        <div className="rounded-2xl border border-dashed border-dark-border p-12 text-center text-gray-500">
          {t("no_mice_for_comparison")} <code className="text-accent">npm run db:seed</code>.
        </div>
      )}
    </div>
  );
}

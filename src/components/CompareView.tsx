// ============================================
// Сравнение мышей: карточки, поиск, фильтры, формы (вид сверху / сбоку)
// ============================================

"use client";

import { useMemo, useState, useEffect } from "react";
import {
  X,
  GitCompare,
  Search,
  DollarSign,
  MoreVertical,
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

  const connections = useMemo(() => {
    const s = new Set<string>();
    mice.forEach((p) => s.add(p.connectionType));
    return Array.from(s).sort();
  }, [mice]);

  const filteredCards = useMemo(() => {
    let list = mice;
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }
    return list;
  }, [mice, q]);

  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    return filteredCards.slice(0, 6);
  }, [filteredCards, q]);

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
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 pb-24">
      {/* Поиск */}
      <div className="mx-auto w-full max-w-3xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск по названию и описанию..."
            className="w-full rounded-xl border border-dark-border bg-dark-surface py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-accent focus:outline-none"
          />
          {q.trim() && (
            <div className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-2xl border border-dark-border bg-dark-card shadow-xl">
                {suggestions.length > 0 ? (
                  suggestions.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => toggle(product.id)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-smooth hover:bg-white/5"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">{product.name}</p>
                        <p className="text-xs text-gray-500 truncate">{product.category?.name}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {ids.includes(product.id) ? "Убрано" : "В сравнение"}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    Ничего не найдено.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      {/* Сравнение: карточки слева + силуэты */}
      {compared.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-heading font-bold text-white">
            Сравнение форм
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr_1fr] gap-4 items-start">
            {/* Карточки выбранных */}
            <div className="flex flex-col gap-3 order-2 xl:order-1">
              {compared.map((p, i) => {
                const col = COMPARE_MOUSE_COLORS[i % COMPARE_MOUSE_COLORS.length];
                return (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-white/10 bg-dark-card p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-black shrink-0"
                          style={{ backgroundColor: col }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm font-semibold text-white leading-tight line-clamp-2">
                          {p.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span title="Цена" className="p-1 text-gray-500">
                          <DollarSign className="w-4 h-4" />
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(p.id)}
                          className="p-1 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10"
                          aria-label="Убрать"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <span className="p-1 text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      {p.lengthMm} × {p.widthMm} × {p.heightMm} мм
                    </p>
                    <p className="text-xs text-gray-300">
                      Вес: {formatWeightG(p.weight)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Вид сверху */}
            <div className="order-1 xl:order-2 rounded-2xl border border-dark-border bg-black overflow-hidden min-h-[260px] flex flex-col">
              <div className="px-4 py-2 border-b border-white/5 text-xs text-gray-500 uppercase tracking-wider">
                Вид сверху
              </div>
              <div className="flex-1 flex items-center justify-center p-4 min-h-[220px]">
                <svg
                  viewBox="0 0 200 100"
                  className="w-full max-w-md h-auto"
                  aria-hidden
                >
                  {compared.map((p, i) => {
                    const col = COMPARE_MOUSE_COLORS[i % COMPARE_MOUSE_COLORS.length];
                    const L = p.lengthMm ?? 1;
                    const W = p.widthMm ?? 1;
                    const hp = p.humpPercent ?? 53;
                    const g = mouseTopGeometry(L, W, maxL, maxW, hp);
                    return (
                      <g key={p.id}>
                        <ellipse
                          cx={g.cx}
                          cy={g.cy}
                          rx={g.rx}
                          ry={g.ry}
                          fill="none"
                          stroke={col}
                          strokeWidth={2}
                          opacity={0.95}
                        />
                        <circle
                          cx={g.sensorX}
                          cy={g.sensorY}
                          r={2.5}
                          fill={col}
                          opacity={0.9}
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Вид сбоку */}
            <div className="order-3 rounded-2xl border border-dark-border bg-black overflow-hidden min-h-[260px] flex flex-col">
              <div className="px-4 py-2 border-b border-white/5 text-xs text-gray-500 uppercase tracking-wider">
                Вид сбоку
              </div>
              <div className="flex-1 flex items-center justify-center p-4 min-h-[220px]">
                <svg
                  viewBox="0 0 200 100"
                  className="w-full max-w-md h-auto"
                  aria-hidden
                >
                  {compared.map((p, i) => {
                    const col = COMPARE_MOUSE_COLORS[i % COMPARE_MOUSE_COLORS.length];
                    const d = mouseSidePathD(
                      p.lengthMm ?? 1,
                      p.heightMm ?? 1,
                      p.humpPercent ?? 53,
                      maxH
                    );
                    return (
                      <path
                        key={p.id}
                        d={d}
                        fill={col}
                        fillOpacity={0.12}
                        stroke={col}
                        strokeWidth={1.75}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Таблица характеристик */}
          <div className="overflow-x-auto rounded-2xl border border-dark-border">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-dark-surface border-b border-dark-border">
                  <th className="text-left p-3 text-gray-500 font-medium w-36">
                    Параметр
                  </th>
                  {compared.map((p, i) => (
                    <th key={p.id} className="p-3 text-left">
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                        style={{
                          backgroundColor:
                            COMPARE_MOUSE_COLORS[i % COMPARE_MOUSE_COLORS.length],
                        }}
                      />
                      <span className="text-white font-medium">{p.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dark-border/80">
                  <td className="p-3 text-gray-500">{t("price")}</td>
                  {compared.map((p) => (
                    <td key={p.id} className="p-3 text-lime font-semibold">
                      {formatPrice(p.price, currency)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-dark-border/80">
                  <td className="p-3 text-gray-500">{t("length_width_height")}</td>
                  {compared.map((p) => (
                    <td key={p.id} className="p-3 text-gray-200">
                      {p.lengthMm} × {p.widthMm} × {p.heightMm} мм
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-dark-border/80">
                  <td className="p-3 text-gray-500">{t("weight")}</td>
                  {compared.map((p) => (
                    <td key={p.id} className="p-3 text-gray-200">
                      {formatWeightG(p.weight)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-dark-border/80">
                  <td className="p-3 text-gray-500">Подключение</td>
                  {compared.map((p) => (
                    <td key={p.id} className="p-3 text-gray-200">
                      {p.connectionType}
                    </td>
                  ))}
                </tr>
                {Array.from({
                  length: Math.max(0, ...compared.map((p) => p.features.length)),
                }).map((_, fi) => (
                  <tr key={fi} className="border-b border-dark-border/40">
                    <td className="p-3 text-gray-500">Характеристика {fi + 1}</td>
                    {compared.map((p) => (
                      <td key={p.id} className="p-3 text-gray-300 text-xs">
                        {p.features[fi] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white">Где купить</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {compared.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/search?q=${encodeURIComponent(
                        `${p.name} купить`
                      )}`,
                      "_blank"
                    )
                  }
                  className="rounded-xl border border-dark-border bg-dark-card px-4 py-4 text-left text-sm text-white transition hover:border-accent/50 hover:bg-accent/5"
                >
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500 mt-1">Найти где купить</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {mice.length === 0 && (
        <div className="rounded-2xl border border-dashed border-dark-border p-12 text-center text-gray-500">
          В базе нет мышей с габаритами для сравнения форм. Запустите{" "}
          <code className="text-accent">npm run db:seed</code>.
        </div>
      )}
    </div>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import { Mouse, Keyboard, Headphones, Square } from "lucide-react";
import type { Device } from "@/types";

const PADDING = 8;
const DESK_INNER_W = 400;
const DESK_INNER_H = 200;

export interface DeskItem {
  device: Device;
  x: number;
  y: number;
  id: string;
}

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  mouse: Mouse,
  keyboard: Keyboard,
  headphones: Headphones,
  mousepad: Square,
};

const typeSizes: Record<string, { w: number; h: number }> = {
  mouse: { w: 60, h: 40 },
  keyboard: { w: 120, h: 40 },
  headphones: { w: 50, h: 50 },
  mousepad: { w: 100, h: 50 },
};

export function VirtualDesk({
  items,
  onItemsChange,
  view = "top",
}: {
  items: DeskItem[];
  onItemsChange: (items: DeskItem[]) => void;
  view?: "top" | "angle";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleStart = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.preventDefault();
      const item = items.find((i) => i.id === id);
      if (!item || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const localX = e.clientX - rect.left - PADDING;
      const localY = e.clientY - rect.top - PADDING;
      setDragging(id);
      setOffset({ x: localX - item.x, y: localY - item.y });
    },
    [items]
  );

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const localX = e.clientX - rect.left - PADDING;
      const localY = e.clientY - rect.top - PADDING;
      const newX = Math.max(0, Math.min(DESK_INNER_W, localX - offset.x));
      const newY = Math.max(0, Math.min(DESK_INNER_H, localY - offset.y));
      onItemsChange(
        items.map((i) =>
          i.id === dragging ? { ...i, x: newX, y: newY } : i
        )
      );
    },
    [dragging, offset, items, onItemsChange]
  );

  const handleEnd = useCallback(() => setDragging(null), []);

  const removeItem = useCallback(
    (id: string) => {
      onItemsChange(items.filter((i) => i.id !== id));
    },
    [items, onItemsChange]
  );

  const deskWidth = 420;
  const deskHeight = 220;

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl border-2 border-dark-border bg-dark-surface overflow-hidden select-none"
      style={{ width: deskWidth, height: deskHeight }}
      onMouseMove={handleMove}
      onMouseLeave={handleEnd}
      onMouseUp={handleEnd}
    >
      {/* Стол */}
      <div
        className="absolute inset-2 rounded-xl bg-dark-card border border-dark-border"
        style={{
          transform: view === "angle" ? "skewX(-5deg) scale(0.95)" : undefined,
          transformOrigin: "center",
        }}
      />
      {/* Сетка */}
      {/* Удалена сетка с линиями, создающая нежелательные полосы */}

      {items.map((item) => {
        const Icon = typeIcons[item.device.type] ?? Square;
        const size = typeSizes[item.device.type] ?? { w: 50, h: 40 };
        return (
          <div
            key={item.id}
            className="absolute cursor-grab active:cursor-grabbing rounded-lg bg-accent/20 border border-accent/50 flex items-center justify-center group"
            style={{
              left: PADDING + item.x,
              top: PADDING + item.y,
              width: size.w,
              height: size.h,
            }}
            onMouseDown={(e) => handleStart(item.id, e)}
          >
            <Icon className="w-6 h-6 text-accent" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeItem(item.id);
              }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500/80 text-white text-xs opacity-0 group-hover:opacity-100 transition"
              aria-label="Удалить"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useCallback } from "react";
import { Mouse, Keyboard, Headphones, Square } from "lucide-react";
import type { Device } from "@/types";

export type SlotId = "keyboard" | "mouse" | "headphones" | "mousepad";

export interface SlotState {
  slotId: SlotId;
  device: Device | null;
}

const SLOT_LABELS: Record<SlotId, string> = {
  keyboard: "Клавиатура",
  mouse: "Мышь",
  headphones: "Наушники",
  mousepad: "Коврик",
};

const SLOT_ICONS: Record<SlotId, React.ComponentType<{ className?: string }>> = {
  keyboard: Keyboard,
  mouse: Mouse,
  headphones: Headphones,
  mousepad: Square,
};

interface SlotDef {
  id: SlotId;
  gridCol: string;
  gridRow: string;
  w: string;
  h: string;
  className?: string;
}

function getSlotLayout(leftHanded: boolean): SlotDef[] {
  const mouseCol = leftHanded ? "1" : "3";
  const mouseJustify = leftHanded ? "justify-self-end" : "justify-self-start";
  return [
    { id: "headphones", gridCol: "1", gridRow: "1", w: "w-24", h: "h-12" },
    { id: "keyboard", gridCol: "1 / -1", gridRow: "2", w: "w-64", h: "h-14", className: "justify-self-center" },
    { id: "mouse", gridCol: mouseCol, gridRow: "2", w: "w-20", h: "h-12", className: mouseJustify },
    { id: "mousepad", gridCol: "1 / -1", gridRow: "3", w: "w-full", h: "h-16" },
  ];
}

export function DeskWithSlots({
  slots,
  onSlotClick,
  view = "top",
  leftHanded,
}: {
  slots: SlotState[];
  onSlotClick: (slotId: SlotId) => void;
  view?: "top" | "angle";
  leftHanded: boolean;
}) {
  const layout = getSlotLayout(leftHanded);

  return (
    <div
      className="relative rounded-2xl border-2 border-dark-border bg-dark-surface overflow-hidden"
      style={{
        width: "min(90vw, 800px)",
        height: "min(60vh, 450px)",
      }}
    >
      <div
        className="absolute inset-3 rounded-xl bg-dark-card border border-dark-border"
        style={{
          transform: view === "angle" ? "skewX(-4deg) scale(0.97)" : undefined,
          transformOrigin: "center",
        }}
      />
      {/* Сетка удалена, чтобы избежать нежелательных линий/полос */}
      {/* <div
        className="absolute inset-3 rounded-xl opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#2d2d2d 1px, transparent 1px), linear-gradient(90deg, #2d2d2d 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      /> */}

      <div
        className="absolute inset-4 grid gap-3 pointer-events-none"
        style={{
          gridTemplateColumns: "1fr 2fr 1fr",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        {layout.map((def) => {
          const state = slots.find((s) => s.slotId === def.id);
          const Icon = SLOT_ICONS[def.id];
          const filled = !!state?.device;

          return (
            <button
              key={def.id}
              type="button"
              onClick={() => onSlotClick(def.id)}
              className={`
                pointer-events-auto flex flex-col items-center justify-center rounded-xl border-2 border-dashed
                transition hover:border-accent/60 hover:bg-accent/10
                ${filled ? "border-accent/50 bg-accent/10" : "border-white/20 bg-white/5"}
                ${def.w} ${def.h} ${def.className ?? ""}
              `}
              style={{
                gridColumn: def.gridCol,
                gridRow: def.gridRow,
              }}
            >
              {filled ? (
                <>
                  <Icon className="w-6 h-6 text-accent mb-0.5" />
                  <span className="text-xs text-white truncate max-w-full px-1">
                    {state!.device!.name}
                  </span>
                </>
              ) : (
                <>
                  <Icon className="w-6 h-6 text-gray-500 mb-0.5" />
                  <span className="text-xs text-gray-500">
                    {SLOT_LABELS[def.id]}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { Mouse, Keyboard, Headphones, Square, X } from "lucide-react";
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

const SLOT_COLORS: Record<SlotId, { text: string; border: string; bg: string }> = {
  mouse: { text: "text-category-mouse", border: "border-category-mouse/40", bg: "bg-category-mouse/10" },
  keyboard: { text: "text-category-keyboard", border: "border-category-keyboard/40", bg: "bg-category-keyboard/10" },
  headphones: { text: "text-category-headphones", border: "border-category-headphones/40", bg: "bg-category-headphones/10" },
  mousepad: { text: "text-category-mousepad", border: "border-category-mousepad/40", bg: "bg-category-mousepad/10" },
};

interface SlotDef {
  id: SlotId;
  gridCol: string;
  gridRow: string;
  zIndex: number;
}

function getSlotLayout(leftHanded: boolean): SlotDef[] {
  return [
    { id: "mousepad", gridCol: "1 / -1", gridRow: "3", zIndex: 1 },
    { id: "keyboard", gridCol: "2", gridRow: "2", zIndex: 2 },
    { id: "mouse", gridCol: leftHanded ? "1" : "3", gridRow: "2", zIndex: 3 },
    { id: "headphones", gridCol: leftHanded ? "3" : "1", gridRow: "1", zIndex: 4 },
  ];
}

export function DeskWithSlots({
  slots,
  onSlotClick,
  onRemoveDevice,
  view = "top",
  leftHanded,
}: {
  slots: SlotState[];
  onSlotClick: (slotId: SlotId) => void;
  onRemoveDevice?: (slotId: SlotId) => void;
  view?: "top" | "angle";
  leftHanded: boolean;
}) {
  const layout = getSlotLayout(leftHanded);

  return (
    <div
      className="relative rounded-2xl border border-dark-border bg-dark-surface overflow-hidden select-none"
      style={{
        width: "min(90vw, 800px)",
        height: "min(55vh, 420px)",
      }}
    >
      {/* Desk surface */}
      <div
        className="absolute inset-3 rounded-xl bg-dark-card border border-dark-border"
        style={{
          transform: view === "angle" ? "perspective(800px) rotateX(8deg) scale(0.96)" : undefined,
          transformOrigin: "center bottom",
          transition: "transform 0.4s ease",
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-3 rounded-xl opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Slots grid */}
      <div
        className="absolute inset-6 grid gap-4"
        style={{
          gridTemplateColumns: "1fr 2.5fr 1fr",
          gridTemplateRows: "auto 1fr auto",
          transform: view === "angle" ? "perspective(800px) rotateX(8deg) scale(0.96)" : undefined,
          transformOrigin: "center bottom",
          transition: "transform 0.4s ease",
        }}
      >
        {layout.map((def) => {
          const state = slots.find((s) => s.slotId === def.id);
          const Icon = SLOT_ICONS[def.id];
          const colors = SLOT_COLORS[def.id];
          const filled = !!state?.device;

          return (
            <button
              key={def.id}
              type="button"
              onClick={() => onSlotClick(def.id)}
              className={`
                relative group flex flex-col items-center justify-center rounded-xl border-2 border-dashed
                transition-all duration-200 hover:scale-[1.02] min-h-[60px]
                ${
                  filled
                    ? `${colors.border} ${colors.bg} border-solid`
                    : "border-gray-600/30 bg-white/[0.02] hover:border-gray-500/50 hover:bg-white/[0.04]"
                }
              `}
              style={{
                gridColumn: def.gridCol,
                gridRow: def.gridRow,
                zIndex: def.zIndex,
              }}
            >
              {filled ? (
                <>
                  <Icon className={`w-6 h-6 ${colors.text} mb-1`} />
                  <span className="text-xs text-white font-medium truncate max-w-full px-2">
                    {state!.device!.name}
                  </span>
                  <span className="text-[10px] text-gray-500 mt-0.5">
                    {state!.device!.price.toLocaleString("ru-RU")} ₽
                  </span>
                  {onRemoveDevice && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveDevice(def.id);
                      }}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </>
              ) : (
                <>
                  <Icon className="w-6 h-6 text-gray-600 mb-1" />
                  <span className="text-xs text-gray-600 font-medium">
                    {SLOT_LABELS[def.id]}
                  </span>
                  <span className="text-[10px] text-gray-700 mt-0.5">
                    Нажми, чтобы выбрать
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

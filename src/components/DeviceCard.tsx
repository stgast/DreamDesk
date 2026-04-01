"use client";

import { Plus, Mouse, Keyboard, Headphones, Square } from "lucide-react";
import type { Device } from "@/types";

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  mouse: Mouse,
  keyboard: Keyboard,
  headphones: Headphones,
  mousepad: Square,
};

const typeLabels: Record<string, string> = {
  mouse: "Мышь",
  keyboard: "Клавиатура",
  headphones: "Наушники",
  mousepad: "Коврик",
};

const typeCatClass: Record<string, string> = {
  mouse: "cat-mouse",
  keyboard: "cat-keyboard",
  headphones: "cat-headphones",
  mousepad: "cat-mousepad",
};

export function DeviceCard({
  device,
  showAddToSetup = false,
  onAdd,
  onClick,
  className = "",
}: {
  device: Device;
  showAddToSetup?: boolean;
  onAdd?: () => void;
  onClick?: () => void;
  className?: string;
}) {
  const Icon = typeIcons[device.type] ?? Square;
  const catColor = typeCatClass[device.type] ?? "text-gray-400";

  return (
    <div
      className={`${className} group rounded-xl border border-dark-border bg-dark-card p-4 hover:border-dark-hover hover:shadow-card-hover transition-all duration-200 cursor-pointer`}
      onClick={onClick}
    >
      {/* Header: type badge + add button */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[11px] font-semibold uppercase tracking-wider ${catColor}`}>
          {typeLabels[device.type] ?? device.type}
        </span>
        {showAddToSetup && onAdd && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="p-1.5 rounded-lg text-gray-500 hover:text-accent hover:bg-accent/10 transition opacity-0 group-hover:opacity-100"
            title="Добавить в сетап"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Image */}
      <div className="h-28 flex items-center justify-center rounded-lg bg-dark-surface mb-3 overflow-hidden">
        {device.imageUrl ? (
          <img
            src={device.imageUrl}
            alt={device.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <Icon className="w-12 h-12 text-gray-600" />
        )}
      </div>

      {/* Info */}
      <h3 className="font-medium text-white text-sm truncate leading-tight">
        {device.name}
      </h3>
      <p className="text-xs text-gray-500 mt-0.5">{device.brand}</p>

      {/* Specs row */}
      {device.description && (
        <p className="text-[11px] text-gray-500 mt-2 line-clamp-1">
          {device.description}
        </p>
      )}

      {/* Price */}
      <p className="text-sm font-semibold text-lime mt-2">
        {device.price.toLocaleString("ru-RU")} ₽
      </p>
    </div>
  );
}

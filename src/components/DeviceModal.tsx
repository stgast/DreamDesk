"use client";

import { useState } from "react";
import { X, Plus, Mouse, Keyboard, Headphones, Square, ExternalLink } from "lucide-react";
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

export function DeviceModal({
  device,
  onClose,
  onAddToSetup,
}: {
  device: Device;
  onClose: () => void;
  onAddToSetup?: () => void;
}) {
  const [tab, setTab] = useState<"specs" | "buy">("specs");
  const Icon = typeIcons[device.type] ?? Square;
  const catColor = typeCatClass[device.type] ?? "text-gray-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-2xl bg-dark-surface border border-dark-border w-full max-w-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-48 bg-dark-card flex items-center justify-center">
          {device.imageUrl ? (
            <img
              src={device.imageUrl}
              alt={device.name}
              className="w-full h-full object-contain p-6"
            />
          ) : (
            <Icon className="w-20 h-20 text-gray-600" />
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-lg bg-dark-bg/60 text-gray-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
          <span
            className={`absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-dark-bg/60 ${catColor}`}
          >
            {typeLabels[device.type]}
          </span>
        </div>

        {/* Info */}
        <div className="p-5">
          <h2 className="font-heading text-xl font-bold text-white">
            {device.name}
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">{device.brand}</p>
          <p className="text-lg font-bold text-lime mt-2">
            {device.price.toLocaleString("ru-RU")} ₽
          </p>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 bg-dark-bg rounded-lg p-1">
            <button
              type="button"
              onClick={() => setTab("specs")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                tab === "specs"
                  ? "bg-dark-card text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Характеристики
            </button>
            <button
              type="button"
              onClick={() => setTab("buy")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                tab === "buy"
                  ? "bg-dark-card text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Где купить
            </button>
          </div>

          {/* Tab content */}
          <div className="mt-4">
            {tab === "specs" ? (
              <div className="space-y-2">
                <SpecRow label="Тип" value={typeLabels[device.type] ?? device.type} />
                <SpecRow label="Бренд" value={device.brand} />
                <SpecRow label="Цвет" value={device.color === "black" ? "Чёрный" : "Белый"} />
                <SpecRow label="Цена" value={`${device.price.toLocaleString("ru-RU")} ₽`} highlight />
                {device.description && (
                  <SpecRow label="Описание" value={device.description} />
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {["DNS", "Ozon", "Wildberries"].map((shop) => (
                  <div
                    key={shop}
                    className="flex items-center justify-between rounded-lg bg-dark-card border border-dark-border p-3"
                  >
                    <span className="text-sm text-white">{shop}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <ExternalLink className="w-3 h-3" />
                      Ссылка
                    </span>
                  </div>
                ))}
                <p className="text-xs text-gray-600 mt-2">
                  * Ссылки на магазины — демонстрация
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          {onAddToSetup && (
            <button
              type="button"
              onClick={onAddToSetup}
              className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-white font-medium hover:bg-accent-hover transition"
            >
              <Plus className="w-4 h-4" />
              Добавить в сетап
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SpecRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-dark-border last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={`text-sm font-medium ${highlight ? "text-lime" : "text-white"}`}
      >
        {value}
      </span>
    </div>
  );
}

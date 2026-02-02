"use client";

import Link from "next/link";
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

export function DeviceCard({
  device,
  showAddToSetup = false,
  flat = false,
  onClick,
  className = "",
}: {
  device: Device;
  showAddToSetup?: boolean;
  flat?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const Icon = typeIcons[device.type] ?? Square;

  return (
    <div
      className={`${className} rounded-2xl border border-dark-border p-4 hover:border-accent/40 transition group ${flat ? "bg-dark-surface" : "bg-dark-card hover:shadow-glow"}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {typeLabels[device.type] ?? device.type}
        </span>
        {showAddToSetup && (
          <Link
            href={`/build?add=${device.id}`}
            className="p-1.5 rounded-xl text-gray-400 hover:text-accent hover:bg-accent/10 transition opacity-0 group-hover:opacity-100"
            title="Добавить в сетап"
          >
            <Plus className="w-5 h-5" />
          </Link>
        )}
      </div>
      <div className="h-24 flex items-center justify-center rounded-xl bg-dark-surface border border-dark-border mb-3 overflow-hidden">
        {device.imageUrl ? (
          <img
            src={device.imageUrl}
            alt=""
            className="w-full h-full object-contain"
          />
        ) : (
          <Icon className="w-12 h-12 text-gray-600" />
        )}
      </div>
      <h3 className="font-semibold text-white truncate">{device.name}</h3>
      <p className="text-sm text-gray-400">{device.brand}</p>
      <p className="text-sm font-medium text-accent mt-1">
        {device.price.toLocaleString("ru-RU")} ₽
      </p>
    </div>
  );
}

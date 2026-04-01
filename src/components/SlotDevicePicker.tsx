"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { DeviceCard } from "./DeviceCard";
import type { Device } from "@/types";
import type { SlotId } from "./DeskWithSlots";

const SLOT_LABELS: Record<string, string> = {
  keyboard: "клавиатуру",
  mouse: "мышь",
  headphones: "наушники",
  mousepad: "коврик",
};

export function SlotDevicePicker({
  open,
  slotId,
  onSelect,
  onClose,
}: {
  open: boolean;
  slotId: SlotId | null;
  onSelect: (device: Device) => void;
  onClose: () => void;
}) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!open || !slotId) return;
    setSearchQuery("");
    setLoading(true);
    fetch("/api/devices")
      .then((r) => r.json())
      .then((all: Device[]) => all.filter((d) => d.type === slotId))
      .then(setDevices)
      .finally(() => setLoading(false));
  }, [open, slotId]);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return devices;
    const q = searchQuery.toLowerCase();
    return devices.filter(
      (d) =>
        d.name.toLowerCase().includes(q) || d.brand.toLowerCase().includes(q)
    );
  }, [devices, searchQuery]);

  if (!open || !slotId) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-2xl bg-dark-surface border border-dark-border w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-border">
          <div>
            <h2 className="font-heading text-lg font-semibold text-white">
              Выбери {SLOT_LABELS[slotId] ?? "устройство"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {filtered.length} устройств доступно
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-dark-hover transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="search"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-dark-border bg-dark-bg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Device grid */}
        <div className="overflow-y-auto px-5 pb-5 flex-1 min-h-0">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton rounded-xl h-48" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-gray-500 py-8 text-center">
              Ничего не найдено
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filtered.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onClick={() => onSelect(device)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

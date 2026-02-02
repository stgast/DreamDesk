"use client";

import { useEffect, useState, useMemo } from "react";
import { DeviceCard } from "./DeviceCard";
import type { Device } from "@/types";
import type { SlotId } from "./DeskWithSlots";

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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!open || !slotId) return;
    setSearchQuery("");
    fetch("/api/devices")
      .then((r) => r.json())
      .then((all: Device[]) => all.filter((d) => d.type === slotId))
      .then(setDevices);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-2xl bg-dark-surface border border-dark-border p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-white mb-3">
          Выбери устройство для слота
        </h2>
        <input
          type="search"
          placeholder="Поиск в списке..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-dark-border bg-dark-bg py-2 px-4 text-white placeholder-gray-500 focus:border-accent focus:outline-none mb-4"
        />
        <div className="overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1 min-h-0">
          {filtered.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              flat
              onClick={() => {
                onSelect(device);
                onClose();
              }}
              className="cursor-pointer text-left rounded-xl border border-dark-border hover:border-accent/50 transition p-3 bg-transparent"
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 py-2">Ничего не найдено</p>
        )}
        <button
          type="button"
          onClick={onClose}
          className="mt-4 rounded-xl border border-dark-border py-2 text-gray-400 hover:text-white transition"
        >
          Отмена
        </button>
      </div>
    </div>
  );
}

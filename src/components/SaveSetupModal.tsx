"use client";

import { useState } from "react";
import { saveConfig } from "@/lib/storage";
import type { SlotState } from "./DeskWithSlots";

export function SaveSetupModal({
  open,
  onClose,
  slots,
}: {
  open: boolean;
  onClose: () => void;
  slots: SlotState[];
}) {
  const [name, setName] = useState("Мой сетап");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const filled = slots.filter((s) => s.device).length;

  if (!open) return null;

  const handleSave = () => {
    if (filled === 0) return;
    setSaving(true);
    try {
      saveConfig({
        name,
        deviceIds: slots.filter((s) => s.device).map((s) => s.device!.id),
        layout: slots
          .filter((s) => s.device)
          .map((s) => ({
            id: `${s.slotId}-${s.device!.id}`,
            deviceId: s.device!.id,
            slotId: s.slotId,
          })),
      });
      setDone(true);
      setTimeout(() => {
        onClose();
        setDone(false);
        setName("Мой сетап");
      }, 1200);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-2xl bg-dark-surface border border-dark-border p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-white mb-4">
          Сохранить конфигурацию
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название"
          className="w-full rounded-xl border border-dark-border bg-dark-card px-4 py-2.5 text-white placeholder-gray-500 focus:border-accent focus:outline-none mb-4"
        />
        <p className="text-sm text-gray-400 mb-4">
          Заполнено слотов: {filled} из 4
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-dark-border py-2.5 text-gray-400 hover:text-white transition"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || filled === 0}
            className="flex-1 rounded-xl bg-accent py-2.5 text-white font-medium hover:bg-accent-hover disabled:opacity-50 transition"
          >
            {done ? "Сохранено" : saving ? "Сохранение…" : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Check, Save, X } from "lucide-react";
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

  const filled = slots.filter((s) => s.device);
  const totalPrice = filled.reduce((sum, s) => sum + (s.device?.price ?? 0), 0);

  if (!open) return null;

  const handleSave = () => {
    if (filled.length === 0) return;
    setSaving(true);
    try {
      saveConfig({
        name,
        deviceIds: filled.map((s) => s.device!.id),
        layout: filled.map((s) => ({
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="rounded-2xl bg-dark-surface border border-dark-border p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {done ? (
          <div className="flex flex-col items-center py-6">
            <div className="w-12 h-12 rounded-full bg-lime/15 flex items-center justify-center mb-3">
              <Check className="w-6 h-6 text-lime" />
            </div>
            <p className="font-heading font-semibold text-white">Сохранено!</p>
            <p className="text-sm text-gray-500 mt-1">
              Конфигурация доступна в профиле
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading text-lg font-semibold text-white">
                Сохранить конфигурацию
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-dark-hover transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Название конфигурации"
              className="w-full rounded-lg border border-dark-border bg-dark-card px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none mb-4"
              autoFocus
            />

            <div className="rounded-lg bg-dark-card border border-dark-border p-3 mb-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Заполнено слотов</span>
                <span className="text-white font-medium">
                  {filled.length} из 4
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Общая стоимость</span>
                <span className="text-lime font-semibold">
                  {totalPrice.toLocaleString("ru-RU")} ₽
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-dark-border py-2.5 text-sm text-gray-400 hover:text-white transition"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || filled.length === 0}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm text-white font-medium hover:bg-accent-hover disabled:opacity-40 transition"
              >
                <Save className="w-4 h-4" />
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

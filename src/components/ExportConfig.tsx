"use client";

import { useState } from "react";
import type { SlotState } from "./DeskWithSlots";

export function ExportConfig({
  slots,
  deskRef,
  className,
}: {
  slots: SlotState[];
  deskRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const filled = slots.filter((s) => s.device).length;

  const exportTxt = () => {
    setMenuOpen(false);
    if (filled === 0) return;
    const lines = [
      "Конфигурация рабочего места",
      "Экспорт: " + new Date().toLocaleString("ru-RU"),
      "",
      "Периферия:",
      ...slots
        .filter((s) => s.device)
        .map(
          (s) =>
            `  • ${s.slotId}: ${s.device!.name} (${s.device!.brand}) — ${s.device!.price.toLocaleString("ru-RU")} ₽`
        ),
    ];
    const blob = new Blob([lines.join("\r\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `desk-setup-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportImage = () => {
    setMenuOpen(false);
    const el = deskRef?.current;
    if (filled === 0 || !el) return;
    import("html2canvas").then(({ default: html2canvas }) => {
      html2canvas(el, {
        backgroundColor: "#1a1a1a",
        scale: 2,
        useCORS: true,
      }).then((canvas) => {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `desk-setup-${Date.now()}.png`;
        a.click();
      });
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        disabled={filled === 0}
        className={`${className ?? ""} ${filled === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Экспорт конфигурации
      </button>
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />
          <div className="absolute top-full right-0 mt-2 z-20 rounded-xl bg-dark-surface border border-dark-border py-1 shadow-xl min-w-[160px]">
            <button
              type="button"
              onClick={exportTxt}
              className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-dark-hover transition"
            >
              Скачать как TXT
            </button>
            <button
              type="button"
              onClick={exportImage}
              className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-dark-hover transition"
            >
              Скачать как картинку
            </button>
          </div>
        </>
      )}
    </div>
  );
}

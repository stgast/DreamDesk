"use client";

import { Suspense, useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Mouse,
  Keyboard,
  Headphones,
  Square,
  Sparkles,
  Save,
  Download,
  FileText,
  Image,
  RotateCcw,
  Hand,
  Eye,
} from "lucide-react";
import { DeskWithSlots, type SlotId, type SlotState } from "@/components/DeskWithSlots";
import { SlotDevicePicker } from "@/components/SlotDevicePicker";
import { AIChatSidebar } from "@/components/AIChatSidebar";
import { SaveSetupModal } from "@/components/SaveSetupModal";
import type { Device } from "@/types";

const INITIAL_SLOTS: SlotState[] = [
  { slotId: "mousepad", device: null },
  { slotId: "keyboard", device: null },
  { slotId: "mouse", device: null },
  { slotId: "headphones", device: null },
];

function BuildContent() {
  const searchParams = useSearchParams();
  const addId = searchParams.get("add");
  const deskRef = useRef<HTMLDivElement>(null);

  const [slots, setSlots] = useState<SlotState[]>(INITIAL_SLOTS);
  const [pickerSlot, setPickerSlot] = useState<SlotId | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [view, setView] = useState<"top" | "angle">("top");
  const [leftHanded, setLeftHanded] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  // Auto-add device from URL param
  useEffect(() => {
    if (!addId) return;
    fetch(`/api/devices`)
      .then((r) => r.json())
      .then((all: Device[]) => {
        const device = all.find((d) => d.id === addId);
        if (device) {
          setSlots((prev) =>
            prev.map((s) =>
              s.slotId === device.type ? { ...s, device } : s
            )
          );
        }
      });
  }, [addId]);

  const handleSlotClick = useCallback((slotId: SlotId) => {
    setPickerSlot(slotId);
  }, []);

  const handleDeviceSelect = useCallback(
    (device: Device) => {
      if (!pickerSlot) return;
      setSlots((prev) =>
        prev.map((s) =>
          s.slotId === pickerSlot ? { ...s, device } : s
        )
      );
      setPickerSlot(null);
    },
    [pickerSlot]
  );

  const handleRemoveDevice = useCallback((slotId: SlotId) => {
    setSlots((prev) =>
      prev.map((s) => (s.slotId === slotId ? { ...s, device: null } : s))
    );
  }, []);

  const resetAll = useCallback(() => {
    setSlots(INITIAL_SLOTS);
  }, []);

  const filledSlots = slots.filter((s) => s.device);
  const totalPrice = filledSlots.reduce(
    (sum, s) => sum + (s.device?.price ?? 0),
    0
  );

  const exportTxt = () => {
    setExportOpen(false);
    if (filledSlots.length === 0) return;
    const lines = [
      "DreamDesk — Конфигурация рабочего места",
      "Дата: " + new Date().toLocaleString("ru-RU"),
      "",
      "Устройства:",
      ...filledSlots.map(
        (s) =>
          `  - ${s.slotId}: ${s.device!.name} (${s.device!.brand}) — ${s.device!.price.toLocaleString("ru-RU")} ₽`
      ),
      "",
      `Итого: ${totalPrice.toLocaleString("ru-RU")} ₽`,
    ];
    const blob = new Blob([lines.join("\r\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dreamdesk-setup-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportImage = () => {
    setExportOpen(false);
    const el = deskRef.current;
    if (!el || filledSlots.length === 0) return;
    import("html2canvas").then(({ default: html2canvas }) => {
      html2canvas(el, {
        backgroundColor: "#0a0a0a",
        scale: 2,
        useCORS: true,
      }).then((canvas) => {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `dreamdesk-setup-${Date.now()}.png`;
        a.click();
      });
    });
  };

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Left panel: Desk visualization */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-dark-border bg-dark-bg">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setView(view === "top" ? "angle" : "top")}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                view === "angle"
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-dark-border text-gray-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {view === "top" ? "Вид сверху" : "Перспектива"}
            </button>
            <button
              type="button"
              onClick={() => setLeftHanded((v) => !v)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                leftHanded
                  ? "border-accent/30 bg-accent/10 text-accent"
                  : "border-dark-border text-gray-400 hover:text-white"
              }`}
            >
              <Hand className="w-3.5 h-3.5" />
              {leftHanded ? "Левша" : "Правша"}
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="flex items-center gap-1.5 rounded-lg border border-dark-border px-3 py-1.5 text-xs text-gray-400 hover:text-white transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Сбросить
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Export dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setExportOpen((v) => !v)}
                disabled={filledSlots.length === 0}
                className="flex items-center gap-1.5 rounded-lg border border-dark-border px-3 py-1.5 text-xs text-gray-400 hover:text-white transition disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" />
                Экспорт
              </button>
              {exportOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setExportOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-1 z-20 rounded-lg bg-dark-surface border border-dark-border py-1 shadow-xl min-w-[150px]">
                    <button
                      type="button"
                      onClick={exportTxt}
                      className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm text-gray-300 hover:bg-dark-hover transition"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      TXT файл
                    </button>
                    <button
                      type="button"
                      onClick={exportImage}
                      className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm text-gray-300 hover:bg-dark-hover transition"
                    >
                      <Image className="w-3.5 h-3.5" />
                      Скриншот PNG
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSaveOpen(true)}
              disabled={filledSlots.length === 0}
              className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs text-white font-medium hover:bg-accent-hover transition disabled:opacity-40"
            >
              <Save className="w-3.5 h-3.5" />
              Сохранить
            </button>
          </div>
        </div>

        {/* Desk area */}
        <div className="flex-1 flex items-center justify-center p-6 overflow-auto" ref={deskRef}>
          <DeskWithSlots
            slots={slots}
            onSlotClick={handleSlotClick}
            onRemoveDevice={handleRemoveDevice}
            view={view}
            leftHanded={leftHanded}
          />
        </div>

        {/* Cost bar */}
        {filledSlots.length > 0 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-dark-border bg-dark-surface">
            <div className="flex items-center gap-4">
              {filledSlots.map((s) => (
                <div key={s.slotId} className="flex items-center gap-1.5">
                  <SlotIcon type={s.slotId} className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-300 truncate max-w-[120px]">
                    {s.device!.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">Итого: </span>
              <span className="text-sm font-bold text-lime">
                {totalPrice.toLocaleString("ru-RU")} ₽
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Right panel: AI Sidebar toggle */}
      <div className="w-12 border-l border-dark-border bg-dark-surface flex flex-col items-center pt-4 gap-3">
        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          className={`p-2.5 rounded-lg transition ${
            chatOpen
              ? "bg-accent/15 text-accent"
              : "text-gray-500 hover:text-white hover:bg-dark-hover"
          }`}
          title="AI помощник"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      {/* Modals & Sidebars */}
      <SlotDevicePicker
        open={!!pickerSlot}
        slotId={pickerSlot}
        onSelect={handleDeviceSelect}
        onClose={() => setPickerSlot(null)}
      />
      <AIChatSidebar open={chatOpen} onClose={() => setChatOpen(false)} />
      <SaveSetupModal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        slots={slots}
      />
    </div>
  );
}

function SlotIcon({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  switch (type) {
    case "mouse":
      return <Mouse className={className} />;
    case "keyboard":
      return <Keyboard className={className} />;
    case "headphones":
      return <Headphones className={className} />;
    case "mousepad":
      return <Square className={className} />;
    default:
      return <Square className={className} />;
  }
}

export default function BuildPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-96">
          <div className="skeleton w-96 h-64 rounded-xl" />
        </div>
      }
    >
      <BuildContent />
    </Suspense>
  );
}

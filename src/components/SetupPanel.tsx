// ============================================
// DreamDesk — Панель текущей сборки (правая колонка)
// Показывает выбранные товары, итоговую цену, предупреждения
// ============================================

"use client";

import { Trash2, AlertTriangle, CheckCircle2, RotateCcw, ShoppingCart, Save } from "lucide-react";
import { useSetup } from "@/context/SetupContext";
import { useMemo, useState, useEffect } from "react";
import { saveConfigToStorage } from "@/lib/saved-configs";
import { useSession } from "next-auth/react";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/currency";
import { useTranslation } from "@/lib/i18n";

export function SetupPanel() {
  const { items, removeItem, clearSetup, totalPrice } = useSetup();
  const { data: session } = useSession();
  const { currency, language } = useApp();
  const t = useTranslation(language);
  const [saveOpen, setSaveOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [saveName, setSaveName] = useState("Моя сборка");

  const closeSaveModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSaveOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && saveOpen && !isClosing) {
      closeSaveModal();
    }
  };

  useEffect(() => {
    if (saveOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [saveOpen, isClosing]);

  const handleSaveToProfile = async () => {
    const name = saveName.trim() || "Моя сборка";

    if (session?.user) {
      // Сохранить в базу
      try {
        const res = await fetch("/api/setups", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            items: items.map((i) => ({
              id: i.product.id,
              name: i.product.name,
              category: i.product.category?.name ?? "—",
              categorySlug: i.product.category?.slug ?? "",
              price: i.product.price,
              imageUrl: i.product.imageUrl,
              description: i.product.description,
              features: i.product.features,
              connectionType: i.product.connectionType,
            })),
            totalPrice,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          // Dispatch custom event for real-time sync with profile
          window.dispatchEvent(new CustomEvent("dreamdesk-setup-saved", { 
            detail: { setup: data.setup } 
          }));
          closeSaveModal();
          setSaveName("Моя сборка");
        }
      } catch {
        // fallback to localStorage
        saveToLocal();
      }
    } else {
      saveToLocal();
    }

    function saveToLocal() {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `cfg-${Date.now()}`;
      saveConfigToStorage({
        id,
        name,
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          category: i.product.category?.name ?? "—",
          categorySlug: i.product.category?.slug ?? "",
          price: i.product.price,
          imageUrl: i.product.imageUrl,
          description: i.product.description,
          features: i.product.features,
          connectionType: i.product.connectionType,
        })),
        totalPrice,
        savedAt: new Date().toISOString(),
      });
      // Note: We don't dispatch event for local storage for now as it doesn't trigger API refresh
      closeSaveModal();
      setSaveName("Моя сборка");
    }
  };

  // Проверка совместимости — генерируем предупреждения
  const warnings = useMemo(() => {
    const result: string[] = [];

    // 1. XLR-микрофон без звуковой карты
    const hasXLRMic = items.some(
      (i) =>
        i.product.category?.slug === "microphones" &&
        i.product.connectionType === "XLR"
    );
    const hasAudioInterface = items.some(
      (i) => i.product.category?.slug === "audio-interfaces"
    );
    if (hasXLRMic && !hasAudioInterface) {
      result.push(t("xlr_mic_warning"));
    }

    // 2. Тяжёлый монитор без кронштейна или со слабым кронштейном
    const monitor = items.find((i) => i.product.category?.slug === "monitors");
    const arm = items.find((i) => i.product.category?.slug === "arms");
    if (monitor && monitor.product.weight && monitor.product.weight > 6000 && !arm) {
      result.push(
        t("monitor_arm_warning", {
          name: monitor.product.name,
          weight: (monitor.product.weight / 1000).toFixed(1)
        })
      );
    }

    // 3. Звуковая карта без XLR-микрофона (не критично, но информативно)
    if (hasAudioInterface && !hasXLRMic) {
      // не предупреждение, а подсказка — не добавляем
    }

    return result;
  }, [items]);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Заголовок */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border shrink-0">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-accent" />
          <h2 className="font-heading text-sm font-semibold text-white">
            {t("current_setup")}
          </h2>
          {items.length > 0 && (
            <span className="text-[10px] bg-accent/15 text-accent rounded-full px-2 py-0.5">
              {items.length}
            </span>
          )}
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearSetup}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition"
          >
            <RotateCcw className="w-3 h-3" />
            {t("clear")}
          </button>
        )}
      </div>

      {/* Список товаров в сборке */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-sm text-gray-400">{t("empty_build")}</p>
            <p className="text-xs text-gray-600 mt-1">
              {t("empty_setup_help")}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.addedAt}
                className="flex items-start gap-3 rounded-lg bg-dark-card border border-dark-border p-3 group"
              >
                {/* Картинка */}
                <div className="w-12 h-12 rounded-md bg-dark-surface flex items-center justify-center overflow-hidden shrink-0">
                  {item.product.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-dark-border rounded" />
                  )}
                </div>

                {/* Инфо */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    {item.product.category?.name}
                  </p>
                  <p className="text-xs text-white font-medium truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-lime font-semibold mt-0.5">
                    {formatPrice(item.product.price, currency)}
                  </p>
                </div>

                {/* Удалить */}
                <button
                  type="button"
                  onClick={() => removeItem(item.addedAt)}
                  className="p-1.5 rounded-md text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Предупреждения о совместимости */}
        {warnings.length > 0 && (
          <div className="mt-4 space-y-2">
            {warnings.map((w, i) => (
              <div
                key={i}
                className="flex gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200 leading-relaxed">{w}</p>
              </div>
            ))}
          </div>
        )}

        {/* Всё совместимо */}
        {items.length >= 2 && warnings.length === 0 && (
          <div className="mt-4 flex gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-200">
              {t("compatibility_ok")}
            </p>
          </div>
        )}
      </div>

      {/* Итого + сохранить в профиль */}
      {items.length > 0 && (
        <div className="shrink-0 px-4 py-3 border-t border-dark-border bg-dark-bg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{t("total")}:</span>
            <span className="text-lg font-bold text-lime font-heading">
              {formatPrice(totalPrice, currency)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSaveOpen(true)}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent/15 border border-accent/30 text-accent py-2.5 text-sm font-medium transition-button hover:bg-accent/25 hover:shadow-lg hover:shadow-accent/20 active:scale-95"
          >
            <Save className="w-4 h-4" />
            {t("save_to_profile")}
          </button>
        </div>
      )}

      {saveOpen && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}>
          <div className={`w-full max-w-sm rounded-xl border border-dark-border bg-dark-card p-5 shadow-xl ${isClosing ? "animate-scaleOut" : "animate-scaleIn"}`}>
            <h3 className="text-white font-semibold mb-2">{t("save_setup_title")}</h3>
            <p className="text-xs text-gray-500 mb-3">
              {t("save_setup_desc")}
            </p>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder={t("name_placeholder")}
              className="w-full rounded-lg border border-dark-border bg-dark-surface px-3 py-2 text-sm text-white mb-4 focus:border-accent focus:outline-none"
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={closeSaveModal}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-smooth"
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                onClick={handleSaveToProfile}
                className="px-4 py-2 rounded-lg bg-accent text-dark-bg text-sm font-semibold transition-button hover:opacity-90 hover:shadow-lg hover:shadow-accent/30 active:scale-95"
              >
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

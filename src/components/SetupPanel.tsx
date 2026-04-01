// ============================================
// DreamDesk — Панель текущей сборки (правая колонка)
// Показывает выбранные товары, итоговую цену, предупреждения
// ============================================

"use client";

import { Trash2, AlertTriangle, CheckCircle2, RotateCcw, ShoppingCart } from "lucide-react";
import { useSetup } from "@/context/SetupContext";
import { useMemo } from "react";

export function SetupPanel() {
  const { items, removeItem, clearSetup, totalPrice } = useSetup();

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
      result.push(
        "XLR-микрофон не будет работать без аудиоинтерфейса (звуковой карты). Добавьте устройство из категории «Звуковые карты»."
      );
    }

    // 2. Тяжёлый монитор без кронштейна или со слабым кронштейном
    const monitor = items.find((i) => i.product.category?.slug === "monitors");
    const arm = items.find((i) => i.product.category?.slug === "arms");
    if (monitor && monitor.product.weight && monitor.product.weight > 6000 && !arm) {
      result.push(
        `Монитор ${monitor.product.name} весит ${(monitor.product.weight / 1000).toFixed(1)} кг — рекомендуем добавить надёжный кронштейн.`
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
            Текущая сборка
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
            Очистить
          </button>
        )}
      </div>

      {/* Список товаров в сборке */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-sm text-gray-400">Сборка пуста</p>
            <p className="text-xs text-gray-600 mt-1">
              Добавляйте товары из каталога слева
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.product.categoryId}
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
                    {item.product.price.toLocaleString("ru-RU")} ₽
                  </p>
                </div>

                {/* Удалить */}
                <button
                  type="button"
                  onClick={() => removeItem(item.product.categoryId)}
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
              Проблем совместимости не обнаружено
            </p>
          </div>
        )}
      </div>

      {/* Итого */}
      {items.length > 0 && (
        <div className="shrink-0 px-4 py-3 border-t border-dark-border bg-dark-bg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Итого:</span>
            <span className="text-lg font-bold text-lime font-heading">
              {totalPrice.toLocaleString("ru-RU")} ₽
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

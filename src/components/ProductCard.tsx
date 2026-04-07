// ============================================
// DreamDesk — Карточка товара в каталоге
// Показывает название, цену, характеристики, кнопку добавления
// ============================================

"use client";

import { Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import type { Product } from "@/types";
import { useSetup } from "@/context/SetupContext";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/currency";
import { useTranslation } from "@/lib/i18n";

// Цвета категорий (по slug)
const CATEGORY_COLORS: Record<string, string> = {
  monitors: "text-blue-400",
  arms: "text-orange-400",
  keyboards: "text-purple-400",
  mice: "text-cyan-400",
  microphones: "text-red-400",
  "boom-arms": "text-amber-400",
  "audio-interfaces": "text-emerald-400",
  headphones: "text-pink-400",
};

interface ProductCardProps {
  product: Product;
  onAdd: () => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const { hasCategory } = useSetup();
  const { currency, language } = useApp();
  const t = useTranslation(language);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCategoryLabel = (slug: string, fallback: string) => {
    switch (slug) {
      case "monitors":
        return t("category_monitors");
      case "arms":
        return t("category_arms");
      case "keyboards":
        return t("category_keyboards");
      case "mice":
        return t("category_mice");
      case "microphones":
        return t("category_microphones");
      case "boom-arms":
        return t("category_boom_arms");
      case "audio-interfaces":
        return t("category_audio_interfaces");
      case "headphones":
        return t("category_headphones");
      default:
        return fallback;
    }
  };
  const [isClosing, setIsClosing] = useState(false);
  const isInSetup = hasCategory(product.categoryId);
  const catSlug = product.category?.slug ?? "";
  const catColor = CATEGORY_COLORS[catSlug] ?? "text-gray-400";
  const detailImages = product.imageUrl
    ? [product.imageUrl, product.imageUrl, product.imageUrl]
    : [];

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isModalOpen && !isClosing) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isModalOpen, isClosing]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsModalOpen(true);
          }
        }}
        className="group rounded-lg border border-dark-border bg-dark-card p-4 hover:border-dark-hover hover:shadow-card-hover transition-smooth hover:scale-[1.01] cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        {/* Заголовок: категория + тип подключения */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[11px] font-semibold uppercase tracking-wider ${catColor}`}>
            {product.category ? getCategoryLabel(product.category.slug, product.category.name) : t("product")}
          </span>
          <span className="text-[10px] text-gray-600 bg-dark-surface rounded px-1.5 py-0.5">
            {product.connectionType}
          </span>
        </div>

      {/* Изображение */}
      <div className="h-32 flex items-center justify-center rounded-lg bg-dark-surface mb-3 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-dark-border" />
        )}
      </div>

      {/* Название и описание */}
      <h3 className="font-medium text-white text-sm leading-tight">
        {product.name}
      </h3>
      {product.description && (
        <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      )}

      {/* Характеристики (features) — как теги */}
      {product.features.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {(product.features as string[]).slice(0, 4).map((feat, i) => (
            <span
              key={i}
              className="text-[10px] text-gray-400 bg-dark-surface rounded px-1.5 py-0.5"
            >
              {feat}
            </span>
          ))}
          {product.features.length > 4 && (
            <span className="text-[10px] text-gray-600">
              +{product.features.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Цена + кнопка добавления */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-border">
        <span className="text-sm font-bold text-lime">
          {formatPrice(product.price, currency)}
        </span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onAdd();
          }}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-button active:scale-95 ${
            isInSetup
              ? "bg-lime/15 text-lime hover:bg-lime/25"
              : "bg-accent/10 text-accent hover:bg-accent/20"
          }`}
        >
          {isInSetup ? (
            <>
              <Check className="w-3.5 h-3.5" />
              {t("replace")}
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              {t("add_to_setup")}
            </>
          )}
        </button>
      </div>
    </div>
      {isModalOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}>
          <div className={`w-full max-w-3xl overflow-hidden rounded-3xl border border-dark-border bg-dark-card shadow-2xl ${isClosing ? "animate-scaleOut" : "animate-scaleIn"}`}>
            <div className="flex items-center justify-between border-b border-dark-border px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{product.name}</h2>
                <p className="text-[11px] text-gray-500">
                  {product.category ? getCategoryLabel(product.category.slug, product.category.name) : t("product")}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-smooth hover:scale-110"
              >
                ✕
              </button>
            </div>
            <div className="grid gap-6 p-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {detailImages.length > 0 ? (
                    detailImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`${product.name} ${index + 1}`}
                        className="h-32 w-full rounded-2xl border border-dark-border object-contain bg-black"
                      />
                    ))
                  ) : (
                    <div className="col-span-3 flex h-32 items-center justify-center rounded-2xl border border-dark-border bg-dark-surface text-sm text-gray-500">
                      {t("no_image")}
                    </div>
                  )}
                </div>
                <div className="space-y-3 rounded-2xl border border-dark-border bg-dark-surface p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-gray-500">{t("price")}</span>
                    <span className="text-sm font-semibold text-lime">{formatPrice(product.price, currency)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500">{t("connection")}</div>
                    <div className="text-sm text-white">{product.connectionType}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500">{t("dimensions")}</div>
                    <div className="text-sm text-white">
                      {product.lengthMm ?? "—"} × {product.widthMm ?? "—"} × {product.heightMm ?? "—"} мм
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500">{t("weight")}</div>
                    <div className="text-sm text-white">{product.weight != null ? `${product.weight} г` : "—"}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">{t("description_label")}</h3>
                  <p className="mt-2 text-sm text-gray-300">{product.description ?? t("no_description")}</p>
                </div>
                {product.features.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white">{t("key_features")}</h3>
                    <div className="mt-3 grid gap-2">
                      {product.features.map((feature, index) => (
                        <div key={index} className="rounded-2xl border border-dark-border bg-black/40 px-3 py-2 text-sm text-gray-200">
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    onAdd();
                  }}
                  className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-dark-bg transition-button hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 active:scale-95"
                >
                  {t("add_to_setup")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

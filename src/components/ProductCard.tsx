// ============================================
// DreamDesk — Карточка товара в каталоге
// Показывает название, цену, характеристики, кнопку добавления
// ============================================

"use client";

import { Plus, Check, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
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
  const [isClosing, setIsClosing] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const getCategoryLabel = (slug: string, fallback: string) => {
    switch (slug) {
      case "monitors": return t("category_monitors");
      case "arms": return t("category_arms");
      case "keyboards": return t("category_keyboards");
      case "mice": return t("category_mice");
      case "microphones": return t("category_microphones");
      case "boom-arms": return t("category_boom_arms");
      case "audio-interfaces": return t("category_audio_interfaces");
      case "headphones": return t("category_headphones");
      default: return fallback;
    }
  };

  const isInSetup = hasCategory(product.categoryId);

  const badgeLabel = useMemo(() => {
    if (product.price > 120000 || product.name.toUpperCase().includes("OLED")) return "Флагман";
    if (product.price < 30000) return "Топ";
    return "Новинка";
  }, [product.price, product.name]);

  const detailImages = useMemo(() => {
    if (!product.imageUrl) return [];
    const mainImg = product.imageUrl;
    const gallery = [mainImg];

    try {
      if (mainImg.includes("_1.")) {
        const img2 = mainImg.replace("_1.", "_2.");
        const img3 = mainImg.replace("_1.", "_3.");
        gallery.push(img2, img3);
      }
    } catch (e) {
      console.warn("Gallery error", e);
    }
    return gallery;
  }, [product.imageUrl]);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setFailedImages(new Set());
      setMainImageIndex(0);
    }, 200);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen && !isClosing) {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isModalOpen, isClosing]);

  const validGallery = detailImages.filter(src => !failedImages.has(src));
  const currentImage = validGallery[mainImageIndex] || validGallery[0] || product.imageUrl;

  return (
    <>
      {/* --- КАРТОЧКА В КАТАЛОГЕ --- */}
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
        className="group relative flex flex-col h-full rounded-2xl bg-dark-card border border-dark-border hover:shadow-xl hover:shadow-black/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        {/* Изображение и Бейдж */}
        <div className="relative w-full aspect-square bg-dark-surface/20">
          <div className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg backdrop-blur-md border text-[12px] font-semibold ${
            badgeLabel === "Флагман" 
              ? "bg-accent/20 border-accent/20 text-accent" 
              : "bg-white/10 border-white/5 text-white"
          }`}>
            {badgeLabel}
          </div>

          {product.imageUrl ? (
            <img
              src={encodeURI(product.imageUrl)}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover p-3"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-dark-border" />
          )}
        </div>

        {/* Контент карточки */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
           <h3 className="text-[18px] sm:text-[20px] font-bold text-white line-clamp-2 leading-[1.2]">
             {product.name}
           </h3>

           {product.features.length > 0 && (
             <div className="flex flex-wrap gap-2 mt-3">
               {(product.features as string[]).slice(0, 4).map((feat, i) => (
                 <span
                   key={i}
                   className="px-2.5 py-1 text-[12px] sm:text-[13px] font-medium text-gray-300 bg-white/5 rounded-full whitespace-nowrap"
                 >
                   {feat}
                 </span>
               ))}
               {product.features.length > 4 && (
                 <span className="px-2.5 py-1 text-[12px] sm:text-[13px] font-medium text-gray-500 bg-white/5 rounded-full whitespace-nowrap">
                   +{product.features.length - 4}
                 </span>
               )}
             </div>
           )}

           <p className="text-[12px] sm:text-[13px] text-gray-400 mt-2 line-clamp-1">
             {product.connectionType} • {product.category ? getCategoryLabel(product.category.slug, product.category.name) : ""}
             {product.description ? ` • ${product.description}` : ""}
           </p>

           <div className="flex items-center justify-between pt-4 mt-auto">
             <span className="text-[20px] sm:text-[24px] font-bold text-accent tracking-tight">
               {formatPrice(product.price, currency)}
             </span>
             {isInSetup && (
               <div className="flex items-center gap-1.5 text-lime px-2 py-1 rounded bg-lime/10">
                 <Check className="w-3.5 h-3.5" />
                 <span className="text-[10px] font-bold uppercase tracking-wider">В сборке</span>
               </div>
             )}
           </div>
        </div>
      </div>

      {/* --- МОДАЛЬНОЕ ОКНО --- */}
      {isModalOpen && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 md:p-12 ${isClosing ? "animate-fadeOut" : "animate-fadeIn"}`}
          onClick={closeModal}
        >
          <div 
            className={`relative w-full max-w-5xl max-h-[95vh] overflow-y-auto custom-scrollbar rounded-[1.5rem] sm:rounded-[2rem] bg-dark-card border border-dark-border shadow-2xl flex flex-col md:flex-row ${isClosing ? "animate-scaleOut" : "animate-scaleIn"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка закрытия */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-gray-300 hover:text-white hover:bg-black/80 transition-all border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Левая колонка: Галерея */}
            <div className="w-full md:w-[45%] flex flex-col gap-4 p-6 sm:p-8 bg-dark-surface/20 border-b md:border-b-0 md:border-r border-dark-border">
              {/* Основное фото */}
              <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden bg-dark-border/20 shadow-inner flex items-center justify-center">
                 {currentImage ? (
                   <img 
                      src={encodeURI(currentImage)}
                      alt={product.name}
                      onError={() => setFailedImages(prev => new Set(prev).add(currentImage))}
                      className="w-full h-full object-cover p-2"
                   />
                 ) : (
                   <div className="text-gray-500">{t("no_image")}</div>
                 )}
              </div>
              
              {/* Миниатюры */}
              {validGallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar snap-x">
                  {validGallery.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImageIndex(idx)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 snap-center ${
                        mainImageIndex === idx ? "border-accent shadow-md shadow-accent/20 scale-105" : "border-transparent opacity-50 hover:opacity-100 hover:scale-[1.02]"
                      }`}
                    >
                      <div className="absolute inset-0 bg-dark-surface/40" />
                      <img 
                         src={encodeURI(src)} 
                         alt="thumb" 
                         className="relative z-10 w-full h-full object-cover" 
                         onError={() => setFailedImages(prev => new Set(prev).add(src))}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Правая колонка: Контент */}
            <div className="w-full md:w-[55%] flex flex-col p-6 sm:p-8 md:p-10">
              <div className="mb-6">
                <div className={`inline-block px-3 py-1 mb-4 rounded-lg backdrop-blur-md border text-[13px] font-bold tracking-wide uppercase ${
                  badgeLabel === "Флагман" 
                    ? "bg-accent/10 border-accent/20 text-accent" 
                    : "bg-white/5 border-white/5 text-gray-300"
                }`}>
                  {badgeLabel}
                </div>
                <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-[1.15] mb-2 pr-8">
                  {product.name}
                </h2>
                <p className="text-[14px] text-gray-400 capitalize">
                  {product.category ? getCategoryLabel(product.category.slug, product.category.name) : t("product")}
                </p>
              </div>

              {/* Ключевые фичи (Chips) */}
              {product.features.length > 0 && (
                <div className="mb-5">
                  <div className="flex flex-wrap gap-2.5">
                    {(product.features as string[]).map((feat, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 text-[13px] sm:text-[14px] font-medium text-gray-200 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors cursor-default"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Второстепенные характеристики */}
              <div className="mb-6 text-[13px] sm:text-[14px] text-gray-500">
                <p>
                  {product.connectionType}
                  {product.lengthMm ? ` • ${product.lengthMm}x${product.widthMm}x${product.heightMm}mm` : ""}
                  {product.weight != null ? ` • ${product.weight}g` : ""}
                </p>
              </div>

              {/* Описание */}
              {product.description && (
                <div className="mb-8">
                  <p className="text-[14px] text-gray-400 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Footer с ценой */}
              <div className="mt-auto pt-6 border-t border-dark-border">
                <div className="flex flex-col gap-5">
                  <div className="flex items-baseline gap-3">
                     <span className="text-[28px] sm:text-[34px] font-bold text-accent tracking-tight">
                       {formatPrice(product.price, currency)}
                     </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================
// DreamDesk — Блок "Где купить" (v4 Premium)
// Элитная конверсионная секция с графиками и фильтрами
// ============================================

"use client";

import { useState, useMemo } from "react";
import { 
  Truck, 
  Star, 
  ShieldCheck, 
  TrendingDown, 
  Clock, 
  Globe, 
  MapPin,
  Circle,
  ChevronRight,
  Monitor,
  ShoppingBag,
  Zap,
  Tag,
  ArrowDownUp,
  Filter,
  RotateCcw,
  BellRing
} from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/currency";
import { useApp } from "@/context/AppContext";
import { useTranslation, TranslationKey } from "@/lib/i18n";

interface Offer {
  id: string;
  productId: string;
  storeName: string;
  logo: string;
  price: number;
  currency: string;
  status: 'in_stock' | 'out_of_stock' | 'preorder' | 'low_stock';
  stockCount?: number;
  shipping: {
    price: number | 'free';
    time: string;
    region: string;
    isFast?: boolean;
    daysExt?: number; // for sorting
  };
  rating: number;
  reviewCount: number;
  url: string;
  region: 'global' | 'eu' | 'china';
  isOfficial?: boolean;
  brandColor: string;
  priceHistory: number[];
}

interface WhereToBuyProps {
  products: Product[];
}

// Мини-компонент графика 
function Sparkline({ data, color, t }: { data: number[], color: string, t: any }) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 24;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(" L ");

  return (
    <div className="flex flex-col gap-1 w-full mt-4">
      <div className="flex justify-between items-center text-[8px] text-gray-500 uppercase tracking-widest font-black">
        <span>{t("trend_30_days")}</span>
        <TrendingDown className="w-2.5 h-2.5" />
      </div>
      <svg viewBox={`-2 -2 ${width + 4} ${height + 4}`} className="w-full h-6 overflow-visible opacity-60">
        <path 
          d={`M ${points}`} 
          fill="none" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Soft gradient fill under line */}
        <path 
          d={`M ${points} L ${width},${height} L 0,${height} Z`} 
          fill={`url(#gradient-${color.replace('#', '')})`} 
          opacity="0.2"
        />
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function WhereToBuy({ products }: WhereToBuyProps) {
  const { currency, language } = useApp();
  const t = useTranslation(language);
  
  // Управляющие стейты
  const [activeRegion, setActiveRegion] = useState<'all' | 'global' | 'eu' | 'china'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'delivery' | 'rating'>('price');
  const [filterFast, setFilterFast] = useState(false);
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterOfficial, setFilterOfficial] = useState(false);

  // Анализ и генерация предложений
  const analyzedProducts = useMemo(() => {
    const stores = [
      { name: "Amazon.de", region: 'eu', official: true, logo: "/images/logos/Amazon_Logo_0.svg", color: "#FF9900" },
      { name: "AliExpress", region: 'china', official: false, logo: "/images/logos/Aliexpress_logo.svg", color: "#E62E04" },
      { name: "Caseking.de", region: 'eu', official: true, logo: "/images/logos/caseking_logo.png", color: "#E30613" },
      { name: "eBay", region: 'global', official: false, logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg", color: "#0064D2" },
    ];

    const stats = products.map(p => ({
      id: p.id,
      score: p.price * (0.5 + Math.random()), 
      visitCount: Math.floor(Math.random() * 1000)
    }));
    const maxScore = Math.max(...stats.map(s => s.score));
    const bestChoiceId = stats.find(s => s.score === maxScore && products.length > 1)?.id;

    return products.map(product => {
      let productOffers: Offer[] = stores.map((store, idx) => {
        const basePrice = product.price * (0.85 + Math.random() * 0.25);
        // Генерируем 10 точек для графика (цена падала или колебалась)
        const history = Array.from({length: 10}, (_, i) => basePrice * (1 + (Math.random() * 0.15 - 0.05)));
        history[history.length - 1] = basePrice; // последняя точка - текущая цена

        return {
          id: `${product.id}-${idx}`,
          productId: product.id,
          storeName: store.name,
          logo: store.logo,
          price: basePrice,
          currency: "EUR",
          status: Math.random() > 0.1 ? 'in_stock' : 'low_stock',
          stockCount: Math.floor(Math.random() * 8) + 1,
          shipping: { 
            price: Math.random() > 0.6 ? 'free' : 5.95, 
            time: store.region === 'eu' ? t("shipping_time_fast") : t("shipping_time_standard"), 
            region: store.region,
            isFast: store.region === 'eu',
            daysExt: store.region === 'eu' ? 3 : 20
          },
          rating: 4.2 + Math.random() * 0.8,
          reviewCount: Math.floor(Math.random() * 500) + 50,
          url: "#",
          region: store.region as any,
          isOfficial: store.official,
          brandColor: store.color,
          priceHistory: history
        };
      });

      // Применяем фильтры
      if (activeRegion !== 'all') productOffers = productOffers.filter(o => o.region === activeRegion);
      if (filterFast) productOffers = productOffers.filter(o => o.shipping.isFast);
      if (filterInStock) productOffers = productOffers.filter(o => o.status === 'in_stock');
      if (filterOfficial) productOffers = productOffers.filter(o => o.isOfficial);

      // Применяем сортировку
      productOffers.sort((a, b) => {
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'delivery') return (a.shipping.daysExt || 0) - (b.shipping.daysExt || 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });

      const minPrice = Math.min(...productOffers.map(o => o.price));
      
      let verdict: TranslationKey = "popular_choice";
      if (product.id === bestChoiceId) verdict = "value_verdict_best";
      else if (product.price < 100) verdict = "value_king";
      else if (product.price > 150) verdict = "premium_pick";

      return {
        product,
        offers: productOffers,
        bestPrice: minPrice,
        verdict
      };
    });
  }, [products, activeRegion, sortBy, filterFast, filterInStock, filterOfficial]);

  if (products.length === 0) return null;

  return (
    <div className="space-y-16 py-20 border-t border-white/10 bg-gradient-to-b from-transparent to-dark-surface/20 -mx-4 px-4 overflow-visible">
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Заголовок и Регионы */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-accent font-black uppercase tracking-[0.3em] text-[10px]">
              <Zap className="w-3 h-3 fill-current" />
              <span>{t("build_intelligence")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase font-headline drop-shadow-lg">
              {t("best_offers")}
            </h2>
            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              {t("build_management_hint")}
            </p>
          </div>
          
          {/* Вкладки регионов */}
          <div className="flex p-1 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md shadow-xl">
            {[
              { id: 'all', label: t("all_offers") },
              { id: 'eu', label: t("region_eu") },
              { id: 'global', label: t("region_global") },
              { id: 'china', label: t("region_china") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRegion(tab.id as any)}
                className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                  activeRegion === tab.id 
                    ? "bg-white text-dark-bg shadow-[0px_8px_24px_rgba(255,255,255,0.2)] scale-105" 
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Панель Управления (Сортировка и Фильтры) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-gray-500 mr-2">
              <Filter className="w-3.5 h-3.5" />
              {t("sort_by")}
            </span>
            <button 
              onClick={() => setFilterFast(!filterFast)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                filterFast ? 'bg-accent/10 border-accent/40 text-accent' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {t("filter_fast")}
            </button>
            <button 
              onClick={() => setFilterInStock(!filterInStock)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                filterInStock ? 'bg-lime/10 border-lime/40 text-lime' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {t("filter_instock")}
            </button>
            <button 
              onClick={() => setFilterOfficial(!filterOfficial)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                filterOfficial ? 'bg-blue-500/10 border-blue-500/40 text-blue-500' : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {t("filter_official")}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-gray-500 mr-2">
              <ArrowDownUp className="w-3.5 h-3.5" />
              {t("sort_by")}
            </span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-dark-surface border border-white/10 rounded-xl px-4 py-1.5 text-[11px] font-bold text-white focus:outline-none focus:border-accent cursor-pointer"
            >
              <option value="price">{t("sort_price")}</option>
              <option value="delivery">{t("sort_delivery")}</option>
              <option value="rating">{t("sort_rating")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Список товаров */}
      <div className="max-w-6xl mx-auto space-y-32 mt-12">
        {analyzedProducts.map(({ product, offers, bestPrice, verdict }, productIdx) => (
          <div key={product.id} className="relative group/section">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pl-2 lg:pl-0">
              
              {/* Левая колонка: Инфо о товаре */}
              <div className="lg:w-1/3 shrink-0 flex flex-col pt-4">
                <div className="sticky top-[100px]">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-xl shadow-2xl">
                        <ShoppingBag className="w-7 h-7" />
                      </div>
                      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider shadow-xl z-20 whitespace-nowrap border ${
                        verdict === "value_verdict_best" 
                          ? "bg-accent text-dark-bg border-accent/20 animate-pulse" 
                          : "bg-dark-surface border-white/10 text-gray-400"
                      }`}>
                        {t(verdict)}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tight leading-none mb-3">
                    {product.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                    <span className="text-[11px] font-bold text-gray-500 border-r border-white/10 pr-4 uppercase tracking-widest">
                      {formatPrice(product.price, currency)} MSRP
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-2">
                      <Tag className="w-3 h-3" />
                      {product.categoryId === 'mice' ? '26K DPI • 63g' : 'Custom Build'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-8 border-l-2 border-white/10 pl-4">
                    {t("found_offers_text").replace("{count}", String(offers.length))}
                  </p>
                </div>
              </div>

              {/* Правая колонка: Сетка карточек магазинов */}
              <div className="lg:w-2/3 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                  
                  {offers.length > 0 ? (
                    offers.map((offer, idx) => {
                      const isWinner = idx === 0 && sortBy === 'price' && offers.length > 1;

                      return (
                        <div 
                          key={offer.id}
                          className={`group/card relative flex flex-col p-6 rounded-[2rem] transition-all duration-500 ${
                            isWinner 
                              ? "bg-accent/[0.02] border-accent/40 shadow-[0px_0px_30px_rgba(173,198,255,0.1)] hover:-translate-y-2 border-2 z-10" 
                              : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/20 hover:-translate-y-1"
                          }`}
                          style={{'--offer-brand': offer.brandColor} as React.CSSProperties}
                        >
                          {/* Пульсирующее свечение для победителя (на фоне) */}
                          {isWinner && (
                            <div className="absolute inset-0 bg-accent/5 rounded-[2rem] blur-2xl animate-[pulse_4s_ease-in-out_infinite] -z-10" />
                          )}

                          {isWinner && (
                            <div className="absolute -top-3 right-6 px-4 py-1.5 rounded-full bg-accent text-dark-bg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent/20 flex items-center gap-1.5 overflow-hidden">
                              <span className="relative z-10">{t("best_price")}</span>
                              <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                            </div>
                          )}

                          {/* Store Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="relative py-1 flex-1">
                              <img 
                                src={offer.logo} 
                                alt={offer.storeName} 
                                className="h-6 w-auto object-contain grayscale group-hover/card:grayscale-0 transition-all duration-500 drop-shadow-sm" 
                              />
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-black bg-yellow-500/10 px-2 py-0.5 rounded-full">
                                <Star className="w-3 h-3 fill-current" />
                                {offer.rating.toFixed(1)}
                              </div>
                              <span className="text-[8px] text-gray-500 uppercase font-black tracking-tighter">
                                {offer.reviewCount} {t("reviews")}
                              </span>
                            </div>
                          </div>

                          {/* Price Area */}
                          <div className="mb-4 space-y-1">
                            <div className="text-4xl font-black text-white tracking-tighter transition-transform duration-300 origin-left group-hover/card:scale-[1.08] group-hover/card:text-[var(--offer-brand)]">
                              {formatPrice(offer.price, currency)}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-600 line-through">
                                {formatPrice(offer.price * 1.25, currency)}
                              </span>
                              <span className="text-[10px] text-lime font-black bg-lime/10 px-1.5 py-0.5 rounded border border-lime/20">
                                {t("economy_percent").replace("{percent}", "25")}
                              </span>
                            </div>
                          </div>

                          {/* График цены */}
                          <Sparkline data={offer.priceHistory} color={offer.brandColor} t={t} />

                          {/* Shipping Info */}
                          <div className="space-y-3 mt-6 mb-6 p-4 rounded-2xl bg-black/20 border border-white/5 group-hover/card:border-white/10 transition-colors">
                            <div className="flex items-center justify-between text-[11px]">
                              <div className="flex items-center gap-2 text-gray-300 font-bold">
                                <Circle className={`w-2 h-2 fill-current ${
                                  offer.status === 'in_stock' ? 'text-lime animate-pulse' : 'text-yellow-500'
                                }`} />
                                {offer.status === 'in_stock' ? t("filter_instock") : t("low_stock_text").replace("{count}", String(offer.stockCount || 1))}
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
                              <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-widest text-gray-600">
                                <span>{t("shipping_label")}</span>
                                {offer.shipping.isFast && (
                                  <span className="text-accent flex items-center gap-1 uppercase tracking-tighter truncate max-w-[120px]">
                                    <Zap className="w-2.5 h-2.5 fill-current" />
                                    {t("shipping_fast")}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-white">
                                <Truck className="w-4 h-4 text-gray-500" />
                                <span className="truncate">
                                  {offer.shipping.price === 'free' ? t("shipping_free") : `${offer.shipping.price}€`} • {offer.shipping.time}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Trust Badges Row */}
                          <div className="flex items-center gap-3 mb-6 flex-wrap">
                            {offer.isOfficial && (
                              <div className="flex items-center gap-1 text-[9px] font-black text-blue-400 bg-blue-400/10 px-2 py-1 rounded border border-blue-400/20 uppercase tracking-widest">
                                <ShieldCheck className="w-3 h-3" />
                                {t("filter_official")}
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-[9px] font-black text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase tracking-widest">
                              <RotateCcw className="w-3 h-3" />
                              {t("return_14_days")}
                            </div>
                          </div>

                          {/* CTAs */}
                          <div className="mt-auto space-y-3">
                            <button
                              onClick={() => window.open(offer.url, "_blank")}
                              className="group/btn relative w-full h-12 rounded-xl bg-white text-dark-bg font-black text-xs uppercase tracking-[0.2em] transition-all overflow-hidden z-0"
                            >
                              <div className="absolute inset-0 bg-[var(--offer-brand)] translate-x-[-101%] transition-transform duration-500 ease-out z-0 group-hover/btn:translate-x-0 group-active/btn:duration-150" />
                              <div className="relative z-10 flex items-center justify-center gap-2 w-full h-full group-hover/btn:text-white transition-colors duration-300">
                                <span>{t("go_to_store")}</span>
                                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                              </div>
                            </button>
                            
                            <button 
                              onClick={(e) => {
                                const btn = e.currentTarget;
                                btn.classList.add('text-lime', 'bg-lime/5');
                                btn.innerHTML = `<span class="flex items-center gap-2"><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ${t("subscribed_label")}</span>`;
                              }}
                              className="w-full flex items-center justify-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest py-2 active:scale-95 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                            >
                              <BellRing className="w-3 h-3" />
                              {t("notify_price_drop")}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                      <Globe className="w-12 h-12 text-gray-800 mx-auto mb-4" />
                      <p className="text-gray-500 font-bold">{t("not_found")}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

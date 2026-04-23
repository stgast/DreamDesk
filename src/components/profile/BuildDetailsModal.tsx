"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ShoppingBag, Edit3, Trash2, Calendar, Wallet, Package, ArrowRight, Check, Edit2, Trash } from "lucide-react";
import { formatPrice, getCurrencySymbol, convertPrice } from "@/lib/currency";
import { useApp } from "@/context/AppContext";
import { useState, useMemo, useEffect, useRef } from "react";
import { WhereToBuy } from "../WhereToBuy";
import type { Product } from "@/types";
import { useTranslation, LANGUAGE_LOCALES } from "@/lib/i18n";

// --- Sub-component: Animated Counter ---
function AnimatedPrice({ value, language }: { value: number, language: any }) {
  const [displayValue, setDisplayValue] = useState(value);
  const locale = LANGUAGE_LOCALES[language as keyof typeof LANGUAGE_LOCALES] || "en-US";

  useEffect(() => {
    const start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const current = Math.round(start + (end - start) * easeOutQuart);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{displayValue.toLocaleString(locale)}</span>;
}

interface BuildDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  setup: any;
  onDelete: (id: string) => void;
  onUpdate?: (id: string, data: any) => void;
}

export function BuildDetailsModal({ isOpen, onClose, setup, onDelete, onUpdate }: BuildDetailsModalProps) {
  const { currency, language } = useApp();
  const t = useTranslation(language);

  const [localItems, setLocalItems] = useState<any[]>([]);
  const [editNameValue, setEditNameValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Sync with prop when opened
  useEffect(() => {
    if (setup && isOpen) {
      // Add a client-side unique instanceId if not present to ensure stable list keys
      const itemsWithIds = (setup.items || []).map((item: any, idx: number) => ({
        ...item,
        instanceId: item.instanceId || `${item.id}-${idx}-${Date.now()}`
      }));
      setLocalItems(itemsWithIds);
      setEditNameValue(setup.name || "");
    }
  }, [setup, isOpen]);

  // Total calculation
  const total = useMemo(() => {
    return localItems.reduce((acc, item) => {
      const price = parseFloat(String(item.price));
      return acc + (isNaN(price) ? 0 : price);
    }, 0);
  }, [localItems]);

  const convertedTotal = useMemo(() => Math.round(convertPrice(total, currency)), [total, currency]);
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update ref when container is available
  useEffect(() => {
    if (scrollContainer) {
      scrollRef.current = scrollContainer;
    }
  }, [scrollContainer]);

  // Scroll animation for total block
  const { scrollY } = useScroll({ 
    container: isMounted && scrollContainer ? scrollRef : undefined 
  });
  
  const totalScale = useTransform(scrollY, [0, 100], [1, 0]);
  const totalPadding = useTransform(scrollY, [0, 100], ["2rem", "0rem"]);
  const totalY = useTransform(scrollY, [0, 100], [0, 20]);
  const mainPriceOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  
  // Sticky indicator transforms
  const stickyOpacity = useTransform(scrollY, [50, 150], [0, 1]);
  const stickyScale = useTransform(scrollY, [50, 150], [0.8, 1]);
  const stickyY = useTransform(scrollY, [50, 150], [10, 0]);


  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNameChange = (val: string) => {
    setEditNameValue(val);
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => {
      handleUpdate({ name: val });
    }, 1000);
  };

  const handleUpdate = async (updates: any) => {
    if (!setup?.id || !onUpdate) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/setups/${setup.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        onUpdate(setup.id, updates);
      }
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Fixed Removal Logic: Use instanceId to target only ONE item
  const removeItem = (instanceId: string) => {
    const newItems = localItems.filter(item => item.instanceId !== instanceId);
    setLocalItems(newItems);
    handleUpdate({
      items: newItems,
      totalPrice: newItems.reduce((acc, i) => acc + (parseFloat(String(i.price)) || 0), 0)
    });
  };


  const productsForWhereToBuy = useMemo(() => {
    return localItems.map(item => ({
      id: item.id || Math.random().toString(),
      name: item.name,
      price: parseFloat(String(item.price)) || 0,
      imageUrl: item.imageUrl,
      categoryId: item.categorySlug || 'default',
      connectionType: item.connectionType || '',
      features: item.features || [],
      description: item.description || '',
    } as unknown as Product));
  }, [localItems]);

  if (!setup) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050507]/90 backdrop-blur-2xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-4xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_60px_150px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Close Cross (Floating) */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 z-20 p-4 rounded-full bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Content */}
            <div className="p-8 pb-4 space-y-4">
              <div className="relative group/name">
                <input
                  type="text"
                  className="w-full text-2xl sm:text-3xl font-black text-white bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-800 transition-all tracking-tighter"
                  value={editNameValue}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder={t("name_build_placeholder")}
                />
                <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-transparent group-focus-within/name:w-1/3 transition-all duration-700" />
              </div>
            </div>

            {/* Components Scrollable List */}
            <div 
              ref={setScrollContainer}
              className="flex-1 overflow-y-auto custom-scrollbar px-8 py-4 space-y-8"
            >

              {/* Components List */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t("setup_composition")}</h3>
                  <div className="text-[10px] text-gray-500 font-bold bg-white/5 px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-tighter">
                    {localItems.length} {t("items_count")}
                  </div>
                </div>


                <div className="grid gap-6">
                  <AnimatePresence mode="popLayout">
                    {localItems.map((item) => (
                      <motion.div
                        layout
                        key={item.instanceId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, height: 0, marginTop: 0, marginBottom: 0, padding: 0 }}
                        className="group relative flex items-center gap-5 p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-500 shadow-xl overflow-hidden"
                      >
                        {/* Internal Glow Effect */}
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Enlarged Product Icon - Now compacted */}
                        <div className="w-16 h-16 rounded-xl bg-white/[0.03] p-3 flex items-center justify-center overflow-hidden shrink-0 shadow-inner border border-white/5 relative group-hover:scale-105 transition-transform duration-500">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt="" className="w-full h-full object-contain relative z-10" />
                          ) : (
                            <Package className="w-8 h-8 text-gray-800" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-2">{item.category}</p>
                          <h4 className="text-lg font-black text-white truncate leading-none mb-1">
                            {item.name || "—"}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">{item.connectionType || "Standard"}</span>
                            <div className="w-1 h-1 rounded-full bg-white/10" />
                            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-wider">{t("filter_instock")}</span>
                          </div>
                        </div>

                        <div className="text-right ml-auto">
                          <p className="text-xl font-black text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                            {formatPrice(item.price, currency)}
                          </p>
                        </div>

                        {/* Standard Delete Button */}
                        <button
                          onClick={() => removeItem(item.instanceId)}
                          className="p-4 rounded-2xl bg-white/0 text-gray-700 hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-90"
                          title={t("remove")}
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {localItems.length === 0 && (
                  <div className="p-20 text-center rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01] text-gray-700">
                    <Package className="w-16 h-16 mx-auto mb-6 opacity-20" />
                    <p className="font-black uppercase tracking-[0.2em] text-sm">{t("empty_build")}</p>
                  </div>
                )}
              </div>

              {/* Market Analytics Section */}
              {localItems.length > 0 && (
                <div className="pt-12 border-t border-white/5">
                  <WhereToBuy products={productsForWhereToBuy} />
                </div>
              )}
            </div>


            {/* Total Domination Block */}
            <div className="px-8">
              <motion.div 
                style={{ 
                  scale: totalScale, 
                  padding: totalPadding,
                  y: totalY,
                  opacity: mainPriceOpacity
                }}
                className="rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 relative overflow-hidden group/total shadow-2xl origin-bottom"
              >
                {/* Glow Overlay */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none group-hover:opacity-100 opacity-40 transition-opacity duration-1000" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-indigo-400 font-black uppercase tracking-[0.5em]">{t("total_cost")}</p>
                    <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none flex items-baseline">
                      <AnimatedPrice value={convertedTotal} language={language} />
                      <span className="text-indigo-500/40 ml-4">{getCurrencySymbol(currency)}</span>
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-black text-white leading-none mb-1">{localItems.length}</p>
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">{t("devices")}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Minimal Actions */}
            <div className="px-8 py-6 border-t border-white/5 flex items-center justify-between relative">
              <button 
                onClick={() => onDelete(setup.id)}
                className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition-all group/del"
              >
                <div className="w-8 h-8 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover/del:bg-red-500/10 group-hover/del:border-red-500/20 transition-all">
                  <Trash2 className="w-4 h-4 transition-transform group-hover/del:scale-110" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t("delete_build_long")}</span>
              </button>

              {/* Sticky Price Indicator (appears on scroll) */}
              <motion.div 
                style={{ 
                  opacity: stickyOpacity,
                  scale: stickyScale,
                  y: stickyY
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                <span className="text-sm font-black text-white tracking-tight flex items-baseline">
                  <AnimatedPrice value={convertedTotal} language={language} />
                  <span className="text-indigo-500/50 text-[10px] ml-1.5 uppercase font-black">{getCurrencySymbol(currency)}</span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

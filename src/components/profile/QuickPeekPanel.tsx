"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Package, Wallet, Calendar, ArrowRight, MousePointer2 } from "lucide-react";
import { formatPrice } from "@/lib/currency";
import { useApp } from "@/context/AppContext";
import { useTranslation, TranslationKey } from "@/lib/i18n";

interface QuickPeekPanelProps {
  isOpen: boolean;
  onClose: () => void;
  setup: any;
  onOpenFull: (setup: any) => void;
}

export function QuickPeekPanel({ isOpen, onClose, setup, onOpenFull }: QuickPeekPanelProps) {
  const { currency, language } = useApp();
  const t = useTranslation(language);

  if (!setup) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-md lg:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed top-[80px] right-0 z-[90] w-full max-w-md h-[calc(100vh-80px)] bg-[#050507]/95 backdrop-blur-3xl border-l border-white/5 shadow-[-40px_0_100px_rgba(0,0,0,0.8)] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em]">
                   <MousePointer2 className="w-3 h-3" />
                   <span>{t("quick_peek")}</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">{setup.name}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10">
              
              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-1">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t("total")}</p>
                    <p className="text-xl font-black text-indigo-400 tracking-tighter">
                      {formatPrice(setup.price || setup.totalPrice, currency)}
                    </p>
                 </div>
                 <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-1">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t("devices")}</p>
                    <p className="text-xl font-black text-white tracking-tighter">
                      {setup.devices || setup.items?.length || 0}
                    </p>
                 </div>
              </div>

              {/* Items List */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-1">{t("features_section")}</h4>
                <div className="space-y-3">
                  {(setup.items || []).map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.015] border border-white/5">
                      <div className="w-12 h-12 rounded-xl bg-[#0B0B0F] p-2 flex items-center justify-center shrink-0 border border-white/5">
                        {item.imageUrl ? (
                           <img src={item.imageUrl} alt="" className="w-full h-full object-contain" />
                        ) : (
                           <Package className="w-5 h-5 text-gray-800" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] text-indigo-400/60 font-black uppercase tracking-widest mb-0.5">{item.category}</p>
                        <h5 className="text-sm font-bold text-white truncate">{item.name}</h5>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-white">{formatPrice(item.price, currency)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-8 border-t border-white/5 bg-black/20">
              <button
                onClick={() => onOpenFull(setup)}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>{t("open_details")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-6">
                {t("id_label")}: {setup.id.slice(-8)}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

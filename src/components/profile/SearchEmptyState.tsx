"use client";

import { motion } from "framer-motion";
import { Search, XCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

export function SearchEmptyState() {
  const { language } = useApp();
  const t = useTranslation(language);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center py-24 text-center space-y-8"
    >
      <div className="relative">
        {/* Pulsing Aura */}
        <motion.div 
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.1, 0.3] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-indigo-500/10 blur-[60px] rounded-full" 
        />
        
        {/* Animated Icon Container */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-28 h-28 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center shadow-2xl backdrop-blur-xl group"
        >
          <div className="relative">
            <Search className="w-12 h-12 text-indigo-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500" strokeWidth={1.5} />
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <XCircle className="w-5 h-5 text-indigo-500/40" strokeWidth={2} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-xs space-y-3">
        <h3 className="text-2xl font-black text-white tracking-tight">{t("search_results_zero")}</h3>
        <p className="text-sm text-gray-500 leading-relaxed font-medium">
          {t("change_request_or_create")}
        </p>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="pt-4"
      >
        <div className="px-5 py-2 rounded-full bg-white/[0.03] border border-white/5 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          Zero Results Found
        </div>
      </motion.div>
    </motion.div>
  );
}

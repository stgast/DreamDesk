import { motion } from "framer-motion";
import { Plus, Sparkles, Layout, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

export function EmptyState() {
  const { language } = useApp();
  const t = useTranslation(language);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full py-20 px-4 flex flex-col items-center text-center"
    >
      {/* Premium Illustration Placeholder */}
      <div className="relative mb-12">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full" 
        />
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-xl"
        >
          <Package className="w-16 h-16 text-indigo-400 opacity-50" strokeWidth={1} />
        </motion.div>
        
        {/* Floating Particles */}
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 w-6 h-6 rounded-lg bg-indigo-500/20 blur-sm"
        />
        <motion.div 
          animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-purple-500/20 blur-sm"
        />
      </div>

      <div className="max-w-md space-y-4 mb-12">
        <h3 className="text-3xl font-black text-white tracking-tight">{t("empty_build_title")}</h3>
        <p className="text-gray-500 font-medium leading-relaxed">
          {t("empty_build_desc")}
        </p>
      </div>

      {/* Main CTA */}
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <Link href="/build">
          <button className="group relative px-10 py-5 rounded-3xl bg-white text-black font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-white/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3">
            <Plus className="w-5 h-5" />
            <span>{t("empty_build_create")}</span>
          </button>
        </Link>
      </div>

      {/* Secondary Options */}
      <div className="mt-20 w-full max-w-lg">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent("toggle-dreamdesk-ai"))}
          className="group w-full p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all text-left space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">{t("empty_build_ai_hint_title")}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{t("empty_build_ai_hint_desc")}</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-indigo-400 font-black uppercase tracking-widest pt-2">
            <span>{t("empty_build_ai_hint_start")}</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </motion.div>
  );
}

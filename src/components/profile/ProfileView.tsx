// ============================================
// DreamDesk — Профиль пользователя (Dashboard v2)
// Sidebar + Grid + Quick Peek Intelligence
// ============================================

"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import {
  User, Trash2, Edit2, LogOut, Package, Wallet, Calendar,
  Plus, Search, Eye, Copy, ArrowUpRight, BarChart3, Filter,
  Share2, Zap, MoreVertical
} from "lucide-react";
import { BuildDetailsModal } from "./BuildDetailsModal";
import { QuickPeekPanel } from "./QuickPeekPanel";
import { EmptyState } from "./EmptyState";
import { SearchEmptyState } from "./SearchEmptyState";
import { ConfirmModal } from "../ui/ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice, convertPrice, getCurrencySymbol } from "@/lib/currency";
import { useApp } from "@/context/AppContext";
import { useTranslation, TranslationKey, LANGUAGE_LOCALES } from "@/lib/i18n";

function AnimatedOdometer({ value, language }: { value: number, language: any }) {
  const [displayValue, setDisplayValue] = useState(0);
  const locale = LANGUAGE_LOCALES[language as keyof typeof LANGUAGE_LOCALES] || "en-US";

  useEffect(() => {
    const end = value;
    if (end === 0) return;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const current = Math.round(end * easeOutQuart);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue.toLocaleString(locale)}</>;
}

export interface MockSetup {
  id: string;
  name: string;
  price: number;
  totalPrice?: number;
  devices: number;
  date: string;
  items?: any[];
}

const getPluralDevices = (count: number, lang: string) => {
  if (lang !== 'RU') return count === 1 ? 'device' : 'devices';
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'устройств';
  if (lastDigit === 1) return 'устройство';
  if (lastDigit >= 2 && lastDigit <= 4) return 'устройства';
  return 'устройств';
};

interface ProfileViewProps {
  userName: string;
  userEmail: string;
  userImage?: string;
  onLogout: () => void;
  setups: MockSetup[];
  onDeleteSetup: (id: string) => void;
  onUpdateSetup?: (id: string, data: any) => void;
  avatarFile?: File | null;
  avatarPreview?: string;
  onAvatarChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarUpload?: () => Promise<void>;
  avatarUploading?: boolean;
  isLoading?: boolean;
}

export function ProfileView({
  userName,
  userEmail,
  userImage,
  onLogout,
  setups,
  onDeleteSetup,
  onUpdateSetup,
  avatarFile,
  avatarPreview,
  onAvatarChange,
  onAvatarUpload,
  avatarUploading = false,
  isLoading = false,
}: ProfileViewProps) {
  const { currency, language } = useApp();
  const t = useTranslation(language);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for interaction
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSetup, setSelectedSetup] = useState<MockSetup | null>(null);
  const [peekSetup, setPeekSetup] = useState<MockSetup | null>(null);
  const [newestSetupId, setNewestSetupId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletedToast, setDeletedToast] = useState<string | null>(null);
  const [isAvatarDirty, setIsAvatarDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");


  const handleRenameSubmit = async (id: string) => {
    if (!renameValue.trim()) {
      setRenamingId(null);
      return;
    }
    if (onUpdateSetup) {
      onUpdateSetup(id, { name: renameValue.trim() });
    }
    setRenamingId(null);
  };

  // Filtering
  const filteredSetups = useMemo(() => {
    if (!searchQuery.trim()) return setups;
    return setups.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [setups, searchQuery]);

  // Stats calculation
  const totalBuildsCount = filteredSetups.length;
  const totalBuildsValue = useMemo(() => {
    return filteredSetups.reduce((sum, s) => sum + (s.price || s.totalPrice || 0), 0);
  }, [filteredSetups]);
  const convertedTotalBuildsValue = useMemo(() => Math.round(convertPrice(totalBuildsValue, currency)), [totalBuildsValue, currency]);

  // Dynamic AI Insight
  const aiInsight = useMemo(() => {
    if (filteredSetups.length === 0) return t("stats_title") + " — нет данных";

    const avg = totalBuildsValue / filteredSetups.length;
    const brands: Record<string, number> = {};
    let totalItems = 0;

    filteredSetups.forEach(s => {
      s.items?.forEach((i: any) => {
        const parts = i.name.split(' ');
        if (parts.length > 0) {
          const brand = parts[0];
          brands[brand] = (brands[brand] || 0) + 1;
          totalItems++;
        }
      });
    });

    const topBrand = Object.entries(brands).sort((a, b) => b[1] - a[1])[0];

    const facts = [
      `Средняя сборка стоит около ${formatPrice(avg, currency)}`,
      topBrand && topBrand[1] > 1 ? `Ты фанат ${topBrand[0]}! Это ${Math.round((topBrand[1] / Math.max(totalItems, 1)) * 100)}% твоих девайсов.` : `Ты предпочитаешь идеальный микс брендов!`,
      `В текущих сборках задействовано ${totalItems} крутых устройств.`,
      filteredSetups.length > 2 ? `У тебя отличная динамика — уже ${filteredSetups.length} сборки собрано!` : `Ты только начал свой путь к идеальному сетапу.`
    ];

    // Use data footprint as a seed so the fact is stable until data changes
    const seed = filteredSetups.map(s => s.id).join('').length;
    return facts[seed % facts.length];
  }, [filteredSetups, totalBuildsValue, currency, t]);

  // Sync highlighting
  useEffect(() => {
    const handleSetupSaved = (e: any) => {
      const newSetup = e.detail?.setup;
      if (newSetup) {
        setNewestSetupId(newSetup.id);
        setTimeout(() => setNewestSetupId(null), 8000);
      }
    };
    window.addEventListener("dreamdesk-setup-saved", handleSetupSaved);
    return () => window.removeEventListener("dreamdesk-setup-saved", handleSetupSaved);
  }, []);

  // Global Keybinds (Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPeekSetup(null);
        setSelectedSetup(null);
        setDeleteConfirmId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChangeWithUI = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onAvatarChange) {
      onAvatarChange(e);
      setIsAvatarDirty(true);
      setSaveStatus('idle');
    }
  };

  const handleSaveAvatar = async () => {
    if (onAvatarUpload) {
      setSaveStatus('loading');
      await onAvatarUpload();
      setSaveStatus('success');
      setIsAvatarDirty(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleDuplicate = (setup: MockSetup) => {
    alert(t("duplicate_success").replace("{name}", setup.name));
  };

  const blurReveal = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 10 },
    visible: (customDelay: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.8, delay: customDelay, ease: [0.16, 1, 0.3, 1] as any }
    })
  };


  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" as any } },
    exit: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" as any } }
  };

  return (
    <div className="w-full min-h-screen">

      <div className="flex flex-col lg:flex-row gap-12 lg:items-start">

        {/* SIDEBAR: Personal Stats & User Info */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={blurReveal}
          className="lg:w-80 lg:sticky lg:top-[100px] space-y-8"
        >

          {/* User Profile Card */}
          <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 text-center space-y-6 shadow-2xl backdrop-blur-3xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-white/10 p-1 relative cursor-pointer"
                onClick={handleAvatarClick}
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  {avatarPreview || userImage ? (
                    <img src={avatarPreview || userImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#0B0B0F] flex items-center justify-center">
                      <User className="w-10 h-10 text-white/20" />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 bg-indigo-500 p-2 rounded-2xl border-4 border-[#0F0F12] shadow-xl group-hover:scale-110 transition-transform">
                  <Edit2 className="w-3.5 h-3.5 text-white" />
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChangeWithUI} className="hidden" />
              </div>

              <h2 className="text-2xl font-black text-white tracking-tighter truncate px-4">{userName || userEmail}</h2>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] truncate px-4">{userEmail}</p>
            </div>

            <AnimatePresence>
              {isAvatarDirty && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handleSaveAvatar}
                  disabled={saveStatus === 'loading'}
                  className="relative z-10 w-full py-4 rounded-2xl bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {saveStatus === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-4 h-4 rotate-45" />
                      <span>{t("save_photo")}</span>
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>

            {saveStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-lime text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <div className="w-4 h-4 rounded-full bg-lime/20 flex items-center justify-center">
                  <Package className="w-2.5 h-2.5" />
                </div>
                {t("saved")}
              </motion.div>
            )}


            <button
              onClick={onLogout}
              className="relative z-10 w-full py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all"
            >
              {t("logout")}
            </button>
          </div>

          {/* Quick Stats Sidebar Block */}
          <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 space-y-8 shadow-2xl backdrop-blur-3xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t("stats_title")}</span>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t("total_builds")}</p>
                  <p className="text-3xl font-black text-white"><AnimatedOdometer value={totalBuildsCount} language={language} /></p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t("total_cost")}</p>
                  <div className="flex items-center justify-between">
                    <div className="relative group cursor-help">
                      <p className="text-2xl font-black text-indigo-400 tracking-tighter flex items-center gap-1">
                        <AnimatedOdometer value={convertedTotalBuildsValue} language={language} />
                        <span className="text-[10px] opacity-70 ml-1">{getCurrencySymbol(currency)}</span>
                      </p>

                      {/* Currency Tooltip */}
                      <div className="absolute top-10 left-0 mt-2 p-4 rounded-2xl bg-[#1e1e24] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 flex gap-5 backdrop-blur-xl">
                        <div className="space-y-1">
                          <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">EUR</p>
                          <p className="text-sm font-black text-white">{formatPrice(totalBuildsValue, "EUR")}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">USD</p>
                          <p className="text-sm font-black text-white">{formatPrice(totalBuildsValue, "USD")}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">PLN</p>
                          <p className="text-sm font-black text-white">{formatPrice(totalBuildsValue, "PLN")}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">RUB</p>
                          <p className="text-sm font-black text-white">{formatPrice(totalBuildsValue, "RUB")}</p>
                        </div>
                      </div>
                    </div>


                    {/* Interactive Real Data Graph */}
                    <div className="flex-1 h-6 flex items-end justify-end gap-1.5 opacity-80 ml-6 relative">
                      {filteredSetups.length > 0 ? filteredSetups.slice(0, 10).map((setup, i) => {
                        const maxPrice = Math.max(...filteredSetups.map(s => s.price || s.totalPrice || 0));
                        const currentPrice = setup.price || setup.totalPrice || 0;
                        const heightPercent = maxPrice > 0 ? Math.max(15, (currentPrice / maxPrice) * 100) : 15;
                        return (
                          <div key={setup.id} className="relative group/bar flex flex-col justify-end h-full cursor-crosshair">
                            <div
                              className="w-2 bg-indigo-500/40 rounded-t-sm group-hover/bar:bg-indigo-300 group-hover/bar:-translate-y-0.5 transition-all duration-300"
                              style={{ height: `${heightPercent}%` }}
                            />
                            {/* Micro-Tooltip for the bar */}
                            <div className="absolute bottom-[calc(100%+8px)] right-1/2 translate-x-1/2 py-1.5 px-3 rounded-lg bg-[#25252A] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] opacity-0 group-hover/bar:opacity-100 group-hover/bar:-translate-y-1 transition-all pointer-events-none flex flex-col items-center z-50 min-w-max">
                              <p className="text-[10px] font-bold text-white truncate max-w-[140px] drop-shadow-md">{setup.name}</p>
                              <p className="text-[9px] font-mono text-indigo-300 font-bold">{formatPrice(currentPrice, currency)}</p>
                              {/* Tooltip arrow */}
                              <div className="absolute -bottom-1 right-1/2 translate-x-1/2 w-2 h-2 rotate-45 border-r border-b border-white/10 bg-[#25252A]"></div>
                            </div>
                          </div>
                        );
                      }) : (
                        [30, 50, 40, 70, 60, 90].map((h, i) => (
                          <div key={i} className="w-2 bg-white/5 rounded-t-sm" style={{ height: `${h}%` }} />
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] font-medium text-gray-400 flex items-start gap-2 leading-tight">
                    <Zap className="w-3.5 h-3.5 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] shrink-0 mt-0.5" />
                    <span>{aiInsight}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder={t("search_placeholder")}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

        </motion.div>


        {/* MAIN AREA: Grid of Builds */}
        <div className="flex-1 space-y-12">
          <motion.div
            custom={0.15}
            initial="hidden"
            animate="visible"
            variants={blurReveal}
            className="flex items-center justify-between px-4"
          >
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-white tracking-tighter">{t("your_builds")}</h1>
              <p className="text-gray-500 text-sm">{t("build_management_hint")}</p>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeletons"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 h-[360px] animate-pulse flex flex-col justify-between overflow-hidden relative">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-inner" />
                    <div className="space-y-4 w-full max-w-[200px] relative z-10">
                      <div className="h-8 bg-white/5 rounded-xl w-full" />
                      <div className="h-4 bg-white/5 rounded flex-1 w-1/2" />
                    </div>
                    <div className="space-y-4 pt-6 mt-8 relative z-10">
                      <div className="h-4 bg-white/5 rounded w-full" />
                      <div className="h-4 bg-white/5 rounded w-full" />
                      <div className="h-4 bg-white/5 rounded w-2/3" />
                    </div>
                    <div className="flex justify-between items-end border-t border-white/5 pt-6 mt-6 relative z-10">
                      <div className="h-10 bg-white/5 rounded-lg w-1/3" />
                      <div className="h-12 bg-white/5 rounded-2xl w-12" />
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : setups.length === 0 ? (
              <motion.div key="empty" variants={fadeVariants} initial="initial" animate="animate" exit="exit"><EmptyState /></motion.div>
            ) : filteredSetups.length === 0 ? (
              <motion.div key="search-empty" variants={fadeVariants} initial="initial" animate="animate" exit="exit"><SearchEmptyState /></motion.div>
            ) : (
              <motion.div
                key="grid"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredSetups.map((setup) => (
                  <div
                    key={setup.id}
                    className={`group relative rounded-[2.5rem] bg-white/[0.02] backdrop-blur-2xl border border-white/5 p-8 transition-all duration-500 shadow-2xl ${newestSetupId === setup.id ? "ring-2 ring-indigo-500/30 bg-indigo-500/5" : ""
                      }`}
                  >


                    {/* Interaction Triggers (Improved Premium Dropdown) */}
                    <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="relative group/menu">
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 rounded-[1.25rem] bg-white/[0.03] text-white/40 hover:text-white hover:bg-white/10 transition-all shadow-xl active:scale-90 border border-white/5"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu Wrapper (adds buffer for hover) */}
                        <div className="absolute top-full right-0 pt-3 w-64 opacity-0 translate-y-2 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-300 z-50">
                          <div className="bg-[#121217]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden p-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPeekSetup(prev => prev?.id === setup.id ? null : setup);
                              }}
                              className="w-full flex items-center gap-3 px-5 py-4 rounded-[1.25rem] text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all group/item text-left"
                            >
                              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover/item:bg-indigo-500/20 transition-colors">
                                <Eye className="w-4 h-4 text-indigo-400" />
                              </div>
                              {t("quick_peek_short")}
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setRenamingId(setup.id);
                                setRenameValue(setup.name);
                              }}
                              className="w-full flex items-center gap-3 px-5 py-4 rounded-[1.25rem] text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all group/item text-left"
                            >
                              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover/item:bg-amber-500/20 transition-colors">
                                <Edit2 className="w-4 h-4 text-amber-400" />
                              </div>
                              {t("rename_build")}
                            </button>

                            <div className="h-[1px] bg-white/5 mx-4 my-2" />

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirmId(setup.id);
                              }}
                              className="w-full flex items-center gap-3 px-5 py-4 rounded-[1.25rem] text-sm font-semibold text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all group/item text-left"
                            >
                              <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center group-hover/item:bg-red-500/20 transition-colors">
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </div>
                              {t("delete_build_short")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="space-y-6 cursor-pointer" onClick={() => setSelectedSetup(setup)}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 max-w-[calc(100%-80px)]">
                          {renamingId === setup.id ? (
                            <input
                              autoFocus
                              value={renameValue}
                              onChange={(e) => setRenameValue(e.target.value)}
                              onBlur={() => handleRenameSubmit(setup.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleRenameSubmit(setup.id);
                                if (e.key === "Escape") setRenamingId(null);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="bg-white/5 border border-indigo-500/50 rounded-lg px-2 py-1 text-2xl font-black text-white outline-none w-full"
                            />
                          ) : (
                            <>
                              <h3 className="text-2xl font-black text-white tracking-tight truncate pr-4">{setup.name}</h3>
                              {newestSetupId === setup.id && (
                                <span className="shrink-0 px-2 py-0.5 rounded-full bg-indigo-500 text-[8px] font-black uppercase text-white animate-pulse">{t("new_tag")}</span>
                              )}
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 opacity-50" /> {new Date(setup.date || "").toLocaleDateString("ru-RU")}</span>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-6 space-y-3">
                        {(setup.items || []).slice(0, 3).map((item: any) => (
                          <div
                            key={item.instanceId || item.id}
                            className="flex items-center justify-between text-[11px] text-gray-400"
                          >
                            <span className="truncate pr-4">{item.name}</span>
                            <span className="font-bold text-white whitespace-nowrap">{formatPrice(item.price, currency)}</span>
                          </div>
                        ))}
                        {setup.items && setup.items.length > 3 && (
                          <p className="text-[9px] text-gray-600 font-bold uppercase pt-2">
                            {language === 'RU' ? 'и ещё ' : t("or") + ' '}
                            {setup.items.length - 3} {getPluralDevices(setup.items.length - 3, language)}...
                          </p>
                        )}


                        {/* Budget Micro-Analytics */}
                        {setup.items && setup.items.length > 0 && (
                          <div className="pt-3 group/budget relative">
                            <div className="w-full h-1.5 flex rounded-full overflow-hidden bg-white/5 opacity-80 group-hover/budget:opacity-100 transition-opacity cursor-crosshair">
                              {[...(setup.items || [])].sort((a: any, b: any) => b.price - a.price).map((item: any, idx) => {
                                const total = setup.price || setup.totalPrice || 1;
                                const pct = Math.max((item.price / total) * 100, 2);
                                const colors = ['bg-indigo-500', 'bg-blue-400', 'bg-teal-400', 'bg-purple-400', 'bg-pink-400', 'bg-amber-400', 'bg-rose-400'];
                                const color = colors[idx % colors.length];
                                return (
                                  <div key={item.instanceId || item.id} style={{ width: `${pct}%` }} className={`h-full ${color} border-r border-[#1e1e24] last:border-0 hover:brightness-125 transition-all`} />
                                );
                              })}
                            </div>

                            {/* Rich Tooltip */}
                            <div className="absolute bottom-full left-0 mb-3 w-full p-4 rounded-2xl bg-[#1e1e24] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-0 group-hover/budget:opacity-100 transition-all pointer-events-none z-50 flex flex-col gap-3 backdrop-blur-xl translate-y-2 group-hover/budget:translate-y-0">
                              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Анализ бюджета</p>
                              <div className="space-y-2">
                                {[...(setup.items || [])].sort((a: any, b: any) => b.price - a.price).slice(0, 4).map((item: any, idx) => {
                                  const total = setup.price || setup.totalPrice || 1;
                                  const pct = ((item.price / total) * 100).toFixed(0);
                                  const colors = ['bg-indigo-500', 'bg-blue-400', 'bg-teal-400', 'bg-purple-400', 'bg-pink-400', 'bg-amber-400', 'bg-rose-400'];
                                  const color = colors[idx % colors.length];
                                  return (
                                    <div key={item.instanceId || item.id} className="flex items-center justify-between gap-4">
                                      <div className="flex items-center gap-2 overflow-hidden">
                                        <div className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
                                        <span className="text-xs text-white truncate leading-tight">{item.name}</span>
                                      </div>
                                      <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-[10px] font-bold text-gray-500">{pct}%</span>
                                        <span className="text-xs font-mono font-bold text-indigo-300">{formatPrice(item.price, currency)}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                                {setup.items.length > 4 && (
                                  <p className="text-[9px] text-gray-600 font-bold uppercase pt-1">
                                    И ещё {setup.items.length - 4} {getPluralDevices(setup.items.length - 4, language)}...
                                  </p>
                                )}
                              </div>
                              {/* tooltip arrow */}
                              <div className="absolute -bottom-1 left-6 w-2 h-2 rotate-45 border-r border-b border-white/10 bg-[#1e1e24]"></div>
                            </div>
                          </div>

                        )}
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="space-y-1">
                          <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">{t("total_budget")}</p>
                          <p className="text-2xl font-black text-indigo-400 tracking-tighter">
                            {formatPrice((setup.price || setup.totalPrice || 0), currency)}
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-xl">
                          <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <BuildDetailsModal
        isOpen={!!selectedSetup}
        onClose={() => setSelectedSetup(null)}
        setup={selectedSetup}
        onDelete={(id) => {
          setDeleteConfirmId(id);
        }}
        onUpdate={onUpdateSetup}
      />

      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => {
          if (deleteConfirmId) {
            const setupToDelete = setups.find(s => s.id === deleteConfirmId);
            if (setupToDelete) {
              setDeletedToast(`Ваша сборка «${setupToDelete.name}» была удалена`);
              setTimeout(() => setDeletedToast(null), 4000);
            }
            onDeleteSetup(deleteConfirmId);
            setSelectedSetup(null);
            setDeleteConfirmId(null);
          }
        }}
        title={t("delete_build_confirm")}
        message={t("delete_build_warning")}
        confirmLabel={t("yes_delete")}
        isDestructive={true}
      />

      <QuickPeekPanel
        isOpen={!!peekSetup}
        onClose={() => setPeekSetup(null)}
        setup={peekSetup}
        onOpenFull={(s) => {
          setPeekSetup(null);
          setSelectedSetup(s);
        }}
      />

      <AnimatePresence>
        {deletedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-red-500/10 border border-red-500/20 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(239,68,68,0.2)] flex items-center gap-3"
          >
            <Trash2 className="w-5 h-5 text-red-400" />
            <span className="text-white font-bold tracking-wide">{deletedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// DreamDesk — Профиль пользователя (Dashboard v2)
// Sidebar + Grid + Quick Peek Intelligence
// ============================================

"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { 
  User, Trash2, Edit2, LogOut, Package, Wallet, Calendar, 
  Plus, Search, Eye, Copy, ArrowUpRight, BarChart3, Filter
} from "lucide-react";
import { BuildDetailsModal } from "./BuildDetailsModal";
import { QuickPeekPanel } from "./QuickPeekPanel";
import { EmptyState } from "./EmptyState";
import { SearchEmptyState } from "./SearchEmptyState";
import { ConfirmModal } from "../ui/ConfirmModal";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/lib/currency";
import { useApp } from "@/context/AppContext";
import { useTranslation, TranslationKey } from "@/lib/i18n";

export interface MockSetup {
  id: string;
  name: string;
  price: number;
  totalPrice?: number;
  devices: number;
  date: string;
  items?: any[];
}

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
  const [isAvatarDirty, setIsAvatarDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // Stats calculation
  const totalBuildsCount = setups.length;
  const totalBuildsValue = useMemo(() => {
    return setups.reduce((sum, s) => sum + (s.price || s.totalPrice || 0), 0);
  }, [setups]);

  // Filtering
  const filteredSetups = useMemo(() => {
    if (!searchQuery.trim()) return setups;
    return setups.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [setups, searchQuery]);

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

  const containerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { 
      opacity: 0, 
      y: 15,
      filter: "blur(4px)"
    },
    hover: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "circOut"
      } as any
    }
  };

  const expandVariants = {
    initial: { 
      height: 0, 
      opacity: 0,
      marginTop: 0,
    },
    hover: { 
      height: "auto", 
      opacity: 1, 
      marginTop: 24,
      transition: { 
        duration: 0.6, 
        ease: "circOut"
      } as any
    }
  };

  return (
    <div className="w-full min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
        
        {/* SIDEBAR: Personal Stats & User Info */}
        <div className="lg:w-80 lg:sticky lg:top-[100px] space-y-8 animate-fade-in-up">
          
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
              <div className="flex items-center gap-3 text-gray-600">
                <BarChart3 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t("stats_title")}</span>
              </div>
              <div className="grid gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t("total_builds")}</p>
                  <p className="text-3xl font-black text-white">{totalBuildsCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{t("total_cost")}</p>
                  <p className="text-2xl font-black text-indigo-400 tracking-tighter">
                    {formatPrice(totalBuildsValue, currency)}
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

        </div>

        {/* MAIN AREA: Grid of Builds */}
        <div className="flex-1 space-y-12">
           <div className="flex items-center justify-between px-4">
              <div className="space-y-1">
                 <h1 className="text-4xl font-black text-white tracking-tighter">{t("your_builds")}</h1>
                 <p className="text-gray-500 text-sm">{t("build_management_hint")}</p>
              </div>
              <div className="hidden sm:block">
                 <div className="flex items-center gap-2 bg-indigo-500/5 border border-indigo-500/10 px-4 py-2 rounded-2xl">
                    <Filter className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{t("active_filtering")}</span>
                 </div>
              </div>
           </div>

           {setups.length === 0 ? (
             <EmptyState />
           ) : filteredSetups.length === 0 ? (
             <SearchEmptyState />
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <AnimatePresence mode="popLayout">
                  {filteredSetups.map((setup, index) => (
                    <motion.div
                      layout
                      key={setup.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover="hover"
                      variants={containerVariants}
                      className={`group relative rounded-[2.5rem] bg-[#0A0A0C] border border-white/5 p-8 transition-all duration-500 hover:scale-[1.03] ${
                        newestSetupId === setup.id ? "ring-2 ring-indigo-500/30 bg-indigo-500/5" : ""
                      }`}
                    >
                      {/* Interaction Triggers */}
                      <div className="absolute top-8 right-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all z-20">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setPeekSetup(prev => prev?.id === setup.id ? null : setup);
                          }}
                          className={`p-3 rounded-xl transition-all shadow-xl active:scale-90 ${peekSetup?.id === setup.id ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white hover:bg-indigo-500'}`}
                          title={peekSetup?.id === setup.id ? t("close_preview") : t("quick_peek")}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicate(setup);
                          }}
                          className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors shadow-xl"
                          title={t("duplicate")}
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-6 cursor-pointer" onClick={() => setSelectedSetup(setup)}>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 max-w-[calc(100%-80px)]">
                            <h3 className="text-2xl font-black text-white tracking-tight truncate pr-4">{setup.name}</h3>
                            {newestSetupId === setup.id && (
                              <span className="shrink-0 px-2 py-0.5 rounded-full bg-indigo-500 text-[8px] font-black uppercase text-white animate-pulse">{t("new_tag")}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 opacity-50" /> {new Date(setup.date || "").toLocaleDateString("ru-RU")}</span>
                          </div>
                        </div>

                        {/* Components Quick List (Animated Expansion) */}
                        <motion.div 
                          variants={expandVariants}
                          className="overflow-hidden border-t border-white/5"
                        >
                           <div className="pt-6 space-y-3">
                              {(setup.items || []).slice(0, 3).map((item: any) => (
                                <motion.div 
                                  key={item.instanceId || item.id} 
                                  variants={itemVariants}
                                  className="flex items-center justify-between text-[11px] text-gray-400"
                                >
                                   <span className="truncate pr-4">{item.name}</span>
                                   <span className="font-bold text-white whitespace-nowrap">{formatPrice(item.price, currency)}</span>
                                </motion.div>
                              ))}
                              {setup.items && setup.items.length > 3 && (
                                <p className="text-[9px] text-gray-600 font-bold uppercase pt-2">{t("or")} {setup.items.length - 3} {t("devices")}...</p>
                              )}
                           </div>
                        </motion.div>

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
                    </motion.div>
                  ))}
                </AnimatePresence>
             </div>
           )}
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
    </div>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Подтвердить",
  cancelLabel = "Отмена",
  isDestructive = false
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0F0F12] border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="p-10 space-y-6">
              <div className="flex items-center gap-4 text-gray-400">
                <div className={`p-3 rounded-2xl ${isDestructive ? 'bg-red-500/10 text-red-500' : 'bg-indigo-500/10 text-indigo-500'} border border-white/5`}>
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">{title}</h3>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed">
                {message}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-1 px-8 py-4 rounded-2xl ${
                    isDestructive 
                      ? 'bg-red-500 text-white shadow-[0_10px_30px_rgba(239,68,68,0.2)]' 
                      : 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]'
                  } font-black text-xs uppercase tracking-widest hover:-translate-y-1 active:scale-95 transition-all`}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
            
            {/* Close Cross */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-600 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

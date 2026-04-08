// ============================================
// DreamDesk — Config Card Component
// ============================================

"use client";

import Link from "next/link";
import { Trash2, Package, Calendar, ExternalLink } from "lucide-react";
import type { SavedConfig } from "@/lib/saved-configs";
import { formatPrice } from "@/lib/currency";
import type { Currency } from "@/types";

interface ConfigCardProps {
  config: SavedConfig;
  currency: Currency;
  onDelete: (id: string) => void;
  openLabel: string;
}

export function ConfigCard({
  config,
  currency,
  onDelete,
  openLabel,
}: ConfigCardProps) {
  const formattedDate = new Date(config.savedAt).toLocaleDateString("ru-RU", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const colors = [
    "from-blue-600/20 to-cyan-600/20",
    "from-purple-600/20 to-pink-600/20",
    "from-emerald-600/20 to-cyan-600/20",
    "from-amber-600/20 to-orange-600/20",
  ];

  const colorIndex = config.id.charCodeAt(0) % colors.length;
  const gradient = colors[colorIndex];

  return (
    <div className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Glassmorphic background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} backdrop-blur-lg border border-white/[0.15]`} />
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header with title and icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-white truncate mb-1 group-hover:text-primary transition-colors duration-300">
              {config.name}
            </h3>
            <p className="text-xs text-on-surface-variant font-mono">
              ID: {config.id.slice(0, 8)}...
            </p>
          </div>
          
          {/* Badge with item count */}
          <div className="flex-shrink-0 ml-4 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-primary-container/30 flex items-center justify-center border border-primary/20">
            <span className="text-sm font-bold text-primary">
              {config.items.length}
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 flex-1">
          {/* Items */}
          <div className="bg-white/[0.05] rounded-lg p-3 backdrop-blur-sm border border-white/[0.1]">
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-3.5 h-3.5 text-secondary" />
              <span className="text-xs text-on-surface-variant font-label">
                Items
              </span>
            </div>
            <p className="text-lg font-bold text-white">
              {config.items.length}
            </p>
          </div>

          {/* Total Price */}
          <div className="bg-white/[0.05] rounded-lg p-3 backdrop-blur-sm border border-white/[0.1]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-on-surface-variant font-label">
                Total
              </span>
            </div>
            <p className="text-lg font-bold text-secondary truncate">
              {formatPrice(config.totalPrice, currency)}
            </p>
          </div>
        </div>

        {/* Date and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.1]">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              href="/build"
              className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-primary/80 to-primary-container/80 hover:from-primary hover:to-primary-container text-on-primary font-medium text-xs transition-all duration-300 border border-primary/30 hover:border-primary/50"
              title={openLabel}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{openLabel}</span>
            </Link>

            <button
              onClick={() => {
                if (confirm("Удалить эту конфигурацию?")) {
                  onDelete(config.id);
                }
              }}
              className="inline-flex items-center justify-center p-2 rounded-lg border border-white/[0.15] text-on-surface-variant hover:text-error hover:border-error/50 hover:bg-error/10 transition-all duration-300"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

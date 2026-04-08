// ============================================
// DreamDesk — Magic Button (CTA Hero)
// ============================================

"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface MagicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function MagicButton({
  children,
  onClick,
  className = "",
  icon = <ArrowRight className="w-5 h-5" />,
  variant = "primary",
}: MagicButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group overflow-hidden px-8 py-4 rounded-full font-bold text-base transition-all duration-300 ${
        variant === "primary"
          ? "text-on-primary"
          : "text-white border border-outline-variant/15"
      } ${className}`}
    >
      {/* Animated gradient background (primary only) */}
      {variant === "primary" && (
        <>
          {/* Static gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container transition-all duration-500" />

          {/* Animated shimmer effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000"
            style={{
              transform: isHovered
                ? "translateX(200%)"
                : "translateX(-200%)",
            }}
          />

          {/* Glow effect on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-primary/50 to-primary-container/50 blur-xl transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Animated border glow */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary-container to-primary opacity-0 blur transition-all duration-300 ${
              isHovered ? "opacity-30" : "opacity-0"
            }`}
            style={{
              padding: "2px",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
            }}
          />
        </>
      )}

      {/* Secondary variant styling */}
      {variant === "secondary" && (
        <>
          <div className="absolute inset-0 bg-surface-container-high transition-colors duration-300 group-hover:bg-surface-container-highest" />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000"
            style={{
              transform: isHovered
                ? "translateX(200%)"
                : "translateX(-200%)",
            }}
          />
        </>
      )}

      {/* Content container */}
      <div className="relative z-10 flex items-center gap-3 justify-center group-hover:gap-4 transition-all duration-300">
        <span>{children}</span>
        <span
          className="transition-all duration-300"
          style={{
            transform: isHovered
              ? "translateX(2px) scale(1.1)"
              : "translateX(0) scale(1)",
          }}
        >
          {icon}
        </span>
      </div>

      {/* Additional hover scale effect */}
      <style jsx>{`
        button {
          transform-origin: center;
          transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        button:hover {
          transform: scale(1.05);
        }
        button:active {
          transform: scale(0.95);
        }
      `}</style>
    </button>
  );
}

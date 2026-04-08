// ============================================
// DreamDesk — Custom Dropdown Component
// ============================================

"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  dropDirection?: "up" | "down";
}

export function CustomDropdown({
  options,
  value,
  onChange,
  label,
  placeholder = "Select...",
  icon,
  className = "",
  dropDirection = "down",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return;

      const currentIndex = options.findIndex((opt) => opt.value === value);

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          const nextIndex = Math.min(currentIndex + 1, options.length - 1);
          onChange(options[nextIndex].value);
          break;
        case "ArrowUp":
          event.preventDefault();
          const prevIndex = Math.max(currentIndex - 1, 0);
          onChange(options[prevIndex].value);
          break;
        case "Enter":
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case "Escape":
          event.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, value, options, onChange]);

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm text-on-surface-variant mb-2.5 font-label tracking-wide">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full group"
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-white/[0.05] backdrop-blur-md border border-white/[0.15] rounded-xl transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-white/[0.2]" />

        {/* Content */}
        <div className="relative z-10 px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {(selectedOption?.icon || icon) && (
              <span className="text-primary flex-shrink-0">
                {selectedOption?.icon || icon}
              </span>
            )}
            <span className="text-white font-medium truncate">
              {selectedOption?.label || placeholder}
            </span>
          </div>

          {/* Chevron Icon */}
          <ChevronDown
            className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
            strokeWidth={2}
          />
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-0 right-0 z-50 mt-2 ${
          dropDirection === "up" ? "bottom-full mb-2 origin-bottom" : "top-full origin-top"
        } transition-all duration-200 ${
          isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible pointer-events-none"
        }`}
      >
        {/* Glassmorphic background */}
        <div className="overflow-hidden">
          <div className="absolute inset-0 bg-white/[0.08] backdrop-blur-lg border border-white/[0.15]" />

          {/* Options */}
          <div className="relative z-10 py-0">
            {options.map((option, index) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 flex items-center gap-3 transition-all duration-200 group relative overflow-hidden ${
                    isSelected
                      ? "bg-gradient-to-r from-primary/20 to-primary-container/20 text-white"
                      : "text-on-surface-variant hover:text-white hover:bg-white/[0.05]"
                  } ${index !== options.length - 1 ? "border-b border-white/[0.05]" : ""}`}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary-container" />
                  )}

                  {/* Option icon */}
                  {option.icon && (
                    <span
                      className={`flex-shrink-0 ${
                        isSelected ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      {option.icon}
                    </span>
                  )}

                  {/* Option label */}
                  <span className="flex-1 text-left font-medium">{option.label}</span>

                  {/* Selected checkmark */}
                  {isSelected && (
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

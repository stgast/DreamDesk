"use client";

import Link from "next/link";
import { DollarSign, Globe } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { CustomDropdown, type DropdownOption } from "@/components/CustomDropdown";
import type { Currency, Language } from "@/types";

const LANGUAGE_OPTIONS: DropdownOption[] = [
  { value: "RU", label: "Русский" },
  { value: "EN", label: "English" },
  { value: "UK", label: "Українська" },
  { value: "PL", label: "Polski" },
];

const CURRENCY_OPTIONS: DropdownOption[] = [
  { value: "RUB", label: "₽ (RUB)" },
  { value: "EUR", label: "€ (EUR)" },
  { value: "USD", label: "$ (USD)" },
  { value: "PLN", label: "zł (PLN)" },
];

export function Footer() {
  const { currency, setCurrency, language, setLanguage } = useApp();
  const t = useTranslation(language);

  return (
    <footer className="w-full border-t border-white/5 bg-surface-container-lowest">
      <div className="w-full max-w-[1920px] mx-auto px-6 py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <div className="text-white font-bold text-lg font-headline">DreamDesk</div>
            <div className="flex flex-wrap gap-4 items-center text-sm text-[#9ea3af]">
              <Link href="/privacy" className="hover:text-[#adc6ff] transition-opacity opacity-80 hover:opacity-100 font-label">
                {t("privacy")}
              </Link>
              <Link href="/terms" className="hover:text-[#adc6ff] transition-opacity opacity-80 hover:opacity-100 font-label">
                {t("terms")}
              </Link>
              <Link href="/contact" className="hover:text-[#adc6ff] transition-opacity opacity-80 hover:opacity-100 font-label">
                {t("contact")}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:items-end lg:w-[520px]">
            <CustomDropdown
              options={CURRENCY_OPTIONS}
              value={currency}
              onChange={(value) => setCurrency(value as Currency)}
              label={t("currency")}
              dropDirection="up"
            />
            <CustomDropdown
              options={LANGUAGE_OPTIONS}
              value={language}
              onChange={(value) => setLanguage(value as Language)}
              label={t("language")}
              icon={<Globe className="w-4 h-4" />}
              dropDirection="up"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

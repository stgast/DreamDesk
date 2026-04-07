"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import type { Currency, Language } from "@/types";

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
            <div>
              <label className="block text-sm text-on-surface-variant mb-2">{t("currency")}</label>
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value as Currency)}
                className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="RUB">₽ Рубль (RUB)</option>
                <option value="EUR">€ Евро (EUR)</option>
                <option value="USD">$ Доллар (USD)</option>
                <option value="PLN">zł Злотый (PLN)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-on-surface-variant mb-2">{t("language")}</label>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
                className="w-full bg-surface-container-high border border-outline-variant rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="RU">Русский</option>
                <option value="EN">English</option>
                <option value="UK">Українська</option>
                <option value="PL">Polski</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

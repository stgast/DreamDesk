// ============================================
// DreamDesk — Утилиты для валют и форматирования
// ============================================

import { Currency } from "@/types";

// Курсы валют относительно RUB (на 2026 год, приблизительные)
// TODO: Интегрировать live API для обновления курсов (OpenExchangeRates, Fixer.io)
export const EXCHANGE_RATES = {
  RUB: 1,
  EUR: 0.0095, // 1 RUB = ~0.0095 EUR
  USD: 0.011, // 1 RUB = ~0.011 USD
  PLN: 0.044, // 1 RUB = ~0.044 PLN
} as const;

// Символы валют
const CURRENCY_SYMBOLS = {
  RUB: "₽",
  EUR: "€",
  USD: "$",
  PLN: "zł",
} as const;

// Локали для форматирования
const CURRENCY_LOCALES = {
  RUB: "ru-RU",
  EUR: "de-DE",
  USD: "en-US",
  PLN: "pl-PL",
} as const;

/**
 * Конвертирует цену из RUB в указанную валюту
 */
export function convertPrice(priceInRub: number, targetCurrency: Currency): number {
  if (targetCurrency === "RUB") return priceInRub;
  return priceInRub * EXCHANGE_RATES[targetCurrency];
}

/**
 * Форматирует цену в указанной валюте
 */
export function formatPrice(price: number, currency: Currency): string {
  const convertedPrice = convertPrice(price, currency);
  return new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(convertedPrice);
}

/**
 * Получает символ валюты
 */
export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency];
}

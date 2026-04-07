"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Currency, Language } from "@/types";

type Theme = "dark" | "light";

interface AppContextValue {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  toggleSidebar: () => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_THEME = "desk-setup-theme";
const STORAGE_SIDEBAR = "desk-setup-sidebar";
const STORAGE_CURRENCY = "desk-setup-currency";
const STORAGE_LANGUAGE = "desk-setup-language";

export function AppProvider({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(false);
  const [theme, setThemeState] = useState<Theme>("dark");
  const [currency, setCurrencyState] = useState<Currency>("RUB");
  const [language, setLanguageState] = useState<Language>("RU");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedSidebar = localStorage.getItem(STORAGE_SIDEBAR);
    if (savedSidebar === "true") setSidebarCollapsedState(true);
    const savedTheme = localStorage.getItem(STORAGE_THEME) as Theme;
    if (savedTheme) setThemeState(savedTheme);
    const savedCurrency = localStorage.getItem(STORAGE_CURRENCY) as Currency;
    if (savedCurrency) setCurrencyState(savedCurrency);
    const savedLanguage = localStorage.getItem(STORAGE_LANGUAGE) as Language;
    if (savedLanguage) setLanguageState(savedLanguage);
    setMounted(true);
  }, []);

  const setSidebarCollapsed = useCallback((v: boolean) => {
    setSidebarCollapsedState(v);
    localStorage.setItem(STORAGE_SIDEBAR, String(v));
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsedState((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_SIDEBAR, String(next));
      return next;
    });
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_THEME, t);
    document.documentElement.classList.toggle("light", t === "light");
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_THEME, next);
      document.documentElement.classList.toggle("light", next === "light");
      return next;
    });
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_CURRENCY, c);
  }, []);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    localStorage.setItem(STORAGE_LANGUAGE, l);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    const langCode =
      language === "RU"
        ? "ru"
        : language === "EN"
        ? "en"
        : language === "UK"
        ? "uk"
        : language === "PL"
        ? "pl"
        : "en";
    document.documentElement.lang = langCode;
  }, [language]);

  return (
    <AppContext.Provider
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        theme,
        setTheme,
        toggleTheme,
        currency,
        setCurrency,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

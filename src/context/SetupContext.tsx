// ============================================
// DreamDesk — Контекст сборки (useSetup)
// Хранит текущую сборку пользователя, считает итого
// ============================================

"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { Product, SetupItem } from "@/types";

interface SetupContextValue {
  // Текущая сборка — массив выбранных товаров
  items: SetupItem[];

  // Добавить товар в сборку (макс. 1 товар на категорию)
  addItem: (product: Product) => void;

  // Удалить товар из сборки по categoryId
  removeItem: (categoryId: string) => void;

  // Заменить товар в категории
  replaceItem: (product: Product) => void;

  // Очистить всю сборку
  clearSetup: () => void;

  // Итоговая стоимость сборки
  totalPrice: number;

  // Проверка: есть ли товар из данной категории в сборке
  hasCategory: (categoryId: string) => boolean;

  // Получить товар из конкретной категории (если есть)
  getItemByCategory: (categoryId: string) => SetupItem | undefined;

  // Загрузить сборку целиком
  loadSetup: (newItems: SetupItem[]) => void;

  // Избранное (Wishlist)
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;

  // Сравнение (Compare)
  compareIds: string[];
  toggleCompare: (productId: string) => void;
}

const SetupContext = createContext<SetupContextValue | null>(null);

export function SetupProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SetupItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // Добавить товар (заменяет существующий в той же категории)
  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      // Убираем старый товар из этой категории, добавляем новый
      const filtered = prev.filter((i) => i.product.categoryId !== product.categoryId);
      return [...filtered, { product, addedAt: Date.now() }];
    });
  }, []);

  // Удалить товар по categoryId
  const removeItem = useCallback((categoryId: string) => {
    setItems((prev) => prev.filter((i) => i.product.categoryId !== categoryId));
  }, []);

  // Заменить — алиас для addItem (семантически понятнее)
  const replaceItem = useCallback(
    (product: Product) => addItem(product),
    [addItem]
  );

  // Очистить сборку
  const clearSetup = useCallback(() => setItems([]), []);

  // Итоговая цена
  const totalPrice = items.reduce((sum, i) => sum + i.product.price, 0);

  // Проверить, есть ли товар из категории
  const hasCategory = useCallback(
    (categoryId: string) => items.some((i) => i.product.categoryId === categoryId),
    [items]
  );

  // Получить товар из категории
  const getItemByCategory = useCallback(
    (categoryId: string) => items.find((i) => i.product.categoryId === categoryId),
    [items]
  );

  // Загрузить сборку целиком
  const loadSetup = useCallback((newItems: SetupItem[]) => {
    setItems(newItems);
  }, []);

  // Переключить избранное
  const toggleWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  // Переключить сравнение
  const toggleCompare = useCallback((productId: string) => {
    setCompareIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  return (
    <SetupContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        replaceItem,
        clearSetup,
        totalPrice,
        hasCategory,
        getItemByCategory,
        loadSetup,
        wishlistIds,
        toggleWishlist,
        compareIds,
        toggleCompare,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
}

// Хук для использования контекста сборки
export function useSetup() {
  const ctx = useContext(SetupContext);
  if (!ctx) throw new Error("useSetup must be used within SetupProvider");
  return ctx;
}

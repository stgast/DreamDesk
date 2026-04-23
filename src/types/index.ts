// ============================================
// DreamDesk — Типы данных
// ============================================

// Валюты
export type Currency = "RUB" | "EUR" | "USD" | "PLN";

// Языки
export type Language = "RU" | "EN" | "UK" | "PL";

// Категория из базы данных
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  order: number;
}

// Товар из базы данных
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  connectionType: string;
  features: string[];
  weight: number | null;
  /** мм — только для мышей с заполненными габаритами */
  lengthMm?: number | null;
  widthMm?: number | null;
  heightMm?: number | null;
  /** положение «горба» по длине, % от носа */
  humpPercent?: number | null;
  categoryId: string;
  category?: Category;
}

// Товар в сборке пользователя (для useSetup)
export interface SetupItem {
  product: Product;
  addedAt: number; // timestamp — уникальный ключ
}

// Сообщение в чате с AI
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  feedback?: 'like' | 'dislike';
}

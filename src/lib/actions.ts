// ============================================
// DreamDesk — Server Actions (получение данных из БД)
// Выполняются на сервере, безопасно работают с Prisma
// ============================================

"use server";

import { prisma } from "./prisma";
import type { Product, Category } from "@/types";

// Парсинг features из JSON-строки в массив
function parseProduct(p: any): Product {
  return {
    ...p,
    features: typeof p.features === "string" ? JSON.parse(p.features) : p.features,
    category: p.category ? { ...p.category, createdAt: undefined } : undefined,
    createdAt: undefined,
  };
}

// Получить все категории (отсортированные по order)
export async function getCategories(): Promise<Category[]> {
  const cats = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });
  return cats.map((c) => ({ ...c, createdAt: undefined } as any));
}

// Получить все товары с привязанной категорией
export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });
  return products.map(parseProduct);
}

// Получить товары по slug категории
export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { category: { slug } },
    include: { category: true },
    orderBy: { name: "asc" },
  });
  return products.map(parseProduct);
}

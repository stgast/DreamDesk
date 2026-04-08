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

// Получить setups пользователя
export async function getSetups(userId: string) {
  const setups = await prisma.setup.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return setups.map((s) => ({
    ...s,
    items: JSON.parse(s.items),
  }));
}

// Сохранить setup
export async function saveSetup(userId: string, name: string, items: any[], totalPrice: number) {
  return await prisma.setup.create({
    data: {
      userId,
      name,
      items: JSON.stringify(items),
      totalPrice,
    },
  });
}

// Удалить setup
export async function deleteSetup(userId: string, setupId: string) {
  return await prisma.setup.deleteMany({
    where: {
      id: setupId,
      userId, // безопасность
    },
  });
}

// Обновить setup (название и/или состав)
export async function updateSetup(userId: string, setupId: string, data: { name?: string; items?: any[]; totalPrice?: number }) {
  const updateData: any = {};
  if (data.name) updateData.name = data.name;
  if (data.items) updateData.items = JSON.stringify(data.items);
  if (data.totalPrice !== undefined) updateData.totalPrice = data.totalPrice;

  return await prisma.setup.updateMany({
    where: {
      id: setupId,
      userId,
    },
    data: updateData,
  });
}

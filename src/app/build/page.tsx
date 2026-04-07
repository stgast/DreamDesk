// ============================================
// DreamDesk — Страница конфигуратора (/build)
// Server Component: загружает данные, передаёт в клиент
// ============================================

import { getProducts, getCategories } from "@/lib/actions";
import { Configurator } from "@/components/Configurator";

export const dynamic = "force-dynamic";

export default async function BuildPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return <Configurator products={products} categories={categories} />;
}

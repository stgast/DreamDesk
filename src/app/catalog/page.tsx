// ============================================
// DreamDesk — Страница каталога (/catalog)
// ============================================

import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/actions";
import { CatalogPage } from "@/components/CatalogPage";

export const dynamic = "force-dynamic";

export default async function Catalog() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <Suspense fallback={<div className="p-6"><div className="skeleton rounded-xl h-64" /></div>}>
      <CatalogPage products={products} categories={categories} />
    </Suspense>
  );
}

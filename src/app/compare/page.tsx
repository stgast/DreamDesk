// ============================================
// DreamDesk — /compare
// ============================================

import { getProducts } from "@/lib/actions";
import { CompareView } from "@/components/CompareView";

export const dynamic = "force-dynamic";

export default async function ComparePage() {
  const products = await getProducts();

  return <CompareView products={products} />;
}

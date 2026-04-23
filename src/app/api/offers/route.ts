// ============================================
// DreamDesk — API: Store Offers
// GET /api/offers?productIds=id1,id2,id3
// ============================================

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productIdsParam = searchParams.get("productIds");

    if (!productIdsParam) {
      return NextResponse.json({ error: "productIds parameter required" }, { status: 400 });
    }

    const productIds = productIdsParam.split(",").filter(Boolean);

    if (productIds.length === 0) {
      return NextResponse.json({ offers: [] });
    }

    const offers = await prisma.storeOffer.findMany({
      where: {
        productId: { in: productIds },
      },
      include: {
        priceHistory: {
          orderBy: { date: "asc" },
          take: 30,
        },
      },
      orderBy: { price: "asc" },
    });

    return NextResponse.json({ offers });
  } catch (error) {
    console.error("[API/offers] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

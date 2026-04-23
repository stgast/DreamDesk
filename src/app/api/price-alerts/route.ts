// ============================================
// DreamDesk — API: Price Alerts (Уведомления о скидках)
// POST   /api/price-alerts — подписаться
// DELETE /api/price-alerts — отписаться
// GET    /api/price-alerts — получить свои подписки
// ============================================

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET — получить подписки текущего пользователя
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const alerts = await prisma.priceAlert.findMany({
      where: {
        userId: session.user.id,
        isActive: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ alerts });
  } catch (error) {
    console.error("[API/price-alerts] GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST — подписаться на уведомление о скидке
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { offerId, productName, storeName, targetPrice } = body;

    if (!offerId) {
      return NextResponse.json({ error: "offerId is required" }, { status: 400 });
    }

    // Проверяем что предложение существует
    const offer = await prisma.storeOffer.findUnique({ where: { id: offerId } });
    if (!offer) {
      return NextResponse.json({ error: "Offer not found" }, { status: 404 });
    }

    // Создаём или обновляем подписку (upsert)
    const alert = await prisma.priceAlert.upsert({
      where: {
        userId_offerId: {
          userId: session.user.id,
          offerId: offerId,
        },
      },
      update: {
        isActive: true,
        targetPrice: targetPrice || null,
        productName: productName || offer.storeName,
        storeName: storeName || offer.storeName,
      },
      create: {
        userId: session.user.id,
        offerId: offerId,
        productName: productName || "",
        storeName: storeName || "",
        targetPrice: targetPrice || null,
      },
    });

    return NextResponse.json({ alert, message: "Subscribed to price alert" });
  } catch (error) {
    console.error("[API/price-alerts] POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE — отписаться от уведомления
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const offerId = searchParams.get("offerId");

    if (!offerId) {
      return NextResponse.json({ error: "offerId is required" }, { status: 400 });
    }

    await prisma.priceAlert.updateMany({
      where: {
        userId: session.user.id,
        offerId: offerId,
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json({ message: "Unsubscribed from price alert" });
  } catch (error) {
    console.error("[API/price-alerts] DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Простой модуль рекомендаций по предпочтениям (можно заменить на вызов LLM API)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      mouseGrip,
      headphoneType,
      deskSize,
      budget,
      excludeIds = [],
    } = body as {
      mouseGrip?: string;
      headphoneType?: string;
      deskSize?: string;
      budget?: string;
      excludeIds?: string[];
    };

    const all = await prisma.device.findMany({ orderBy: { name: "asc" } });
    const excludeSet = new Set(excludeIds);

    // Простая логика: фильтруем по типу и бюджету, сортируем по релевантности
    const scored = all
      .filter((d) => !excludeSet.has(d.id))
      .map((device) => {
        let score = 0;
        if (device.type === "mouse" && mouseGrip) score += 2;
        if (device.type === "headphones" && headphoneType) score += 2;
        if (deskSize === "small" && device.type === "mousepad") score += 1;
        if (budget === "low" && device.price < 3000) score += 2;
        if (budget === "medium" && device.price >= 3000 && device.price < 15000) score += 2;
        if (budget === "high" && device.price >= 15000) score += 2;
        return { device, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((x) => x.device);

    // Если по предпочтениям мало — добавим популярные по типу
    const types = ["mouse", "keyboard", "headphones", "mousepad"];
    for (const t of types) {
      if (scored.filter((d) => d.type === t).length === 0) {
        const fallback = all.find((d) => d.type === t && !excludeSet.has(d.id));
        if (fallback) scored.push(fallback);
      }
    }

    return NextResponse.json(scored.slice(0, 8));
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { status: 500 }
    );
  }
}

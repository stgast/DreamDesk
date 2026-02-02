import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const brand = searchParams.get("brand");
    const color = searchParams.get("color");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const where: Record<string, unknown> = {};
    if (type) where.type = type;
    if (brand) where.brand = brand;
    if (color) where.color = color;
    const priceCond: { gte?: number; lte?: number } = {};
    if (minPrice != null && minPrice !== "") priceCond.gte = Number(minPrice);
    if (maxPrice != null && maxPrice !== "") priceCond.lte = Number(maxPrice);
    if (Object.keys(priceCond).length) where.price = priceCond;

    const devices = await prisma.device.findMany({
      where: Object.keys(where).length ? where : undefined,
      orderBy: { name: "asc" },
    });
    return NextResponse.json(devices);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch devices" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, brand, price, color, imageUrl, description } = body;
    if (!name || !type || !brand || price == null) {
      return NextResponse.json(
        { error: "Missing required fields: name, type, brand, price" },
        { status: 400 }
      );
    }
    const device = await prisma.device.create({
      data: {
        name,
        type,
        brand,
        price: Number(price),
        color: color ?? "black",
        imageUrl: imageUrl ?? null,
        description: description ?? null,
      },
    });
    return NextResponse.json(device);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create device" },
      { status: 500 }
    );
  }
}

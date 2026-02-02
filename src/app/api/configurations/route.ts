import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const configs = await prisma.setupConfiguration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(configs);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch configurations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, deviceIds, layout, preferences } = body;
    if (!name || !deviceIds || !Array.isArray(deviceIds)) {
      return NextResponse.json(
        { error: "Missing required: name, deviceIds (array)" },
        { status: 400 }
      );
    }
    const config = await prisma.setupConfiguration.create({
      data: {
        name,
        deviceIds: JSON.stringify(deviceIds),
        layout: layout ? JSON.stringify(layout) : null,
        preferences: preferences ? JSON.stringify(preferences) : null,
      },
    });
    return NextResponse.json(config);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to save configuration" },
      { status: 500 }
    );
  }
}

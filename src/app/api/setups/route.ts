// ============================================
// DreamDesk — API Setups
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSetups, saveSetup } from "@/lib/actions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const setups = await getSetups(session.user.id);
    return NextResponse.json({ setups });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch setups" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, items, totalPrice } = await request.json();
    const setup = await saveSetup(session.user.id, name, items, totalPrice);
    return NextResponse.json({ setup });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save setup" }, { status: 500 });
  }
}
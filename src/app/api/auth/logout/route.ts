import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete("dreamdesk-user");
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const name = body.name ? String(body.name).trim() : null;
    const nickname = body.nickname 
      ? String(body.nickname).trim().toLowerCase() 
      : null;

    console.log("[REGISTER] Request:", { email, name, nickname, hasPassword: !!password });

    // Validation checks
    if (!email || !password) {
      console.log("[REGISTER] Missing email or password");
      return NextResponse.json(
        { error: "Укажите email и пароль" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("[REGISTER] Invalid email format:", email);
      return NextResponse.json(
        { error: "Укажите корректный email" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log("[REGISTER] Password too short");
      return NextResponse.json(
        { error: "Пароль должен быть не менее 6 символов" },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log("[REGISTER] Checking if user exists with email:", email);
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          ...(nickname ? [{ nickname }] : []),
        ],
      },
    });

    if (existingUser) {
      console.log("[REGISTER] User already exists:", existingUser.email);
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: "Этот email уже зарегистрирован" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Этот никнейм уже занят" },
        { status: 409 }
      );
    }

    // Hash password
    console.log("[REGISTER] Hashing password...");
    const hash = await bcrypt.hash(password, 10);

    // Create user
    console.log("[REGISTER] Creating user:", { email, nickname });
    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
        name: name || null,
        nickname: nickname || null,
      },
    });

    console.log("[REGISTER] User created successfully:", user.id);

    // Return success without setting cookies - let NextAuth handle the session
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER] Error:", error);
    
    // Better error handling
    if (error instanceof Error) {
      console.error("[REGISTER] Error message:", error.message);
      console.error("[REGISTER] Error stack:", error.stack);
    }

    // Return generic error to client
    return NextResponse.json(
      { error: "Ошибка при регистрации. Пожалуйста, попробуйте позже." },
      { status: 500 }
    );
  }
}

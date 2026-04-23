// ============================================
// DreamDesk — NextAuth Configuration
// ============================================

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email или Никнейм", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("[AUTH] Missing credentials");
            return null;
          }

          const loginLower = credentials.email.toLowerCase();
          console.log("[AUTH] Attempting login with:", loginLower);

          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: loginLower },
                { nickname: loginLower },
              ],
            },
          });

          if (!user) {
            console.log("[AUTH] User not found for login:", loginLower);
            return null;
          }

          if (!user.password) {
            console.log("[AUTH] User has no password (OAuth account?):", user.id);
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isValid) {
            console.log("[AUTH] Invalid password for user:", user.id);
            return null;
          }

          console.log("[AUTH] Authentication successful for user:", user.id);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("[AUTH] Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("[SIGNIN CALLBACK] user:", user.id, "provider:", account?.provider);
      return true;
    },
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      console.log("[SESSION CALLBACK] Updated session for user:", user.id);
      return session;
    },
  },
  pages: {
    signIn: "/profile",
  },
};
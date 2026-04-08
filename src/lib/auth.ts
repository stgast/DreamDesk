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
  // Мы отключаем адаптер, так как он вызывает ошибку ERR_RESPONSE_HEADERS_TOO_BIG в данной среде.
  // Вместо него используем ручное управление пользователями в калбеках.
  // adapter: PrismaAdapter(prisma),
  
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
            return null;
          }

          const loginLower = credentials.email.toLowerCase();
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: loginLower },
                { nickname: loginLower },
              ],
            },
          });

          if (!user || !user.password) {
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            // image: user.image, // УБИРАЕМ: это вызывает Session cookie exceeds allowed 4096 bytes
          };
        } catch (error) {
          console.error("[AUTH] Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Ручное сохранение пользователя Google в базу данных
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email as string },
          });

          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
                nickname: (user.name || user.email?.split("@")[0] || "user") + "_" + Math.floor(Math.random() * 1000),
              },
            });
            user.id = newUser.id;
          } else {
            user.id = existingUser.id;
            // Обновляем имя/аватар если нужно
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                name: user.name || existingUser.name,
                image: user.image || existingUser.image,
              },
            });
          }
          return true;
        } catch (error) {
          console.error("[AUTH] Manual signIn persistence error:", error);
          return true; // Всё равно пускаем, даже если не сохранили (для стабильности)
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        // token.picture = user.image; // УБИРАЕМ Базу64 из токена
      }
      
      // Обработка обновления (но картинку в токен всё равно не пишем)
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        // session.user.image = token.picture as string; // Здесь будет пусто или дефолт
      }
      return session;
    },
  },
  pages: {
    signIn: "/profile",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token.v2`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
};
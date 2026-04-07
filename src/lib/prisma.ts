import { existsSync } from "fs";
import { config } from "dotenv";
import { resolve } from "path";
import { PrismaClient } from "@prisma/client";

/**
 * Подхватываем .env даже если `next dev` запущен из родительской папки (не из DreamDesk).
 * Системный DATABASE_URL в Windows не должен перетирать значения из файла.
 */
function loadEnvFile() {
  if (typeof process === "undefined") return;
  const cwd = process.cwd();
  const candidates = [
    resolve(cwd, ".env.local"),
    resolve(cwd, ".env"),
    resolve(cwd, "DreamDesk", ".env.local"),
    resolve(cwd, "DreamDesk", ".env"),
  ];
  for (const p of candidates) {
    if (existsSync(p)) {
      config({ path: p, override: true, quiet: true });
      return;
    }
  }
}

loadEnvFile();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

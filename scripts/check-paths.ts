import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const PUBLIC_DIR = path.join(process.cwd(), "public");

async function main() {
  const products = await prisma.product.findMany({
    select: { name: true, imageUrl: true }
  });

  console.log(`Checking ${products.length} products...\n`);

  products.forEach(p => {
    if (!p.imageUrl) {
      console.log(`[EMPTY] ${p.name}`);
      return;
    }

    const fullPath = path.join(PUBLIC_DIR, p.imageUrl);
    const exists = fs.existsSync(fullPath);
    
    if (exists) {
      console.log(`[OK] ${p.name}`);
    } else {
      console.log(`[MISSING] ${p.name}`);
      console.log(`      Found in DB: ${p.imageUrl}`);
      console.log(`      Full path:   ${fullPath}\n`);
    }
  });
}

main().finally(() => prisma.$disconnect());

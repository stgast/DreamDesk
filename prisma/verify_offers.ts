
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function check() {
  const products = await prisma.product.findMany({
    include: {
      _count: {
        select: { storeOffers: true }
      }
    }
  });

  console.log("Product Name | Offers Count");
  console.log("---------------------------");
  products.forEach(p => {
    console.log(`${p.name.padEnd(30)} | ${p._count.storeOffers}`);
  });
}

check().then(() => prisma.$disconnect());

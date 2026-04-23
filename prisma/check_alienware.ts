
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function check() {
  const targetId = "ext-alienware-aw3423dwf";
  const product = await prisma.product.findUnique({
    where: { id: targetId },
    include: { offers: true }
  });

  if (!product) {
    console.log(`Product NOT FOUND: ${targetId}`);
    // Let's find products with similar names
    const similar = await prisma.product.findMany({
      where: { name: { contains: "Alienware" } }
    });
    console.log("Similar products:", similar.map(p => `${p.name} (ID: ${p.id})`));
  } else {
    console.log(`Product: ${product.name}`);
    console.log(`ID: ${product.id}`);
    console.log(`Offers Count: ${product.offers.length}`);
    if (product.offers.length > 0) {
      console.log("First Offer Sample:", JSON.stringify(product.offers[0], null, 2));
    }
  }
}

check().then(() => prisma.$disconnect());

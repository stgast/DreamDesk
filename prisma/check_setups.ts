
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function check() {
  const setups = await prisma.setup.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  setups.forEach(s => {
    console.log(`Setup: ${s.name}`);
    const items = JSON.parse(s.items);
    console.log(`Items in setup:`, items.map((i: any) => `${i.name} (ID: ${i.id})`));
  });
}

check().then(() => prisma.$disconnect());

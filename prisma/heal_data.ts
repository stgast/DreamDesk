
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function heal() {
  console.log("--- Healing Setups and Regenerating Offers ---");

  // 1. Fetch all current products
  const products = await prisma.product.findMany();
  const nameToId = new Map(products.map(p => [p.name, p.id]));

  // 2. Fix Setups
  const setups = await prisma.setup.findMany();
  for (const setup of setups) {
    let items = JSON.parse(setup.items);
    let changed = false;

    items = items.map((item: any) => {
      const stableId = nameToId.get(item.name);
      if (stableId && item.id !== stableId) {
        console.log(`[FIX] Setup "${setup.name}": ${item.name} (${item.id} -> ${stableId})`);
        item.id = stableId;
        changed = true;
      }
      return item;
    });

    if (changed) {
      await prisma.setup.update({
        where: { id: setup.id },
        data: { items: JSON.stringify(items) }
      });
    }
  }

  // 3. Clear and Regenerate Offers (to ensure everything is synced)
  console.log("Clearing old offers...");
  await prisma.priceHistory.deleteMany({});
  await prisma.storeOffer.deleteMany({});

  const stores = [
    {
      name: "Caseking.de",
      logo: "/images/logos/caseking_logo.png",
      color: "#E30613",
      region: "eu",
      official: true,
      shippingFast: true,
      shippingTime: "2-3 дня",
      shippingPrice: 5.95,
      urlTemplate: (name: string) => `https://www.caseking.de/search?sSearch=${encodeURIComponent(name)}`,
    },
    {
      name: "AliExpress",
      logo: "/images/logos/Aliexpress_logo.svg",
      color: "#E62E04",
      region: "china",
      official: false,
      shippingFast: false,
      shippingTime: "15-20 дней",
      shippingPrice: null,
      urlTemplate: (name: string) => `https://www.aliexpress.com/w/wholesale-${encodeURIComponent(name).replace(/%20/g, '-')}.html`,
    },
    {
      name: "eBay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
      color: "#0064D2",
      region: "global",
      official: false,
      shippingFast: false,
      shippingTime: "5-15 дней",
      shippingPrice: 5.95,
      urlTemplate: (name: string) => `https://www.ebay.de/sch/i.html?_nkw=${encodeURIComponent(name)}`,
    },
    {
      name: "Amazon.de",
      logo: "/images/logos/Amazon_Logo_0.svg",
      color: "#FF9900",
      region: "eu",
      official: true,
      shippingFast: true,
      shippingTime: "1-3 дня",
      shippingPrice: null,
      urlTemplate: (name: string) => `https://www.amazon.de/s?k=${encodeURIComponent(name)}`,
    },
  ];

  for (const product of products) {
    console.log(`[+] Generating offers for: ${product.name}`);
    const basePrice = product.price > 1000 ? product.price / 100 : product.price;

    for (const store of stores) {
      const currentPrice = Math.round(basePrice * (0.9 + Math.random() * 0.2));
      const oldPrice = Math.random() > 0.5 ? Math.round(currentPrice * (1.1 + Math.random() * 0.15)) : null;

      const offer = await prisma.storeOffer.create({
        data: {
          productId: product.id,
          storeName: store.name,
          storeUrl: store.urlTemplate(product.name),
          storeLogo: store.logo,
          brandColor: store.color,
          region: store.region,
          price: currentPrice,
          oldPrice: oldPrice,
          rating: 4.0 + Math.random() * 1.0,
          reviewCount: Math.floor(100 + Math.random() * 5000),
          status: Math.random() > 0.1 ? "in_stock" : "low_stock",
          isOfficial: store.official,
          shippingPrice: store.shippingPrice,
          shippingTime: store.shippingTime,
          shippingFast: store.shippingFast,
        },
      });

      const historyData = [];
      const now = new Date();
      for (let day = 29; day >= 0; day--) {
        const date = new Date(now);
        date.setDate(date.getDate() - day);
        const fluctuation = 1 + (Math.random() * 0.1 - 0.05);
        const historicalPrice = day === 0 ? currentPrice : Math.round(currentPrice * fluctuation * 100) / 100;
        historyData.push({ offerId: offer.id, price: historicalPrice, date });
      }
      await prisma.priceHistory.createMany({ data: historyData });
    }
  }

  console.log("--- Heal Completed ---");
}

heal().then(() => prisma.$disconnect());

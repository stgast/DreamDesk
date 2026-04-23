// Добавляет предложения магазинов для мышей из add_items.ts
// (Finalmouse UltralightX, WLmouse Beast X Max)

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env"), override: true });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
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

  const extraMice: Record<string, { prices: number[], ratings: number[], reviews: number[] }> = {
    "WLmouse Beast X Max":    { prices: [155, 139, 149, 165], ratings: [4.4, 4.6, 4.3, 4.3], reviews: [420, 890, 310, 380] },
    "Finalmouse UltralightX": { prices: [189, 179, 185, 199], ratings: [4.4, 4.2, 4.1, 4.5], reviews: [2100, 340, 780, 2800] },
  };

  for (const [mouseName, offerData] of Object.entries(extraMice)) {
    const mouseProduct = await prisma.product.findFirst({ where: { name: mouseName } });
    if (!mouseProduct) {
      console.log(`[SKIP] Mouse not found: ${mouseName}`);
      continue;
    }

    // Check if offers already exist
    const existing = await prisma.storeOffer.count({ where: { productId: mouseProduct.id } });
    if (existing > 0) {
      console.log(`[SKIP] Offers already exist for ${mouseName} (${existing} offers)`);
      continue;
    }

    for (let sIdx = 0; sIdx < stores.length; sIdx++) {
      const store = stores[sIdx];
      const currentPrice = offerData.prices[sIdx];
      const oldPrice = Math.round(currentPrice * 1.15 + Math.random() * 10);

      const offer = await prisma.storeOffer.create({
        data: {
          productId: mouseProduct.id,
          storeName: store.name,
          storeUrl: store.urlTemplate(mouseProduct.name),
          storeLogo: store.logo,
          brandColor: store.color,
          region: store.region,
          price: currentPrice,
          oldPrice: oldPrice,
          rating: offerData.ratings[sIdx],
          reviewCount: offerData.reviews[sIdx],
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
        const fluctuation = 1 + (Math.random() * 0.16 - 0.08);
        const historicalPrice = day === 0 ? currentPrice : Math.round(currentPrice * fluctuation * 100) / 100;
        historyData.push({ offerId: offer.id, price: historicalPrice, date });
      }

      await prisma.priceHistory.createMany({ data: historyData });
      console.log(`  [+] ${mouseName} → ${store.name}: €${currentPrice}`);
    }
  }

  console.log("Done!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });

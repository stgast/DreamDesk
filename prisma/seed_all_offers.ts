
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env"), override: true });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("--- Generating Offers for ALL Products ---");

  // 1. Fetch all products
  const products = await prisma.product.findMany();
  console.log(`Found ${products.length} products.`);

  // 2. Define stores (reusing from seed.ts)
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
    // Check if offers already exist (optional, but good for safety)
    const existingCount = await prisma.storeOffer.count({
      where: { productId: product.id }
    });

    if (existingCount > 0) {
      console.log(`[SKIP] ${product.name} already has ${existingCount} offers.`);
      continue;
    }

    console.log(`[+] Generating offers for: ${product.name} (Base Price: ${product.price})`);

    // We assume product.price is in EUR or similar for offer generation (matching seed.ts logic)
    // If it's in RUB (like 89990), we might need to adjust, but let's look at seed.ts again.
    // In seed.ts, products have prices like 34990 (RUB), but miceOfferData has prices like 89 (EUR).
    // The WhereToBuy component handles currency conversion.
    // However, the database 'price' field in StoreOffer seems to be treated as a "store price".
    // Let's check WhereToBuy.tsx line 419: {formatPrice(offer.price / EXCHANGE_RATES.EUR, currency)}
    // This implies offer.price is in a base currency (likely USD or EUR) and then converted.
    
    // Let's check EXCHANGE_RATES in currency.ts
    const basePrice = product.price > 1000 ? product.price / 100 : product.price;

    for (let sIdx = 0; sIdx < stores.length; sIdx++) {
      const store = stores[sIdx];
      
      // Generate a price around the base price
      const currentPrice = Math.round(basePrice * (0.9 + Math.random() * 0.2));
      const oldPrice = Math.random() > 0.5 ? Math.round(currentPrice * (1.1 + Math.random() * 0.15)) : null;
      
      const rating = 4.0 + Math.random() * 1.0;
      const reviews = Math.floor(100 + Math.random() * 5000);

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
          rating: rating,
          reviewCount: reviews,
          status: Math.random() > 0.1 ? "in_stock" : "low_stock",
          isOfficial: store.official,
          shippingPrice: store.shippingPrice,
          shippingTime: store.shippingTime,
          shippingFast: store.shippingFast,
        },
      });

      // History
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

  console.log("--- Finished Generating Offers ---");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

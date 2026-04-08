import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env
config({ path: resolve(process.cwd(), ".env"), override: true });

const prisma = new PrismaClient();

async function main() {
  console.log("--- Starting Database Expansion ---");

  // Helper to fetch category by slug
  const getCat = async (slug: string) => {
    const cat = await prisma.category.findUnique({ where: { slug } });
    if (!cat) throw new Error(`Category not found: ${slug}`);
    return cat.id;
  };

  try {
    const cats = {
      monitors: await getCat("monitors"),
      keyboards: await getCat("keyboards"),
      mice: await getCat("mice"),
      microphones: await getCat("microphones"),
      audioInterfaces: await getCat("audio-interfaces"),
      headphones: await getCat("headphones"),
      arms: await getCat("arms")
    };

    const eliteItems = [
      // === Monitors ===
      {
        name: "Alienware AW3423DWF",
        description: "34\" QD-OLED Curved Gaming Monitor. Infinity contrast, 165Hz, 0.1ms. The ultimate visual experience.",
        price: 89990,
        imageUrl: "https://placehold.co/400x300/00BCD4/ffffff?text=AW3423DWF",
        connectionType: "DisplayPort",
        features: JSON.stringify(["34\"", "QD-OLED", "165Hz", "0.1ms", "HDR True Black 400", "1800R", "99.3% DCI-P3"]),
        weight: 6900,
        categoryId: cats.monitors
      },
      {
        name: "ASUS ROG Swift PG248QP",
        description: "The world's fastest 540Hz E-TN gaming monitor. Esports absolute peak performance.",
        price: 74990,
        imageUrl: "https://placehold.co/400x300/F44336/ffffff?text=ROG+540Hz",
        connectionType: "DisplayPort",
        features: JSON.stringify(["24.1\"", "540Hz O/C", "E-TN", "0.2ms", "G-SYNC", "HDR10", "Reflex Latency"]),
        weight: 5100,
        categoryId: cats.monitors
      },

      // === Keyboards ===
      {
        name: "Wooting 60HE+",
        description: "60% Hall Effect keyboard. Rapid Trigger, 0.1mm actuation, lightning-fast response times.",
        price: 24990,
        imageUrl: "https://placehold.co/400x300/FFC107/ffffff?text=Wooting+60HE",
        connectionType: "USB-C",
        features: JSON.stringify(["60%", "Lekker Switches", "Hall Effect", "Rapid Trigger", "0.1ms", "Hot-swap", "RGB"]),
        weight: 800,
        categoryId: cats.keyboards
      },
      {
        name: "Meletrix Zoom75",
        description: "Premium custom mechanical keyboard. Gasket mount, CNC aluminum, LCD screen module.",
        price: 21990,
        imageUrl: "https://placehold.co/400x300/9C27B0/ffffff?text=Zoom75",
        connectionType: "Wireless",
        features: JSON.stringify(["75%", "Gasket Mount", "CNC Aluminum", "LCD Screen", "Bluetooth 5.0", "Hot-swap", "Flex-cut PCB"]),
        weight: 1800,
        categoryId: cats.keyboards
      },

      // === Mice ===
      {
        name: "WLmouse Beast X Max",
        description: "Ultra-light magnesium alloy mouse. PixArt 3395, 8000Hz polling rate, 42g only.",
        price: 15990,
        imageUrl: "https://placehold.co/400x300/E91E63/ffffff?text=Beast+X+Max",
        connectionType: "Wireless",
        features: JSON.stringify(["26000 DPI", "Magnesium Alloy", "8000Hz", "42g", "PixArt 3395", "Symmetrical"]),
        weight: 42,
        categoryId: cats.mice,
        lengthMm: 126.3, widthMm: 62.1, heightMm: 39.1, humpPercent: 55
      },
      {
        name: "Finalmouse UltralightX",
        description: "Carbon fiber composite gaming mouse. Legendary shape, industry-leading weight.",
        price: 19990,
        imageUrl: "https://placehold.co/400x300/3F51B5/ffffff?text=Finalmouse+ULX",
        connectionType: "Wireless",
        features: JSON.stringify(["26000 DPI", "Carbon Fiber", "8000Hz", "35g", "Custom Sensor", "Holes Design"]),
        weight: 35,
        categoryId: cats.mice,
        lengthMm: 121.0, widthMm: 61.5, heightMm: 37.0, humpPercent: 54
      },

      // === Microphones ===
      {
        name: "BEACN Mic",
        description: "Premium USB dynamic microphone with built-in DSP and studio-grade processing.",
        price: 26990,
        imageUrl: "https://placehold.co/400x300/4CAF50/ffffff?text=BEACN+Mic",
        connectionType: "USB-C",
        features: JSON.stringify(["Dynamic", "On-board DSP", "USB-C", "Cardioid", "RGB Ring", "Studio Processing"]),
        weight: 600,
        categoryId: cats.microphones
      },
      {
        name: "Shure MV7+",
        description: "Hybrid USB/XLR dynamic microphone. Built-in pop filter, touch mute, and auto-leveling.",
        price: 28990,
        imageUrl: "https://placehold.co/400x300/607D8B/ffffff?text=Shure+MV7%2B",
        connectionType: "USB-XLR",
        features: JSON.stringify(["Dynamic", "XLR + USB", "Auto Level", "Digital Pop Filter", "Touch Mute", "App Control"]),
        weight: 550,
        categoryId: cats.microphones
      },

      // === Audio Gear ===
      {
        name: "Elgato Wave XLR",
        description: "Premium USB-C interface for XLR microphones. ClipGuard tech, 75dB gain.",
        price: 15990,
        imageUrl: "https://placehold.co/400x300/009688/ffffff?text=Wave+XLR",
        connectionType: "USB-C",
        features: JSON.stringify(["75dB Gain", "Capacitive Mute", "Low-cut Filter", "ClipGuard", "Custom Wave Link"]),
        weight: 300,
        categoryId: cats.audioInterfaces
      },
      {
        name: "Sennheiser HD 800 S",
        description: "The gold standard of high-end open-back headphones. Massive soundstage, German engineering.",
        price: 149990,
        imageUrl: "https://placehold.co/400x300/795548/ffffff?text=HD+800S",
        connectionType: "6.3mm",
        features: JSON.stringify(["Open-back", "300Ω", "4-51000 Hz", "Aramid fiber", "Handcrafted", "Elite Audio"]),
        weight: 330,
        categoryId: cats.headphones
      }
    ];

    console.log(`Adding ${eliteItems.length} items to database...`);

    for (const item of eliteItems) {
      await prisma.product.upsert({
        where: { id: `ext-${item.name.replace(/\s+/g, '-').toLowerCase()}` },
        update: item,
        create: {
          id: `ext-${item.name.replace(/\s+/g, '-').toLowerCase()}`,
          ...item
        }
      });
      console.log(`[+] Added/Updated: ${item.name}`);
    }

    console.log("\n--- Update Completed Successfully ---");
  } catch (error) {
    console.error("Error updating database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

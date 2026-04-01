import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const img = (type: string, w = 200, h = 150) =>
  `https://placehold.co/${w}x${h}/1e1e1e/2196F3?text=${encodeURIComponent(type)}`;

const devices = [
  // Mice
  { name: "Logitech G Pro X Superlight", type: "mouse", brand: "Logitech", price: 12990, color: "white", imageUrl: img("Mouse"), description: "63г · PixArt HERO 25K · 25600 DPI · Беспроводная" },
  { name: "Razer DeathAdder V3", type: "mouse", brand: "Razer", price: 7990, color: "black", imageUrl: img("Mouse"), description: "59г · Focus Pro 30K · 30000 DPI · Беспроводная" },
  { name: "SteelSeries Rival 5", type: "mouse", brand: "SteelSeries", price: 5490, color: "black", imageUrl: img("Mouse"), description: "85г · TrueMove Air · 18000 DPI · Проводная" },
  { name: "Glorious Model O", type: "mouse", brand: "Glorious", price: 4990, color: "white", imageUrl: img("Mouse"), description: "67г · PixArt PMW3360 · 12000 DPI · Проводная" },
  { name: "Logitech MX Master 3S", type: "mouse", brand: "Logitech", price: 9990, color: "black", imageUrl: img("Mouse"), description: "141г · Darkfield · 8000 DPI · Bluetooth / USB" },
  { name: "Razer Viper V2 Pro", type: "mouse", brand: "Razer", price: 11990, color: "black", imageUrl: img("Mouse"), description: "58г · Focus Pro 30K · 30000 DPI · Беспроводная" },

  // Keyboards
  { name: "Keychron K2", type: "keyboard", brand: "Keychron", price: 8990, color: "black", imageUrl: img("Keyboard"), description: "75% · Gateron Brown · Bluetooth · Hot-Swap" },
  { name: "Keychron K2 White", type: "keyboard", brand: "Keychron", price: 8990, color: "white", imageUrl: img("Keyboard"), description: "75% · Gateron Red · Bluetooth · Hot-Swap" },
  { name: "Razer BlackWidow V3", type: "keyboard", brand: "Razer", price: 12990, color: "black", imageUrl: img("Keyboard"), description: "Full-size · Razer Green · Проводная · RGB" },
  { name: "Logitech G Pro X", type: "keyboard", brand: "Logitech", price: 14990, color: "black", imageUrl: img("Keyboard"), description: "TKL · GX Blue/Brown/Red · Проводная · Hot-Swap" },
  { name: "SteelSeries Apex 7", type: "keyboard", brand: "SteelSeries", price: 11990, color: "black", imageUrl: img("Keyboard"), description: "Full-size · SteelSeries Red · Проводная · OLED" },
  { name: "Keychron Q1", type: "keyboard", brand: "Keychron", price: 15990, color: "black", imageUrl: img("Keyboard"), description: "75% · Gateron Phantom · Проводная · CNC алюминий" },
  { name: "HyperX Alloy Origins", type: "keyboard", brand: "HyperX", price: 8990, color: "black", imageUrl: img("Keyboard"), description: "Full-size · HyperX Red · Проводная · Алюминий" },

  // Headphones
  { name: "HyperX Cloud II", type: "headphones", brand: "HyperX", price: 7990, color: "black", imageUrl: img("Headphones"), description: "Over-ear · 53мм · 7.1 Virtual · 15-25000 Гц" },
  { name: "SteelSeries Arctis 7", type: "headphones", brand: "SteelSeries", price: 12990, color: "black", imageUrl: img("Headphones"), description: "Over-ear · 40мм · 2.4ГГц · 24ч батарея" },
  { name: "Razer Barracuda X", type: "headphones", brand: "Razer", price: 8990, color: "white", imageUrl: img("Headphones"), description: "Over-ear · 40мм · 2.4ГГц / BT · 50ч батарея" },
  { name: "Logitech G733", type: "headphones", brand: "Logitech", price: 9990, color: "white", imageUrl: img("Headphones"), description: "Over-ear · 40мм · LIGHTSPEED · 29ч батарея" },
  { name: "Beyerdynamic DT 770 Pro", type: "headphones", brand: "Beyerdynamic", price: 14990, color: "black", imageUrl: img("Headphones"), description: "Over-ear · 45мм · 250Ω · 5-35000 Гц · Студийные" },
  { name: "Sennheiser HD 560S", type: "headphones", brand: "Sennheiser", price: 17990, color: "black", imageUrl: img("Headphones"), description: "Open-back · 42мм · 120Ω · 6-38000 Гц" },
  { name: "Audio-Technica ATH-M50x", type: "headphones", brand: "Audio-Technica", price: 12990, color: "black", imageUrl: img("Headphones"), description: "Over-ear · 45мм · 38Ω · 15-28000 Гц · Студийные" },

  // Mousepads
  { name: "SteelSeries QcK Heavy", type: "mousepad", brand: "SteelSeries", price: 1990, color: "black", imageUrl: img("Pad"), description: "450x400мм · 6мм · Ткань · Нескользящее основание" },
  { name: "Razer Goliathus Extended", type: "mousepad", brand: "Razer", price: 2990, color: "black", imageUrl: img("Pad"), description: "920x294мм · 3мм · Ткань · Оптимизирован для скорости" },
  { name: "Logitech G640", type: "mousepad", brand: "Logitech", price: 2490, color: "black", imageUrl: img("Pad"), description: "460x400мм · 3мм · Ткань · Для сенсора HERO" },
  { name: "Glorious XXL", type: "mousepad", brand: "Glorious", price: 3490, color: "white", imageUrl: img("Pad"), description: "914x457мм · 3мм · Ткань · Стежок по краям" },
  { name: "HyperX Fury S", type: "mousepad", brand: "HyperX", price: 1790, color: "black", imageUrl: img("Pad"), description: "450x400мм · 3мм · Ткань · Антифрикционная текстура" },
  { name: "Corsair MM350", type: "mousepad", brand: "Corsair", price: 2190, color: "black", imageUrl: img("Pad"), description: "930x400мм · 5мм · Микрофибра · XL Extended" },
  { name: "Razer Firefly V2", type: "mousepad", brand: "Razer", price: 4990, color: "black", imageUrl: img("Pad"), description: "355x255мм · 3мм · Жёсткий · RGB подсветка" },
];

async function main() {
  await prisma.device.deleteMany({});
  for (const d of devices) {
    await prisma.device.create({ data: d });
  }
  console.log("Seeded", devices.length, "devices");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

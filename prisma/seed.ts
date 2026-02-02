import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Placeholder images: placehold.co with type label
const img = (type: string, w = 200, h = 150) =>
  `https://placehold.co/${w}x${h}/242424/6366f1?text=${encodeURIComponent(type)}`;

const devices = [
  { name: "Logitech G Pro X Superlight", type: "mouse", brand: "Logitech", price: 12990, color: "white", imageUrl: img("Mouse") },
  { name: "Razer DeathAdder V3", type: "mouse", brand: "Razer", price: 7990, color: "black", imageUrl: img("Mouse") },
  { name: "SteelSeries Rival 5", type: "mouse", brand: "SteelSeries", price: 5490, color: "black", imageUrl: img("Mouse") },
  { name: "Glorious Model O", type: "mouse", brand: "Glorious", price: 4990, color: "white", imageUrl: img("Mouse") },
  { name: "Logitech MX Master 3S", type: "mouse", brand: "Logitech", price: 9990, color: "black", imageUrl: img("Mouse") },
  { name: "Razer Viper V2 Pro", type: "mouse", brand: "Razer", price: 11990, color: "black", imageUrl: img("Mouse") },
  { name: "Keychron K2", type: "keyboard", brand: "Keychron", price: 8990, color: "black", imageUrl: img("Keyboard") },
  { name: "Keychron K2 White", type: "keyboard", brand: "Keychron", price: 8990, color: "white", imageUrl: img("Keyboard") },
  { name: "Razer BlackWidow V3", type: "keyboard", brand: "Razer", price: 12990, color: "black", imageUrl: img("Keyboard") },
  { name: "Logitech G Pro X", type: "keyboard", brand: "Logitech", price: 14990, color: "black", imageUrl: img("Keyboard") },
  { name: "SteelSeries Apex 7", type: "keyboard", brand: "SteelSeries", price: 11990, color: "black", imageUrl: img("Keyboard") },
  { name: "Keychron Q1", type: "keyboard", brand: "Keychron", price: 15990, color: "black", imageUrl: img("Keyboard") },
  { name: "HyperX Alloy Origins", type: "keyboard", brand: "HyperX", price: 8990, color: "black", imageUrl: img("Keyboard") },
  { name: "HyperX Cloud II", type: "headphones", brand: "HyperX", price: 7990, color: "black", imageUrl: img("Headphones") },
  { name: "SteelSeries Arctis 7", type: "headphones", brand: "SteelSeries", price: 12990, color: "black", imageUrl: img("Headphones") },
  { name: "Razer Barracuda X", type: "headphones", brand: "Razer", price: 8990, color: "white", imageUrl: img("Headphones") },
  { name: "Logitech G733", type: "headphones", brand: "Logitech", price: 9990, color: "white", imageUrl: img("Headphones") },
  { name: "Beyerdynamic DT 770 Pro", type: "headphones", brand: "Beyerdynamic", price: 14990, color: "black", imageUrl: img("Headphones") },
  { name: "Sennheiser HD 560S", type: "headphones", brand: "Sennheiser", price: 17990, color: "black", imageUrl: img("Headphones") },
  { name: "Audio-Technica ATH-M50x", type: "headphones", brand: "Audio-Technica", price: 12990, color: "black", imageUrl: img("Headphones") },
  { name: "SteelSeries QcK Heavy", type: "mousepad", brand: "SteelSeries", price: 1990, color: "black", imageUrl: img("Pad") },
  { name: "Razer Goliathus Extended", type: "mousepad", brand: "Razer", price: 2990, color: "black", imageUrl: img("Pad") },
  { name: "Logitech G640", type: "mousepad", brand: "Logitech", price: 2490, color: "black", imageUrl: img("Pad") },
  { name: "Glorious XXL", type: "mousepad", brand: "Glorious", price: 3490, color: "white", imageUrl: img("Pad") },
  { name: "HyperX Fury S", type: "mousepad", brand: "HyperX", price: 1790, color: "black", imageUrl: img("Pad") },
  { name: "Corsair MM350", type: "mousepad", brand: "Corsair", price: 2190, color: "black", imageUrl: img("Pad") },
  { name: "Razer Firefly V2", type: "mousepad", brand: "Razer", price: 4990, color: "black", imageUrl: img("Pad") },
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

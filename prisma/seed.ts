// ============================================
// DreamDesk — Скрипт заполнения БД стартовыми данными
// Запуск: npm run db:seed
// ============================================

import { config } from "dotenv";
import { resolve } from "path";
// cwd — корень проекта; override — чтобы .env перекрывал устаревший DATABASE_URL в shell
config({ path: resolve(process.cwd(), ".env"), override: true });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Генерация placeholder-изображений
const img = (label: string) =>
  `https://placehold.co/400x300/1e1e1e/2196F3?text=${encodeURIComponent(label)}`;

async function main() {
  console.log("Очистка базы данных...");
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  // ─── Создание категорий ───
  console.log("Создание категорий...");

  const monitors = await prisma.category.create({
    data: { name: "Мониторы", slug: "monitors", icon: "Monitor", order: 1 },
  });

  const arms = await prisma.category.create({
    data: { name: "Кронштейны", slug: "arms", icon: "Grip", order: 2 },
  });

  const keyboards = await prisma.category.create({
    data: { name: "Клавиатуры", slug: "keyboards", icon: "Keyboard", order: 3 },
  });

  const mice = await prisma.category.create({
    data: { name: "Мыши", slug: "mice", icon: "Mouse", order: 4 },
  });

  const microphones = await prisma.category.create({
    data: { name: "Микрофоны", slug: "microphones", icon: "Mic", order: 5 },
  });

  const boomArms = await prisma.category.create({
    data: { name: "Пантографы", slug: "boom-arms", icon: "Antenna", order: 6 },
  });

  const audioInterfaces = await prisma.category.create({
    data: { name: "Звуковые карты", slug: "audio-interfaces", icon: "AudioLines", order: 7 },
  });

  const headphones = await prisma.category.create({
    data: { name: "Наушники", slug: "headphones", icon: "Headphones", order: 8 },
  });

  // ─── Создание товаров ───
  console.log("Создание товаров...");

  // Хелпер: сериализуем features в JSON-строку для SQLite
  const f = (arr: string[]) => JSON.stringify(arr);

  const products = [
    // === Мониторы ===
    {
      name: "LG 27UP850N-W",
      description: "27\" 4K IPS монитор с HDR400 и USB-C (96Вт). Идеален для работы с цветом и программирования.",
      price: 34990,
      imageUrl: img("LG 27UP850N"),
      connectionType: "USB-C",
      features: f(["27\"", "4K UHD", "IPS", "HDR400", "USB-C 96W", "sRGB 99%", "60 Гц"]),
      weight: 6200,
      categoryId: monitors.id,
    },
    {
      name: "Samsung Odyssey G5 27\"",
      description: "27\" QHD VA изогнутый игровой монитор с частотой 165 Гц и поддержкой FreeSync.",
      price: 22990,
      imageUrl: img("Samsung G5"),
      connectionType: "HDMI",
      features: f(["27\"", "QHD 2560x1440", "VA", "165 Гц", "1ms", "FreeSync", "1000R"]),
      weight: 5800,
      categoryId: monitors.id,
    },
    {
      name: "Dell U2723QE",
      description: "27\" 4K IPS Black монитор с USB-C хабом. Профессиональная цветопередача для дизайнеров.",
      price: 49990,
      imageUrl: img("Dell U2723QE"),
      connectionType: "USB-C",
      features: f(["27\"", "4K UHD", "IPS Black", "HDR400", "USB-C 90W", "DCI-P3 98%", "RJ45"]),
      weight: 6800,
      categoryId: monitors.id,
    },

    // === Кронштейны ===
    {
      name: "Ergotron LX Desk Mount",
      description: "Премиальный настольный кронштейн. Выдерживает до 11.3 кг, плавная регулировка высоты.",
      price: 14990,
      imageUrl: img("Ergotron LX"),
      connectionType: "VESA",
      features: f(["До 34\"", "Макс. 11.3 кг", "VESA 100x100", "Газ-лифт", "Алюминий", "Кабель-менеджмент"]),
      weight: 3600,
      categoryId: arms.id,
    },
    {
      name: "HUANUO Dual Monitor Arm",
      description: "Бюджетный двойной кронштейн для двух мониторов до 27\". Газовая пружина.",
      price: 4990,
      imageUrl: img("HUANUO Dual"),
      connectionType: "VESA",
      features: f(["До 27\"", "Макс. 6.5 кг каждый", "VESA 75/100", "Газ-лифт", "Двойной", "C-Clamp"]),
      weight: 4200,
      categoryId: arms.id,
    },

    // === Клавиатуры ===
    {
      name: "Keychron Q1 Pro",
      description: "75% беспроводная механическая клавиатура с QMK/VIA. CNC-алюминиевый корпус, hot-swap.",
      price: 18990,
      imageUrl: img("Keychron Q1 Pro"),
      connectionType: "USB-C",
      features: f(["75%", "Gateron Jupiter Brown", "QMK/VIA", "Bluetooth 5.1", "Hot-Swap", "CNC алюминий", "RGB"]),
      weight: 1700,
      categoryId: keyboards.id,
    },
    {
      name: "Logitech MX Keys S",
      description: "Беспроводная низкопрофильная клавиатура для продуктивности. Smart Actions, подсветка, Flow.",
      price: 12990,
      imageUrl: img("MX Keys S"),
      connectionType: "Wireless",
      features: f(["Full-size", "Низкопрофильная", "Bluetooth + Logi Bolt", "Smart Actions", "Подсветка", "Flow"]),
      weight: 810,
      categoryId: keyboards.id,
    },

    // === Мыши (габариты в мм, вес в г; humpPercent — положение пика корпуса для силуэта) ===
    {
      name: "Logitech MX Master 3S",
      description: "Эргономичная беспроводная мышь для профессионалов. MagSpeed колесо, 8000 DPI, тихие клики.",
      price: 9990,
      imageUrl: img("MX Master 3S"),
      connectionType: "Wireless",
      features: f(["8000 DPI", "Bluetooth + Logi Bolt", "MagSpeed Scroll", "Тихие клики", "USB-C зарядка", "Flow"]),
      weight: 141,
      categoryId: mice.id,
      lengthMm: 126.0,
      widthMm: 84.3,
      heightMm: 51.0,
      humpPercent: 56,
    },
    {
      name: "Razer DeathAdder V3 Pro",
      description: "Ультралёгкая беспроводная игровая мышь. Focus Pro 30K сенсор, эргономичная форма.",
      price: 11990,
      imageUrl: img("DeathAdder V3"),
      connectionType: "Wireless",
      features: f(["30000 DPI", "Focus Pro 30K", "HyperSpeed Wireless", "63г", "90ч батарея", "Эргономичная"]),
      weight: 63,
      categoryId: mice.id,
      lengthMm: 128.0,
      widthMm: 68.0,
      heightMm: 44.0,
      humpPercent: 52,
    },
    {
      name: "Razer Viper V4 Pro",
      description: "Симметричная ультралёгкая мышь. Razer Focus Pro 50K Gen-3, оптические переключатели Gen-4.",
      price: 14990,
      imageUrl: img("Viper V4 Pro"),
      connectionType: "Wireless",
      features: f(["50000 DPI", "Focus Pro 50K Gen-3", "8000 Гц", "49г", "Оптические клики Gen-4", "Симметричная"]),
      weight: 49,
      categoryId: mice.id,
      lengthMm: 127.1,
      widthMm: 63.9,
      heightMm: 39.9,
      humpPercent: 53,
    },
    {
      name: "Logitech G Pro X2 Superstrike",
      description: "Про-мышь Logitech с сенсором HERO 2 и переключателями SUPERSTRIKE.",
      price: 13990,
      imageUrl: img("G Pro X2 SS"),
      connectionType: "Wireless",
      features: f(["44000 DPI", "HERO 2", "8000 Гц", "61г", "SUPERSTRIKE switches", "Симметричная"]),
      weight: 61,
      categoryId: mice.id,
      lengthMm: 125.0,
      widthMm: 63.5,
      heightMm: 40.0,
      humpPercent: 53,
    },
    {
      name: "Hitscan Hyperlight",
      description: "Компактная ультралёгкая мышь. PixArt PAW3395, Omron Optical, 8 кГц.",
      price: 8990,
      imageUrl: img("Hyperlight"),
      connectionType: "Wireless",
      features: f(["26000 DPI", "PAW3395", "8000 Гц", "39г", "Omron Optical 70M", "Симметричная"]),
      weight: 39,
      categoryId: mice.id,
      lengthMm: 118.0,
      widthMm: 61.0,
      heightMm: 38.0,
      humpPercent: 58,
    },

    // === Микрофоны ===
    {
      name: "Fifine AM8 (USB)",
      description: "Динамический USB/XLR микрофон с RGB. Кардиоидная диаграмма, отсечка фонового шума.",
      price: 4990,
      imageUrl: img("Fifine AM8"),
      connectionType: "USB",
      features: f(["Динамический", "USB-C + XLR", "Кардиоида", "Мониторинг", "RGB", "Mute-кнопка"]),
      weight: 540,
      categoryId: microphones.id,
    },
    {
      name: "Shure SM7B",
      description: "Легендарный динамический XLR-микрофон для подкастов и стриминга. Требует предусилитель или аудиоинтерфейс.",
      price: 39990,
      imageUrl: img("Shure SM7B"),
      connectionType: "XLR",
      features: f(["Динамический", "Только XLR", "Кардиоида", "50-20000 Гц", "Встроенный поп-фильтр", "Broadcast"]),
      weight: 766,
      categoryId: microphones.id,
    },
    {
      name: "Blue Yeti X",
      description: "Конденсаторный USB-микрофон с 4 режимами записи. LED-индикатор уровня, Blue VO!CE.",
      price: 14990,
      imageUrl: img("Blue Yeti X"),
      connectionType: "USB",
      features: f(["Конденсаторный", "USB", "4 диаграммы", "LED-метр", "Blue VO!CE", "24bit/48kHz"]),
      weight: 1280,
      categoryId: microphones.id,
    },

    // === Пантографы ===
    {
      name: "RODE PSA1+",
      description: "Профессиональный пантограф для микрофона. Пружинное крепление, поворот 360°, тихая работа.",
      price: 11990,
      imageUrl: img("RODE PSA1+"),
      connectionType: "Крепление 3/8\" и 5/8\"",
      features: f(["До 1.2 кг", "Пружинный", "360° поворот", "Кабель-канал", "Настольный зажим", "Тихие шарниры"]),
      weight: 900,
      categoryId: boomArms.id,
    },
    {
      name: "Fifine BM63",
      description: "Бюджетный пантограф с низкопрофильным дизайном. Подходит для большинства USB-микрофонов.",
      price: 2990,
      imageUrl: img("Fifine BM63"),
      connectionType: "Крепление 3/8\" и 5/8\"",
      features: f(["До 1 кг", "Низкопрофильный", "Кабель-канал", "C-Clamp", "Пружинный"]),
      weight: 680,
      categoryId: boomArms.id,
    },

    // === Звуковые карты (Audio Interface) ===
    {
      name: "Focusrite Scarlett Solo 4th Gen",
      description: "Компактный USB-C аудиоинтерфейс. Один XLR вход с предусилителем, 192 кГц. Обязателен для XLR-микрофонов.",
      price: 11990,
      imageUrl: img("Scarlett Solo"),
      connectionType: "USB-C",
      features: f(["1x XLR вход", "1x Instrument", "USB-C", "192 kHz / 24-bit", "Air Mode", "+48V Phantom"]),
      weight: 340,
      categoryId: audioInterfaces.id,
    },
    {
      name: "MOTU M2",
      description: "Профессиональный аудиоинтерфейс с ESS Sabre DAC. Отличное качество АЦП/ЦАП, LCD-дисплей.",
      price: 19990,
      imageUrl: img("MOTU M2"),
      connectionType: "USB-C",
      features: f(["2x XLR/TRS", "USB-C", "192 kHz / 32-bit", "ESS DAC", "LCD-метр", "+48V Phantom", "Loopback"]),
      weight: 530,
      categoryId: audioInterfaces.id,
    },

    // === Наушники ===
    {
      name: "Sony WH-1000XM5",
      description: "Премиальные беспроводные наушники с лучшим ANC в классе. 30ч батарея, мультипоинт.",
      price: 29990,
      imageUrl: img("Sony XM5"),
      connectionType: "Wireless",
      features: f(["ANC", "Bluetooth 5.2", "LDAC", "30ч батарея", "Мультипоинт", "Speak-to-Chat"]),
      weight: 250,
      categoryId: headphones.id,
    },
    {
      name: "Beyerdynamic DT 770 Pro (80Ω)",
      description: "Студийные закрытые наушники. Мягкие велюровые амбушюры, отличная звукоизоляция.",
      price: 14990,
      imageUrl: img("DT 770 Pro"),
      connectionType: "3.5mm",
      features: f(["Закрытые", "80Ω", "5-35000 Гц", "Велюр", "Coiled кабель", "Студийные"]),
      weight: 270,
      categoryId: headphones.id,
    },
    {
      name: "HyperX Cloud III Wireless",
      description: "Беспроводная игровая гарнитура. DTS:X Spatial Audio, 120ч батарея, съёмный микрофон.",
      price: 11990,
      imageUrl: img("Cloud III"),
      connectionType: "Wireless",
      features: f(["2.4 ГГц", "DTS:X", "120ч батарея", "53мм драйверы", "Съёмный микрофон", "USB-C"]),
      weight: 330,
      categoryId: headphones.id,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`Создано ${products.length} товаров в ${8} категориях`);
  console.log("Seed завершён!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("Ошибка seed:", e);
    prisma.$disconnect();
    process.exit(1);
  });

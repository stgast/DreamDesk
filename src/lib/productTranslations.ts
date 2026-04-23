
import { Language } from "@/types";

/**
 * Словарь для перевода технических характеристик и часто встречающихся фраз в описании
 */
const PRODUCT_DATA_TRANSLATIONS: Record<string, Record<Language, string>> = {
  // --- Общие термины ---
  "Конденсаторный": {
    RU: "Конденсаторный",
    EN: "Condenser",
    UK: "Конденсаторний",
    PL: "Pojemnościowy"
  },
  "Динамический": {
    RU: "Динамический",
    EN: "Dynamic",
    UK: "Динамічний",
    PL: "Dynamiczny"
  },
  "USB": {
    RU: "USB",
    EN: "USB",
    UK: "USB",
    PL: "USB"
  },
  "XLR": {
    RU: "XLR",
    EN: "XLR",
    UK: "XLR",
    PL: "XLR"
  },
  "Беспроводная": {
    RU: "Беспроводная",
    EN: "Wireless",
    UK: "Бездротова",
    PL: "Bezprzewodowa"
  },
  "Механическая": {
    RU: "Механическая",
    EN: "Mechanical",
    UK: "Механічна",
    PL: "Mechaniczna"
  },
  "Игровая": {
    RU: "Игровая",
    EN: "Gaming",
    UK: "Ігрова",
    PL: "Gamingowa"
  },
  "Проводная": {
    RU: "Проводная",
    EN: "Wired",
    UK: "Дротова",
    PL: "Przewodowa"
  },
  "Bluetooth": {
    RU: "Bluetooth",
    EN: "Bluetooth",
    UK: "Bluetooth",
    PL: "Bluetooth"
  },
  "Радиоканал": {
    RU: "Радиоканал",
    EN: "2.4GHz Wireless",
    UK: "Радіоканал",
    PL: "Radiowe 2.4GHz"
  },
  "Подсветка RGB": {
    RU: "Подсветка RGB",
    EN: "RGB Backlight",
    UK: "Підсвічування RGB",
    PL: "Podświetlenie RGB"
  },
  "Хот-свап": {
    RU: "Хот-свап",
    EN: "Hot-swap",
    UK: "Хот-свап",
    PL: "Hot-swap"
  },
  "4 диаграммы": {
    RU: "4 диаграммы",
    EN: "4 polar patterns",
    UK: "4 діаграми",
    PL: "4 charakterystyki"
  },
  "LED-метр": {
    RU: "LED-метр",
    EN: "LED meter",
    UK: "LED-метр",
    PL: "Miernik LED"
  },
  "24bit/48kHz": {
    RU: "24bit/48kHz",
    EN: "24-bit/48kHz",
    UK: "24bit/48kHz",
    PL: "24bit/48kHz"
  },

  // --- Описания (приблизительные совпадения) ---
  "Конденсаторный USB-микрофон с 4 режимами записи. LED-индикатор уровня, Blue VO!CE.": {
    RU: "Конденсаторный USB-микрофон с 4 режимами записи. LED-индикатор уровня, Blue VO!CE.",
    EN: "Condenser USB microphone with 4 recording modes. LED level indicator, Blue VO!CE.",
    UK: "Конденсаторний USB-мікрофон з 4 режимами запису. LED-індикатор рівня, Blue VO!CE.",
    PL: "Mikrofon pojemnościowy USB z 4 trybami nagrywania. Wskaźnik poziomu LED, Blue VO!CE."
  },
  "Профессиональная игровая мышь с сенсором нового поколения.": {
    RU: "Профессиональная игровая мышь с сенсором нового поколения.",
    EN: "Professional gaming mouse with a next-gen sensor.",
    UK: "Професійна ігрова миша з сенсором нового покоління.",
    PL: "Profesjonalna mysz gamingowa z sensorem nowej generacji."
  },
  "Компактная механическая клавиатура с RGB подсветкой.": {
    RU: "Компактная механическая клавиатура с RGB подсветкой.",
    EN: "Compact mechanical keyboard with RGB lighting.",
    UK: "Компактна механічна клавіатура з RGB підсвічуванням.",
    PL: "Kompaktowa klawiatura mechaniczna z podświetleniem RGB."
  }
};

/**
 * Переводит текст (фичу или описание), если он есть в словаре.
 * Если нет - возвращает оригинал.
 */
export function translateProductData(text: string, lang: Language): string {
  if (!text) return text;
  
  // Ищем точное совпадение
  if (PRODUCT_DATA_TRANSLATIONS[text]) {
    return PRODUCT_DATA_TRANSLATIONS[text][lang] || text;
  }

  // Если это список через запятую (часто для фич), пробуем перевести по частям
  if (text.includes(", ")) {
    return text
      .split(", ")
      .map(part => PRODUCT_DATA_TRANSLATIONS[part] ? PRODUCT_DATA_TRANSLATIONS[part][lang] : part)
      .join(", ");
  }

  return text;
}

// ============================================
// DreamDesk — API Route: AI-ассистент (Google Gemini)
// POST /api/chat
// ============================================
// Для работы укажите GEMINI_API_KEY в файле .env:
// GEMINI_API_KEY="ваш_ключ_от_Google_AI_Studio"
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Системный промпт — роль и правила поведения ИИ
const SYSTEM_PROMPT = `Ты — DreamDesk AI, эксперт по эргономике и сборке рабочего места.
Ты помогаешь пользователю собрать идеальный desk setup из периферии.

ТВОИ ОБЯЗАННОСТИ:
1. Анализируй текущую сборку пользователя и давай рекомендации.
2. ОБЯЗАТЕЛЬНО предупреждай о проблемах совместимости:
   - Если в сборке есть микрофон с connectionType "XLR", но НЕТ категории "Звуковые карты" (Audio Interface) — ПРЕДУПРЕДИ, что XLR-микрофон не будет работать без аудиоинтерфейса.
   - Если выбран тяжёлый монитор (weight > 6000г), предложи надёжный кронштейн (например, Ergotron LX).
   - Если в сборке есть кронштейн с ограничением по весу, а монитор тяжелее — предупреди.
   - Если выбраны проводные наушники (3.5mm), а в сборке есть аудиоинтерфейс — предложи подключить через него для лучшего звука.
3. Оценивай общий бюджет и предлагай альтернативы, если сборка слишком дорогая.
4. Отвечай кратко, по существу, структурированно. Используй эмодзи для важных предупреждений: ⚠️ для проблем, ✅ для ОК, 💡 для советов.
5. Всегда отвечай на русском языке.

ФОРМАТ ОТВЕТА:
- Если пользователь просит оценить сборку — дай структурированный обзор по каждой категории.
- Если спрашивает совет — дай конкретную рекомендацию с указанием товара.
- Всегда проверяй совместимость подключений (USB, XLR, HDMI, Wireless).`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY не настроен в .env" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages, currentSetup } = body as {
      messages: Array<{ role: "user" | "assistant"; content: string }>;
      currentSetup: Array<{
        name: string;
        category: string;
        price: number;
        connectionType: string;
        features: string[];
        weight: number | null;
      }>;
    };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Отсутствует массив messages" },
        { status: 400 }
      );
    }

    // Формируем контекст текущей сборки для ИИ
    let setupContext = "\n\n--- ТЕКУЩАЯ СБОРКА ПОЛЬЗОВАТЕЛЯ ---\n";
    if (currentSetup && currentSetup.length > 0) {
      for (const item of currentSetup) {
        setupContext += `• [${item.category}] ${item.name} — ${item.price.toLocaleString("ru-RU")} ₽ | Подключение: ${item.connectionType} | Характеристики: ${item.features.join(", ")}`;
        if (item.weight) setupContext += ` | Вес: ${item.weight}г`;
        setupContext += "\n";
      }
      const total = currentSetup.reduce((s, i) => s + i.price, 0);
      setupContext += `\nИТОГО: ${total.toLocaleString("ru-RU")} ₽`;
    } else {
      setupContext += "Сборка пуста — пользователь ещё не добавил товары.";
    }

    // Инициализация Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Конвертируем историю сообщений в формат Gemini
    const chatHistory = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Последнее сообщение пользователя + контекст сборки
    const lastMessage = messages[messages.length - 1];
    const userPrompt = `${SYSTEM_PROMPT}${setupContext}\n\n--- СООБЩЕНИЕ ПОЛЬЗОВАТЕЛЯ ---\n${lastMessage.content}`;

    // Запрос к Gemini
    const chat = model.startChat({
      history: chatHistory.length > 0 ? chatHistory : undefined,
    });

    const result = await chat.sendMessage(userPrompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Ошибка Gemini API:", error);
    return NextResponse.json(
      { error: "Ошибка при обращении к AI. Проверьте GEMINI_API_KEY." },
      { status: 500 }
    );
  }
}

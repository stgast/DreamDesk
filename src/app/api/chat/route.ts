import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Инициализируем клиент Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, currentSetup } = await req.json();

    // 1. Формируем описание текущей сборки для контекста ИИ
    const setupDescription = currentSetup.length > 0 
      ? currentSetup.map((item: any) => `- ${item.category?.name || 'Товар'}: ${item.name} (${item.connectionType || 'не указан'})`).join('\n')
      : 'Сборка пока пуста.';

    // 2. Системный промпт (инструкция для ИИ)
    const systemPrompt = `
      Ты — DreamDesk AI, эксперт по сборке идеальных рабочих мест и эргономике.
      Твоя задача — помогать пользователю собрать сетап мечты.
      
      ТЕКУЩАЯ СБОРКА ПОЛЬЗОВАТЕЛЯ:
      ${setupDescription}

      ПРАВИЛА ПРОВЕРКИ СОВМЕСТИМОСТИ (ОБЯЗАТЕЛЬНО):
      1. Если в сборке есть микрофон с типом подключения "XLR", а "Звуковой карты" (Audio Interface) НЕТ — обязательно скажи об этом. Без неё микрофон не заработает.
      2. Если выбрано более одного монитора, посоветуй проверить, выдержит ли видеокарта или кронштейн.
      3. Если сборка дорогая, похвали вкус пользователя.
      
      Будь вежливым, профессиональным и давай короткие, но полезные советы по эргономике. Отвечай на русском языке.
    `;

    // 3. Запрос к нейросети Llama 3 (через Groq)
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content,
        })),
      ],
      model: 'llama-3.1-8b-instant', // Используем быструю и точную модель
      temperature: 0.7,
      max_tokens: 1024,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || 'Извини, я не смог придумать ответ.';

    return NextResponse.json({ message: aiResponse, content: aiResponse });

  } catch (error: any) {
    console.error('Ошибка Groq API:', error);
    return NextResponse.json(
      { error: error.message || 'Произошла ошибка при обращении к ИИ.' }, 
      { status: 500 }
    );
  }
}
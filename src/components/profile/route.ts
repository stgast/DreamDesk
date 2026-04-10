import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { prisma } from '@/lib/prisma';
import { formatPrice, EXCHANGE_RATES } from '@/lib/currency';
import { Currency } from '@/types';


// Инициализируем клиент Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { messages, currentSetup, userSetups, targetSetup, userCurrency: rawCurrency } = await req.json();
        const userCurrency = (rawCurrency || 'RUB') as Currency;

        // 1. Формируем описание текущей сборки для контекста ИИ (Конфигуратор)
        const currentSetupTotal = currentSetup.reduce((sum: number, item: any) => sum + (item.price || 0), 0);
        const setupDescription = currentSetup.length > 0
            ? currentSetup.map((item: any) => `- ${item.category || 'Товар'}: ${item.name} (${item.connectionType || 'не указан'}) — ${formatPrice(item.price || 0, userCurrency)}`).join('\n') + `\n\nИтоговая стоимость текущей сборки (в конфигураторе): ${formatPrice(currentSetupTotal, userCurrency)}`
            : 'Текущая сборка (в конфигураторе) пока пуста.';

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
      
      ВАЖНО: Пользователь использует валюту ${userCurrency}. Все упоминания стоимости, цен и бюджетов должны быть строго в валюте ${userCurrency}.
      
      Будь вежливым, профессиональным и давай короткие, но полезные советы по эргономике. Отвечай на русском языке.
    `;

        // 2.1. Логика для оценки сборок из профиля
        let extraContext = "";
        if (userSetups) {
            if (userSetups.length === 0) {
                extraContext = `
          ИНСТРУКЦИЯ: Пользователь нажал "Оцени мою сборку", но у него в профиле 0 сборок.
          Ответь, что у него пока нет сохраненных сборок в профиле, и предложи собрать что-нибудь в конфигураторе.
        `;
            } else {
                const last5 = [...userSetups].reverse().slice(0, 5);
                const listStr = last5.map((s: any) => `- ${s.name}`).join('\n');
                const hasMore = userSetups.length > 5;

                extraContext = `
          ИНСТРУКЦИЯ: Пользователь хочет оценить сборку из своего профиля. 
          ВАЖНО: Игнорируй "ТЕКУЩУЮ СБОРКУ ПОЛЬЗОВАТЕЛЯ" (которая в конфигураторе), она сейчас не важна. Не перечисляй её содержимое.
          
          Всего у пользователя ${userSetups.length} сборок в профиле.
          Спроси его: "Какую сборку вы хотите чтобы я оценил?" 
          Затем выведи список из последних 5 сохраненных сборок:
          ${listStr}
          
          ${hasMore ? 'ОБЯЗАТЕЛЬНО добавь в конце: "Если вам нужно уточнение по определенной сборке — пожалуйста, дайте название вашей сборки."' : ''}
          
          БОЛЬШЕ НИЧЕГО НЕ ПИШИ. Только вопрос и список сборок из ПРОФИЛЯ.
        `;
            }
        }

        // 2.2. Логика для оценки ПЕРЕДАННОЙ сборки
        if (targetSetup) {
            const itemsList = targetSetup.items.map((item: any) =>
                `- **${item.category || item.categoryName || 'Товар'}**: ${item.name} (${item.connectionType || 'не указан'}) - ${formatPrice(item.price || 0, userCurrency)}`
            ).join('\n');

            extraContext = `
        ИНСТРУКЦИЯ: Пользователь выбрал конкретную сборку для аудита: "${targetSetup.name}".
        
        СПИСОК КОМПОНЕНТОВ:
        ${itemsList}
        СТОИМОСТЬ: ${formatPrice(targetSetup.totalPrice, userCurrency)}.

        ПОВЕДЕНИЕ: Проведи полный аудит этой сборки. Проверь совместимость, дай советы по улучшению и оцени общую эстетику и функциональность.
        Отвечай строго в валюте ${userCurrency}.
        `;
        }

        // 3. Вызов ИИ
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                ...(extraContext ? [{ role: "system", content: extraContext }] : []),
                ...messages.map((m: any) => ({
                    role: m.role,
                    content: m.content
                }))
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.7,
        });

        const aiMessage = completion.choices[0]?.message?.content || "Извините, не удалось получить ответ от ассистента.";

        return NextResponse.json({ 
            message: aiMessage,
            content: aiMessage 
        });

    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}

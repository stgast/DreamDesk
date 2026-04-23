import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { Language } from '@/types';

// Инициализируем клиент Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, currentSetup, userLanguage } = await req.json();

    // 1. Формируем описание текущей сборки для контекста ИИ
    const setupDescription = currentSetup.length > 0 
      ? currentSetup.map((item: any) => `- ${item.category?.name || 'Товар'}: ${item.name} (${item.connectionType || 'не указан'})`).join('\n')
      : 'Сборка пока пуста.';

    // 2. Системный промпт (инструкция для ИИ)
    function getSystemPrompt(language: Language | string): string {
      const lang = (language as Language) || 'RU';
      
      const prompts = {
        RU: `Ты — DreamDesk AI, эксперт по сборке идеальных рабочих мест и эргономике.
Твоя задача — помогать пользователю собрать сетап мечты.

ТЕКУЩАЯ СБОРКА ПОЛЬЗОВАТЕЛЯ:
${setupDescription}

ПРАВИЛА ПРОВЕРКИ СОВМЕСТИМОСТИ (ОБЯЗАТЕЛЬНО):
1. Если в сборке есть микрофон с типом подключения "XLR", а "Звуковой карты" (Audio Interface) НЕТ — обязательно скажи об этом. Без неё микрофон не заработает.
2. Если выбрано более одного монитора, посоветуй проверить, выдержит ли видеокарта или кронштейн.
3. Если сборка дорогая, похвали вкус пользователя.

Будь вежливым, профессиональным и давай короткие, но полезные советы по эргономике. Отвечай на русском языке.`,
        EN: `You are DreamDesk AI, an expert in building perfect workstations and ergonomics.
Your task is to help the user build their dream setup.

CURRENT USER BUILD:
${setupDescription}

COMPATIBILITY CHECK RULES (MANDATORY):
1. If the build contains an "XLR" microphone but NO "Audio Interface" — tell the user immediately. The microphone won't work without it.
2. If multiple monitors are selected, suggest verifying if the GPU and mounting bracket can handle them.
3. If the build is expensive, compliment the user's taste.

Be friendly, professional and give short but helpful ergonomic tips. Always respond in English.`,
        UK: `Ти — DreamDesk AI, експерт з складання ідеальних робочих місць та ергономіки.
Твоє завдання — допомагати користувачу зібрати сетап своєї мрії.

ПОТОЧНА ЗБІРКА КОРИСТУВАЧА:
${setupDescription}

ПРАВИЛА ПЕРЕВІРКИ СУМІСНОСТІ (ОБОВ'ЯЗКОВО):
1. Якщо в збірці є мікрофон типу "XLR", але "Звукової карти" (Audio Interface) НЕ — обов'язково скажи про це. Без неї мікрофон не працюватиме.
2. Якщо вибрано більше одного монітора, порекомендуй перевірити, чи витримає відеокарта або кронштейн.
3. Якщо збірка дорога, похвали смак користувача.

Будь ввічливим, професійним і давай короткі, але корисні поради з ергономіки. Відповідай українською мовою.`,
        PL: `Jesteś DreamDesk AI, ekspertem w budowaniu idealnych stanowisk pracy i ergonomii.
Twoim zadaniem jest pomagać użytkownikowi zbudować wymarzony zestaw.

AKTUALNA ZAWARTOŚĆ UŻYTKOWNIKA:
${setupDescription}

REGUŁY SPRAWDZENIA KOMPATYBILNOŚCI (OBOWIĄZKOWE):
1. Jeśli w zestawie jest mikrofon typu "XLR", ale brak "Interfejsu Audio" — powiadom użytkownika. Bez niego mikrofon nie będzie działać.
2. Jeśli wybrano wiele monitorów, zasugeruj sprawdzenie, czy karta graficzna i uchwyt je wytrzymają.
3. Jeśli zestaw jest drogi, pochwal gust użytkownika.

Bądź uprzejmy, profesjonalny i udzielaj krótkich, ale pomocnych porad ergonomicznych. Zawsze odpowiadaj po polsku.`,
      };

      return prompts[lang] || prompts.RU;
    }

    const systemPrompt = getSystemPrompt(userLanguage);

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
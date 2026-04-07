# DreamDesk — Умный конфигуратор периферии

**Дипломная работа** — интеллектуальная веб-платформа для подбора и конфигурирования компьютерной периферии с валидацией совместимости и AI-рекомендациями.

## 🎯 Описание

**DreamDesk** — это полнофункциональное веб-приложение для создания идеального рабочего стола, объединяющее:

- 🛠️ **Интерактивный конфигуратор** — сборка сетапа из каталога периферии
- ✅ **Валидация совместимости** — проверка параметров компонентов
- 🤖 **AI-ассистент** — умные рекомендации на основе Groq
- 📊 **Визуальное сравнение** — side-by-side сравнение мышек с 3D визуализацией
- 👤 **Профиль пользователя** — сохранение конфигураций и управление аккаунтом
- 🔐 **Аутентификация** — Google OAuth и локальная регистрация

## 🚀 Быстрый старт

### Требования
- Node.js 18+
- PostgreSQL (рекомендуется Supabase)
- npm/yarn

### Установка

```bash
# Установка зависимостей
npm install

# Создать .env файл (см. .env.example)
cp .env.example .env

# Синхронизировать БД
npx prisma db push

# Запустить dev сервер
npm run dev
```

Приложение будет доступно на **http://localhost:3000**

## 📋 Стек технологий

| Компонент | Технология |
|-----------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Next.js API Routes, TypeScript |
| **БД** | PostgreSQL via Supabase, Prisma ORM |
| **Auth** | NextAuth.js v4 (Google OAuth + Credentials) |
| **AI** | Groq API, Google Generative AI |
| **Стилизация** | Tailwind CSS, Material Design 3 |
| **UI** | Lucide Icons, Framer Motion |

## 📁 Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # REST API маршруты
│   │   ├── auth/          # Аутентификация
│   │   ├── chat/          # AI-чат
│   │   ├── setups/        # CRUD конфигураций
│   │   └── user/          # Профиль
│   ├── build/             # Конфигуратор
│   ├── catalog/           # Каталог периферии
│   ├── compare/           # Сравнение устройств
│   ├── profile/           # Профиль пользователя
│   └── layout.tsx         # Root layout
├── components/            # React компоненты
├── lib/                   # Утилиты и конфигурация
├── context/               # React contexts
└── types/                 # TypeScript типы

prisma/
├── schema.prisma          # Схема БД
└── seed.ts               # Seed данные
```

## ✨ Основные функции

### 1. **Конфигуратор** (`/build`)
- Интерактивная сборка сетапа
- Каталог с фильтрацией
- Расчет стоимости в реальном времени
- Сохранение конфигураций

### 2. **Валидация совместимости**
- Проверка веса и грузоподъемности
- Валидация креплений VESA
- Проверка типов подключения

### 3. **AI-Ассистент**
- Умные рекомендации
- История диалога
- Контекстные предложения

### 4. **Каталог** (`/catalog`)
- Поиск и фильтрация
- Категоризация устройств
- Детальные характеристики

### 5. **Сравнение** (`/compare`)
- Сравнение 2+ устройств
- Выделение различий

### 6. **Профиль** (`/profile`)
- Управление аккаунтом
- Загрузка аватарки
- История конфигураций

## 📚 Документация

- **[SETUP_GUIDE.md](./docs/SETUP_GUIDE.md)** — Полное руководство по установке
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** — Детальная архитектура приложения
- **[API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)** — REST API справочник
- **[FEATURES.md](./docs/FEATURES.md)** — Подробное описание функций

## 🔧 Доступные команды

```bash
npm run dev          # Запуск dev сервера
npm run build        # Построение продакшна
npm run start        # Запуск продакшна
npm run lint         # ESlint проверка
npm run db:generate  # Сгенерировать Prisma Client
npm run db:push      # Синхронизировать схему БД
npm run db:seed      # Запустить seed данные
```

## 🔐 Конфигурация окружения

Создайте файл `.env` с переменными (см. `.env.example`):

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<сгенерируйте строку>

# Google OAuth
GOOGLE_CLIENT_ID=<ваш ID>
GOOGLE_CLIENT_SECRET=<ваш SECRET>

# PostgreSQL
DATABASE_URL=postgresql://user:pass@host:pool/db
DIRECT_URL=postgresql://user:pass@host:5432/db

# AI API
GROQ_API_KEY=<ваш ключ>
```

## 🎨 Дизайн и UI

- Material Design 3 палитра
- Полная отзывчивость (mobile-first)
- Dark mode поддержка
- Smooth анимации (Framer Motion)

## 📖 Страницы маршруты

| Маршрут | Описание |
|---------|---------|
| `/` | Главная страница |
| `/build` | Конфигуратор |
| `/catalog` | Каталог устройств |
| `/compare` | Сравнение периферии |
| `/profile` | Профиль пользователя |
| `/terms` | Условия использования |
| `/privacy` | Политика конфиденциальности |

## 📄 Лицензия

MIT License

---

**Для вопросов и предложений создавайте Issues в репозитории.**

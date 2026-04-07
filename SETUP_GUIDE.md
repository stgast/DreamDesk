# SETUP_GUIDE.md — Полное руководство по установке

## 📦 Системные требования

- **Node.js**: 18.0.0 или выше
- **npm**: 9.0.0 или выше (или yarn 4.0.0+)
- **PostgreSQL**: 14.0+ (используется Supabase)
- **Git**: для клонирования репозитория

Проверить версии:
```bash
node --version
npm --version
```

## 🔧 Пошаговая установка

### Шаг 1: Клонирование репозитория

```bash
git clone https://github.com/your-username/dreamdesk.git
cd dreamdesk
```

### Шаг 2: Установка зависимостей

```bash
npm install
```

Это установит все необходимые пакеты из `package.json`.

### Шаг 3: Конфигурация БД (PostgreSQL/Supabase)

#### Вариант A: Использование Supabase (рекомендуется)

1. Перейти на [supabase.com](https://supabase.com)
2. Создать новый проект
3. Скопировать Connection String (transaction pooler для `DATABASE_URL`)
4. Скопировать Session mode connection (для `DIRECT_URL`)

#### Вариант B: Локальный PostgreSQL

```bash
# На Windows/Mac/Linux установить PostgreSQL
# Создать БД
createdb dreamdesk

# Строка подключения
DATABASE_URL="postgresql://postgres:password@localhost:5432/dreamdesk"
DIRECT_URL="postgresql://postgres:password@localhost:5432/dreamdesk"
```

### Шаг 4: Конфигурация Google OAuth

1. Перейти на [Google Cloud Console](https://console.cloud.google.com/)
2. Создать новый проект
3. Перейти в **OAuth 2.0 Client IDs**
4. Создать Web application credentials
5. Добавить Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (для продакшна)
6. Скопировать Client ID и Client Secret

### Шаг 5: Конфигурация AI API

#### Groq API
1. Перейти на [console.groq.com](https://console.groq.com)
2. Создать API ключ

#### Google Generative AI (опционально)
1. Перейти на [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Создать API ключ

### Шаг 6: Создание .env файла

Создать файл `.env` в корне проекта:

```env
# ============================================
# NextAuth Configuration
# ============================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-random-string-here-at-least-32-chars

# ============================================
# Google OAuth
# ============================================
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# ============================================
# Database
# ============================================
# Для Supabase (pooler для приложения)
DATABASE_URL=postgresql://postgres.xxxxx:password@aws-1-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true
# Для миграций (session mode)
DIRECT_URL=postgresql://postgres.xxxxx:password@aws-1-eu-west-2.pooler.supabase.com:5432/postgres

# ============================================
# AI APIs
# ============================================
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
GOOGLE_GENERATIVE_AI_API_KEY=AIzaXxxxxxxxxxxxxxxxxxxx
```

**⚠️ Важно**: Никогда не коммитьте `.env` в Git. Он уже в `.gitignore`.

### Шаг 7: Инициализация БД

```bash
# Сгенерировать Prisma Client
npm run db:generate

# Синхронизировать схему БД
npm run db:push

# (Опционально) Заполнить тестовыми данными
npm run db:seed
```

### Шаг 8: Запуск приложения

```bash
# Режим разработки
npm run dev
```

Приложение будет доступно на: **http://localhost:3000**

## ✅ Проверка установки

1. Открить http://localhost:3000 в браузере
2. Главная страница должна загрузиться без ошибок
3. Перейти в `/catalog` — должны отобразиться устройства
4. Перейти в `/profile` — должна работать авторизация

## 🚀 Запуск на продакшне

### Построение

```bash
npm run build
npm run start
```

### Деплой на Vercel (рекомендуется для Next.js)

```bash
# Установить Vercel CLI
npm i -g vercel

# Deployать
vercel
```

### Деплой на другие хосты

1. Построить проект: `npm run build`
2. Установить зависимости на сервере
3. Запустить: `npm run start`
4. Использовать PM2 или Systemd для управления процессом

### Переменные окружения на продакшне

```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<длинная-случайная-строка>
# Остальные ключи...
```

## 🐛 Решение проблем

### Ошибка: "Can't find module 'bcryptjs'"

**Решение:**
```bash
npm install
npm run db:generate
```

### Ошибка: "Prisma schema validation error"

**Решение:**
```bash
npx prisma db push --force-reset  # Осторожно, удалит данные!
```

### Ошибка подключения к БД

Проверить:
- `DATABASE_URL` правильная
- PostgreSQL сервер запущен
- IP адрес добавлен в whitelist (Supabase)

### Google OAuth не работает

1. Проверить CLIENT_ID и CLIENT_SECRET
2. Проверить Authorized redirect URIs в Google Console
3. Очистить cookies браузера

## 📚 Дополнительные ресурсы

- [Next.js Документация](https://nextjs.org/docs)
- [Prisma Документация](https://www.prisma.io/docs)
- [NextAuth.js Документация](https://next-auth.js.org)
- [Supabase Dokumentation](https://supabase.com/docs)

## 🆘 Нужна помощь?

- Создать Issue в репозитории
- Проверить логи: `npm run dev` покажет ошибки
- Консоль браузера (F12) — для frontend ошибок

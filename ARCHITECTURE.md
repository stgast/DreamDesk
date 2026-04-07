# ARCHITECTURE.md — Архитектура приложения

## 🏗️ Общая архитектура

```
┌─────────────────────────────────────────────────┐
│           Browser (Next.js Frontend)            │
│  React 18 + TypeScript + Tailwind CSS           │
├─────────────────────────────────────────────────┤
│         HTTP/REST API (Next.js Routes)          │
├─────────────────────────────────────────────────┤
│      Node.js Backend (Next.js API Routes)       │
│  Authentication, Business Logic, AI Integration │
├─────────────────────────────────────────────────┤
│      PostgreSQL Database (Supabase)             │
│  Users, Products, Setups, Sessions              │
├─────────────────────────────────────────────────┤
│       External Services (AI, Auth)              │
│  Google OAuth, Groq API, Google AI              │
└─────────────────────────────────────────────────┘
```

## 📁 Структура исходного кода

### `/src/app` — Next.js App Router

```
app/
├── layout.tsx              # Root layout, Providers
├── page.tsx               # Главная страница (/)
├── globals.css            # Глобальные стили
│
├── build/
│   └── page.tsx           # Конфигуратор (/build)
│
├── catalog/
│   └── page.tsx           # Каталог периферии (/catalog)
│
├── compare/
│   └── page.tsx           # Сравнение устройств (/compare)
│
├── profile/
│   └── page.tsx           # Профиль пользователя (/profile)
│
├── api/
│   ├── auth/
│   │   ├── [...nextauth]/route.ts    # NextAuth callback
│   │   ├── register/route.ts         # POST регистрация
│   │   ├── login/route.ts            # POST вход
│   │   └── me/route.ts              # GET текущий пользователь
│   │
│   ├── chat/
│   │   └── route.ts                 # POST AI-чат
│   │
│   ├── setups/
│   │   ├── route.ts                 # GET/POST конфигурации
│   │   └── [id]/route.ts            # GET/PUT/DELETE конфигурация
│   │
│   └── user/
│       └── avatar/route.ts          # POST аватарка
│
├── terms/
│   └── page.tsx           # Условия использования
│
├── privacy/
│   └── page.tsx           # Политика конфиденциальности
│
└── contact/
    └── page.tsx           # Контакты
```

### `/src/components` — React компоненты

```
components/
├── Header.tsx              # Навигация + аватарка
├── Sidebar.tsx            # Левое меню каталога
├── Configurator.tsx       # Основной конфигуратор
├── AIChatWidget.tsx       # AI-ассистент чат
├── AIChat.tsx             # Chat интерфейс
├── CatalogPage.tsx        # Каталог периферии
├── ProductCard.tsx        # Карточка продукта
├── CompareView.tsx        # Сравнение устройств
├── SetupPanel.tsx         # Панель текущей конфигурации
├── CategoryTabs.tsx       # Табы категорий
└── ParticleBackground.tsx # Фоновая анимация
```

### `/src/lib` — Утилиты и конфигурация

```
lib/
├── auth.ts                # NextAuth конфигурация
├── prisma.ts              # Prisma Client singleton
├── actions.ts             # Server Actions
├── saved-configs.ts       # LocalStorage утилиты
└── mouseShapeSvg.ts       # SVG утилиты
```

### `/src/context` — React Context

```
context/
├── AppContext.tsx         # Глобальное состояние приложения
└── SetupContext.tsx       # Состояние конфигурации
```

### `/src/types` — TypeScript типы

```
types/
└── index.ts               # Все типы приложения
```

### `/prisma` — БД конфигурация

```
prisma/
├── schema.prisma          # Prisma schema (структура БД)
└── seed.ts               # Seed скрипт (тестовые данные)
```

## 🔐 Аутентификация и авторизация

### NextAuth.js Flow

```
User Login
    ↓
[Google OAuth / Credentials]
    ↓
NextAuth Provider Middleware
    ↓
JWT Token / Session
    ↓
Prisma Adapter (Database)
    ↓
User Sessions Table
```

### Таблицы NextAuth

- **User** — основная информация пользователя
- **Account** — связь с провайдерами (Google)
- **Session** — активные сессии
- **VerificationToken** — для email verification

## 📊 Структура данных (Prisma Schema)

### User
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?   // Аватарка (base64)
  password      String?   // Хешированный (только Credentials)
  accounts      Account[]
  sessions      Session[]
  setups        Setup[]
}
```

### Setup (Конфигурация)
```prisma
model Setup {
  id         String
  name       String
  items      String   // JSON: [{ productId, quantity }]
  totalPrice Float
  user       User
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

### Product (Периферия)
```prisma
model Product {
  id             String
  name           String
  price          Float
  description    String?
  imageUrl       String?
  features       String   // JSON
  weight         Float?
  lengthMm       Float?
  widthMm        Float?
  heightMm       Float?
  connectionType String
  categoryId     String
  category       Category
}
```

### Category
```prisma
model Category {
  id       String
  name     String     // "Клавиатуры"
  slug     String     // "keyboards"
  icon     String?    // Иконка Lucide
  products Product[]
}
```

## 🔄 Жизненный цикл запроса

### 1. **Frontend → API**
```
User Action (click button)
  ↓
React Hook (useState, useEffect)
  ↓
Fetch API / Event Handler
  ↓
HTTP Request to /api/...
```

### 2. **Backend Processing**
```
API Route Handler (/api/...)
  ↓
Authentication Check (getServerSession)
  ↓
Business Logic
  ↓
Prisma DB Query
  ↓
Response JSON
```

### 3. **Response**
```
HTTP Response (200/400/500)
  ↓
Frontend Error Boundary
  ↓
UI Update (setState)
  ↓
Re-render Component
```

## 🤖 AI Integration Flow

```
User Message
  ↓
[POST /api/chat]
  ↓
Get User's Current Setup
  ↓
Format Context (selected products)
  ↓
Call Groq API with context
  ↓
Stream Response back
  ↓
Update Chat UI
```

## 🎨 State Management

### Global State (AppContext)
- Current setup items
- User preferences
- UI state (modals, filters)

### Component State (useState)
- Form inputs
- Loading states
- UI toggles

### Server State (Prisma)
- Database persistence
- Session management

## 🔗 API Route Patterns

### Authentication
```
POST /api/auth/register     → Create user account
POST /api/auth/login        → NextAuth Credentials provider
GET  /api/auth/me          → Current user info
```

### Data CRUD
```
GET    /api/setups          → List user's setups
POST   /api/setups          → Create setup
GET    /api/setups/[id]    → Get specific setup
PUT    /api/setups/[id]    → Update setup
DELETE /api/setups/[id]    → Delete setup
```

## 🧪 Безопасность

### CSRF Protection
- NextAuth handles CSRF tokens automatically

### Input Validation
- Server-side validation in API routes
- Prisma schema validation

### Authorization
- Check `session?.user?.id` in API routes
- Middleware checks in NextAuth callback

### Password Security
- Bcryptjs hashing algorithm
- Salt rounds: 10

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic per-route splitting
- **Lazy Loading**: Dynamic imports for heavy components
- **Caching**: Prisma default caching
- **Database Indexing**: Fields in schema

## 📦 Dependencies Overview

### Core
- `next` — React framework
- `react` — UI library
- `typescript` — Type safety

### Database
- `@prisma/client` — ORM
- `prisma` — CLI & migration tool

### Authentication
- `next-auth` — Session management
- `@next-auth/prisma-adapter` — DB adapter
- `bcryptjs` — Password hashing

### UI
- `tailwindcss` — CSS framework
- `framer-motion` — Animations
- `lucide-react` — Icons

### AI
- `groq-sdk` — Groq API client
- `@google/generative-ai` — Google AI

### Utilities
- `dotenv` — Environment variables
- `clsx` — Class name utilities

## 🔄 Deployment Architecture

```
GitHub Repository
    ↓
[Push to main]
    ↓
Vercel CI/CD
    ↓
[Build: npm run build]
    ↓
[Deploy]
    ↓
Live Application
```

## 📊 Database Schema Diagram

```
User ──┬─→ Account (Google OAuth)
       │
       ├─→ Session (NextAuth)
       │
       └─→ Setup
             │
             └─→ Product ──→ Category
```

## 🔐 Flow безопасности логин-пароль

```
User Input (email, password)
    ↓
[POST /api/auth/register]
    ↓
Validate Input
    ↓
Check email unique
    ↓
Hash password (bcryptjs)
    ↓
Save to Database
    ↓
Return success/error
    ↓
Auto-login (signIn function)
```

## 📈 Масштабирование

### Текущее состояние
- Single PostgreSQL instance
- Prisma with default caching
- Vercel serverless functions

### Будущие улучшения
- Redis cache layer
- CDN for static assets
- Database replication
- Load balancing

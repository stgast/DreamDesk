# DreamDesk

Интерактивная веб-приложение для проектирования рабочего места: каталог периферии (мышь, клавиатура, наушники, коврик), виртуальный стол (вид сверху и под углом), AI-рекомендации, сохранение и экспорт конфигурации.

## Стек

- **Next.js 14** (App Router), TypeScript, Tailwind CSS
- **Prisma** + SQLite
- Модуль рекомендаций на основе предпочтений (хват мыши, тип наушников, размер стола, бюджет)

## Запуск

```bash
# Установка зависимостей
npm install

# Генерация Prisma Client и создание БД
npx prisma generate
npx prisma db push

# Заполнение каталога тестовыми устройствами
npm run db:seed

# Режим разработки
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

## Страницы

- **/** — главная, быстрый старт
- **/catalog** — каталог устройств с фильтрами (тип, бренд, цвет, цена)
- **/build** — виртуальный стол: добавление устройств, перетаскивание, вид сверху/под углом, сохранение и экспорт конфигурации
- **/ai** — AI-рекомендации по предпочтениям

## API

- `GET /api/devices` — список устройств (query: type, brand, color, minPrice, maxPrice)
- `POST /api/devices` — добавление устройства
- `GET /api/configurations` — список сохранённых конфигураций
- `POST /api/configurations` — сохранение конфигурации (name, deviceIds, layout)
- `POST /api/recommendations` — рекомендации по предпочтениям (mouseGrip, headphoneType, deskSize, budget)

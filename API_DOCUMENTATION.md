# API_DOCUMENTATION.md — Полный справочник REST API

## 🔑 Общая информация

- **Base URL**: `http://localhost:3000/api` (dev) или `https://yourdomain.com/api` (production)
- **Format**: JSON
- **Authentication**: NextAuth Session (cookies)

## 🔐 Authentication Endpoints

### POST /auth/register
Создать новый аккаунт

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"  // optional
}
```

**Response (200):**
```json
{
  "success": true,
  "userId": "cuid_12345",
  "email": "user@example.com"
}
```

**Errors:**
- `400` — Email already exists
- `400` — Validation error (weak password)

---

### POST /auth/login
Вход (используется NextAuth Credentials provider)

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "ok": true,
  "status": 200
}
```

**Errors:**
- `401` — Invalid credentials

---

### GET /auth/me
Получить информацию о текущем пользователе

**Response (200):**
```json
{
  "user": {
    "id": "cuid_12345",
    "email": "user@example.com",
    "name": "John Doe",
    "image": "data:image/jpeg;base64,..."
  },
  "session": {
    "expires": "2026-04-10T12:00:00Z"
  }
}
```

**Errors:**
- `401` — Not authenticated

---

### GET /auth/session
Получить текущую сессию (NextAuth)

**Response:**
```json
{
  "user": {
    "id": "cuid_12345",
    "email": "user@example.com",
    "name": "John Doe",
    "image": "..."
  },
  "expires": "2026-04-10T12:00:00Z"
}
```

## 📦 Setup (Конфигурация) Endpoints

### GET /setups
Получить все конфигурации текущего пользователя

**Query Parameters:**
- `limit` (number, default: 20) — Количество результатов
- `skip` (number, default: 0) — Смещение

**Response (200):**
```json
{
  "setups": [
    {
      "id": "cuid_setup_1",
      "name": "Моя первая конфигурация",
      "items": "[{\"productId\": \"prod_1\", \"quantity\": 1}]",
      "totalPrice": 25999.99,
      "createdAt": "2026-03-15T10:30:00Z",
      "updatedAt": "2026-04-01T15:45:00Z"
    }
  ],
  "total": 1
}
```

**Errors:**
- `401` — Not authenticated

---

### POST /setups
Создать новую конфигурацию

**Request:**
```json
{
  "name": "Gaming Setup",
  "items": [
    {
      "productId": "prod_keyboard_1",
      "quantity": 1
    },
    {
      "productId": "prod_mouse_1",
      "quantity": 1
    }
  ],
  "totalPrice": 15999.50
}
```

**Response (201):**
```json
{
  "id": "cuid_setup_new",
  "name": "Gaming Setup",
  "items": "[...]",
  "totalPrice": 15999.50,
  "createdAt": "2026-04-05T12:00:00Z"
}
```

**Errors:**
- `400` — Validation error
- `401` — Not authenticated

---

### GET /setups/[id]
Получить конкретную конфигурацию

**Response (200):**
```json
{
  "id": "cuid_setup_1",
  "name": "My Setup",
  "items": "[{\"productId\": \"prod_1\"}]",
  "totalPrice": 25999.99,
  "createdAt": "2026-03-15T10:30:00Z",
  "userId": "cuid_user_1"
}
```

**Errors:**
- `404` — Setup not found
- `401` — Not authenticated

---

### PUT /setups/[id]
Обновить конфигурацию

**Request:**
```json
{
  "name": "Updated Setup Name",
  "items": "[...]",
  "totalPrice": 30000.00
}
```

**Response (200):**
```json
{
  "id": "cuid_setup_1",
  "name": "Updated Setup Name",
  "items": "[...]",
  "totalPrice": 30000.00,
  "updatedAt": "2026-04-05T14:30:00Z"
}
```

**Errors:**
- `400` — Validation error
- `404` — Setup not found
- `401` — Not authenticated

---

### DELETE /setups/[id]
Удалить конфигурацию

**Response (200):**
```json
{
  "success": true,
  "message": "Setup deleted successfully"
}
```

**Errors:**
- `404` — Setup not found
- `401` — Not authenticated

## 💬 Chat (AI Assistant) Endpoints

### POST /chat
Отправить сообщение AI-ассистенту

**Request:**
```json
{
  "message": "Какую клавиатуру порекомендуешь для программирования?",
  "context": {
    "currentSetupItems": [
      {
        "productId": "prod_mouse_1",
        "name": "Logitech MX Master 3S",
        "price": 11999.99
      }
    ],
    "budget": 50000
  }
}
```

**Response (200) — Server-Sent Events:**
```
event: message
data: {"role":"assistant","content":"Я рекомендую..."}

event: message
data: {"role":"assistant","content":" клавиатуру Keychron K8 Pro..."}

event: done
data: {}
```

**Errors:**
- `400` — Missing message
- `401` — Not authenticated
- `503` — AI service unavailable

## 👤 User (Профиль) Endpoints

### POST /user/avatar
Загрузить аватарку

**Request:** (multipart/form-data)
```
Content-Type: multipart/form-data
Content-Disposition: form-data; name="file"; filename="avatar.jpg"
<binary image data>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Avatar uploaded successfully"
}
```

**Errors:**
- `400` — File too large (max 5MB)
- `400` — Invalid image format
- `401` — Not authenticated

## 📋 Catalog Endpoints (Query через Frontend)

Примечание: Каталог загружается напрямую из Prisma в компонентах, но API можно расширить:

### GET /products (Future)
```json
{
  "products": [
    {
      "id": "prod_1",
      "name": "Механическая клавиатура K380",
      "price": 4999.99,
      "category": "keyboards",
      "features": ["Wireless", "Low-profile"],
      "weight": 495
    }
  ]
}
```

### GET /categories (Future)
```json
{
  "categories": [
    {
      "id": "cat_keyboards",
      "name": "Клавиатуры",
      "slug": "keyboards",
      "icon": "Keyboard"
    }
  ]
}
```

## 🔒 Ошибки (Стандартные коды HTTP)

| Код | Описание |
|-----|---------|
| `200` | OK — успешный запрос |
| `201` | Created — ресурс создан |
| `400` | Bad Request — неверные данные |
| `401` | Unauthorized — требуется авторизация |
| `403` | Forbidden — нет прав доступа |
| `404` | Not Found — ресурс не найден |
| `500` | Internal Server Error — ошибка сервера |
| `503` | Service Unavailable — сервис недоступен |

## 📝 Примеры запросов (cURL)

### Регистрация
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "name": "John Doe"
  }'
```

### Создание конфигурации
```bash
curl -X POST http://localhost:3000/api/setups \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Gaming Setup",
    "items": "[{\"productId\": \"prod_1\", \"quantity\": 1}]",
    "totalPrice": 25999.99
  }'
```

### Отправка сообщения AI
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Какую мышку посоветуешь?"
  }'
```

## 🔄 Rate Limiting (Future)

Планируется добавить:
- 100 запросов в минуту на пользователя
- 1000 запросов в час на IP

## 📊 Pagination

Для endpoint'ов со списками:
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "skip": 0,
    "limit": 20,
    "hasMore": true
  }
}
```

## 🔑 CORS Policy

- Разрешены: GET, POST, PUT, DELETE
- Credentials: включены (cookies)
- Headers: application/json

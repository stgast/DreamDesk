# DreamDesk AI — Twój Osobisty Architekt Stanowiska Marzeń 🚀

**DreamDesk AI** to innowacyjna platforma webowa, która redefiniuje sposób, w jaki projektujemy stanowiska gamingowe i robocze. Dzięki wsparciu sztucznej inteligencji i nowoczesnemu interfejsowi klasy premium, każdy może stworzyć swój idealny setup w kilka minut.

---

## 🌟 Kluczowe Funkcje

### 🤖 Inteligentny Asystent DreamDesk AI
Zintegrowany czat oparty na sztucznej inteligencji, który analizuje Twoje potrzeby i pomaga dobrać idealne komponenty — od monitorów OLED po customowe klawiatury. 

### 💎 Katalog Produktów klasy "Elite"
Wyselekcjonowana baza najlepszych na rynku peryferiów (Alienware, Wooting, Shure, Sennheiser). Każda karta produktu została zaprojektowana z dbałością o detale wizualne:
*   **Studio Lighting**: Radiacyjne gradienty maskujące tła zdjęć dla spójnego wyglądu.
*   **Głębokość**: Realistyczne cienie (`drop-shadow`) omijające kontury przedmiotów.
*   **Animacje Luxury**: Płynne przejścia i interaktywne efekty "wow" przy dodawaniu do koszyka.

### 🇵🇱 Pełna Lokalizacja (PL/PLN)
Projekt w pełni wspiera rynek polski:
*   Interfejs w języku polskim.
*   Dynamiczne przeliczanie walut (obsługa PLN).
*   Formatowanie cen i dat zgodne z polskimi standardami.

### 🛠️ Zaawansowany Konfigurator
*   **Lista porównawcza**: Dodawaj produkty do porównania jednym kliknięciem.
*   **Wishlist**: Zapisuj swoje wymarzone komponenty na później.
*   **Automatyczna weryfikacja**: Database-driven system upewniający się, że każdy element pasuje do Twojej wizji.

---

## 🚀 Technologie

Projekt zbudowany w oparciu o najnowocześniejszy stack technologiczny:
*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Baza danych**: [Supabase](https://supabase.com/) & [Prisma ORM](https://www.prisma.io/)
*   **Stylizacja**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animacje**: [Framer Motion](https://www.framer.com/motion/)
*   **Język**: TypeScript

---

## 🛠️ Instalacja i Uruchomienie

1. Sklonuj repozytorium:
```bash
git clone https://github.com/stgast/DreamDesk.git
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Skonfiguruj plik `.env` (DATABASE_URL, DIRECT_URL).

4. Wykonaj migrację i seeding bazy:
```bash
npx prisma migrate dev
npx tsx prisma/add_items.ts
```

5. Uruchom serwer deweloperski:
```bash
npm run dev
```

---

## ✒️ Autor
Twórca i deweloper: **stgast**

Projekt stworzony z pasją do gamingu i nowoczesnego designu UI/UX. 🎮✨

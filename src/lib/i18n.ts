// ============================================
// DreamDesk — Локализация текста интерфейса
// ============================================

import { Language } from "@/types";

type TranslationKey =
  | "account"
  | "email"
  | "logout"
  | "currency"
  | "language"
  | "your_setups"
  | "saved_configs"
  | "saved_configs_hint"
  | "archive"
  | "saved"
  | "devices"
  | "saved_at"
  | "open"
  | "delete"
  | "no_configs"
  | "create_first_setup"
  | "login"
  | "register"
  | "guest_mode_warning"
  | "login_with_google"
  | "or"
  | "password"
  | "repeat_password"
  | "name_optional"
  | "already_have_account"
  | "create_account"
  | "loading"
  | "price"
  | "connection"
  | "dimensions"
  | "total"
  | "save_to_profile"
  | "add_to_setup"
  | "remove"
  | "clear_all"
  | "compare_mice"
  | "search_mice"
  | "no_mice_selected"
  | "select_mice_to_compare"
  | "length_width_height"
  | "weight"
  | "connection_type"
  | "features"
  | "configurator"
  | "catalog"
  | "compare"
  | "profile"
  | "home"
  | "contact"
  | "terms"
  | "privacy"
  | "build_your_setup"
  | "smart_peripheral_configurator"
  | "catalog_description"
  | "new_level"
  | "hero_title"
  | "hero_subtitle"
  | "catalog_devices"
  | "how_it_works"
  | "seamless_process"
  | "intelligent_configurator"
  | "intelligent_configurator_desc"
  | "auto_compatibility"
  | "auto_compatibility_desc"
  | "deep_comparison"
  | "deep_comparison_desc"
  | "keyboards"
  | "keyboards_description"
  | "mice"
  | "mice_description"
  | "audio"
  | "microphones"
  | "why_dreamdesk"
  | "modular_ecosystem"
  | "modular_ecosystem_desc"
  | "instant_validation"
  | "instant_validation_desc"
  | "compatibility"
  | "ready_to_build"
  | "to_configurator"
  | "found_count"
  | "nothing_found"
  | "try_change_filters"
  | "search_placeholder"
  | "all"
  | "category_monitors"
  | "category_arms"
  | "category_keyboards"
  | "category_mice"
  | "category_microphones"
  | "category_boom_arms"
  | "category_audio_interfaces"
  | "category_headphones"
  | "product"
  | "no_image"
  | "description_label"
  | "no_description"
  | "key_features"
  | "replace"
  | "ai_recommendations"
  | "start_building"
  | "features_section"
  | "compatibility_engine"
  | "compatibility_engine_desc"
  | "ai_assistant"
  | "ai_assistant_desc"
  | "visual_comparison"
  | "visual_comparison_desc"
  | "testimonials"
  | "get_started_today";

const translations: Record<Language, Record<TranslationKey, string>> = {
  RU: {
    account: "Аккаунт",
    email: "Email",
    logout: "Выйти",
    currency: "Валюта",
    language: "Язык",
    your_setups: "Ваши сетапы",
    saved_configs: "Сохранённые конфигурации",
    saved_configs_hint: "Вы можете сравнить их или продолжить сборку.",
    archive: "Архив",
    saved: "СОХРАНЕНО",
    devices: "устройств",
    saved_at: "Сохранено",
    open: "Открыть",
    delete: "Удалить",
    no_configs: "У вас пока нет сохранённых конфигураций",
    create_first_setup: "Собрать первый сетап",
    login: "Вход в систему",
    register: "Регистрация",
    guest_mode_warning: "Сохраните прогресс. Иначе вы потеряете то, что собрали, так как вы находитесь в гостевом режиме!",
    login_with_google: "Войти через Google",
    or: "или",
    password: "Пароль",
    repeat_password: "Повторите пароль",
    name_optional: "Имя (необязательно)",
    already_have_account: "Уже есть аккаунт? Войти",
    create_account: "Создать аккаунт",
    loading: "Загрузка...",
    price: "Цена",
    connection: "Подключение",
    dimensions: "Размеры",
    total: "Итого",
    save_to_profile: "Сохранить в профиль",
    add_to_setup: "Добавить в сборку",
    remove: "Удалить",
    clear_all: "Очистить всё",
    compare_mice: "Сравнение мышей",
    search_mice: "Поиск мышей",
    no_mice_selected: "Мыши не выбраны",
    select_mice_to_compare: "Выберите мышей для сравнения",
    length_width_height: "Длина × ширина × высота",
    weight: "Вес",
    connection_type: "Тип подключения",
    features: "Особенности",
    configurator: "Конфигуратор",
    catalog: "Каталог",
    compare: "Сравнение",
    profile: "Профиль",
    home: "Главная",
    contact: "Контакты",
    terms: "Условия",
    privacy: "Конфиденциальность",
    build_your_setup: "Собери свой сетап",
    smart_peripheral_configurator: "Умный конфигуратор периферии",
    catalog_description: "Каталог устройств с умной фильтрацией и поиском",
    new_level: "Новый уровень рабочего места",
    hero_title: "Соберите идеальный сетап",
    hero_subtitle: "DreamDesk помогает подобрать совместимые периферийные устройства быстро и без ошибок",
    catalog_devices: "Перейти в каталог",
    how_it_works: "Как это работает",
    seamless_process: "Выберите устройства, проверьте совместимость и получите рекомендации AI для оптимальной сборки.",
    intelligent_configurator: "Умный конфигуратор",
    intelligent_configurator_desc: "Искусственный интеллект анализирует ваши цели и рекомендует самые подходящие устройства.",
    auto_compatibility: "Авто-совместимость",
    auto_compatibility_desc: "Система проверяет VESA, разъёмы, питание и вес, чтобы ничего не конфликтовало.",
    deep_comparison: "Глубокое сравнение",
    deep_comparison_desc: "Сравнивайте характеристики, габариты и отклик устройств в одном окне.",
    keyboards: "Клавиатуры",
    keyboards_description: "Продвинутые клавиатуры для работы, игр и творчества.",
    mice: "Мыши",
    mice_description: "Отточенный контроль и комфорт для ежедневного использования.",
    audio: "Аудиоустройства",
    microphones: "Микрофоны",
    why_dreamdesk: "Почему DreamDesk",
    modular_ecosystem: "Модульная экосистема",
    modular_ecosystem_desc: "Легко комбинируйте периферию и подбирайте устройства, которые действительно работают вместе.",
    instant_validation: "Мгновенная проверка",
    instant_validation_desc: "Система оценивает совместимость каждой пары устройств прямо в сборке.",
    ai_assistant: "AI-ассистент",
    ai_assistant_desc: "Рекомендует оптимальные комбинации устройств на основе ваших задач",
    compatibility: "Совместимость",
    ready_to_build: "Готовы собрать?",
    to_configurator: "Перейти в конфигуратор",
    found_count: "Найдено",
    nothing_found: "Ничего не найдено",
    try_change_filters: "Попробуйте изменить фильтры или запрос",
    search_placeholder: "Поиск по названию, брендом, характеристикам...",
    all: "Все",
    category_monitors: "Мониторы",
    category_arms: "Кронштейны",
    category_keyboards: "Клавиатуры",
    category_mice: "Мыши",
    category_microphones: "Микрофоны",
    category_boom_arms: "Пантографы",
    category_audio_interfaces: "Звуковые карты",
    category_headphones: "Наушники",
    product: "Товар",
    no_image: "Нет фото",
    description_label: "Описание",
    no_description: "Описание отсутствует.",
    key_features: "Основные характеристики",
    replace: "Заменить",
    ai_recommendations: "AI-рекомендации по подбору",
    start_building: "Начать сборку",
    features_section: "Возможности",
    compatibility_engine: "Движок совместимости",
    compatibility_engine_desc: "Проверяет вес, крепления VESA, разъёмы и электрические характеристики",
    visual_comparison: "Визуальное сравнение",
    visual_comparison_desc: "Сравнивайте вес, отклик и визуальный стиль вариантов вашей сборки",
    testimonials: "Отзывы",
    get_started_today: "Начать сегодня",
  },
  EN: {
    account: "Account",
    email: "Email",
    logout: "Logout",
    currency: "Currency",
    language: "Language",
    your_setups: "Your Setups",
    saved_configs: "Saved configurations",
    saved_configs_hint: "You can compare them or continue building.",
    archive: "Archive",
    saved: "SAVED",
    devices: "devices",
    saved_at: "Saved at",
    open: "Open",
    delete: "Delete",
    no_configs: "You don't have any saved configurations yet",
    create_first_setup: "Create your first setup",
    login: "Sign In",
    register: "Sign Up",
    guest_mode_warning: "Save your progress. Otherwise you'll lose what you've built since you're in guest mode!",
    login_with_google: "Sign in with Google",
    or: "or",
    password: "Password",
    repeat_password: "Repeat password",
    name_optional: "Name (optional)",
    already_have_account: "Already have an account? Sign in",
    create_account: "Create account",
    loading: "Loading...",
    price: "Price",
    connection: "Connection",
    dimensions: "Dimensions",
    total: "Total",
    save_to_profile: "Save to profile",
    add_to_setup: "Add to setup",
    remove: "Remove",
    clear_all: "Clear all",
    compare_mice: "Compare Mice",
    search_mice: "Search mice",
    no_mice_selected: "No mice selected",
    select_mice_to_compare: "Select mice to compare",
    length_width_height: "Length × Width × Height",
    weight: "Weight",
    connection_type: "Connection type",
    features: "Features",
    configurator: "Configurator",
    catalog: "Catalog",
    compare: "Compare",
    profile: "Profile",
    home: "Home",
    contact: "Contact",
    terms: "Terms",
    privacy: "Privacy",
    build_your_setup: "Build Your Setup",
    smart_peripheral_configurator: "Smart Peripheral Configurator",
    catalog_description: "Device catalog with smart filtering and search",
    new_level: "A new tier of desk setup",
    hero_title: "Build the perfect setup for creation and streaming",
    hero_subtitle: "DreamDesk helps you choose compatible peripherals fast and without errors",
    catalog_devices: "Browse the catalog",
    how_it_works: "How it works",
    seamless_process: "Select devices, check compatibility, and get AI recommendations for an optimal build.",
    intelligent_configurator: "Intelligent configurator",
    intelligent_configurator_desc: "AI analyzes your goals and recommends the best peripherals.",
    auto_compatibility: "Auto compatibility",
    auto_compatibility_desc: "The system checks VESA mounts, ports, power, and weight so nothing conflicts.",
    deep_comparison: "Deep comparison",
    deep_comparison_desc: "Compare specs, dimensions, and response across devices in one view.",
    keyboards: "Keyboards",
    keyboards_description: "Advanced keyboards for work, games, and creative flow.",
    mice: "Mice",
    mice_description: "Precision control and comfort for everyday use.",
    audio: "Audio",
    microphones: "Microphones",
    why_dreamdesk: "Why DreamDesk",
    modular_ecosystem: "Modular ecosystem",
    modular_ecosystem_desc: "Easily combine peripherals and find devices that actually work together.",
    instant_validation: "Instant validation",
    instant_validation_desc: "The system evaluates compatibility for every device pair in the build.",
    ai_assistant: "AI Assistant",
    ai_assistant_desc: "Recommends optimal device combinations based on your tasks",
    compatibility: "Compatibility",
    ready_to_build: "Ready to build?",
    to_configurator: "Go to configurator",
    found_count: "Found",
    nothing_found: "Nothing found",
    try_change_filters: "Try changing filters or the query",
    search_placeholder: "Search by name, brand, or specs...",
    all: "All",
    category_monitors: "Monitors",
    category_arms: "Arms",
    category_keyboards: "Keyboards",
    category_mice: "Mice",
    category_microphones: "Microphones",
    category_boom_arms: "Boom Arms",
    category_audio_interfaces: "Audio Interfaces",
    category_headphones: "Headphones",
    product: "Product",
    no_image: "No image",
    description_label: "Description",
    no_description: "No description available.",
    key_features: "Key features",
    replace: "Replace",
    ai_recommendations: "AI recommendations for selection",
    start_building: "Start Building",
    features_section: "Features",
    compatibility_engine: "Compatibility Engine",
    compatibility_engine_desc: "Checks weight, VESA mounts, connectors and electrical characteristics",
    visual_comparison: "Visual Comparison",
    visual_comparison_desc: "Compare weight, response and visual style of your setup options",
    testimonials: "Testimonials",
    get_started_today: "Get Started Today",
  },
  UK: {
    account: "Обліковий запис",
    email: "Email",
    logout: "Вийти",
    currency: "Валюта",
    language: "Мова",
    your_setups: "Ваші збірки",
    saved_configs: "Збережені конфігурації",
    saved_configs_hint: "Ви можете порівняти їх або продовжити збірку.",
    archive: "Архів",
    saved: "ЗБЕРЕЖЕНО",
    devices: "пристроїв",
    saved_at: "Збережено",
    open: "Відкрити",
    delete: "Видалити",
    no_configs: "У вас поки що немає збережених конфігурацій",
    create_first_setup: "Зібрати першу збірку",
    login: "Вхід в систему",
    register: "Реєстрація",
    guest_mode_warning: "Збережіть прогрес. Інакше ви втратите те, що зібрали, оскільки ви в режимі гостя!",
    login_with_google: "Увійти через Google",
    or: "або",
    password: "Пароль",
    repeat_password: "Повторіть пароль",
    name_optional: "Ім'я (необов'язково)",
    already_have_account: "Вже є обліковий запис? Увійти",
    create_account: "Створити обліковий запис",
    loading: "Завантаження...",
    price: "Ціна",
    connection: "Підключення",
    dimensions: "Розміри",
    total: "Разом",
    save_to_profile: "Зберегти в профіль",
    add_to_setup: "Додати до збірки",
    remove: "Видалити",
    clear_all: "Очистити все",
    compare_mice: "Порівняння мишей",
    search_mice: "Пошук мишей",
    no_mice_selected: "Миші не вибрані",
    select_mice_to_compare: "Виберіть миші для порівняння",
    length_width_height: "Довжина × Ширина × Висота",
    weight: "Вага",
    connection_type: "Тип підключення",
    features: "Особливості",
    configurator: "Конфігуратор",
    catalog: "Каталог",
    compare: "Порівняння",
    profile: "Профіль",
    home: "Головна",
    contact: "Контакти",
    terms: "Умови",
    privacy: "Конфіденційність",
    build_your_setup: "Збери свій сетап",
    smart_peripheral_configurator: "Розумний конфігуратор периферії",
    catalog_description: "Каталог пристроїв з розумною фільтрацією та пошуком",
    new_level: "Новий рівень робочого місця",
    hero_title: "Збери ідеальний сетап для створення та стриму",
    hero_subtitle: "DreamDesk допомагає швидко підібрати сумісні периферійні пристрої без помилок",
    catalog_devices: "Перейти до каталогу",
    how_it_works: "Як це працює",
    seamless_process: "Вибирайте пристрої, перевіряйте сумісність та отримуйте AI-рекомендації для оптимального складання.",
    intelligent_configurator: "Розумний конфігуратор",
    intelligent_configurator_desc: "AI аналізує ваші цілі і рекомендує найкращі периферійні пристрої.",
    auto_compatibility: "Авто-совісність",
    auto_compatibility_desc: "Система перевіряє VESA, порти, живлення та вагу, щоб нічого не конфліктувало.",
    deep_comparison: "Глибоке порівняння",
    deep_comparison_desc: "Порівнюйте характеристики, габарити та відгук пристроїв в одному вікні.",
    keyboards: "Клавіатури",
    keyboards_description: "Просунуті клавіатури для роботи, ігор та творчості.",
    mice: "Миші",
    mice_description: "Точний контроль та комфорт для щоденного використання.",
    audio: "Аудіо",
    microphones: "Мікрофони",
    why_dreamdesk: "Чому DreamDesk",
    modular_ecosystem: "Модульна екосистема",
    modular_ecosystem_desc: "Легко комбінуйте периферію та підбирайте пристрої, які справді працюють разом.",
    instant_validation: "Миттєва перевірка",
    instant_validation_desc: "Система оцінює сумісність кожної пари пристроїв у збірці.",
    ai_assistant: "AI-асистент",
    ai_assistant_desc: "Рекомендує оптимальні комбінації пристроїв на основі ваших задач",
    compatibility: "Сумісність",
    ready_to_build: "Готові збирати?",
    to_configurator: "Перейти до конфігуратора",
    found_count: "Знайдено",
    nothing_found: "Нічого не знайдено",
    try_change_filters: "Спробуйте змінити фільтри або запит",
    search_placeholder: "Пошук за назвою, брендом чи характеристиками...",
    all: "Усі",
    category_monitors: "Монітори",
    category_arms: "Кронштейни",
    category_keyboards: "Клавіатури",
    category_mice: "Миші",
    category_microphones: "Мікрофони",
    category_boom_arms: "Пантографи",
    category_audio_interfaces: "Аудіоінтерфейси",
    category_headphones: "Навушники",
    product: "Товар",
    no_image: "Немає фото",
    description_label: "Опис",
    no_description: "Опис відсутній.",
    key_features: "Основні характеристики",
    replace: "Замінити",
    ai_recommendations: "AI-рекомендації по підбору",
    start_building: "Почати збірку",
    features_section: "Можливості",
    compatibility_engine: "Рушій сумісності",
    compatibility_engine_desc: "Перевіряє вагу, кріплення VESA, роз'єми та електричні характеристики",
    visual_comparison: "Візуальне порівняння",
    visual_comparison_desc: "Порівнюйте вагу, відгук та візуальний стиль варіантів вашої збірки",
    testimonials: "Відгуки",
    get_started_today: "Почати сьогодні",
  },
  PL: {
    account: "Konto",
    email: "Email",
    logout: "Wyloguj",
    currency: "Waluta",
    language: "Język",
    your_setups: "Twoje zestawy",
    saved_configs: "Zapisane konfiguracje",
    saved_configs_hint: "Możesz je porównać lub kontynuować budowę.",
    archive: "Archiwum",
    saved: "ZAPISANO",
    devices: "urządzeń",
    saved_at: "Zapisano",
    open: "Otwórz",
    delete: "Usuń",
    no_configs: "Nie masz jeszcze żadnych zapisanych konfiguracji",
    create_first_setup: "Utwórz swój pierwszy zestaw",
    login: "Logowanie",
    register: "Rejestracja",
    guest_mode_warning: "Zapisz postęp. W przeciwnym razie stracisz to, co zebrałeś, ponieważ jesteś w trybie gościa!",
    login_with_google: "Zaloguj się przez Google",
    or: "lub",
    password: "Hasło",
    repeat_password: "Powtórz hasło",
    name_optional: "Imię (opcjonalnie)",
    already_have_account: "Masz już konto? Zaloguj się",
    create_account: "Utwórz konto",
    loading: "Ładowanie...",
    price: "Cena",
    connection: "Połączenie",
    dimensions: "Wymiary",
    total: "Razem",
    save_to_profile: "Zapisz w profilu",
    add_to_setup: "Dodaj do zestawu",
    remove: "Usuń",
    clear_all: "Wyczyść wszystko",
    compare_mice: "Porównaj myszki",
    search_mice: "Szukaj myszek",
    no_mice_selected: "Brak wybranych myszek",
    select_mice_to_compare: "Wybierz myszki do porównania",
    length_width_height: "Długość × Szerokość × Wysokość",
    weight: "Waga",
    connection_type: "Typ połączenia",
    features: "Funkcje",
    configurator: "Konfigurator",
    catalog: "Katalog",
    compare: "Porównaj",
    profile: "Profil",
    home: "Strona główna",
    contact: "Kontakt",
    terms: "Warunki",
    privacy: "Prywatność",
    build_your_setup: "Złóż swój zestaw",
    smart_peripheral_configurator: "Inteligentny konfigurator urządzeń peryferyjnych",
    catalog_description: "Katalog urządzeń z inteligentnym filtrowaniem i wyszukiwaniem",
    new_level: "Nowy poziom miejsca pracy",
    hero_title: "Zbuduj idealny zestaw do tworzenia i streamingu",
    hero_subtitle: "DreamDesk pomaga wybrać kompatybilne urządzenia peryferyjne szybko i bez błędów",
    catalog_devices: "Przejdź do katalogu",
    how_it_works: "Jak to działa",
    seamless_process: "Wybierz urządzenia, sprawdź kompatybilność i otrzymaj rekomendacje AI dla optymalnego zestawu.",
    intelligent_configurator: "Inteligentny konfigurator",
    intelligent_configurator_desc: "AI analizuje twoje cele i poleca najlepsze urządzenia peryferyjne.",
    auto_compatibility: "Automatyczna zgodność",
    auto_compatibility_desc: "System sprawdza montaż VESA, porty, zasilanie i wagę, by nic nie kolidowało.",
    deep_comparison: "Głębokie porównanie",
    deep_comparison_desc: "Porównaj specyfikacje, wymiary i reakcje urządzeń w jednym widoku.",
    keyboards: "Klawiatury",
    keyboards_description: "Zaawansowane klawiatury do pracy, gier i tworzenia.",
    mice: "Myszki",
    mice_description: "Precyzyjna kontrola i komfort do codziennego użytku.",
    audio: "Audio",
    microphones: "Mikrofony",
    why_dreamdesk: "Dlaczego DreamDesk",
    modular_ecosystem: "Modułowy ekosystem",
    modular_ecosystem_desc: "Łatwo łącz urządzenia peryferyjne i znajdź sprzęt, który naprawdę współgra.",
    instant_validation: "Natychmiastowa weryfikacja",
    instant_validation_desc: "System ocenia zgodność każdej pary urządzeń w zestawie.",
    ai_assistant: "Asystent AI",
    ai_assistant_desc: "Poleca optymalne kombinacje urządzeń na podstawie zadań",
    compatibility: "Kompatybilność",
    ready_to_build: "Gotowy do budowy?",
    to_configurator: "Przejdź do konfiguratora",
    found_count: "Znaleziono",
    nothing_found: "Nic nie znaleziono",
    try_change_filters: "Spróbuj zmienić filtry lub zapytanie",
    search_placeholder: "Szukaj według nazwy, marki lub parametrów...",
    all: "Wszystko",
    category_monitors: "Monitory",
    category_arms: "Uchwyty",
    category_keyboards: "Klawiatury",
    category_mice: "Myszki",
    category_microphones: "Mikrofony",
    category_boom_arms: "Ramię boom",
    category_audio_interfaces: "Interfejsy audio",
    category_headphones: "Słuchawki",
    product: "Produkt",
    no_image: "Brak zdjęcia",
    description_label: "Opis",
    no_description: "Brak opisu.",
    key_features: "Kluczowe cechy",
    replace: "Zamień",
    ai_recommendations: "Rekomendacje AI do wyboru",
    start_building: "Rozpocznij budowanie",
    features_section: "Funkcje",
    compatibility_engine: "Silnik kompatybilności",
    compatibility_engine_desc: "Sprawdza wagę, mocowania VESA, złącza i charakterystyki elektryczne",
    visual_comparison: "Porównanie wizualne",
    visual_comparison_desc: "Porównaj wagę, odpowiedź i styl wizualny opcji swojego zestawu",
    testimonials: "Opinie",
    get_started_today: "Zacznij dzisiaj",
  },
};

/**
 * Получает переведённый текст по ключу
 */
export function t(key: TranslationKey, language: Language): string {
  return translations[language][key] || translations.EN[key] || key;
}

/**
 * Хук для использования переводов
 */
export function useTranslation(language: Language) {
  return (key: TranslationKey) => t(key, language);
}
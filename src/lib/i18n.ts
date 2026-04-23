// ============================================
// DreamDesk — Локализация текста интерфейса
// ============================================

import { Language } from "@/types";

export type TranslationKey =
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
  | "get_started_today"
  | "compare_title"
  | "compare_search_placeholder"
  | "search_by_name_description"
  | "not_found"
  | "compare_shapes"
  | "top_view"
  | "side_view"
  | "remove_item"
  | "added_to_compare"
  | "add_to_compare"
  | "mm"
  | "weight_label"
  | "max_count_reached"
  | "connection_label"
  | "characteristic"
  | "where_to_buy"
  | "find_where_to_buy"
  | "no_mice_for_comparison"
  | "best_offers"
  | "go_to_store"
  | "best_price"
  | "fast_shipping"
  | "official_dealer"
  | "region_eu"
  | "region_global"
  | "region_china"
  | "all_offers"
  | "value_verdict_best"
  | "value_verdict_balanced"
  | "popular_choice"
  | "value_king"
  | "premium_pick"
  | "shipping_free"
  | "shipping_fast"
  | "reviews"
  | "sort_by"
  | "sort_price"
  | "sort_delivery"
  | "sort_rating"
  | "filter_fast"
  | "filter_instock"
  | "filter_official"
  | "return_14_days"
  | "notify_price_drop"
  | "price_history_30_days"
  | "trusted_store"
  | "your_builds"
  | "build_management_hint"
  | "active_filtering"
  | "search_results_zero"
  | "change_request_or_create"
  | "new_tag"
  | "open_details"
  | "duplicate_success"
  | "delete_build_confirm"
  | "delete_build_warning"
  | "yes_delete"
  | "quick_peek"
  | "total_budget"
  | "stats_title"
  | "total_builds"
  | "total_cost"
  | "close_preview"
  | "id_label"
  | "save_photo"
  | "duplicate"
  | "build_intelligence"
  | "name_build_placeholder"
  | "setup_composition"
  | "items_count"
  | "empty_build"
  | "delete_build_long"
  | "active_sync"
  | "found_offers_text"
  | "economy_percent"
  | "low_stock_text"
  | "shipping_label"
  | "subscribed_label"
  | "trend_30_days"
  | "shipping_time_fast"
  | "shipping_time_standard"
  | "quick_peek_short"
  | "rename_build"
  | "delete_build_short"
  | "filter_resolution_panel"
  | "filter_performance"
  | "filter_sensor_speed"
  | "filter_weight_shape"
  | "filter_switches"
  | "filter_form_factor"
  | "filter_build_features"
  | "filter_mic_pattern"
  | "filter_io_quality"
  | "filter_acoustic_impedance"
  | "filter_capacity_size"
  | "filter_mount_adjust"
  | "filter_connection"
  | "filter_others"
  | "filter_brand"
  | "filter_diagonal"
  | "filter_resolution_max"
  | "filter_refresh_rate_hz"
  | "filter_curved"
  | "filter_aspect_ratio"
  | "filter_hdr"
  | "filter_height_adj"
  | "filter_video_ports"
  | "filter_vesa"
  | "filter_screen_size_max"
  | "filter_load_max"
  | "filter_swivel"
  | "filter_kb_type"
  | "filter_hot_swap"
  | "filter_color"
  | "filter_wireless"
  | "filter_wireless_type"
  | "filter_grip"
  | "filter_buttons_count"
  | "filter_mouse_shape"
  | "filter_dpi_max"
  | "filter_mic_interface"
  | "filter_ports"
  | "filter_backlight"
  | "filter_mute_button"
  | "filter_payload"
  | "filter_height_max"
  | "filter_height_min"
  | "filter_rotate_360"
  | "filter_asio"
  | "filter_audio_format"
  | "filter_dac_bitrate"
  | "filter_dac_freq"
  | "filter_headphone_amp"
  | "filter_os_support"
  | "filter_headphones_design"
  | "filter_headphones_type"
  | "filter_mic_included"
  | "filter_anc"
  | "filter_port_connection"
  | "yes"
  | "no"
  | "empty_build_title"
  | "empty_build_desc"
  | "empty_build_create"
  | "empty_build_ai_hint_title"
  | "empty_build_ai_hint_desc"
  | "empty_build_ai_hint_start"
  | "how_it_works_title"
  | "how_it_works_subtitle"
  | "rotating_fast"
  | "rotating_no_errors"
  | "rotating_ai_help"
  | "testimonial_1_quote"
  | "testimonial_1_author"
  | "testimonial_2_quote"
  | "testimonial_2_author"
  | "testimonial_3_quote"
  | "testimonial_3_author"
  | "privacy_title_main"
  | "privacy_subtitle"
  | "privacy_intro_title"
  | "privacy_intro_text"
  | "privacy_data_title"
  | "privacy_data_text"
  | "privacy_security_title"
  | "privacy_security_text"
  | "terms_title_main"
  | "terms_subtitle"
  | "terms_1_title"
  | "terms_1_text"
  | "terms_2_title"
  | "terms_2_text"
  | "terms_2_list_1"
  | "terms_2_list_2"
  | "terms_2_list_3"
  | "terms_3_title"
  | "terms_3_text"
  | "terms_4_title"
  | "terms_4_text"
  | "contact_title_main"
  | "contact_subtitle"
  | "contact_answer_time"
  | "add"
  | "in_setup"
  | "current_setup"
  | "clear"
  | "compatibility_ok"
  | "save_setup_title"
  | "save_setup_desc"
  | "cancel"
  | "save"
  | "name_placeholder"
  | "xlr_mic_warning"
  | "monitor_arm_warning"
  | "empty_setup_help"
  | "login_required_for_alerts"
  | "unsubscribe_label"
  | "alert_email_will_be_sent"
  | "loading_offers"
  | "ai_welcome_message"
  | "ai_placeholder"
  | "ai_listening"
  | "ai_evaluate_setup"
  | "ai_clear_history"
  | "ai_clear_confirm_title"
  | "ai_clear_confirm_desc"
  | "ai_voice_error"
  | "ai_online_assistant"
  | "stat_3_min";


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
    compare_title: "Сравнение мышей",
    compare_search_placeholder: "Поиск по названию и описанию...",
    search_by_name_description: "Поиск по названию и описанию...",
    not_found: "Ничего не найдено.",
    compare_shapes: "Сравнение форм",
    top_view: "Вид сверху",
    side_view: "Вид сбоку",
    remove_item: "Убрать",
    added_to_compare: "Убрано",
    add_to_compare: "В сравнение",
    mm: "мм",
    weight_label: "Вес: ",
    max_count_reached: "Достигнут максимум элементов",
    connection_label: "Подключение",
    characteristic: "Характеристика",
    where_to_buy: "Где купить",
    find_where_to_buy: "Посмотреть цены",
    no_mice_for_comparison: "В базе нет мышей с габаритами для сравнения форм. Запустите npm run db:seed.",
    best_offers: "Выгодные предложения",
    go_to_store: "В магазин",
    best_price: "Лучшая цена",
    fast_shipping: "Быстрая доставка",
    official_dealer: "Офиц. дилер",
    region_eu: "Европа",
    region_global: "Весь мир",
    region_china: "Китай",
    all_offers: "Все предложения",
    value_verdict_best: "Лучший выбор",
    value_verdict_balanced: "Сбалансированно",
    popular_choice: "Популярный выбор",
    value_king: "Король выгоды",
    premium_pick: "Премиум выбор",
    shipping_free: "Бесплатно",
    shipping_fast: "Молниеносно",
    reviews: "отзывов",
    sort_by: "Сортировка",
    sort_price: "По цене",
    sort_delivery: "По доставке",
    sort_rating: "По рейтингу",
    filter_fast: "Быстрая доставка",
    filter_instock: "В наличии",
    filter_official: "Официальная гарантия",
    return_14_days: "Возврат 14 дней",
    notify_price_drop: "Уведомить о скидке",
    price_history_30_days: "Цена за 30 дней",
    trusted_store: "Проверенный магазин",
    your_builds: "Ваши Сборки",
    build_management_hint: "Управляйте конфигурациями и сравнивайте предложения",
    active_filtering: "Активная фильтрация",
    search_results_zero: "У вас нет такой сборки",
    change_request_or_create: "Попробуйте изменить запрос или создайте новую сборку",
    new_tag: "НОВОЕ",
    open_details: "Открыть детали",
    duplicate_success: 'Сборка "{name}" успешно продублирована!',
    delete_build_confirm: "Удалить сборку?",
    delete_build_warning: "Это действие нельзя отменить. Все компоненты будут удалены.",
    yes_delete: "Да, удалить",
    quick_peek: "Быстрый просмотр",
    total_budget: "Общий бюджет",
    stats_title: "Статистика сборок",
    total_builds: "Всего сборок",
    total_cost: "Общая стоимость",
    close_preview: "Закрыть просмотр",
    id_label: "ID",
    save_photo: "Сохранить фото",
    duplicate: "Дублировать",
    build_intelligence: "Интеллект Сборки",
    name_build_placeholder: "Назовите сборку...",
    setup_composition: "Состав сетапа",
    items_count: "позиции",
    empty_build: "Сборка пуста",
    delete_build_long: "Удалить сборку полностью",
    active_sync: "Активная синхронизация",
    found_offers_text: "Мы нашли {count} актуальных предложений для этой модели. Обратите внимание на наличие официальной гарантии.",
    economy_percent: "Экономия {percent}%",
    low_stock_text: "Мало ({count} шт)",
    shipping_label: "Доставка",
    subscribed_label: "Вы подписаны",
    trend_30_days: "Тренд за 30 дней",
    shipping_time_fast: "2-3 дня",
    shipping_time_standard: "15-20 дней",
    start_building: "Начать сборку",
    features_section: "Возможности",
    compatibility_engine: "Движок совместимости",
    compatibility_engine_desc: "Проверяет вес, крепления VESA, разъёмы и электрические характеристики",
    visual_comparison: "Визуальное сравнение",
    visual_comparison_desc: "Сравнивайте вес, отклик и визуальный стиль вариантов вашей сборки",
    testimonials: "Отзывы",
    get_started_today: "Начать сегодня",
    quick_peek_short: "Быстрый просмотр",
    rename_build: "Переименовать",
    delete_build_short: "Удалить сборку",
    filter_resolution_panel: "Разрешение и панель",
    filter_performance: "Производительность",
    filter_sensor_speed: "Сенсор и скорость",
    filter_weight_shape: "Вес и форма",
    filter_switches: "Переключатели",
    filter_form_factor: "Форм-фактор",
    filter_build_features: "Корпус и функции",
    filter_mic_pattern: "Тип и направленность",
    filter_io_quality: "Входы и качество",
    filter_acoustic_impedance: "Акустика и ТТХ",
    filter_capacity_size: "Грузоподъемность и размер",
    filter_mount_adjust: "Крепление и регулировка",
    filter_connection: "Подключение",
    filter_others: "Другое",
    filter_brand: "Бренд",
    filter_diagonal: "Диагональ экрана",
    filter_resolution_max: "Максимальное разрешение",
    filter_refresh_rate_hz: "Частота экрана (Гц)",
    filter_curved: "Изогнутый монитор",
    filter_aspect_ratio: "Соотношение сторон",
    filter_hdr: "Поддержка HDR",
    filter_height_adj: "Регулировка по высоте",
    filter_video_ports: "Видеоразъемы",
    filter_vesa: "Размер VESA",
    filter_screen_size_max: "Макс. диагональ экрана",
    filter_load_max: "Максимальная нагрузка",
    filter_swivel: "Угол поворота",
    filter_kb_type: "Тип клавиатуры",
    filter_hot_swap: "Hot swap",
    filter_color: "Цвет",
    filter_wireless: "Беспроводное подключение",
    filter_wireless_type: "Тип беспр. подключения",
    filter_grip: "Хват",
    filter_buttons_count: "Общее кол-во кнопок",
    filter_mouse_shape: "Форма мыши",
    filter_dpi_max: "Макс. разрешение датчика (DPI)",
    filter_mic_interface: "Интерфейс подключения",
    filter_ports: "Разъемы",
    filter_backlight: "Подсветка",
    filter_mute_button: "Кнопка откл. микрофона",
    filter_payload: "Грузоподъемность",
    filter_height_max: "Максимальная высота (мм)",
    filter_height_min: "Минимальная высота (мм)",
    filter_rotate_360: "Поворот на 360°",
    filter_asio: "Поддержка ASIO",
    filter_audio_format: "Формат звуковой карты",
    filter_dac_bitrate: "Разрядность ЦАП",
    filter_dac_freq: "Макс. частота ЦАП",
    filter_headphone_amp: "Встр. усилитель наушников",
    filter_os_support: "Поддержка ОС",
    filter_headphones_design: "Тип конструкции",
    filter_headphones_type: "Тип",
    filter_mic_included: "Микрофон",
    filter_anc: "Система шумоподавления (ANC)",
    filter_port_connection: "Разъем для подключения",
    yes: "Да",
    no: "Нет",
    empty_build_title: "Ещё нет ни одной сборки",
    empty_build_desc: "Начните свой путь к идеальному сетапу. Используйте наш конфигуратор или получите персональные AI-рекомендации.",
    empty_build_create: "Создать первую сборку",
    empty_build_ai_hint_title: "AI-рекомендация",
    empty_build_ai_hint_desc: "Доверьте подбор компонентов нашему искусственному интеллекту",
    empty_build_ai_hint_start: "Начать",
    how_it_works_title: "КАК ЭТО РАБОТАЕТ",
    how_it_works_subtitle: "Соберите свой идеальный сетап",
    rotating_fast: "быстро",
    rotating_no_errors: "без ошибок",
    rotating_ai_help: "с помощью ИИ",
    testimonial_1_quote: '"AI-ассистент предложил заменить звуковую карту на более совместимую с моим микрофоном. Сэкономил мне 15 000₽ на возвратах."',
    testimonial_1_author: "— Дмитрий К., подкастер",
    testimonial_2_quote: '"Собрал полный сетап за 3 минуты. Конфигуратор сразу показал, что мой монитор не поддерживает VESA — сэкономил время и нервы."',
    testimonial_2_author: "— Алексей М., дизайнер",
    testimonial_3_quote: '"AI-чат помог подобрать тихую клавиатуру для стримов. Раньше тратил часы на форумах, а тут — моментальный ответ."',
    testimonial_3_author: "— Ольга В., стример",
    privacy_title_main: "Политика конфиденциальности",
    privacy_subtitle: "Ваша конфиденциальность — приоритет DreamDesk",
    privacy_intro_title: "Введение",
    privacy_intro_text: "DreamDesk уважает вашу конфиденциальность и берет на себя ответственность за защиту ваших персональных данных. Это значит, что мы объясним вам, как мы собираем, используем и защищаем ваши данные.",
    privacy_data_title: "Сбор данных",
    privacy_data_text: "Мы собираем только необходимые данные для работы с нашим сервисом: имя, email, и ваши сохраненные конфигурации. Никакие данные не передаются третьим лицам без вашего согласия.",
    privacy_security_title: "Защита данных",
    privacy_security_text: "Все данные передаются и хранятся согласно современным стандартам безопасности. Мы используем SSL/TLS для защиты данных в пути.",
    terms_title_main: "Условия использования",
    terms_subtitle: "Прочитайте наши условия перед использованием DreamDesk",
    terms_1_title: "1. Общие условия",
    terms_1_text: "Используя DreamDesk, вы согласны с этими условиями использования и нашей политикой конфиденциальности. Если вы не согласны с какими-либо условиями, пожалуйста, не используйте наш сервис.",
    terms_2_title: "2. Использование сервиса",
    terms_2_text: "Вы используете DreamDesk только в личных целях. Вам запрещается:",
    terms_2_list_1: "Распространять вредоносный код или проводить атаки на наш сервис",
    terms_2_list_2: "Использовать автоматизированные инструменты без разрешения",
    terms_2_list_3: "Нарушать права интеллектуальной собственности",
    terms_3_title: "3. Ответственность",
    terms_3_text: 'DreamDesk предоставляется "как есть". Мы не отвечаем за прямые или косвенные убытки, вытекающие из использования сервиса или невозможности его использования.',
    terms_4_title: "4. Изменения условий",
    terms_4_text: "Мы можем изменять эти условия в любое время. Изменения вступают в силу незамедлительно после публикации на сайте.",
    contact_title_main: "Свяжитесь с нами",
    contact_subtitle: "Ответим на любые вопросы о DreamDesk и поможем вам создать идеальный сетап.",
    contact_answer_time: "Мы ответим вам в течение 24 часов",
    add: "Добавить",
    in_setup: "В сборке",
    current_setup: "Текущая сборка",
    clear: "Очистить",
    compatibility_ok: "Проблем совместимости не обнаружено",
    save_setup_title: "Сохранить сборку",
    save_setup_desc: "Конфигурация появится в разделе «Ваши сетапы» на странице профиля.",
    cancel: "Отмена",
    save: "Сохранить",
    name_placeholder: "Название",
    xlr_mic_warning: "XLR-микрофон не будет работать без аудиоинтерфейса (звуковой карты). Добавьте устройство из категории «Звуковые карты».",
    monitor_arm_warning: "Монитор {name} весит {weight} кг — рекомендуем добавить надёжный кронштейн.",
    empty_setup_help: "Добавляйте товары из каталога слева",
    login_required_for_alerts: "Войдите в аккаунт для подписки на уведомления",
    unsubscribe_label: "Отписаться",
    alert_email_will_be_sent: "Уведомление будет отправлено на {email}",
    loading_offers: "Загрузка предложений...",
    ai_welcome_message: "Привет! Я DreamDesk AI. Добавь товары в сборку и спроси меня «Оцени мою сборку» — я проверю совместимость и дам рекомендации.",
    ai_placeholder: "Твой вопрос для DreamDesk AI...",
    ai_listening: "Слушаю вас...",
    ai_evaluate_setup: "Оцени мою сборку",
    ai_clear_history: "Очистить",
    ai_clear_confirm_title: "Очистить историю?",
    ai_clear_confirm_desc: "Все ваши текущие сообщения будут удалены навсегда.",
    ai_voice_error: "Голосовой ввод не поддерживается вашим браузером.",
    ai_online_assistant: "Онлайн-помощник",
    stat_3_min: "3 мин",
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
    hero_title: "Build the perfect setup",
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
    compare_title: "Compare Mice",
    compare_search_placeholder: "Search by name and description...",
    search_by_name_description: "Search by name and description...",
    not_found: "Nothing found.",
    compare_shapes: "Compare Shapes",
    top_view: "Top View",
    side_view: "Side View",
    remove_item: "Remove",
    added_to_compare: "Added",
    add_to_compare: "To Compare",
    mm: "mm",
    weight_label: "Weight: ",
    max_count_reached: "Maximum items reached",
    connection_label: "Connection",
    characteristic: "Characteristic",
    where_to_buy: "Where to buy",
    find_where_to_buy: "Find price",
    no_mice_for_comparison: "No mice with dimensions for shape comparison in the database. Run npm run db:seed.",
    best_offers: "Best Offers",
    go_to_store: "To Store",
    best_price: "Best Price",
    fast_shipping: "Fast Shipping",
    official_dealer: "Official Dealer",
    region_eu: "Europe",
    region_global: "Global",
    region_china: "China",
    all_offers: "All Offers",
    value_verdict_best: "Best Choice",
    value_verdict_balanced: "Balanced Deal",
    popular_choice: "Popular Choice",
    value_king: "Value King",
    premium_pick: "Premium Pick",
    shipping_free: "Free Shipping",
    shipping_fast: "Lightning Fast",
    reviews: "reviews",
    sort_by: "Sort By",
    sort_price: "Price",
    sort_delivery: "Delivery",
    sort_rating: "Rating",
    filter_fast: "Fast Shipping",
    filter_instock: "In Stock",
    filter_official: "Official Warranty",
    return_14_days: "14-day Returns",
    notify_price_drop: "Notify Price Drop",
    price_history_30_days: "30-day Price History",
    trusted_store: "Trusted Store",
    your_builds: "Your Builds",
    build_management_hint: "Manage configurations and compare best offers",
    active_filtering: "Active Filtering",
    search_results_zero: "You don't have such a build",
    change_request_or_create: "Try changing the query or create a new build",
    new_tag: "NEW",
    open_details: "Open Details",
    duplicate_success: 'Build "{name}" successfully duplicated!',
    delete_build_confirm: "Delete build?",
    delete_build_warning: "This action cannot be undone. All components will be removed.",
    yes_delete: "Yes, delete",
    quick_peek: "Quick Peek",
    total_budget: "Total Budget",
    stats_title: "Build Stats",
    total_builds: "Total Builds",
    total_cost: "Total Cost",
    close_preview: "Close Preview",
    id_label: "ID",
    save_photo: "Save Photo",
    duplicate: "Duplicate",
    build_intelligence: "Build Intelligence",
    name_build_placeholder: "Name your build...",
    setup_composition: "Setup Composition",
    items_count: "items",
    empty_build: "Build is empty",
    delete_build_long: "Delete build completely",
    active_sync: "Active Sync",
    found_offers_text: "We found {count} relevant offers for this model. Look for the official warranty.",
    economy_percent: "Save {percent}%",
    low_stock_text: "Low stock ({count} left)",
    shipping_label: "Shipping",
    subscribed_label: "Subscribed",
    trend_30_days: "30-Day Trend",
    shipping_time_fast: "2-3 days",
    shipping_time_standard: "15-20 days",
    start_building: "Start Building",
    features_section: "Features",
    compatibility_engine: "Compatibility Engine",
    compatibility_engine_desc: "Checks weight, VESA mounts, connectors and electrical characteristics",
    visual_comparison: "Visual Comparison",
    visual_comparison_desc: "Compare weight, response and visual style of your setup options",
    testimonials: "Testimonials",
    get_started_today: "Get Started Today",
    quick_peek_short: "Quick Peek",
    rename_build: "Rename",
    filter_resolution_panel: "Resolution & Panel",
    filter_performance: "Performance",
    filter_sensor_speed: "Sensor & Speed",
    filter_weight_shape: "Weight & Shape",
    filter_switches: "Switches",
    filter_form_factor: "Form Factor",
    filter_build_features: "Build & Features",
    filter_mic_pattern: "Type & Pattern",
    filter_io_quality: "I/O & Quality",
    filter_acoustic_impedance: "Acoustic & Specs",
    filter_capacity_size: "Capacity & Size",
    filter_mount_adjust: "Mount & Adjust",
    filter_connection: "Connection",
    filter_others: "Others",
    filter_brand: "Brand",
    filter_diagonal: "Screen Diagonal",
    filter_resolution_max: "Max Resolution",
    filter_refresh_rate_hz: "Refresh Rate (Hz)",
    filter_curved: "Curved Monitor",
    filter_aspect_ratio: "Aspect Ratio",
    filter_hdr: "HDR Support",
    filter_height_adj: "Height Adjustment",
    filter_video_ports: "Video Connectors",
    filter_vesa: "VESA Size",
    filter_screen_size_max: "Max Screen Size",
    filter_load_max: "Max Load",
    filter_swivel: "Swivel Angle",
    filter_kb_type: "Keyboard Type",
    filter_hot_swap: "Hot Swap",
    filter_color: "Color",
    filter_wireless: "Wireless Connection",
    filter_wireless_type: "Wireless Connection Type",
    filter_grip: "Grip",
    filter_buttons_count: "Number of Buttons",
    filter_mouse_shape: "Mouse Shape",
    filter_dpi_max: "Max Sensor Resolution (DPI)",
    filter_mic_interface: "Connection Interface",
    filter_ports: "Connectors",
    filter_backlight: "Backlight",
    filter_mute_button: "Mute Button",
    filter_payload: "Payload",
    filter_height_max: "Max Height (mm)",
    filter_height_min: "Min Height (mm)",
    filter_rotate_360: "360° Rotation",
    filter_asio: "ASIO Support",
    filter_audio_format: "Audio Format",
    filter_dac_bitrate: "DAC Bit Depth",
    filter_dac_freq: "Max DAC Frequency",
    filter_headphone_amp: "Headphone Amp",
    filter_os_support: "OS Support",
    filter_headphones_design: "Design Type",
    filter_headphones_type: "Type",
    filter_mic_included: "Microphone",
    filter_anc: "ANC Support",
    filter_port_connection: "Connection Port",
    yes: "Yes",
    no: "No",
    delete_build_short: "Delete",
    empty_build_title: "No builds yet",
    empty_build_desc: "Start your journey to the perfect setup. Use our configurator or get personal AI recommendations.",
    empty_build_create: "Create first setup",
    empty_build_ai_hint_title: "AI Recommendation",
    empty_build_ai_hint_desc: "Let our artificial intelligence select the components for you",
    empty_build_ai_hint_start: "Start",
    how_it_works_title: "HOW IT WORKS",
    how_it_works_subtitle: "Build your perfect setup",
    rotating_fast: "fast",
    rotating_no_errors: "error-free",
    rotating_ai_help: "with AI assistance",
    testimonial_1_quote: '"AI assistant suggested replacing the sound card with one more compatible with my microphone. Saved me $200 on returns."',
    testimonial_1_author: "— Dmitry K., podcaster",
    testimonial_2_quote: '"Built a full setup in 3 minutes. The configurator immediately showed my monitor didn\'t support VESA — saved time and stress."',
    testimonial_2_author: "— Alex M., designer",
    testimonial_3_quote: '"AI chat helped pick a quiet keyboard for streaming. Used to spend hours on forums, but here — instant answer."',
    testimonial_3_author: "— Olga V., streamer",
    privacy_title_main: "Privacy Policy",
    privacy_subtitle: "Your privacy is DreamDesk's priority",
    privacy_intro_title: "Introduction",
    privacy_intro_text: "DreamDesk respects your privacy and assumes responsibility for protecting your personal data. This means we will explain how we collect, use, and protect your data.",
    privacy_data_title: "Data Collection",
    privacy_data_text: "We only collect data necessary for our service: name, email, and your saved configurations. No data is shared with third parties without your consent.",
    privacy_security_title: "Data Protection",
    privacy_security_text: "All data is transmitted and stored according to modern security standards. We use SSL/TLS to protect data in transit.",
    terms_title_main: "Terms of Use",
    terms_subtitle: "Read our terms before using DreamDesk",
    terms_1_title: "1. General Terms",
    terms_1_text: "By using DreamDesk, you agree to these terms of use and our privacy policy. If you do not agree with any terms, please do not use our service.",
    terms_2_title: "2. Service Usage",
    terms_2_text: "You use DreamDesk for personal purposes only. You are prohibited from:",
    terms_2_list_1: "Distributing malicious code or conducting attacks on our service",
    terms_2_list_2: "Using automated tools without permission",
    terms_2_list_3: "Violating intellectual property rights",
    terms_3_title: "3. Liability",
    terms_3_text: 'DreamDesk is provided "as is". We are not liable for direct or indirect damages arising from the use or inability to use the service.',
    terms_4_title: "4. Changes to Terms",
    terms_4_text: "We may change these terms at any time. Changes take effect immediately upon publication on the website.",
    contact_title_main: "Contact Us",
    contact_subtitle: "We'll answer any questions about DreamDesk and help you create the perfect setup.",
    contact_answer_time: "We will answer you within 24 hours",
    add: "Add",
    in_setup: "In Setup",
    current_setup: "Current Setup",
    clear: "Clear",
    compatibility_ok: "No compatibility issues found",
    save_setup_title: "Save Setup",
    save_setup_desc: "The configuration will appear in the 'Your Setups' section on the profile page.",
    cancel: "Cancel",
    save: "Save",
    name_placeholder: "Name",
    xlr_mic_warning: "An XLR microphone will not work without an audio interface (sound card). Add a device from the 'Audio Interfaces' category.",
    monitor_arm_warning: "Monitor {name} weighs {weight} kg — we recommend adding a reliable arm.",
    empty_setup_help: "Add products from the catalog on the left",
    login_required_for_alerts: "Sign in to subscribe to price alerts",
    unsubscribe_label: "Unsubscribe",
    alert_email_will_be_sent: "Alert will be sent to {email}",
    loading_offers: "Loading offers...",
    ai_welcome_message: "Hello! I'm DreamDesk AI. Add products to your setup and ask me 'Evaluate my setup' — I'll check compatibility and give recommendations.",
    ai_placeholder: "Your question for DreamDesk AI...",
    ai_listening: "Listening...",
    ai_evaluate_setup: "Evaluate my setup",
    ai_clear_history: "Clear",
    ai_clear_confirm_title: "Clear history?",
    ai_clear_confirm_desc: "All your current messages will be permanently deleted.",
    ai_voice_error: "Voice input is not supported by your browser.",
    ai_online_assistant: "Online Assistant",
    stat_3_min: "3 min",
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
    hero_title: "Збери ідеальний сетап",
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
    category_monitors: "Монитори",
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
    compare_title: "Порівняння мишей",
    compare_search_placeholder: "Пошук за назвою та описом...",
    search_by_name_description: "Пошук за назвою та описом...",
    not_found: "Нічого не знайдено.",
    compare_shapes: "Порівняння форм",
    top_view: "Вид зверху",
    side_view: "Вид збоку",
    remove_item: "Видалити",
    added_to_compare: "Видалено",
    add_to_compare: "До порівняння",
    mm: "мм",
    weight_label: "Вага: ",
    max_count_reached: "Досягнуто максимум елементів",
    connection_label: "Підключення",
    characteristic: "Характеристика",
    where_to_buy: "Де купити",
    find_where_to_buy: "Подивитися ціни",
    no_mice_for_comparison: "У базі немає мишей з габаритками для порівняння форм. Запустіть npm run db:seed.",
    best_offers: "Вигідні пропозиції",
    go_to_store: "В магазин",
    best_price: "Найкраща ціна",
    fast_shipping: "Швидка доставка",
    official_dealer: "Офіц. дилер",
    region_eu: "Європа",
    region_global: "Весь світ",
    region_china: "Китай",
    all_offers: "Усі пропозиції",
    value_verdict_best: "Найкращий вибір",
    value_verdict_balanced: "Збалансовано",
    popular_choice: "Популярний вибір",
    value_king: "Король вигоди",
    premium_pick: "Преміум вибір",
    shipping_free: "Безкоштовно",
    shipping_fast: "Блискавично",
    reviews: "відгуків",
    sort_by: "Сортування",
    sort_price: "За ціною",
    sort_delivery: "За доставкою",
    sort_rating: "За рейтингом",
    filter_fast: "Швидка доставка",
    filter_instock: "В наявності",
    filter_official: "Офіційна гарантія",
    return_14_days: "Повернення 14 днів",
    notify_price_drop: "Сповістити про знижку",
    price_history_30_days: "Ціна за 30 днів",
    trusted_store: "Перевірений магазин",
    your_builds: "Ваші Збірки",
    build_management_hint: "Керуйте конфігураціями та порівнюйте пропозиції",
    active_filtering: "Активна фільтрація",
    search_results_zero: "У вас немає такої збірки",
    change_request_or_create: "Спробуйте змінити запит або створіть нову збірку",
    new_tag: "НОВЕ",
    open_details: "Відкрити деталі",
    duplicate_success: 'Збірка "{name}" успішно продубльована!',
    delete_build_confirm: "Видалити збірку?",
    delete_build_warning: "Цю дію не можна скасувати. Всі компоненти будуть видалені.",
    yes_delete: "Так, видалити",
    quick_peek: "Швидкий перегляд",
    total_budget: "Загальний бюджет",
    stats_title: "Статистика збірок",
    total_builds: "Всього збірок",
    total_cost: "Загальна вартість",
    close_preview: "Закрити перегляд",
    id_label: "ID",
    save_photo: "Зберегти фото",
    duplicate: "Дублювати",
    build_intelligence: "Інтелект Збірки",
    name_build_placeholder: "Назвіть збірку...",
    setup_composition: "Склад сетапа",
    items_count: "позиції",
    empty_build: "Збірка порожня",
    delete_build_long: "Видалити збірку повністю",
    active_sync: "Активна синхронізація",
    found_offers_text: "Ми знайшли {count} актуальних пропозицій для цієї моделі. Зверніть увагу на наявність офіційної гарантії.",
    economy_percent: "Економія {percent}%",
    low_stock_text: "Мало ({count} шт)",
    shipping_label: "Доставка",
    subscribed_label: "Ви підписані",
    trend_30_days: "Тренд за 30 днів",
    shipping_time_fast: "2-3 дні",
    shipping_time_standard: "15-20 днів",
    start_building: "Почати збірку",
    features_section: "Можливості",
    compatibility_engine: "Рушій сумісності",
    compatibility_engine_desc: "Перевіряє вагу, кріплення VESA, роз'єми та електричні характеристики",
    visual_comparison: "Візуальне порівняння",
    visual_comparison_desc: "Порівнюйте вагу, відгук та візуальний стиль варіантів вашої збірки",
    testimonials: "Відгуки",
    get_started_today: "Почати сьогодні",
    quick_peek_short: "Швидкий перегляд",
    rename_build: "Перейменувати",
    filter_resolution_panel: "Роздільна здатність та панель",
    filter_performance: "Продуктивність",
    filter_sensor_speed: "Сенсор та швидкість",
    filter_weight_shape: "Вага та форма",
    filter_switches: "Перемикачі",
    filter_form_factor: "Форм-фактор",
    filter_build_features: "Корпус та функції",
    filter_mic_pattern: "Тип та спрямованість",
    filter_io_quality: "Входи та якість",
    filter_acoustic_impedance: "Акустика та ТТХ",
    filter_capacity_size: "Вантажопідйомність та розмір",
    filter_mount_adjust: "Кріплення та регулювання",
    filter_connection: "Підключення",
    filter_others: "Інше",
    filter_brand: "Бренд",
    filter_diagonal: "Діагональ екрана",
    filter_resolution_max: "Максимальна роздільна здатність",
    filter_refresh_rate_hz: "Частота екрана (Гц)",
    filter_curved: "Вигнутий монітор",
    filter_aspect_ratio: "Співвідношення сторін",
    filter_hdr: "Підтримка HDR",
    filter_height_adj: "Регулювання по висоті",
    filter_video_ports: "Відеороз'єми",
    filter_vesa: "Розмір VESA",
    filter_screen_size_max: "Макс. діагональ екрана",
    filter_load_max: "Максимальне навантаження",
    filter_swivel: "Кут повороту",
    filter_kb_type: "Тип клавіатури",
    filter_hot_swap: "Hot swap",
    filter_color: "Колір",
    filter_wireless: "Бездротове підключення",
    filter_wireless_type: "Тип бедрот. підключення",
    filter_grip: "Хват",
    filter_buttons_count: "Загальна кількість кнопок",
    filter_mouse_shape: "Форма миші",
    filter_dpi_max: "Макс. роздільна здатність (DPI)",
    filter_mic_interface: "Інтерфейс підключення",
    filter_ports: "Роз'єми",
    filter_backlight: "Підсвічування",
    filter_mute_button: "Кнопка вимк. мікрофона",
    filter_payload: "Вантажопідйомність",
    filter_height_max: "Максимальна висота (мм)",
    filter_height_min: "Мінімальна висота (мм)",
    filter_rotate_360: "Поворот на 360°",
    filter_asio: "Підтримка ASIO",
    filter_audio_format: "Формат звукової карти",
    filter_dac_bitrate: "Розрядність ЦАП",
    filter_dac_freq: "Макс. частота ЦАП",
    filter_headphone_amp: "Вбудований підсилювач",
    filter_os_support: "Підтримка ОС",
    filter_headphones_design: "Тип конструкції",
    filter_headphones_type: "Тип",
    filter_mic_included: "Микрофон",
    filter_anc: "Система шумозаглушення (ANC)",
    filter_port_connection: "Роз'єм для підключення",
    yes: "Так",
    no: "Ні",
    delete_build_short: "Видалити збірку",
    empty_build_title: "Ще немає жодної збірки",
    empty_build_desc: "Почніть свій шлях до ідеального сетапу. Використовуйте наш конфігуратор або отримайте персональні AI-рекомендації.",
    empty_build_create: "Створити першу збірку",
    empty_build_ai_hint_title: "AI-рекомендація",
    empty_build_ai_hint_desc: "Довірте підбір компонентів нашому штучному інтелекту",
    empty_build_ai_hint_start: "Почати",
    how_it_works_title: "ЯК ЦЕ ПРАЦЮЄ",
    how_it_works_subtitle: "Зберіть свій ідеальний сетап",
    rotating_fast: "швидко",
    rotating_no_errors: "без помилок",
    rotating_ai_help: "за допомогою ШІ",
    testimonial_1_quote: '"AI-асистент запропонував замінити звукову карту на більш сумісну з моїм мікрофоном. Заощадив мені 5000₴ на поверненнях."',
    testimonial_1_author: "— Дмитро К., подкастер",
    testimonial_2_quote: '"Зібрав повний сетап за 3 хвилини. Конфігуратор відразу показав, що мій монітор не підтримує VESA — заощадив час та нерви."',
    testimonial_2_author: "— Олексій М., дизайнер",
    testimonial_3_quote: '"AI-чат допоміг підібрати тиху клавіатуру для стрімів. Раніше витрачав години на форумах, а тут — моментальна відповідь."',
    testimonial_3_author: "— Ольга В., стрімер",
    privacy_title_main: "Політика конфіденційності",
    privacy_subtitle: "Ваша конфіденційність — пріоритет DreamDesk",
    privacy_intro_title: "Вступ",
    privacy_intro_text: "DreamDesk поважає вашу конфіденційність і бере на себе відповідальність за захист ваших персональних даних. Це означає, що ми пояснимо вам, як ми збираємо, використовуємо та захищаємо ваші дані.",
    privacy_data_title: "Збір даних",
    privacy_data_text: "Ми збираємо лише необхідні дані для роботи з нашим сервісом: ім'я, email та ваші збережені конфігурації. Жодні дані не передаються третім особам без вашої згоди.",
    privacy_security_title: "Захист даних",
    privacy_security_text: "Всі дані передаються та зберігаються згідно з сучасними стандартами безпеки. Ми використовуємо SSL/TLS для захисту даних у дорозі.",
    terms_title_main: "Умови використання",
    terms_subtitle: "Прочитайте наші умови перед використанням DreamDesk",
    terms_1_title: "1. Загальні умови",
    terms_1_text: "Використовуючи DreamDesk, ви погоджуєтесь із цими умовами використання та нашою політикою конфіденційності. Якщо ви не згодні з будь-якими умовами, будь ласка, не використовуйте наш сервіс.",
    terms_2_title: "2. Використання сервісу",
    terms_2_text: "Ви використовуєте DreamDesk лише в особистих цілях. Вам забороняється:",
    terms_2_list_1: "Поширювати шкідливий код або проводити атаки на наш сервіс",
    terms_2_list_2: "Використовувати автоматизовані інструменти без дозволу",
    terms_2_list_3: "Порушувати права інтелектуальної власності",
    terms_3_title: "3. Відповідальність",
    terms_3_text: 'DreamDesk надається "як є". Ми не відповідаємо за прямі або непрямі збитки, що випливають із використання сервісу або неможливості його використання.',
    terms_4_title: "4. Зміни умов",
    terms_4_text: "Ми можемо змінювати ці умови в будь-який час. Зміни набирають чинності негайно після публікації на сайті.",
    contact_title_main: "Зв'яжіться з нами",
    contact_subtitle: "Відповімо на будь-які запитання про DreamDesk та допоможемо вам створити ідеальний сетап.",
    contact_answer_time: "Ми відповімо вам протягом 24 годин",
    add: "Додати",
    in_setup: "В збірці",
    current_setup: "Поточна збірка",
    clear: "Очистити",
    compatibility_ok: "Проблем із сумісністю не виявлено",
    save_setup_title: "Зберегти збірку",
    save_setup_desc: "Конфігурація з'явиться в розділі «Ваші сетапи» на сторінці профілю.",
    cancel: "Скасувати",
    save: "Зберегти",
    name_placeholder: "Назва",
    xlr_mic_warning: "XLR-мікрофон не працюватиме без аудіоінтерфейсу (звукової карти). Додайте пристрій з категорії «Звукові карти».",
    monitor_arm_warning: "Монітор {name} важить {weight} кг — рекомендуємо додати надійний кронштейн.",
    empty_setup_help: "Додавайте товари з каталогу ліворуч",
    login_required_for_alerts: "Увійдіть в обліковий запис для підписки на сповіщення",
    unsubscribe_label: "Відписатися",
    alert_email_will_be_sent: "Сповіщення буде надіслано на {email}",
    loading_offers: "Завантаження пропозицій...",
    ai_welcome_message: "Привіт! Я DreamDesk AI. Додай товари до збірки і запитай мене «Оціни мою збірку» — я перевірю сумісність і дам рекомендації.",
    ai_placeholder: "Твоє питання для DreamDesk AI...",
    ai_listening: "Слухаю вас...",
    ai_evaluate_setup: "Оціни мою збірку",
    ai_clear_history: "Очистити",
    ai_clear_confirm_title: "Очистити історію?",
    ai_clear_confirm_desc: "Всі ваші поточні повідомлення будуть видалені назавжди.",
    ai_voice_error: "Голосовий ввід не підтримується вашим браузером.",
    ai_online_assistant: "Онлайн-помічник",
    stat_3_min: "3 хв",
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
    hero_title: "Zbuduj idealny zestaw",
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
    compare_title: "Porównaj myszki",
    compare_search_placeholder: "Szukaj według nazwy i opisu...",
    search_by_name_description: "Szukaj według nazwy i opisu...",
    not_found: "Nic nie znaleziono.",
    compare_shapes: "Porównaj kształty",
    top_view: "Widok z góry",
    side_view: "Widok z boku",
    remove_item: "Usuń",
    added_to_compare: "Usunięto",
    add_to_compare: "Do porównania",
    mm: "mm",
    weight_label: "Waga: ",
    max_count_reached: "Osiągnięto maksymalną liczbę elementów",
    connection_label: "Połączenie",
    characteristic: "Charakterystyka",
    where_to_buy: "Gdzie kupić",
    find_where_to_buy: "Zobacz ceny",
    no_mice_for_comparison: "W bazie nie ma myszek z wymiarami do porównania kształtów. Uruchom npm run db:seed.",
    best_offers: "Najlepsze oferty",
    go_to_store: "Do sklepu",
    best_price: "Najlepsza cena",
    fast_shipping: "Szybka dostawa",
    official_dealer: "Oficj. dealer",
    region_eu: "Europa",
    region_global: "Cały świat",
    region_china: "Chiny",
    all_offers: "Wszystkie oferty",
    value_verdict_best: "Najlepszy wybór",
    value_verdict_balanced: "Zrównoważone",
    popular_choice: "Popularny wybór",
    value_king: "Król opłacalności",
    premium_pick: "Wybór Premium",
    shipping_free: "Za darmo",
    shipping_fast: "Błyskawicznie",
    reviews: "opinii",
    sort_by: "Sortuj",
    sort_price: "Po cenie",
    sort_delivery: "Po dostawie",
    sort_rating: "Po ocenach",
    filter_fast: "Szybka dostawa",
    filter_instock: "W magazynie",
    filter_official: "Oficjalna gwarancja",
    return_14_days: "Zwrot 14 dni",
    notify_price_drop: "Powiadom o zniżce",
    price_history_30_days: "Historia cen 30 dni",
    trusted_store: "Zaufany sklep",
    your_builds: "Twoje Zestawy",
    build_management_hint: "Zarządzaj konfiguracjami i porównuj oferty",
    active_filtering: "Aktywna filtracja",
    search_results_zero: "Nie masz takiego zestawu",
    change_request_or_create: "Spróbuj zmienić zapytanie lub utwórz nowy zestaw",
    new_tag: "NOWE",
    open_details: "Otwórz szczegóły",
    duplicate_success: 'Zestaw "{name}" został zduplikowany!',
    delete_build_confirm: "Usunąć zestaw?",
    delete_build_warning: "Tej akcji nie można cofnąć. Wszystkie elementy zostaną usunięte.",
    yes_delete: "Tak, usuń",
    quick_peek: "Szybki podgląd",
    total_budget: "Całkowity budżet",
    stats_title: "Statystyki zestawów",
    total_builds: "Wszystkich zestawów",
    total_cost: "Całkowity koszt",
    close_preview: "Zamknij podgląd",
    id_label: "ID",
    save_photo: "Zapisz zdjęcie",
    duplicate: "Duplikuj",
    build_intelligence: "Inteligencja Zestawu",
    name_build_placeholder: "Nazwij swój zestaw...",
    setup_composition: "Skład zestawu",
    items_count: "pozycje",
    empty_build: "Zestaw jest pusty",
    delete_build_long: "Usuń całkowicie zestaw",
    active_sync: "Aktywna synchronizacja",
    found_offers_text: "Znaleźliśmy {count} aktualnych ofert dla tego modelu. Zwróć uwagę na oficjalną gwarancję.",
    economy_percent: "Oszczędność {percent}%",
    low_stock_text: "Niski stan ({count} szt)",
    shipping_label: "Wysyłka",
    subscribed_label: "Subskrypcja aktywna",
    trend_30_days: "Trend 30-dniowy",
    shipping_time_fast: "2-3 dni",
    shipping_time_standard: "15-20 dni",
    start_building: "Rozpocznij budowanie",
    features_section: "Funkcje",
    compatibility_engine: "Silnik kompatybilności",
    compatibility_engine_desc: "Sprawdza wagę, mocowania VESA, złącza i charakterystyki elektryczne",
    visual_comparison: "Porównanie wizualne",
    visual_comparison_desc: "Porównaj wagę, odpowiedź i styl wizualny opcji swojego zestawu",
    testimonials: "Opinie",
    get_started_today: "Zacznij dzisiaj",
    quick_peek_short: "Szybki podgląd",
    rename_build: "Zmień nazwę",
    filter_resolution_panel: "Rozdzielczość i panel",
    filter_performance: "Wydajność",
    filter_sensor_speed: "Sensor i szybkość",
    filter_weight_shape: "Waga i kształt",
    filter_switches: "Przełączniki",
    filter_form_factor: "Form-factor",
    filter_build_features: "Obudowa i funkcje",
    filter_mic_pattern: "Typ i kierunkowość",
    filter_io_quality: "Wejścia i jakość",
    filter_acoustic_impedance: "Akustyka i specyfikacja",
    filter_capacity_size: "Nośność i rozmiar",
    filter_mount_adjust: "Montaż i regulacja",
    filter_connection: "Połączenie",
    filter_others: "Inne",
    filter_brand: "Marka",
    filter_diagonal: "Przekątna ekranu",
    filter_resolution_max: "Maksymalna rozdzielczość",
    filter_refresh_rate_hz: "Częstotliwość (Hz)",
    filter_curved: "Zakrzywiony monitor",
    filter_aspect_ratio: "Proporcje ekranu",
    filter_hdr: "Obsługa HDR",
    filter_height_adj: "Regulacja wysokości",
    filter_video_ports: "Złącza wideo",
    filter_vesa: "Rozmiar VESA",
    filter_screen_size_max: "Maks. przekątna ekranu",
    filter_load_max: "Maksymalne obciążenie",
    filter_swivel: "Kąt obrotu",
    filter_kb_type: "Typ klawiatury",
    filter_hot_swap: "Hot swap",
    filter_color: "Kolor",
    filter_wireless: "Połączenie bezprzewodowe",
    filter_wireless_type: "Typ poł. bezprzewodowego",
    filter_grip: "Chwyt",
    filter_buttons_count: "Liczba przycisków",
    filter_mouse_shape: "Kształt myszy",
    filter_dpi_max: "Maks. rozdzielczość (DPI)",
    filter_mic_interface: "Interfejs połączenia",
    filter_ports: "Złącza",
    filter_backlight: "Podświetlenie",
    filter_mute_button: "Przycisk wyciszenia",
    filter_payload: "Nośność",
    filter_height_max: "Maksymalna wysokość (mm)",
    filter_height_min: "Minimalna wysokość (mm)",
    filter_rotate_360: "Obrót o 360°",
    filter_asio: "Obsługa ASIO",
    filter_audio_format: "Format karty dźwiękowej",
    filter_dac_bitrate: "Głębia bitowa DAC",
    filter_dac_freq: "Maks. częstotliwość DAC",
    filter_headphone_amp: "Wbudowany wzmacniacz",
    filter_os_support: "Obsługa systemów",
    filter_headphones_design: "Typ konstrukcji",
    filter_headphones_type: "Typ",
    filter_mic_included: "Mikrofon",
    filter_anc: "System redukcji szumów (ANC)",
    filter_port_connection: "Złącze połączeniowe",
    yes: "Tak",
    no: "Nie",
    delete_build_short: "Usuń zestaw",
    empty_build_title: "Brak zapisanych zestawów",
    empty_build_desc: "Zacznij swoją drogę do idealnego setupu. Skorzystaj z naszego konfiguratora lub otrzymaj personalne rekomendacje AI.",
    empty_build_create: "Utwórz pierwszy zestaw",
    empty_build_ai_hint_title: "Rekomendacja AI",
    empty_build_ai_hint_desc: "Pozwól naszej sztucznej inteligencji dobrać komponenty za Ciebie",
    empty_build_ai_hint_start: "Zacznij",
    how_it_works_title: "JAK TO DZIAŁA",
    how_it_works_subtitle: "Zbuduj swój idealny zestaw",
    rotating_fast: "szybko",
    rotating_no_errors: "bez błędów",
    rotating_ai_help: "z pomocą AI",
    testimonial_1_quote: '"Asystent AI zasugerował wymianę karty dźwiękowej na bardziej kompatybilną z moim mikrofonem. Zaoszczędziło mi to 800 zł na zwrotach."',
    testimonial_1_author: "— Dmitrij K., podcaster",
    testimonial_2_quote: '"Złożyłem pełny zestaw w 3 minuty. Konfigurator od razu pokazał, że mój monitor nie obsługuje VESA — zaoszczędziło czas i stres."',
    testimonial_2_author: "— Aleksiej M., projektant",
    testimonial_3_quote: '"Czat AI pomógł wybrać cichą klawiaturę do streamingu. Kiedyś spędzałem godziny na forach, a tutaj — błyskawiczna odpowiedź."',
    testimonial_3_author: "— Olga W., streamerka",
    privacy_title_main: "Polityka Prywatności",
    privacy_subtitle: "Twoja prywatność jest priorytetem DreamDesk",
    privacy_intro_title: "Wprowadzenie",
    privacy_intro_text: "DreamDesk szanuje Twoją prywatność i bierze odpowiedzialność за ochronę Twoich danych osobowych. Oznacza to, że wyjaśnimy Ci, jak zbieramy, używamy i chronimy Twoje dane.",
    privacy_data_title: "Zbieranie danych",
    privacy_data_text: "Zbieramy tylko dane niezbędne do działania naszego serwisu: imię, email oraz Twoje zapisane konfiguracje. Żadne dane nie są przekazywane stronom trzecim bez Twojej zgody.",
    privacy_security_title: "Ochrona danych",
    privacy_security_text: "Wszystkie dane są przesyłane i przechowywane zgodnie z nowoczesnymi standardami bezpieczeństwa. Używamy SSL/TLS do ochrony danych w transmisji.",
    terms_title_main: "Warunki Użytkowania",
    terms_subtitle: "Przeczytaj nasze warunki przed skorzystaniem z DreamDesk",
    terms_1_title: "1. Warunki Ogólne",
    terms_1_text: "Korzystając z DreamDesk, zgadzasz się na niniejsze warunki użytkowania oraz naszą politykę prywatności. Jeśli nie zgadzasz się z którymikolwiek warunkami, prosimy o niekorzystanie z naszego serwisu.",
    terms_2_title: "2. Korzystanie z Serwisu",
    terms_2_text: "DreamDesk używasz wyłącznie do celów osobistych. Zabrania się:",
    terms_2_list_1: "Rozpowszechniania złośliwego kodu lub przeprowadzania ataków na nasz serwis",
    terms_2_list_2: "Używania zautomatyzowanych narzędzi bez pozwolenia",
    terms_2_list_3: "Naruszenia praw własności intelektualnej",
    terms_3_title: "3. Odpowiedzialność",
    terms_3_text: 'DreamDesk jest świadczony w stanie "takim, jakim jest". Nie ponosimy odpowiedzialności za bezpośrednie lub pośrednie szkody wynikające z użytkowania serwisu lub niemożności jego użytkowania.',
    terms_4_title: "4. Zmiany Warunków",
    terms_4_text: "Możemy zmienić niniejsze warunki w dowolnym momencie. Zmiany wchodzą w życie natychmiast po opublikowaniu na stronie.",
    contact_title_main: "Kontakt",
    contact_subtitle: "Odpowiemy na wszelkie pytania dotyczące DreamDesk i pomożemy Ci stworzyć idealny zestaw.",
    contact_answer_time: "Odpоwiemy Ci w ciągu 24 godzin",
    add: "Dodaj",
    in_setup: "W zestawie",
    current_setup: "Bieżąca konfiguracja",
    clear: "Wyczyść",
    compatibility_ok: "Nie znaleziono problemów z kompatybilnością",
    save_setup_title: "Zapisz konfigurację",
    save_setup_desc: "Konfiguracja pojawi się w sekcji „Twoje konfiguracje” na stronie profilu.",
    cancel: "Anuluj",
    save: "Zapisz",
    name_placeholder: "Nazwa",
    xlr_mic_warning: "Mikrofon XLR nie będzie działać bez interfejsu audio (karty dźwiękowej). Dodaj urządzenie z kategorii „Karty dźwiękowe”.",
    monitor_arm_warning: "Monitor {name} waży {weight} kg — zalecamy dodanie solidnego uchwytu.",
    empty_setup_help: "Dodaj produkty z katalogu po lewej stronie",
    login_required_for_alerts: "Zaloguj się, aby subskrybować powiadomienia o cenach",
    unsubscribe_label: "Anuluj subskrypcję",
    alert_email_will_be_sent: "Powiadomienie zostanie wysłane na {email}",
    loading_offers: "Ładowanie ofert...",
    ai_welcome_message: "Cześć! Jestem DreamDesk AI. Dodaj produkty do zestawu i poproś mnie 'Oceń mój zestaw' — sprawdzę kompatybilność i dam rekomendacje.",
    ai_placeholder: "Twoje pytanie do DreamDesk AI...",
    ai_listening: "Słucham...",
    ai_evaluate_setup: "Oceń mój zestaw",
    ai_clear_history: "Wyczyść",
    ai_clear_confirm_title: "Wyczyścić historię?",
    ai_clear_confirm_desc: "Wszystkie Twoje bieżące wiadomości zostaną trwale usunięte.",
    ai_voice_error: "Wprowadzanie głosowe nie jest obsługiwane przez Twoją przeglądarkę.",
    ai_online_assistant: "Asystent online",
    stat_3_min: "3 min",
  },
};

export const LANGUAGE_LOCALES: Record<Language, string> = {
  RU: "ru-RU",
  EN: "en-US",
  UK: "uk-UA",
  PL: "pl-PL",
};

/**
 * Получает переведённый текст по ключу с поддержкой параметров
 */
export function t(
  key: TranslationKey,
  language: Language,
  params?: Record<string, string | number>
): string {
  let text = translations[language][key] || translations.EN[key] || key;

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }

  return text;
}

/**
 * Хук для использования переводов
 */
export function useTranslation(language: Language) {
  return (key: TranslationKey, params?: Record<string, string | number>) =>
    t(key, language, params);
}

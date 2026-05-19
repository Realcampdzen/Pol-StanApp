import type { Locale, ServicePackage, SiteContent } from './types';

export const locales: Locale[] = ['ru', 'en'];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const ruServices: ServicePackage[] = [
  {
    id: 'music',
    slug: 'music',
    title: 'Создание музыки',
    cardTitle: 'СОЗДАНИЕ МУЗЫКИ',
    cardBenefit: 'Треки, темы, джинглы и музыкальная айдентика',
    description:
      'Авторская музыка для игр, видео, рекламы, подкастов, приложений и творческих проектов.',
    deliverables: ['треки и темы', 'джинглы', 'лупы и стемы', 'версии под монтаж'],
    idealFor: 'релизы, видео, игры, приложения, бренды',
    priceLabel: 'от 20 000₽',
    cta: 'Обсудить музыку',
    media: '/media/services/music/cover-stage-premium.jpg',
    branch: 'polstan',
    useCases: [
      { title: 'Музыка для видео и рекламы', description: 'Треки, подложки, акценты и версии под монтаж.' },
      { title: 'Музыка для игр и приложений', description: 'Темы, лупы, стемы и атмосферные слои.' },
      { title: 'Музыкальная айдентика', description: 'Короткие мотивы и звуковые логотипы для бренда.' }
    ],
    formats: ['Полная версия трека', 'Cut-down версии', 'Лупы и стемы', 'Интро, аутро и джинглы'],
    whatYouGet: [
      'Музыку, написанную под конкретную задачу.',
      'Файлы в нужных форматах и длительностях.',
      'Систему, которую можно развивать дальше.'
    ]
  },
  {
    id: 'sound-design',
    slug: 'sound-design',
    title: 'Озвучка и саунд-дизайн',
    cardTitle: 'ОЗВУЧКА И САУНД-ДИЗАЙН',
    cardBenefit: 'Голос, SFX и чистый звук под площадки',
    description:
      'Профессиональная озвучка, обработка, саунд-дизайн и звуковые эффекты для видео, игр, курсов и приложений.',
    deliverables: ['voice-over', 'SFX', 'аудио-чистка', 'сведение и мастеринг'],
    idealFor: 'ролики, игры, курсы, приложения, подкасты',
    priceLabel: 'от 15 000₽',
    cta: 'Обсудить звук',
    media: '/media/services/sound-design/cover.jpg',
    branch: 'polstan',
    useCases: [
      { title: 'Озвучка и voice-over', description: 'Рекламные ролики, курсы, инструкции, подкасты и презентации.' },
      { title: 'Саунд-дизайн и SFX', description: 'Звуки интерфейса, окружения, действий, переходов и спецэффектов.' },
      { title: 'Обработка звука', description: 'Очистка, выравнивание громкости, сведение и подготовка под публикацию.' }
    ],
    formats: ['Voice-over', 'Пакеты SFX', 'Звуки интерфейса', 'WAV/MP3/OGG-файлы'],
    whatYouGet: [
      'Профессионально подготовленный звук.',
      'Пакет файлов под вашу платформу.',
      'Возможность дополнять проект новыми репликами и эффектами.'
    ]
  },
  {
    id: 'creative-production',
    slug: 'creative-production',
    title: 'Creative Direction + AI Production',
    cardTitle: 'CREATIVE DIRECTION + AI PRODUCTION',
    cardBenefit: 'Визуальный мир, сайт, релиз, мерч и промо-материалы проекта',
    description:
      'Продюсируем творческие проекты как цельную вселенную: идея, visual world, сайт, релиз, тур, мерч, контент и запуск.',
    deliverables: ['creative direction', 'AI key visual', 'сайт или лендинг', 'релиз, тур, мерч и SMM-пакет'],
    idealFor: 'артисты, релизы, спецпроекты, авторские бренды',
    priceLabel: 'от 150 000₽',
    cta: 'Обсудить проект',
    media: '/media/services/creative-production/dominia-key-visual.png',
    branch: 'polstan',
    useCases: [
      { title: 'Музыкальный или творческий релиз', description: 'Visual world, сайт, обложки, афиши, промо и digital-точка сборки.' },
      { title: 'Спецпроект или медиаистория', description: 'Клип, серия роликов, персонажи, промо-материалы, сайт и сценарий запуска.' },
      { title: 'Упаковка автора или бренда', description: 'Визуальная система, tone of voice, контент и присутствие на площадках.' }
    ],
    formats: ['Creative direction', 'AI key visual', 'Сайт или лендинг', 'Релиз, тур, мерч и SMM-пакет'],
    whatYouGet: [
      'Визуальный мир проекта, который можно развивать в разных форматах.',
      'Сайт, промо-материалы и контент-систему вместо разрозненных файлов.',
      'План запуска, где creative, production и digital работают вместе.'
    ]
  },
  {
    id: 'ai-video',
    slug: 'ai-video',
    title: 'AI-видео и рекламные рилсы',
    cardTitle: 'ПРОДАЮЩИЕ РЕКЛАМНЫЕ РОЛИКИ С AI',
    cardBenefit: 'Ролики под рекламу, Reels, клипы и запуск продукта',
    description:
      'Создаём рекламные ролики, клипы и вертикальные видео на базе AI-инструментов с режиссурой, монтажом и звуком.',
    deliverables: ['концепция и сценарий', 'AI-сцены', 'монтаж и титры', 'музыка, озвучка и SFX'],
    idealFor: 'запуски, клипы, reels, performance-реклама',
    priceLabel: 'от 80 000₽',
    cta: 'Обсудить ролик',
    media: '/media/services/ai-video/cover-influencer-reel-2026.jpg',
    branch: 'shared',
    useCases: [
      { title: 'Рекламные ролики и промо', description: 'Короткие видео для запусков, лендингов, таргета и презентаций продукта.' },
      { title: 'Reels, Shorts и VK-клипы', description: 'Вертикальный контент, который можно быстро тестировать в соцсетях.' },
      { title: 'Клипы и визуалайзеры', description: 'Музыкальные и атмосферные видео с единым визуальным стилем.' }
    ],
    formats: ['9:16', '16:9', 'cut-down версии', 'постеры и кадры для баннеров'],
    whatYouGet: [
      'Готовый ролик под нужные площадки.',
      'Пакет постеров и кадров для промо.',
      'Возможность масштабировать концепцию в серию роликов.'
    ]
  },
  {
    id: 'smm-content',
    slug: 'smm-content',
    title: 'SMM и контент',
    cardTitle: 'SMM И КОНТЕНТ',
    cardBenefit: 'Контент-план, тексты, сценарии и регулярные публикации',
    description:
      'Выстраиваем систему контента: стратегия, рубрикатор, тексты, сценарии видео, нейросети как рабочий инструмент.',
    deliverables: ['стратегия', 'контент-план', 'посты и сценарии', 'AI-шаблоны'],
    idealFor: 'бренды, эксперты, студии, авторские проекты',
    priceLabel: 'от 40 000₽',
    cta: 'Обсудить контент',
    media: '/media/services/smm-content/cover-smm-manager-2026.jpg',
    branch: 'shared',
    useCases: [
      { title: 'Стратегия и позиционирование', description: 'Цели, аудитория, роль площадок, ключевые смыслы и tone of voice.' },
      { title: 'Контент-архитектура', description: 'Рубрикатор, регулярные форматы, сценарии и календарь выпусков.' },
      { title: 'AI как рабочий инструмент', description: 'Промпты, шаблоны и процессы, которые ускоряют команду.' }
    ],
    formats: ['Контент-стратегия', 'Контент-план на 4-8 недель', 'Пакет постов и сценариев', 'AI-шаблоны для команды'],
    whatYouGet: [
      'Систему контента с понятной логикой.',
      'Регулярные материалы под выбранные площадки.',
      'Редакторский контроль и понятный tone of voice.'
    ]
  },
  {
    id: 'ai-photo',
    slug: 'ai-photo',
    title: 'AI-фото для e-commerce и key visual',
    cardTitle: 'AI ФОТО',
    cardBenefit: 'Визуалы для карточек, баннеров, рекламы и key visual',
    description:
      'Генерируем и доводим AI-фото для брендов, e-commerce, digital-баннеров, кампаний и соцсетей.',
    deliverables: ['предметные визуалы', 'key visual', 'баннеры', 'адаптации под площадки'],
    idealFor: 'e-commerce, бренды, кампании, соцсети',
    priceLabel: 'от 20 000₽ за сет',
    cta: 'Заказать визуалы',
    media: '/media/services/ai-photo/cover.jpg',
    branch: 'shared',
    useCases: [
      { title: 'E-commerce и карточки товаров', description: 'Кадры для товаров, витрин, маркетплейсов и каталогов.' },
      { title: 'Digital-баннеры и key visual', description: 'Главный визуал кампании и его адаптации под разные форматы.' },
      { title: 'Контент для соцсетей', description: 'Серии изображений для постов, сторис, обложек и анонсов.' }
    ],
    formats: ['16:9', '1:1', '4:5', '9:16', 'сеты изображений в едином стиле'],
    whatYouGet: [
      'Готовые AI-визуалы под размещение.',
      'Отобранные варианты без случайных артефактов.',
      'Адаптации под нужные площадки и размеры.'
    ]
  },
  {
    id: 'ecom-animation',
    slug: 'ecom-animation',
    title: 'ИИ-анимация и инфографика для e-commerce',
    cardTitle: 'ИИ АНИМАЦИЯ И ИНФОГРАФИКА ДЛЯ E-COM',
    cardBenefit: 'Движение, товарные сцены и понятная визуальная подача',
    description:
      'Делаем товарную анимацию, короткие product loops и визуальную инфографику для e-commerce и рекламы.',
    deliverables: ['product loops', 'товарные сцены', 'визуальная инфографика', 'постеры и кадры'],
    idealFor: 'маркетплейсы, каталоги, карточки, реклама',
    priceLabel: 'от 35 000₽',
    cta: 'Обсудить анимацию',
    media: '/media/services/ecom-animation/cover.jpg',
    branch: 'shared',
    useCases: [
      { title: 'Карточки товаров', description: 'Короткие loops и кадры для маркетплейсов, каталога и сайта.' },
      { title: 'Запуски и акции', description: 'Визуалы для кампаний, где продукт нужно показать эффектно и быстро.' },
      { title: 'Соцсети и performance', description: 'Версии под Reels, Shorts, VK-клипы и рекламные кабинеты.' }
    ],
    formats: ['Loops 4-8 секунд', 'Постеры 16:9 и 1:1', 'Вертикальные версии 9:16', 'Набор кадров для баннеров'],
    whatYouGet: [
      'Движение продукта без полноценной съёмки.',
      'Кадры и ролики под рекламные тесты.',
      'Единую визуальную систему для товара или линейки.'
    ]
  },
  {
    id: 'agentic-ai-dev',
    slug: 'agentic-ai-dev',
    title: 'Вайбкодинг и agentic AI dev',
    cardTitle: 'ВАЙБКОДИНГ И AGENTIC AI DEV',
    cardBenefit: 'MVP, SaaS, TMA, AI-боты и стабилизация AI-кода до production',
    description:
      'Agentic full-stack разработка под ключ: беру идею, сырой прототип или сломанный AI-код и довожу до стабильного релиза.',
    deliverables: ['Next.js / React / TypeScript', 'backend и БД', 'OpenAI API', 'Telegram Bot API и deploy'],
    idealFor: 'MVP, TMA, AI-боты, SaaS, rescue после AI-генераторов',
    priceLabel: 'разработка от 30 000₽',
    cta: 'Разобрать задачу',
    media: '/media/services/agentic-ai-dev/cover-hermes-product-2026.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Telegram Mini App для бизнеса', description: 'TMA до 3 экранов, API, авторизация initData, база данных и мобильный UX.' },
      { title: 'AI-бот с базой и admin-панелью', description: 'OpenAI API, PostgreSQL/Supabase, роли, заявки и управление.' },
      { title: 'MVP веб-сервиса или SaaS', description: 'Авторизация, дашборды, роли, API, база, деплой и модульная архитектура.' },
      { title: 'Стабилизация Cursor, Lovable, v0, Bolt', description: 'Аудит, типизация, state, БД, секреты, сборка, деплой и критичные фиксы.' }
    ],
    formats: ['React / Next.js / TypeScript', 'FastAPI / Django / Node.js', 'PostgreSQL / Supabase / Docker / Vercel', 'OpenAI API / Telegram Bot API'],
    whatYouGet: [
      'Рабочий production-ready этап, а не почти готовый прототип.',
      'Понятную архитектуру, которую можно развивать после запуска.',
      'Код, который можно поддерживать, показывать инвесторам и подключать к реальному бизнесу.'
    ],
    offers: [
      { id: 'telegram-mini-app', title: 'Telegram Mini App', priceLabel: 'от 30 000₽', description: 'Базовый TMA до 3 экранов + API, Telegram auth/initData и мобильный UX.' },
      { id: 'ai-bot-db-admin', title: 'AI-бот + база + admin', priceLabel: 'от 10 000₽', description: 'Бот с OpenAI API, базой данных, сценариями, заявками и панелью управления.' },
      { id: 'ai-code-rescue', title: 'AI-code rescue', priceLabel: 'от 7 000₽', description: 'Аудит и стабилизация проекта после Cursor, Lovable, Bolt, v0 или другого AI-генератора.' },
      { id: 'mvp-saas-module', title: 'MVP / SaaS модуль', priceLabel: 'от 50 000₽', description: 'Авторизация, первый дашборд, база, роли, API и deploy-ready структура.' }
    ]
  },
  {
    id: 'apps',
    slug: 'apps',
    title: 'MVP, SaaS и приложения с AI-функциями',
    cardTitle: 'MVP И SAAS-ПЛАТФОРМЫ С AI',
    cardBenefit: 'От прототипа до рабочего продукта с архитектурой, базой и деплоем',
    description:
      'Проектируем и разрабатываем MVP, SaaS, CRM, дашборды и приложения с AI-логикой, ролями, базой данных и понятным путём к релизу.',
    deliverables: ['MVP-модуль', 'дашборды и роли', 'БД и API', 'AI-функции'],
    idealFor: 'стартапы, внутренние сервисы, CRM, SaaS',
    priceLabel: 'от 50 000₽ за MVP-модуль',
    cta: 'Обсудить MVP',
    media: '/media/services/apps/cover-ai-app-product-2026.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'MVP и SaaS-платформы', description: 'Авторизация, роли пользователей, дашборды, бизнес-логика, платежи и интеграции.' },
      { title: 'CRM и внутренние сервисы', description: 'Инструменты для команды: заявки, клиенты, задачи, статусы, аналитика и админка.' },
      { title: 'AI-функции внутри продукта', description: 'Генерация, анализ, поиск по базе знаний, ассистенты, workflow и автоматизация.' }
    ],
    formats: ['Авторизация и роли', 'Дашборды и admin-панель', 'PostgreSQL/Supabase', 'OpenAI API и Telegram Bot API'],
    whatYouGet: [
      'Рабочий модуль или MVP, который можно показывать клиентам, команде или инвесторам.',
      'Код на TypeScript/Python/Node.js без случайной AI-хаотичности.',
      'Понятный план следующих этапов.'
    ]
  },
  {
    id: 'bots',
    slug: 'bots',
    title: 'Telegram-боты с AI, базой и admin-панелью',
    cardTitle: 'TELEGRAM-БОТЫ С AI И БАЗОЙ',
    cardBenefit: 'Боты для заявок, поддержки, контента, оплат и внутренних процессов',
    description:
      'Создаём Telegram-ботов и AI-ботов с базой данных, админ-панелью, сценариями, OpenAI API и интеграциями под реальные задачи бизнеса.',
    deliverables: ['Telegram Bot API', 'AI-логика', 'БД', 'admin-панель'],
    idealFor: 'заявки, поддержка, продажи, внутренние процессы',
    priceLabel: 'от 10 000₽',
    cta: 'Заказать бота',
    media: '/media/services/bots/cover.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Заявки и продажи', description: 'Сбор лидов, квизы, расчёты, консультации, уведомления и передача в CRM.' },
      { title: 'Поддержка клиентов', description: 'FAQ, статусы, запись, помощь с выбором и разгрузка команды.' },
      { title: 'AI-бот с памятью', description: 'Ответы на основе базы знаний, истории пользователя и правил вашего проекта.' }
    ],
    formats: ['Telegram Bot API', 'AI-логика OpenAI API', 'PostgreSQL/Supabase', 'Admin-панель и роли'],
    whatYouGet: [
      'Бота, который решает конкретный сценарий.',
      'Базу данных, админскую часть и интеграции по задаче.',
      'Чистую архитектуру для развития после первого запуска.'
    ]
  },
  {
    id: 'websites',
    slug: 'websites',
    title: 'Сайты и веб-сервисы с AI-функциями',
    cardTitle: 'САЙТЫ И ВЕБ-СЕРВИСЫ С AI',
    cardBenefit: 'Лендинги, кабинеты, сервисы и AI-интеграции под бизнес-задачу',
    description:
      'Делаем сайты, лендинги и веб-сервисы с современным дизайном, быстрым frontend, формами, аналитикой, AI-чатом и интеграциями.',
    deliverables: ['лендинг или сайт', 'формы и квизы', 'AI-чат', 'интеграции'],
    idealFor: 'услуги, бренды, продукты, спецпосадочные',
    priceLabel: 'от 70 000₽',
    cta: 'Обсудить сайт',
    media: '/media/services/websites/cover-white-monitor.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Лендинги под продукт или услугу', description: 'Страница с понятным предложением, визуалом и заявкой.' },
      { title: 'Сайты компаний и личные сайты', description: 'Многостраничная структура, услуги, портфолио, кейсы, блог и контакты.' },
      { title: 'Веб-сервисы и кабинеты', description: 'Личный кабинет, заявки, данные, роли, админка и интеграции с внешними API.' }
    ],
    formats: ['React/Next.js', 'Адаптивная вёрстка', 'Заявки и квизы', 'AI-чат или ассистент'],
    whatYouGet: [
      'Готовый сайт, который можно запускать в рекламу.',
      'Визуал и структуру под задачи бизнеса.',
      'Базу для дальнейшего развития проекта.'
    ]
  },
  {
    id: 'ai-agents',
    slug: 'ai-agents',
    title: 'AI-агенты и GPT-ассистенты',
    cardTitle: 'AI-АГЕНТЫ ДЛЯ БИЗНЕСА',
    cardBenefit: 'Ассистенты, workflow и базы знаний под реальные процессы',
    description:
      'Создаём GPT-ассистентов и AI-агентов для бизнеса: база знаний, инструкции, workflow, проверка входных данных и помощь команде.',
    deliverables: ['роль и инструкции', 'база знаний', 'workflow', 'тестовые сценарии'],
    idealFor: 'команды, обучение, маркетинг, внутренние процессы',
    priceLabel: 'от 25 000₽',
    cta: 'Собрать ассистента',
    media: '/media/services/ai-agents/cover.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Ассистент по базе знаний', description: 'Ответы по регламентам, продуктам, инструкциям и внутренним документам.' },
      { title: 'Маркетинговый GPT', description: 'Черновики постов, сценариев, писем и адаптаций под площадки.' },
      { title: 'Workflow-агент', description: 'Помощник для повторяемых задач, маршрутизации и проверки входных данных.' }
    ],
    formats: ['Custom GPT', 'AI-агент под процесс', 'Ассистент базы знаний', 'Workflow и approval-gates'],
    whatYouGet: [
      'Настроенного помощника под вашу задачу.',
      'Структурированные материалы и правила поведения.',
      'Инструкции и тестовые сценарии для использования.'
    ]
  }
];

const enServices: ServicePackage[] = [
  {
    id: 'music',
    slug: 'music',
    title: 'Music creation',
    cardTitle: 'MUSIC CREATION',
    cardBenefit: 'Tracks, themes, jingles and sonic identity',
    description: 'Original music for games, video, advertising, podcasts, apps and creative projects.',
    deliverables: ['tracks and themes', 'jingles', 'loops and stems', 'edit-ready versions'],
    idealFor: 'releases, video, games, apps, brands',
    priceLabel: 'from 20,000 RUB',
    cta: 'Discuss music',
    media: '/media/services/music/cover-stage-premium.jpg',
    branch: 'polstan',
    useCases: [
      { title: 'Music for video and ads', description: 'Tracks, beds, accents and versions shaped for editing.' },
      { title: 'Music for games and apps', description: 'Themes, loops, stems and atmospheric layers.' },
      { title: 'Sonic identity', description: 'Short motifs and audio logos for brands.' }
    ],
    formats: ['Full track', 'Cut-down versions', 'Loops and stems', 'Intro, outro and jingles'],
    whatYouGet: ['Music written for the exact task.', 'Files in the required formats and lengths.', 'A system that can be extended later.']
  },
  {
    id: 'sound-design',
    slug: 'sound-design',
    title: 'Voiceover and sound design',
    cardTitle: 'VOICEOVER AND SOUND DESIGN',
    cardBenefit: 'Voice, SFX and clean sound for every platform',
    description: 'Voiceover, cleanup, sound design and audio effects for videos, games, courses and apps.',
    deliverables: ['voice-over', 'SFX', 'audio cleanup', 'mixing and mastering'],
    idealFor: 'videos, games, courses, apps, podcasts',
    priceLabel: 'from 15,000 RUB',
    cta: 'Discuss sound',
    media: '/media/services/sound-design/cover.jpg',
    branch: 'polstan',
    useCases: [
      { title: 'Voiceover', description: 'Ads, courses, instructions, podcasts and presentations.' },
      { title: 'Sound design and SFX', description: 'Interface, environment, action, transition and effect sounds.' },
      { title: 'Audio cleanup', description: 'Noise cleanup, loudness, mix and publishing preparation.' }
    ],
    formats: ['Voice-over', 'SFX packs', 'Interface sounds', 'WAV/MP3/OGG files'],
    whatYouGet: ['Professionally prepared sound.', 'A file pack for your platform.', 'A system that can be updated with new lines and effects.']
  },
  {
    id: 'creative-production',
    slug: 'creative-production',
    title: 'Creative Direction + AI Production',
    cardTitle: 'CREATIVE DIRECTION + AI PRODUCTION',
    cardBenefit: 'Visual world, site, release, merch and promo materials',
    description: 'A creative project built as a complete world: idea, visual language, site, release, tour, merch, content and launch.',
    deliverables: ['creative direction', 'AI key visual', 'site or landing', 'release, tour, merch and SMM pack'],
    idealFor: 'artists, releases, special projects, author brands',
    priceLabel: 'from 150,000 RUB',
    cta: 'Discuss project',
    media: '/media/services/creative-production/dominia-key-visual.png',
    branch: 'polstan',
    useCases: [
      { title: 'Music or creative release', description: 'Visual world, site, covers, posters, promo and a digital hub.' },
      { title: 'Special project or media story', description: 'Clip, video series, characters, promo materials, site and launch plan.' },
      { title: 'Author or brand packaging', description: 'Visual system, tone of voice, content and platform presence.' }
    ],
    formats: ['Creative direction', 'AI key visual', 'Site or landing', 'Release, tour, merch and SMM pack'],
    whatYouGet: ['A visual world that can scale across formats.', 'A site, promo assets and content system.', 'A launch plan connecting creative, production and digital.']
  },
  {
    id: 'ai-video',
    slug: 'ai-video',
    title: 'AI video and advertising reels',
    cardTitle: 'AI ADVERTISING VIDEOS',
    cardBenefit: 'Videos for ads, Reels, clips and product launches',
    description: 'Advertising videos, clips and vertical content built with AI tools, direction, editing and sound.',
    deliverables: ['concept and script', 'AI scenes', 'editing and titles', 'music, voice and SFX'],
    idealFor: 'launches, clips, reels, performance ads',
    priceLabel: 'from 80,000 RUB',
    cta: 'Discuss video',
    media: '/media/services/ai-video/cover-influencer-reel-2026.jpg',
    branch: 'shared',
    useCases: [
      { title: 'Ads and promos', description: 'Short videos for launches, landings, paid traffic and product presentations.' },
      { title: 'Reels, Shorts and VK clips', description: 'Vertical content made for fast social testing.' },
      { title: 'Clips and visualizers', description: 'Music-driven videos with a unified visual style.' }
    ],
    formats: ['9:16', '16:9', 'cut-down versions', 'posters and banner frames'],
    whatYouGet: ['A ready video for the target platforms.', 'Promo posters and frames.', 'A concept that can scale into a series.']
  },
  {
    id: 'smm-content',
    slug: 'smm-content',
    title: 'SMM and content',
    cardTitle: 'SMM AND CONTENT',
    cardBenefit: 'Content plan, copy, scripts and regular publishing',
    description: 'A content system: strategy, rubricator, copy, video scripts and AI as a working tool.',
    deliverables: ['strategy', 'content plan', 'posts and scripts', 'AI templates'],
    idealFor: 'brands, experts, studios, author projects',
    priceLabel: 'from 40,000 RUB',
    cta: 'Discuss content',
    media: '/media/services/smm-content/cover-smm-manager-2026.jpg',
    branch: 'shared',
    useCases: [
      { title: 'Strategy and positioning', description: 'Goals, audience, platform roles, key meanings and tone of voice.' },
      { title: 'Content architecture', description: 'Rubricator, recurring formats, scripts and publishing calendar.' },
      { title: 'AI as a production tool', description: 'Prompts, templates and processes that speed up the team.' }
    ],
    formats: ['Content strategy', '4-8 week content plan', 'Posts and scripts pack', 'AI templates for the team'],
    whatYouGet: ['A content system with clear logic.', 'Regular materials for selected platforms.', 'Editorial control and tone of voice.']
  },
  {
    id: 'ai-photo',
    slug: 'ai-photo',
    title: 'AI photo for e-commerce and key visual',
    cardTitle: 'AI PHOTO',
    cardBenefit: 'Visuals for product cards, banners, ads and key visuals',
    description: 'AI photo generation and finishing for brands, e-commerce, digital banners, campaigns and social media.',
    deliverables: ['product visuals', 'key visual', 'banners', 'platform adaptations'],
    idealFor: 'e-commerce, brands, campaigns, social',
    priceLabel: 'from 20,000 RUB per set',
    cta: 'Request visuals',
    media: '/media/services/ai-photo/cover.jpg',
    branch: 'shared',
    useCases: [
      { title: 'E-commerce product cards', description: 'Frames for products, showcases, marketplaces and catalogues.' },
      { title: 'Digital banners and key visual', description: 'A campaign hero visual and adaptations for formats.' },
      { title: 'Social content', description: 'Image series for posts, stories, covers and announcements.' }
    ],
    formats: ['16:9', '1:1', '4:5', '9:16', 'same-style image sets'],
    whatYouGet: ['Ready AI visuals for placement.', 'Selected variants without random artifacts.', 'Adaptations for required platforms and sizes.']
  },
  {
    id: 'ecom-animation',
    slug: 'ecom-animation',
    title: 'AI animation and e-commerce infographics',
    cardTitle: 'AI ANIMATION FOR E-COM',
    cardBenefit: 'Motion, product scenes and clear visual explanation',
    description: 'Product animation, short product loops and visual infographics for e-commerce and advertising.',
    deliverables: ['product loops', 'product scenes', 'visual infographics', 'posters and frames'],
    idealFor: 'marketplaces, catalogues, product cards, ads',
    priceLabel: 'from 35,000 RUB',
    cta: 'Discuss animation',
    media: '/media/services/ecom-animation/cover.jpg',
    branch: 'shared',
    useCases: [
      { title: 'Product cards', description: 'Short loops and frames for marketplaces, catalogues and sites.' },
      { title: 'Launches and campaigns', description: 'Visuals where the product needs to look clear and impressive fast.' },
      { title: 'Social and performance', description: 'Versions for Reels, Shorts, VK clips and ad cabinets.' }
    ],
    formats: ['4-8 second loops', '16:9 and 1:1 posters', '9:16 vertical versions', 'Banner frame pack'],
    whatYouGet: ['Product motion without a full shoot.', 'Frames and videos for ad tests.', 'A unified visual system for the product line.']
  },
  {
    id: 'agentic-ai-dev',
    slug: 'agentic-ai-dev',
    title: 'Vibe coding and agentic AI dev',
    cardTitle: 'VIBE CODING AND AGENTIC AI DEV',
    cardBenefit: 'MVP, SaaS, TMA, AI bots and AI-code stabilization',
    description: 'Agentic full-stack development: from idea, raw prototype or broken AI-generated code to stable release.',
    deliverables: ['Next.js / React / TypeScript', 'backend and DB', 'OpenAI API', 'Telegram Bot API and deploy'],
    idealFor: 'MVP, TMA, AI bots, SaaS, rescue after AI generators',
    priceLabel: 'development from 30,000 RUB',
    cta: 'Review task',
    media: '/media/services/agentic-ai-dev/cover-hermes-product-2026.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Telegram Mini App', description: 'TMA up to 3 screens, API, initData auth, database and mobile UX.' },
      { title: 'AI bot with DB and admin', description: 'OpenAI API, PostgreSQL/Supabase, roles, requests and management.' },
      { title: 'MVP or SaaS web service', description: 'Auth, dashboards, roles, API, database, deploy and modular architecture.' },
      { title: 'Cursor, Lovable, v0, Bolt stabilization', description: 'Audit, typing, state, DB, secrets, build, deploy and critical fixes.' }
    ],
    formats: ['React / Next.js / TypeScript', 'FastAPI / Django / Node.js', 'PostgreSQL / Supabase / Docker / Vercel', 'OpenAI API / Telegram Bot API'],
    whatYouGet: ['A production-ready stage, not an almost-working prototype.', 'Architecture that can grow after launch.', 'Maintainable code suitable for business use.'],
    offers: [
      { id: 'telegram-mini-app', title: 'Telegram Mini App', priceLabel: 'from 30,000 RUB', description: 'Basic TMA up to 3 screens + API, Telegram auth/initData and mobile UX.' },
      { id: 'ai-bot-db-admin', title: 'AI bot + DB + admin', priceLabel: 'from 10,000 RUB', description: 'Bot with OpenAI API, database, scenarios, requests and admin panel.' },
      { id: 'ai-code-rescue', title: 'AI-code rescue', priceLabel: 'from 7,000 RUB', description: 'Audit and stabilization after Cursor, Lovable, Bolt, v0 or another AI generator.' },
      { id: 'mvp-saas-module', title: 'MVP / SaaS module', priceLabel: 'from 50,000 RUB', description: 'Auth, first dashboard, database, roles, API and deploy-ready structure.' }
    ]
  },
  {
    id: 'apps',
    slug: 'apps',
    title: 'MVP, SaaS and apps with AI functions',
    cardTitle: 'MVP AND AI SAAS PLATFORMS',
    cardBenefit: 'From prototype to product with architecture, DB and deploy',
    description: 'MVP, SaaS, CRM, dashboards and apps with AI logic, roles, database and a clear release path.',
    deliverables: ['MVP module', 'dashboards and roles', 'DB and API', 'AI functions'],
    idealFor: 'startups, internal tools, CRM, SaaS',
    priceLabel: 'from 50,000 RUB per MVP module',
    cta: 'Discuss MVP',
    media: '/media/services/apps/cover-ai-app-product-2026.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'MVP and SaaS platforms', description: 'Auth, user roles, dashboards, business logic, payments and integrations.' },
      { title: 'CRM and internal tools', description: 'Requests, clients, tasks, statuses, analytics and admin panels.' },
      { title: 'AI features inside products', description: 'Generation, analysis, knowledge search, assistants, workflow and automation.' }
    ],
    formats: ['Auth and roles', 'Dashboards and admin', 'PostgreSQL/Supabase', 'OpenAI API and Telegram Bot API'],
    whatYouGet: ['A working module or MVP for clients, team or investors.', 'Code without random AI-generated chaos.', 'A clear next-step roadmap.']
  },
  {
    id: 'bots',
    slug: 'bots',
    title: 'Telegram bots with AI, DB and admin panel',
    cardTitle: 'TELEGRAM BOTS WITH AI AND DB',
    cardBenefit: 'Bots for leads, support, content, payments and internal workflows',
    description: 'Telegram bots and AI bots with database, admin panel, scenarios, OpenAI API and integrations.',
    deliverables: ['Telegram Bot API', 'AI logic', 'database', 'admin panel'],
    idealFor: 'leads, support, sales, internal processes',
    priceLabel: 'from 10,000 RUB',
    cta: 'Order bot',
    media: '/media/services/bots/cover.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Leads and sales', description: 'Lead capture, quizzes, calculations, consultations, notifications and CRM handoff.' },
      { title: 'Customer support', description: 'FAQ, statuses, booking, choice support and team load reduction.' },
      { title: 'AI bot with memory', description: 'Answers based on knowledge base, user history and project rules.' }
    ],
    formats: ['Telegram Bot API', 'OpenAI API logic', 'PostgreSQL/Supabase', 'Admin panel and roles'],
    whatYouGet: ['A bot that solves a real scenario.', 'Database, admin layer and required integrations.', 'Clean architecture for the next release.']
  },
  {
    id: 'websites',
    slug: 'websites',
    title: 'Sites and web services with AI functions',
    cardTitle: 'SITES AND WEB SERVICES WITH AI',
    cardBenefit: 'Landings, dashboards, services and AI integrations',
    description: 'Sites, landings and web services with modern design, fast frontend, forms, analytics, AI chat and integrations.',
    deliverables: ['landing or site', 'forms and quizzes', 'AI chat', 'integrations'],
    idealFor: 'services, brands, products, campaign landings',
    priceLabel: 'from 70,000 RUB',
    cta: 'Discuss site',
    media: '/media/services/websites/cover-white-monitor.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Product or service landings', description: 'A page with a clear offer, visuals and lead capture.' },
      { title: 'Company and personal sites', description: 'Multi-page structure, services, portfolio, cases, blog and contacts.' },
      { title: 'Web services and dashboards', description: 'Account area, requests, data, roles, admin and external API integrations.' }
    ],
    formats: ['React/Next.js', 'Responsive frontend', 'Forms and quizzes', 'AI chat or assistant'],
    whatYouGet: ['A site ready for traffic.', 'Visuals and structure shaped around business goals.', 'A base for further product development.']
  },
  {
    id: 'ai-agents',
    slug: 'ai-agents',
    title: 'AI agents and GPT assistants',
    cardTitle: 'AI AGENTS FOR BUSINESS',
    cardBenefit: 'Assistants, workflows and knowledge bases for real processes',
    description: 'GPT assistants and AI agents for business: knowledge base, instructions, workflow, input checks and team support.',
    deliverables: ['role and instructions', 'knowledge base', 'workflow', 'test scenarios'],
    idealFor: 'teams, training, marketing, internal processes',
    priceLabel: 'from 25,000 RUB',
    cta: 'Build assistant',
    media: '/media/services/ai-agents/cover.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Knowledge-base assistant', description: 'Answers based on regulations, products, instructions and internal documents.' },
      { title: 'Marketing GPT', description: 'Drafts for posts, scripts, emails and platform adaptations.' },
      { title: 'Workflow agent', description: 'Support for repeatable tasks, routing and input validation.' }
    ],
    formats: ['Custom GPT', 'Process AI agent', 'Knowledge-base assistant', 'Workflow and approval gates'],
    whatYouGet: ['An assistant configured for your task.', 'Structured materials and behavior rules.', 'Instructions and test scenarios for use.']
  }
];

export const content: Record<Locale, SiteContent> = {
  ru: {
    locale: 'ru',
    meta: {
      title: 'Stanislav Polesko - Music, Creative Direction, AI Production',
      description:
        'Мобильная витрина услуг Станислава Полеско: музыка, creative direction, AI production и полный каталог Real Vibe услуг.'
    },
    nav: {
      home: 'Главная',
      services: 'Услуги',
      drops: 'Дропы',
      contact: 'Контакт'
    },
    hero: {
      name: 'STANISLAV POLESKO',
      role: 'Grammy producer / composer / creative direction / AI production',
      body:
        'Музыка, визуальные решения, AI production и полный production stack для артистов, брендов и бизнес-задач.',
      primaryCta: 'Собрать заявку',
      secondaryCta: 'Смотреть услуги',
      status: 'Moscow / worldwide'
    },
    servicesIntro: {
      title: 'Что нужно собрать?',
      body:
        'Музыка, звук, AI-видео, визуалы, контент, сайты, боты и MVP. Добавьте одно или несколько направлений в заявку.'
    },
    services: ruServices,
    proof: {
      title: 'Сцена, студия, продукт.',
      body:
        'Визуальная система сайта держится на реальном концертном материале: свет, дым, плотность зала и темная металлическая эстетика.',
      points: ['live energy', 'production discipline', 'sales funnel']
    },
    dropsIntro: {
      title: 'Limited drops',
      body:
        'Мерч и артефакты проекта остаются отдельной витриной. Их можно добавить в ту же заявку вместе с услугами.'
    },
    drops: [
      {
        id: 'dominina-shirt',
        title: 'Dominina shirt',
        type: 'Merch / limited',
        media: '/media/dominina-shirt.jpg',
        status: 'manual order',
        availabilityLabel: 'наличие уточняется',
        cta: 'Добавить дроп'
      }
    ],
    contact: {
      title: 'Опишите задачу.',
      body:
        'Соберите подборку услуг, оставьте вводные и удобный контакт. Telegram-сообщение уйдет с услугами, ценами и Roistat, если он пришел из рекламы.',
      telegramCta: 'Открыть Telegram',
      submitCta: 'Собрать заявку',
      success: 'Заявка собрана. Telegram откроется в новом окне.',
      fields: {
        selectedOffering: 'Подборка',
        name: 'Имя',
        contact: 'Контакт',
        budgetRange: 'Бюджет',
        timeline: 'Срок',
        message: 'Вводные'
      },
      placeholders: {
        name: 'Как к вам обращаться',
        contact: '@telegram, email или телефон',
        message: 'Коротко: проект, задача, референсы, дедлайн'
      },
      options: {
        budget: ['уточнить после вводных', 'до 50 000₽', '50 000-150 000₽', '150 000₽+'],
        timeline: ['срочно', '2-4 недели', '1-3 месяца', 'исследуем']
      }
    }
  },
  en: {
    locale: 'en',
    meta: {
      title: 'Stanislav Polesko - Music, Creative Direction, AI Production',
      description:
        'Mobile services showcase for Stanislav Polesko: music, creative direction, AI production and the full Real Vibe service catalog.'
    },
    nav: {
      home: 'Home',
      services: 'Services',
      drops: 'Drops',
      contact: 'Contact'
    },
    hero: {
      name: 'STANISLAV POLESKO',
      role: 'Grammy producer / composer / creative direction / AI production',
      body:
        'Music, visual systems, AI production and a full production stack for artists, brands and business tasks.',
      primaryCta: 'Build inquiry',
      secondaryCta: 'View services',
      status: 'Moscow / worldwide'
    },
    servicesIntro: {
      title: 'What should we build?',
      body:
        'Music, sound, AI video, visuals, content, websites, bots and MVPs. Add one or more directions to the inquiry.'
    },
    services: enServices,
    proof: {
      title: 'Stage, studio, product.',
      body:
        'The site system is built from real concert material: light, smoke, room pressure and a dark metal-driven atmosphere.',
      points: ['live energy', 'production discipline', 'sales funnel']
    },
    dropsIntro: {
      title: 'Limited drops',
      body:
        'Merch and project artifacts remain a separate shop surface. They can be added to the same inquiry with services.'
    },
    drops: [
      {
        id: 'dominina-shirt',
        title: 'Dominina shirt',
        type: 'Merch / limited',
        media: '/media/dominina-shirt.jpg',
        status: 'manual order',
        availabilityLabel: 'availability on request',
        cta: 'Add drop'
      }
    ],
    contact: {
      title: 'Tell me the task.',
      body:
        'Build a service selection, add context and a preferred contact. The Telegram message includes services, prices and Roistat attribution when present.',
      telegramCta: 'Open Telegram',
      submitCta: 'Build inquiry',
      success: 'Inquiry prepared. Telegram will open in a new window.',
      fields: {
        selectedOffering: 'Selection',
        name: 'Name',
        contact: 'Contact',
        budgetRange: 'Budget',
        timeline: 'Timeline',
        message: 'Context'
      },
      placeholders: {
        name: 'How should we address you',
        contact: '@telegram, email or phone',
        message: 'Project, task, references, deadline'
      },
      options: {
        budget: ['define after context', 'under 50,000 RUB', '50,000-150,000 RUB', '150,000 RUB+'],
        timeline: ['urgent', '2-4 weeks', '1-3 months', 'exploring']
      }
    }
  }
};

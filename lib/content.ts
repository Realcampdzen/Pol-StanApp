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
    cardBenefit: 'Музыкальная тема, джинглы, лупы и стемы под проект',
    description:
      'Пишем авторскую музыку для игр, видео, рекламы, подкастов, приложений и творческих проектов.',
    deliverables: ['основной трек', 'джинглы', 'лупы и стемы', 'версии под монтаж'],
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
    formats: ['Полная версия трека', 'Короткие версии', 'Лупы и стемы', 'Интро, аутро и джинглы'],
    whatYouGet: [
      'Музыкальную основу, написанную под вашу задачу.',
      'Файлы в нужных форматах и длительностях.',
      'Материал, который можно развивать в следующих релизах и роликах.'
    ]
  },
  {
    id: 'sound-design',
    slug: 'sound-design',
    title: 'Озвучка и саунд-дизайн',
    cardTitle: 'ОЗВУЧКА И САУНД-ДИЗАЙН',
    cardBenefit: 'Озвучка, SFX и чистый звук под площадки',
    description:
      'Готовим голос, чистим запись, собираем саунд-дизайн и эффекты для видео, игр, курсов и приложений.',
    deliverables: ['озвучка', 'звуковые эффекты', 'чистка аудио', 'сведение и мастеринг'],
    idealFor: 'ролики, игры, курсы, приложения, подкасты',
    priceLabel: 'от 15 000₽',
    cta: 'Обсудить звук',
    media: '/media/services/sound-design/cover.jpg',
    branch: 'polstan',
    useCases: [
      { title: 'Озвучка', description: 'Рекламные ролики, курсы, инструкции, подкасты и презентации.' },
      { title: 'Саунд-дизайн и SFX', description: 'Звуки интерфейса, окружения, действий, переходов и спецэффектов.' },
      { title: 'Обработка звука', description: 'Очистка, выравнивание громкости, сведение и подготовка под публикацию.' }
    ],
    formats: ['Озвучка', 'Пакеты SFX', 'Звуки интерфейса', 'WAV/MP3/OGG-файлы'],
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
    cardBenefit: 'Образ проекта, сайт, релиз, мерч и промо в одной системе',
    description:
      'Собираем творческий проект как цельный мир: идея, визуальный язык, сайт, релиз, тур, мерч, контент и запуск.',
    deliverables: ['креативная концепция', 'AI-визуалы', 'сайт или лендинг', 'релиз, тур, мерч и SMM-пакет'],
    idealFor: 'артисты, релизы, спецпроекты, авторские бренды',
    priceLabel: 'от 150 000₽',
    cta: 'Обсудить проект',
    media: '/media/services/creative-production/dominia-key-visual.png',
    branch: 'polstan',
    useCases: [
      { title: 'Музыкальный или творческий релиз', description: 'Визуальный мир, сайт, обложки, афиши, промо и точка сборки проекта.' },
      { title: 'Спецпроект или медиаистория', description: 'Клип, серия роликов, персонажи, промо-материалы, сайт и сценарий запуска.' },
      { title: 'Упаковка автора или бренда', description: 'Визуальная система, тон коммуникации, контент и присутствие на площадках.' }
    ],
    formats: ['Креативная концепция', 'AI-визуалы', 'Сайт или лендинг', 'Релиз, тур, мерч и SMM-пакет'],
    whatYouGet: [
      'Визуальный мир проекта, который можно развивать в разных форматах.',
      'Сайт, промо-материалы и контент-систему вместо разрозненных файлов.',
      'План запуска, где креатив, продакшн и digital работают вместе.'
    ]
  },
  {
    id: 'ai-video',
    slug: 'ai-video',
    title: 'AI-видео и рекламные ролики',
    cardTitle: 'ПРОДАЮЩИЕ РЕКЛАМНЫЕ РОЛИКИ С AI',
    cardBenefit: 'Вертикальные ролики, клипы и промо для запуска',
    description:
      'Создаём рекламные ролики, клипы и вертикальные видео на базе AI-инструментов с режиссурой, монтажом и звуком.',
    deliverables: ['концепция и сценарий', 'AI-сцены', 'монтаж и титры', 'музыка, озвучка и SFX'],
    idealFor: 'запуски, клипы, reels, рекламные тесты',
    priceLabel: 'от 80 000₽',
    cta: 'Обсудить ролик',
    media: '/media/services/ai-video/cover-influencer-reel-2026.jpg',
    branch: 'shared',
    useCases: [
      { title: 'Рекламные ролики и промо', description: 'Короткие видео для запусков, лендингов, таргета и презентаций продукта.' },
      { title: 'Reels, Shorts и VK-клипы', description: 'Вертикальный контент, который можно быстро тестировать в соцсетях.' },
      { title: 'Клипы и визуалайзеры', description: 'Музыкальные и атмосферные видео с единым визуальным стилем.' }
    ],
    formats: ['9:16', '16:9', 'короткие версии', 'постеры и кадры для баннеров'],
    whatYouGet: [
      'Готовый ролик под нужные площадки.',
      'Пакет постеров и кадров для промо.',
      'Концепцию, которую можно масштабировать в серию роликов.'
    ]
  },
  {
    id: 'smm-content',
    slug: 'smm-content',
    title: 'SMM и контент',
    cardTitle: 'SMM И КОНТЕНТ',
    cardBenefit: 'Контент-план, тексты, сценарии и регулярные публикации',
    description:
      'Выстраиваем систему контента: стратегия, рубрики, тексты, сценарии видео и AI-инструменты для регулярной работы.',
    deliverables: ['стратегия', 'контент-план', 'посты и сценарии', 'AI-шаблоны'],
    idealFor: 'бренды, эксперты, студии, авторские проекты',
    priceLabel: 'от 40 000₽',
    cta: 'Обсудить контент',
    media: '/media/services/smm-content/cover-smm-manager-2026.jpg',
    branch: 'shared',
    useCases: [
      { title: 'Стратегия и позиционирование', description: 'Цели, аудитория, роль площадок, ключевые смыслы и тон коммуникации.' },
      { title: 'Контент-архитектура', description: 'Рубрики, регулярные форматы, сценарии и календарь выпусков.' },
      { title: 'AI как рабочий инструмент', description: 'Промпты, шаблоны и процессы, которые ускоряют команду.' }
    ],
    formats: ['Контент-стратегия', 'Контент-план на 4-8 недель', 'Пакет постов и сценариев', 'AI-шаблоны для команды'],
    whatYouGet: [
      'Систему контента с понятной логикой.',
      'Регулярные материалы под выбранные площадки.',
      'Редакторский контроль и понятный тон коммуникации.'
    ]
  },
  {
    id: 'ai-photo',
    slug: 'ai-photo',
    title: 'AI-фото и key visual',
    cardTitle: 'AI ФОТО',
    cardBenefit: 'Визуалы для карточек, баннеров, рекламы и главного образа кампании',
    description:
      'Генерируем и доводим AI-фото для брендов, e-commerce, digital-баннеров, кампаний и соцсетей.',
    deliverables: ['предметные визуалы', 'главный визуал', 'баннеры', 'адаптации под площадки'],
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
    cardTitle: 'AI-АНИМАЦИЯ ДЛЯ E-COM',
    cardBenefit: 'Движение, товарные сцены и понятная визуальная подача',
    description:
      'Делаем товарную анимацию, короткие ролики и визуальную инфографику для e-commerce и рекламы.',
    deliverables: ['товарные анимации', 'товарные сцены', 'визуальная инфографика', 'постеры и кадры'],
    idealFor: 'маркетплейсы, каталоги, карточки, реклама',
    priceLabel: 'от 35 000₽',
    cta: 'Обсудить анимацию',
    media: '/media/services/ecom-animation/cover.jpg',
    branch: 'shared',
    useCases: [
      { title: 'Карточки товаров', description: 'Короткие анимации и кадры для маркетплейсов, каталога и сайта.' },
      { title: 'Запуски и акции', description: 'Визуалы для кампаний, где продукт нужно показать эффектно и быстро.' },
      { title: 'Соцсети и реклама', description: 'Версии под Reels, Shorts, VK-клипы и рекламные кабинеты.' }
    ],
    formats: ['Анимации 4-8 секунд', 'Постеры 16:9 и 1:1', 'Вертикальные версии 9:16', 'Набор кадров для баннеров'],
    whatYouGet: [
      'Движение продукта без полноценной съёмки.',
      'Кадры и ролики под рекламные тесты.',
      'Единую визуальную систему для товара или линейки.'
    ]
  },
  {
    id: 'agentic-ai-dev',
    slug: 'agentic-ai-dev',
    title: 'Вайбкодинг и AI-разработка',
    cardTitle: 'ВАЙБКОДИНГ И AI-РАЗРАБОТКА',
    cardBenefit: 'MVP, SaaS, Telegram Apps, AI-боты и доведение AI-кода до релиза',
    description:
      'Быстрая разработка цифровых продуктов: от идеи, сырого прототипа или сломанного AI-кода до стабильного запуска.',
    deliverables: ['фронтенд на React/Next.js', 'бэкенд и база данных', 'AI-интеграции', 'Telegram и запуск'],
    idealFor: 'MVP, Telegram Apps, AI-боты, SaaS, спасение AI-прототипов',
    priceLabel: 'разработка от 30 000₽',
    cta: 'Разобрать задачу',
    media: '/media/services/agentic-ai-dev/cover-hermes-product-2026.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Telegram Mini App для бизнеса', description: 'Мини-приложение до 3 экранов, API, авторизация, база данных и мобильный UX.' },
      { title: 'AI-бот с базой и админ-панелью', description: 'OpenAI API, база данных, роли, заявки и управление процессом.' },
      { title: 'MVP веб-сервиса или SaaS', description: 'Авторизация, дашборды, роли, API, база, деплой и модульная архитектура.' },
      { title: 'Стабилизация Cursor, Lovable, v0, Bolt', description: 'Аудит, типизация, состояние, база, сборка, деплой и критичные фиксы.' }
    ],
    formats: ['React / Next.js / TypeScript', 'Бэкенд на Node.js или Python', 'PostgreSQL / Supabase / Docker', 'OpenAI API / Telegram Bot API'],
    whatYouGet: [
      'Рабочий этап, который можно показывать пользователям, команде или инвесторам.',
      'Понятную архитектуру, которую можно развивать после запуска.',
      'Код, который можно поддерживать и подключать к реальному бизнесу.'
    ],
    offers: [
      { id: 'telegram-mini-app', title: 'Telegram Mini App', priceLabel: 'от 30 000₽', description: 'Мини-приложение до 3 экранов, API, Telegram-авторизация и мобильный UX.' },
      { id: 'ai-bot-db-admin', title: 'AI-бот + база + админка', priceLabel: 'от 10 000₽', description: 'Бот с OpenAI API, базой данных, сценариями, заявками и панелью управления.' },
      { id: 'ai-code-rescue', title: 'Спасение AI-кода', priceLabel: 'от 7 000₽', description: 'Аудит и стабилизация проекта после Cursor, Lovable, Bolt, v0 или другого AI-генератора.' },
      { id: 'mvp-saas-module', title: 'MVP / SaaS модуль', priceLabel: 'от 50 000₽', description: 'Авторизация, первый дашборд, база, роли, API и структура для деплоя.' }
    ]
  },
  {
    id: 'apps',
    slug: 'apps',
    title: 'MVP, SaaS и приложения с AI-функциями',
    cardTitle: 'MVP И SAAS-ПЛАТФОРМЫ С AI',
    cardBenefit: 'От прототипа до рабочего продукта с архитектурой, базой и запуском',
    description:
      'Проектируем и разрабатываем MVP, SaaS, CRM, дашборды и приложения с AI-логикой, ролями, базой данных и понятным путём к релизу.',
    deliverables: ['MVP-модуль', 'дашборды и роли', 'база данных и API', 'AI-функции'],
    idealFor: 'стартапы, внутренние сервисы, CRM, SaaS',
    priceLabel: 'от 50 000₽ за MVP-модуль',
    cta: 'Обсудить MVP',
    media: '/media/services/apps/cover-ai-app-product-2026.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'MVP и SaaS-платформы', description: 'Авторизация, роли пользователей, дашборды, бизнес-логика, платежи и интеграции.' },
      { title: 'CRM и внутренние сервисы', description: 'Инструменты для команды: заявки, клиенты, задачи, статусы, аналитика и админка.' },
      { title: 'AI-функции внутри продукта', description: 'Генерация, анализ, поиск по базе знаний, ассистенты и автоматизация.' }
    ],
    formats: ['Авторизация и роли', 'Дашборды и админ-панель', 'PostgreSQL/Supabase', 'OpenAI API и Telegram Bot API'],
    whatYouGet: [
      'Рабочий модуль или MVP, который можно показывать клиентам, команде или инвесторам.',
      'Код на TypeScript, Python или Node.js без случайных решений.',
      'Понятный план следующих этапов.'
    ]
  },
  {
    id: 'bots',
    slug: 'bots',
    title: 'Telegram-боты с AI, базой и админ-панелью',
    cardTitle: 'TELEGRAM-БОТЫ С AI И БАЗОЙ',
    cardBenefit: 'Боты для заявок, поддержки, контента, оплат и внутренних процессов',
    description:
      'Создаём Telegram-ботов и AI-ботов с базой данных, админ-панелью, сценариями, OpenAI API и интеграциями под реальные задачи бизнеса.',
    deliverables: ['Telegram Bot API', 'AI-логика', 'база данных', 'админ-панель'],
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
    formats: ['Telegram Bot API', 'AI-логика OpenAI API', 'PostgreSQL/Supabase', 'Админ-панель и роли'],
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
      'Делаем сайты, лендинги и веб-сервисы с современным дизайном, быстрым фронтендом, формами, аналитикой, AI-чатом и интеграциями.',
    deliverables: ['лендинг или сайт', 'формы и квизы', 'AI-чат', 'интеграции'],
    idealFor: 'услуги, бренды, продукты, посадочные страницы',
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
    cardBenefit: 'Ассистенты, рабочие сценарии и базы знаний под реальные процессы',
    description:
      'Создаём GPT-ассистентов и AI-агентов для бизнеса: база знаний, инструкции, рабочие сценарии, проверка входных данных и помощь команде.',
    deliverables: ['роль и инструкции', 'база знаний', 'рабочие сценарии', 'тестовые сценарии'],
    idealFor: 'команды, обучение, маркетинг, внутренние процессы',
    priceLabel: 'от 25 000₽',
    cta: 'Собрать ассистента',
    media: '/media/services/ai-agents/cover.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Ассистент по базе знаний', description: 'Ответы по регламентам, продуктам, инструкциям и внутренним документам.' },
      { title: 'Маркетинговый GPT', description: 'Черновики постов, сценариев, писем и адаптаций под площадки.' },
      { title: 'Агент под рабочий процесс', description: 'Помощник для повторяемых задач, маршрутизации и проверки входных данных.' }
    ],
    formats: ['Custom GPT', 'AI-агент под процесс', 'Ассистент базы знаний', 'Рабочий сценарий и этапы согласования'],
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
    formats: ['Full track', 'Short versions', 'Loops and stems', 'Intro, outro and jingles'],
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
    cardBenefit: 'Project identity, site, release, merch and promo in one system',
    description: 'A creative project built as a complete world: idea, visual language, site, release, tour, merch, content and launch.',
    deliverables: ['creative direction', 'AI key visual', 'site or landing', 'release, tour, merch and SMM pack'],
    idealFor: 'artists, releases, special projects, author brands',
    priceLabel: 'from 150,000 RUB',
    cta: 'Discuss project',
    media: '/media/services/creative-production/dominia-key-visual.png',
    branch: 'polstan',
    useCases: [
      { title: 'Music or creative release', description: 'Visual identity, site, covers, posters, promo and a digital hub.' },
      { title: 'Special project or media story', description: 'Clip, video series, characters, promo materials, site and launch plan.' },
      { title: 'Author or brand packaging', description: 'Visual system, communication tone, content and platform presence.' }
    ],
    formats: ['Creative direction', 'AI key visual', 'Site or landing', 'Release, tour, merch and SMM pack'],
    whatYouGet: ['A project world that can scale across formats.', 'A site, promo assets and content system.', 'A launch plan connecting creative, production and digital.']
  },
  {
    id: 'ai-video',
    slug: 'ai-video',
    title: 'AI video and advertising reels',
    cardTitle: 'AI ADVERTISING VIDEOS',
    cardBenefit: 'Videos for ads, Reels, clips and product launches',
    description: 'Advertising videos, clips and vertical content built with AI tools, direction, editing and sound.',
    deliverables: ['concept and script', 'AI scenes', 'editing and titles', 'music, voice and SFX'],
    idealFor: 'launches, clips, reels, ad tests',
    priceLabel: 'from 80,000 RUB',
    cta: 'Discuss video',
    media: '/media/services/ai-video/cover-influencer-reel-2026.jpg',
    branch: 'shared',
    useCases: [
      { title: 'Ads and promos', description: 'Short videos for launches, landings, paid traffic and product presentations.' },
      { title: 'Reels, Shorts and VK clips', description: 'Vertical content made for fast social testing.' },
      { title: 'Clips and visualizers', description: 'Music-driven videos with a unified visual style.' }
    ],
    formats: ['9:16', '16:9', 'short versions', 'posters and banner frames'],
    whatYouGet: ['A ready video for the target platforms.', 'Promo posters and frames.', 'A concept that can scale into a series.']
  },
  {
    id: 'smm-content',
    slug: 'smm-content',
    title: 'SMM and content',
    cardTitle: 'SMM AND CONTENT',
    cardBenefit: 'Content plan, copy, scripts and regular publishing',
    description: 'A content system: strategy, content pillars, copy, video scripts and AI tools for regular production.',
    deliverables: ['strategy', 'content plan', 'posts and scripts', 'AI templates'],
    idealFor: 'brands, experts, studios, author projects',
    priceLabel: 'from 40,000 RUB',
    cta: 'Discuss content',
    media: '/media/services/smm-content/cover-smm-manager-2026.jpg',
    branch: 'shared',
    useCases: [
      { title: 'Strategy and positioning', description: 'Goals, audience, platform roles, key messages and communication tone.' },
      { title: 'Content architecture', description: 'Content pillars, recurring formats, scripts and publishing calendar.' },
      { title: 'AI as a production tool', description: 'Prompts, templates and processes that speed up the team.' }
    ],
    formats: ['Content strategy', '4-8 week content plan', 'Posts and scripts pack', 'AI templates for the team'],
    whatYouGet: ['A content system with clear logic.', 'Regular materials for selected platforms.', 'Editorial control and communication tone.']
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
      { title: 'Social and ads', description: 'Versions for Reels, Shorts, VK clips and ad accounts.' }
    ],
    formats: ['4-8 second loops', '16:9 and 1:1 posters', '9:16 vertical versions', 'Banner frame pack'],
    whatYouGet: ['Product motion without a full shoot.', 'Frames and videos for ad tests.', 'A unified visual system for the product line.']
  },
  {
    id: 'agentic-ai-dev',
    slug: 'agentic-ai-dev',
    title: 'Vibe coding and AI development',
    cardTitle: 'VIBE CODING AND AI DEVELOPMENT',
    cardBenefit: 'MVP, SaaS, Telegram Apps, AI bots and AI-code stabilization',
    description: 'Fast digital product development: from idea, raw prototype or broken AI-generated code to a stable launch.',
    deliverables: ['React/Next.js frontend', 'backend and database', 'AI integrations', 'Telegram and deploy'],
    idealFor: 'MVP, Telegram Apps, AI bots, SaaS, AI-prototype rescue',
    priceLabel: 'development from 30,000 RUB',
    cta: 'Review task',
    media: '/media/services/agentic-ai-dev/cover-hermes-product-2026.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Telegram Mini App', description: 'Mini app up to 3 screens, API, auth, database and mobile UX.' },
      { title: 'AI bot with DB and admin', description: 'OpenAI API, database, roles, requests and process management.' },
      { title: 'MVP or SaaS web service', description: 'Auth, dashboards, roles, API, database, deploy and modular architecture.' },
      { title: 'Cursor, Lovable, v0, Bolt stabilization', description: 'Audit, typing, state, DB, secrets, build, deploy and critical fixes.' }
    ],
    formats: ['React / Next.js / TypeScript', 'Node.js or Python backend', 'PostgreSQL / Supabase / Docker', 'OpenAI API / Telegram Bot API'],
    whatYouGet: ['A working stage ready for users, team or investors.', 'Architecture that can grow after launch.', 'Maintainable code suitable for business use.'],
    offers: [
      { id: 'telegram-mini-app', title: 'Telegram Mini App', priceLabel: 'from 30,000 RUB', description: 'Mini app up to 3 screens, API, Telegram auth and mobile UX.' },
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
    cardBenefit: 'From prototype to product with architecture, database and launch',
    description: 'MVP, SaaS, CRM, dashboards and apps with AI logic, roles, database and a clear release path.',
    deliverables: ['MVP module', 'dashboards and roles', 'database and API', 'AI functions'],
    idealFor: 'startups, internal tools, CRM, SaaS',
    priceLabel: 'from 50,000 RUB per MVP module',
    cta: 'Discuss MVP',
    media: '/media/services/apps/cover-ai-app-product-2026.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'MVP and SaaS platforms', description: 'Auth, user roles, dashboards, business logic, payments and integrations.' },
      { title: 'CRM and internal tools', description: 'Requests, clients, tasks, statuses, analytics and admin panels.' },
      { title: 'AI features inside products', description: 'Generation, analysis, knowledge search, assistants and automation.' }
    ],
    formats: ['Auth and roles', 'Dashboards and admin', 'PostgreSQL/Supabase', 'OpenAI API and Telegram Bot API'],
    whatYouGet: ['A working module or MVP for clients, team or investors.', 'Code without random AI shortcuts.', 'A clear next-step roadmap.']
  },
  {
    id: 'bots',
    slug: 'bots',
    title: 'Telegram bots with AI, DB and admin panel',
    cardTitle: 'TELEGRAM BOTS WITH AI AND DB',
    cardBenefit: 'Bots for leads, support, content, payments and internal processes',
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
    cardBenefit: 'Assistants, operating scenarios and knowledge bases for real processes',
    description: 'GPT assistants and AI agents for business: knowledge base, instructions, operating scenarios, input checks and team support.',
    deliverables: ['role and instructions', 'knowledge base', 'operating scenarios', 'test scenarios'],
    idealFor: 'teams, training, marketing, internal processes',
    priceLabel: 'from 25,000 RUB',
    cta: 'Build assistant',
    media: '/media/services/ai-agents/cover.jpg',
    branch: 'real-vibe',
    useCases: [
      { title: 'Knowledge-base assistant', description: 'Answers based on regulations, products, instructions and internal documents.' },
      { title: 'Marketing GPT', description: 'Drafts for posts, scripts, emails and platform adaptations.' },
      { title: 'Process agent', description: 'Support for repeatable tasks, routing and input validation.' }
    ],
    formats: ['Custom GPT', 'Process AI agent', 'Knowledge-base assistant', 'Operating scenario and approval gates'],
    whatYouGet: ['An assistant configured for your task.', 'Structured materials and behavior rules.', 'Instructions and test scenarios for use.']
  }
];

export const content: Record<Locale, SiteContent> = {
  ru: {
    locale: 'ru',
    meta: {
      title: 'Stanislav Polesko - Music, Creative Direction, AI Production',
      description:
        'Музыка, звук, AI-видео, визуалы, сайты, боты и MVP под задачи артистов, брендов и бизнеса.'
    },
    nav: {
      home: 'Главная',
      services: 'Услуги',
      drops: 'Дропы',
      contact: 'Контакт'
    },
    hero: {
      name: 'STANISLAV POLESKO',
      role: 'Grammy producer / composer / creative director / AI production',
      body:
        'Музыка, звук, визуальные решения, AI-продакшн и digital-разработка для артистов, брендов и бизнес-задач.',
      primaryCta: 'Собрать заявку',
      secondaryCta: 'Смотреть услуги',
      status: 'Moscow / worldwide'
    },
    servicesIntro: {
      title: 'Что нужно собрать?',
      body:
        'Выберите одно направление или соберите проект из нескольких: музыка, звук, AI-видео, визуалы, контент, сайты, боты и MVP.'
    },
    services: ruServices,
    proof: {
      title: 'Живой опыт. Цифровой запуск.',
      body:
        'Проект собирается не из шаблонов: концертная практика, студийная работа, визуальный продакшн и AI-инструменты сходятся в один понятный результат.',
      points: ['музыка и звук', 'визуал и видео', 'сайт, бот, запуск']
    },
    dropsIntro: {
      title: 'Лимитированные дропы',
      body:
        'Мерч и редкие вещи проекта. Добавьте интересующий дроп в заявку, и мы уточним наличие, размер и доставку.'
    },
    drops: [
      {
        id: 'dominina-shirt',
        title: 'Dominina shirt',
        type: 'Мерч / лимитировано',
        media: '/media/dominina-shirt.jpg',
        status: 'по запросу',
        availabilityLabel: 'размеры и наличие уточним в Telegram',
        cta: 'Добавить мерч'
      }
    ],
    contact: {
      title: 'Расскажите о проекте.',
      body:
        'Выберите услуги, добавьте детали и оставьте контакт. В Telegram откроется готовое сообщение с подборкой, бюджетом, сроками и ссылкой на страницу.',
      telegramCta: 'Написать в Telegram',
      submitCta: 'Отправить в Telegram',
      success: 'Сообщение собрано. Telegram откроется в новом окне.',
      fields: {
        selectedOffering: 'Подборка',
        name: 'Имя',
        contact: 'Контакт',
        budgetRange: 'Бюджет',
        timeline: 'Срок',
        message: 'Задача'
      },
      placeholders: {
        name: 'Ваше имя',
        contact: 'Telegram, email или телефон',
        message: 'Что нужно сделать, какие есть референсы и сроки'
      },
      options: {
        budget: ['решим после обсуждения', 'до 50 000₽', '50 000-150 000₽', '150 000₽+'],
        timeline: ['срочно', '2-4 недели', '1-3 месяца', 'пока исследуем']
      }
    }
  },
  en: {
    locale: 'en',
    meta: {
      title: 'Stanislav Polesko - Music, Creative Direction, AI Production',
      description:
        'Music, sound, AI video, visuals, websites, bots and MVPs for artists, brands and business launches.'
    },
    nav: {
      home: 'Home',
      services: 'Services',
      drops: 'Drops',
      contact: 'Contact'
    },
    hero: {
      name: 'STANISLAV POLESKO',
      role: 'Grammy producer / composer / creative director / AI production',
      body:
        'Music, sound, visual direction, AI production and digital development for artists, brands and business tasks.',
      primaryCta: 'Build inquiry',
      secondaryCta: 'View services',
      status: 'Moscow / worldwide'
    },
    servicesIntro: {
      title: 'What should we build?',
      body:
        'Choose one direction or combine several: music, sound, AI video, visuals, content, websites, bots and MVPs.'
    },
    services: enServices,
    proof: {
      title: 'Live craft. Digital launch.',
      body:
        'Projects are built beyond templates: stage experience, studio work, visual production and AI tools come together as one clear result.',
      points: ['music and sound', 'visuals and video', 'website, bot, launch']
    },
    dropsIntro: {
      title: 'Limited drops',
      body:
        'Merch and rare project pieces. Add a drop to the inquiry and we will confirm size, availability and delivery.'
    },
    drops: [
      {
        id: 'dominina-shirt',
        title: 'Dominina shirt',
        type: 'Merch / limited',
        media: '/media/dominina-shirt.jpg',
        status: 'on request',
        availabilityLabel: 'sizes and availability confirmed in Telegram',
        cta: 'Add merch'
      }
    ],
    contact: {
      title: 'Tell me about the project.',
      body:
        'Choose services, add context and leave a contact. Telegram will open with a prepared message including the selection, budget, timeline and page link.',
      telegramCta: 'Message on Telegram',
      submitCta: 'Send to Telegram',
      success: 'Message prepared. Telegram will open in a new window.',
      fields: {
        selectedOffering: 'Selection',
        name: 'Name',
        contact: 'Contact',
        budgetRange: 'Budget',
        timeline: 'Timeline',
        message: 'Task'
      },
      placeholders: {
        name: 'Your name',
        contact: 'Telegram, email or phone',
        message: 'What should be done, references and timing'
      },
      options: {
        budget: ['discuss after context', 'under 50,000 RUB', '50,000-150,000 RUB', '150,000 RUB+'],
        timeline: ['urgent', '2-4 weeks', '1-3 months', 'exploring']
      }
    }
  }
};

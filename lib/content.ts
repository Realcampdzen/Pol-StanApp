import type { Locale, SiteContent } from './types';

export const locales: Locale[] = ['ru', 'en'];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const content: Record<Locale, SiteContent> = {
  ru: {
    locale: 'ru',
    meta: {
      title: 'Stanislav Polesko - Music, Creative Direction, AI Production',
      description:
        'Мобильная витрина услуг Станислава Полеско: music production, composition, creative direction и AI production.'
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
        'Музыка, визуальные решения и AI-пайплайны для артистов, брендов и сценических проектов.',
      primaryCta: 'Обсудить проект',
      secondaryCta: 'Смотреть услуги',
      status: 'Moscow / worldwide'
    },
    servicesIntro: {
      title: 'Один продакшен-контур: звук, идея, образ, AI.',
      body:
        'Пакеты собраны вокруг реальных задач: выпустить трек, собрать сценический образ, усилить проект генеративными инструментами.'
    },
    services: [
      {
        id: 'music-production',
        title: 'Music Production',
        description:
          'От сырой идеи до готового трека: аранжировка, запись, саунд-дизайн, редактура и финальная сборка.',
        deliverables: ['production map', 'arrangement', 'vocal/instrument direction', 'mix-ready session'],
        idealFor: 'Артисты, группы, лейблы, синхронизация',
        priceLabel: 'по запросу',
        cta: 'Запросить production'
      },
      {
        id: 'composition',
        title: 'Composition',
        description:
          'Музыкальные темы, драматургия, атмосферные слои и композиция под релиз, сцену, видео или бренд.',
        deliverables: ['theme sketches', 'harmonic direction', 'scene cues', 'revision pass'],
        idealFor: 'Видео, live intro, кампании, саундтреки',
        priceLabel: 'по запросу',
        cta: 'Обсудить композицию'
      },
      {
        id: 'creative-direction',
        title: 'Creative Direction',
        description:
          'Сборка языка проекта: настроение, визуальная логика, live-образ, арт-референсы и запуск.',
        deliverables: ['creative brief', 'mood system', 'release direction', 'stage notes'],
        idealFor: 'Новые релизы, ребрендинг артиста, live show',
        priceLabel: 'по запросу',
        cta: 'Собрать направление'
      },
      {
        id: 'ai-production',
        title: 'AI Production',
        description:
          'AI как рабочий инструмент: генеративные пайплайны для звука, визуалов, промо и быстрых прототипов.',
        deliverables: ['workflow design', 'prompt system', 'asset pipeline', 'handoff guide'],
        idealFor: 'Команды, агентства, артисты, контент-студии',
        priceLabel: 'по запросу',
        cta: 'Запустить AI pipeline'
      }
    ],
    proof: {
      title: 'Сцена, студия, продукт.',
      body:
        'Визуальная система сайта держится на реальном концертном материале: свет, дым, плотность зала и темная металлическая эстетика.',
      points: ['live energy', 'production discipline', 'limited drops']
    },
    dropsIntro: {
      title: 'Limited drops',
      body:
        'Мерч и артефакты проекта как отдельная витрина. В v1 заказ идет через личный контакт.'
    },
    drops: [
      {
        id: 'dominina-shirt',
        title: 'Dominina shirt',
        type: 'Merch / limited',
        media: '/media/dominina-shirt.jpg',
        status: 'manual order',
        availabilityLabel: 'наличие уточняется',
        cta: 'Запросить дроп'
      }
    ],
    contact: {
      title: 'Опишите задачу.',
      body:
        'Выберите направление, оставьте вводные и удобный контакт. Сообщение откроется в Telegram вместе с параметром Roistat, если он пришел из рекламы.',
      telegramCta: 'Открыть Telegram',
      submitCta: 'Собрать заявку',
      success: 'Заявка собрана. Telegram откроется в новом окне.',
      fields: {
        selectedOffering: 'Направление',
        name: 'Имя',
        contact: 'Контакт',
        budgetRange: 'Бюджет',
        timeline: 'Срок',
        message: 'Вводные'
      },
      placeholders: {
        name: 'Как к вам обращаться',
        contact: '@telegram, email или телефон',
        message: 'Коротко: артист, задача, референсы, дедлайн'
      },
      options: {
        budget: ['по запросу', 'до $1k', '$1k-$5k', '$5k+'],
        timeline: ['срочно', '2-4 недели', '1-3 месяца', 'исследуем']
      }
    }
  },
  en: {
    locale: 'en',
    meta: {
      title: 'Stanislav Polesko - Music, Creative Direction, AI Production',
      description:
        'Mobile services and drops showcase for Stanislav Polesko: music production, composition, creative direction and AI production.'
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
        'Music, visual systems and AI workflows for artists, brands and stage-driven projects.',
      primaryCta: 'Discuss a project',
      secondaryCta: 'View services',
      status: 'Moscow / worldwide'
    },
    servicesIntro: {
      title: 'One production loop: sound, idea, image, AI.',
      body:
        'Packages are shaped around real outcomes: finish a track, build a stage language, or extend a project with generative tools.'
    },
    services: [
      {
        id: 'music-production',
        title: 'Music Production',
        description:
          'From raw idea to finished track: arrangement, recording direction, sound design, editing and final assembly.',
        deliverables: ['production map', 'arrangement', 'vocal/instrument direction', 'mix-ready session'],
        idealFor: 'Artists, bands, labels, sync briefs',
        priceLabel: 'on request',
        cta: 'Request production'
      },
      {
        id: 'composition',
        title: 'Composition',
        description:
          'Themes, dramaturgy, atmosphere and composition for releases, stages, films or brands.',
        deliverables: ['theme sketches', 'harmonic direction', 'scene cues', 'revision pass'],
        idealFor: 'Video, live intro, campaigns, soundtracks',
        priceLabel: 'on request',
        cta: 'Discuss composition'
      },
      {
        id: 'creative-direction',
        title: 'Creative Direction',
        description:
          'The language of a project: mood, visual logic, live image, art references and launch direction.',
        deliverables: ['creative brief', 'mood system', 'release direction', 'stage notes'],
        idealFor: 'New releases, artist positioning, live shows',
        priceLabel: 'on request',
        cta: 'Shape the direction'
      },
      {
        id: 'ai-production',
        title: 'AI Production',
        description:
          'AI as a production instrument: generative workflows for sound, visuals, promotion and rapid prototypes.',
        deliverables: ['workflow design', 'prompt system', 'asset pipeline', 'handoff guide'],
        idealFor: 'Teams, agencies, artists, content studios',
        priceLabel: 'on request',
        cta: 'Launch AI pipeline'
      }
    ],
    proof: {
      title: 'Stage, studio, product.',
      body:
        'The site system is built from real concert material: light, smoke, room pressure and a dark metal-driven atmosphere.',
      points: ['live energy', 'production discipline', 'limited drops']
    },
    dropsIntro: {
      title: 'Limited drops',
      body:
        'Merch and project artifacts live as a compact shop surface. V1 orders are handled through direct contact.'
    },
    drops: [
      {
        id: 'dominina-shirt',
        title: 'Dominina shirt',
        type: 'Merch / limited',
        media: '/media/dominina-shirt.jpg',
        status: 'manual order',
        availabilityLabel: 'availability on request',
        cta: 'Request drop'
      }
    ],
    contact: {
      title: 'Tell me the task.',
      body:
        'Choose a direction, add context and a preferred contact. The Telegram message includes Roistat attribution when it came from an ad URL.',
      telegramCta: 'Open Telegram',
      submitCta: 'Build inquiry',
      success: 'Inquiry prepared. Telegram will open in a new window.',
      fields: {
        selectedOffering: 'Direction',
        name: 'Name',
        contact: 'Contact',
        budgetRange: 'Budget',
        timeline: 'Timeline',
        message: 'Context'
      },
      placeholders: {
        name: 'How should we address you',
        contact: '@telegram, email or phone',
        message: 'Artist, task, references, deadline'
      },
      options: {
        budget: ['on request', 'under $1k', '$1k-$5k', '$5k+'],
        timeline: ['urgent', '2-4 weeks', '1-3 months', 'exploring']
      }
    }
  }
};

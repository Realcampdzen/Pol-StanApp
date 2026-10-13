import type { Locale } from './types';

// Editorial facts and destinations. Source context lives in the single OpenSpec change.
export const brandSources = {
  previousGrammy: 'https://vk.ru/wall17247_9383',
  metro: 'https://www.metronews.ru/novosti/peterbourg/reviews/gruppa-dominia-i-proekt-bach-the-saddest-transcriptions-for-piano-v-otbore-grammy-2192497/',
  television: 'https://78.ru/tv/programs/2026-10-12/vechernee-shou/vechernee-shou-1210261700',
  dominia: 'https://www.dominia.info/',
  tamas: 'https://dominia.bandcamp.com/album/tamas',
  bach: 'https://classical.music.apple.com/us/album/6799122575',
  strategic: 'https://moscowfilmschool.ru/about/events/6560-saund-dizayn-v-igrakh/',
  g1deon: 'https://www.game-ost.ru/articles.php?action=view&id=91',
  polstan: 'https://www.game-ost.ru/persons/32945/stanislav_polesko/',
  beatkoin: 'https://vk.ru/artist/5161732815437030747',
  soundcloud: 'https://soundcloud.com/stanislav-polesko',
  children: 'https://music.apple.com/us/album/children-single/1633218859',
  billboard: 'https://vk.ru/wall-27452_15027',
  billboardIssue: 'https://bulletins.billboard.com/specialissues/_misc/FLIP%20BOOKS/2026/Billboard_2026_10_1003.pdf#page=323',
  metalfanPost: 'https://vk.ru/wall-27452_15042',
  metalfan: 'https://www.metalfan.nl/article.php?sid=27476',
  film: 'https://wink.ru/movies/syn-year-2014',
  commercial: 'https://leevandia.com/about/news/novogodnee-pozdravlenie-ot-vtb-lizing.html',
  live: 'https://devgamm.com/fest2022/highlights/'
} as const;

export const grammyStatus = 'first-round-consideration' as const;

const ru = {
  "meta": {
    "title": "Станислав Полеско: композитор. Продюсер DOMINIA | PolStan",
    "description": "Станислав Полеско, петербургский композитор. Продюсер и директор DOMINIA. Tamas и Bach: The Saddest Transcriptions for Piano в первом туре отбора Grammy 2027."
  },
  "nav": {
    "grammy": "Grammy 2027",
    "story": "История",
    "press": "Медиа",
    "contact": "На связи",
    "menu": "Открыть меню",
    "close": "Закрыть меню",
    "skip": "К содержанию"
  },
  "hero": {
    "first": "Станислав",
    "last": "Полеско",
    "role": "Композитор. Продюсер и директор DOMINIA.",
    "line": "Два альбома из Петербурга в первом туре Grammy 2027.",
    "cta": "Tamas и Bach",
    "listen": "Слушать DOMINIA",
    "live": "DOMINIA · LIVE",
    "location": "Санкт-Петербург",
    "next": "Tamas и Bach: релизы 2026 года",
    "soundOn": "Включить звук",
    "soundOff": "Выключить звук",
    "pause": "Приостановить видео",
    "play": "Воспроизвести видео",
    "fallback": "DOMINIA на концерте: кадр из видео."
  },
  "grammy": {
    "eyebrow": "РЕЛИЗЫ 2026 ГОДА",
    "title": "DOMINIA: Tamas.\nГеоргий Жеряков: Bach.",
    "body": "В августе 2026-го вышли две петербургские продюсерские работы Станислава: седьмой студийный альбом DOMINIA и фортепианные транскрипции Баха в исполнении Георгия Жерякова.",
    "status": "Первый тур отбора",
    "statusNote": "Официальных номинантов определит голосование членов Recording Academy.",
    "sourceLabel": "Metro о двух альбомах",
    "listen": "Слушать альбом",
    "credits": "Работа Станислава",
    "categories": "Категории первого тура",
    "band": "Сайт DOMINIA",
    "albums": [
      {
        "id": "dominia",
        "artist": "DOMINIA",
        "title": "Tamas",
        "genre": "MELODIC DOOM / DEATH METAL",
        "date": "26 августа 2026",
        "image": "/media/brand/tamas-v4.jpg",
        "alt": "Обложка Tamas группы DOMINIA. Художник Мария Коваль.",
        "body": "Восемь композиций на стыке дум- и дэт-метала, со скрипкой Дмитрия «Casper» Ришко и оркестровыми элементами.",
        "credit": "Продюсирование, сведение и мастеринг совместно с Артёмом Уваровым и DOMINIA. Дополнительные звуки и клавишные.",
        "categories": [
          "Best Rock Album",
          "Best Album Cover"
        ],
        "href": brandSources.tamas,
        "detail": "Музыка и аранжировки DOMINIA. Оформление Марии Коваль. Полные титры и тексты песен на Bandcamp."
      },
      {
        "id": "bach",
        "artist": "ГЕОРГИЙ ЖЕРЯКОВ",
        "title": "Bach",
        "subtitle": "The Saddest Transcriptions for Piano",
        "genre": "CLASSICAL / IMMERSIVE AUDIO",
        "date": "28 августа 2026",
        "image": "/media/brand/bach-v4.webp",
        "alt": "Обложка альбома Георгия Жерякова Bach: The Saddest Transcriptions for Piano.",
        "body": "Георгий Жеряков исполняет Баха на фортепиано начала XX века. Тембры органа и клавесина, ветер и шорохи комнаты дополняют запись.",
        "credit": "Продюсирование альбома.",
        "categories": [
          "Best Classical Instrumental Solo",
          "Best Immersive Audio Album"
        ],
        "href": brandSources.bach,
        "detail": "Восемь транскрипций, 39 минут. Титры и трек-лист в Apple Music Classical."
      }
    ],
    "previousRound": {
      "title": "Участие в первом туре в 2025 году.",
      "text": "Работы Станислава участвовали в этом этапе и годом ранее. Летом 2025-го о подаче его музыки на премию писал «Реальный лагерь».",
      "sourceLabel": "«Реальный лагерь» о подаче работ, 2 июля 2025",
      "href": brandSources.previousGrammy
    }
  },
  "live": {
    "eyebrow": "DOMINIA И СТАНИСЛАВ",
    "title": "Поклонник DOMINIA с 2004.\nПродюсер и директор с 2025.",
    "body": "12 октября 2026 года Станислав вышел на сцену «Вечернего шоу» вместе с группой и сыграл на гитаре. В том же выпуске он рассказал о Tamas и альбоме Баха.",
    "caption": "Станислав Полеско с музыкантами DOMINIA в студии телеканала «78».",
    "cta": "Музыка и концерты DOMINIA"
  },
  "story": {
    "eyebrow": "РАННИЕ РАБОТЫ",
    "title": "До Tamas: G1Deon,\nкино и BEATKOIN.",
    "intro": "В Strategic Music Станислав работал над музыкой и звуком для игр. Для кино написал музыку к «Сыну», «Последней ночи» и другим фильмам; электронные треки выпускал как BEATKOIN.",
    "timeline": [
      {
        "year": "2003",
        "title": "Strategic Music",
        "text": "Год основания студии. Станислав позднее работал в Strategic Music руководителем, композитором и саунд-дизайнером.",
        "href": brandSources.strategic,
        "source": "Московская школа кино"
      },
      {
        "year": "2008-10",
        "title": "G1Deon",
        "text": "Авторский игровой проект. Две сюжетные линии с электронной и акустической музыкой.",
        "href": brandSources.g1deon,
        "source": "Рассказ Станислава о G1Deon"
      },
      {
        "year": "2013-24",
        "title": "Музыка для кино",
        "text": "«Полёт. Три дня после катастрофы», «Сын», «Последняя ночь», «Район тьмы», «Чёртов камень».",
        "href": brandSources.film,
        "source": "«Сын»: титры композитора"
      },
      {
        "year": "2018-22",
        "title": "BEATKOIN",
        "text": "Электронные треки 2018 года и сингл Children, выпущенный Sovietwave Records в 2022-м.",
        "href": brandSources.soundcloud,
        "source": "Слушать BEATKOIN"
      },
      {
        "year": "2020",
        "title": "Синтвейв на DevGAMM",
        "text": "Онлайн-выступление на аналоговых синтезаторах для фестиваля разработчиков игр DevGAMM.",
        "href": brandSources.live,
        "source": "Архив DevGAMM 2020"
      }
    ],
    "projectsLabel": "СТУДИЯ И АВТОРСКИЕ ПРОЕКТЫ",
    "expand": "Подробнее о проекте",
    "projects": [
      {
        "id": "strategic",
        "name": "Strategic Music",
        "type": "Студия · звук для игр",
        "preview": "Руководитель, композитор и саунд-дизайнер студии.",
        "text": "Станислав совмещал руководство Strategic Music с композицией и саунд-дизайном. Среди его работ для игр: Farmscapes, Incredible Express и Burger Bustle: Ellie’s Organics.",
        "detail": "В портфолио команды студии также входят Dota 2, World of Tanks и Fallout 4.",
        "href": brandSources.strategic,
        "link": "Лекция о звуке в играх"
      },
      {
        "id": "g1deon",
        "name": "G1Deon",
        "type": "Авторский проект · игра и музыка",
        "preview": "Две сюжетные линии, два саундтрека.",
        "text": "G1Deon начался с идеи анимационного фильма в 2008 году, затем стал игровым проектом. Для одного персонажа Станислав написал синтезаторную музыку и эмбиент, для другого использовал гитары, фортепиано и скрипку.",
        "detail": "Музыка задавала атмосферу эпизодов: художник создавал изображения, слушая готовые треки.",
        "href": brandSources.g1deon,
        "link": "Читать рассказ автора"
      },
      {
        "id": "beatkoin",
        "name": "BEATKOIN",
        "type": "Электронная музыка · синтвейв / советвейв",
        "preview": "Lu Hui Tou (Radio Version) и Children.",
        "text": "Электронный проект Станислава. Его треки опубликованы в SoundCloud в 2018 году; сингл Children вышел на Sovietwave Records 22 июля 2022-го.",
        "detail": "В 2025 году Станислав поддержал «Реальный лагерь»: на его донат купили портативную колонку для детского лагеря.",
        "href": brandSources.beatkoin,
        "link": "Слушать BEATKOIN в VK"
      },
      {
        "id": "polstan",
        "name": "PolStan Music",
        "type": "Псевдоним · музыка для игр",
        "preview": "Композиторский псевдоним Станислава.",
        "text": "Под именем PolStan Станислав указан в композиторском каталоге Game-OST. В профиле собраны его игровые саундтреки.",
        "detail": "",
        "href": brandSources.polstan,
        "link": "Профиль композитора"
      }
    ],
    "filmLabel": "ИЗБРАННАЯ МУЗЫКА ДЛЯ КИНО",
    "films": [
      [
        "2013",
        "Полёт. Три дня после катастрофы"
      ],
      [
        "2014",
        "Сын"
      ],
      [
        "2015",
        "Последняя ночь"
      ],
      [
        "2016",
        "Район тьмы"
      ],
      [
        "2024",
        "Чёртов камень"
      ]
    ],
    "commercial": "Музыка для рекламы: AELF, ВТБ Лизинг, банк «Восточный».",
    "commercialLink": "Композиторские титры",
    "archiveLabel": "Хронология и фильмография, 2003-2024"
  },
  "press": {
    "eyebrow": "ОКТЯБРЬ 2026",
    "title": "Полоса Tamas в Billboard.\n№ 1 в опросе Metalfan.",
    "television": {
      "type": "«78» · 12.10.2026",
      "title": "DOMINIA сыграла в «Вечернем шоу»",
      "text": "Выпуск объединил разговор Станислава о двух альбомах в отборе Grammy и выступление группы. Станислав присоединился к музыкантам на гитаре.",
      "cta": "Страница выпуска «Вечернего шоу»",
      "note": "Станислав Полеско во время интервью для телеканала «78»."
    },
    "metro": {
      "type": "METRO · 06.10.2026",
      "title": "Metro: Бах, металл и первый тур Grammy",
      "text": "Газета рассказала о записи фортепианного альбома и участии двух проектов в первом туре Grammy 2027.",
      "cta": "Читать статью Metro"
    },
    "billboard": {
      "type": "BILLBOARD · 03.10.2026",
      "title": "Tamas в Billboard Grammy Preview",
      "text": "DOMINIA представила альбом в выпуске от 3 октября 2026 года. Полоса кампании For Your Consideration размещена на странице 323.",
      "cta": "Billboard, страница 323",
      "post": "Публикация группы",
      "imageLabel": "Увеличить полосу",
      "coverLabel": "Обложка",
      "caption": "Полоса For Your Consideration для Tamas и обложка выпуска Grammy Preview 2027."
    },
    "chart": {
      "type": "METALFAN.NL · 09.10.2026",
      "title": "Tamas выиграл опрос читателей Metalfan",
      "text": "Читатели выбрали альбом DOMINIA лучшим релизом августа 2026 года. Результаты опубликованы 9 октября.",
      "cta": "Результаты опроса",
      "post": "Публикация DOMINIA со скриншотом",
      "imageLabel": "Увеличить скриншот",
      "caption": "В первой тройке опроса: DOMINIA, Flotsam And Jetsam и Mastodon."
    }
  },
  "contact": {
    "eyebrow": "СОТРУДНИЧЕСТВО",
    "title": "Пришлите демо.\nОбсудим ваш релиз.",
    "text": "Расскажите о проекте и о том, что уже готово. Можно обсудить продюсирование релиза, музыку для фильма или звук для игры.",
    "direct": "Написать Станиславу",
    "formats": "Форматы сотрудничества",
    "catalogIntro": "Выберите то, что подходит вашей идее. Можно собрать несколько направлений в одну заявку.",
    "selected": "В вашем проекте",
    "add": "Добавить в проект",
    "remove": "Убрать из проекта",
    "empty": "Можно выбрать направления выше или сразу описать задачу.",
    "submit": "Подготовить сообщение",
    "ready": "Сообщение подготовлено. Откройте Telegram и отправьте его Станиславу.",
    "open": "Открыть в Telegram",
    "edit": "После изменений подготовьте сообщение заново.",
    "privacy": "Данные из формы остаются в браузере. Отправка происходит в Telegram после вашего действия.",
    "required": "Обязательное поле",
    "contactError": "Укажите Telegram, email или телефон, чтобы Станислав мог ответить.",
    "details": "Подробнее",
    "drop": "DOMINIA / коллекция",
    "name": "Ваше имя",
    "contact": "Как с вами связаться",
    "contactPlaceholder": "Telegram, email или телефон",
    "message": "Проект и ссылки",
    "messagePlaceholder": "Демо, референсы или материалы проекта",
    "budget": "Бюджет",
    "timeline": "Сроки",
    "optional": "Необязательно",
    "general": "Обсудить проект",
    "noJs": "Чтобы обсудить проект, напишите Станиславу в Telegram."
  },
  "footer": {
    "line": "Продюсер, композитор, саунд-дизайнер.",
    "top": "Наверх",
    "studio": "Создано с Real Vibe Studio",
    "copyright": "Станислав Полеско"
  }
};

const en: typeof ru = {
  "meta": {
    "title": "Stanislav Polesko: composer. DOMINIA producer & manager | PolStan",
    "description": "Saint Petersburg composer. DOMINIA producer and manager. Tamas and Bach: The Saddest Transcriptions for Piano in first-round Grammy 2027 consideration."
  },
  "nav": {
    "grammy": "Grammy 2027",
    "story": "The story",
    "press": "Press",
    "contact": "Get in touch",
    "menu": "Open menu",
    "close": "Close menu",
    "skip": "Skip to content"
  },
  "hero": {
    "first": "Stanislav",
    "last": "Polesko",
    "role": "Composer. DOMINIA’s producer and manager.",
    "line": "Two Saint Petersburg albums in first-round consideration for the 2027 Grammys.",
    "cta": "Tamas & Bach",
    "listen": "Listen to DOMINIA",
    "live": "DOMINIA · LIVE",
    "location": "Saint Petersburg",
    "next": "Tamas and Bach: the 2026 releases",
    "soundOn": "Turn sound on",
    "soundOff": "Mute sound",
    "pause": "Pause video",
    "play": "Play video",
    "fallback": "DOMINIA in concert: a still from the live film."
  },
  "grammy": {
    "eyebrow": "2026 RELEASES",
    "title": "DOMINIA’s Tamas.\nGeorgiy Zheryakov’s Bach.",
    "body": "Released in August 2026: DOMINIA’s seventh studio album and Georgiy Zheryakov’s recording of Bach transcriptions for piano.",
    "status": "First-round consideration",
    "statusNote": "Recording Academy members will vote to decide the official nominees.",
    "sourceLabel": "The story in Metro",
    "listen": "Listen to the album",
    "credits": "Stanislav’s contribution",
    "categories": "First-round categories",
    "band": "DOMINIA website",
    "albums": [
      {
        "id": "dominia",
        "artist": "DOMINIA",
        "title": "Tamas",
        "genre": "MELODIC DOOM / DEATH METAL",
        "date": "26 August 2026",
        "image": "/media/brand/tamas-v4.jpg",
        "alt": "Cover of DOMINIA’s Tamas, with artwork by Maria Koval.",
        "body": "Eight tracks of melodic doom/death metal, with Dmitry “Casper” Rishko’s violin and orchestral elements.",
        "credit": "Co-production, mixing and mastering with Artem Uvarov and DOMINIA; additional sounds and keyboards.",
        "categories": [
          "Best Rock Album",
          "Best Album Cover"
        ],
        "href": brandSources.tamas,
        "detail": "Music and arrangements by DOMINIA. Artwork by Maria Koval. Full credits and lyrics on Bandcamp."
      },
      {
        "id": "bach",
        "artist": "GEORGIY ZHERYAKOV",
        "title": "Bach",
        "subtitle": "The Saddest Transcriptions for Piano",
        "genre": "CLASSICAL / IMMERSIVE AUDIO",
        "date": "28 August 2026",
        "image": "/media/brand/bach-v4.webp",
        "alt": "Cover of Georgiy Zheryakov’s Bach: The Saddest Transcriptions for Piano.",
        "body": "Georgiy Zheryakov plays Bach on an early twentieth-century piano. Organ and harpsichord timbres, wind and room sounds add another layer to the recording.",
        "credit": "Album production.",
        "categories": [
          "Best Classical Instrumental Solo",
          "Best Immersive Audio Album"
        ],
        "href": brandSources.bach,
        "detail": "Eight transcriptions, 39 minutes. Credits and track listing on Apple Music Classical."
      }
    ],
    "previousRound": {
      "title": "First-round consideration in 2025.",
      "text": "Stanislav’s work was also in first-round consideration the year before. Real Camp wrote about his Grammy submissions that summer.",
      "sourceLabel": "Real Camp on the submissions, 2 July 2025",
      "href": brandSources.previousGrammy
    }
  },
  "live": {
    "eyebrow": "DOMINIA & STANISLAV",
    "title": "A DOMINIA fan since 2004.\nProducer and manager since 2025.",
    "body": "On 12 October 2026, Stanislav joined the band on guitar on the Evening Show. In the same episode, he spoke about Tamas and the Bach album.",
    "caption": "Stanislav Polesko with DOMINIA in the 78 TV studio.",
    "cta": "DOMINIA’s music and shows"
  },
  "story": {
    "eyebrow": "EARLIER WORK",
    "title": "Before Tamas: G1Deon,\nfilm scores and BEATKOIN.",
    "intro": "At Strategic Music, Stanislav composed music and created sound for games. His film scores include The Son and The Last Night; he released electronic music as BEATKOIN.",
    "timeline": [
      {
        "year": "2003",
        "title": "Strategic Music",
        "text": "The studio’s founding year. Stanislav later worked at Strategic Music as its head, composer and sound designer.",
        "href": brandSources.strategic,
        "source": "Moscow Film School"
      },
      {
        "year": "2008-10",
        "title": "G1Deon",
        "text": "An original game project with two storylines, each with its own music: electronic and acoustic.",
        "href": brandSources.g1deon,
        "source": "Stanislav on G1Deon"
      },
      {
        "year": "2013-24",
        "title": "Music for film",
        "text": "Flight. Three Days After the Crash, The Son, The Last Night, Rayon Tmy and The Devil’s Stone.",
        "href": brandSources.film,
        "source": "The Son: composer credits"
      },
      {
        "year": "2018-22",
        "title": "BEATKOIN",
        "text": "Electronic tracks from 2018 and Children, a single released by Sovietwave Records in 2022.",
        "href": brandSources.soundcloud,
        "source": "Listen to BEATKOIN"
      },
      {
        "year": "2020",
        "title": "Synthwave at DevGAMM",
        "text": "An analogue-synthesizer performance for DevGAMM’s online game-development festival.",
        "href": brandSources.live,
        "source": "DevGAMM 2020 archive"
      }
    ],
    "projectsLabel": "STUDIO & ORIGINAL PROJECTS",
    "expand": "About the project",
    "projects": [
      {
        "id": "strategic",
        "name": "Strategic Music",
        "type": "Studio · game audio",
        "preview": "Studio head, composer and sound designer.",
        "text": "Stanislav combined studio leadership with composition and sound design at Strategic Music. His game credits include Farmscapes, Incredible Express and Burger Bustle: Ellie’s Organics.",
        "detail": "The studio team’s portfolio also includes Dota 2, World of Tanks and Fallout 4.",
        "href": brandSources.strategic,
        "link": "Game audio at Moscow Film School"
      },
      {
        "id": "g1deon",
        "name": "G1Deon",
        "type": "Original project · game & music",
        "preview": "Two storylines, two soundtracks.",
        "text": "G1Deon began as an animated-film idea in 2008, then became a game project. Stanislav wrote synthesizer music and ambient pieces for one character, using guitars, piano and violin for the other.",
        "detail": "The music shaped the artwork: the artist drew while listening to the completed tracks.",
        "href": brandSources.g1deon,
        "link": "Read the author’s story"
      },
      {
        "id": "beatkoin",
        "name": "BEATKOIN",
        "type": "Electronic music · synthwave / sovietwave",
        "preview": "Lu Hui Tou (Radio Version) and Children.",
        "text": "Stanislav’s electronic project. His tracks were uploaded to SoundCloud in 2018; Sovietwave Records released the single Children on 22 July 2022.",
        "detail": "In 2025, Stanislav supported Real Camp by funding a portable speaker for the children’s camp.",
        "href": brandSources.beatkoin,
        "link": "Listen to BEATKOIN on VK"
      },
      {
        "id": "polstan",
        "name": "PolStan Music",
        "type": "Composer alias · game music",
        "preview": "Stanislav’s composer alias.",
        "text": "Game-OST lists Stanislav under the name PolStan. His profile brings together his game soundtracks.",
        "detail": "",
        "href": brandSources.polstan,
        "link": "Composer profile"
      }
    ],
    "filmLabel": "SELECTED FILM SCORES",
    "films": [
      [
        "2013",
        "Flight. Three Days After the Crash"
      ],
      [
        "2014",
        "The Son"
      ],
      [
        "2015",
        "The Last Night"
      ],
      [
        "2016",
        "Rayon Tmy"
      ],
      [
        "2024",
        "The Devil’s Stone"
      ]
    ],
    "commercial": "Music for advertising: AELF, VTB Leasing and Vostochny Bank.",
    "commercialLink": "Composer credits",
    "archiveLabel": "Timeline and film scores, 2003-2024"
  },
  "press": {
    "eyebrow": "OCTOBER 2026",
    "title": "Tamas in Billboard.\n#1 with Metalfan readers.",
    "television": {
      "type": "78 TV · 12 OCT 2026",
      "title": "DOMINIA live on the Evening Show",
      "text": "The episode paired Stanislav’s interview about the two Grammy entries with a performance by the band. He joined the musicians on guitar.",
      "cta": "The Evening Show episode page",
      "note": "Stanislav Polesko interviewed for 78 TV’s Evening Show."
    },
    "metro": {
      "type": "METRO · 6 OCT 2026",
      "title": "Metro: Bach, metal and Grammy consideration",
      "text": "The article explores the piano recording and the two albums’ first-round consideration for the 2027 Grammys.",
      "cta": "Read the Metro article"
    },
    "billboard": {
      "type": "BILLBOARD · 3 OCT 2026",
      "title": "Tamas in Billboard’s Grammy Preview",
      "text": "DOMINIA’s For Your Consideration placement appears on page 323 of the 3 October 2026 issue.",
      "cta": "Billboard, page 323",
      "post": "The band’s post",
      "imageLabel": "Enlarge the page",
      "coverLabel": "Cover",
      "caption": "The Tamas For Your Consideration page and the 2027 Grammy Preview cover."
    },
    "chart": {
      "type": "METALFAN.NL · 9 OCT 2026",
      "title": "Tamas wins the Metalfan readers’ poll",
      "text": "Readers voted DOMINIA’s album their favourite release of August 2026. Results were published on 9 October.",
      "cta": "Read the poll results",
      "post": "DOMINIA’s post with the screenshot",
      "imageLabel": "Enlarge the screenshot",
      "caption": "The poll’s top three: DOMINIA, Flotsam And Jetsam and Mastodon."
    }
  },
  "contact": {
    "eyebrow": "COLLABORATION",
    "title": "Send a demo.\nLet’s talk about your release.",
    "text": "Tell Stanislav about your project and what you have so far. You can discuss record production, a film score or audio for a game.",
    "direct": "Talk to Stanislav",
    "formats": "Ways to collaborate",
    "catalogIntro": "Select the services you need. You can combine several in one enquiry.",
    "selected": "Your project",
    "add": "Add to project",
    "remove": "Remove from project",
    "empty": "Choose an option above, or describe your project.",
    "submit": "Prepare message",
    "ready": "Your message is ready. Open Telegram and send it to Stanislav.",
    "open": "Open in Telegram",
    "edit": "After making changes, prepare your message again.",
    "privacy": "Form details stay in your browser. You send the message yourself in Telegram.",
    "required": "Required field",
    "contactError": "Add your Telegram, email or phone number so Stanislav can reply.",
    "details": "Details",
    "drop": "DOMINIA / collection",
    "name": "Your name",
    "contact": "How can I reach you?",
    "contactPlaceholder": "Telegram, email or phone",
    "message": "Project and links",
    "messagePlaceholder": "Demo, references or project materials",
    "budget": "Budget",
    "timeline": "Timeline",
    "optional": "Optional",
    "general": "Discuss a project",
    "noJs": "To discuss your project, contact Stanislav on Telegram."
  },
  "footer": {
    "line": "Producer, composer, sound designer.",
    "top": "Back to top",
    "studio": "Website by Real Vibe Studio.",
    "copyright": "Stanislav Polesko"
  }
};

export const brandContent = { ru, en };
export type BrandContent = typeof ru;
export function getBrandContent(locale: Locale) { return brandContent[locale]; }

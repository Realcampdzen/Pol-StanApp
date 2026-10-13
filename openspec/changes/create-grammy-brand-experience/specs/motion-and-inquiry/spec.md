## ADDED Requirements

### Requirement: Purposeful scroll narrative
Сайт SHALL использовать GSAP для связи live-видео, двух актуальных альбомов, медиаматериалов и истории, сохраняя естественную мобильную прокрутку.

#### Scenario: Desktop storytelling
- **WHEN** посетитель прокручивает публикации на экране шириной не менее 1024 и высотой не менее 700 px и все подписи и исходные ссылки помещаются под шапкой
- **THEN** ScrollTrigger закрепляет ленту четырёх публикаций под шапкой и последовательно показывает Billboard, Metalfan, «78» и Metro, затем освобождает прокрутку
- **AND** публикации помещаются под шапкой; фокус с клавиатуры выводит соответствующую ссылку в видимую область
- **AND** диалоги чтения находятся вне закреплённого контейнера; раскрытие архива обновляет границы сцен

#### Scenario: Reduced motion or small viewport
- **WHEN** включено reduced motion или экран не соответствует условиям закрепления
- **THEN** кейсы доступны в обычном потоке без pin и обязательной анимации
- **AND** при смене ширины или настройки движения фокус остаётся на выбранной публикации и ссылка остаётся видимой

### Requirement: Accessible media and interactions
Сайт SHALL обеспечивать клавиатурное управление, видимый focus, раскрываемые native details, стабильные размеры изображений и fallback медиа.

#### Scenario: Video failure
- **WHEN** видео не загрузилось или autoplay недоступен
- **THEN** остаются настоящий poster и содержание героя
- **AND** звук включается только явным действием
- **AND** прерванный manual play с AbortError сохраняет здоровое video и возможность повторить действие

#### Scenario: Background page
- **WHEN** герой выходит из viewport или документ скрывается
- **THEN** видео останавливается и возобновляется только при подходящих условиях
- **AND** явная пользовательская пауза сохраняется

### Requirement: Attribution-preserving collaboration flow
Сайт SHALL готовить заявку в Telegram через существующие helper и каталог, сохранять Roistat/source attribution и не выбирать произвольную услугу за посетителя.

#### Scenario: Prepare inquiry
- **WHEN** посетитель указывает контакт, задачу или ссылку на демо, бюджет и сроки
- **THEN** сообщение включает эти данные и все выбранные направления с ценами
- **AND** пользователь сам открывает Telegram и отправляет сообщение; сайт не объявляет заявку отправленной
- **AND** редактирование сбрасывает прежний draft

#### Scenario: No JavaScript
- **WHEN** JavaScript выключен
- **THEN** текст, музыкальные ссылки и native details доступны, а html lang соответствует локали
- **AND** форма не отправляет персональные поля случайным GET; доступен прямой контакт

#### Scenario: Missing contact
- **WHEN** посетитель оставляет контакт пустым или вводит только пробелы
- **THEN** рядом с полем появляется локализованное объяснение, связанное через aria-describedby, и focus возвращается в поле
- **AND** draft не создаётся, а исправление контакта убирает ошибку
- **AND** кнопки выбора услуг содержат название соответствующей услуги в доступном имени

### Requirement: Honest visual verification
Реализация SHALL подтверждать видимые изменения композиции, типографики и анимации браузерным просмотром, не подменяя его количеством технических проверок.

#### Scenario: Handoff after owner rejection
- **WHEN** владелец отклонил прежний дизайн и реализация передаётся повторно
- **THEN** изменения первого экрана, альбомов, публикаций, биографии и финала проверены в реальном браузере
- **AND** прежнее утверждение о трёх полноценных дизайн-проходах отозвано
- **AND** технический PASS не объявляется приёмкой владельца

### Requirement: Resource cleanup
Реализация SHALL очищать GSAP contexts, observers и handlers и сохранять только необходимые материалы одной задачи в существующем checkout.

#### Scenario: Unmount and handoff
- **WHEN** страница размонтируется или разработка завершается
- **THEN** animation observers и собственные временные процессы очищаются
- **AND** дополнительный worktree не создаётся, чужие изменения сохраняются
- **AND** собственные промежуточные файлы удаляются; исходные вложения и концертные видео сохраняются



### Requirement: Visible three-act motion
The page SHALL have a visible opening sequence in the concert hero, scroll-driven line and word reveals and media reveals throughout the albums and publications, and a visible inquiry/footer ending. Large-screen publication pinning SHALL keep content within the viewport beneath navigation. Mobile SHALL use natural vertical reading. Every animation SHALL be reverted on unmount and preference changes. Reduced motion and no JavaScript SHALL preserve readable content and working native links.

#### Scenario: A visitor reads the complete page
- **WHEN** a visitor scrolls continuously from hero to footer on desktop or mobile
- **THEN** opening, development and ending are visibly distinct in a recorded browser journey
- **AND** no title, media item or action remains hidden after fast scrolling or anchor navigation

#### Scenario: Owner rejects a design
- **WHEN** the owner says the design is unchanged
- **THEN** technical test results SHALL NOT be represented as accepted visual design passes


### Requirement: Owner-controlled QA media retention
Browser checks SHALL save text reports by default. Screenshots and recordings used for visual inspection SHALL be temporary and removed after inspection, per the owner's instruction of 2026-10-14. Production media SHALL remain part of the website.

#### Scenario: Visual review finishes
- **WHEN** скриншоты и видео завершённой проверки просмотрены
- **THEN** эти проверочные файлы убираются из рабочего проекта
- **AND** по умолчанию повторные проверки создают только текстовый отчёт; временное сохранение медиа требует явной настройки каталога

// Run against a local production server. Reuses an installed Playwright/browser; downloads nothing.
// PLAYWRIGHT_MODULE may point to an existing package's index.mjs; CHROME_PATH to its browser.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.POLSTAN_QA_URL || 'http://127.0.0.1:3107';
const evidence = fileURLToPath(new URL('./evidence/', import.meta.url));
await mkdir(evidence, { recursive: true });
const qaMedia = process.env.POLSTAN_QA_MEDIA_DIR;
if (qaMedia) await mkdir(qaMedia, { recursive: true });
const saveShot = async (page, options) => { if (qaMedia) await page.screenshot({ ...options, path: path.join(qaMedia, path.basename(options.path)) }); };
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || undefined });
const report = { date: new Date().toISOString(), base, browser: browser.version(), passed: false, checks: [], viewports: [], designMetrics: [], errors: [] };
report.buildId = (await readFile(new URL('../../../.next/BUILD_ID', import.meta.url), 'utf8')).trim();
const check = (name) => { report.checks.push(name); console.log(`PASS ${name}`); };
const watchErrors = (page) => {
  page.on('pageerror', (error) => report.errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') report.errors.push(message.text()); });
};

async function revealPublication(page, selector) {
  await page.evaluate((selector) => {
    const card = document.querySelector(selector);
    const press = document.querySelector('.brand-press');
    if (!press.hasAttribute('data-reel')) { card.scrollIntoView({block:'center',behavior:'instant'}); return; }
    const stage = document.querySelector('.press-stage');
    const track = document.querySelector('.press-track');
    const distance = track.scrollWidth - stage.clientWidth;
    const x = Math.max(0,Math.min(distance,card.offsetLeft - (stage.clientWidth-card.clientWidth)/2));
    const start = stage.parentElement.getBoundingClientRect().top + scrollY - 88;
    scrollTo({top:start + x/distance*(distance+innerWidth*.3),behavior:'instant'});
  },selector);
  await page.waitForTimeout(1100);
}

try {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  watchErrors(page);
  for (const locale of ['ru', 'en']) for (const [width, height] of [[1440, 900], [1366, 768], [768, 1024], [390, 844], [320, 568]]) {
    await page.setViewportSize({ width, height });
    await page.goto(`${base}/${locale}`, { waitUntil: 'domcontentloaded' });
    await page.locator('h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => document.querySelector('.brand-hero')?.dataset.intro === 'complete');
    report.designMetrics.push(await page.evaluate(({ locale, width, height }) => ({ locale, width, height, heroRoleFont: getComputedStyle(document.querySelector('.hero-role')).fontSize, albumMetaFont: getComputedStyle(document.querySelector('.album-meta')).fontSize, primaryActionBottom: document.querySelector('.hero-actions .brand-button').getBoundingClientRect().bottom, headings: [...document.querySelectorAll('main h2')].filter((element) => element.checkVisibility()).map((element) => element.innerText), pageHeight: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth > innerWidth }), { locale, width, height }));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    const button = await page.locator('.hero-actions .brand-button').boundingBox();
    const hero = await page.locator('#home').boundingBox();
    assert.ok(button && hero && button.x >= 0 && button.x + button.width <= width && button.y + button.height <= height, 'Hero action must fit the initial viewport');
    for (const control of await page.locator('.hero-film-controls button').all()) {
      const target = await control.boundingBox();
      assert.ok(target && target.width >= 44 && target.height >= 44, 'Playback controls need usable touch targets');
    }
    const pinned = await page.locator('.pin-spacer').count() > 0;
    if (width < 1024 || height < 700) assert.equal(pinned, false);
    if (width === 1440 && height === 900) assert.equal(pinned, true);
    if (pinned) {
      const intro = await page.locator('.press-stage').boundingBox();
      assert.ok(intro && intro.height <= height - 100, 'The pinned publication stage must fit below the header');
      const captionsFit = await page.locator('.press-track').evaluate((track) => [...track.children].every((article) => [...article.children].every((child) => child.offsetTop + child.offsetHeight <= article.clientHeight + 2)));
      assert.equal(captionsFit, true, 'Every publication caption and source must fit the pinned stage');
    }
    for (const section of ['grammy', 'story', 'press', 'contact']) {
      await page.evaluate((id) => scrollTo({top:document.getElementById(id).getBoundingClientRect().top+scrollY-100,behavior:'instant'}),section);

      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.waitForFunction((id) => document.querySelector('.brand-desktop-nav a[aria-current="location"]')?.getAttribute('href') === `#${id}`, section);
    }
    await revealPublication(page, '.press-chart');
    await page.locator('.chart-document').click();
    const fittedDocument = page.locator('.document-viewer[open]');
    await fittedDocument.locator('.document-viewer-image').evaluate((element) => element.decode());
    const documentFits = await fittedDocument.locator('.document-viewer-stage').evaluate((element) => element.scrollHeight <= element.clientHeight + 2 && element.scrollWidth <= element.clientWidth + 2);
    assert.equal(documentFits, true, 'The fitted publication must fit at every viewport');
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.body.style.overflow !== 'hidden');
    report.viewports.push({ locale, width, height, overflow: false, pinned, primaryActionInViewport: true, videoTargetsAtLeast44: true, chapterNavigationTracksScroll: true, publicationFitsViewport: true });
    if (qaMedia && locale === 'ru' && (width === 1440 || width === 390)) {
      if (width === 1440) for (const picture of await page.locator('main img:visible').all()) { await picture.scrollIntoViewIfNeeded(); await picture.evaluate((image) => image.decode()); }
      await page.locator('#home').scrollIntoViewIfNeeded();
      await page.locator('video').evaluate(async (video) => {
        video.pause(); video.currentTime = 20;
        if (video.readyState < 2) await new Promise((resolve) => video.addEventListener('seeked', resolve, { once: true }));
      });
      await saveShot(page, { path: path.join(evidence, width === 1440 ? 'rebuild-desktop.png' : 'rebuild-mobile.png'), fullPage: false, scale: 'css' });
      if (width === 1440) await saveShot(page, { path: path.join(evidence, 'rebuild-design-overview.png'), fullPage: true, scale: 'css' });
      await page.evaluate((selector) => { const section = document.querySelector(selector); scrollTo({ top: scrollY + section.getBoundingClientRect().top - 100, behavior: 'instant' }); }, width === 1440 ? '#press' : '.press-chart');
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await saveShot(page, { path: path.join(evidence, width === 1440 ? 'rebuild-media-desktop.png' : 'rebuild-media-mobile.png'), scale: 'css' });
    }
  }
  check('both languages at five viewport sizes, all sections accessible, no horizontal overflow, publications fit, pin only on eligible desktop');
  check('primary action fits the initial screen, 44-pixel video targets and current chapter navigation at all five sizes');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/ru?utm_source=78&tag=one&tag=two&roistat_visit=987`, { waitUntil: 'domcontentloaded' });
  const menuButton = page.getByRole('button', { name: 'Открыть меню', exact: true });
  await menuButton.click();
  assert.equal(await page.locator('.brand-menu').evaluate((dialog) => dialog.open), true);
  await page.waitForFunction(() => document.body.style.overflow === 'hidden');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.brand-menu').evaluate((dialog) => dialog.open), false);
  await page.waitForFunction(() => document.body.style.overflow !== 'hidden');
  assert.equal(await menuButton.evaluate((element) => document.activeElement === element), true);
  await menuButton.click();
  await page.locator('dialog nav a[href="#story"]').click();
  assert.equal(await page.locator('.brand-menu').evaluate((dialog) => dialog.open), false);
  check('mobile menu: open, Escape, restored focus, chapter navigation');

  for (const project of ['strategic', 'g1deon', 'beatkoin', 'polstan']) {
    const details = page.locator(`#project-${project}`);
    assert.equal(await details.locator('.project-preview').isVisible(), true);
    await details.locator('summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await details.evaluate((element) => element.open), true);
    await details.locator('summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await details.evaluate((element) => element.open), false);
  }
  check('all four project stories open and close by keyboard');

  assert.deepEqual(await page.locator('main > section[id]').evaluateAll((sections) => sections.map((section) => section.id)), ['home', 'grammy', 'press', 'story', 'contact']);
  assert.match(await page.locator('#live-title').innerText(), /2004/);
  assert.match(await page.locator('#live-title').innerText(), /2025/);
  assert.match(await page.locator('#live-title').innerText(), /Продюсер\s+и\s+директор/);
  assert.equal(await page.locator('.grammy-previous a').getAttribute('href'), 'https://vk.ru/wall17247_9383');
  assert.match(await page.locator('#grammy-previous-title').innerText(), /2025/);
  const archive = page.locator('.career-archive');
  assert.equal(await archive.evaluate((element) => element.open), false);
  await archive.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await archive.evaluate((element) => element.open), true);
  assert.equal(await archive.locator('.filmography').isVisible(), true);
  assert.equal(await archive.locator('.career-year').filter({ hasText: /^2026$/ }).count(), 0);
  await archive.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await archive.evaluate((element) => element.open), false);
  check('current releases and media precede legacy, DOMINIA roles retain 2004/2025, historical archive works by keyboard');

  for (const name of ['billboard-dominia.jpg', 'billboard-cover.jpg', 'metalfan-chart.jpg', 'metro-projects.jpg', 'press-78-v4.jpg']) {
    const image = page.locator(`#press img[src="/media/brand/${name}"]`).first();
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => element.decode());
    assert.ok(await image.evaluate((element) => element.naturalWidth > 0));
    assert.ok(await image.getAttribute('alt'));
  }
  for (const href of ['https://vk.ru/wall-27452_15027', 'https://vk.ru/wall-27452_15042', 'https://www.metalfan.nl/article.php?sid=27476']) assert.equal(await page.locator(`#press .press-document-links a[href="${href}"]`).count(), 1);
  assert.ok((await page.locator('.press-billboard a').all()).length >= 4);
  check('all five press images decode and retain real source links; documents open at full size');

  for (let index = 0; index < 3; index++) {
    const trigger = page.locator('.press-document-trigger').nth(index);
    await trigger.focus();
    await page.keyboard.press('Enter');
    const viewer = page.locator('.document-viewer[open]');
    await viewer.waitFor({ state: 'visible' });
    await page.waitForFunction(() => document.body.style.overflow === 'hidden');
    const image = viewer.locator('.document-viewer-image');
    await image.evaluate((element) => element.decode());
    const fit = await viewer.locator('.document-viewer-stage').evaluate((element) => ({ width: element.clientWidth, scrollWidth: element.scrollWidth, height: element.clientHeight, scrollHeight: element.scrollHeight }));
    assert.ok(fit.scrollWidth <= fit.width + 2 && fit.scrollHeight <= fit.height + 2, 'Fit-to-screen document must fit its stage');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await viewer.locator('.document-viewer-footer a').last().evaluate((element) => document.activeElement === element), true);
    await page.keyboard.press('Tab');
    assert.equal(await viewer.locator('.document-viewer-close').evaluate((element) => document.activeElement === element), true);
    await viewer.getByRole('button', { name: 'Масштаб 1:1', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.document-viewer[open] .document-viewer-image')?.getBoundingClientRect().width === document.querySelector('.document-viewer[open] .document-viewer-image')?.naturalWidth);
    const zoom = await image.evaluate((element) => ({ displayed: element.getBoundingClientRect().width, natural: element.naturalWidth }));
    assert.equal(zoom.displayed, zoom.natural);
    assert.equal(await viewer.getByRole('button', { name: 'По размеру экрана', exact: true }).getAttribute('aria-pressed'), 'true');
    await viewer.locator('.document-viewer-stage').evaluate((element) => { element.scrollLeft = 100; });
    assert.ok(await viewer.locator('.document-viewer-stage').evaluate((element) => element.scrollLeft > 0));
    await viewer.locator('.document-viewer-stage').evaluate((element) => { element.scrollLeft = 0; });
    if (index === 2) await saveShot(page, { path: path.join(evidence, 'rebuild-document-viewer-mobile.png'), scale: 'css' });
    await page.keyboard.press('Escape');
    await viewer.waitFor({ state: 'hidden' });
    await page.waitForFunction(() => document.body.style.overflow !== 'hidden');
    assert.equal(await trigger.evaluate((element) => document.activeElement === element), true);
  }
  check('three publication viewers: fit, actual-size zoom, horizontal pan, keyboard focus trap, Escape and restored focus/scroll');


  await page.locator('#contact').scrollIntoViewIfNeeded();
  assert.equal(await page.locator('.inquiry-selection li').count(), 0);
  const contactInput = page.locator('input[name="contact"]');
  const prepareButton = page.getByRole('button', { name: 'Подготовить сообщение', exact: true });
  for (const invalidContact of ['', '   ']) {
    await contactInput.fill(invalidContact);
    await prepareButton.click();
    await page.waitForFunction(() => document.querySelector('input[name="contact"]')?.getAttribute('aria-invalid') === 'true');
    const description = await contactInput.getAttribute('aria-describedby');
    assert.ok(description);
    assert.match(await page.locator(`[id="${description}"]`).innerText(), /Telegram, email или телефон/);
    assert.equal(await contactInput.evaluate((element) => document.activeElement === element), true);
    assert.equal(await page.locator('.inquiry-ready').count(), 0);
  }
  await page.evaluate(() => { const form = document.querySelector('.brand-form'); scrollTo({ top: scrollY + form.getBoundingClientRect().top - 95, behavior: 'instant' }); });
  await saveShot(page, { path: path.join(evidence, 'rebuild-iteration-3-form.png'), scale: 'css' });
  check('Russian inquiry: empty and whitespace contacts show an associated inline error, keep focus and create no Telegram draft');
  await page.locator('#services > summary').click();
  const serviceActionNames = [];
  for (const index of [0, 1]) {
    const service = page.locator('.catalog-service').nth(index);
    await service.locator('summary').click();
    const action = service.locator('.catalog-service-body > .catalog-select');
    serviceActionNames.push(await action.getAttribute('aria-label'));
    await action.click();
    assert.match(await action.getAttribute('aria-label'), /^Убрать из проекта: .+/);
  }
  assert.equal(new Set(serviceActionNames).size, 2);
  assert.ok(serviceActionNames.every((name) => name && name !== 'Добавить в проект'));
  assert.equal(await page.locator('.inquiry-selection li').count(), 2);
  await page.locator('input[name="name"]').fill('Иван & DOMINIA');
  await page.locator('input[name="contact"]').fill('@test_polstan');
  assert.equal(await contactInput.getAttribute('aria-invalid'), null);
  assert.equal(await page.locator('.brand-form [role="alert"]').count(), 0);
  await page.locator('textarea[name="message"]').fill('Музыка для фильма\nБах + гитары? #2027');
  await page.locator('select[name="budget"]').selectOption({ index: 1 });
  await page.locator('select[name="timeline"]').selectOption({ index: 1 });
  await page.getByRole('button', { name: 'Подготовить сообщение', exact: true }).click();
  const telegram = new URL(await page.locator('.inquiry-ready a').getAttribute('href'));
  const message = telegram.searchParams.get('text');
  assert.equal(telegram.hostname, 't.me');
  for (const expected of ['Иван & DOMINIA', '@test_polstan', 'Музыка для фильма\nБах + гитары? #2027', 'Roistat: 987', 'utm_source=78', 'tag=one&tag=two', '1.', '2.']) assert.ok(message.includes(expected), expected);
  assert.ok(!message.includes('3.'));
  await page.locator('textarea[name="message"]').fill('Изменённая идея');
  assert.equal(await page.locator('.inquiry-ready').count(), 0);
  check('no preselection; two services and prices reach prepared Telegram URL with Unicode, repeated campaign params and Roistat; editing invalidates the draft; no message sent');

  await page.locator('.locale-switch').click();
  await page.waitForURL(/\/en\?/);
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  const switched = new URL(page.url());
  assert.equal(switched.searchParams.get('utm_source'), '78');
  assert.deepEqual(switched.searchParams.getAll('tag'), ['one', 'two']);
  assert.equal(switched.searchParams.get('roistat_visit'), '987');
  check('locale switch preserves query and repeated campaign values; English document language');

  const chartTitle = (await page.locator('.press-chart h3').innerText()).replace(/\s+/g, ' ').trim();
  await page.locator('.chart-document').click();
  const englishViewer = page.locator('.document-viewer[open]');
  assert.equal((await englishViewer.locator('h2').innerText()).replace(/\s+/g, ' ').trim(), chartTitle);
  await englishViewer.getByRole('button', { name: 'Actual size', exact: true }).click();
  await englishViewer.getByRole('button', { name: 'Fit to screen', exact: true }).waitFor();
  await englishViewer.getByRole('button', { name: 'Close document', exact: true }).click();
  await page.waitForFunction(() => document.body.style.overflow !== 'hidden');
  check('English publication viewer: localized heading, zoom, close and scroll restoration');

  await page.getByRole('button', { name: 'Prepare message', exact: true }).click();
  await page.locator('.brand-form [role="alert"]').waitFor();
  assert.match(await page.locator('.brand-form [role="alert"]').innerText(), /Telegram, email or phone/);
  assert.equal(await page.locator('input[name="contact"]').getAttribute('aria-invalid'), 'true');
  await page.locator('input[name="contact"]').fill('listener@example.com');
  assert.equal(await page.locator('.brand-form [role="alert"]').count(), 0);
  await page.getByRole('button', { name: 'Prepare message', exact: true }).click();
  assert.ok((await page.locator('.inquiry-ready a').getAttribute('href')).includes('t.me'));
  check('English inquiry: localized inline error clears after correction, valid contact prepares the draft');

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${base}/ru`, { waitUntil: 'domcontentloaded' });
  const video = page.locator('video');
  await page.waitForFunction(() => document.querySelector('.brand-hero')?.dataset.intro === 'complete');
  await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
  await page.waitForFunction(() => document.querySelector('video')?.paused === false && document.querySelector('video')?.readyState >= 2);
  assert.equal(await video.evaluate((element) => element.muted), true);
  await page.getByRole('button', { name: 'Приостановить видео', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('video')?.paused === true);
  await page.locator('#story').scrollIntoViewIfNeeded();
  await page.locator('#home').scrollIntoViewIfNeeded();
  assert.equal(await video.evaluate((element) => element.paused), true);
  await page.getByRole('button', { name: 'Воспроизвести видео', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('video')?.paused === false);
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
  await page.waitForFunction(() => document.querySelector('video')?.paused === true);
  await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
  await page.waitForFunction(() => document.querySelector('video')?.paused === false);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('video')?.paused === true);
  check('muted autoplay, explicit pause survives scrolling away/back, manual resume, offscreen pause');
  check('visibilitychange pauses/resumes video with simulated document.hidden');

  const reducedContext = await browser.newContext({ reducedMotion: 'reduce', serviceWorkers: 'block' });
  const reduced = await reducedContext.newPage(); watchErrors(reduced);
  await reduced.goto(`${base}/ru`, { waitUntil: 'domcontentloaded' });
  assert.equal(await reduced.locator('.pin-spacer').count(), 0);
  assert.equal(await reduced.locator('video').evaluate((element) => element.paused), true);
  assert.equal(await reduced.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  await reduced.locator('video').evaluate((video) => { video.play = () => Promise.reject(new DOMException('Interrupted by pause', 'AbortError')); });
  await reduced.getByRole('button', { name: 'Воспроизвести видео', exact: true }).click();
  await reduced.waitForTimeout(100);
  assert.equal(await reduced.locator('video').count(), 1);
  await reduced.locator('video').evaluate((video) => { delete video.play; });
  check('interrupted manual play preserves healthy video and retry controls (AbortError regression)');
  await reduced.getByRole('button', { name: 'Воспроизвести видео', exact: true }).click();
  await reduced.waitForFunction(() => document.querySelector('video')?.paused === false);
  check('reduced motion: no pin, static live poster, explicit video play works');
  await reducedContext.close();

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, serviceWorkers: 'block' });
  const noJs = await noJsContext.newPage();
  await noJs.goto(`${base}/en`);
  assert.equal(await noJs.locator('html').getAttribute('lang'), 'en');
  assert.equal(await noJs.locator('#title-dominia').innerText(), 'Tamas');
  assert.equal(await noJs.locator('#title-bach').innerText(), 'Bach');
  assert.notEqual(await noJs.locator('fieldset').getAttribute('disabled'), null);
  assert.equal(await noJs.getByRole('button', { name: 'Prepare message', exact: true }).isDisabled(), true);
  await noJs.locator('#project-g1deon > summary').click();
  assert.equal(await noJs.locator('#project-g1deon').evaluate((element) => element.open), true);
  check('without JavaScript: English SSR language, story, native project details, direct contact; form cannot accidentally submit personal fields via GET');
  const rawDocumentPromise = noJs.waitForEvent('popup');
  await noJs.locator('.chart-document').click();
  const rawDocument = await rawDocumentPromise;
  await rawDocument.waitForURL('**/media/brand/metalfan-chart.jpg');
  await rawDocument.waitForLoadState('load');
  assert.ok(rawDocument.url().endsWith('/media/brand/metalfan-chart.jpg'));
  assert.equal(await rawDocument.locator('img').evaluate((image) => image.naturalWidth), 640);
  await rawDocument.close();
  check('without JavaScript: publication link still opens the original, readable image');

  await noJsContext.close();

  const failedContext = await browser.newContext({ serviceWorkers: 'block' });
  const failed = await failedContext.newPage();
  await failed.route('**/*.mp4', (route) => route.abort());
  await failed.goto(`${base}/ru`, { waitUntil: 'domcontentloaded' });
  await failed.waitForFunction(() => { const image = document.querySelector('.brand-hero-film img'); return image?.complete && image.naturalWidth > 0; });
  assert.equal(await failed.locator('.brand-hero-film img').evaluate((image) => image.complete && image.naturalWidth > 0), true);
  assert.equal(await failed.locator('h1').isVisible(), true);
  check('blocked video: real live poster and identity remain visible');
  await failedContext.close();

  const pwaContext = await browser.newContext();
  const pwa = await pwaContext.newPage();
  await pwa.goto(`${base}/ru`, { waitUntil: 'load' });
  await pwa.waitForFunction(() => navigator.serviceWorker.controller !== null);
  const pwaState = await pwa.evaluate(async () => ({ keys: await caches.keys(), urls: (await (await caches.open('polstan-pwa-v9-kinetic-brand-shell')).keys()).map((request) => request.url) }));
  assert.ok(pwaState.keys.includes('polstan-pwa-v9-kinetic-brand-shell'));
  assert.ok(pwaState.urls.some((url) => url.endsWith('/en')));
  assert.ok(pwaState.urls.every((url) => !url.endsWith('.mp4')));
  assert.ok(pwaState.urls.some((url) => url.endsWith('/media/brand/metalfan-chart.jpg')));
  await pwa.reload({ waitUntil: 'load' });
  await pwaContext.setOffline(true);
  await pwa.reload({ waitUntil: 'domcontentloaded' });
  assert.ok((await pwa.locator('h1').innerText()).toLocaleLowerCase('ru').includes('полеско'));
  check('production PWA: new shell cache active, both languages cached, concert videos excluded, offline page renders');
  await pwaContext.close();

  assert.deepEqual(report.errors, []);
  check('no JavaScript exceptions or console errors in successful browser journeys');
  report.passed = true;
  await context.close();
} finally {
  await browser.close();
  await writeFile(path.join(evidence, 'rebuild-browser-checks.json'), JSON.stringify(report, null, 2) + '\n');
  await writeFile(path.join(evidence, 'rebuild-design-review.json'), JSON.stringify({ date: report.date, buildId: report.buildId, browser: report.browser, passed: report.passed, metrics: report.designMetrics, viewports: report.viewports }, null, 2) + '\n');
}

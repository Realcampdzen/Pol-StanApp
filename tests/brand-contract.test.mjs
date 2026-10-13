import assert from 'node:assert/strict';
import { test } from 'node:test';
import { brandContent, brandSources, grammyStatus } from '../lib/brand-content.ts';
import { buildTelegramLink, buildTelegramMessage } from '../lib/telegram.ts';
import { buildQueryString } from '../lib/query-string.ts';

test('both languages distinguish first-round consideration from nomination, and credit both productions', () => {
  assert.equal(grammyStatus, 'first-round-consideration');
  for (const copy of Object.values(brandContent)) {
    const [tamas, bach] = copy.grammy.albums;
    assert.equal(tamas.href, brandSources.tamas);
    assert.equal(bach.href, brandSources.bach);
    assert.match(tamas.credit, /Уваров|Uvarov/);
    assert.match(bach.credit, /Продюс|produc/i);
    assert.equal(tamas.categories.length, 2);
    assert.equal(bach.categories.length, 2);
    assert.match(copy.grammy.status, /Первый тур|First.round/i);
    assert.match(copy.grammy.statusNote, /номинант|nominee/i);
    assert.equal(copy.grammy.previousRound.href, 'https://vk.ru/wall17247_9383');
    assert.match(copy.grammy.previousRound.title, /2025/);
  }
});

test('career retains all four author projects and the correct artist identity', () => {
  for (const copy of Object.values(brandContent)) {
    assert.deepEqual(copy.story.projects.map((item) => item.name), ['Strategic Music', 'G1Deon', 'BEATKOIN', 'PolStan Music']);
    assert.equal(copy.story.projects.find((item) => item.id === 'beatkoin').href, 'https://vk.ru/artist/5161732815437030747');
  }
});

test('Telegram intent preserves multiple offerings, prices, Unicode and campaign attribution', () => {
  const source = 'polstan.ru/ru?utm_source=78&tag=one&tag=two#contact';
  const intent = {
    locale: 'ru', source, selectedOffering: 'fallback must not replace selection',
    selectedOfferings: [{ title: 'Музыка & кино', priceLabel: 'от 20 000₽' }, { title: 'Саунд-дизайн' }],
    name: 'Иван', contact: '@ivan_test', budgetRange: 'Обсудим', timeline: 'Осенью', message: 'Два мира\nБах + DOMINIA? #2027', roistatVisit: '123456'
  };
  const message = buildTelegramMessage(intent);
  const url = new URL(buildTelegramLink('@polstan', message));
  assert.equal(url.hostname, 't.me');
  assert.equal(url.pathname, '/polstan');
  assert.equal(url.searchParams.get('text'), message);
  for (const value of ['1. Музыка & кино — от 20 000₽', '2. Саунд-дизайн', 'Roistat: 123456', `Source: ${source}`, intent.message, intent.contact]) assert.ok(message.includes(value), value);
  assert.ok(!message.includes('fallback must not replace selection'));
});

test('unselected inquiry stays general and omits absent tracking', () => {
  const message = buildTelegramMessage({ locale: 'en', source: 'polstan.ru/en#contact', selectedOffering: 'Discuss a project', selectedOfferings: [], name: '', contact: 'user@example.com', message: '', budgetRange: '', timeline: '' });
  assert.ok(message.includes('1. Discuss a project'));
  assert.ok(!message.includes('Roistat:'));
});

test('locale query preserves repeated campaign values and safe URL encoding', () => {
  const query = buildQueryString({ utm_source: '78 & Metro', tag: ['one', 'два'], roistat_visit: '987', absent: undefined });
  const url = new URL(`/en${query}`, 'https://polstan.ru');
  assert.equal(url.searchParams.get('utm_source'), '78 & Metro');
  assert.deepEqual(url.searchParams.getAll('tag'), ['one', 'два']);
  assert.equal(url.searchParams.get('roistat_visit'), '987');
  assert.equal(url.searchParams.has('absent'), false);
});

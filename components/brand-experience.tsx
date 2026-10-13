'use client';

import Image from 'next/image';
import { ArrowUp, ArrowUpRight, ArrowRight, Menu, Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { SiteContent } from '@/lib/types';
import { brandSources, getBrandContent, type BrandContent } from '@/lib/brand-content';
import { LiveHero } from './live-hero';
import { BrandMotion } from './brand-motion';
import { BrandInquiry } from './brand-inquiry';
import { PressDocument } from './press-document';

const chapterIds = ['home', 'grammy', 'press', 'story', 'contact'] as const;

function PressCoverage({ copy, locale }: { copy: BrandContent['press']; locale: SiteContent['locale'] }) {
  return (
    <section id="press" className="brand-press brand-section" aria-labelledby="press-title">
      <div className="press-heading" data-reveal><h2 className="brand-title" id="press-title">{copy.title.split("\n").map((line, index) => <span className="title-phrase" key={index}>{line}</span>)}</h2></div>
      <div className="press-stage"><div className="press-track">
        <article className="press-document press-billboard" data-reveal>
          <p className="brand-eyebrow">{copy.billboard.type}</p>
          <h3>{copy.billboard.title}</h3><p className="press-document-body">{copy.billboard.text}</p>
          <figure>
            <div className="billboard-pages">
              <PressDocument locale={locale} src="/media/brand/billboard-dominia.jpg" alt={locale === 'ru' ? 'Полоса DOMINIA / Tamas, For Your Consideration, в Billboard Grammy Preview.' : 'DOMINIA / Tamas, For Your Consideration page in Billboard’s Grammy Preview.'} title={copy.billboard.title} label={copy.billboard.imageLabel} className="billboard-page" width={1176} height={1501} sizes="(max-width: 767px) 72vw, 39vw" source={{ href: brandSources.billboard, label: copy.billboard.post }} />
              <PressDocument locale={locale} src="/media/brand/billboard-cover.jpg" alt={locale === 'ru' ? 'Обложка Billboard от 3 октября 2026: Grammy Preview 2027.' : 'Billboard’s 3 October 2026 cover: 2027 Grammy Preview.'} title={locale === 'ru' ? 'Billboard Grammy Preview, 3 октября 2026' : 'Billboard Grammy Preview, 3 October 2026'} label={copy.billboard.coverLabel} className="billboard-cover" width={1097} height={1405} sizes="(max-width: 767px) 19vw, 11vw" source={{ href: brandSources.billboard, label: copy.billboard.post }} />
            </div>
            <figcaption>{copy.billboard.caption}</figcaption>
          </figure>
          <div className="press-document-links"><a className="brand-text-link" href={brandSources.billboard} target="_blank" rel="noreferrer">{copy.billboard.post}<ArrowUpRight size={16} /></a><a className="brand-text-link" href={brandSources.billboardIssue} target="_blank" rel="noreferrer">{copy.billboard.cta}<ArrowUpRight size={16} /></a></div>
        </article>
        <article className="press-document press-chart" data-reveal>
          <p className="brand-eyebrow">{copy.chart.type}</p>
          <h3>{copy.chart.title}</h3><p className="press-document-body">{copy.chart.text}</p>
          <figure><PressDocument locale={locale} src="/media/brand/metalfan-chart.jpg" alt={locale === 'ru' ? 'Скриншот результатов Metalfan.nl: 1. Dominia / Tamas. Опрос альбомов августа 2026.' : 'Metalfan.nl poll screenshot: 1. Dominia / Tamas. Albums of August 2026.'} title={copy.chart.title} label={copy.chart.imageLabel} className="chart-document" width={640} height={863} sizes="(max-width: 767px) 88vw, 36vw" source={{ href: brandSources.metalfan, label: copy.chart.cta }} /><figcaption>{copy.chart.caption}</figcaption></figure>
          <div className="press-document-links"><a className="brand-text-link" href={brandSources.metalfan} target="_blank" rel="noreferrer">{copy.chart.cta}<ArrowUpRight size={16} /></a><a className="brand-text-link" href={brandSources.metalfanPost} target="_blank" rel="noreferrer">{copy.chart.post}<ArrowUpRight size={16} /></a></div>
        </article>
        <article className="press-tv"><a href={brandSources.television} target="_blank" rel="noreferrer" className="press-tv-image"><Image src="/media/brand/press-78-v4.jpg" alt={locale === 'ru' ? 'Станислав Полеско, интервью в «Вечернем шоу» телеканала «78».' : 'Stanislav Polesko interviewed on 78 TV’s Evening Show.'} width={960} height={1280} sizes="(max-width: 767px) 90vw, 47vw" unoptimized /></a><div><p className="brand-eyebrow">{copy.television.type}</p><h3>{copy.television.title}</h3><p>{copy.television.text}</p><a className="brand-text-link" href={brandSources.television} target="_blank" rel="noreferrer">{copy.television.cta}<ArrowUpRight size={16} /></a><small>{copy.television.note}</small></div></article>
        <article className="press-metro"><a href={brandSources.metro} target="_blank" rel="noreferrer" className="press-metro-image"><Image src="/media/brand/metro-projects.jpg" alt={locale === 'ru' ? 'Фото к статье Metro о DOMINIA и альбоме Баха в отборе Grammy.' : 'The image from Metro’s article about DOMINIA and the Bach album in Grammy consideration.'} width={858} height={429} sizes="(max-width: 767px) 90vw, 37vw" unoptimized /></a><div><p className="brand-eyebrow">{copy.metro.type}</p><h3>{copy.metro.title}</h3><p>{copy.metro.text}</p><a className="brand-text-link" href={brandSources.metro} target="_blank" rel="noreferrer">{copy.metro.cta}<ArrowUpRight size={16} /></a></div></article>
      </div><div className="press-reel-progress" aria-hidden="true"><span /></div></div>
    </section>
  );
}

export function BrandExperience({ content: site, initialQueryString, initialRoistatVisit }: { content: SiteContent; initialQueryString: string; initialRoistatVisit: string }) {
  const copy = getBrandContent(site.locale);
  const scope = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState('home');
  const otherLocale = site.locale === 'ru' ? 'en' : 'ru';
  const navigation = [['grammy', copy.nav.grammy], ['press', copy.nav.press], ['story', copy.nav.story], ['contact', copy.nav.contact]];

  useEffect(() => {
    document.documentElement.lang = site.locale;
    if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') return;
    const register = () => { void navigator.serviceWorker.register('/sw.js').catch(() => undefined); };
    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
    return () => window.removeEventListener('load', register);
  }, [site.locale]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const chapter = entries.filter((entry) => entry.isIntersecting).at(-1);
      if (chapter) setActiveChapter(chapter.target.id);
    }, { rootMargin: '-20% 0px -65% 0px' });
    chapterIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [menuOpen]);

  const closeMenu = () => { menu.current?.close(); setMenuOpen(false); };

  return (
    <div className="brand-experience" ref={scope}>
      <div className="reading-progress" aria-hidden="true"><span /></div>
      <a className="brand-skip" href="#main">{copy.nav.skip}</a>
      <header className="brand-header">
        <a className="brand-wordmark" href="#home" aria-label={site.locale === 'ru' ? 'PolStan: начало' : 'PolStan: home'}>POLSTAN</a>
        <nav className="brand-desktop-nav" aria-label={site.locale === 'ru' ? 'Главная навигация' : 'Main navigation'}>{navigation.map(([id, title]) => <a href={`#${id}`} key={id} aria-current={activeChapter === id ? 'location' : undefined}>{title}</a>)}</nav>
        <div className="brand-header-tools"><a className="locale-switch" href={`/${otherLocale}${initialQueryString}`} hrefLang={otherLocale} lang={otherLocale} aria-label={otherLocale === 'en' ? 'Switch to English' : 'Переключить на русский'}>{otherLocale.toUpperCase()}<ArrowUpRight size={12} /></a><button className="brand-menu-button" type="button" aria-label={copy.nav.menu} aria-haspopup="dialog" aria-expanded={menuOpen} onClick={() => { menu.current?.showModal(); setMenuOpen(true); }}><Menu size={23} /></button></div>
      </header>
      <dialog className="brand-menu" ref={menu} aria-label={site.locale === 'ru' ? 'Навигация' : 'Navigation'} onClose={() => setMenuOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="brand-menu-inner"><div className="menu-top"><span>POLSTAN</span><button type="button" aria-label={copy.nav.close} onClick={closeMenu} autoFocus><X size={25} /></button></div><nav>{navigation.map(([id, title]) => <a href={`#${id}`} onClick={closeMenu} key={id} aria-current={activeChapter === id ? 'location' : undefined}>{title}<ArrowUpRight size={23} /></a>)}</nav><a className="brand-text-link" href={`/${otherLocale}${initialQueryString}`}>{otherLocale === 'en' ? 'English version' : 'Русская версия'}<ArrowRight size={16} /></a></div>
      </dialog>
      <main id="main">
        <LiveHero copy={copy.hero} />
        <section id="grammy" className="brand-grammy brand-section" aria-labelledby="grammy-title">
          <div className="grammy-topline"><span className="brand-eyebrow">{copy.grammy.eyebrow}</span><span className="grammy-year">GRAMMY <b>2027</b></span></div>
          <div className="grammy-layout">
            <div className="grammy-intro"><h2 id="grammy-title" className="brand-title">{copy.grammy.title.split("\n").map((line, index) => <span className="title-phrase" key={index}>{line}</span>)}</h2><div className="grammy-context"><p className="brand-body">{copy.grammy.body}</p><div><div className="grammy-status"><p>{copy.grammy.status}</p></div><p className="grammy-status-note">{copy.grammy.statusNote}</p><a className="brand-text-link" href={brandSources.metro} target="_blank" rel="noreferrer">{copy.grammy.sourceLabel}<ArrowUpRight size={15} /></a></div></div></div>
            <div className="grammy-albums">{copy.grammy.albums.map((album) => <article className={`album-case album-${album.id}`} id={`album-${album.id}`} key={album.id} aria-labelledby={`title-${album.id}`}>
              <div className="album-meta"><span>{album.genre}</span><time dateTime={album.id === 'dominia' ? '2026-08-26' : '2026-08-28'}>{album.date}</time></div>
              <a href={album.href} className="album-art" target="_blank" rel="noreferrer" aria-label={`${copy.grammy.listen}: ${album.title}`}><Image src={album.image} alt={album.alt} width={592} height={592} sizes="(max-width: 767px) 90vw, (max-width: 1023px) 55vw, 46vw" unoptimized /></a>
              <div className="album-heading"><div><p className="brand-eyebrow">{album.artist}</p><h3 id={`title-${album.id}`}>{album.title}</h3>{'subtitle' in album && <p className="album-subtitle">{album.subtitle}</p>}</div><a className="brand-text-link" href={album.href} target="_blank" rel="noreferrer">{copy.grammy.listen}<ArrowUpRight size={16} /></a></div>
              <p className="album-description">{album.body}</p><div className="album-credits"><p className="brand-eyebrow">{copy.grammy.credits}</p><p>{album.credit}</p></div>
              <div className="album-categories"><p className="brand-eyebrow">{copy.grammy.categories}</p><ul>{album.categories.map((category) => <li key={category}>{category}</li>)}</ul></div>
              <details className="album-detail"><summary>{site.locale === 'ru' ? 'Титры альбома' : 'Album credits'}<Plus size={15} /></summary><p>{album.detail}</p><a className="brand-text-link" href={album.href} target="_blank" rel="noreferrer">{site.locale === 'ru' ? 'Полные титры' : 'Full credits'}<ArrowUpRight size={14} /></a></details>
            </article>)}</div>
          </div>
          <aside className="grammy-previous" aria-labelledby="grammy-previous-title"><h3 id="grammy-previous-title">{copy.grammy.previousRound.title}</h3><div><p>{copy.grammy.previousRound.text}</p><a className="brand-text-link" href={copy.grammy.previousRound.href} target="_blank" rel="noreferrer">{copy.grammy.previousRound.sourceLabel}<ArrowUpRight size={15} /></a></div></aside>
        </section>
        <PressCoverage copy={copy.press} locale={site.locale} />
        <section className="live-interlude" aria-labelledby="live-title"><div className="live-image"><Image src="/media/brand/live-78-v4.jpg" alt={copy.live.caption} fill sizes="100vw" unoptimized /></div><div className="live-interlude-shade" aria-hidden="true" /><div className="live-interlude-copy" data-reveal><h2 id="live-title" className="brand-title">{copy.live.title.split("\n").map((line, index) => <span className="title-phrase" key={index}>{line}</span>)}</h2><p>{copy.live.body}</p><a className="brand-text-link" href={brandSources.dominia} target="_blank" rel="noreferrer">{copy.live.cta}<ArrowUpRight size={17} /></a></div><p className="live-caption">{copy.live.caption}</p></section>
        <section id="story" className="brand-story brand-section" aria-labelledby="story-title"><div className="story-heading" data-reveal><div><h2 id="story-title" className="brand-title">{copy.story.title.split("\n").map((line, index) => <span className="title-phrase" key={index}>{line}</span>)}</h2></div><p className="brand-body">{copy.story.intro}</p></div>
          <div className="project-stories">{copy.story.projects.map((project) => <details className="project-story" id={`project-${project.id}`} key={project.id}><summary><strong>{project.name}</strong><span className="project-preview">{project.preview}</span><Plus size={25} /></summary><div className="project-body"><p className="brand-eyebrow project-type">{project.type}</p><p className="project-lead">{project.text}</p>{project.detail && <p>{project.detail}</p>}<a className="brand-text-link" href={project.href} target="_blank" rel="noreferrer">{project.link}<ArrowUpRight size={16} /></a>{project.id === 'beatkoin' && <a className="brand-text-link" href={brandSources.children} target="_blank" rel="noreferrer">Children · Apple Music<ArrowUpRight size={16} /></a>}</div></details>)}</div>
          <details className="career-archive"><summary>{copy.story.archiveLabel}<Plus size={22} /></summary><div className="career-archive-body"><div className="career-timeline"><span className="career-progress" aria-hidden="true" /><ol>{copy.story.timeline.map((entry) => <li key={entry.year} data-reveal><span className="career-year">{entry.year}</span><div><h3>{entry.title}</h3><p>{entry.text}</p><a className="brand-text-link" href={entry.href} target="_blank" rel="noreferrer">{entry.source}<ArrowUpRight size={14} /></a></div></li>)}</ol></div><div className="filmography"><p className="brand-eyebrow">{copy.story.filmLabel}</p><ul>{copy.story.films.map(([year, title]) => <li key={title}><span>{year}</span><h3>{title}</h3></li>)}</ul><div className="commercial-credit"><p>{copy.story.commercial}</p><a className="brand-text-link" href={brandSources.commercial} target="_blank" rel="noreferrer">{copy.story.commercialLink}<ArrowUpRight size={14} /></a></div></div></div></details>
        </section>
        <BrandInquiry site={site} copy={copy.contact} initialQueryString={initialQueryString} initialRoistatVisit={initialRoistatVisit} />
      </main>
      <footer className="brand-footer"><div><a className="brand-wordmark" href="#home">POLSTAN</a><p>{copy.footer.line}</p></div><div><a href="https://real-vibe.studio/" target="_blank" rel="noreferrer">{copy.footer.studio}<ArrowUpRight size={13} /></a><span>© {new Date().getFullYear()} {copy.footer.copyright}</span></div><a href="#home" className="footer-top" aria-label={copy.footer.top}><ArrowUp size={20} /></a></footer>
      <BrandMotion scope={scope} />
    </div>
  );
}

'use client';

import Image from 'next/image';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronDown,
  Check,
  Home,
  Languages,
  MessageCircle,
  Minus,
  Plus,
  Send,
  ShoppingBag,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { DropProduct, LeadIntent, Locale, ServiceOffer, ServicePackage, SiteContent } from '@/lib/types';
import { ROISTAT_STORAGE_KEY } from '@/lib/roistat';
import { buildTelegramLink, buildTelegramMessage, getTelegramUsername } from '@/lib/telegram';

type PolstanAppProps = {
  content: SiteContent;
  initialQueryString: string;
  initialRoistatVisit: string;
};

type FormState = {
  name: string;
  contact: string;
  budgetRange: string;
  timeline: string;
  message: string;
};

type InquiryItem = {
  key: string;
  title: string;
  priceLabel: string;
  source: 'service' | 'offer' | 'drop';
};

type MobileSection = 'home' | 'services' | 'drops' | 'contact';
type ServiceFilter = keyof SiteContent['serviceFilters'];

const mobileSectionIds: MobileSection[] = ['home', 'services', 'drops', 'contact'];
const serviceFilters: ServiceFilter[] = ['all', 'music', 'sound', 'video', 'ai'];

export function PolstanApp({ content, initialQueryString, initialRoistatVisit }: PolstanAppProps) {
  const initialSelection = content.services[0] ? [serviceKey(content.services[0])] : [];
  const [activeSection, setActiveSection] = useState<MobileSection>('home');
  const [selectedKeys, setSelectedKeys] = useState<string[]>(initialSelection);
  const [roistatVisit, setRoistatVisit] = useState(initialRoistatVisit);
  const catalogItems = useMemo(() => buildCatalogItems(content), [content]);
  const selectedOfferings = useMemo(
    () => selectedKeys.map((key) => catalogItems.get(key)).filter((item): item is InquiryItem => Boolean(item)),
    [catalogItems, selectedKeys]
  );

  useEffect(() => {
    if (initialRoistatVisit) {
      window.localStorage.setItem(ROISTAT_STORAGE_KEY, initialRoistatVisit);
      setRoistatVisit(initialRoistatVisit);
      return;
    }

    const storedVisit = window.localStorage.getItem(ROISTAT_STORAGE_KEY);
    if (storedVisit) {
      setRoistatVisit(storedVisit);
    }
  }, [initialRoistatVisit]);

  useEffect(() => {
    document.documentElement.lang = content.locale;
  }, [content.locale]);

  useEffect(() => {
    if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') {
      return;
    }

    const register = () => {
      void navigator.serviceWorker.register('/sw.js').catch(() => undefined);
    };

    if (document.readyState === 'complete') {
      register();
      return;
    }

    window.addEventListener('load', register, { once: true });
    return () => window.removeEventListener('load', register);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const probeY = window.scrollY + Math.min(window.innerHeight * 0.4, 360);
        const nextSection = mobileSectionIds.reduce<MobileSection>((current, id) => {
          const section = document.getElementById(id);
          return section && section.offsetTop <= probeY ? id : current;
        }, 'home');

        setActiveSection((current) => (current === nextSection ? current : nextSection));
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  function selectAndContact(item: InquiryItem) {
    setSelectedKeys((current) => (current.includes(item.key) ? current : [...current, item.key]));
    scrollToId('contact');
  }

  function toggleSelection(item: InquiryItem) {
    setSelectedKeys((current) => {
      if (current.includes(item.key)) {
        const next = current.filter((key) => key !== item.key);
        return next.length > 0 ? next : current;
      }

      return [...current, item.key];
    });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink text-white">
      <SiteHeader
        content={content}
        initialQueryString={initialQueryString}
        locale={content.locale}
        onContact={() => scrollToId('contact')}
      />
      <Hero
        content={content}
        onContact={() => {
          if (content.services[0]) {
            selectAndContact(toServiceInquiryItem(content.services[0]));
          } else {
            scrollToId('contact');
          }
        }}
      />
      <Services
        content={content}
        selectedKeys={selectedKeys}
        onSelectAndContact={selectAndContact}
        onToggleSelection={toggleSelection}
      />
      <Proof content={content} />
      <Drops
        content={content}
        selectedKeys={selectedKeys}
        onSelectAndContact={selectAndContact}
        onToggleSelection={toggleSelection}
      />
      <Contact
        content={content}
        initialQueryString={initialQueryString}
        onToggleSelection={toggleSelection}
        roistatVisit={roistatVisit}
        selectedOfferings={selectedOfferings}
      />
      <MobileSelectionTray
        content={content}
        selectedOfferings={selectedOfferings}
        hidden={activeSection === 'home' || activeSection === 'contact'}
        onContact={() => scrollToId('contact')}
      />
      <BottomNav activeSection={activeSection} content={content} />
    </main>
  );
}

function SiteHeader({
  content,
  initialQueryString,
  locale,
  onContact
}: {
  content: SiteContent;
  initialQueryString: string;
  locale: Locale;
  onContact: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-[calc(0.75rem+env(safe-area-inset-top))] sm:px-6 lg:pt-4">
      <div className="mx-auto flex max-w-md items-center justify-between border-b border-white/12 bg-ink/58 px-1 pb-3 backdrop-blur-md lg:max-w-6xl lg:bg-ink/45">
        <a className="focus-ring font-display text-lg uppercase leading-none text-white" href="#home">
          PolStan
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Section">
          <a className="focus-ring text-xs font-semibold uppercase text-white/62 transition hover:text-ice" href="#services">
            {content.nav.services}
          </a>
          <a className="focus-ring text-xs font-semibold uppercase text-white/62 transition hover:text-ice" href="#drops">
            {content.nav.drops}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitch initialQueryString={initialQueryString} locale={locale} />
          <button
            aria-label={content.nav.contact}
            className="focus-ring inline-flex min-h-11 items-center gap-2 border border-white/18 bg-white px-4 text-xs font-semibold uppercase text-black transition hover:bg-ice"
            type="button"
            onClick={onContact}
          >
            <MessageCircle aria-hidden="true" size={16} />
            <span className="hidden sm:inline">{content.nav.contact}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function LocaleSwitch({ initialQueryString, locale }: { initialQueryString: string; locale: Locale }) {
  const [query, setQuery] = useState(initialQueryString);
  const nextLocale = locale === 'ru' ? 'en' : 'ru';

  useEffect(() => {
    setQuery(window.location.search);
  }, []);

  return (
    <a
      aria-label={nextLocale === 'ru' ? 'Русская версия' : 'English version'}
      className="focus-ring inline-flex min-h-11 items-center gap-2 border border-white/14 bg-black/35 px-3 text-xs font-semibold uppercase text-white/80 backdrop-blur transition hover:border-ice hover:text-white"
      href={`/${nextLocale}${query}`}
    >
      <Languages aria-hidden="true" size={15} />
      {nextLocale.toUpperCase()}
    </a>
  );
}

function Hero({ content, onContact }: { content: SiteContent; onContact: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const SoundIcon = soundEnabled ? Volume2 : VolumeX;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    if (video.readyState >= 2) {
      setIsVideoReady(true);
    }
    void video.play().catch(() => undefined);
  }, [videoError]);

  function toggleSound() {
    const video = videoRef.current;
    if (!video || videoError) {
      return;
    }

    const nextSoundEnabled = !soundEnabled;
    video.muted = !nextSoundEnabled;
    video.volume = nextSoundEnabled ? 1 : 0;
    setSoundEnabled(nextSoundEnabled);

    void video.play().catch(() => {
      video.muted = true;
      video.volume = 0;
      setSoundEnabled(false);
    });
  }

  const soundLabel = soundEnabled
    ? content.locale === 'ru'
      ? 'Выключить звук видео'
      : 'Mute video'
    : content.locale === 'ru'
      ? 'Включить звук видео'
      : 'Unmute video';

  return (
    <section
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink pb-8 pt-20 sm:pb-20 lg:min-h-[60svh] lg:pb-10 xl:min-h-[62svh]"
      id="home"
    >
      <div className="absolute inset-0 z-0 bg-black">
        {videoError ? (
          <Image
            alt=""
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src="/media/crowd-stage.jpg"
          />
        ) : (
          <video
            ref={videoRef}
            aria-label="Concert footage"
            autoPlay
            className="hero-video h-full w-full object-cover"
            loop
            muted={!soundEnabled}
            playsInline
            preload="auto"
            onCanPlay={() => setIsVideoReady(true)}
            onError={() => setVideoError(true)}
            onLoadedData={() => setIsVideoReady(true)}
          >
            <source media="(max-width: 640px)" src="/media/hero-concert-v2-mobile.mp4" type="video/mp4" />
            <source src="/media/hero-concert-v2-desktop.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      {!videoError ? (
        <div
          className="absolute inset-0 z-[3] cursor-pointer"
          role="presentation"
          onClick={toggleSound}
        />
      ) : null}
      {!videoError ? (
        <div className="pointer-events-none absolute inset-x-0 top-24 z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <button
            aria-label={soundLabel}
            className={`focus-ring pointer-events-auto ml-auto grid h-11 w-11 place-items-center border border-ice/45 bg-black/62 text-ice shadow-glow backdrop-blur-md transition hover:border-ice hover:bg-black/78 ${
              isVideoReady ? 'opacity-100' : 'opacity-60'
            }`}
            type="button"
            onClick={toggleSound}
          >
            <SoundIcon aria-hidden="true" size={18} />
          </button>
        </div>
      ) : null}
      <div className="hero-vignette pointer-events-none absolute inset-0 z-[1]" />
      <div className="hero-depth pointer-events-none absolute inset-0 z-[2]" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-md flex-col justify-end px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] lg:hidden">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase leading-5 text-ice">{content.hero.name}</p>
          <h1 className="mt-3 max-w-[12ch] font-display text-[3.35rem] font-black uppercase leading-[0.9] text-white min-[390px]:text-[3.75rem]">
            {content.locale === 'ru' ? 'Собрать проект?' : 'Build the project?'}
          </h1>
          <p className="mt-5 max-w-[20rem] text-base leading-7 text-white/82">{content.hero.body}</p>
          <button
            className="focus-ring mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 border border-ice/65 bg-black/48 px-5 text-sm font-semibold text-ice shadow-glow backdrop-blur-md transition hover:bg-ice hover:text-black"
            type="button"
            onClick={onContact}
          >
            <Send aria-hidden="true" size={18} />
            {content.hero.primaryCta}
          </button>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase text-white">{content.mobileNav.services}</p>
              <a className="focus-ring text-xs font-semibold text-bronze" href="#services">
                {content.locale === 'ru' ? 'Смотреть все' : 'View all'}
              </a>
            </div>
            <div className="mt-3 grid gap-2">
              {content.services.slice(0, 3).map((service, index) => (
                <a
                  className="focus-ring grid min-h-[5.5rem] grid-cols-[5.8rem_1fr_auto] items-center gap-3 border border-white/12 bg-black/42 p-2 text-left backdrop-blur-sm transition hover:border-ice/60"
                  href="#services"
                  key={service.id}
                >
                  <div className="relative h-full min-h-16 overflow-hidden border border-white/8 bg-black">
                    <Image
                      alt=""
                      className="object-cover"
                      fill
                      sizes="96px"
                      src={service.media}
                    />
                    <span className="absolute left-2 top-2 text-[11px] font-semibold text-bronze">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-5 text-white">{service.title}</span>
                    <span className="mt-1 line-clamp-2 block text-xs leading-5 text-white/58">{service.cardBenefit}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="text-white/72" size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="relative z-10 mx-auto hidden min-h-[calc(60svh-5rem)] max-w-6xl flex-col justify-end px-8 pb-6 lg:flex xl:min-h-[calc(62svh-5rem)]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
          initial={{ opacity: 0, y: 34 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-5xl font-black uppercase leading-[0.9] text-white min-[430px]:text-6xl sm:text-7xl lg:text-8xl">
            {content.hero.name}
          </h1>
          <p className="mt-6 max-w-2xl text-sm uppercase leading-6 text-ice sm:text-base">
            {content.hero.role}
          </p>
          <p className="mt-5 max-w-xl text-lg leading-7 text-white/78 sm:text-xl">
            {content.hero.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="focus-ring inline-flex min-h-[3.25rem] items-center justify-center gap-3 bg-white px-6 text-sm font-semibold uppercase text-black transition hover:bg-ice"
              type="button"
              onClick={onContact}
            >
              <Send aria-hidden="true" size={18} />
              {content.hero.primaryCta}
            </button>
            <a
              className="focus-ring inline-flex min-h-[3.25rem] items-center justify-center gap-3 border border-white/20 bg-black/20 px-6 text-sm font-semibold uppercase text-white backdrop-blur transition hover:border-ice"
              href="#services"
            >
              <Sparkles aria-hidden="true" size={18} />
              {content.hero.secondaryCta}
            </a>
          </div>
          <p className="mt-9 text-xs uppercase text-white/55">{content.hero.status}</p>
        </motion.div>
      </div>
    </section>
  );
}

function Services({
  content,
  selectedKeys,
  onSelectAndContact,
  onToggleSelection
}: {
  content: SiteContent;
  selectedKeys: string[];
  onSelectAndContact: (item: InquiryItem) => void;
  onToggleSelection: (item: InquiryItem) => void;
}) {
  const [openService, setOpenService] = useState(content.services[0].id);
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>('all');
  const filteredServices = useMemo(
    () => content.services.filter((service) => serviceMatchesFilter(service, activeFilter)),
    [activeFilter, content.services]
  );

  return (
    <section className="section-shell scroll-mt-24 border-t border-white/10 bg-ink" id="services">
      <div className="mx-auto max-w-md px-4 py-9 lg:hidden">
        <div className="min-w-0">
          <h2 className="text-3xl font-black leading-tight text-white">{content.mobileNav.services}</h2>
          <p className="mt-2 text-sm leading-6 text-white/62">{content.servicesIntro.body}</p>
        </div>
        <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1">
          {serviceFilters.map((filter) => (
            <button
              className={`focus-ring inline-flex min-h-11 shrink-0 items-center justify-center border px-4 text-sm font-semibold transition ${
                activeFilter === filter
                  ? 'border-ice bg-ice text-black'
                  : 'border-white/14 bg-black/34 text-white/78 hover:border-ice/60 hover:text-white'
              }`}
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
            >
              {content.serviceFilters[filter]}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-3">
          {filteredServices.map((service) => (
            <MobileServiceCard
              key={service.id}
              onSelectAndContact={onSelectAndContact}
              onToggleSelection={onToggleSelection}
              selectedKeys={selectedKeys}
              service={service}
            />
          ))}
        </div>
      </div>
      <motion.div
        className="mx-auto hidden max-w-6xl px-8 pb-24 pt-16 lg:block"
        initial={{ opacity: 0, y: 26 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true, margin: '-120px' }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.35fr] lg:gap-14">
          <div>
            <h2 className="break-words font-display text-4xl font-black uppercase leading-none sm:text-5xl">
              {content.servicesIntro.title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/62">{content.servicesIntro.body}</p>
          </div>
          <div className="border-b border-white/10">
            {content.services.map((service, index) => (
              <ServiceRow
                index={index}
                isOpen={openService === service.id}
                key={service.id}
                locale={content.locale}
                onSelectAndContact={onSelectAndContact}
                onToggle={() => setOpenService(openService === service.id ? '' : service.id)}
                onToggleSelection={onToggleSelection}
                selectedKeys={selectedKeys}
                service={service}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function MobileServiceCard({
  onSelectAndContact,
  onToggleSelection,
  selectedKeys,
  service
}: {
  onSelectAndContact: (item: InquiryItem) => void;
  onToggleSelection: (item: InquiryItem) => void;
  selectedKeys: string[];
  service: ServicePackage;
}) {
  const [expanded, setExpanded] = useState(false);
  const serviceItem = toServiceInquiryItem(service);
  const serviceSelected = selectedKeys.includes(serviceItem.key);
  const selectedOfferCount = service.offers?.filter((offer) => selectedKeys.includes(offerKey(service, offer))).length ?? 0;
  const selected = serviceSelected || selectedOfferCount > 0;

  return (
    <article
      className={`overflow-hidden border bg-black/34 transition ${
        selected ? 'border-ice/70 shadow-glow' : 'border-white/12'
      }`}
    >
      <div className="grid grid-cols-[5.5rem_1fr_3rem] gap-3 p-3">
        <button className="focus-ring relative min-h-24 overflow-hidden border border-white/10 bg-black" type="button" onClick={() => setExpanded((current) => !current)}>
          <Image alt="" className="object-cover" fill sizes="88px" src={service.media} />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </button>
        <button className="focus-ring min-w-0 py-1 text-left" type="button" onClick={() => setExpanded((current) => !current)}>
          <span className="block text-[11px] font-semibold uppercase text-ice">{service.cardTitle}</span>
          <span className="mt-1 block text-base font-black leading-5 text-white">{service.title}</span>
          <span className="mt-1 line-clamp-2 block text-sm leading-5 text-white/58">{service.description}</span>
          <span className="mt-2 block text-xs font-semibold text-bronze">{service.priceLabel}</span>
        </button>
        <button
          aria-label={serviceSelected ? 'Remove service' : 'Add service'}
          className={`focus-ring grid h-11 w-11 place-items-center self-start border transition ${
            serviceSelected ? 'border-ice bg-ice text-black' : 'border-white/18 text-white/72 hover:border-ice hover:text-ice'
          }`}
          type="button"
          onClick={() => onToggleSelection(serviceItem)}
        >
          {serviceSelected ? <Check aria-hidden="true" size={18} /> : <Plus aria-hidden="true" size={18} />}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <div className="grid gap-4 border-t border-white/10 p-3 pt-4">
              <div className="flex flex-wrap gap-2">
                {service.deliverables.slice(0, 4).map((item) => (
                  <span className="border border-white/12 bg-white/[0.03] px-3 py-2 text-xs leading-none text-white/70" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              {service.offers?.length ? (
                <div className="grid gap-2">
                  {service.offers.map((offer) => (
                    <MobileOfferButton
                      key={offer.id}
                      offer={offer}
                      selected={selectedKeys.includes(offerKey(service, offer))}
                      service={service}
                      onToggleSelection={onToggleSelection}
                    />
                  ))}
                </div>
              ) : null}
              <div className="grid gap-2">
                {service.useCases.slice(0, 2).map((item) => (
                  <div className="border-l border-ice/38 pl-3" key={item.title}>
                    <p className="text-xs font-semibold uppercase text-white/78">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/54">{item.description}</p>
                  </div>
                ))}
              </div>
              <button
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 bg-white px-4 text-sm font-semibold text-black transition hover:bg-ice"
                type="button"
                onClick={() => onSelectAndContact(serviceItem)}
              >
                {service.cta}
                <ArrowUpRight aria-hidden="true" size={17} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

function MobileOfferButton({
  offer,
  selected,
  service,
  onToggleSelection
}: {
  offer: ServiceOffer;
  selected: boolean;
  service: ServicePackage;
  onToggleSelection: (item: InquiryItem) => void;
}) {
  const item = toOfferInquiryItem(service, offer);

  return (
    <button
      className={`focus-ring grid min-h-[4.25rem] grid-cols-[1fr_2.25rem] items-center gap-3 border p-3 text-left transition ${
        selected ? 'border-ice bg-ice/12' : 'border-white/12 bg-black/30 hover:border-ice/60'
      }`}
      type="button"
      onClick={() => onToggleSelection(item)}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-5 text-white">{offer.title}</span>
        <span className="mt-1 block text-xs font-semibold text-bronze">{offer.priceLabel}</span>
      </span>
      <span
        className={`grid h-9 w-9 place-items-center border ${
          selected ? 'border-ice bg-ice text-black' : 'border-white/14 text-white/70'
        }`}
        aria-hidden="true"
      >
        {selected ? <Check size={15} /> : <Plus size={15} />}
      </span>
    </button>
  );
}

function ServiceRow({
  index,
  isOpen,
  locale,
  onSelectAndContact,
  onToggle,
  onToggleSelection,
  selectedKeys,
  service
}: {
  index: number;
  isOpen: boolean;
  locale: Locale;
  onSelectAndContact: (item: InquiryItem) => void;
  onToggle: () => void;
  onToggleSelection: (item: InquiryItem) => void;
  selectedKeys: string[];
  service: ServicePackage;
}) {
  const serviceItem = toServiceInquiryItem(service);
  const serviceSelected = selectedKeys.includes(serviceItem.key);
  const branchLabel = branchLabels[locale][service.branch];
  const toggleLabel = serviceSelected
    ? locale === 'ru'
      ? 'В подборке'
      : 'Selected'
    : locale === 'ru'
      ? 'Добавить'
      : 'Add';

  return (
    <article className="border-t border-white/10">
      <button
        aria-expanded={isOpen}
        className="focus-ring group flex w-full items-center justify-between gap-5 py-6 text-left"
        type="button"
        onClick={onToggle}
      >
        <span className="text-xs uppercase text-bronze">{String(index + 1).padStart(2, '0')}</span>
        <span className="min-w-0 flex-1 font-display text-3xl font-black uppercase leading-none text-white transition group-hover:text-ice sm:text-4xl">
          {service.title}
        </span>
        <span className="grid h-10 w-10 shrink-0 place-items-center border border-white/16 text-white/70">
          {isOpen ? <Minus aria-hidden="true" size={18} /> : <Plus aria-hidden="true" size={18} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="grid gap-6 pb-7 lg:grid-cols-[0.86fr_1fr]">
              <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-black/40">
                <Image
                  alt={service.cardTitle}
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  src={service.media}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/12 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span className="max-w-[62%] text-[11px] font-semibold uppercase leading-4 text-white/70">
                    {branchLabel}
                  </span>
                  <span className="text-right text-xs font-semibold uppercase text-bronze">{service.priceLabel}</span>
                </div>
              </div>
              <div className="grid gap-5">
                <p className="text-base leading-7 text-white/70">{service.description}</p>
                <div>
                  <p className="mb-3 text-xs uppercase text-white/45">{service.idealFor}</p>
                  <ul className="grid gap-2 text-sm text-white/62 sm:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li className="flex items-center gap-2" key={item}>
                        <span className="h-px w-4 shrink-0 bg-ice" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-3">
                  {service.useCases.slice(0, 2).map((item) => (
                    <div className="border-l border-ice/40 pl-4" key={item.title}>
                      <p className="text-xs font-semibold uppercase text-white/70">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/52">{item.description}</p>
                    </div>
                  ))}
                </div>
                {service.offers?.length ? (
                  <div className="grid gap-2">
                    <p className="text-xs uppercase text-bronze">
                      {locale === 'ru' ? 'Готовые пакеты' : 'Ready packages'}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {service.offers.map((offer) => (
                        <OfferButton
                          key={offer.id}
                          locale={locale}
                          offer={offer}
                          selected={selectedKeys.includes(offerKey(service, offer))}
                          service={service}
                          onToggleSelection={onToggleSelection}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 border px-5 text-sm font-semibold uppercase transition ${
                      serviceSelected
                        ? 'border-ice bg-ice text-black'
                        : 'border-white/18 text-white hover:border-ice hover:text-ice'
                    }`}
                    type="button"
                    onClick={() => onToggleSelection(serviceItem)}
                  >
                    {serviceSelected ? <Check aria-hidden="true" size={17} /> : <Plus aria-hidden="true" size={17} />}
                    {toggleLabel}
                  </button>
                  <button
                    className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 bg-white px-5 text-sm font-semibold uppercase text-black transition hover:bg-ice"
                    type="button"
                    onClick={() => onSelectAndContact(serviceItem)}
                  >
                    {service.cta}
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

function OfferButton({
  locale,
  offer,
  selected,
  service,
  onToggleSelection
}: {
  locale: Locale;
  offer: ServiceOffer;
  selected: boolean;
  service: ServicePackage;
  onToggleSelection: (item: InquiryItem) => void;
}) {
  const item = toOfferInquiryItem(service, offer);

  return (
    <button
      className={`focus-ring flex min-h-[5rem] items-start justify-between gap-3 border p-3 text-left transition ${
        selected ? 'border-ice bg-ice/12' : 'border-white/10 bg-black/24 hover:border-ice/60'
      }`}
      type="button"
      onClick={() => onToggleSelection(item)}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold uppercase leading-5 text-white">{offer.title}</span>
        <span className="mt-1 block text-xs uppercase text-bronze">{offer.priceLabel}</span>
        <span className="mt-2 block text-xs leading-5 text-white/48">{offer.description}</span>
      </span>
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center border ${
          selected ? 'border-ice bg-ice text-black' : 'border-white/14 text-white/70'
        }`}
        aria-hidden="true"
      >
        {selected ? <Check size={15} /> : <Plus size={15} />}
      </span>
      <span className="sr-only">{selected ? (locale === 'ru' ? 'Убрать' : 'Remove') : (locale === 'ru' ? 'Добавить' : 'Add')}</span>
    </button>
  );
}

function Proof({ content }: { content: SiteContent }) {
  return (
    <section className="bg-[#050607]" id="proof">
      <div className="mx-auto grid max-w-6xl gap-9 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-120px' }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="break-words font-display text-5xl font-black uppercase leading-none sm:text-6xl">
            {content.proof.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-white/64">{content.proof.body}</p>
          <div className="mt-8 grid gap-3">
            {content.proof.points.map((point) => (
              <div className="flex items-center justify-between border-t border-white/10 py-3" key={point}>
                <span className="text-sm uppercase text-white/70">{point}</span>
                <ChevronDown aria-hidden="true" className="text-bronze" size={17} />
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]"
          initial={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          viewport={{ once: true, margin: '-120px' }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <div className="relative aspect-[5/4] overflow-hidden border border-white/10 lg:aspect-auto lg:min-h-[390px]">
            <Image
              alt="Concert crowd with blue stage lighting"
              className="object-cover object-top"
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              src="/media/crowd-stage.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="grid gap-3">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/10 lg:aspect-auto lg:min-h-[188px]">
              <Image
                alt="Tour team with instruments"
                className="object-cover object-top"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                src="/media/tour-team.jpg"
              />
            </div>
            <div className="border border-bronze/35 bg-bronze/8 p-5">
              <p className="font-display text-4xl font-black uppercase leading-none text-bronze">Live</p>
              <p className="mt-3 text-sm leading-6 text-white/58">
                {content.locale === 'ru'
                  ? 'опыт сцены, студии и запуска в одном проекте'
                  : 'stage, studio and launch experience in one project'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Drops({
  content,
  selectedKeys,
  onSelectAndContact,
  onToggleSelection
}: {
  content: SiteContent;
  selectedKeys: string[];
  onSelectAndContact: (item: InquiryItem) => void;
  onToggleSelection: (item: InquiryItem) => void;
}) {
  const drop = content.drops[0];
  const dropItem = toDropInquiryItem(drop);
  const dropSelected = selectedKeys.includes(dropItem.key);

  return (
    <section className="scroll-mt-24 overflow-hidden bg-ink-soft" id="drops">
      <div className="mx-auto max-w-md px-4 py-10 lg:hidden">
        <h2 className="break-words text-3xl font-black leading-tight text-white">{content.dropsIntro.title}</h2>
        <p className="mt-3 text-sm leading-6 text-white/62">{content.dropsIntro.body}</p>
        <div className="mt-6 overflow-hidden border border-white/12 bg-black/34">
          <div className="relative aspect-[4/3] bg-white">
            <Image
              alt={drop.title}
              className="object-contain"
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              src={drop.media}
            />
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase text-bronze">{drop.type}</p>
                <h3 className="mt-2 break-words text-3xl font-black uppercase leading-none text-white">{drop.title}</h3>
              </div>
              <span className="shrink-0 border border-white/14 px-3 py-2 text-xs uppercase text-white/58">
                {drop.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/56">{drop.availabilityLabel}</p>
            <button
              className={`focus-ring mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 px-5 text-sm font-semibold transition ${
                dropSelected ? 'bg-ice text-black' : 'bg-white text-black hover:bg-ice'
              }`}
              type="button"
              onClick={() => onToggleSelection(dropItem)}
            >
              {dropSelected ? <Check aria-hidden="true" size={18} /> : <ShoppingBag aria-hidden="true" size={18} />}
              {dropSelected ? (content.locale === 'ru' ? 'В подборке' : 'Selected') : drop.cta}
            </button>
            <button
              className="focus-ring mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-white/18 px-5 text-sm font-semibold text-white transition hover:border-ice hover:text-ice"
              type="button"
              onClick={() => onSelectAndContact(dropItem)}
            >
              {content.locale === 'ru' ? 'Перейти к заявке' : 'Go to inquiry'}
              <ArrowUpRight aria-hidden="true" size={17} />
            </button>
          </div>
        </div>
      </div>
      <motion.div
        className="mx-auto hidden max-w-6xl gap-8 px-8 py-24 lg:grid lg:grid-cols-[1fr_0.86fr]"
        initial={{ opacity: 0, y: 26 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true, margin: '-120px' }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="break-words font-display text-5xl font-black uppercase leading-none sm:text-6xl">
            {content.dropsIntro.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/62">{content.dropsIntro.body}</p>
        </div>
        <div className="border border-white/10 bg-black/28">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-white">
            <Image
              alt={drop.title}
              className="object-contain"
              fill
              sizes="(max-width: 768px) 100vw, 44vw"
              src={drop.media}
            />
          </div>
          <div className="p-5 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase text-bronze">{drop.type}</p>
                <h3 className="mt-2 break-words font-display text-4xl font-black uppercase leading-none">{drop.title}</h3>
              </div>
              <span className="shrink-0 border border-white/14 px-3 py-2 text-xs uppercase text-white/60">
                {drop.status}
              </span>
            </div>
            <p className="text-sm uppercase text-white/50">{drop.availabilityLabel}</p>
            <button
              className={`focus-ring mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 px-5 text-sm font-semibold uppercase transition ${
                dropSelected ? 'bg-ice text-black' : 'bg-white text-black hover:bg-ice'
              }`}
              type="button"
              onClick={() => onToggleSelection(dropItem)}
            >
              {dropSelected ? <Check aria-hidden="true" size={18} /> : <ShoppingBag aria-hidden="true" size={18} />}
              {dropSelected ? (content.locale === 'ru' ? 'В подборке' : 'Selected') : drop.cta}
            </button>
            <button
              className="focus-ring mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-white/18 px-5 text-sm font-semibold uppercase text-white transition hover:border-ice hover:text-ice"
              type="button"
              onClick={() => onSelectAndContact(dropItem)}
            >
              {content.locale === 'ru' ? 'Перейти к заявке' : 'Go to inquiry'}
              <ArrowUpRight aria-hidden="true" size={17} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Contact({
  content,
  initialQueryString,
  onToggleSelection,
  roistatVisit,
  selectedOfferings
}: {
  content: SiteContent;
  initialQueryString: string;
  onToggleSelection: (item: InquiryItem) => void;
  roistatVisit: string;
  selectedOfferings: InquiryItem[];
}) {
  const fallbackSourceUrl = `https://polstan.ru/${content.locale}${initialQueryString}`;
  const [form, setForm] = useState<FormState>({
    name: '',
    contact: '',
    budgetRange: content.contact.options.budget[0],
    timeline: content.contact.options.timeline[0],
    message: ''
  });
  const [sourceUrl, setSourceUrl] = useState(fallbackSourceUrl);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSourceUrl(window.location.href);
  }, []);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function buildIntent(): LeadIntent {
    const selectedOffering = selectedOfferings.map((item) => item.title).join(', ');

    return {
      locale: content.locale,
      source: sourceUrl,
      selectedOffering,
      selectedOfferings: selectedOfferings.map((item) => ({
        title: item.title,
        priceLabel: item.priceLabel
      })),
      roistatVisit,
      ...form
    };
  }

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = buildTelegramMessage(buildIntent());
    const link = buildTelegramLink(getTelegramUsername(), message);
    setSubmitted(true);
    window.open(link, '_blank', 'noopener,noreferrer');
  }

  const quickTelegramMessage = buildTelegramMessage(buildIntent());
  const emptySelection = selectedOfferings.length === 0;

  return (
    <section
      className="scroll-mt-24 border-t border-white/10 bg-ink px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-10 sm:px-6 lg:px-8 lg:py-24"
      id="contact"
    >
      <div className="mx-auto max-w-md lg:hidden">
        <div className="min-w-0">
          <h2 className="text-3xl font-black leading-tight text-white">{content.contact.title}</h2>
          <p className="mt-3 text-sm leading-6 text-white/64">{content.contact.body}</p>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={submitInquiry}>
          <div className="border border-white/12 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase text-white/48">{content.contact.fields.selectedOffering}</span>
              <span className="text-xs font-semibold text-bronze">
                {selectedOfferings.length} {content.locale === 'ru' ? 'позиция' : 'item'}
              </span>
            </div>
            <div className="mt-3 grid gap-2">
              {selectedOfferings.map((item) => (
                <div
                  className="grid min-h-[4.25rem] grid-cols-[3.5rem_1fr_2.5rem] items-center gap-3 border border-white/10 bg-black/24 p-2"
                  key={item.key}
                >
                  <div className="relative h-12 overflow-hidden border border-white/8 bg-black">
                    <Image alt="" className="object-cover" fill sizes="56px" src={getInquiryMedia(content, item)} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold leading-5 text-white">{item.title}</p>
                    <p className="mt-1 text-xs font-semibold text-bronze">{item.priceLabel}</p>
                  </div>
                  <button
                    aria-label={content.locale === 'ru' ? 'Убрать из подборки' : 'Remove from selection'}
                    className="focus-ring grid h-10 w-10 place-items-center border border-white/14 text-white/70 transition hover:border-ice hover:text-ice"
                    type="button"
                    onClick={() => onToggleSelection(item)}
                  >
                    <Minus aria-hidden="true" size={15} />
                  </button>
                </div>
              ))}
              {emptySelection ? (
                <p className="border border-white/10 bg-black/24 px-3 py-4 text-sm leading-6 text-white/52">
                  {content.locale === 'ru'
                    ? 'Добавьте хотя бы одну услугу или дроп выше, чтобы собрать заявку.'
                    : 'Add at least one service or drop above to build an inquiry.'}
                </p>
              ) : null}
            </div>
            <a className="focus-ring mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ice" href="#services">
              <Plus aria-hidden="true" size={18} />
              {content.locale === 'ru' ? 'Добавить ещё' : 'Add more'}
            </a>
          </div>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase text-white/48">{content.contact.fields.name}</span>
            <input
              className="input-control"
              placeholder={content.contact.placeholders.name}
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase text-white/48">{content.contact.fields.contact}</span>
            <input
              className="input-control"
              placeholder={content.contact.placeholders.contact}
              required
              value={form.contact}
              onChange={(event) => updateField('contact', event.target.value)}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase text-white/48">{content.contact.fields.budgetRange}</span>
            <select
              className="input-control"
              value={form.budgetRange}
              onChange={(event) => updateField('budgetRange', event.target.value)}
            >
              {content.contact.options.budget.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase text-white/48">{content.contact.fields.timeline}</span>
            <select
              className="input-control"
              value={form.timeline}
              onChange={(event) => updateField('timeline', event.target.value)}
            >
              {content.contact.options.timeline.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase text-white/48">{content.contact.fields.message}</span>
            <textarea
              className="input-control min-h-28 resize-y"
              placeholder={content.contact.placeholders.message}
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
            />
          </label>
          <button
            className="focus-ring inline-flex min-h-[3.25rem] items-center justify-center gap-3 border border-ice/70 bg-black/38 px-6 text-sm font-semibold text-ice shadow-glow transition hover:bg-ice hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
            disabled={emptySelection}
            type="submit"
          >
            <Send aria-hidden="true" size={18} />
            {content.contact.telegramCta}
          </button>
          <p className="flex items-center gap-2 text-xs leading-5 text-white/42">
            <span aria-hidden="true">□</span>
            {content.locale === 'ru' ? 'Мы не передаём ваши данные третьим лицам.' : 'Your details stay inside this inquiry flow.'}
          </p>
          {submitted ? <p className="text-sm text-ice">{content.contact.success}</p> : null}
        </form>
      </div>
      <div className="mx-auto hidden max-w-6xl gap-9 xl:grid-cols-[0.85fr_1.15fr] lg:grid">
        <div className="min-w-0">
          <h2 className="font-display text-4xl font-black uppercase leading-[0.96] text-white sm:text-5xl xl:text-6xl">
            {content.contact.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/64">{content.contact.body}</p>
          <a
            className="focus-ring mt-8 inline-flex min-h-12 items-center gap-3 border border-ice/40 px-5 text-sm font-semibold uppercase text-ice transition hover:bg-ice hover:text-black"
            href={buildTelegramLink(getTelegramUsername(), quickTelegramMessage)}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle aria-hidden="true" size={18} />
            {content.contact.telegramCta}
          </a>
        </div>
        <form className="grid min-w-0 gap-4 border border-white/10 bg-white/[0.035] p-4 sm:p-6" onSubmit={submitInquiry}>
          <div className="grid gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs uppercase text-white/46">{content.contact.fields.selectedOffering}</span>
              <span className="text-xs uppercase text-bronze">
                {selectedOfferings.length} {content.locale === 'ru' ? 'поз.' : 'items'}
              </span>
            </div>
            <div className="grid gap-2">
              {selectedOfferings.map((item) => (
                <div
                  className="flex min-h-12 items-center justify-between gap-3 border border-white/10 bg-black/24 px-3 py-2"
                  key={item.key}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold uppercase text-white">{item.title}</p>
                    <p className="mt-1 text-xs uppercase text-white/45">{item.priceLabel}</p>
                  </div>
                  <button
                    aria-label={content.locale === 'ru' ? 'Убрать из подборки' : 'Remove from selection'}
                    className="focus-ring grid h-9 w-9 shrink-0 place-items-center border border-white/14 text-white/70 transition hover:border-ice hover:text-ice"
                    type="button"
                    onClick={() => onToggleSelection(item)}
                  >
                    <Minus aria-hidden="true" size={15} />
                  </button>
                </div>
              ))}
              {emptySelection ? (
                <p className="border border-white/10 bg-black/24 px-3 py-4 text-sm leading-6 text-white/52">
                  {content.locale === 'ru'
                    ? 'Добавьте хотя бы одну услугу или дроп выше, чтобы собрать заявку.'
                    : 'Add at least one service or drop above to build an inquiry.'}
                </p>
              ) : null}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs uppercase text-white/46">{content.contact.fields.name}</span>
              <input
                className="input-control"
                placeholder={content.contact.placeholders.name}
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs uppercase text-white/46">{content.contact.fields.contact}</span>
              <input
                className="input-control"
                placeholder={content.contact.placeholders.contact}
                required
                value={form.contact}
                onChange={(event) => updateField('contact', event.target.value)}
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs uppercase text-white/46">{content.contact.fields.budgetRange}</span>
              <select
                className="input-control"
                value={form.budgetRange}
                onChange={(event) => updateField('budgetRange', event.target.value)}
              >
                {content.contact.options.budget.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-xs uppercase text-white/46">{content.contact.fields.timeline}</span>
              <select
                className="input-control"
                value={form.timeline}
                onChange={(event) => updateField('timeline', event.target.value)}
              >
                {content.contact.options.timeline.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="grid gap-2">
            <span className="text-xs uppercase text-white/46">{content.contact.fields.message}</span>
            <textarea
              className="input-control min-h-32 resize-y"
              placeholder={content.contact.placeholders.message}
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
            />
          </label>
          <button
            className="focus-ring inline-flex min-h-[3.25rem] items-center justify-center gap-3 bg-white px-6 text-sm font-semibold uppercase text-black transition hover:bg-ice disabled:cursor-not-allowed disabled:opacity-40"
            disabled={emptySelection}
            type="submit"
          >
            <Send aria-hidden="true" size={18} />
            {content.contact.submitCta}
          </button>
          {submitted ? <p className="text-sm text-ice">{content.contact.success}</p> : null}
        </form>
      </div>
    </section>
  );
}

function MobileSelectionTray({
  content,
  selectedOfferings,
  hidden,
  onContact
}: {
  content: SiteContent;
  selectedOfferings: InquiryItem[];
  hidden: boolean;
  onContact: () => void;
}) {
  if (!selectedOfferings.length || hidden) return null;

  const first = selectedOfferings[0];

  return (
    <button
      className="focus-ring fixed inset-x-4 bottom-[calc(5.15rem+env(safe-area-inset-bottom))] z-40 mx-auto grid min-h-[5.15rem] max-w-md grid-cols-[1fr_auto] items-center gap-4 border border-ice/35 bg-black/88 p-3 text-left shadow-glow backdrop-blur-md transition hover:border-ice lg:hidden"
      type="button"
      onClick={onContact}
    >
      <span className="min-w-0">
        <span className="block text-xs text-white/70">
          {content.mobileNav.selection}: {selectedOfferings.length}
        </span>
        <span className="mt-1 block truncate text-sm font-semibold text-white">{first.title}</span>
        <span className="mt-1 block text-xs font-semibold text-bronze">{first.priceLabel}</span>
      </span>
      <span className="inline-flex min-h-11 shrink-0 items-center gap-2 bg-ice px-4 text-sm font-semibold text-black">
        {content.locale === 'ru' ? 'Заявка' : 'Inquiry'}
        <ArrowUpRight aria-hidden="true" size={16} />
      </span>
    </button>
  );
}

function BottomNav({ activeSection, content }: { activeSection: MobileSection; content: SiteContent }) {
  const items: Array<{ href: string; section: MobileSection; label: string; icon: typeof Home }> = [
    { href: '#home', section: 'home', label: content.mobileNav.home, icon: Home },
    { href: '#services', section: 'services', label: content.mobileNav.services, icon: BriefcaseBusiness },
    { href: '#drops', section: 'drops', label: content.mobileNav.drops, icon: ShoppingBag },
    { href: '#contact', section: 'contact', label: content.mobileNav.contact, icon: MessageCircle }
  ];

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 mx-auto grid max-w-md grid-cols-4 border border-white/12 bg-black/82 p-1 shadow-glow backdrop-blur-xl lg:hidden"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.section === activeSection;

        return (
          <a
            aria-current={active ? 'page' : undefined}
            className={`focus-ring flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold transition ${
              active ? 'text-ice' : 'text-white/58 hover:bg-white/8 hover:text-white'
            }`}
            href={item.href}
            key={item.href}
          >
            <Icon aria-hidden="true" size={18} />
            <span className="max-w-full truncate">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function serviceMatchesFilter(service: ServicePackage, filter: ServiceFilter) {
  if (filter === 'all') return true;
  if (filter === 'music') return service.id === 'music' || service.id === 'creative-production';
  if (filter === 'sound') return service.id === 'sound-design';
  if (filter === 'video') return service.id === 'ai-video' || service.id === 'ecom-animation';
  return service.branch === 'real-vibe' || service.id.includes('ai');
}

function getInquiryMedia(content: SiteContent, item: InquiryItem) {
  if (item.source === 'drop') {
    const dropId = item.key.replace('drop:', '');
    return content.drops.find((drop) => drop.id === dropId)?.media ?? '/media/crowd-stage.jpg';
  }

  const serviceId = item.key.split(':')[1];
  return content.services.find((service) => service.id === serviceId)?.media ?? '/media/crowd-stage.jpg';
}

const branchLabels: Record<Locale, Record<ServicePackage['branch'], string>> = {
  ru: {
    polstan: 'Music / creative',
    'real-vibe': 'Digital / AI',
    shared: 'Production'
  },
  en: {
    polstan: 'Music / creative',
    'real-vibe': 'Digital / AI',
    shared: 'Production'
  }
};

function serviceKey(service: ServicePackage) {
  return `service:${service.id}`;
}

function offerKey(service: ServicePackage, offer: ServiceOffer) {
  return `offer:${service.id}:${offer.id}`;
}

function dropKey(drop: DropProduct) {
  return `drop:${drop.id}`;
}

function toServiceInquiryItem(service: ServicePackage): InquiryItem {
  return {
    key: serviceKey(service),
    title: service.title,
    priceLabel: service.priceLabel,
    source: 'service'
  };
}

function toOfferInquiryItem(service: ServicePackage, offer: ServiceOffer): InquiryItem {
  return {
    key: offerKey(service, offer),
    title: `${service.title}: ${offer.title}`,
    priceLabel: offer.priceLabel,
    source: 'offer'
  };
}

function toDropInquiryItem(drop: DropProduct): InquiryItem {
  return {
    key: dropKey(drop),
    title: drop.title,
    priceLabel: drop.availabilityLabel,
    source: 'drop'
  };
}

function buildCatalogItems(content: SiteContent) {
  const items = new Map<string, InquiryItem>();

  content.services.forEach((service) => {
    const serviceItem = toServiceInquiryItem(service);
    items.set(serviceItem.key, serviceItem);

    service.offers?.forEach((offer) => {
      const offerItem = toOfferInquiryItem(service, offer);
      items.set(offerItem.key, offerItem);
    });
  });

  content.drops.forEach((drop) => {
    const dropItem = toDropInquiryItem(drop);
    items.set(dropItem.key, dropItem);
  });

  return items;
}

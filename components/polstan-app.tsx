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
  Sparkles
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useEffect, useMemo, useState } from 'react';
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

export function PolstanApp({ content, initialQueryString, initialRoistatVisit }: PolstanAppProps) {
  const initialSelection = content.services[0] ? [serviceKey(content.services[0])] : [];
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
        onToggleSelection={toggleSelection}
        roistatVisit={roistatVisit}
        selectedOfferings={selectedOfferings}
      />
      <InquiryDock content={content} count={selectedOfferings.length} onContact={() => scrollToId('contact')} />
      <BottomNav content={content} />
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
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/12 bg-ink/45 px-1 pb-3 backdrop-blur-md">
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
  return (
    <section
      className="relative isolate min-h-[72svh] overflow-hidden bg-ink pb-20 pt-20 sm:min-h-[80svh] lg:min-h-[64svh]"
      id="home"
    >
      <div className="absolute inset-0">
        <video
          aria-label="Concert footage"
          autoPlay
          className="h-full w-full object-cover"
          loop
          muted
          playsInline
          poster="/media/crowd-stage.jpg"
          preload="metadata"
        >
          <source src="/media/hero-concert.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-vignette absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/24 to-ink" />
      <div className="relative z-10 mx-auto flex min-h-[calc(72svh-5rem)] max-w-6xl flex-col justify-end px-4 pb-8 sm:min-h-[calc(80svh-5rem)] sm:px-6 lg:min-h-[calc(64svh-5rem)] lg:px-8">
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

  return (
    <section className="section-shell border-t border-white/10 bg-ink" id="services">
      <motion.div
        className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
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
                      {locale === 'ru' ? 'Быстрые офферы' : 'Fast offers'}
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
              <p className="mt-3 text-sm leading-6 text-white/58">stage-tested work, direct production contact</p>
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
    <section className="bg-ink-soft" id="drops">
      <motion.div
        className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.86fr] lg:px-8 lg:py-24"
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
  onToggleSelection,
  roistatVisit,
  selectedOfferings
}: {
  content: SiteContent;
  onToggleSelection: (item: InquiryItem) => void;
  roistatVisit: string;
  selectedOfferings: InquiryItem[];
}) {
  const [form, setForm] = useState<FormState>({
    name: '',
    contact: '',
    budgetRange: content.contact.options.budget[0],
    timeline: content.contact.options.timeline[0],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function buildIntent(sourceOverride?: string): LeadIntent {
    const selectedOffering = selectedOfferings.map((item) => item.title).join(', ');

    return {
      locale: content.locale,
      source: sourceOverride ?? (typeof window === 'undefined' ? `https://polstan.ru/${content.locale}` : window.location.href),
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

  const quickTelegramMessage = buildTelegramMessage(buildIntent(`https://polstan.ru/${content.locale}`));
  const emptySelection = selectedOfferings.length === 0;

  return (
    <section className="border-t border-white/10 bg-ink px-4 py-16 sm:px-6 lg:px-8 lg:py-24" id="contact">
      <div className="mx-auto grid max-w-6xl gap-9 xl:grid-cols-[0.85fr_1.15fr]">
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
                    ? 'Выберите хотя бы одну услугу выше, чтобы собрать заявку.'
                    : 'Choose at least one service above to build an inquiry.'}
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
          {roistatVisit ? <p className="text-xs uppercase text-white/40">Roistat: {roistatVisit}</p> : null}
        </form>
      </div>
    </section>
  );
}

function InquiryDock({ content, count, onContact }: { content: SiteContent; count: number; onContact: () => void }) {
  if (count === 0) return null;

  return (
    <button
      className="focus-ring fixed inset-x-4 bottom-[5.15rem] z-40 mx-auto flex min-h-12 max-w-md items-center justify-between gap-4 border border-ice/35 bg-black/86 px-4 text-left shadow-glow backdrop-blur-md transition hover:border-ice lg:hidden"
      type="button"
      onClick={onContact}
    >
      <span className="flex min-w-0 items-center gap-3">
        <ShoppingBag aria-hidden="true" className="shrink-0 text-ice" size={18} />
        <span className="truncate text-xs font-semibold uppercase text-white/78">
          {content.locale === 'ru' ? 'Подборка' : 'Selection'}: {count}
        </span>
      </span>
      <span className="shrink-0 text-xs font-semibold uppercase text-bronze">
        {content.locale === 'ru' ? 'Заявка' : 'Inquiry'}
      </span>
    </button>
  );
}

function BottomNav({ content }: { content: SiteContent }) {
  const items = [
    { href: '#home', label: content.nav.home, icon: Home },
    { href: '#services', label: content.nav.services, icon: BriefcaseBusiness },
    { href: '#drops', label: content.nav.drops, icon: ShoppingBag },
    { href: '#contact', label: content.nav.contact, icon: MessageCircle }
  ];

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto grid max-w-md grid-cols-4 border border-white/12 bg-black/76 p-1 shadow-glow backdrop-blur-xl sm:bottom-5 lg:hidden"
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <a
            className="focus-ring flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold uppercase text-white/58 transition hover:bg-white/8 hover:text-white"
            href={item.href}
            key={item.href}
          >
            <Icon aria-hidden="true" size={17} />
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

const branchLabels: Record<Locale, Record<ServicePackage['branch'], string>> = {
  ru: {
    polstan: 'PolStan branch',
    'real-vibe': 'Real Vibe stack',
    shared: 'Shared production'
  },
  en: {
    polstan: 'PolStan branch',
    'real-vibe': 'Real Vibe stack',
    shared: 'Shared production'
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

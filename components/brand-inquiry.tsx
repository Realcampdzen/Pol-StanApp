'use client';

import { ArrowUpRight, Check, Plus, Send, X } from 'lucide-react';
import { useEffect, useId, useMemo, useState, type FormEvent } from 'react';
import type { SiteContent } from '@/lib/types';
import type { BrandContent } from '@/lib/brand-content';
import { ROISTAT_STORAGE_KEY } from '@/lib/roistat';
import { buildTelegramLink, buildTelegramMessage, getTelegramUsername } from '@/lib/telegram';

type Offering = { key: string; title: string; priceLabel?: string };

export function BrandInquiry({ site, copy, initialQueryString, initialRoistatVisit }: {
  site: SiteContent; copy: BrandContent['contact']; initialQueryString: string; initialRoistatVisit: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [visit, setVisit] = useState(initialRoistatVisit);
  const [preparedUrl, setPreparedUrl] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [contactError, setContactError] = useState(false);
  const contactErrorId = useId();
  const catalog = useMemo(() => {
    const offerings: Offering[] = [];
    site.services.forEach((service) => {
      offerings.push({ key: `service:${service.id}`, title: service.title, priceLabel: service.priceLabel });
      service.offers?.forEach((offer) => offerings.push({ key: `offer:${service.id}:${offer.id}`, title: `${service.title} / ${offer.title}`, priceLabel: offer.priceLabel }));
    });
    site.drops.forEach((drop) => offerings.push({ key: `drop:${drop.id}`, title: drop.title }));
    return new Map(offerings.map((item) => [item.key, item]));
  }, [site]);
  const selectedItems = selected.map((key) => catalog.get(key)).filter((item): item is Offering => Boolean(item));

  useEffect(() => {
    setHydrated(true);
    try {
      if (initialRoistatVisit) window.localStorage.setItem(ROISTAT_STORAGE_KEY, initialRoistatVisit);
      else setVisit(window.localStorage.getItem(ROISTAT_STORAGE_KEY) || '');
    } catch { /* Attribution storage is optional; the form remains usable. */ }
  }, [initialRoistatVisit]);

  const toggle = (key: string) => {
    setSelected((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
    setPreparedUrl('');
  };
  const selectionButton = (key: string) => (
    <button type="button" className={`catalog-select ${selected.includes(key) ? 'is-selected' : ''}`} aria-label={`${selected.includes(key) ? copy.remove : copy.add}: ${catalog.get(key)?.title || copy.general}`} aria-pressed={selected.includes(key)} onClick={() => toggle(key)}>
      {selected.includes(key) ? <Check size={16} /> : <Plus size={16} />}{selected.includes(key) ? copy.remove : copy.add}
    </button>
  );

  const prepare = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contactField = event.currentTarget.elements.namedItem('contact') as HTMLInputElement;
    if (!contactField.checkValidity()) {
      setContactError(true);
      setPreparedUrl('');
      contactField.focus();
      return;
    }
    setContactError(false);
    const data = new FormData(event.currentTarget);
    const message = buildTelegramMessage({
      locale: site.locale,
      source: `polstan.ru/${site.locale}${initialQueryString}#contact`,
      selectedOffering: selectedItems.map((item) => item.title).join(', ') || copy.general,
      selectedOfferings: selectedItems.map(({ title, priceLabel }) => ({ title, priceLabel })),
      name: String(data.get('name') || '').trim(), contact: String(data.get('contact') || '').trim(),
      message: String(data.get('message') || '').trim(), budgetRange: String(data.get('budget') || ''), timeline: String(data.get('timeline') || ''), roistatVisit: visit
    });
    setPreparedUrl(buildTelegramLink(getTelegramUsername(), message));
  };

  return (
    <section id="contact" className="brand-contact brand-section" aria-labelledby="contact-title">
      <div className="contact-heading" data-reveal><p className="brand-eyebrow">{copy.eyebrow}</p><h2 id="contact-title" className="brand-title">{copy.title.split("\n").map((line, index) => <span className="title-phrase" key={index}>{line}</span>)}</h2><p className="brand-body">{copy.text}</p>
        <a className="brand-text-link" href={`https://t.me/${getTelegramUsername().replace(/^@/, '')}`} target="_blank" rel="noreferrer">{copy.direct}<ArrowUpRight size={17} /></a>
      </div>
      <div className="contact-workspace">
        <details className="collaboration-catalog" id="services">
          <summary><span>{copy.formats}</span><Plus size={20} /></summary>
          <div className="catalog-content"><p>{copy.catalogIntro}</p>
            {site.services.map((service) => <details className="catalog-service" key={service.id}>
              <summary><span>{service.cardTitle}</span><span>{service.priceLabel}</span><Plus size={16} /></summary>
              <div className="catalog-service-body"><p>{service.description}</p><ul>{service.deliverables.map((line) => <li key={line}>{line}</li>)}</ul>{selectionButton(`service:${service.id}`)}
                {service.offers?.map((offer) => <div className="catalog-offer" key={offer.id}><h4>{offer.title}</h4><p>{offer.description}</p><span>{offer.priceLabel}</span>{selectionButton(`offer:${service.id}:${offer.id}`)}</div>)}
              </div>
            </details>)}
            {site.drops.length > 0 && <div id="drops" className="catalog-drops"><p className="brand-eyebrow">{copy.drop}</p>{site.drops.map((drop) => <div className="catalog-drop" key={drop.id}><div><h4>{drop.title}</h4><p>{drop.type} · {drop.availabilityLabel}</p></div>{selectionButton(`drop:${drop.id}`)}</div>)}</div>}
          </div>
        </details>
        <div className="inquiry-selection" aria-live="polite"><p className="brand-eyebrow">{copy.selected}</p>{selectedItems.length ? <ul>{selectedItems.map((item) => <li key={item.key}><span>{item.title}<small>{item.priceLabel}</small></span><button type="button" onClick={() => toggle(item.key)} aria-label={`${copy.remove}: ${item.title}`}><X size={16} /></button></li>)}</ul> : <p>{copy.empty}</p>}</div>
        <form className="brand-form" noValidate onSubmit={prepare} onChange={() => setPreparedUrl('')}>
          <fieldset className="brand-form-fields" disabled={!hydrated}>
          <div className="form-pair"><label>{copy.name}<input name="name" autoComplete="name" maxLength={150} placeholder={copy.optional} /></label><div className="contact-field"><label>{copy.contact}<span className="required-marker" aria-hidden="true"> *</span><input name="contact" autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false} required pattern=".*\S.*" maxLength={200} placeholder={copy.contactPlaceholder} aria-required="true" aria-invalid={contactError || undefined} aria-describedby={contactError ? contactErrorId : undefined} onChange={(event) => { if (contactError && event.currentTarget.validity.valid) setContactError(false); }} /></label>{contactError && <p className="form-field-error" id={contactErrorId} role="alert">{copy.contactError}</p>}</div></div>
          <label>{copy.message}<textarea name="message" rows={3} maxLength={2500} placeholder={copy.messagePlaceholder} /></label>
          <div className="form-pair"><label>{copy.budget}<select name="budget" defaultValue=""><option value="">{copy.optional}</option>{site.contact.options.budget.map((option) => <option key={option}>{option}</option>)}</select></label><label>{copy.timeline}<select name="timeline" defaultValue=""><option value="">{copy.optional}</option>{site.contact.options.timeline.map((option) => <option key={option}>{option}</option>)}</select></label></div>
          <button className="brand-button" type="submit">{copy.submit}<Send size={16} /></button>
          <p className="form-privacy">{copy.privacy}</p>
          </fieldset>
          {preparedUrl && <div className="inquiry-ready" role="status"><p>{copy.ready}</p><a className="brand-button" href={preparedUrl} target="_blank" rel="noreferrer">{copy.open}<ArrowUpRight size={17} /></a></div>}
        </form>
        <noscript><p>{copy.noJs} <a href="https://t.me/polstan">Telegram ↗</a></p></noscript>
      </div>
    </section>
  );
}

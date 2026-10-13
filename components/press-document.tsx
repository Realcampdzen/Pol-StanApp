'use client';

import Image from 'next/image';
import { ArrowUpRight, Maximize2, Minimize2, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Locale } from '@/lib/types';

type PressDocumentProps = {
  locale: Locale;
  src: string;
  alt: string;
  title: string;
  label: string;
  width: number;
  height: number;
  sizes: string;
  className: string;
  source: { href: string; label: string };
};

export function PressDocument({ locale, src, alt, title, label, width, height, sizes, className, source }: PressDocumentProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const text = locale === 'ru'
    ? { close: 'Закрыть документ', zoom: 'Масштаб 1:1', fit: 'По размеру экрана', original: 'Оригинал изображения' }
    : { close: 'Close document', zoom: 'Actual size', fit: 'Fit to screen', original: 'Original image' };

  useEffect(() => { setHydrated(true); }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const close = () => dialog.current?.close();

  return (
    <>
      <a ref={trigger} href={src} target="_blank" rel="noreferrer" className={`${className} press-document-trigger`} aria-haspopup="dialog" aria-label={`${label}: ${title}`}
        onClick={(event) => {
          if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          dialog.current?.showModal();
          setOpen(true);
        }}>
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} unoptimized />
        <span className="press-document-action">{label}<Maximize2 size={14} /></span>
      </a>
      {hydrated && createPortal(<dialog ref={dialog} className={`document-viewer${zoomed ? ' is-zoomed' : ''}`} aria-labelledby={titleId}
        onKeyDown={(event) => {
          if (event.key !== 'Tab' || event.ctrlKey || event.metaKey || event.altKey) return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')).filter((element) => element.getClientRects().length > 0);
          const first = controls[0];
          const last = controls.at(-1);
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}
        onClose={() => { setOpen(false); setZoomed(false); trigger.current?.focus({ preventScroll: true }); }}>
        <div className="document-viewer-header"><h2 id={titleId}>{title}</h2><button type="button" className="document-viewer-close" onClick={close} aria-label={text.close} autoFocus><X size={23} /></button></div>
        <div className="document-viewer-toolbar"><button type="button" className="brand-text-link" aria-pressed={zoomed} onClick={() => setZoomed((value) => !value)}>{zoomed ? <Minimize2 size={15} /> : <Maximize2 size={15} />}{zoomed ? text.fit : text.zoom}</button></div>
        <div className="document-viewer-stage"><Image className="document-viewer-image" src={src} alt={alt} width={width} height={height} sizes="100vw" unoptimized /></div>
        <div className="document-viewer-footer"><a href={source.href} className="brand-text-link" target="_blank" rel="noreferrer">{source.label}<ArrowUpRight size={15} /></a><a href={src} className="brand-text-link" target="_blank" rel="noreferrer">{text.original}<ArrowUpRight size={15} /></a></div>
      </dialog>, document.body)}
    </>
  );
}

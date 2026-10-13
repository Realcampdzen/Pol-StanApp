'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

type Reveal = { element: HTMLElement; animation: gsap.core.Animation };
type MediaEvent = 'matchMediaInit' | 'matchMedia';
// GSAP 3.15 exposes these lifecycle events in gsap-core; its bundled type
// declarations omit the event methods. Keep that narrow contract explicit.
const mediaEvents = gsap as typeof gsap & {
  addEventListener(event: MediaEvent, callback: () => void): void;
  removeEventListener(event: MediaEvent, callback: () => void): void;
};

export function BrandMotion({ scope }: { scope: RefObject<HTMLDivElement | null> }) {
  const introduced = useRef(false);

  useEffect(() => {
    // Passive effects run after the parent has committed its DOM ref.
    const root = scope.current;
    if (!root) return;
    const press = root.querySelector<HTMLElement>('.brand-press')!;
    const stage = root.querySelector<HTMLElement>('.press-stage')!;
    const track = root.querySelector<HTMLElement>('.press-track')!;
    const media = gsap.matchMedia();
    const conditions = { all: 'all', desktop: '(min-width: 1024px) and (min-height: 700px)', reduce: '(prefers-reduced-motion: reduce)' };
    let disposed = false;
    let resizeTimer = 0;
    let mediaFocus: HTMLElement | null = null;
    let lastPressFocus: HTMLElement | null = null;
    let mediaTransition = false;

    const trackPressFocus = (event: FocusEvent) => {
      lastPressFocus = event.target instanceof HTMLElement && stage.contains(event.target) ? event.target : null;
    };
    const forgetPressPointerFocus = (event: PointerEvent) => {
      if (!(event.target instanceof Node) || !stage.contains(event.target)) lastPressFocus = null;
    };
    const trackPressBlur = () => {
      // Reparenting can blur a pin before GSAP emits matchMediaInit. Let that
      // synchronous lifecycle finish, while clearing ordinary deliberate blur.
      const previous = lastPressFocus;
      queueMicrotask(() => {
        if (!mediaTransition && lastPressFocus === previous && document.activeElement === document.body) lastPressFocus = null;
      });
    };
    root.addEventListener('focusin', trackPressFocus, true);
    root.addEventListener('focusout', trackPressBlur, true);
    document.addEventListener('pointerdown', forgetPressPointerFocus, true);

    const rememberMediaFocus = () => {
      const active = document.activeElement;
      mediaTransition = true;
      // ScrollTrigger's earlier matchMediaInit listener may already have swapped
      // the pin out. The last real focusin survives that DOM reparenting.
      mediaFocus = active instanceof HTMLElement && stage.contains(active) ? active : active === document.body ? lastPressFocus : null;
    };
    const restoreMediaFocus = () => {
      if (mediaFocus?.isConnected && (document.activeElement === document.body || document.activeElement === mediaFocus)) {
        mediaFocus.focus({ preventScroll: true });
        // A retained activeElement does not emit another native focusin event.
        // Let the new layout position it even when focus itself was preserved.
        mediaFocus.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        if (!press.hasAttribute('data-reel')) {
          const bounds = mediaFocus.getBoundingClientRect();
          if (bounds.top < 88 || bounds.bottom > window.innerHeight) mediaFocus.scrollIntoView({ block: 'center', behavior: 'instant' });
        }
      }
      mediaFocus = null;
      mediaTransition = false;
    };
    // refreshInit is too late to protect focus when matchMedia reverts a pin.
    mediaEvents.addEventListener('matchMediaInit', rememberMediaFocus);
    mediaEvents.addEventListener('matchMedia', restoreMediaFocus);

    const reelFits = () => {
      if (!window.matchMedia(conditions.desktop).matches) return false;
      const wasReel = press.hasAttribute('data-reel');
      press.dataset.reel = '';
      const style = window.getComputedStyle(stage);
      const available = stage.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      // Offset coordinates ignore entrance transforms, which otherwise look
      // like content overflow. Direct children include every caption and link.
      const needed = Math.max(...Array.from(track.children, (article) => Math.max(
        0, ...Array.from(article.children, (child) => child instanceof HTMLElement ? child.offsetTop + child.offsetHeight : 0)
      )));
      if (!wasReel) delete press.dataset.reel;
      return needed <= available - 4;
    };

    const setup = (match: gsap.Context) => {
      const { desktop, reduce } = match.conditions!;
      const splits: SplitText[] = [];
      const reveals: Reveal[] = [];
      const hero = root.querySelector<HTMLElement>('.brand-hero')!;
      let alive = true;
      let focusFrame = 0;
      let reel: gsap.core.Tween | undefined;
      delete document.documentElement.dataset.motionPending;
      window.clearTimeout((window as Window & { __polstanMotionFallback?: number }).__polstanMotionFallback);
      if (reduce) {
        root.dataset.motion = 'reduced';
        hero.dataset.intro = 'complete';
        return;
      }
      root.dataset.motion = 'active';

      const remember = <T extends gsap.core.Animation>(element: HTMLElement, animation: T): T => {
        reveals.push({ element, animation });
        return animation;
      };
      const eligible = (element: HTMLElement) => {
        const closed = element.closest<HTMLDetailsElement>('details:not([open])');
        const summary = closed?.querySelector(':scope > summary');
        return !element.closest('dialog') && (!closed || element === closed || summary?.contains(element)) && element.getBoundingClientRect().bottom >= 0;
      };

      // Opening / exposure / lock. CTAs arrive before the name finishes settling.
      if (!introduced.current && window.scrollY < 80) {
        const opening = remember(hero, gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { hero.dataset.intro = 'complete'; } }));
        opening.addLabel('opening', 0)
          .fromTo('.brand-hero-film', { clipPath: 'inset(28% 6% 28% 6%)', scale: 1.18 }, { clipPath: 'inset(4% 0% 4% 0%)', scale: 1.04, duration: 1 }, 'opening')
          .fromTo('.brand-hero-content', { y: 90 }, { y: -5, duration: 1 }, 'opening+=.12')
          .fromTo('.hero-name-line', { yPercent: 125, scaleY: 1.12, skewX: -4, opacity: 1, transformOrigin: 'left bottom' }, { yPercent: -4, scaleY: 1, skewX: 0, duration: 1, stagger: .055 }, 'opening+=.12')
          .addLabel('exposure', .5)
          .fromTo('.hero-role, .brand-hero-top', { opacity: 0, y: 42, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: .65, stagger: .09 }, 'exposure')
          .fromTo('.hero-line, .hero-actions, .hero-film-controls', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .65, stagger: .07 }, 'exposure+=.1')
          .addLabel('lock', 1.2)
          .to('.brand-hero-film', { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: .55 }, 'lock')
          .to('.brand-hero-content', { y: 0, duration: .4 }, 'lock')
          .to('.hero-name-line', { yPercent: 0, duration: .45, stagger: .055 }, 'lock');
      } else {
        gsap.set('.brand-hero-content, .hero-name-line, .hero-role, .hero-line, .hero-actions, .brand-hero-top, .hero-film-controls', { opacity: 1, y: 0, yPercent: 0 });
        hero.dataset.intro = 'complete';
      }
      introduced.current = true;
      gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .55 } })
        .to('.brand-hero-film', { yPercent: 22, ease: 'none' }, 0)
        .to('.brand-hero-content', { yPercent: -22, ease: 'none' }, 0)
        .to('.brand-hero-scrim', { opacity: .55, ease: 'none' }, 0);
      gsap.to('.reading-progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: .15, invalidateOnRefresh: true } });

      // All publication links must fit beneath the fixed header. Otherwise use
      // the default vertical layout, including after resizing within a breakpoint.
      if (desktop && reelFits()) {
        press.dataset.reel = '';
        reel = gsap.to(track, { x: () => -(track.scrollWidth - stage.clientWidth), ease: 'none', scrollTrigger: { id: 'publication-reel', trigger: stage, start: 'top 88px', end: () => `+=${track.scrollWidth - stage.clientWidth + window.innerWidth * .3}`, pin: stage, scrub: .65, anticipatePin: 1, invalidateOnRefresh: true } });
        gsap.to('.press-reel-progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: stage, start: 'top 88px', end: () => `+=${track.scrollWidth - stage.clientWidth + window.innerWidth * .3}`, scrub: .65, invalidateOnRefresh: true } });
      }
      const triggerFor = (element: HTMLElement): ScrollTrigger.Vars => {
        const card = element.closest<HTMLElement>('.press-track > article');
        return reel && card && card !== track.firstElementChild
          ? { trigger: card, containerAnimation: reel, start: 'left 96%', end: 'left 57%', scrub: .38, invalidateOnRefresh: true }
          : { trigger: element, start: 'clamp(top 92%)', end: 'clamp(top 54%)', scrub: .38, invalidateOnRefresh: true };
      };
      const sequence = (element: HTMLElement) => remember(element, gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: triggerFor(element) }));

      // Each heading crosses its mask, opens past its resting pose, then settles.
      // AutoSplit rebuilds the masks after font or responsive width reflow.
      root.querySelectorAll<HTMLElement>('.brand-title, .press-track h3, .album-heading h3, .grammy-previous h3').forEach((heading) => {
        if (!eligible(heading)) return;
        const split = SplitText.create(heading, {
          type: 'lines,words', tag: 'span', mask: 'lines', autoSplit: true, aria: 'auto', linesClass: 'motion-line', wordsClass: 'motion-word',
          onSplit(self) {
            return sequence(heading).addLabel('covered', 0)
              .fromTo(self.lines, { yPercent: 125, opacity: 0, skewY: 5, transformOrigin: 'left bottom' }, { yPercent: -5, opacity: 1, skewY: 0, duration: .8, stagger: .14 }, 'covered')
              .addLabel('settled', .85)
              .to(self.lines, { yPercent: 0, duration: .4, stagger: .07 }, 'settled');
          }
        });
        splits.push(split);
      });
      root.querySelectorAll<HTMLElement>('.grammy-context>.brand-body, .grammy-previous p, .album-description, .press-document-body, .press-tv>div>p:not(.brand-eyebrow), .press-metro>div>p:not(.brand-eyebrow), .live-interlude-copy>p, .story-heading>.brand-body, .contact-heading>.brand-body').forEach((paragraph) => {
        if (!eligible(paragraph)) return;
        const split = SplitText.create(paragraph, { type: 'words', tag: 'span', aria: 'auto', wordsClass: 'motion-word' });
        gsap.set(split.words, { display: 'inline-block', transformOrigin: 'left bottom' });
        sequence(paragraph).addLabel('gather', 0)
          .fromTo(split.words, { opacity: .08, y: 35, rotationX: -65 }, { opacity: 1, y: -3, rotationX: 0, duration: .7, stagger: { amount: .65 }, ease: 'power2.out' }, 'gather')
          .addLabel('read', .72).to(split.words, { y: 0, duration: .35, stagger: { amount: .55 } }, 'read');
        splits.push(split);
      });
      root.querySelectorAll<HTMLElement>('.album-art, .billboard-pages, .chart-document, .press-tv-image, .press-metro-image').forEach((art, index) => {
        if (!eligible(art)) return;
        const images = art.querySelectorAll('img');
        sequence(art).addLabel('frame', 0)
          .fromTo(art, { clipPath: 'inset(32% 10% 32% 10%)', y: 96, scale: .82, rotation: index % 2 ? 2 : -2 }, { clipPath: 'inset(4% 0% 4% 0%)', y: -10, scale: 1.02, rotation: 0, duration: .85 }, 'frame')
          .fromTo(images, { scale: 1.22, opacity: .25 }, { scale: 1.04, opacity: 1, duration: .85 }, 'frame')
          .addLabel('full', .85).to(art, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, scale: 1, duration: .45 }, 'full')
          .to(images, { scale: 1, duration: .45 }, 'full');
      });
      // Dates, captions, document actions and sources receive the same visible
      // arrival rhythm. Form fields and text inside native viewers stay static.
      const captions = '.brand-eyebrow, .grammy-year, .grammy-status, .grammy-status-note, .album-meta, .album-subtitle, .album-credits>p:not(.brand-eyebrow), .album-categories ul, .press-document figcaption, .press-document-action, .press-tv small, .live-caption, .project-preview, .brand-footer p, .brand-footer>div:nth-child(2)';
      root.querySelectorAll<HTMLElement>(captions).forEach((caption) => {
        if (!eligible(caption) || caption.closest('.brand-hero, .brand-form, .collaboration-catalog, .inquiry-selection') || caption.parentElement?.closest('.album-meta')) return;
        sequence(caption).addLabel('hidden', 0)
          .fromTo(caption, { y: 55, x: 18, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { y: -4, x: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: .8 }, 'hidden')
          .addLabel('fixed', .8).to(caption, { y: 0, duration: .35 }, 'fixed');
      });
      root.querySelectorAll<HTMLElement>('.brand-text-link, .album-detail, .project-story, .career-archive, .collaboration-catalog').forEach((element) => {
        if (!eligible(element) || element.closest('.brand-hero, .brand-form, .inquiry-ready, .brand-menu')) return;
        sequence(element).fromTo(element, { y: 60, opacity: 0 }, { y: -4, opacity: 1, duration: .8 }).to(element, { y: 0, duration: .35 });
      });

      const live = root.querySelector<HTMLElement>('.live-interlude')!;
      const liveImage = live.querySelector<HTMLElement>('.live-image')!;
      remember(liveImage, gsap.timeline({ scrollTrigger: { trigger: live, start: 'clamp(top 95%)', end: 'clamp(top 25%)', scrub: .55 } })
        .fromTo(liveImage, { clipPath: 'inset(24% 8% 24% 8%)' }, { clipPath: 'inset(3% 0% 3% 0%)', duration: .75, ease: 'power3.out' })
        .to(liveImage, { clipPath: 'inset(0% 0% 0% 0%)', duration: .4, ease: 'power2.out' })
        .fromTo(liveImage.querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 1.15, ease: 'power2.out' }, 0));
      gsap.fromTo(liveImage, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: live, start: 'top bottom', end: 'bottom top', scrub: .55 } });
      const finale = root.querySelector<HTMLElement>('.brand-footer .brand-wordmark')!;
      remember(finale, gsap.timeline({ scrollTrigger: { trigger: '.brand-footer', start: 'clamp(top 96%)', end: 'clamp(bottom bottom)', scrub: .45 } })
        .fromTo(finale, { yPercent: 115, opacity: 0, scale: 1.12, skewY: 4 }, { yPercent: -4, opacity: 1, scale: 1, skewY: 0, duration: .8, ease: 'power3.out' })
        .to(finale, { yPercent: 0, duration: .35, ease: 'power2.out' }));

      const refresh = () => ScrollTrigger.refresh();
      const onFocus = (event: FocusEvent) => {
        if (!(event.target instanceof HTMLElement)) return;
        const target = event.target;
        // A keyboard focus target never waits for its ancestor's reveal to finish.
        reveals.forEach(({ element, animation }) => { if (element.contains(target) || target.contains(element)) animation.progress(1); });
        const card = target.closest<HTMLElement>('.press-track > article');
        if (!card) return;
        window.cancelAnimationFrame(focusFrame);
        focusFrame = window.requestAnimationFrame(() => {
          if (!alive || !target.isConnected) return;
          if (document.activeElement !== target) {
            if (document.activeElement === document.body) target.focus({ preventScroll: true });
            else return;
          }
          const bounds = target.getBoundingClientRect();
          if (!reel?.scrollTrigger) {
            if (bounds.top < 88 || bounds.bottom > window.innerHeight) target.scrollIntoView({ block: 'center', behavior: 'instant' });
            return;
          }
          const viewport = stage.getBoundingClientRect();
          if (!stage.scrollLeft && bounds.left >= viewport.left && bounds.right <= viewport.right && bounds.top >= 88 && bounds.bottom <= window.innerHeight) return;
          const distance = track.scrollWidth - stage.clientWidth;
          if (distance <= 0) return;
          const x = gsap.utils.clamp(0, distance, card.offsetLeft - (stage.clientWidth - card.clientWidth) / 2);
          const trigger = reel.scrollTrigger;
          const previous = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = 'auto';
          stage.scrollLeft = 0;
          trigger.scroll(trigger.start + (trigger.end - trigger.start) * x / distance);
          trigger.update();
          trigger.getTween()?.progress(1);
          document.documentElement.style.scrollBehavior = previous;
        });
      };
      const onDisclosure = (event: Event) => {
        const details = event.target;
        if (!(details instanceof HTMLDetailsElement)) return;
        match.add(() => {
          if (details.open) {
            const children = Array.from(details.children).slice(1);
            gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: refresh })
              .fromTo(children, { y: 58, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { y: -3, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: .65, stagger: .07 })
              .to(children, { y: 0, duration: .25, stagger: .04 });
          }
        });
        refresh();
      };
      root.addEventListener('toggle', onDisclosure, true);
      root.addEventListener('focusin', onFocus);
      let focusedDuringRefresh: HTMLElement | null = null;
      const preserveFocus = () => {
        const active = document.activeElement;
        focusedDuringRefresh = active instanceof HTMLElement && stage.contains(active) ? active : null;
      };
      const restoreFocus = () => {
        if (focusedDuringRefresh?.isConnected) focusedDuringRefresh.focus({ preventScroll: true });
        focusedDuringRefresh = null;
      };
      ScrollTrigger.addEventListener('refreshInit', preserveFocus);
      ScrollTrigger.addEventListener('refresh', restoreFocus);
      void document.fonts.ready.then(() => { if (alive) { refresh(); scheduleFitCheck(); } });
      // Reserved image dimensions cannot change layout on decode; avoid unpinning
      // and reparenting a focused reel whenever another image finishes loading.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      return () => {
        alive = false;
        delete press.dataset.reel;
        root.removeEventListener('toggle', onDisclosure, true);
        root.removeEventListener('focusin', onFocus);
        window.cancelAnimationFrame(focusFrame);
        ScrollTrigger.removeEventListener('refreshInit', preserveFocus);
        ScrollTrigger.removeEventListener('refresh', restoreFocus);
        splits.forEach((split) => split.revert());
      };
    };

    const scheduleFitCheck = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (disposed || window.matchMedia(conditions.reduce).matches) return;
        if (press.hasAttribute('data-reel') === reelFits()) return;
        rememberMediaFocus();
        media.revert();
        media.add(conditions, setup, root);
        restoreMediaFocus();
      }, 250);
    };
    media.add(conditions, setup, root);
    window.addEventListener('resize', scheduleFitCheck);
    return () => {
      disposed = true;
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', scheduleFitCheck);
      root.removeEventListener('focusin', trackPressFocus, true);
      root.removeEventListener('focusout', trackPressBlur, true);
      document.removeEventListener('pointerdown', forgetPressPointerFocus, true);
      mediaEvents.removeEventListener('matchMediaInit', rememberMediaFocus);
      mediaEvents.removeEventListener('matchMedia', restoreMediaFocus);
      media.revert();
      delete document.documentElement.dataset.motionPending;
      delete root.dataset.motion;
    };
  }, [scope]);
  return null;
}

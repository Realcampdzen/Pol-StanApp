'use client';

import { ArrowDown, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { BrandContent } from '@/lib/brand-content';
import { brandSources } from '@/lib/brand-content';

export function LiveHero({ copy }: { copy: BrandContent['hero'] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const inView = useRef(true);
  const reduced = useRef(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPlayback = () => {
      if (!inView.current || document.hidden || userPaused.current || reduced.current) video.pause();
      else void video.play().catch(() => setPlaying(false));
    };
    const setPreference = () => { reduced.current = preference.matches; syncPlayback(); };
    const observer = new IntersectionObserver(([entry]) => { inView.current = entry.isIntersecting; syncPlayback(); }, { threshold: 0.12 });
    observer.observe(video);
    preference.addEventListener('change', setPreference);
    document.addEventListener('visibilitychange', syncPlayback);
    setPreference();
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', setPreference);
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { userPaused.current = false; reduced.current = false; void video.play().catch(() => setPlaying(false)); }
    else { userPaused.current = true; video.pause(); }
  };

  return (
    <section className="brand-hero" id="home" aria-labelledby="brand-name">
      <div className="brand-hero-film" aria-hidden="true">
        <Image src="/media/brand/live-poster-v4.webp" alt="" fill priority fetchPriority="high" sizes="100vw" unoptimized />
        {!failed && <video ref={videoRef} muted={muted} loop playsInline preload="metadata" poster="/media/brand/live-poster-v4.webp"
          onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }}>
          <source src="/media/hero-concert-v2-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
          <source src="/media/hero-concert-v2-desktop.mp4" type="video/mp4" />
        </video>}
      </div>
      <div className="brand-hero-scrim" aria-hidden="true" />
      <div className="brand-hero-top"><span>{copy.live}</span></div>
      <div className="brand-hero-content">
        <h1 id="brand-name"><span className="hero-name-first"><span className="hero-name-line">{copy.first}</span></span><span className="hero-name-last"><span className="hero-name-line">{copy.last}</span></span></h1>
        <p className="hero-role">{copy.role}</p>
        <p className="hero-line">{copy.line}</p>
        <div className="hero-actions"><a className="brand-button" href="#grammy"><span className="button-label">{copy.cta}</span><span className="button-icon"><ArrowDown size={20} /></span></a><a className="brand-text-link" href={brandSources.tamas} target="_blank" rel="noreferrer"><Play size={15} fill="currentColor" />{copy.listen}</a></div>
      </div>
      <div className="hero-film-controls">
        {!failed && <><button type="button" onClick={togglePlayback} aria-label={playing ? copy.pause : copy.play}>{playing ? <Pause size={17} /> : <Play size={17} />}</button><button type="button" onClick={() => setMuted(!muted)} aria-label={muted ? copy.soundOn : copy.soundOff} aria-pressed={!muted}>{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button></>}
      </div>
    </section>
  );
}

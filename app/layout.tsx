import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';
import './globals.css';
import './brand.css';

const onest = localFont({ src: './fonts/Onest.woff2', variable: '--font-onest', weight: '100 900', display: 'swap' });
const signature = localFont({ src: './fonts/CormorantName-Italic.woff2', variable: '--font-signature', weight: '500', style: 'italic', display: 'swap' });
const poster = localFont({ src: './fonts/DelaName.woff2', variable: '--font-poster', weight: '400', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://polstan.ru'),
  title: {
    default: 'Stanislav Polesko',
    template: '%s'
  },
  description:
    'Music production, composition, creative direction and AI production by Stanislav Polesko.',
  applicationName: 'PolStan',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'PolStan',
    statusBarStyle: 'black-translucent'
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' }]
  },
  openGraph: {
    type: 'website',
    url: 'https://polstan.ru',
    title: 'Stanislav Polesko',
    description:
      'Music production, composition, creative direction and AI production.',
    images: ['/media/crowd-stage.jpg']
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030405',
  colorScheme: 'dark'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await headers()).get('x-polstan-locale') === 'en' ? 'en' : 'ru';
  return (
    <html lang={locale}>
      <head><script dangerouslySetInnerHTML={{ __html: "if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.motionPending='';window.__polstanMotionFallback=setTimeout(function(){delete document.documentElement.dataset.motionPending},2200)}" }} /></head>
      <body className={`${onest.variable} ${signature.variable} ${poster.variable}`}>{children}</body>
    </html>
  );
}

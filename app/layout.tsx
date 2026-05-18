import type { Metadata, Viewport } from 'next';
import './globals.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

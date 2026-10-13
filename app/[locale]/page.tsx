import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BrandExperience } from '@/components/brand-experience';
import { content, isLocale, locales } from '@/lib/content';
import { getBrandContent } from '@/lib/brand-content';
import { buildQueryString } from '@/lib/query-string';
import { normalizeRoistatVisit } from '@/lib/roistat';

type LocalePageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const pageContent = getBrandContent(locale);

  return {
    title: pageContent.meta.title,
    description: pageContent.meta.description,
    openGraph: {
      type: 'website',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      url: `/${locale}`,
      title: pageContent.meta.title,
      description: pageContent.meta.description,
      images: [{ url: '/media/crowd-stage.jpg', width: 1280, height: 1024, alt: 'DOMINIA live' }]
    },
    twitter: { card: 'summary_large_image', title: pageContent.meta.title, description: pageContent.meta.description, images: ['/media/crowd-stage.jpg'] },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: '/ru',
        en: '/en',
        'x-default': '/ru'
      }
    }
  };
}

export default async function LocalePage({ params, searchParams }: LocalePageProps) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <BrandExperience
      content={content[locale]}
      initialQueryString={buildQueryString(query)}
      initialRoistatVisit={normalizeRoistatVisit(query.roistat_visit)}
    />
  );
}

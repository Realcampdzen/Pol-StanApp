import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PolstanApp } from '@/components/polstan-app';
import { content, isLocale, locales } from '@/lib/content';
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

  const pageContent = content[locale];

  return {
    title: pageContent.meta.title,
    description: pageContent.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: '/ru',
        en: '/en'
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
    <PolstanApp
      content={content[locale]}
      initialQueryString={buildQueryString(query)}
      initialRoistatVisit={normalizeRoistatVisit(query.roistat_visit)}
    />
  );
}

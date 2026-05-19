import { redirect } from 'next/navigation';
import { buildQueryString } from '@/lib/query-string';

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const query = await searchParams;

  redirect(`/ru${buildQueryString(query)}`);
}

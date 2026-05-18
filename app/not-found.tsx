import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-ink px-6 text-center text-white">
      <div>
        <p className="mb-3 font-display text-5xl">404</p>
        <p className="mb-8 text-sm text-white/60">Page not found</p>
        <Link className="focus-ring inline-flex min-h-12 items-center border border-white/20 px-5 text-sm uppercase" href="/ru">
          Back to PolStan
        </Link>
      </div>
    </main>
  );
}

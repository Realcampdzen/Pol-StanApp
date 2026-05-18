# PolStan PWA

Mobile-first personal web app for Stanislav Polesko: services, limited drops, concert video hero, Telegram-first lead flow and VPS deployment.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/ru` or `http://localhost:3000/en`.

## Environment

Optionally create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Set:

- `NEXT_PUBLIC_TELEGRAM_USERNAME` - Telegram username without `@`.
- `ACME_EMAIL` - email used by Caddy for Let's Encrypt.

If `.env` is absent, Docker Compose falls back to `polstan` and `admin@polstan.ru`.

## Production Build

```bash
npm run lint
npm run build
```

The app uses `output: 'standalone'` in `next.config.mjs`, so Docker copies the minimal Next server into the runtime image.

## VPS Deployment

1. Point DNS to the VPS:

```text
A     polstan.ru      VPS_IP
A     www.polstan.ru  VPS_IP
```

Add `AAAA` records only if the VPS has IPv6.

2. Copy the repository to the VPS and create `.env`.

3. Start the stack:

```bash
docker compose up -d --build
```

4. Verify:

```bash
docker compose ps
curl -I http://polstan.ru
curl -I https://polstan.ru
curl -I https://www.polstan.ru
```

Expected behavior:

- `http://polstan.ru` redirects to HTTPS.
- `https://www.polstan.ru` redirects to `https://polstan.ru`.
- Caddy issues and renews the TLS certificate automatically.

## Roistat Attribution

When the site opens with `?roistat_visit=11254905`, the value is stored in `localStorage` and included in generated Telegram lead text.

Full Roistat script integration is intentionally deferred until the project/counter ID is available.

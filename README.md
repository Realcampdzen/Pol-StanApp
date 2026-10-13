# PolStan — Stanislav Polesko

The personal website of composer Stanislav Polesko, DOMINIA's producer and manager. The current site connects the original DOMINIA concert film, Tamas and Georgiy Zheryakov's Bach recording in first-round Grammy consideration, real publications and earlier projects.

Live: [Russian](https://polstan.ru/ru) · [English](https://polstan.ru/en).

The frontend uses Next.js, local Onest/Cormorant/Dela fonts and GSAP timelines, SplitText and ScrollTrigger. Desktop publication pinning is conditional on all captions and links fitting the viewport; mobile uses vertical reading. Reduced motion, no-JavaScript content, native document viewers, the service catalog, Telegram inquiry and PWA/TWA support are retained.

First-round consideration is presented separately from nomination. Billboard's For Your Consideration placement and the Metalfan readers' poll are identified accurately. Current work precedes the Strategic Music, G1Deon, BEATKOIN and PolStan Music archive.

## Technical Docs

- [Technical architecture and operations](docs/TECHNICAL.md)
- [Android TWA build and Play release](android-twa/README.md)
- [Changelog](CHANGELOG.md)
- [Brand experience specification](openspec/changes/create-grammy-brand-experience/proposal.md)
- [Release and browser verification](openspec/changes/create-grammy-brand-experience/verification.md)

## Local Development

```bash
npm ci
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
- `ANDROID_SHA256_CERT_FINGERPRINTS` - comma or whitespace separated Play App Signing SHA-256 fingerprints for `/.well-known/assetlinks.json`.

If `.env` is absent, Docker Compose falls back to `polstan` and `admin@polstan.ru`.

## Production Build

```bash
npm run check
npm run build
```

The app uses `output: 'standalone'` in `next.config.mjs`, so Docker copies the minimal Next server into the runtime image.

## VPS Deployment

### Caddy-only VPS

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

### Existing nginx VPS

Use this path when nginx already owns ports `80` and `443` on the server.

```bash
docker compose -f docker-compose.nginx.yml -p polstan up -d --build
cp deploy/nginx/polstan.ru.conf /etc/nginx/sites-available/polstan.ru
ln -sfn /etc/nginx/sites-available/polstan.ru /etc/nginx/sites-enabled/polstan.ru
nginx -t && systemctl reload nginx
certbot --nginx -d polstan.ru -d www.polstan.ru
```

The Next.js container binds to `127.0.0.1:3002` by default. Override with `POLSTAN_APP_PORT` if that port is already used.

## Roistat Attribution

When the site opens with `?roistat_visit=11254905`, the value is stored in `localStorage` and included in generated Telegram lead text.

Full Roistat script integration is intentionally deferred until the project/counter ID is available.

## Android TWA

The Android v1 wrapper lives in `android-twa/` and targets package `ru.polstan.app`.

Build flow:

```powershell
cd android-twa
copy local.properties.example local.properties
npx --yes @bubblewrap/cli@1.24.1 build
```

Keep the upload keystore in `../.secrets/` or another location outside git. After Play Console creates the internal testing release, copy the **App signing key certificate** SHA-256 fingerprint into `ANDROID_SHA256_CERT_FINGERPRINTS` and redeploy the web app so `https://polstan.ru/.well-known/assetlinks.json` verifies the TWA fullscreen relationship.

# Changelog

## v1.0.0 - 2026-05-20

Android v1 and production-ready PWA release.

### Added

- Trusted Web Activity Android wrapper in `android-twa/` for package `ru.polstan.app`.
- Dynamic `/.well-known/assetlinks.json` endpoint backed by `ANDROID_SHA256_CERT_FINGERPRINTS`.
- Manual service worker with app shell, static asset caching, media cache rules and offline fallback.
- Installable PWA manifest metadata, shortcuts, maskable icon support and portrait orientation.
- Mobile-first service filtering, bottom navigation, selection tray and contact flow polish.
- Technical documentation for architecture, production deployment, Android release and verification.

### Changed

- Docker Compose now passes `ANDROID_SHA256_CERT_FINGERPRINTS` into the runtime container.
- Docker context excludes Android build output, local secrets and release artifacts.
- Project version bumped to `1.0.0`.

### Verified

- `npm run lint`
- `npm run build`
- `npx --yes @bubblewrap/cli@1.24.1 doctor`
- `android-twa/gradlew.bat :app:assembleRelease :app:bundleRelease --no-daemon`
- Production smoke test on `https://polstan.ru/ru`

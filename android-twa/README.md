# PolStan Android TWA

Trusted Web Activity wrapper for `https://polstan.ru/ru`.

## Identity

- App name: `PolStan`
- Package: `ru.polstan.app`
- Start URL: `https://polstan.ru/ru`
- Web manifest: `https://polstan.ru/manifest.webmanifest`
- Target SDK: `35`

## Local Build Setup

1. Copy `local.properties.example` to `local.properties` and update `sdk.dir` if needed.
2. Create the upload key outside git, for example at `../.secrets/polstan-upload.keystore`.
3. Build an unsigned Gradle release for a quick compile check:

```powershell
.\gradlew.bat :app:assembleRelease
.\gradlew.bat :app:bundleRelease
```

For a Play-ready signed bundle, use Bubblewrap from this directory after the upload key exists:

```powershell
npx --yes @bubblewrap/cli@1.24.1 build
```

Do not commit keystores, passwords, APKs, AABs, or `local.properties`.

## Digital Asset Links

The web app exposes `/.well-known/assetlinks.json` through the Next.js route in `app/.well-known/assetlinks.json/route.ts`.

After creating the Play Console internal testing release, copy the SHA-256 fingerprint from **App integrity -> App signing key certificate** and deploy the web app with:

```env
ANDROID_SHA256_CERT_FINGERPRINTS=AA:BB:CC:...:FF
```

Use the Play app signing fingerprint, not the local upload-key fingerprint. Without this value the endpoint intentionally returns an empty array, so the TWA will fall back to Custom Tabs until the final signing certificate is known.

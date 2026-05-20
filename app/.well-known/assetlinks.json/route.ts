const ANDROID_PACKAGE_NAME = 'ru.polstan.app';
const FINGERPRINT_PATTERN = /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/i;

export const dynamic = 'force-dynamic';

export function GET() {
  const fingerprints = parseFingerprints(process.env.ANDROID_SHA256_CERT_FINGERPRINTS);
  const body = fingerprints.length
    ? [
        {
          relation: ['delegate_permission/common.handle_all_urls'],
          target: {
            namespace: 'android_app',
            package_name: ANDROID_PACKAGE_NAME,
            sha256_cert_fingerprints: fingerprints
          }
        }
      ]
    : [];

  return Response.json(body, {
    headers: {
      'Cache-Control': fingerprints.length ? 'public, max-age=3600' : 'no-store'
    }
  });
}

function parseFingerprints(value: string | undefined) {
  if (!value) return [];

  return value
    .split(/[,\s]+/)
    .map((fingerprint) => fingerprint.trim().toUpperCase())
    .filter((fingerprint) => FINGERPRINT_PATTERN.test(fingerprint));
}

export const ROISTAT_STORAGE_KEY = 'polstan.roistat_visit';

export function normalizeRoistatVisit(value?: string | string[] | null) {
  if (Array.isArray(value)) {
    return value[0] || '';
  }

  return value || '';
}

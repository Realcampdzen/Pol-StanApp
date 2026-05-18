import type { LeadIntent } from './types';

const DEFAULT_TELEGRAM_USERNAME = 'polstan';

export function getTelegramUsername() {
  return process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || DEFAULT_TELEGRAM_USERNAME;
}

export function buildTelegramMessage(intent: LeadIntent) {
  const lines = [
    `PolStan inquiry (${intent.locale.toUpperCase()})`,
    `Offering: ${intent.selectedOffering}`,
    `Name: ${intent.name || '-'}`,
    `Contact: ${intent.contact || '-'}`,
    `Budget: ${intent.budgetRange || '-'}`,
    `Timeline: ${intent.timeline || '-'}`,
    `Message: ${intent.message || '-'}`,
    intent.roistatVisit ? `Roistat: ${intent.roistatVisit}` : null,
    `Source: ${intent.source}`
  ].filter(Boolean);

  return lines.join('\n');
}

export function buildTelegramLink(username: string, message: string) {
  const handle = username.replace(/^@/, '');
  return `https://t.me/${handle}?text=${encodeURIComponent(message)}`;
}

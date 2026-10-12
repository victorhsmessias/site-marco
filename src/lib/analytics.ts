/**
 * Medição (GA4 e Meta Pixel). Desligada por padrão: só existe se as variáveis
 * de ambiente forem preenchidas (ver `.env.example`), e os scripts só carregam
 * depois que o visitante aceita o aviso de cookies.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
export const analyticsEnabled = Boolean(GA_ID || META_PIXEL_ID);

export const CONSENT_STORAGE_KEY = 'mb-cookie-consent';
export type Consent = 'granted' | 'denied';

type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Eventos do GA4 que também viram evento padrão no Meta Pixel. */
const META_EVENTS: Record<string, string> = {
  click_whatsapp: 'Contact',
};

/**
 * Registra um evento. Sem analytics ativo (ou sem consentimento) não envia nada
 * para fora: apenas dispara um evento local `mb:track`, útil para testes.
 */
export function trackEvent(name: string, params: TrackParams = {}): void {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(new CustomEvent('mb:track', { detail: { name, params } }));

  window.gtag?.('event', name, params);

  const metaEvent = META_EVENTS[name];
  if (metaEvent) window.fbq?.('track', metaEvent, params);
}

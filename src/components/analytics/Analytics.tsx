'use client';

import { useEffect, useSyncExternalStore } from 'react';
import {
  CONSENT_STORAGE_KEY,
  GA_ID,
  META_PIXEL_ID,
  analyticsEnabled,
  trackEvent,
} from '@/lib/analytics';
import type { Consent } from '@/lib/analytics';

/* ---------- Consentimento (guardado no navegador do visitante) ---------- */

const CONSENT_EVENT = 'mb:consent';

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

// Reserva para quando o navegador bloqueia o armazenamento (modo privado):
// a escolha vale só para esta visita.
let sessionConsent: Consent | null = null;

function readConsent(): Consent | 'unset' {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === 'granted' || value === 'denied') return value;
  } catch {
    // segue para a reserva em memória
  }
  return sessionConsent ?? 'unset';
}

function saveConsent(value: Consent) {
  sessionConsent = value;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // sem acesso ao armazenamento: fica só em `sessionConsent`
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/* ---------- Carregamento dos scripts (só depois do "Aceitar") ---------- */

let scriptsLoaded = false;

function loadScripts() {
  if (scriptsLoaded) return;
  scriptsLoaded = true;

  if (GA_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
      // O gtag.js espera o objeto `arguments`, não um array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  if (META_PIXEL_ID) {
    const queue: unknown[][] = [];
    const fbq = Object.assign(
      (...args: unknown[]) => {
        queue.push(args);
      },
      { queue, loaded: true, version: '2.0', push: (...args: unknown[]) => queue.push(args) },
    );
    window.fbq = fbq;
    (window as unknown as { _fbq: unknown })._fbq = fbq;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }
}

/**
 * Medição do site.
 *
 * - Sempre: ouve os cliques em elementos com `data-track` (todos os CTAs de
 *   WhatsApp) e registra o evento, ex.: `click_whatsapp`.
 * - Só com GA4 ou Meta Pixel configurados (`.env.local`): mostra o aviso de
 *   cookies e carrega os scripts depois que o visitante aceita.
 */
export function Analytics() {
  const consent = useSyncExternalStore(
    subscribe,
    readConsent,
    () => 'pending' as const, // no HTML gerado no build o aviso não aparece
  );

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const el = event.target.closest<HTMLElement>('[data-track]');
      if (el?.dataset.track) {
        trackEvent(el.dataset.track, { location: el.dataset.trackLocation });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (analyticsEnabled && consent === 'granted') loadScripts();
  }, [consent]);

  if (!analyticsEnabled || consent !== 'unset') return null;

  return (
    <div
      data-cookie-banner
      role="region"
      aria-label="Aviso de cookies"
      className="no-print fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ivory shadow-[0_-8px_32px_-16px_rgb(22_41_31/0.3)]"
    >
      <div className="mx-auto flex max-w-site flex-col gap-4 px-gutter py-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="max-w-3xl text-sm leading-relaxed text-ink">
          Usamos cookies de medição para entender como o site é usado e melhorar a sua
          experiência. Você pode aceitar ou recusar. Saiba mais na{' '}
          <a
            href="/politica-de-privacidade/"
            className="text-forest underline decoration-1 underline-offset-4"
          >
            Política de Privacidade
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => saveConsent('denied')}
            className="btn btn-sm btn-outline flex-1 md:flex-none"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => saveConsent('granted')}
            className="btn btn-sm btn-primary flex-1 md:flex-none"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

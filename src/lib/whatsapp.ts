import { site } from './site';

/** Link do WhatsApp com a mensagem já preenchida. */
export function whatsappUrl(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export type QuoteRequest = {
  name: string;
  eventType: string;
  date?: string;
  place?: string;
  guests?: string;
  message?: string;
};

/** Monta a mensagem enviada pelo formulário de contato. */
export function buildQuoteMessage(data: QuoteRequest): string {
  const lines: [label: string, value: string | undefined][] = [
    ['Nome', data.name],
    ['Tipo de evento', data.eventType],
    ['Data prevista', data.date],
    ['Cidade/local', data.place],
    ['Convidados (aprox.)', data.guests],
    ['Mensagem', data.message],
  ];

  const details = lines
    .map(([label, value]) => [label, value?.trim()] as const)
    .filter(([, value]) => value)
    .map(([label, value]) => `*${label}:* ${value}`);

  return [site.whatsapp.defaultMessage, '', ...details].join('\n');
}

'use client';

import { useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { CTA_LABEL, contact } from '@/data/content';
import { trackEvent } from '@/lib/analytics';
import { site } from '@/lib/site';
import { buildQuoteMessage, whatsappUrl } from '@/lib/whatsapp';

const OPTIONAL = <span className="font-normal text-ink-muted"> (opcional)</span>;

/**
 * Formulário de orçamento, sem backend: monta a mensagem e abre o WhatsApp com
 * os dados preenchidos. Nenhum campo tem `name`, então nada é enviado a servidor
 * algum; sem JavaScript, o envio apenas abre a conversa no WhatsApp.
 */
export function ContactForm() {
  const eventTypeRef = useRef<HTMLSelectElement>(null);

  // Os links "Solicitar orçamento" dos cartões de serviço trazem `data-event-type`:
  // ao chegar aqui, o tipo de evento já vem selecionado.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const eventType = event.target.closest<HTMLElement>('[data-event-type]')?.dataset.eventType;
      if (eventType && eventTypeRef.current) eventTypeRef.current.value = eventType;
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const value = (id: string) =>
      (form.elements.namedItem(id) as HTMLInputElement | null)?.value ?? '';

    const message = buildQuoteMessage({
      name: value('contato-nome'),
      eventType: value('contato-tipo'),
      date: value('contato-data'),
      place: value('contato-local'),
      guests: value('contato-convidados'),
      message: value('contato-mensagem'),
    });

    event.preventDefault();
    trackEvent('click_whatsapp', { location: 'contact_form' });

    const url = whatsappUrl(message);
    const opened = window.open(url, '_blank');
    if (opened) opened.opener = null;
    // Se o navegador bloquear a nova aba, abre na própria página.
    else window.location.href = url;
  };

  return (
    <form
      action={`https://wa.me/${site.whatsapp.number}`}
      method="get"
      target="_blank"
      onSubmit={onSubmit}
      aria-labelledby="contato-form-title"
      className="on-light bg-ivory p-6 text-ink sm:p-10"
    >
      <h3 id="contato-form-title" className="font-display text-h3 font-medium text-forest">
        {contact.formTitle}
      </h3>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="contato-nome" className="mb-2 block text-sm font-medium">
            Nome
          </label>
          <input
            id="contato-nome"
            type="text"
            required
            autoComplete="name"
            className="field"
          />
        </div>

        <div>
          <label htmlFor="contato-tipo" className="mb-2 block text-sm font-medium">
            Tipo de evento
          </label>
          <select
            id="contato-tipo"
            ref={eventTypeRef}
            required
            defaultValue=""
            className="field"
          >
            <option value="" disabled>
              Selecione
            </option>
            {contact.eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contato-data" className="mb-2 block text-sm font-medium">
            Data prevista{OPTIONAL}
          </label>
          <input
            id="contato-data"
            type="text"
            autoComplete="off"
            aria-describedby="contato-data-dica"
            className="field"
          />
          <p id="contato-data-dica" className="mt-1.5 text-xs text-ink-muted">
            Pode ser aproximada: “setembro de 2027”.
          </p>
        </div>

        <div>
          <label htmlFor="contato-local" className="mb-2 block text-sm font-medium">
            Cidade ou local{OPTIONAL}
          </label>
          <input id="contato-local" type="text" autoComplete="off" className="field" />
        </div>

        <div>
          <label htmlFor="contato-convidados" className="mb-2 block text-sm font-medium">
            Convidados (aprox.){OPTIONAL}
          </label>
          <input
            id="contato-convidados"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            className="field"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contato-mensagem" className="mb-2 block text-sm font-medium">
            Mensagem{OPTIONAL}
          </label>
          <textarea id="contato-mensagem" rows={4} className="field resize-y" />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-7 w-full">
        <WhatsAppIcon className="h-5 w-5" />
        {CTA_LABEL}
        <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
      </button>

      <p className="mt-4 text-xs leading-relaxed text-ink-muted">
        {contact.privacyNote}{' '}
        <a
          href="/politica-de-privacidade/"
          className="text-forest underline decoration-1 underline-offset-4"
        >
          Política de Privacidade
        </a>
        .
      </p>
    </form>
  );
}

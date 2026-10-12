import type { ReactNode } from 'react';
import { whatsappUrl } from '@/lib/whatsapp';

type WhatsAppLinkProps = {
  children: ReactNode;
  /** Onde o link está na página. Vai junto no evento `click_whatsapp`. */
  location: string;
  /** Mensagem pré-preenchida. Padrão: a mensagem de orçamento de `site.ts`. */
  message?: string;
  className?: string;
  /** Use só quando o link não tem texto visível (ex.: botão flutuante). */
  'aria-label'?: string;
};

/**
 * Link para o WhatsApp. Todo CTA de orçamento passa por aqui, então todos
 * disparam o evento `click_whatsapp` (registrado em `Analytics.tsx`).
 */
export function WhatsAppLink({
  children,
  location,
  message,
  className,
  'aria-label': ariaLabel,
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-track="click_whatsapp"
      data-track-location={location}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
      {!ariaLabel && <span className="sr-only"> (abre o WhatsApp em nova aba)</span>}
    </a>
  );
}

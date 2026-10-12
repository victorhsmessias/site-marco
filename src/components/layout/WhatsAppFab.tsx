'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { CTA_LABEL } from '@/data/content';

/**
 * Botão flutuante de WhatsApp. Pequeno, no canto inferior direito.
 *
 * Some enquanto uma área marcada com `data-fab-hide` está na tela (botões do
 * hero, contato e rodapé), porque ali já existe um botão de orçamento visível e
 * o flutuante só cobriria conteúdo. O menu e o lightbox abrem por cima dele.
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const blockers = document.querySelectorAll('[data-fab-hide]');
    const onScreen = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    blockers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div
      data-visible={visible || undefined}
      className="whatsapp-fab no-print invisible fixed right-4 bottom-4 z-30 translate-y-3 opacity-0 transition-[opacity,transform,visibility] duration-500 ease-soft data-visible:visible data-visible:translate-y-0 data-visible:opacity-100 sm:right-6 sm:bottom-6 motion-reduce:transition-none"
    >
      <WhatsAppLink
        location="floating_button"
        aria-label={`${CTA_LABEL} pelo WhatsApp (abre em nova aba)`}
        className="flex h-13 w-13 items-center justify-center rounded-full bg-forest text-ivory shadow-[0_10px_30px_-10px_rgb(22_41_31/0.6)] ring-1 ring-gold/60 transition-colors hover:bg-forest-deep focus-visible:outline-offset-4"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </WhatsAppLink>
    </div>
  );
}

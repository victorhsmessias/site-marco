'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Entrada suave das seções: marca com `data-revealed` os elementos `[data-reveal]`
 * quando entram na tela. O estilo fica em `globals.css` e é desligado para quem
 * pede menos movimento.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]:not([data-revealed])');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-revealed', '');
          observer.unobserve(entry.target);
        }
      },
      // Sem `threshold`: blocos mais altos que a tela (a galeria) também precisam disparar.
      { rootMargin: '0px 0px -8% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

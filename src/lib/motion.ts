import type { CSSProperties } from 'react';

/**
 * Atraso em cascata para elementos com `data-reveal`: o item 0 entra na hora,
 * o 1 depois de `step` ms, e assim por diante. O estilo fica em `globals.css`.
 */
export function stagger(index: number, step = 100): CSSProperties {
  return { '--reveal-delay': `${index * step}ms` } as CSSProperties;
}

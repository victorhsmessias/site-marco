/**
 * Depoimentos.
 *
 * A seção só aparece no site (e no menu) quando SHOW_TESTIMONIALS for `true`
 * E houver ao menos um depoimento real (sem `example: true`).
 *
 * NUNCA publique depoimentos inventados. Os itens abaixo são apenas um modelo
 * de preenchimento e nunca são exibidos, mesmo com a flag ligada.
 *
 * TODO(content): coletar depoimentos reais, com autorização por escrito de quem
 * escreveu, e então trocar a flag para `true`.
 */
export const SHOW_TESTIMONIALS = false;

export type Testimonial = {
  quote: string;
  author: string;
  /** Ex.: "Casamento em Londrina, 2025". */
  context: string;
  /** Marca um item de exemplo: nunca é exibido. */
  example?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    example: true,
    quote: 'EXEMPLO (não publicar): texto do depoimento real do cliente.',
    author: 'EXEMPLO: Nome dos noivos',
    context: 'EXEMPLO: Casamento em Londrina, ano',
  },
  {
    example: true,
    quote: 'EXEMPLO (não publicar): texto do depoimento real do cliente.',
    author: 'EXEMPLO: Nome da debutante ou da família',
    context: 'EXEMPLO: Festa de 15 anos, ano',
  },
];

/** Depoimentos que podem ser exibidos: só os reais, e só com a flag ligada. */
export const publishedTestimonials: Testimonial[] = SHOW_TESTIMONIALS
  ? testimonials.filter((item) => !item.example)
  : [];

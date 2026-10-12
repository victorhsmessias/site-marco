import { SectionHeading } from '@/components/ui/SectionHeading';
import { testimonialsIntro } from '@/data/content';
import { publishedTestimonials } from '@/data/testimonials';

/**
 * Depoimentos. Não renderiza nada enquanto não houver depoimentos reais
 * publicados (ver `src/data/testimonials.ts`).
 */
export function Testimonials() {
  if (publishedTestimonials.length === 0) return null;

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="py-section">
      <div className="mx-auto max-w-site px-gutter">
        <SectionHeading
          id="depoimentos-title"
          eyebrow={testimonialsIntro.eyebrow}
          title={testimonialsIntro.title}
        />

        <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {publishedTestimonials.map((item) => (
            <li key={`${item.author}-${item.context}`} data-reveal>
              <figure className="flex h-full flex-col border-t border-gold pt-7">
                <blockquote className="font-display flex-1 text-2xl leading-snug font-medium text-pretty text-forest italic">
                  <p>“{item.quote}”</p>
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="block font-semibold text-ink">{item.author}</span>
                  <span className="block text-ink-muted">{item.context}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

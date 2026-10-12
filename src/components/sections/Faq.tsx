import { PlusIcon } from '@/components/ui/Icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { CTA_LABEL, faqIntro } from '@/data/content';
import { faq } from '@/data/faq';
import { stagger } from '@/lib/motion';

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-section">
      <div className="mx-auto grid max-w-site gap-12 px-gutter lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            eyebrow={faqIntro.eyebrow}
            title={faqIntro.title}
            lead={faqIntro.lead}
          />
          <div className="mt-8" data-reveal style={stagger(3, 120)}>
            <WhatsAppLink location="faq" className="btn btn-outline">
              {CTA_LABEL}
            </WhatsAppLink>
          </div>
        </div>

        {/* Acordeão com <details> nativo: funciona com teclado e sem JavaScript. */}
        <div className="border-b border-line lg:col-span-7 lg:col-start-6">
          {faq.map((item, index) => (
            <details
              key={item.question}
              data-reveal
              style={stagger(index, 80)}
              className="faq-item group border-t border-line"
            >
              <summary className="flex min-h-16 items-center justify-between gap-6 py-5">
                <h3 className="font-display text-h3 font-medium text-forest">{item.question}</h3>
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest/25 text-forest transition-colors group-hover:border-forest"
                >
                  <PlusIcon className="faq-icon h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-2xl pr-4 pb-7 text-pretty text-ink-muted sm:pr-14">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import { LogoFrame } from '@/components/brand/Logo';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTA_LABEL, servicesIntro } from '@/data/content';
import { services } from '@/data/services';
import { stagger } from '@/lib/motion';

export function Services() {
  const published = services.filter((service) => service.published);

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="on-dark relative overflow-clip bg-forest pb-section text-ivory"
    >
      {/* Faixa decorativa: os nomes dos serviços correm de lado conforme a página rola. */}
      <div aria-hidden="true" className="overflow-x-clip border-b border-ivory/10 py-7 sm:py-9">
        <div className="marquee-track font-display flex w-max items-center gap-8 text-[clamp(2.75rem,8vw,6.5rem)] leading-none font-medium whitespace-nowrap text-[color-mix(in_srgb,var(--color-gold)_75%,var(--color-forest))] italic sm:gap-12">
          {[...published, ...published].map((service, index) => (
            <span key={`${service.id}-${index}`} className="flex items-center gap-8 sm:gap-12">
              {service.title}
              <span className="h-2 w-2 rotate-45 bg-gold/70" />
            </span>
          ))}
        </div>
      </div>

      {/* Ornamento da logo que gira devagar com a rolagem. */}
      <LogoFrame className="scroll-spin pointer-events-none absolute -right-24 -bottom-28 h-64 w-64 text-gold/10 sm:-right-40 sm:-bottom-44 sm:h-[30rem] sm:w-[30rem]" />

      <div className="relative mx-auto max-w-site px-gutter pt-section">
        <SectionHeading
          id="servicos-title"
          eyebrow={servicesIntro.eyebrow}
          title={servicesIntro.title}
          lead={servicesIntro.lead}
        />

        <ul
          className={`mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 ${
            published.length === 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'
          }`}
        >
          {published.map((service, index) => (
            <li
              key={service.id}
              data-reveal
              style={stagger(index % 4, 130)}
              className="draw-line flex flex-col pt-7"
            >
              <span
                aria-hidden="true"
                className="font-display text-2xl leading-none font-medium text-gold-light italic"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-h3 mt-5 font-medium">{service.title}</h3>
              <p className="mt-3 flex-1 text-pretty text-sage">{service.description}</p>
              {/* O formulário de contato lê `data-event-type` e já seleciona o tipo de evento. */}
              <a
                href="/#contato"
                data-event-type={service.eventType}
                aria-label={`${CTA_LABEL}: ${service.title}`}
                className="group mt-6 inline-flex min-h-11 items-center gap-3 self-start text-[0.8125rem] font-semibold tracking-[0.14em] text-gold-light uppercase transition-colors hover:text-ivory"
              >
                {CTA_LABEL}
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 ease-soft group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

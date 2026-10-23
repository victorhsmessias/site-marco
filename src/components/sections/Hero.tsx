import type { CSSProperties } from 'react';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { PhotoCreditLine } from '@/components/ui/PhotoCreditLine';
import { Picture } from '@/components/ui/Picture';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { CTA_LABEL, hero } from '@/data/content';
import { images } from '@/data/portfolio';

const rise = (delay: number) => ({ '--rise-delay': `${delay}ms` }) as CSSProperties;

/**
 * Hero editorial dividido: texto à esquerda e foto vertical à direita, com uma
 * segunda foto menor sobreposta. No celular o texto vem primeiro e as fotos logo
 * abaixo. As fotos são verticais, por isso nada de faixa horizontal em tela cheia.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-x-clip pt-[calc(var(--header-h)+2rem)] pb-20 lg:pt-[calc(var(--header-h)+3rem)] lg:pb-28"
    >
      <div className="mx-auto grid max-w-site gap-14 px-gutter lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-6">
          <p className="eyebrow hero-rise">{hero.eyebrow}</p>

          <h1
            id="hero-title"
            className="font-display text-display hero-rise mt-6 font-medium text-balance text-forest"
            style={rise(80)}
          >
            {hero.title}{' '}
            <em className="text-gold-deep italic">{hero.titleEmphasis}</em>
            <span aria-hidden="true" className="text-gold">
              .
            </span>
          </h1>

          <p
            className="text-lead hero-rise mt-7 max-w-[34rem] text-pretty text-ink-muted"
            style={rise(160)}
          >
            {hero.lead}
          </p>

          <div
            data-fab-hide
            className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={rise(240)}
          >
            <WhatsAppLink location="hero" className="btn btn-primary">
              {CTA_LABEL}
            </WhatsAppLink>
            <a href={hero.secondaryCta.href} className="btn btn-outline">
              {hero.secondaryCta.label}
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>

          <ul
            className="hero-rise mt-12 flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-line pt-6 text-xs font-medium tracking-[0.14em] text-ink-muted uppercase"
            style={rise(320)}
          >
            {hero.proof.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-6 lg:col-start-7 lg:mr-0 lg:max-w-none xl:col-span-5 xl:col-start-8">
          <figure className="relative ml-auto w-[84%]">
            {/* Ao rolar, a foto sobe e o arco dourado fica um pouco para trás. */}
            <div className="parallax-up">
              <div className="relative">
                <div aria-hidden="true" className="parallax-soft absolute inset-0">
                  <div className="h-full w-full translate-x-3 -translate-y-3 rounded-t-full border border-gold/70 sm:translate-x-4 sm:-translate-y-4" />
                </div>
                <Picture
                  image={images.casalClose}
                  priority
                  sizes="(min-width: 1280px) 430px, (min-width: 1024px) 40vw, (min-width: 640px) 460px, 76vw"
                  className="relative block aspect-[4/5] overflow-hidden rounded-t-full bg-sand"
                  imgClassName="hero-zoom h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-right">
                <PhotoCreditLine credit={images.casalClose.credit} />
              </figcaption>
            </div>
          </figure>

          <div className="parallax-down absolute bottom-[4%] left-0 w-[38%]">
            <Picture
              image={images.mesaCoposDeLeite}
              sizes="(min-width: 1024px) 200px, (min-width: 640px) 200px, 34vw"
              className="hero-rise block aspect-[3/4] overflow-hidden bg-sand shadow-[0_24px_48px_-24px_rgb(22_41_31/0.45)] ring-[6px] ring-ivory"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

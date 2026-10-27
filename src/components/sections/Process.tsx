import { Picture } from '@/components/ui/Picture';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processIntro } from '@/data/content';
import { images } from '@/data/portfolio';
import { processSteps } from '@/data/process';
import { stagger } from '@/lib/motion';

export function Process() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="py-section">
      <div className="mx-auto grid max-w-site gap-14 px-gutter lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <SectionHeading
            id="como-funciona-title"
            eyebrow={processIntro.eyebrow}
            title={processIntro.title}
            lead={processIntro.lead}
          />

          <ol className="mt-12 border-b border-gold/60">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                data-reveal="right"
                style={stagger(index % 2, 90)}
                className="draw-line grid grid-cols-[3rem_1fr] gap-x-4 py-7 sm:grid-cols-[4.5rem_1fr]"
              >
                <span
                  aria-hidden="true"
                  className="font-display pt-0.5 text-[1.75rem] leading-none font-medium text-gold-deep italic"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-h3 font-medium text-forest">{step.title}</h3>
                  <p className="mt-2 max-w-lg text-pretty text-ink-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="mx-auto w-full max-w-[30rem] lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-start">
          <div data-reveal="image">
            <Picture
              image={images.processoVelas}
              sizes="(min-width: 1280px) 490px, (min-width: 1024px) 40vw, (min-width: 640px) 480px, 90vw"
              className="block aspect-[4/5] overflow-hidden bg-sand"
              imgClassName="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-xs tracking-wide text-ink-muted">
            {processIntro.photoCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

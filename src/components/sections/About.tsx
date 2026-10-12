import { PhotoCreditLine } from '@/components/ui/PhotoCreditLine';
import { Picture } from '@/components/ui/Picture';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { about } from '@/data/content';
import { images } from '@/data/portfolio';
import { stagger } from '@/lib/motion';

export function About() {
  const photo = images.casalLoiroDecoracao;

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="bg-sand py-section">
      <div className="mx-auto max-w-site px-gutter">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <figure className="mx-auto w-full max-w-[30rem] lg:col-span-5 lg:max-w-none">
            <div data-reveal="image">
              <Picture
                image={photo}
                sizes="(min-width: 1280px) 490px, (min-width: 1024px) 40vw, (min-width: 640px) 480px, 90vw"
                className="block aspect-[4/5] overflow-clip bg-line"
                imgClassName="img-parallax h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <PhotoCreditLine credit={photo.credit} />
            </figcaption>
          </figure>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHeading id="sobre-title" eyebrow={about.eyebrow} title={about.title} />

            <div className="mt-7 space-y-5 text-pretty text-ink-muted" data-reveal style={stagger(2, 120)}>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {about.rankingClaim.show && <p>{about.rankingClaim.text}</p>}
            </div>

            <blockquote
              className="font-display text-quote mt-10 border-l border-gold pl-6 font-medium text-pretty text-forest italic sm:pl-8"
              data-reveal="left"
            >
              <p>{about.quote}</p>
            </blockquote>
          </div>
        </div>

        <ul className="mt-16 grid gap-10 border-t border-line pt-12 sm:grid-cols-3 sm:gap-8 lg:mt-24 lg:pt-14">
          {about.values.map((value, index) => (
            <li
              key={value.title}
              data-reveal
              style={stagger(index, 140)}
            >
              <h3 className="font-display text-h3 font-medium text-forest">{value.title}</h3>
              <p className="mt-3 max-w-sm text-pretty text-ink-muted">{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

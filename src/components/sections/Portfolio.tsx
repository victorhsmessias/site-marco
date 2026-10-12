import { ArrowUpRightIcon } from '@/components/ui/Icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { portfolioIntro } from '@/data/content';
import { portfolio, portfolioCategories } from '@/data/portfolio';
import { site } from '@/lib/site';
import { PortfolioGallery } from './PortfolioGallery';

export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="bg-sand py-section">
      <div className="mx-auto max-w-site px-gutter">
        <SectionHeading
          id="portfolio-title"
          eyebrow={portfolioIntro.eyebrow}
          title={portfolioIntro.title}
          lead={portfolioIntro.lead}
        />

        <PortfolioGallery items={portfolio} categories={portfolioCategories} />

        <p className="mt-12 flex justify-center lg:mt-16">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            {portfolioIntro.instagramCta}
            <ArrowUpRightIcon className="h-4 w-4" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </p>
      </div>
    </section>
  );
}

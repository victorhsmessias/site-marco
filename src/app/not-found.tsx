import type { Metadata } from 'next';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { CTA_LABEL } from '@/data/content';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-site flex-col items-start justify-center px-gutter pt-[calc(var(--header-h)+3rem)] pb-24">
      <p className="eyebrow">Erro 404</p>
      <h1 className="font-display text-h2 mt-5 font-medium text-balance text-forest">
        Não encontramos esta página
      </h1>
      <p className="text-lead mt-5 max-w-xl text-ink-muted">
        O endereço pode ter mudado ou não existe mais. Volte para o início ou fale com a gente.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <a href="/" className="btn btn-primary">
          Voltar para o início
        </a>
        <WhatsAppLink location="not_found" className="btn btn-outline">
          {CTA_LABEL}
        </WhatsAppLink>
      </div>
    </section>
  );
}

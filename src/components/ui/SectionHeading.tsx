import { stagger } from '@/lib/motion';

type SectionHeadingProps = {
  /** `id` do título, para o `aria-labelledby` da seção. */
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
};

/**
 * Cabeçalho padrão de seção: rótulo, título (h2) e linha de apoio.
 * Entram em cascata quando a seção aparece na tela.
 */
export function SectionHeading({ id, eyebrow, title, lead, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="eyebrow" data-reveal="fade">
        {eyebrow}
      </p>
      <h2
        id={id}
        data-reveal="title"
        style={stagger(1, 120)}
        className="font-display text-h2 mt-5 font-medium text-balance text-forest in-[.on-dark]:text-ivory"
      >
        {title}
      </h2>
      {lead && (
        <p
          data-reveal
          style={stagger(2, 120)}
          className="text-lead mt-5 max-w-xl text-pretty text-ink-muted in-[.on-dark]:text-sage"
        >
          {lead}
        </p>
      )}
    </div>
  );
}

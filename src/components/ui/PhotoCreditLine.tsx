import type { PhotoCredit } from '@/data/portfolio';

type PhotoCreditLineProps = {
  credit: PhotoCredit | null;
  className?: string;
};

/** Endereço do perfil no Instagram a partir do @. */
export const instagramProfileUrl = (handle: string) =>
  `https://www.instagram.com/${handle.replace(/^@/, '')}/`;

/** Crédito da foto ("Foto: @perfil"). Não mostra nada enquanto o crédito não estiver confirmado. */
export function PhotoCreditLine({ credit, className = '' }: PhotoCreditLineProps) {
  if (!credit) return null;

  return (
    <span
      className={`text-xs tracking-wide text-ink-muted in-[.on-dark]:text-sage ${className}`}
    >
      {credit.role}:{' '}
      <a
        href={instagramProfileUrl(credit.handle)}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-gold decoration-1 underline-offset-4 hover:decoration-current"
      >
        {credit.handle}
        <span className="sr-only"> no Instagram (abre em nova aba)</span>
      </a>
    </span>
  );
}

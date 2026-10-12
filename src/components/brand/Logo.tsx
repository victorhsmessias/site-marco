import { logoMark, logoWordmark } from './logo-paths';

const MARK_ID = 'mb-logo-mark';
const FRAME_ID = 'mb-logo-frame';
const WORDMARK_ID = 'mb-logo-wordmark';

/**
 * Traçados da logo, declarados uma única vez na página. Os componentes abaixo
 * apenas os referenciam, então repetir a logo (cabeçalho, menu, rodapé) não
 * aumenta o HTML. A cor vem do texto ao redor (`currentColor`).
 */
export function LogoSprite() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <symbol id={FRAME_ID} viewBox={logoMark.viewBox}>
        <path d={logoMark.frame} />
      </symbol>
      <symbol id={MARK_ID} viewBox={logoMark.viewBox}>
        <use href={`#${FRAME_ID}`} />
        <path d={logoMark.letter} />
      </symbol>
      <symbol id={WORDMARK_ID} viewBox={logoWordmark.viewBox}>
        <path fillRule="evenodd" d={logoWordmark.path} />
      </symbol>
    </svg>
  );
}

type LogoProps = { className?: string };

/** Monograma "M" com a moldura circular ornamental. */
export function LogoMark({ className }: LogoProps) {
  return (
    <svg
      viewBox={logoMark.viewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <use href={`#${MARK_ID}`} />
    </svg>
  );
}

/** Só a moldura circular ornamental, sem o "M". Usada como ornamento de fundo. */
export function LogoFrame({ className }: LogoProps) {
  return (
    <svg
      viewBox={logoMark.viewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <use href={`#${FRAME_ID}`} />
    </svg>
  );
}

/** Marca "MARCO BISPO" em letras. */
export function LogoWordmark({ className }: LogoProps) {
  return (
    <svg
      viewBox={logoWordmark.viewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <use href={`#${WORDMARK_ID}`} />
    </svg>
  );
}

/** Assinatura completa: monograma + "MARCO BISPO" + "assessoria". Decorativa: o link em volta leva o nome acessível. */
export function LogoLockup({ className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0 lg:h-11 lg:w-11" />
      <span className="flex flex-col gap-1.5">
        <LogoWordmark className="h-[0.8125rem] w-auto lg:h-[0.9375rem]" />
        <span
          aria-hidden="true"
          className="text-[0.5625rem] leading-none font-medium tracking-[0.42em] uppercase opacity-80"
        >
          Assessoria
        </span>
      </span>
    </span>
  );
}

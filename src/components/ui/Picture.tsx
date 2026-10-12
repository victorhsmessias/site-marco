import type { CSSProperties } from 'react';
import { preload } from 'react-dom';
import type { PortfolioImage } from '@/data/portfolio';
import { imageSources } from '@/lib/images';

type PictureProps = {
  image: PortfolioImage;
  /** Largura que a foto ocupa na tela em cada ponto de quebra (atributo `sizes`). */
  sizes: string;
  /** Use apenas na imagem do LCP: carrega antes de tudo, com prioridade alta. */
  priority?: boolean;
  /** Classes do elemento `<picture>` (a moldura: proporção, bordas, recorte). */
  className?: string;
  /** Classes do `<img>`. */
  imgClassName?: string;
  imgStyle?: CSSProperties;
  /** Fundo borrado enquanto a foto carrega. */
  placeholder?: boolean;
  /** Substitui o texto alternativo padrão da foto (use "" se for decorativa). */
  alt?: string;
};

/**
 * Foto responsiva em AVIF e WebP, com JPEG de reserva.
 *
 * Substitui o `next/image`: em exportação estática o otimizador do Next não
 * roda, então as versões são geradas antes do build (`npm run images`) e este
 * componente monta o `srcset` só com tamanhos que existem de fato, sem nunca
 * ampliar uma foto além do original.
 */
export function Picture({
  image,
  sizes,
  priority = false,
  className,
  imgClassName,
  imgStyle,
  placeholder = true,
  alt,
}: PictureProps) {
  const sources = imageSources(image);

  if (priority) {
    preload(sources.fallback, {
      as: 'image',
      type: 'image/avif',
      imageSrcSet: sources.avif,
      imageSizes: sizes,
      fetchPriority: 'high',
    });
  }

  return (
    <picture
      className={className}
      style={
        placeholder
          ? { backgroundImage: `url(${sources.placeholder})`, backgroundSize: 'cover' }
          : undefined
      }
    >
      <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
      <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
      <img
        src={sources.fallback}
        width={sources.width}
        height={sources.height}
        alt={alt ?? image.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        className={imgClassName}
        style={{ objectPosition: image.position, ...imgStyle }}
      />
    </picture>
  );
}

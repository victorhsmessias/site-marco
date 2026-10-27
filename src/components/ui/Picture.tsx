import type { CSSProperties } from 'react';
import { preload } from 'react-dom';
import type { PortfolioImage } from '@/data/portfolio';
import { imageSources } from '@/lib/images';

type PictureProps = {
  image: PortfolioImage;
  sizes: string;
  priority?: boolean;
  eager?: boolean;
  className?: string;
  imgClassName?: string;
  imgStyle?: CSSProperties;
  placeholder?: boolean;
  alt?: string;
};

export function Picture({
  image,
  sizes,
  priority = false,
  eager = false,
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
        loading={priority || eager ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        className={imgClassName}
        style={{ objectPosition: image.position, ...imgStyle }}
      />
    </picture>
  );
}

import manifest from '@/data/images.generated.json';
import type { PortfolioImage } from '@/data/portfolio';

type ManifestEntry = {
  width: number;
  height: number;
  widths: number[];
  fallbackWidth: number;
  placeholder: string;
};

const entries: Record<string, ManifestEntry> = manifest;
const BASE_PATH = '/images/portfolio';

/** Endereços das versões otimizadas de uma foto (geradas por `npm run images`). */
export function imageSources(image: PortfolioImage) {
  const entry = entries[image.id];
  if (!entry) {
    throw new Error(
      `A foto "${image.id}" não tem versões otimizadas. Rode "npm run images".`,
    );
  }

  const srcSet = (ext: 'avif' | 'webp') =>
    entry.widths.map((w) => `${BASE_PATH}/${image.id}-${w}.${ext} ${w}w`).join(', ');

  return {
    avif: srcSet('avif'),
    webp: srcSet('webp'),
    fallback: `${BASE_PATH}/${image.id}-${entry.fallbackWidth}.jpg`,
    placeholder: entry.placeholder,
    width: entry.width,
    height: entry.height,
  };
}

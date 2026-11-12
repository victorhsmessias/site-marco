import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Data da última mudança de conteúdo de cada página (AAAA-MM-DD). Atualize à mão
 * quando o texto mudar: se a data mudasse a cada build, o Google passaria a
 * ignorar o `lastmod`.
 */
const LAST_UPDATED = {
  home: '2026-11-12',
  privacy: '2026-10-12',
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      lastModified: LAST_UPDATED.home,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${site.url}/politica-de-privacidade/`,
      lastModified: LAST_UPDATED.privacy,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}

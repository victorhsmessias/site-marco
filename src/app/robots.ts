import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Robôs de busca, inclusive os de busca por IA, ficam liberados de forma
 * explícita. O `*` cobre os demais.
 *
 * Enquanto o site estiver no endereço temporário (*.vercel.app), quem impede a
 * indexação é o cabeçalho `X-Robots-Tag: noindex` em `vercel.json`. O robots.txt
 * continua liberado de propósito: se bloqueasse, os robôs não leriam o noindex.
 */
const SEARCH_BOTS = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: '/' })),
      { userAgent: '*', allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}

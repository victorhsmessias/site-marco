import type { Metadata } from 'next';
import { site } from './site';

/**
 * Textos de busca e de compartilhamento. O title vem primeiro com o serviço e a
 * cidade (o que a pessoa busca) e depois a marca. A description fica com até
 * ~155 caracteres, o tamanho que o Google costuma mostrar inteiro.
 */
export const seo = {
  title: `Assessoria de Casamento e Eventos em Londrina | ${site.shortName}`,
  description:
    'Assessoria de casamentos, festas de 15 anos, aniversários e eventos corporativos em Londrina/PR desde 2014. Planejamento, organização e cerimonial.',
  ogImage: {
    url: '/og.jpg',
    width: 1200,
    height: 630,
    alt: `Logo da ${site.name} ao lado de uma noiva sorridente com buquê de copos-de-leite`,
  },
};

/**
 * Open Graph e Twitter completos para uma página. O Next não mescla o
 * `openGraph` de uma página com o do layout (a página substitui tudo), então
 * cada página monta o seu a partir daqui para não perder imagem, nome do site e
 * idioma.
 */
export function socialMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type: 'website',
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
      images: [seo.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [seo.ogImage.url],
    },
  };
}

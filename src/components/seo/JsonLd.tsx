import { faq } from '@/data/faq';
import { images } from '@/data/portfolio';
import { services } from '@/data/services';
import { imageSources } from '@/lib/images';
import { site } from '@/lib/site';

/**
 * Dados estruturados (schema.org, JSON-LD). Regra: só informações que aparecem
 * na página. Campos ainda não confirmados (horário, e-mail, coordenadas) entram
 * sozinhos quando forem preenchidos em `src/lib/site.ts`.
 */

const BUSINESS_ID = `${site.url}/#empresa`;
const WEBSITE_ID = `${site.url}/#site`;

function JsonLdScript({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }}
    />
  );
}

/** Empresa e site. Vai em todas as páginas (pelo layout). */
export function JsonLd() {
  const { address } = site;

  const business = {
    // schema.org não tem um tipo "assessoria de eventos"; LocalBusiness é o mais próximo.
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    url: `${site.url}/`,
    logo: `${site.url}/brand/logo.png`,
    image: [`${site.url}/og.jpg`, `${site.url}${imageSources(images.casalClose).fallback}`],
    telephone: site.phone.e164,
    ...(site.email ? { email: site.email } : {}),
    foundingDate: String(site.foundingYear),
    founder: { '@type': 'Person', name: 'Marco Bispo' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address.street}, ${address.complement}`,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    ...(site.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: site.geo.latitude,
            longitude: site.geo.longitude,
          },
        }
      : {}),
    hasMap: address.mapsUrl,
    areaServed: { '@type': 'City', name: `${site.city}, ${site.state}` },
    makesOffer: services
      .filter((service) => service.published)
      .map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      })),
    sameAs: [site.instagram.url],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${site.whatsapp.number}`,
      availableLanguage: 'Portuguese',
      url: `https://wa.me/${site.whatsapp.number}`,
    },
    ...(site.openingHours
      ? {
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: site.openingHours.days,
            opens: site.openingHours.opens,
            closes: site.openingHours.closes,
          },
        }
      : {}),
  };

  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: site.name,
    url: `${site.url}/`,
    inLanguage: 'pt-BR',
    publisher: { '@id': BUSINESS_ID },
  };

  return <JsonLdScript data={{ '@context': 'https://schema.org', '@graph': [business, website] }} />;
}

/**
 * Perguntas frequentes, a partir de `src/data/faq.ts`. Só na página inicial,
 * onde o FAQ aparece. O Google mostra resultado rico de FAQ apenas para sites de
 * governo e saúde; aqui a marcação serve para deixar claro o que é pergunta e
 * resposta (Bing e buscas por IA).
 */
export function FaqJsonLd() {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }}
    />
  );
}

/** Trilha de navegação (Início › página) para páginas internas. */
export function BreadcrumbJsonLd({ name, path }: { name: string; path: string }) {
  return (
    <JsonLdScript
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name, item: `${site.url}${path}` },
        ],
      }}
    />
  );
}

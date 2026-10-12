import { site } from '@/lib/site';

/**
 * Dados estruturados (schema.org) para SEO local: nome, endereço, telefone e
 * redes da empresa, no formato que o Google lê para o perfil do negócio.
 */
export function JsonLd() {
  const { address } = site;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.url}/#empresa`,
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    url: `${site.url}/`,
    image: `${site.url}/og.jpg`,
    logo: `${site.url}/brand/logo.png`,
    telephone: site.phone.e164,
    ...(site.email ? { email: site.email } : {}),
    foundingDate: String(site.foundingYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${address.street}, ${address.complement}`,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: { '@type': 'City', name: `${site.city}, ${site.state}` },
    sameAs: [site.instagram.url],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${site.whatsapp.number}`,
      availableLanguage: 'Portuguese',
      url: `https://wa.me/${site.whatsapp.number}`,
    },
    // TODO(content): horário de atendimento. Entra aqui sozinho quando
    // `site.openingHours` for preenchido em `src/lib/site.ts`.
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

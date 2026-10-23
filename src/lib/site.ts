/**
 * Dados da empresa usados em todo o site (contatos, endereço, redes, SEO).
 * Alterar aqui atualiza cabeçalho, rodapé, contato, metadados e dados estruturados.
 */

// TODO(content): confirmar número com o cliente. O link do site antigo aponta
// para (43) 98839-5494, mas o rodapé antigo mostrava "(43) 988395-4943", com um
// dígito a mais. Usamos o número do link.
export const WHATSAPP_NUMBER = '5543988395494';

export const site = {
  name: 'Marco Bispo Assessoria',
  shortName: 'Marco Bispo',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.marcobispo.com').replace(/\/$/, ''),
  locale: 'pt_BR',
  foundingYear: 2014,
  city: 'Londrina',
  state: 'PR',
  region: 'Londrina e região',
  tagline: 'Fazemos do seu dia um evento inesquecível.',
  description:
    'Assessoria de casamento e de eventos em Londrina/PR desde 2014. Planejamento, organização e cerimonial de casamentos, festas de 15 anos, aniversários e eventos corporativos, com cuidado em cada detalhe.',

  whatsapp: {
    number: WHATSAPP_NUMBER,
    display: '(43) 98839-5494',
    defaultMessage: 'Olá! Vim pelo site e gostaria de solicitar um orçamento.',
  },

  phone: {
    display: '(43) 3361-1633',
    href: 'tel:+554333611633',
    e164: '+55 43 3361-1633',
  },

  address: {
    street: 'Rua Piauí, 399',
    complement: 'Sala 706, Ed. São Paulo Towers',
    city: 'Londrina',
    state: 'PR',
    postalCode: '86010-420',
    country: 'BR',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Rua+Piau%C3%AD%2C+399+-+Ed.+S%C3%A3o+Paulo+Towers%2C+Londrina+-+PR%2C+86010-420',
  },

  instagram: {
    handle: '@marcobispoassessoria',
    url: 'https://www.instagram.com/marcobispoassessoria/',
  },

  // TODO(content): horário de atendimento. Enquanto estiver `null`, não aparece
  // no site nem nos dados estruturados. Exemplo de preenchimento:
  // { label: 'Segunda a sexta, das 9h às 18h', days: ['Monday', ...], opens: '09:00', closes: '18:00' }
  openingHours: null as {
    label: string;
    days: string[];
    opens: string;
    closes: string;
  } | null,

  // TODO(content): e-mail de contato (também usado na Política de Privacidade
  // como canal para pedidos sobre dados pessoais). `null` = não aparece.
  email: null as string | null,

  // TODO(content): razão social e CNPJ, para a Política de Privacidade. `null` = não aparece.
  legalName: null as string | null,
  cnpj: null as string | null,

  // TODO(content): crédito de quem desenvolveu o site, exibido no rodapé. `null` = não aparece.
  developerCredit: null as { label: string; url?: string } | null,
} as const;

/** Endereço em uma linha, para textos e leitores de tela. */
export const fullAddress = `${site.address.street}, ${site.address.complement}, ${site.address.city}/${site.address.state}, CEP ${site.address.postalCode}`;

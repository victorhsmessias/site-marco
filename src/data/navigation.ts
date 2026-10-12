import { publishedTestimonials } from './testimonials';

export type NavItem = {
  label: string;
  /** Âncora da seção na página inicial. */
  href: string;
  /** `id` da seção, usado para destacar o item enquanto a página rola. */
  sectionId: string;
};

const allItems: (NavItem & { hidden?: boolean })[] = [
  { label: 'Início', href: '/#inicio', sectionId: 'inicio' },
  { label: 'Sobre', href: '/#sobre', sectionId: 'sobre' },
  { label: 'Serviços', href: '/#servicos', sectionId: 'servicos' },
  { label: 'Como funciona', href: '/#como-funciona', sectionId: 'como-funciona' },
  { label: 'Portfólio', href: '/#portfolio', sectionId: 'portfolio' },
  {
    label: 'Depoimentos',
    href: '/#depoimentos',
    sectionId: 'depoimentos',
    // Entra no menu sozinho quando houver depoimentos reais publicados.
    hidden: publishedTestimonials.length === 0,
  },
  { label: 'Contato', href: '/#contato', sectionId: 'contato' },
];

/** Itens do menu, na mesma ordem das seções da página. */
export const navigation: NavItem[] = allItems
  .filter((item) => !item.hidden)
  .map(({ label, href, sectionId }) => ({ label, href, sectionId }));

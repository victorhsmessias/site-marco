export type Service = {
  id: string;
  title: string;
  description: string;
  /** Valor pré-selecionado em "Tipo de evento" no formulário de contato. */
  eventType: string;
  /** `false` = o cartão fica escondido no site até o conteúdo ser confirmado. */
  published: boolean;
};

export const services: Service[] = [
  {
    id: 'casamentos',
    title: 'Casamentos',
    description:
      'Assessoria de casamento em Londrina, do planejamento ao cerimonial, para que vocês vivam cada momento com tranquilidade.',
    eventType: 'Casamento',
    published: true,
  },
  {
    id: 'festas-de-15-anos',
    title: 'Festas de 15 anos',
    description:
      'Uma festa de 15 anos em Londrina com a personalidade da debutante, planejada com carinho em cada etapa.',
    eventType: 'Festa de 15 anos',
    published: true,
  },
  {
    id: 'decoracao-e-producao',
    title: 'Decoração e produção',
    description:
      'Ambientes, mesas e flores pensados em conjunto, para que o cenário traduza o estilo da sua celebração.',
    eventType: 'Decoração e produção',
    published: true,
  },
  {
    id: 'planejamento-e-gerenciamento',
    title: 'Planejamento e gerenciamento',
    description:
      'Organização, cronograma e coordenação do evento, para que tudo aconteça no tempo certo.',
    eventType: 'Outro evento',
    published: true,
  },
  // TODO(content): confirmar com o cliente se a empresa atende eventos
  // corporativos e outros eventos sociais e ajustar a descrição. Depois,
  // trocar para `published: true`.
  {
    id: 'eventos-corporativos-e-sociais',
    title: 'Eventos corporativos e sociais',
    description:
      'TODO(content): descrição a confirmar com o cliente (tipos de evento atendidos).',
    eventType: 'Outro evento',
    published: false,
  },
];

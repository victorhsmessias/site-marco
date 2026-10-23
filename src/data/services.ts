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
    id: 'aniversarios',
    title: 'Aniversários',
    description:
      'Aniversários em Londrina e região, organizados com cuidado para que você aproveite a festa ao lado de quem ama.',
    eventType: 'Aniversário',
    published: true,
  },
  {
    id: 'eventos-corporativos',
    title: 'Eventos corporativos',
    description:
      'Planejamento e coordenação de eventos corporativos, com organização e pontualidade em cada etapa.',
    eventType: 'Evento corporativo',
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
];

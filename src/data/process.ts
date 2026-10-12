export type ProcessStep = {
  title: string;
  description: string;
};

// TODO(content): revisar com o cliente se as etapas descrevem bem o processo
// real da empresa, em especial o que acontece no pós-evento.
export const processSteps: ProcessStep[] = [
  {
    title: 'Conversa e briefing',
    description:
      'Começamos ouvindo você: a data, o estilo, os sonhos e as prioridades do seu evento.',
  },
  {
    title: 'Proposta',
    description:
      'A partir dessa conversa, preparamos uma proposta personalizada para o que você imagina.',
  },
  {
    title: 'Planejamento',
    description:
      'Organizamos as etapas e os detalhes com você, acompanhando cada decisão de perto.',
  },
  {
    title: 'Execução no grande dia',
    description:
      'Nossa equipe coordena o evento para que você e seus convidados só precisem aproveitar.',
  },
  {
    title: 'Pós-evento',
    description:
      'Encerramos juntos, cuidando dos últimos detalhes depois da festa.',
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

// TODO(content): as respostas abaixo são genéricas de propósito. Cada TODO indica
// o que depende de política da empresa e precisa ser confirmado antes de publicar.
export const faq: FaqItem[] = [
  {
    question: 'Como funciona o orçamento?',
    // TODO(content): confirmar prazo de resposta e se a primeira conversa tem custo.
    answer:
      'Você nos conta sobre o evento pelo WhatsApp ou pelo formulário desta página: data prevista, local, número aproximado de convidados e o que imagina para o dia. A partir dessa conversa, preparamos uma proposta personalizada.',
  },
  {
    question: 'Vocês atendem fora de Londrina?',
    // TODO(content): confirmar cidades atendidas e condições de deslocamento.
    answer:
      'Atendemos Londrina e região. Se o seu evento for em outra cidade, fale com a gente para verificarmos a disponibilidade.',
  },
  {
    question: 'Com quanta antecedência devo contratar a assessoria?',
    // TODO(content): confirmar antecedência mínima e recomendada.
    answer:
      'Quanto antes, melhor: começar cedo dá mais tranquilidade para planejar cada etapa, e a agenda de cada data é limitada. Entre em contato para consultar a disponibilidade do seu dia.',
  },
  {
    question: 'Quais tipos de evento vocês realizam?',
    answer:
      'Trabalhamos com planejamento, organização e gerenciamento de casamentos, festas de 15 anos, aniversários e eventos corporativos. Para outros tipos de evento, converse com a nossa equipe.',
  },
  {
    question: 'A equipe acompanha o dia do evento?',
    // TODO(content): confirmar o escopo do acompanhamento no dia (equipe, horários).
    answer:
      'Sim. O gerenciamento do evento faz parte do nosso trabalho: no grande dia, a equipe coordena o que foi planejado para que você possa aproveitar. Os detalhes do acompanhamento são definidos na proposta.',
  },
  {
    question: 'Onde fica o escritório e como agendo um atendimento?',
    // TODO(content): confirmar horário de atendimento e se é necessário agendar.
    answer:
      'Nosso escritório fica na Rua Piauí, 399, Sala 706, Ed. São Paulo Towers, em Londrina/PR. Para agendar um atendimento, chame no WhatsApp ou ligue para (43) 3361-1633.',
  },
];

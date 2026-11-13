import { site } from '@/lib/site';

export type FaqItem = {
  question: string;
  answer: string;
};

// Respostas confirmadas pelo cliente em 12/11/2026. Também viram o FAQPage dos
// dados estruturados (src/components/seo/JsonLd.tsx).
export const faq: FaqItem[] = [
  {
    question: 'Como funciona o orçamento?',
    answer:
      'Você nos conta sobre o evento pelo WhatsApp ou pelo formulário desta página: data prevista, local, número aproximado de convidados e o que imagina para o dia. A partir dessa conversa, preparamos uma proposta personalizada.',
  },
  {
    question: 'Vocês atendem fora de Londrina?',
    answer:
      'Atendemos Londrina e região. Se o seu evento for em outra cidade, fale com a gente para verificarmos a disponibilidade.',
  },
  {
    question: 'Com quanta antecedência devo contratar a assessoria?',
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
    answer:
      'Sim. O gerenciamento do evento faz parte do nosso trabalho: no grande dia, a equipe coordena o que foi planejado para que você possa aproveitar. Os detalhes do acompanhamento são definidos na proposta.',
  },
  {
    question: 'Onde fica o escritório e como agendo um atendimento?',
    // Endereço e telefone vêm de `site.ts`, para nunca divergirem do resto do site.
    answer: `Nosso escritório fica na ${site.address.street}, ${site.address.complement}, em ${site.address.city}/${site.address.state}. Para agendar um atendimento, chame no WhatsApp ou ligue para ${site.phone.display}.`,
  },
];

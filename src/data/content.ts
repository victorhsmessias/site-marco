/**
 * Textos principais das seções. Edite aqui para mudar o que aparece no site,
 * sem mexer nos componentes.
 *
 * Regra: só fatos confirmados pelo cliente. O que depende de confirmação está
 * marcado com TODO(content) e listado em CONTENT_TODO.md.
 */

export const hero = {
  eyebrow: 'Assessoria de eventos em Londrina',
  // A palavra em `titleEmphasis` aparece em itálico dourado, no fim do título.
  title: 'Fazemos do seu dia um evento',
  titleEmphasis: 'inesquecível',
  lead: 'Planejamento, organização e cerimonial de casamentos, festas de 15 anos, aniversários e eventos corporativos em Londrina e região, com cuidado em cada detalhe.',
  secondaryCta: { label: 'Ver portfólio', href: '/#portfolio' },
  proof: ['Desde 2014', 'Londrina e região', 'Casamentos, festas e eventos corporativos'],
};

export const about = {
  eyebrow: 'Sobre',
  title: 'Somos uma empresa que respira amor',
  paragraphs: [
    'A Marco Bispo Assessoria nasceu em 2014, em Londrina. Com muito trabalho, conquistamos nosso espaço na cidade e na região, cuidando de casamentos, festas de 15 anos, aniversários e eventos corporativos que marcam a vida de quem confia na gente.',
    'Como assessoria de eventos em Londrina, acompanhamos cada etapa de perto: planejamento, organização e gerenciamento, para que você aproveite o caminho com tranquilidade.',
  ],
  // TODO(content): afirmação do cliente, sem fonte ("entre as 5 melhores empresas
  // de assessoria da cidade"). Confirmar a origem (prêmio, ranking, ano) ou
  // desligar com `show: false`.
  rankingClaim: {
    show: true,
    text: 'Hoje estamos entre as 5 melhores empresas de assessoria da cidade.',
  },
  quote:
    'Nosso compromisso é transcender expectativas, envolvendo cada detalhe com um toque de excelência, para que sua história seja contada em eventos eternamente marcantes.',
  values: [
    {
      title: 'Amor pelo que fazemos',
      text: 'Cada evento é tratado como único, porque a história que ele celebra também é.',
    },
    {
      title: 'Atenção ao detalhe',
      text: 'Da primeira conversa à última vela acesa, nada fica ao acaso.',
    },
    {
      title: 'Excelência na entrega',
      text: 'Planejamento cuidadoso para que o grande dia aconteça com leveza.',
    },
  ],
};

export const servicesIntro = {
  eyebrow: 'Serviços',
  title: 'Do primeiro plano ao grande dia',
  lead: 'Assessoria completa para celebrar o que importa, em Londrina e região.',
};

export const processIntro = {
  eyebrow: 'Como funciona',
  title: 'Um caminho claro, da primeira conversa ao pós-evento',
  lead: 'Você sabe o que acontece em cada etapa e conta com a nossa equipe em todas elas.',
  // TODO(content): confirmar quem aparece na foto desta seção (ver CONTENT_TODO.md).
  photoCaption: 'Bastidores de uma cerimônia',
};

export const portfolioIntro = {
  eyebrow: 'Portfólio',
  title: 'Histórias que ajudamos a contar',
  lead: 'Alguns momentos e detalhes de eventos que tivemos a alegria de acompanhar.',
  instagramCta: 'Ver mais no Instagram',
};

export const testimonialsIntro = {
  eyebrow: 'Depoimentos',
  title: 'O que dizem os nossos clientes',
};

export const faqIntro = {
  eyebrow: 'Perguntas frequentes',
  title: 'Antes de conversarmos',
  lead: 'Não encontrou o que procurava? Fale com a gente pelo WhatsApp.',
};

export const contact = {
  eyebrow: 'Contato',
  title: 'Vamos conversar sobre o seu evento?',
  lead: 'Conte um pouco sobre o que você imagina. Ao enviar, o WhatsApp abre com a sua mensagem pronta, e a conversa continua por lá.',
  formTitle: 'Peça o seu orçamento',
  privacyNote:
    'Os dados preenchidos servem apenas para montar a mensagem no seu WhatsApp. Este site não guarda as informações do formulário.',
  eventTypes: ['Casamento', 'Festa de 15 anos', 'Aniversário', 'Evento corporativo', 'Outro evento'],
};

/** Texto único de chamada para ação, usado em todos os botões de orçamento. */
export const CTA_LABEL = 'Solicitar orçamento';

/**
 * Fotos do site.
 *
 * Para adicionar ou trocar uma foto:
 *   1. coloque o arquivo original em `assets-originais/` (nome `marcobispo-NN-descricao.jpg`);
 *   2. acrescente ou edite a entrada abaixo (largura e altura do arquivo original);
 *   3. rode `npm run images` para gerar as versões otimizadas.
 *
 * TODO(content): estas imagens vieram do Instagram e servem só para a versão de
 * apresentação. Antes de publicar, obter os arquivos originais e a autorização de
 * uso dos fotógrafos e dos casais (ver CONTENT_TODO.md).
 */

export type PortfolioCategory =
  | 'casamentos'
  | 'festas-de-15-anos'
  | 'aniversarios'
  | 'eventos-corporativos';

export type PhotoCredit = {
  /** O que a pessoa creditada fez: fotografia ou decoração. */
  role: 'Foto' | 'Decoração';
  /** Perfil no Instagram, com @. */
  handle: string;
};

export type PortfolioImage = {
  /** Identificador usado no nome dos arquivos gerados em `public/images/portfolio/`. */
  id: string;
  /** Arquivo original em `assets-originais/`. */
  file: string;
  /** Tipos de evento da foto. Vazio = aparece só em "Todos". */
  categories: PortfolioCategory[];
  /** Texto alternativo: descreve a cena, sem citar nomes. */
  alt: string;
  /** `null` = crédito ainda não confirmado (não aparece no site). */
  credit: PhotoCredit | null;
  /** Largura e altura do arquivo original, em pixels. */
  width: number;
  height: number;
  /** Ponto de foco quando a foto é recortada (CSS `object-position`). */
  position?: string;
  /** Proporção do recorte na galeria. No lightbox a foto aparece inteira. */
  galleryRatio?: '3 / 4' | '4 / 5' | '1 / 1' | '4 / 3';
};

export const portfolioCategories: { id: PortfolioCategory; label: string }[] = [
  { id: 'casamentos', label: 'Casamentos' },
  // Um filtro por tipo de evento atendido, mesmo sem fotos ainda: nesse caso a
  // galeria mostra um aviso com o link do Instagram.
  { id: 'festas-de-15-anos', label: 'Festas de 15 anos' },
  { id: 'aniversarios', label: 'Aniversários' },
  { id: 'eventos-corporativos', label: 'Eventos corporativos' },
];

export const images = {
  noivaNoCarro: {
    id: '01-noiva-no-carro',
    file: 'marcobispo-01-noiva-no-carro.jpg',
    categories: ['casamentos'],
    alt: 'Noiva sorridente, de véu rendado e buquê de copos-de-leite, sentada no banco de trás de um carro com a porta aberta',
    credit: { role: 'Foto', handle: '@baroes.wedding' },
    width: 3016,
    height: 4021,
    position: '58% 38%',
    galleryRatio: '3 / 4',
  },
  casalFundoVerde: {
    id: '02-casal-fundo-verde',
    file: 'marcobispo-02-casal-fundo-verde.jpg',
    categories: ['casamentos'],
    alt: 'Casal de noivos troca olhares diante de uma cortina de veludo verde; ela usa vestido tomara que caia e tiara, ele veste terno azul-marinho',
    credit: { role: 'Foto', handle: '@soulsidefotografia' },
    width: 900,
    height: 1200,
    position: '50% 35%',
    galleryRatio: '4 / 5',
  },
  casalCoposDeLeite: {
    id: '03-casal-copos-de-leite',
    file: 'marcobispo-03-casal-copos-de-leite.jpg',
    categories: ['casamentos'],
    alt: 'Noivo de terno claro abraça a noiva, que sorri de olhos fechados segurando um buquê de copos-de-leite',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1284,
    height: 1712,
    position: '50% 40%',
    galleryRatio: '3 / 4',
  },
  casalPretoEBranco: {
    id: '04-casal-preto-e-branco',
    file: 'marcobispo-04-casal-preto-e-branco.jpg',
    categories: ['casamentos'],
    alt: 'Retrato em preto e branco de um casal de noivos se olhando diante de uma cortina',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1284,
    height: 1712,
    position: '50% 35%',
    galleryRatio: '4 / 5',
  },
  noivaSofaCapitone: {
    id: '05-noiva-sofa-capitone',
    file: 'marcobispo-05-noiva-sofa-capitone.jpg',
    categories: ['casamentos'],
    alt: 'Noiva de tiara sentada em um sofá capitonê claro, diante de uma parede verde-escura com quadros de moldura dourada',
    credit: { role: 'Foto', handle: '@soulsidefotografia' },
    width: 900,
    height: 1200,
    position: '50% 60%',
    galleryRatio: '3 / 4',
  },
  casalLoiroDecoracao: {
    id: '06-casal-loiro-decoracao',
    file: 'marcobispo-06-casal-loiro-decoracao.jpg',
    categories: ['casamentos'],
    alt: 'Noiva de véu sorri ao lado do noivo, de terno claro e gravata-borboleta, junto à mesa do bolo decorada com velas e copos-de-leite',
    credit: { role: 'Foto', handle: '@fotografiadubau' },
    width: 3072,
    height: 4096,
    position: '50% 40%',
    galleryRatio: '4 / 5',
  },
  casalBolo: {
    id: '07-casal-bolo',
    file: 'marcobispo-07-casal-bolo.jpg',
    categories: ['casamentos'],
    alt: 'Casal de noivos posa ao lado do bolo de casamento, em um salão decorado com velas e arranjos de copos-de-leite',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 3072,
    height: 4096,
    position: '50% 35%',
    galleryRatio: '3 / 4',
  },
  casalClose: {
    id: '08-casal-close',
    file: 'marcobispo-08-casal-close.jpg',
    categories: ['casamentos'],
    alt: 'Noivo de terno claro beija o rosto da noiva, que segura um buquê branco, em um salão com mesas postas',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 3024,
    height: 4032,
    position: '50% 30%',
    galleryRatio: '1 / 1',
  },
  mesaCoposDeLeite: {
    id: '09-mesa-doces-copos-de-leite',
    file: 'marcobispo-09-mesa-doces-copos-de-leite.jpg',
    // TODO(content): confirmar de que tipo de evento é esta mesa de doces.
    categories: [],
    alt: 'Mesa de doces em madeira clara com arranjos altos de copos-de-leite, velas e bandejas espelhadas',
    credit: { role: 'Decoração', handle: '@cristallolocacoes' },
    width: 3024,
    height: 4032,
    position: '50% 55%',
    galleryRatio: '3 / 4',
  },
  mesaJardimColorido: {
    id: '10-mesa-doces-jardim-colorido',
    file: 'marcobispo-10-mesa-doces-jardim-colorido.jpg',
    // TODO(content): confirmar de que tipo de evento é esta mesa de doces.
    categories: [],
    alt: 'Mesa de doces montada como um jardim, com flores coloridas, musgo e luminárias verdes de franjas',
    credit: null, // TODO(content): confirmar crédito
    width: 1613,
    height: 2147,
    position: '50% 55%',
    galleryRatio: '4 / 3',
  },
  // TODO(content): confirmar quem aparece nesta foto (capa de vídeo do Instagram)
  // e se a pessoa autoriza o uso. Enquanto isso, o texto alternativo é neutro.
  assessorCerimonia: {
    id: '11-assessor-cerimonia',
    file: 'marcobispo-11-assessor-cerimonia.jpg',
    categories: ['casamentos'],
    alt: 'Integrante da equipe orienta os preparativos de uma cerimônia ao lado de um arco de flores em tons de rosa',
    credit: null, // TODO(content): confirmar crédito
    width: 1284,
    height: 2283,
    position: '42% 42%',
  },
  debutanteTunelDeFlores: {
    id: '15anos-01-debutante-tunel-de-flores',
    file: 'marcobispo-15anos-01-debutante-tunel-de-flores.jpg',
    categories: ['festas-de-15-anos'],
    alt: 'Debutante de costas, com vestido branco de cauda longa e bordada, diante de um túnel de flores em tons de rosa',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1440,
    height: 1800,
    position: '50% 50%',
    galleryRatio: '3 / 4',
  },
  debutanteComOsPais: {
    id: '15anos-02-debutante-com-os-pais',
    file: 'marcobispo-15anos-02-debutante-com-os-pais.jpg',
    categories: ['festas-de-15-anos'],
    alt: 'Debutante de vestido branco tomara que caia caminha de mãos dadas com um homem de terno azul e uma mulher de vestido vermelho, sob um arco de flores e luzes',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1440,
    height: 1800,
    position: '50% 55%',
    galleryRatio: '1 / 1',
  },
  debutanteGiroNoPalco: {
    id: '15anos-03-giro-vestido-palco',
    file: 'marcobispo-15anos-03-giro-vestido-palco.jpg',
    categories: ['festas-de-15-anos'],
    alt: 'Debutante gira o vestido branco ao dançar com um rapaz de terno na pista, sob feixes de luz azul e lilás',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1440,
    height: 1800,
    position: '50% 50%',
    galleryRatio: '4 / 5',
  },
  debutanteBoloArcoFloral: {
    id: '15anos-04-bolo-arco-floral',
    file: 'marcobispo-15anos-04-bolo-arco-floral.jpg',
    categories: ['festas-de-15-anos'],
    alt: 'Debutante de vestido branco ao lado do bolo de vários andares, sob um grande arco de flores rosadas e um lustre de cristal',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1440,
    height: 1800,
    position: '60% 55%',
    galleryRatio: '4 / 5',
  },
  debutanteDanca: {
    id: '15anos-05-danca-com-o-pai',
    file: 'marcobispo-15anos-05-danca-com-o-pai.jpg',
    categories: ['festas-de-15-anos'],
    alt: 'Debutante dança na pista com o monograma da festa, conduzida por um rapaz de terno, sob luzes lilás',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1440,
    height: 1800,
    position: '50% 55%',
    galleryRatio: '4 / 5',
  },
  // Recortada em scripts/optimize-images.mjs (o arquivo é um print do Instagram).
  debutantePistaDeDanca: {
    id: '15anos-06-pista-de-danca',
    file: 'marcobispo-15anos-06-pista-de-danca.jpg',
    categories: ['festas-de-15-anos'],
    alt: 'Debutante de vestido rosa de plumas faz uma selfie ao lado do cantor da festa, cercada de convidados com celulares erguidos',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1228,
    height: 1536,
    position: '50% 50%',
    galleryRatio: '4 / 5',
  },
  aniversarioDecoracaoDourada: {
    id: 'aniversario-01-decoracao-dourada',
    file: 'marcobispo-aniversario-01-decoracao-dourada.jpg',
    categories: ['aniversarios'],
    alt: 'Aniversariante de vestido azul-claro bordado posa diante de uma mesa preta e dourada com arranjos de folhas douradas',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1440,
    height: 1800,
    position: '50% 45%',
    galleryRatio: '4 / 5',
  },
  aniversarioFloresBrancas: {
    id: 'aniversario-02-flores-brancas-sofa',
    file: 'marcobispo-aniversario-02-flores-brancas-sofa.jpg',
    categories: ['aniversarios'],
    alt: 'Aniversariante de vestido azul-claro segura a cauda do vestido diante de um sofá branco e de grandes flores de papel brancas na parede',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1440,
    height: 1799,
    position: '50% 55%',
    galleryRatio: '4 / 5',
  },
  aniversarioAtracaoArtistica: {
    id: 'aniversario-03-atracao-artistica',
    file: 'marcobispo-aniversario-03-atracao-artistica.jpg',
    categories: ['aniversarios'],
    alt: 'Artistas com figurinos de paetês prateados, um deles em pernas de pau, se apresentam sob uma instalação de folhas douradas',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1440,
    height: 1800,
    position: '50% 50%',
    galleryRatio: '3 / 4',
  },
  // Prints da tela do celular: recortados em scripts/optimize-images.mjs.
  corporativoAssessorCoordenando: {
    id: 'corporativo-04-assessor-coordenando-evento',
    file: 'marcobispo-corporativo-04-assessor-coordenando-evento.jpg',
    categories: ['eventos-corporativos'],
    alt: 'Assessor de terno escuro conversa com um convidado durante um evento',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1236,
    height: 2235,
    position: '50% 30%',
    galleryRatio: '3 / 4',
  },
  corporativoInauguracao: {
    id: 'corporativo-06-inauguracao-emporio-guimaraes',
    file: 'marcobispo-corporativo-06-inauguracao-emporio-guimaraes.jpg',
    categories: ['eventos-corporativos'],
    alt: 'Assessor de blazer claro segura uma taça de espumante em uma inauguração, diante de uma parede de plantas',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1236,
    height: 2235,
    position: '50% 35%',
    galleryRatio: '4 / 5',
  },
  // TODO(content): formatura não é um dos quatro tipos de evento. Hoje aparece só em "Todos".
  cerimonialDeFormatura: {
    id: 'institucional-05-cerimonial-de-formatura',
    file: 'marcobispo-institucional-05-cerimonial-de-formatura.jpg',
    categories: [],
    alt: 'Mestre de cerimônias de terno fala ao microfone em uma formatura, diante de um telão colorido',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1236,
    height: 2235,
    position: '50% 30%',
    galleryRatio: '3 / 4',
  },
  // Retratos de estúdio do fundador: não são fotos de evento, por isso ficam fora da galeria.
  fundadorRetratoCloseup: {
    id: 'corporativo-01-retrato-fundador-closeup',
    file: 'marcobispo-corporativo-01-retrato-fundador-closeup.jpg',
    categories: [],
    alt: 'Retrato do fundador da Marco Bispo Assessoria, de terno azul-marinho e gravata clara, sobre fundo cinza',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1440,
    height: 1919,
    position: '50% 30%',
  },
  fundadorRetratoSentado: {
    id: 'corporativo-02-retrato-fundador-sentado',
    file: 'marcobispo-corporativo-02-retrato-fundador-sentado.jpg',
    categories: [],
    alt: 'Fundador da Marco Bispo Assessoria, de terno azul-marinho, sentado com uma xícara de café na mão',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1440,
    height: 1920,
    position: '50% 30%',
  },
  fundadorRetratoCorpoInteiro: {
    id: 'corporativo-03-retrato-fundador-corpo-inteiro',
    file: 'marcobispo-corporativo-03-retrato-fundador-corpo-inteiro.jpg',
    categories: [],
    alt: 'Fundador da Marco Bispo Assessoria, de terno azul-marinho, sentado sobre um cubo branco em estúdio',
    credit: null, // TODO(content): confirmar crédito do fotógrafo
    width: 1440,
    height: 1920,
    position: '50% 40%',
  },
} satisfies Record<string, PortfolioImage>;

/**
 * Fotos da galeria do portfólio, na ordem em que aparecem.
 *
 * A galeria preenche uma coluna de cada vez (de cima para baixo), com 3 colunas
 * no computador e 2 no celular. A ordem mistura os tipos de evento para que
 * "Todos" não fique com um tipo só em cada coluna.
 */
export const portfolio: PortfolioImage[] = [
  images.noivaNoCarro,
  images.debutanteTunelDeFlores,
  images.aniversarioDecoracaoDourada,
  images.corporativoAssessorCoordenando,
  images.casalFundoVerde,
  images.debutanteGiroNoPalco,
  images.mesaCoposDeLeite,
  images.aniversarioAtracaoArtistica,
  images.casalClose,
  images.debutanteComOsPais,
  images.corporativoInauguracao,
  images.casalLoiroDecoracao,
  images.mesaJardimColorido,
  images.debutanteBoloArcoFloral,
  images.aniversarioFloresBrancas,
  images.casalPretoEBranco,
  images.cerimonialDeFormatura,
  images.debutanteDanca,
  images.noivaSofaCapitone,
  images.debutantePistaDeDanca,
  images.casalCoposDeLeite,
  images.casalBolo,
];

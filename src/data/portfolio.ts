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

export type PortfolioCategory = 'casamentos' | 'decoracao';

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
  { id: 'decoracao', label: 'Decoração' },
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
    galleryRatio: '1 / 1',
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
    categories: ['casamentos', 'decoracao'],
    alt: 'Noiva de véu sorri ao lado do noivo, de terno claro e gravata-borboleta, junto à mesa do bolo decorada com velas e copos-de-leite',
    credit: { role: 'Foto', handle: '@fotografiadubau' },
    width: 3072,
    height: 4096,
    position: '50% 40%',
    galleryRatio: '3 / 4',
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
    categories: ['decoracao'],
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
    categories: ['decoracao'],
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
} satisfies Record<string, PortfolioImage>;

/**
 * Fotos da galeria do portfólio, na ordem em que aparecem.
 *
 * A galeria preenche uma coluna de cada vez (de cima para baixo). A ordem e as
 * proporções (`galleryRatio`) abaixo foram escolhidas para as colunas fecharem
 * na mesma altura, com 3 colunas no computador e 2 no celular.
 */
export const portfolio: PortfolioImage[] = [
  // coluna 1 (computador)
  images.noivaNoCarro,
  images.mesaCoposDeLeite,
  images.casalBolo,
  // coluna 2
  images.casalFundoVerde,
  images.mesaJardimColorido,
  images.casalClose,
  images.casalPretoEBranco,
  // coluna 3
  images.casalLoiroDecoracao,
  images.noivaSofaCapitone,
  images.casalCoposDeLeite,
];

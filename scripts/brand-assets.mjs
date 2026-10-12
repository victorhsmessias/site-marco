// Gera os arquivos de marca a partir das logos oficiais em `assets-originais/logo/`
// (baixadas do site antigo, marcobispo.com/IMG):
//   - src/components/brand/logo-paths.ts  (traçados usados pelos componentes de logo)
//   - src/app/icon.svg e src/app/apple-icon.png  (favicon)
//   - public/brand/logo.png  (logo para dados estruturados)
//   - public/og.jpg  (imagem de compartilhamento, 1200×630)
//
// Uso: npm run images

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const logoDir = path.join(root, 'assets-originais', 'logo');

// Mesmos valores de `src/app/globals.css`.
const FOREST = '#203C2E';
const FOREST_DEEP = '#16291F';
const IVORY = '#FAF7F2';
const GOLD = '#B89B6A';

const OG_PHOTO = 'marcobispo-01-noiva-no-carro.jpg';

/** Arredonda as coordenadas para 2 casas: mesmo desenho, arquivo bem menor. */
const roundPath = (d) => d.replace(/-?\d*\.\d+/g, (n) => String(Number(Number(n).toFixed(2))));

async function readPaths(file) {
  const svg = await readFile(path.join(logoDir, file), 'utf8');
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1];
  const paths = [...svg.matchAll(/<path[^>]*?\sd="([^"]+)"/g)].map((m) => roundPath(m[1]));
  if (!viewBox || paths.length === 0) throw new Error(`Não foi possível ler ${file}`);
  return { viewBox, paths };
}

async function main() {
  const mark = await readPaths('marco.svg');
  const wordmark = await readPaths('marco_bispo.svg');

  // No monograma, o último traçado é a letra "M"; os demais formam a moldura.
  const letter = mark.paths.at(-1);
  const frame = mark.paths.slice(0, -1).join('');

  await mkdir(path.join(root, 'src', 'components', 'brand'), { recursive: true });
  await writeFile(
    path.join(root, 'src', 'components', 'brand', 'logo-paths.ts'),
    `// Arquivo gerado por scripts/brand-assets.mjs a partir das logos oficiais. Não edite à mão.

export const logoMark = {
  viewBox: '${mark.viewBox}',
  frame: '${frame}',
  letter: '${letter}',
} as const;

export const logoWordmark = {
  viewBox: '${wordmark.viewBox}',
  path: '${wordmark.paths.join('')}',
} as const;
`,
  );

  // --- Favicon: só o "M" (a moldura vira borrão em 16 px) ---
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="32" fill="${FOREST}"/>
  <circle cx="32" cy="32" r="27.5" fill="none" stroke="${GOLD}" stroke-width="1.25"/>
  <path transform="translate(32 32) scale(0.86) translate(-68.79 -68.38)" fill="${IVORY}" d="${letter}"/>
</svg>
`;
  await writeFile(path.join(root, 'src', 'app', 'icon.svg'), iconSvg);

  const markSvg = (color, size) =>
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${mark.viewBox}" width="${size}" height="${size}" fill="${color}"><path d="${frame}"/><path d="${letter}"/></svg>`,
    );
  const wordmarkSvg = (color, width) =>
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${wordmark.viewBox}" width="${width}" height="${Math.round(width / 10)}" fill="${color}"><path fill-rule="evenodd" d="${wordmark.paths.join('')}"/></svg>`,
    );

  await sharp({ create: { width: 180, height: 180, channels: 3, background: FOREST } })
    .composite([{ input: await sharp(markSvg(IVORY, 128)).png().toBuffer(), gravity: 'centre' }])
    .png()
    .toFile(path.join(root, 'src', 'app', 'apple-icon.png'));

  await mkdir(path.join(root, 'public', 'brand'), { recursive: true });
  await sharp({ create: { width: 512, height: 512, channels: 3, background: IVORY } })
    .composite([{ input: await sharp(markSvg(FOREST, 400)).png().toBuffer(), gravity: 'centre' }])
    .png()
    .toFile(path.join(root, 'public', 'brand', 'logo.png'));

  // --- Imagem de compartilhamento (Open Graph) ---
  const W = 1200;
  const H = 630;
  const photoW = 560;
  const panelW = W - photoW;

  const photo = await sharp(path.join(root, 'assets-originais', OG_PHOTO))
    .rotate()
    .resize({ width: photoW })
    .toBuffer({ resolveWithObject: true });
  // Recorte vertical centrado no rosto (a ~36% da altura da foto).
  const top = Math.max(0, Math.min(photo.info.height - H, Math.round(photo.info.height * 0.36 - H * 0.45)));
  const photoCrop = await sharp(photo.data).extract({ left: 0, top, width: photoW, height: H }).toBuffer();

  const panel = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${panelW}" height="${H}">
      <rect width="100%" height="100%" fill="${FOREST}"/>
      <rect x="28" y="28" width="${panelW - 56}" height="${H - 56}" fill="none" stroke="${GOLD}" stroke-opacity="0.55" stroke-width="1"/>
      <rect x="${panelW / 2 - 28}" y="452" width="56" height="1.5" fill="${GOLD}"/>
      <rect x="${panelW - 1}" y="0" width="1" height="${H}" fill="${FOREST_DEEP}"/>
    </svg>`,
  );

  const ogMark = await sharp(markSvg(IVORY, 190)).png().toBuffer();
  const ogWordmark = await sharp(wordmarkSvg(IVORY, 400)).png().toBuffer();
  const ogTagline = await sharp({
    text: {
      text: `<span foreground="${GOLD}" letter_spacing="4200">ASSESSORIA DE EVENTOS  ·  LONDRINA/PR</span>`,
      font: 'Georgia, serif',
      width: panelW - 120,
      height: 20,
      rgba: true,
      align: 'centre',
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true });

  await sharp({ create: { width: W, height: H, channels: 3, background: FOREST } })
    .composite([
      { input: await sharp(panel).png().toBuffer(), left: 0, top: 0 },
      { input: photoCrop, left: panelW, top: 0 },
      { input: ogMark, left: Math.round(panelW / 2 - 95), top: 128 },
      { input: ogWordmark, left: Math.round(panelW / 2 - 200), top: 372 },
      { input: ogTagline.data, left: Math.round(panelW / 2 - ogTagline.info.width / 2), top: 486 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(root, 'public', 'og.jpg'));

  console.log('✓ logo-paths.ts, icon.svg, apple-icon.png, brand/logo.png e og.jpg gerados');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

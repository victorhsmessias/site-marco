// Gera as versões otimizadas das fotos de `assets-originais/` em
// `public/images/portfolio/` (AVIF + WebP em vários tamanhos, mais um JPEG de
// reserva) e o manifesto `src/data/images.generated.json`.
//
// Uso: npm run images
//
// Regra: nenhuma imagem é ampliada além do tamanho original.

import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'assets-originais');
const outDir = path.join(root, 'public', 'images', 'portfolio');
const manifestPath = path.join(root, 'src', 'data', 'images.generated.json');
const portfolioDataPath = path.join(root, 'src', 'data', 'portfolio.ts');

const TARGET_WIDTHS = [360, 540, 720, 960, 1280, 1600, 1920];
const FALLBACK_WIDTH = 960;
const AVIF = { quality: 52, effort: 6 };
const WEBP = { quality: 76, effort: 5 };
const JPEG = { quality: 78, mozjpeg: true };

/** Larguras a gerar: os degraus menores que o original, mais o próprio original se couber. */
function widthsFor(originalWidth) {
  const widths = TARGET_WIDTHS.filter((w) => w <= originalWidth);
  const largest = widths.at(-1) ?? 0;
  const maxTarget = TARGET_WIDTHS.at(-1);
  // Aproveita a resolução total de originais pequenos (ex.: 900 px).
  if (originalWidth < maxTarget && originalWidth - largest >= 64) widths.push(originalWidth);
  return widths;
}

const idFromFile = (file) => file.replace(/^marcobispo-/, '').replace(/\.jpe?g$/i, '');

/** Recorte de 24 px em cada lado: tira os cantos pretos arredondados de prints da tela do celular. */
const screenshotInset = (width, height) => ({ left: 24, top: 24, width: width - 48, height: height - 48 });

// Recortes aplicados antes de gerar as versões. O arquivo original não é alterado;
// largura e altura em portfolio.ts passam a ser as do recorte.
const CROPS = {
  // Print do Instagram: moldura branca e uma tira da foto vizinha à esquerda.
  'marcobispo-15anos-06-pista-de-danca.jpg': { left: 118, top: 140, width: 1228, height: 1536 },
  'marcobispo-corporativo-04-assessor-coordenando-evento.jpg': screenshotInset(1284, 2283),
  'marcobispo-corporativo-06-inauguracao-emporio-guimaraes.jpg': screenshotInset(1284, 2283),
  'marcobispo-institucional-05-cerimonial-de-formatura.jpg': screenshotInset(1284, 2283),
};

/** Abre a foto já girada pela orientação EXIF e recortada, se houver recorte. */
function load(file) {
  const image = sharp(path.join(sourceDir, file)).rotate();
  return CROPS[file] ? image.extract(CROPS[file]) : image;
}

async function main() {
  // `--check`: só confere portfolio.ts contra o manifesto já gerado, sem reprocessar as fotos.
  if (process.argv.includes('--check')) {
    await checkPortfolioData(JSON.parse(await readFile(manifestPath, 'utf8')));
    return;
  }

  const files =(await readdir(sourceDir)).filter((f) => /^marcobispo-.*\.jpe?g$/i.test(f)).sort();
  if (files.length === 0) {
    throw new Error(`Nenhuma foto encontrada em ${sourceDir}`);
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const manifest = {};
  let totalBytes = 0;

  for (const file of files) {
    const id = idFromFile(file);
    const { width, height } = CROPS[file] ?? (await sharp(path.join(sourceDir, file)).rotate().metadata());
    const widths = widthsFor(width);

    for (const w of widths) {
      const base = load(file).resize({ width: w, withoutEnlargement: true });
      const [avif, webp] = await Promise.all([
        base.clone().avif(AVIF).toFile(path.join(outDir, `${id}-${w}.avif`)),
        base.clone().webp(WEBP).toFile(path.join(outDir, `${id}-${w}.webp`)),
      ]);
      totalBytes += avif.size + webp.size;
    }

    const fallbackWidth = widths.filter((w) => w <= FALLBACK_WIDTH).at(-1) ?? widths[0];
    await load(file)
      .resize({ width: fallbackWidth, withoutEnlargement: true })
      .jpeg(JPEG)
      .toFile(path.join(outDir, `${id}-${fallbackWidth}.jpg`));

    // Miniatura borrada (≈ 300 bytes) usada como fundo enquanto a foto carrega.
    const placeholder = await load(file)
      .resize({ width: 16 })
      .blur(1)
      .webp({ quality: 40 })
      .toBuffer();

    manifest[id] = {
      width,
      height,
      widths,
      fallbackWidth,
      placeholder: `data:image/webp;base64,${placeholder.toString('base64')}`,
    };
    console.log(`✓ ${file}  ${width}×${height}  →  ${widths.join(', ')}`);
  }

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nManifesto: ${path.relative(root, manifestPath)}`);
  console.log(`AVIF + WebP gerados: ${(totalBytes / 1024 / 1024).toFixed(1)} MB em ${path.relative(root, outDir)}`);

  await checkPortfolioData(manifest);
}

/** Avisa se `src/data/portfolio.ts` não bate com os arquivos reais. */
async function checkPortfolioData(manifest) {
  const source = await readFile(portfolioDataPath, 'utf8');
  const entries = [...source.matchAll(/id: '([^']+)',\s*file:[\s\S]*?width: (\d+),\s*height: (\d+)/g)];
  const problems = [];
  const seen = new Set();

  for (const [, id, width, height] of entries) {
    seen.add(id);
    const real = manifest[id];
    if (!real) {
      problems.push(`"${id}" está em portfolio.ts, mas o arquivo não existe em assets-originais/`);
    } else if (real.width !== Number(width) || real.height !== Number(height)) {
      problems.push(`"${id}": portfolio.ts diz ${width}×${height}, o arquivo tem ${real.width}×${real.height}`);
    }
  }
  for (const id of Object.keys(manifest)) {
    if (!seen.has(id)) problems.push(`"${id}" existe em assets-originais/, mas não está em portfolio.ts`);
  }

  if (problems.length > 0) {
    console.error(`\nAtenção: src/data/portfolio.ts precisa de ajuste:\n- ${problems.join('\n- ')}`);
    process.exitCode = 1;
  } else {
    console.log('portfolio.ts confere com os arquivos originais.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

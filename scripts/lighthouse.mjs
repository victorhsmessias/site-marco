// Roda o Lighthouse (perfil de celular) no build (`out/`) e salva os relatórios
// em reports/lighthouse/. Meta: 95+ em Desempenho, Acessibilidade, Boas práticas e SEO.
//
// Uso: npm run build && npm run lighthouse
//
// Usa o Chrome instalado na máquina; se não houver, o Chromium do Playwright.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { chromium } from 'playwright';
import { startStaticServer } from './lib/static-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'reports', 'lighthouse');
const TARGET = 95;

const PAGES = [
  { name: 'inicio', path: '/' },
  { name: 'politica-de-privacidade', path: '/politica-de-privacidade/' },
];
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

async function launchChrome() {
  const chromeFlags = ['--headless=new', '--no-sandbox'];
  try {
    return await chromeLauncher.launch({ chromeFlags });
  } catch {
    return chromeLauncher.launch({ chromeFlags, chromePath: chromium.executablePath() });
  }
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const server = await startStaticServer(path.join(root, 'out'));
  const chrome = await launchChrome();
  let failed = false;

  try {
    for (const page of PAGES) {
      const result = await lighthouse(`${server.url}${page.path}`, {
        port: chrome.port,
        output: 'html',
        logLevel: 'error',
        onlyCategories: CATEGORIES,
        locale: 'pt',
      });
      await writeFile(path.join(outDir, `${page.name}.html`), result.report);

      const scores = CATEGORIES.map((id) => {
        const score = Math.round((result.lhr.categories[id].score ?? 0) * 100);
        if (score < TARGET) failed = true;
        return `${result.lhr.categories[id].title}: ${score}`;
      });
      console.log(`\n${page.path}\n  ${scores.join('  |  ')}`);

      const metrics = ['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'speed-index']
        .map((id) => `${result.lhr.audits[id].title}: ${result.lhr.audits[id].displayValue}`);
      console.log(`  ${metrics.join('  |  ')}`);

      // Lista o que não passou, para facilitar a correção.
      const failing = Object.values(result.lhr.audits).filter(
        (audit) => audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== 'informative' && audit.scoreDisplayMode !== 'manual',
      );
      for (const audit of failing) {
        console.log(`  - ${audit.title}${audit.displayValue ? ` (${audit.displayValue})` : ''}`);
      }
    }
  } finally {
    await chrome.kill();
    await server.close();
  }

  console.log(`\nRelatórios em ${path.relative(root, outDir)}`);
  if (failed) {
    console.error(`Alguma nota ficou abaixo de ${TARGET}.`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

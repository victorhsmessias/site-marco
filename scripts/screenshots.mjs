// Tira screenshots do build (`out/`) em 375, 768 e 1440 px, seção por seção,
// mais o menu do celular e o lightbox abertos. Também acusa rolagem horizontal
// e erros no console.
//
// Uso: npm run build && npm run screenshots
// Saída: reports/screenshots/

import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { startStaticServer } from './lib/static-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'reports', 'screenshots');

const VIEWPORTS = [
  { name: '375', width: 375, height: 812, isMobile: true, hasTouch: true },
  { name: '768', width: 768, height: 1024, isMobile: true, hasTouch: true },
  { name: '1440', width: 1440, height: 900 },
];

/** Rola a página inteira para disparar animações de entrada e imagens lazy. */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      // 'instant': o site usa rolagem suave, que não chegaria ao fim a tempo.
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2600);
}

async function main() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const server = await startStaticServer(path.join(root, 'out'));
  const browser = await chromium.launch();
  const problems = [];

  try {
    for (const viewport of VIEWPORTS) {
      const { name, ...options } = viewport;
      const context = await browser.newContext({
        viewport: { width: options.width, height: options.height },
        isMobile: options.isMobile ?? false,
        hasTouch: options.hasTouch ?? false,
        deviceScaleFactor: 1,
        locale: 'pt-BR',
      });
      const page = await context.newPage();
      page.on('console', (msg) => {
        if (msg.type() === 'error') problems.push(`[${name}] console: ${msg.text()}`);
      });
      page.on('response', (response) => {
        if (response.status() >= 400) {
          problems.push(`[${name}] ${response.status()} em ${response.url().replace(server.url, '')}`);
        }
      });
      page.on('pageerror', (error) => problems.push(`[${name}] erro: ${error.message}`));

      await page.goto(`${server.url}/`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(outDir, `${name}-00-primeira-dobra.png`) });
      await scrollThrough(page);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (overflow > 0) problems.push(`[${name}] rolagem horizontal de ${overflow}px`);

      // Nas capturas por seção, esconde o que é fixo (cabeçalho e botão flutuante),
      // que já aparecem nas capturas de tela inteira.
      const hideFixed = await page.addStyleTag({
        content: 'header, .whatsapp-fab { visibility: hidden !important; }',
      });
      const sections = await page.locator('main > section, footer').all();
      for (const [index, section] of sections.entries()) {
        const id = (await section.getAttribute('id')) ?? 'rodape';
        await section.screenshot({
          path: path.join(outDir, `${name}-${String(index + 1).padStart(2, '0')}-${id}.png`),
        });
      }
      await hideFixed.evaluate((el) => el.remove());

      // Lightbox
      await page.locator('#portfolio ul button').first().scrollIntoViewIfNeeded();
      await page.locator('#portfolio ul button').first().click();
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(outDir, `${name}-lightbox.png`) });
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, `${name}-lightbox-2.png`) });
      await page.keyboard.press('Escape');

      // Menu em tela cheia (só existe abaixo de 1280 px)
      const menuButton = page.getByRole('button', { name: 'Abrir menu' });
      if (await menuButton.isVisible()) {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await menuButton.click();
        await page.waitForTimeout(600);
        await page.screenshot({ path: path.join(outDir, `${name}-menu.png`) });
        await page.keyboard.press('Escape');
      }

      // Botão flutuante no meio da página
      await page.evaluate(() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'instant' }));
      await page.waitForTimeout(900);
      await page.screenshot({ path: path.join(outDir, `${name}-botao-flutuante.png`) });

      // Política de Privacidade
      await page.goto(`${server.url}/politica-de-privacidade/`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(outDir, `${name}-privacidade.png`) });

      await context.close();
      console.log(`✓ ${name}px`);
    }
  } finally {
    await browser.close();
    await server.close();
  }

  console.log(`\nScreenshots em ${path.relative(root, outDir)}`);
  if (problems.length > 0) {
    console.error(`\nProblemas encontrados:\n- ${[...new Set(problems)].join('\n- ')}`);
    process.exitCode = 1;
  } else {
    console.log('Sem rolagem horizontal e sem erros no console.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

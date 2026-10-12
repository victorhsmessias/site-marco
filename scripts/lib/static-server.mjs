// Servidor estático mínimo para a pasta `out/`, usado pelos scripts de
// screenshots e Lighthouse. Comprime texto (brotli/gzip) e define cache como
// uma hospedagem de produção faria, para as medições serem realistas.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import zlib from 'node:zlib';

const brotli = promisify(zlib.brotliCompress);
const gzip = promisify(zlib.gzip);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.txt', '.xml', '.svg']);

async function resolveFile(root, urlPath) {
  const safe = path.normalize(decodeURIComponent(urlPath)).replace(/^([/\\]|\.\.)+/, '');
  const candidates = [safe, path.join(safe, 'index.html'), `${safe}.html`];
  for (const candidate of candidates) {
    const file = path.join(root, candidate);
    if (!file.startsWith(root)) continue;
    const info = await stat(file).catch(() => null);
    if (info?.isFile()) return file;
  }
  return null;
}

/** Sobe o servidor e devolve `{ url, close }`. */
export async function startStaticServer(root, port = 0) {
  const cache = new Map();

  const server = createServer(async (req, res) => {
    try {
      const { pathname } = new URL(req.url, 'http://localhost');
      let file = await resolveFile(root, pathname);
      let status = 200;
      if (!file) {
        file = path.join(root, '404.html');
        status = 404;
      }

      const ext = path.extname(file);
      const accepts = req.headers['accept-encoding'] ?? '';
      const encoding = !COMPRESSIBLE.has(ext) ? null : accepts.includes('br') ? 'br' : accepts.includes('gzip') ? 'gzip' : null;
      const key = `${file}:${encoding}`;

      if (!cache.has(key)) {
        const raw = await readFile(file);
        cache.set(key, encoding === 'br' ? await brotli(raw) : encoding === 'gzip' ? await gzip(raw) : raw);
      }

      const immutable = pathname.startsWith('/_next/static/') || pathname.startsWith('/images/');
      res.writeHead(status, {
        'Content-Type': TYPES[ext] ?? 'application/octet-stream',
        'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
        Vary: 'Accept-Encoding',
        ...(encoding ? { 'Content-Encoding': encoding } : {}),
      });
      res.end(cache.get(key));
    } catch (error) {
      res.writeHead(500);
      res.end(String(error));
    }
  });

  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
  const { port: actualPort } = server.address();

  return {
    url: `http://127.0.0.1:${actualPort}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Site 100% estático: o build gera a pasta `out/`, que pode ser servida por
  // qualquer hospedagem de arquivos ou pelo Dockerfile (nginx) deste projeto.
  output: 'export',
  // Gera `pagina/index.html`, o formato que hospedagens estáticas servem sem regras extras.
  trailingSlash: true,
  // As imagens são otimizadas antes do build por `npm run images` (AVIF + WebP em
  // vários tamanhos), porque o otimizador do Next não existe em exportação estática.
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

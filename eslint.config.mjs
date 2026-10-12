import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Os links internos são âncoras comuns (<a href="/#secao">) de propósito:
      // funcionam em qualquer hospedagem estática, sem depender dos arquivos de
      // pré-carregamento do next/link (que deram 404 na exportação estática).
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'reports/**', 'next-env.d.ts']),
]);

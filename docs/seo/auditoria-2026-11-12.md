# Auditoria de SEO, GEO, performance e acessibilidade (12/11/2026)

Site auditado: https://site-marco-flax.vercel.app/ (endereço temporário). Domínio definitivo: https://www.marcobispo.com/ (migração pendente).
Código: branch `main`, commit `9fdafe4`.

## Resumo

A base técnica é boa. O site é gerado de forma estática (Next.js 16, `output: 'export'`), todo o conteúdo está no HTML inicial e já existem `metadataBase`, canonical, `robots.txt`, sitemap, `lang="pt-BR"`, Open Graph, JSON-LD `LocalBusiness`, fotos em AVIF/WebP com `srcset` e preload da foto do hero, além de uma acessibilidade cuidadosa (`<dialog>` nativo, `<details>`, foco visível, labels).

O problema mais grave é de indexação: o endereço temporário está indexável e o canonical aponta para `www.marcobispo.com`, que hoje responde **403** (CDN da Hostinger, inclusive em um Chrome comum). O resto são ajustes de on-page, dados estruturados, CLS/LCP no celular e medição de conversão.

## Como foi medido

- Leitura do código: `src/app`, `src/components`, `src/data`, `src/lib`, `next.config.ts`, `public/`, `Dockerfile`, `nginx.conf`.
- HTTP do site no ar com `curl` (status, cabeçalhos, robots, sitemap, HTML inicial).
- Lighthouse 13.5 (CLI e Chrome DevTools MCP), perfis mobile e desktop.
- Trace de performance da home no Chrome DevTools (mobile emulado, Slow 4G, CPU 4×), com `PerformanceObserver` para identificar LCP e layout shifts.
- Buscas "assessoria de casamento Londrina" e "cerimonialista Londrina festa de 15 anos" para ver o tipo de resultado.

## Notas do Lighthouse (site no ar)

| Perfil | Desempenho | Acessibilidade | Boas práticas | SEO | Agentic Browsing |
|---|---|---|---|---|---|
| Mobile | 92 | 100 | 100 | 100 | 97 a 100 |
| Desktop | 100 | 100 | 100 | 100 | 100 |

Métricas de laboratório:

| Perfil | FCP | LCP | TBT | CLS | Speed Index |
|---|---|---|---|---|---|
| Mobile (Lighthouse CLI) | 1,2 s | 3,1 s | 180 ms | 0 a 0,087 | 1,4 s |
| Desktop (Lighthouse CLI) | 0,4 s | 0,6 s | 10 ms | 0 | 0,6 s |
| Trace mobile (Slow 4G, CPU 4×) | 2,3 s | 3,2 s | | 0,087 | |

- **LCP:** o elemento é o texto do H1 do hero (`#hero-title`), não a foto. TTFB de 641 ms + **2,6 s de atraso de renderização**. Bloqueiam a renderização o CSS (cerca de 1 s no Slow 4G) e as três fontes pré-carregadas, que terminam entre 2,0 e 2,2 s.
- **CLS:** um único deslocamento, aos 2,6 s, com origem no H1. Quando a Cormorant Garamond substitui a fonte reserva, o título muda de quebra de linha e empurra o parágrafo, os botões e a lista de provas. O valor oscila entre execuções (0 a 0,087) porque depende de a fonte chegar antes ou depois da primeira pintura.
- **Dados de campo (CrUX):** não há, por falta de tráfego.

## Checagens

### Indexação
- `robots.txt`: `User-Agent: * / Allow: /`, com o sitemap apontando para `https://www.marcobispo.com/sitemap.xml`.
- `sitemap.xml`: 2 URLs (home e política) no domínio final; `lastmod` = data do build.
- Canonical, `og:url`, sitemap e JSON-LD usam `https://www.marcobispo.com`, que responde 403. Nenhum cabeçalho `X-Robots-Tag`, e a meta é `index, follow`.
- Status: home 200, política 200, `/politica-de-privacidade` faz 308 para a versão com barra, URL inexistente dá 404 com `noindex`. HTTPS com HSTS (`preload`).
- Risco de duplicidade: quando o domínio final entrar no ar, o vercel.app vai continuar respondendo com o mesmo conteúdo. É preciso um 301 do vercel.app para o domínio.
- **Recomendação aprovada:** `X-Robots-Tag: noindex` só para hosts `*.vercel.app` até a migração.

### Renderização
Geração estática (SSG). H1, textos, serviços, FAQ e nome/endereço/telefone (NAP) estão no HTML inicial (HTML de 239 KB, 36 KB com Brotli).

### On-page
- Title: "Marco Bispo Assessoria | Assessoria de casamento e eventos em Londrina" (70 caracteres; marca na frente).
- Meta description: 230 caracteres (o Google corta por volta de 155).
- H1: "Fazemos do seu dia um evento inesquecível." (slogan, sem palavra-chave). "Assessoria de eventos em Londrina" é um `<p>`.
- H2 por seção e H3 nos cartões e no FAQ: hierarquia correta.
- `lang="pt-BR"`, OG e Twitter completos na home. Na Política de Privacidade, o `openGraph` da página substitui o do layout: faltam `og:image`, `og:site_name`, `og:locale` e `og:type`, e o `twitter:title` é o da home.
- Favicon SVG + apple-touch-icon de 180 px.
- Textos duplicados: a faixa animada repete os 5 nomes de serviço 2× (com `aria-hidden`); o menu aparece 3× no HTML (desktop, diálogo mobile, rodapé).

### Arquitetura
Página única com âncoras, mais a Política de Privacidade. Páginas próprias por serviço foram avaliadas:

- **Prós:** uma URL com title, H1 e conteúdo dedicados para cada busca; espaço para FAQ e galeria por serviço, `BreadcrumbList` e links internos; destino melhor para anúncios e para o Instagram.
- **Contras:** sem texto próprio, viram páginas finas que competem com a home. Corporativo (2 fotos, prints de celular) e aniversários (3 fotos) não têm material hoje. Também aumentam a manutenção.
- **Decisão:** planejar agora e implementar quando houver conteúdo. Ordem sugerida: `/assessoria-de-casamento/` e `/festa-de-15-anos/`; depois `/eventos-corporativos/` e `/aniversarios/`.

### SEO local
- NAP igual no contato, no rodapé, no menu e no JSON-LD: Rua Piauí, 399, Sala 706, Ed. São Paulo Towers, Londrina/PR, CEP 86010-420; (43) 3361-1633; WhatsApp (43) 98839-5494. O número de WhatsApp ainda não está confirmado.
- O endereço e o telefone também aparecem digitados à mão em uma resposta do FAQ (`src/data/faq.ts`), o que pode sair de sincronia.
- Link "Ver no mapa" para o Google Maps (busca pelo endereço).
- O resultado de busca é dominado pelo diretório casamentos.com.br.

### Dados estruturados
Hoje só há `LocalBusiness` (nome, descrição, URL, logo, imagem, telefone, endereço, `areaServed` Londrina, `sameAs` Instagram, `contactPoint` WhatsApp, `foundingDate`). Faltam `WebSite`, `founder`, `hasMap`, os serviços, `geo` (as coordenadas ainda não estão confirmadas), `FAQPage` e `BreadcrumbList` na política.

### GEO (busca por IA)
- O robots libera todos os robôs, inclusive Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot e PerplexityBot.
- O conteúdo é fácil de citar no FAQ e no Sobre, mas falta uma frase de definição ("X é uma assessoria de Y em Z, desde 2014"). O Sobre começa pela história do fundador.
- O termo "cerimonialista" não aparece no site.

### Performance
- Fotos: `<picture>` com AVIF, WebP e JPEG reserva, `srcset`/`sizes` por uso, `width`/`height`, lazy loading nas fotos fora da primeira tela, preload AVIF com `fetchpriority="high"` na foto do hero. Não usa `next/image` porque o otimizador do Next não funciona com exportação estática; o componente próprio cumpre o mesmo papel.
- Fontes: `next/font` (Cormorant Garamond 500 normal e itálico, DM Sans variável), `display: swap` e 3 arquivos pré-carregados.
- Nenhum script de terceiro (GA4 e Meta Pixel só carregam com ID configurado e depois do consentimento).
- Cache na Vercel: `/_next/static` imutável (bom), mas `/images/*`, `/brand/*` e `/og.jpg` com `max-age=0, must-revalidate`. O `nginx.conf` do projeto não vale na Vercel.
- Lighthouse aponta cerca de 14 KB de JavaScript legado e cerca de 25 KB de economia possível em imagens (sem ganho estimado de LCP).

### Acessibilidade (WCAG AA)
Lighthouse 100 nos dois perfis. Contraste AA nas cores de texto (o dourado claro é usado só em detalhes). Foco visível global, link "Pular para o conteúdo", labels em todos os campos, `<dialog>` nativo no menu e na galeria. Ponto de melhoria: 11 de 26 imagens têm alt com mais de 110 caracteres (média de 109), e cada botão da galeria soma o prefixo "Ampliar foto:".

### Conversão
CTAs de WhatsApp no cabeçalho, hero, serviços, FAQ, contato, rodapé e botão flutuante. O formulário monta a mensagem e abre o WhatsApp. Todo CTA de WhatsApp dispara `click_whatsapp`, mas os links de telefone, mapa e Instagram não são medidos. O GA4 não está configurado (sem ID).

## Problemas encontrados

| # | Problema | Evidência | Impacto | Esforço | Correção | Arquivo |
|---|---|---|---|---|---|---|
| 1 | Canonical aponta para um domínio que responde 403, e o vercel.app está indexável | `canonical`/sitemap = `www.marcobispo.com` (403, Hostinger); meta `index, follow`; sem `X-Robots-Tag` | Alto | Baixo | `X-Robots-Tag: noindex` em `*.vercel.app`; migrar o domínio | `vercel.json` |
| 2 | URL absoluta fixa no código | Valor reserva `https://www.marcobispo.com` em `site.ts`; `ARG` padrão no `Dockerfile` | Médio | Baixo | `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → localhost | `src/lib/site.ts`, `Dockerfile`, `.env.example` |
| 3 | Meta description longa | 230 caracteres | Médio | Baixo | Texto de até cerca de 150 caracteres | `src/lib/seo.ts` |
| 4 | H1 sem palavra-chave | H1 = slogan | Médio | Baixo | H1 "Assessoria de casamentos e eventos em Londrina"; slogan como `<p>` | `Hero.tsx`, `content.ts` |
| 5 | Title começa pela marca | 70 caracteres, marca primeiro | Baixo-médio | Baixo | "Assessoria de Casamento e Eventos em Londrina \| Marco Bispo" | `src/lib/seo.ts` |
| 6 | Política sem og:image | `openGraph` da página substitui o do layout | Baixo | Baixo | Base de OG compartilhada | `src/lib/seo.ts`, `politica-de-privacidade/page.tsx` |
| 7 | CLS no mobile | Deslocamento de 0,087 aos 2,6 s, origem no H1 (troca de fonte) | Médio | Médio | Estabilizar a altura do título e/ou ajustar a fonte reserva | `Hero.tsx`, `layout.tsx`, `globals.css` |
| 8 | LCP de 3,1 s no mobile | Texto do H1; CSS e fontes bloqueiam a renderização | Médio | Médio | Testar CSS inline e o preload das fontes | `next.config.ts` |
| 9 | Cache curto nas fotos | `/images/*` com `max-age=0` | Baixo-médio | Baixo | `Cache-Control` de 30 dias | `vercel.json` |
| 10 | `lastmod` muda a cada build | `new Date()` | Baixo | Baixo | Data fixa por rota | `src/app/sitemap.ts` |
| 11 | JSON-LD incompleto | Só `LocalBusiness` | Médio | Baixo | `@graph` com `WebSite`, `LocalBusiness` completo, `FAQPage` e `BreadcrumbList` | `JsonLd.tsx` |
| 12 | NAP digitado no FAQ | Endereço e telefone fixos no texto | Baixo | Baixo | Ler de `site` | `src/data/faq.ts` |
| 13 | Palavras-chave fracas nos serviços | Corporativo sem "Londrina"; "cerimonialista" ausente | Médio | Baixo | "em Londrina e região"; "cerimonialista" depende de confirmação | `src/data/services.ts` |
| 14 | Texto duplicado na faixa | 5 nomes de serviço 2× no HTML | Baixo | Baixo | 2ª cópia só no navegador | `Services.tsx` |
| 15 | Falta uma definição fácil de citar | Sobre começa pela história | Médio | Baixo | Frase de abertura com fatos já publicados | `src/data/content.ts` |
| 16 | Só o WhatsApp é medido | Telefone, mapa e Instagram sem `data-track`; GA4 sem ID | Médio | Baixo | `click_phone`, `click_directions`, `click_instagram` | `Contact.tsx`, `Footer.tsx`, `Header.tsx` |
| 17 | Alts longos na galeria | 11 alts com mais de 110 caracteres + "Ampliar foto:" | Baixo | Médio | Alts de até cerca de 100 caracteres; prefixo "Ampliar:" | `portfolio.ts`, `PortfolioGallery.tsx` |
| 18 | URLs do site antigo | `/index.php`, `/sobre.php` | Baixo | Baixo | 301 para `/` e `/#sobre` | `vercel.json` |
| 19 | Resultado de busca dominado por diretório | Resultados do casamentos.com.br | Alto | Fora do código | Perfis no casamentos.com.br e no Google Business Profile com o mesmo NAP | pendência |

## Pendências de conteúdo

Nenhum desses dados será inventado. Cada item entra no site quando for confirmado.

- Número de WhatsApp: (43) 98839-5494 ou o número com um dígito a mais do site antigo.
- Uso dos termos "cerimonial" e "cerimonialista".
- Coordenadas do endereço (tiradas do Google Business Profile) para o `geo` do JSON-LD.
- Horário de atendimento, e-mail, razão social e CNPJ.
- Respostas definitivas do FAQ.
- Cidades da "região" atendidas.
- ID do GA4 (e do Meta Pixel, se for usar).
- Depoimentos reais com autorização.
- Para as páginas por serviço: texto de cada serviço e mais fotos de corporativo e aniversário.
- Fora do site: Google Business Profile (categoria, NAP idêntico, link para o site, fotos, posts, avaliações) e perfil no casamentos.com.br.

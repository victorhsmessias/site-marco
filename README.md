# Site da Marco Bispo Assessoria

Site institucional da Marco Bispo Assessoria (assessoria de eventos, Londrina/PR). Uma página principal com âncoras, mais a Política de Privacidade. O objetivo do site é um só: levar o visitante a pedir orçamento pelo WhatsApp.

> **Antes de publicar**, resolva as pendências de [`CONTENT_TODO.md`](CONTENT_TODO.md). As mais importantes: confirmar o número de WhatsApp e obter a autorização de uso das fotos.

## Como rodar

Requisito: Node.js 20.9 ou mais novo.

```bash
npm install
npm run dev        # http://localhost:3000, com atualização automática
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Site em modo de desenvolvimento |
| `npm run build` | Gera o site estático na pasta `out/` |
| `npm run start` | Serve a pasta `out/` em http://localhost:3000 (rode o build antes) |
| `npm run lint` | Confere o código com o ESLint |
| `npm run typecheck` | Confere os tipos do TypeScript |
| `npm run images` | Gera as fotos otimizadas e os arquivos de marca (favicon, imagem de compartilhamento) |
| `npm run screenshots` | Tira screenshots do build em 375, 768 e 1440 px (em `reports/screenshots/`) |
| `npm run lighthouse` | Roda o Lighthouse no perfil de celular (em `reports/lighthouse/`) |

Na primeira vez, o `npm run screenshots` pede o navegador do Playwright: `npx playwright install chromium`.

## Como editar o conteúdo

Todo o conteúdo fica em dois lugares. Não é preciso mexer nos componentes.

| O que mudar | Arquivo |
|---|---|
| WhatsApp, telefone, endereço, Instagram, horário, e-mail, CNPJ | `src/lib/site.ts` |
| Textos do hero, Sobre e títulos das seções; texto do botão de orçamento | `src/data/content.ts` |
| Cartões de serviço | `src/data/services.ts` |
| Etapas do "Como funciona" | `src/data/process.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Depoimentos (desligados por padrão) | `src/data/testimonials.ts` |
| Fotos: categoria, texto alternativo, crédito, recorte | `src/data/portfolio.ts` |
| Itens do menu | `src/data/navigation.ts` |
| Cores, tipografia e espaçamentos | `src/app/globals.css` |
| Política de Privacidade | `src/app/politica-de-privacidade/page.tsx` |

Depois de editar, rode `npm run build` e publique a pasta `out/` de novo.

### Trocar ou adicionar fotos

1. Coloque o arquivo original em `assets-originais/`, com o nome `marcobispo-NN-descricao.jpg`.
2. Acrescente a foto em `src/data/portfolio.ts` (categoria, texto alternativo, crédito, largura e altura do original) e, se for para a galeria, na lista `portfolio` no fim do arquivo.
3. Rode `npm run images`. O script gera AVIF e WebP em vários tamanhos em `public/images/portfolio/`, nunca maiores que o original, e avisa se `portfolio.ts` não bater com os arquivos.

### Ligar os depoimentos

Em `src/data/testimonials.ts`, substitua os itens de exemplo por depoimentos reais (sem `example: true`) e troque `SHOW_TESTIMONIALS` para `true`. A seção e o item "Depoimentos" do menu aparecem sozinhos. Itens marcados como exemplo nunca são exibidos, mesmo com a flag ligada.

### Ligar a medição (GA4 e Meta Pixel)

Desligada por padrão. Copie `.env.example` para `.env.local`, preencha `NEXT_PUBLIC_GA_MEASUREMENT_ID` e/ou `NEXT_PUBLIC_META_PIXEL_ID` e gere o build de novo. Com isso:

- aparece um aviso de cookies, e os scripts só carregam depois do "Aceitar";
- todo botão de WhatsApp envia o evento `click_whatsapp` (com o local do clique: `hero`, `header`, `contact_form` etc.); no Meta Pixel ele vira o evento padrão `Contact`;
- a Política de Privacidade passa a citar as ferramentas ativas.

## Como publicar

O build gera um site 100% estático em `out/`. Há dois caminhos.

**Hospedagem de arquivos estáticos** (Vercel, Netlify, Cloudflare Pages ou a hospedagem atual): rode `npm run build` e envie o conteúdo de `out/`. Em serviços com build automático, o comando é `npm run build` e a pasta de saída é `out`.

**Docker (nginx):**

```bash
docker build -t marcobispo-site .
docker run --rm -p 8080:80 marcobispo-site     # http://localhost:8080
```

Em qualquer caso, o site precisa estar em **HTTPS** no domínio `https://www.marcobispo.com` (canonical, sitemap e imagem de compartilhamento usam esse endereço). Se o domínio mudar, defina `NEXT_PUBLIC_SITE_URL` antes do build. Depois de publicar, envie `https://www.marcobispo.com/sitemap.xml` ao Google Search Console.

## Estrutura

```
assets-originais/        fotos originais e logos oficiais (não vão para o site)
public/images/portfolio/ fotos otimizadas (geradas por npm run images)
public/og.jpg            imagem de compartilhamento 1200×630 (gerada)
scripts/                 otimização de imagens, marca, screenshots e Lighthouse
src/app/                 páginas, estilos globais, sitemap, robots e favicon
src/components/          seções, layout, logo e componentes de interface
src/data/                conteúdo editável
src/lib/                 dados da empresa, WhatsApp, imagens e medição
```

## Decisões registradas

- **Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS 4, com exportação estática (`output: 'export'`).
- **Imagens sem `next/image`:** o otimizador do Next não roda em exportação estática. As fotos são otimizadas antes do build, e o componente `Picture` monta `<picture>` com AVIF, WebP e JPEG de reserva, `srcset` e `sizes` por uso, só com tamanhos que existem de fato (nada é ampliado). Só a foto do hero tem prioridade (LCP).
- **Sem Framer Motion:** as animações são CSS com um observador de poucas linhas. Fica mais leve e respeita `prefers-reduced-motion` (quem pede menos movimento vê tudo parado). São dois grupos, ambos em `src/app/globals.css`:
  - **Entradas ao rolar** (`data-reveal`): títulos revelados em cortina, fotos que se abrem de cima para baixo, cartões, etapas, fotos da galeria e perguntas em cascata, fios dourados que se desenham. Funcionam em todos os navegadores. O atraso em cascata vem de `stagger()` em `src/lib/motion.ts`.
  - **Efeitos presos à rolagem** (CSS `animation-timeline`): parallax do hero e da foto do Sobre, faixa com os nomes dos serviços, ornamento da logo que gira e barra de progresso no cabeçalho. Em navegadores sem esse recurso (hoje, principalmente o Firefox e versões antigas do Safari), esses elementos ficam parados e a barra não aparece. Quem recorta um desses elementos precisa usar `overflow-clip`, não `overflow-hidden`, senão a animação trava.
- **Links internos são âncoras comuns**, não `next/link`: na exportação estática, os arquivos de pré-carregamento do `next/link` para a página de privacidade deram 404. Âncoras funcionam em qualquer hospedagem.
- **Menu e lightbox usam `<dialog>` nativo:** prende o foco, fecha com Esc e devolve o foco a quem abriu. O FAQ usa `<details>` nativo e funciona sem JavaScript.
- **Ordem do menu = ordem das seções** (Início, Sobre, Serviços, Como funciona, Portfólio, Contato). "Depoimentos" entra no menu sozinho quando a seção for ligada.
- **Formulário sem backend:** nada é enviado a servidor. Os campos só montam a mensagem que abre no WhatsApp.
- **Botão flutuante de WhatsApp:** some quando já há um botão de orçamento visível (hero, contato e rodapé) e enquanto o aviso de cookies está na tela.
- **Dourado em texto:** o champanhe `#B89B6A` não tem contraste suficiente sobre fundo claro. Em texto sobre claro usa-se o tom escuro `#735A2E`; o champanhe fica para fios, detalhes e o botão sobre verde.
- **Verde da marca:** `#203C2E`, tirado do site antigo. As logos são os SVGs oficiais baixados de `marcobispo.com/IMG`.
- **Dados estruturados:** `LocalBusiness` (schema.org não tem um tipo `EventPlanner`). Horário e coordenadas ficam de fora até serem confirmados. Sem marcação de FAQ, porque as respostas ainda são provisórias.
- **TypeScript 5.9 e ESLint 9:** as versões mais novas (7 e 10) ainda não são aceitas por todas as ferramentas de lint do Next.

## Resultados medidos

Build local, Lighthouse no perfil de celular (as notas variam alguns pontos entre execuções):

| Página | Desempenho | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Início | 97 a 98 | 100 | 100 | 100 |
| Política de Privacidade | 97 | 100 | 100 | 100 |

LCP de 2,2 a 2,3 s e CLS 0 na página inicial. Em duas de sete execuções, com a máquina ocupada logo após um build, o Desempenho caiu para 91 e 92. Sem rolagem horizontal e sem erros no console em 375, 768 e 1440 px. Meça de novo depois de publicar, porque a hospedagem influencia o resultado.

# Checklist de migração: vercel.app → www.marcobispo.com

Hoje o site está em `https://site-marco-flax.vercel.app/` com `X-Robots-Tag: noindex` (fora do Google de propósito). O domínio `marcobispo.com` está na Hostinger e responde **403**. Siga a ordem abaixo. Os passos marcados com ⚠️ podem derrubar algo se forem feitos fora de ordem.

## 1. Antes de mexer no DNS

- [ ] **Decidir www ou sem www.** Recomendação: **`www.marcobispo.com` como endereço principal**, com `marcobispo.com` redirecionando (301) para ele. O `www` aceita CNAME, o que facilita trocar de hospedagem no futuro, e é o formato que o projeto já usa como exemplo.
- [ ] ⚠️ **Conferir o e-mail do domínio.** Se a empresa usa e-mail `@marcobispo.com` (Hostinger, Google Workspace etc.), anote os registros **MX, SPF (TXT), DKIM e DMARC** antes de qualquer mudança e mantenha esses registros. Trocar só os registros do site (A/CNAME) não afeta o e-mail. Trocar os nameservers inteiros, sim.
- [ ] ⚠️ **Checar os registros MX antes de mexer no DNS.** Rode e guarde o resultado:

  ```bash
  nslookup -type=MX marcobispo.com
  nslookup -type=TXT marcobispo.com      # SPF/verificações
  nslookup -type=TXT _dmarc.marcobispo.com
  ```

  Se aparecer algum MX, a empresa recebe e-mail no domínio: esses registros (e os TXT de SPF/DKIM/DMARC) precisam continuar idênticos depois da troca.
- [ ] Anotar os registros DNS atuais (print do painel da Hostinger), para poder voltar atrás.
- [ ] Opcional: baixar o valor de TTL dos registros A/CNAME para 300 s um dia antes, para a troca propagar mais rápido.

## 2. Domínio na Vercel

- [ ] Vercel → projeto → **Settings → Domains → Add**: `www.marcobispo.com`.
- [ ] Adicionar também `marcobispo.com` e escolher **Redirect to `www.marcobispo.com` (301)**.
- [ ] Criar no DNS da Hostinger os registros que a Vercel indicar (em geral `A @ → 76.76.21.21` e `CNAME www → cname.vercel-dns.com`; use os valores que aparecerem na tela). Mantenha os registros de e-mail.
- [ ] Esperar a Vercel mostrar **Valid Configuration** e o certificado HTTPS emitido para os dois nomes.

## 3. Variável de ambiente e novo build

- [ ] Vercel → **Settings → Environment Variables** → `NEXT_PUBLIC_SITE_URL` = `https://www.marcobispo.com` (ambiente **Production**; sem barra no fim).
- [ ] ⚠️ **Redeploy obrigatório depois de preencher a variável.** A Vercel não aplica variáveis de ambiente a deploys já feitos: vá em Deployments → último deploy de produção → **Redeploy**. O site é gerado no build, então, sem um build novo, canonical, sitemap, robots e JSON-LD continuam com o endereço antigo.

## 4. Redirecionar o vercel.app para o domínio (301)

O `noindex` continua valendo para qualquer `*.vercel.app` (inclusive previews), o que é o desejado. Falta mandar quem acessa o endereço antigo para o novo:

- [ ] Se o painel permitir, em **Settings → Domains**, editar `site-marco-flax.vercel.app` → **Redirect to `www.marcobispo.com` (301)**.
- [ ] Se não permitir, acrescentar em `vercel.json`, na lista `redirects`:

  ```json
  {
    "source": "/:path*",
    "has": [{ "type": "host", "value": "site-marco-flax.vercel.app" }],
    "destination": "https://www.marcobispo.com/:path*",
    "statusCode": 301
  }
  ```

- [ ] Os redirects de `/index.php` → `/` e `/sobre.php` → `/#sobre` (URLs do site antigo) já estão em `vercel.json` e passam a valer sozinhos.

## 5. Conferência técnica (logo depois do deploy)

Rode e confira cada resultado:

```bash
curl -sI https://marcobispo.com/            # 301 → https://www.marcobispo.com/
curl -sI http://www.marcobispo.com/         # 301/308 → https://www.marcobispo.com/
curl -sI https://www.marcobispo.com/        # 200 e SEM X-Robots-Tag
curl -sI https://site-marco-flax.vercel.app/  # 301 → https://www.marcobispo.com/
curl -sI https://www.marcobispo.com/index.php # 301 → /
curl -s  https://www.marcobispo.com/robots.txt   # Sitemap: https://www.marcobispo.com/sitemap.xml
curl -s  https://www.marcobispo.com/sitemap.xml  # <loc> com https://www.marcobispo.com/
curl -s  https://www.marcobispo.com/ | grep -o '<link rel="canonical"[^>]*>'   # href="https://www.marcobispo.com/"
curl -s  https://www.marcobispo.com/ | grep -o '<meta property="og:url"[^>]*>' # mesmo domínio
```

- [ ] ⚠️ **Confirmar que o domínio final NÃO tem noindex.** O `noindex` só deveria valer para `*.vercel.app`:

  ```bash
  curl -sI https://www.marcobispo.com/ | grep -i x-robots-tag
  curl -sI https://www.marcobispo.com/politica-de-privacidade/ | grep -i x-robots-tag
  ```

  Os dois comandos não podem imprimir nada. Se aparecer `X-Robots-Tag: noindex`, revise a regra `has: host` em `vercel.json` antes de enviar o sitemap ao Search Console.
- [ ] JSON-LD com o domínio novo (`"url":"https://www.marcobispo.com/"`). Validar a home no [Rich Results Test](https://search.google.com/test/rich-results) e no [validator.schema.org](https://validator.schema.org/).
- [ ] Testar o compartilhamento no WhatsApp ou no [depurador do Facebook](https://developers.facebook.com/tools/debug/) (imagem `og.jpg`, título e descrição).
- [ ] Clicar em todos os links internos (menu, rodapé, "Política de Privacidade"): eles são relativos e devem ficar no domínio novo.

## 6. Google Search Console

- [ ] Adicionar uma **propriedade de domínio** `marcobispo.com` (verificação por registro TXT no DNS da Hostinger). Ela cobre www, sem www, http e https.
- [ ] **Sitemaps** → enviar `https://www.marcobispo.com/sitemap.xml`.
- [ ] **Inspeção de URL** → `https://www.marcobispo.com/` → **Solicitar indexação**. Repetir para a Política de Privacidade.
- [ ] Nas semanas seguintes, acompanhar em **Páginas** se a home aparece como "Indexada" e se o canonical escolhido pelo Google é o do domínio.

## 7. Bing Webmaster Tools

- [ ] Entrar em [Bing Webmaster Tools](https://www.bing.com/webmasters) e usar **Importar do Google Search Console** (traz a propriedade e o sitemap). O Bing também alimenta o ChatGPT Search e o Copilot.

## 8. Perfis externos (NAP idêntico ao do site)

O nome, o endereço e o telefone devem ser escritos exatamente como no site: **Marco Bispo Assessoria · Rua Piauí, 399, Sala 706, Ed. São Paulo Towers, Londrina/PR, CEP 86010-420 · (43) 3361-1633**.

- [ ] **Google Business Profile:** site = `https://www.marcobispo.com/`; conferir nome, endereço, telefone, categoria principal (ex.: "Cerimonialista" ou "Planejador de casamentos"), categorias secundárias (eventos), área atendida, horário e fotos. Depois, copiar as coordenadas do pino para `site.geo` em `src/lib/site.ts`.
- [ ] **Instagram** (@marcobispoassessoria): link da bio para o domínio novo.
- [ ] **casamentos.com.br** e outros diretórios: criar ou atualizar o perfil com o link e o mesmo NAP.
- [ ] WhatsApp Business: site no perfil comercial.

## 9. Depois de tudo no ar

- [ ] Medir de novo com Lighthouse/PageSpeed no domínio final (mobile e desktop).
- [ ] Atualizar a data `LAST_UPDATED.home` em `src/app/sitemap.ts` sempre que o conteúdo da home mudar.
- [ ] Manter o projeto da Vercel e o redirect do vercel.app ativos por pelo menos 1 ano.

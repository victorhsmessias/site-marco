# Pendências de conteúdo

Tudo o que depende do cliente antes de publicar. No código, cada ponto está marcado com `TODO(content)`.

## Bloqueiam a publicação

- [x] **Número de WhatsApp** (confirmado pelo cliente em 12/11/2026): **(43) 98839-5494** (`5543988395494`), em `src/lib/site.ts`.
- [ ] **Autorização e originais das fotos.** As fotos vieram do Instagram ou de prints do celular e servem só para a versão de apresentação. Obter dos fotógrafos os arquivos originais em alta resolução e a autorização de uso por escrito, e a autorização de imagem de quem aparece. Duas fotos (02 e 05) têm só 900×1200 px; a `15anos-06` é um print do Instagram e as `corporativo-04`, `corporativo-06` e `institucional-05` são prints da tela do celular (recortados em `scripts/optimize-images.mjs`).
- [ ] **Foto do Sobre do Instagram.** A foto escolhida (Marco Bispo de pé, rindo, com a xícara de café; post de 15/12/2025, https://www.instagram.com/p/DSSwERlEXro/) só existe aqui como prévia do link: recorte quadrado de 640 px, que corta o ombro direito. Ficou borrada e não dava para centralizar, então o Sobre usa por enquanto o retrato sentado com café (`corporativo-02`), do mesmo ensaio. Ao receber o original, salvar em `assets-originais/marcobispo-sobre-retrato-fundador-cafe.jpg`, atualizar largura, altura e `position` em `src/data/portfolio.ts`, trocar a foto em `src/components/sections/About.tsx` e rodar `npm run images`.
- [ ] **Foto do "Como funciona" em boa resolução.** A foto das velas (post de 18/05/2025, https://www.instagram.com/p/DJz98otxteA/) está só na prévia do link: recorte quadrado de 640 px. Pedir o original e salvar em `assets-originais/marcobispo-processo-velas.jpg` (mesmo nome); depois atualizar largura e altura em `src/data/portfolio.ts` e rodar `npm run images`.
- [ ] **Debutantes são menores de idade.** As fotos de 15 anos precisam de autorização de imagem assinada pelos pais ou responsáveis. A foto `15anos-06` mostra também o cantor da festa e convidados: confirmar que podem aparecer.
- [ ] **Quem aparece na foto 11** (`marcobispo-11-assessor-cerimonia.jpg`). Desde 26/10/2026 a foto não aparece mais no site: a seção "Como funciona" usa a foto das velas do Instagram. Só volta a ser pendência se a foto 11 for usada de novo.
- [ ] **"Entre as cinco melhores assessorias de Londrina."** A fonte é a reportagem do portal Inesquecível Casamento (por volta de 2019), e o Sobre agora cita o ano e o portal, com link. A reportagem não diz em que se baseia a classificação. Se o cliente souber de um ranking ou prêmio mais recente, trocar; se preferir não arriscar, desligar com `rankingClaim.show: false` em `src/data/content.ts`.
- [ ] **Política de Privacidade.** O texto descreve o que o site faz hoje, mas precisa de revisão do cliente (de preferência com apoio jurídico). Preencher em `src/lib/site.ts`: razão social (`legalName`), CNPJ (`cnpj`) e e-mail de contato (`email`), que também é o canal para pedidos sobre dados pessoais.

## Créditos das fotos

Confirmados (pelas legendas do Instagram) e já exibidos no site:

| Foto | Crédito |
|---|---|
| 01 noiva no carro | Foto: @baroes.wedding |
| 02 casal, fundo verde | Foto: @soulsidefotografia |
| 05 noiva no sofá capitonê | Foto: @soulsidefotografia |
| 06 casal loiro, decoração | Foto: @fotografiadubau |
| 09 mesa de doces, copos-de-leite | Decoração: @cristallolocacoes |

A confirmar (hoje aparecem sem crédito):

- [ ] 03 casal com copos-de-leite
- [ ] 04 casal em preto e branco (parece ser do mesmo ensaio da foto 02)
- [ ] 07 casal e bolo
- [ ] 08 casal em close
- [ ] 09 mesa de doces: falta o crédito de quem fotografou
- [ ] 10 mesa de doces, jardim colorido
- [ ] 11 bastidores da cerimônia
- [ ] Todas as fotos novas: `15anos-01` a `06`, `aniversario-01` a `03`, `corporativo-04` e `06`, `institucional-05` e os retratos do fundador (`corporativo-01` a `03`)

Onde mudar: campo `credit` de cada foto em `src/data/portfolio.ts`.

## Conteúdo a confirmar

- [x] **Tipos de evento** (confirmado pelo cliente em 22/10/2026): casamentos, festas de 15 anos, aniversários e eventos corporativos. A assessoria **não** presta serviço de decoração nem de produção, por isso o cartão e a opção "Decoração e produção" saíram do site, assim como o filtro "Decoração" da galeria. Os filtros do portfólio agora são os quatro tipos de evento.
- [ ] **Frases dos cartões de serviço.** Revisar as cinco descrições em `src/data/services.ts`, em especial as novas de Aniversários e Eventos corporativos.
- [ ] **"Cerimonial" e "cerimonialista".** O site usa "cerimonial" no hero e no cartão de casamentos (ajuda na busca por "cerimonial em Londrina"). Confirmar que a empresa oferece o serviço com esse nome e se aceita ser apresentada como "cerimonialista": só assim o termo entra no texto, para mirar a busca "cerimonialista Londrina".
- [ ] **Depoimentos reais.** A seção está pronta e desligada (`SHOW_TESTIMONIALS = false`). Coletar depoimentos com autorização por escrito e preencher `src/data/testimonials.ts`. Nunca publicar depoimentos inventados.
- [x] **FAQ** (confirmado pelo cliente em 12/11/2026): as seis respostas de `src/data/faq.ts` estão corretas. Elas também geram o `FAQPage` dos dados estruturados.
- [ ] **"Como funciona".** Revisar as cinco etapas em `src/data/process.ts`, em especial o que a empresa faz no pós-evento.
- [ ] **Horário de atendimento.** O cliente confirmou o horário em 12/11/2026, mas o texto ainda não foi passado: hoje o horário não aparece em lugar nenhum do site (`openingHours` está `null` em `src/lib/site.ts`). Falta informar dias e horários exatos (ex.: "Segunda a sexta, das 9h às 18h"). Ao preencher `openingHours`, ele aparece na seção Contato, abaixo do endereço, e entra no `LocalBusiness` como `openingHoursSpecification`, com o mesmo texto. Sugestão: mostrar também no rodapé e na resposta do FAQ sobre o escritório.
- [ ] **Textos do Sobre e os três valores.** Os parágrafos seguem a reportagem do portal Inesquecível Casamento (por volta de 2019): eventos desde os 12 anos, abertura no início de 2014, escritório maior em 2019, clientes por indicação, proximidade e planejamento orçamentário. Os três valores ("Amor pelo que fazemos", "Atenção ao detalhe", "Excelência na entrega") vêm das frases da marca. Revisar em `src/data/content.ts` se tudo continua atual (por exemplo, se o escritório de 2019 é o da Rua Piauí).

## SEO e lançamento (abertas em 12/11/2026)

- [ ] **Termo "cerimonialista"**: ver o item "Cerimonial" e "cerimonialista" acima.
- [ ] **Google Business Profile.** Dar acesso ao perfil (para conferir nome, endereço, telefone, categoria e link do site) e passar as coordenadas do pino, que vão para `geo` em `src/lib/site.ts` e entram sozinhas nos dados estruturados.
- [ ] **ID do GA4** (e do Meta Pixel, se for usar). Preencher `NEXT_PUBLIC_GA_MEASUREMENT_ID` na Vercel e marcar `click_whatsapp` e `click_phone` como eventos-chave (ver README).
- [ ] **Perfil no casamentos.com.br.** As buscas "assessoria de casamento Londrina" e "cerimonialista Londrina" mostram quase só perfis desse diretório. Criar ou atualizar o perfil com o mesmo nome, endereço e telefone do site e o link para ele.
- [ ] **Data da troca de domínio** (vercel.app → www.marcobispo.com). Passo a passo em `docs/seo/checklist-migracao-dominio.md`. Hoje `marcobispo.com` responde 403.

## Opcionais

- [ ] **E-mail de contato**, se a empresa quiser divulgar um (`email` em `src/lib/site.ts`).
- [ ] **Crédito de desenvolvimento no rodapé** (`developerCredit` em `src/lib/site.ts`). Hoje o rodapé não mostra crédito.
- [ ] **Páginas por serviço** (casamento, 15 anos, corporativo, aniversário). Ficaram para a próxima rodada; precisam de texto próprio de cada serviço (o que inclui, como funciona, perguntas) e, para corporativo e aniversário, de mais fotos. Ver `docs/seo/auditoria-2026-11-12.md`.
- [ ] **Mais fotos de eventos corporativos.** O filtro tem só 2 fotos, ambas prints do celular.
- [ ] **Foto de formatura** (`institucional-05`). Formatura não é um dos quatro tipos de evento, por isso a foto aparece só em "Todos". Decidir se entra em "Eventos corporativos" ou se vale criar um filtro "Formaturas".
- [ ] **Retratos do fundador** (`corporativo-01` a `03`). São retratos de estúdio, fora da galeria. O `corporativo-01` agora é a foto do Sobre, com o texto alternativo "Marco Bispo, fundador da assessoria…". Confirmar que a pessoa do retrato é mesmo Marco Bispo.
- [ ] **Foto `15anos-05`.** O nome do arquivo diz "dança com o pai", mas quem dança parece ser o rapaz da foto `15anos-03`. O texto alternativo ficou neutro ("um rapaz de terno"); confirmar.
- [ ] **Tipo de evento das fotos 09 e 10** (mesas de doces). Hoje aparecem só em "Todos". Informar se eram de casamento, 15 anos, aniversário ou evento corporativo.

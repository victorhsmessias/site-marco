# Pendências de conteúdo

Tudo o que depende do cliente antes de publicar. No código, cada ponto está marcado com `TODO(content)`.

## Bloqueiam a publicação

- [ ] **Número de WhatsApp.** O site usa **(43) 98839-5494** (`5543988395494`), que é o número do link do site antigo. O rodapé antigo mostrava "(43) 988395-4943", com um dígito a mais. Confirmar qual é o certo. Onde mudar: `WHATSAPP_NUMBER` e `whatsapp.display` em `src/lib/site.ts`.
- [ ] **Autorização e originais das fotos.** As 11 fotos vieram do Instagram e servem só para a versão de apresentação. Obter dos fotógrafos os arquivos originais em alta resolução e a autorização de uso por escrito, e a autorização de imagem dos casais. Duas fotos (02 e 05) têm só 900×1200 px.
- [ ] **Quem aparece na foto 11** (`marcobispo-11-assessor-cerimonia.jpg`, seção "Como funciona"). Confirmar quem são as duas pessoas e se autorizam o uso. A foto é uma captura de vídeo. Enquanto isso, o texto alternativo e a legenda são neutros ("Integrante da equipe…", "Bastidores de uma cerimônia"). Onde mudar: `src/data/portfolio.ts` e `processIntro.photoCaption` em `src/data/content.ts`.
- [ ] **"Entre as 5 melhores empresas de assessoria da cidade."** A frase está na seção Sobre, como no site antigo, mas não tem fonte. Confirmar a origem (prêmio, ranking, ano) ou desligar com `rankingClaim.show: false` em `src/data/content.ts`. Afirmação de ranking sem comprovação pode ser questionada como publicidade enganosa.
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

Onde mudar: campo `credit` de cada foto em `src/data/portfolio.ts`.

## Conteúdo a confirmar

- [ ] **Serviços.** Confirmar se a empresa atende eventos corporativos e outros eventos sociais. O cartão "Eventos corporativos e sociais" existe, mas está escondido (`published: false` em `src/data/services.ts`). Revisar também as frases dos quatro cartões publicados.
- [ ] **"Cerimonial".** O site usa o termo no hero e no cartão de casamentos (ajuda na busca por "cerimonial em Londrina"). Confirmar que a empresa oferece o serviço com esse nome.
- [ ] **Depoimentos reais.** A seção está pronta e desligada (`SHOW_TESTIMONIALS = false`). Coletar depoimentos com autorização por escrito e preencher `src/data/testimonials.ts`. Nunca publicar depoimentos inventados.
- [ ] **FAQ.** As seis respostas são genéricas de propósito. Confirmar em `src/data/faq.ts`:
  - prazo de resposta do orçamento e se a primeira conversa tem custo;
  - cidades atendidas fora de Londrina e condições de deslocamento;
  - antecedência mínima e recomendada para contratar;
  - tipos de evento atendidos;
  - como é o acompanhamento no dia do evento (equipe, horários);
  - se o atendimento no escritório é só com hora marcada.
- [ ] **"Como funciona".** Revisar as cinco etapas em `src/data/process.ts`, em especial o que a empresa faz no pós-evento.
- [ ] **Horário de atendimento.** Hoje não aparece em lugar nenhum. Preencher `openingHours` em `src/lib/site.ts` para entrar na seção Contato e nos dados estruturados do Google.
- [ ] **Textos do Sobre e os três valores.** Foram escritos a partir das frases da marca ("respira amor", "toque de excelência", "cada detalhe"). Revisar em `src/data/content.ts`.

## Opcionais

- [ ] **E-mail de contato**, se a empresa quiser divulgar um (`email` em `src/lib/site.ts`).
- [ ] **Crédito de desenvolvimento no rodapé** (`developerCredit` em `src/lib/site.ts`). Hoje o rodapé não mostra crédito.
- [ ] **Medição.** Criar a propriedade do GA4 e/ou o Meta Pixel e preencher `.env.local` (ver README).
- [ ] **Perfil da Empresa no Google.** Conferir se nome, endereço e telefone do perfil estão iguais aos do site. Com as coordenadas do endereço confirmadas, dá para acrescentá-las aos dados estruturados (`src/components/seo/JsonLd.tsx`).
- [ ] **Mais fotos de decoração e de festas de 15 anos.** O filtro "Decoração" tem só 3 fotos, e não há nenhuma foto de festa de 15 anos, apesar de ser um dos serviços.

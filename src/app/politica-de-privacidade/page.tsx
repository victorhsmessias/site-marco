import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { GA_ID, META_PIXEL_ID, analyticsEnabled } from '@/lib/analytics';
import { fullAddress, site } from '@/lib/site';

// TODO(content): texto-base, escrito para descrever o que este site faz de fato.
// Antes de publicar, revisar com o cliente (e, se possível, com apoio jurídico)
// e preencher em `src/lib/site.ts`: razão social, CNPJ e e-mail de contato.
const LAST_UPDATED = '12 de outubro de 2026';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: `Como a ${site.name} trata os dados pessoais de quem visita este site, conforme a Lei Geral de Proteção de Dados (LGPD).`,
  alternates: { canonical: '/politica-de-privacidade/' },
  openGraph: { url: '/politica-de-privacidade/', title: 'Política de Privacidade' },
};

function Topic({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-h3 font-medium text-forest">{title}</h2>
      <div className="mt-4 space-y-4 text-pretty">{children}</div>
    </section>
  );
}

const textLink = 'text-forest underline decoration-gold decoration-1 underline-offset-4';

export default function PrivacyPolicyPage() {
  const measurementTools = [GA_ID && 'Google Analytics 4', META_PIXEL_ID && 'Meta Pixel'].filter(
    Boolean,
  );

  return (
    <article className="mx-auto max-w-3xl px-gutter pt-[calc(var(--header-h)+3.5rem)] pb-section text-ink-muted">
      <p className="eyebrow">Privacidade</p>
      <h1 className="font-display text-h2 mt-5 font-medium text-balance text-forest">
        Política de Privacidade
      </h1>
      <p className="mt-4 text-sm">Última atualização: {LAST_UPDATED}</p>

      <p className="text-lead mt-8 text-pretty">
        Esta página explica, de forma direta, como a {site.name} trata os dados pessoais de quem
        visita este site, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018,
        a LGPD).
      </p>

      <Topic title="1. Quem é responsável pelos seus dados">
        <p>
          A responsável (controladora) é a {site.legalName ?? site.name}
          {site.cnpj ? `, CNPJ ${site.cnpj}` : ''}, com endereço na {fullAddress}.
        </p>
      </Topic>

      <Topic title="2. Quais dados tratamos">
        <p>
          <strong className="font-semibold text-ink">Formulário de orçamento.</strong> Os campos
          que você preenche (nome, tipo de evento, data prevista, cidade ou local, número de
          convidados e mensagem) servem apenas para montar uma mensagem no seu WhatsApp. Este
          site não envia nem guarda essas informações em servidor próprio: elas só chegam até nós
          se você enviar a mensagem pelo WhatsApp.
        </p>
        <p>
          <strong className="font-semibold text-ink">Conversas por WhatsApp e telefone.</strong>{' '}
          Quando você fala com a gente, recebemos os dados que decidir compartilhar (como nome,
          telefone e informações do evento) e os usamos para atender ao seu pedido, preparar o
          orçamento e, se houver contratação, prestar o serviço.
        </p>
        <p>
          <strong className="font-semibold text-ink">Dados de navegação.</strong> Como em qualquer
          site, o serviço de hospedagem pode registrar dados técnicos de acesso (como endereço IP,
          data, hora e páginas visitadas) por segurança e para o funcionamento do site.
        </p>
      </Topic>

      <Topic title="3. Cookies e medição de audiência">
        {analyticsEnabled ? (
          <>
            <p>
              Com a sua autorização, usamos {measurementTools.join(' e ')} para entender como o
              site é usado e melhorar a sua experiência. Essas ferramentas usam cookies e só são
              carregadas depois que você clica em “Aceitar” no aviso de cookies. Se recusar, nada
              é carregado e o site funciona normalmente.
            </p>
            <p>
              Você pode mudar de ideia quando quiser apagando os dados deste site nas
              configurações do seu navegador: o aviso volta a aparecer na próxima visita.
            </p>
          </>
        ) : (
          <p>
            Este site não usa cookies de publicidade nem ferramentas de medição de audiência. Se
            isso mudar, esta política será atualizada e você verá um aviso para aceitar ou
            recusar antes de qualquer coleta.
          </p>
        )}
      </Topic>

      <Topic title="4. Para que usamos os dados e com que base legal">
        <p>
          Usamos os dados para responder a pedidos de orçamento e contato, a seu pedido
          (procedimentos anteriores a um contrato, art. 7º, V, da LGPD), para cumprir obrigações
          legais e, quando houver medição de audiência, com o seu consentimento (art. 7º, I).
        </p>
      </Topic>

      <Topic title="5. Com quem os dados são compartilhados">
        <p>
          Não vendemos dados pessoais. O atendimento acontece em serviços de terceiros, que tratam
          dados conforme as políticas de cada um: o WhatsApp e o Instagram (Meta) e o Google Maps,
          quando você clica no link do mapa.
          {analyticsEnabled &&
            ' As ferramentas de medição citadas acima também recebem dados de navegação, se você aceitar.'}{' '}
          Esses serviços podem armazenar dados fora do Brasil.
        </p>
      </Topic>

      <Topic title="6. Por quanto tempo guardamos">
        <p>
          Guardamos os dados das conversas pelo tempo necessário para atender ao seu pedido e
          cumprir obrigações legais. Você pode pedir a exclusão a qualquer momento, e ela será
          feita sempre que não houver obrigação de manter o registro.
        </p>
      </Topic>

      <Topic title="7. Seus direitos">
        <p>
          A LGPD garante a você, entre outros, o direito de confirmar se tratamos os seus dados,
          acessá-los, corrigi-los, pedir a exclusão ou a portabilidade, revogar o consentimento e
          obter informações sobre o compartilhamento. Você também pode apresentar reclamação à
          Autoridade Nacional de Proteção de Dados (ANPD).
        </p>
      </Topic>

      <Topic title="8. Como falar com a gente sobre privacidade">
        <p>
          Para exercer os seus direitos ou tirar dúvidas, entre em contato pelo telefone{' '}
          <a href={site.phone.href} className={textLink}>
            {site.phone.display}
          </a>
          {site.email && (
            <>
              , pelo e-mail{' '}
              <a href={`mailto:${site.email}`} className={textLink}>
                {site.email}
              </a>
            </>
          )}{' '}
          ou no endereço {fullAddress}.
        </p>
      </Topic>

      <Topic title="9. Alterações nesta política">
        <p>
          Esta política pode ser atualizada. A data no início da página indica a versão em vigor.
        </p>
      </Topic>

      <p className="mt-14">
        <a href="/" className="btn btn-outline">
          Voltar para o início
        </a>
      </p>
    </article>
  );
}

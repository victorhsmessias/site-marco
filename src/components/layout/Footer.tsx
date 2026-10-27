import { LogoLockup } from '@/components/brand/Logo';
import { InstagramIcon } from '@/components/ui/Icons';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { navigation } from '@/data/navigation';
import { stagger } from '@/lib/motion';
import { site } from '@/lib/site';

const linkClass =
  'inline-flex min-h-11 min-w-11 items-center text-sage transition-colors hover:text-ivory';
const headingClass = 'text-xs font-medium tracking-[0.2em] text-gold-light uppercase';

export function Footer() {
  const { address } = site;
  const year = new Date().getFullYear();

  return (
    <footer data-fab-hide className="on-dark bg-forest-deep text-ivory">
      <div className="mx-auto max-w-site px-gutter pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4" data-reveal>
            <a
              href="/#inicio"
              aria-label={`${site.name}: página inicial`}
              className="inline-flex min-h-11 items-center"
            >
              <LogoLockup />
            </a>
            <p className="font-display mt-6 max-w-xs text-2xl leading-snug font-medium text-pretty italic">
              {site.tagline}
            </p>
          </div>

          <div className="lg:col-span-3" data-reveal style={stagger(1, 110)}>
            <h2 className={headingClass}>Contato</h2>
            <ul className="mt-3">
              <li>
                <WhatsAppLink location="footer" className={linkClass}>
                  <span>
                    WhatsApp <span className="whitespace-nowrap">{site.whatsapp.display}</span>
                  </span>
                </WhatsAppLink>
              </li>
              <li>
                <a href={site.phone.href} className={linkClass}>
                  <span>
                    Telefone <span className="whitespace-nowrap">{site.phone.display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} gap-2.5`}
                >
                  <InstagramIcon className="h-5 w-5" />
                  <span className="sr-only">Instagram da {site.name}: </span>
                  {site.instagram.handle}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3" data-reveal style={stagger(2, 110)}>
            <h2 className={headingClass}>Endereço</h2>
            <address className="mt-5 leading-relaxed text-sage not-italic">
              {address.street}
              <br />
              {address.complement}
              <br />
              {address.city}/{address.state}
              <br />
              CEP {address.postalCode}
            </address>
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} underline decoration-ivory/30 decoration-1 underline-offset-4`}
            >
              Ver no mapa
              <span className="sr-only"> (abre o Google Maps em nova aba)</span>
            </a>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-2" data-reveal style={stagger(3, 110)}>
            <h2 className={headingClass}>Navegação</h2>
            <ul className="mt-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/#faq" className={linkClass}>
                  Perguntas frequentes
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-x-8 gap-y-2 border-t border-ivory/15 pt-6 text-sm text-sage sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {site.city}/{site.state}.
          </p>
          <ul className="flex flex-wrap items-center gap-x-8">
            <li>
              <a href="/politica-de-privacidade/" className={linkClass}>
                Política de Privacidade
              </a>
            </li>
            {site.developerCredit && (
              <li>
                {site.developerCredit.url ? (
                  <a
                    href={site.developerCredit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {site.developerCredit.label}
                  </a>
                ) : (
                  site.developerCredit.label
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}

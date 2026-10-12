import type { ReactNode } from 'react';
import { InstagramIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { CTA_LABEL, contact } from '@/data/content';
import { stagger } from '@/lib/motion';
import { site } from '@/lib/site';
import { ContactForm } from './ContactForm';

function ContactRow({
  icon,
  label,
  index,
  children,
}: {
  icon: ReactNode;
  label: string;
  /** Posição na lista, para a entrada em cascata. */
  index: number;
  children: ReactNode;
}) {
  return (
    <li
      data-reveal="left"
      style={stagger(index, 100)}
      className="flex gap-4 border-t border-ivory/15 py-5"
    >
      <span className="mt-0.5 text-gold-light">{icon}</span>
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-gold-light uppercase">{label}</p>
        <div className="mt-1 text-ivory">{children}</div>
      </div>
    </li>
  );
}

const rowLink = 'inline-flex min-h-11 items-center underline decoration-ivory/30 decoration-1 underline-offset-4 transition-colors hover:decoration-gold-light';

export function Contact() {
  const { address } = site;

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      data-fab-hide
      className="on-dark bg-forest py-section text-ivory"
    >
      <div className="mx-auto grid max-w-site gap-14 px-gutter lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contato-title"
            eyebrow={contact.eyebrow}
            title={contact.title}
            lead={contact.lead}
          />

          <div className="mt-9" data-reveal style={stagger(3, 120)}>
            <WhatsAppLink location="contact" className="btn btn-gold w-full sm:w-auto">
              <WhatsAppIcon className="h-5 w-5" />
              {CTA_LABEL}
            </WhatsAppLink>
          </div>

          <ul className="mt-12 border-b border-ivory/15">
            <ContactRow index={0} icon={<WhatsAppIcon className="h-5 w-5" />} label="WhatsApp">
              <WhatsAppLink location="contact_number" className={rowLink}>
                {site.whatsapp.display}
              </WhatsAppLink>
            </ContactRow>

            <ContactRow index={1} icon={<PhoneIcon className="h-5 w-5" />} label="Telefone">
              <a href={site.phone.href} className={rowLink}>
                {site.phone.display}
              </a>
            </ContactRow>

            <ContactRow index={2} icon={<MapPinIcon className="h-5 w-5" />} label="Endereço">
              <address className="pt-2 leading-relaxed not-italic">
                {address.street}, {address.complement}
                <br />
                {address.city}/{address.state}, CEP {address.postalCode}
              </address>
              <a
                href={address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${rowLink} text-sm text-sage`}
              >
                Ver no mapa
                <span className="sr-only"> (abre o Google Maps em nova aba)</span>
              </a>
              {site.openingHours && (
                <p className="pb-2 text-sm text-sage">{site.openingHours.label}</p>
              )}
            </ContactRow>

            <ContactRow index={3} icon={<InstagramIcon className="h-5 w-5" />} label="Instagram">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={rowLink}
              >
                <span className="sr-only">Instagram da {site.name}: </span>
                {site.instagram.handle}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </ContactRow>
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal="right">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

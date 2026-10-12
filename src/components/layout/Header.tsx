'use client';

import { useEffect, useRef, useState } from 'react';
import { LogoLockup } from '@/components/brand/Logo';
import { CloseIcon, InstagramIcon, MenuIcon, PhoneIcon } from '@/components/ui/Icons';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { CTA_LABEL } from '@/data/content';
import { navigation } from '@/data/navigation';
import { site } from '@/lib/site';

const MENU_ID = 'menu-principal';

export function Header() {
  const menuRef = useRef<HTMLDialogElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Fundo do cabeçalho: transparente no topo, sólido depois de rolar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Destaca no menu a seção que está no meio da tela.
  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.sectionId))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // O <dialog> nativo cuida de prender o foco, fechar com Esc e devolver o foco ao botão.
  const openMenu = () => {
    menuRef.current?.showModal();
    setMenuOpen(true);
  };
  const closeMenu = () => menuRef.current?.close();

  return (
    <>
      <header
        data-scrolled={scrolled || undefined}
        className="no-print fixed inset-x-0 top-0 z-40 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-500 data-scrolled:border-line data-scrolled:bg-ivory/95 data-scrolled:shadow-[0_1px_24px_-12px_rgb(22_41_31/0.25)] supports-backdrop-filter:data-scrolled:bg-ivory/85 supports-backdrop-filter:data-scrolled:backdrop-blur-md"
      >
        <div className="mx-auto flex h-(--header-h) max-w-site items-center justify-between gap-6 px-gutter">
          <a
            href="/#inicio"
            aria-label={`${site.name}: página inicial`}
            className="-ml-1 flex min-h-11 items-center px-1 text-forest"
          >
            <LogoLockup />
          </a>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={activeSection === item.sectionId ? 'location' : undefined}
                    className="group flex min-h-11 items-center px-3.5 text-[0.9375rem] text-ink transition-colors hover:text-forest aria-[current]:text-forest"
                  >
                    <span className="relative py-1">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-soft group-hover:scale-x-100 group-aria-[current]:scale-x-100 motion-reduce:transition-none"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <WhatsAppLink location="header" className="btn btn-sm btn-primary hidden sm:inline-flex">
              {CTA_LABEL}
            </WhatsAppLink>
            <button
              type="button"
              onClick={openMenu}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              aria-label="Abrir menu"
              className="-mr-2.5 flex h-11 w-11 items-center justify-center text-forest xl:hidden"
            >
              <MenuIcon className="h-7 w-7" />
            </button>
          </div>
        </div>
        {/* Barra dourada que avança com a rolagem (só onde o navegador tem animation-timeline). */}
        <span
          aria-hidden="true"
          className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-gold"
        />
      </header>

      <dialog
        ref={menuRef}
        id={MENU_ID}
        aria-label="Menu"
        onClose={() => setMenuOpen(false)}
        className="on-dark dialog-fade fixed inset-0 m-0 h-dvh w-full overflow-y-auto bg-forest text-ivory backdrop:bg-forest"
      >
        <div className="mx-auto flex min-h-full max-w-site flex-col px-gutter pb-10">
          <div className="flex h-(--header-h) shrink-0 items-center justify-between gap-6">
            <a
              href="/#inicio"
              onClick={closeMenu}
              aria-label={`${site.name}: página inicial`}
              className="-ml-1 flex min-h-11 items-center px-1"
            >
              <LogoLockup />
            </a>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Fechar menu"
              className="-mr-2.5 flex h-11 w-11 items-center justify-center"
            >
              <CloseIcon className="h-7 w-7" />
            </button>
          </div>

          <nav aria-label="Principal" className="mt-6 flex-1">
            <ul>
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-ivory/15">
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={activeSection === item.sectionId ? 'location' : undefined}
                    className="font-display flex min-h-14 items-center py-3 text-[1.875rem] leading-tight font-medium transition-colors hover:text-gold-light aria-[current]:text-gold-light aria-[current]:italic"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 flex flex-col gap-6">
            <WhatsAppLink location="menu" className="btn btn-gold w-full sm:w-auto sm:self-start">
              {CTA_LABEL}
            </WhatsAppLink>
            <ul className="flex flex-wrap gap-x-8 gap-y-1 text-sage">
              <li>
                <a
                  href={site.phone.href}
                  className="flex min-h-11 items-center gap-2.5 hover:text-ivory"
                >
                  <PhoneIcon className="h-5 w-5 text-gold-light" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-2.5 hover:text-ivory"
                >
                  <InstagramIcon className="h-5 w-5 text-gold-light" />
                  <span className="sr-only">Instagram da {site.name}: </span>
                  {site.instagram.handle}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </dialog>
    </>
  );
}

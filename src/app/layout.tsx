import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { Analytics } from '@/components/analytics/Analytics';
import { LogoSprite } from '@/components/brand/Logo';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { RevealObserver } from '@/components/layout/RevealObserver';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';
import { JsonLd } from '@/components/seo/JsonLd';
import { site } from '@/lib/site';
import './globals.css';

// Serifa dos títulos. Só o peso 500 (normal e itálico) para manter o site leve.
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

// Sans-serif do corpo (fonte variável: um único arquivo para todos os pesos).
const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const title = `${site.name} | Assessoria de casamento e eventos em Londrina`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: `Logo da ${site.name} ao lado de uma noiva sorridente com buquê de copos-de-leite`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: site.description,
    images: ['/og.jpg'],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: '#203c2e',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // `data-js` é posto pelo script abaixo antes da hidratação, por isso o suppressHydrationWarning.
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca que o JavaScript está ativo: as animações de entrada só valem nesse caso. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.js=''" }} />
      </head>
      <body>
        <a
          href="#conteudo"
          className="btn btn-sm btn-primary sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[60]"
        >
          Pular para o conteúdo
        </a>
        <LogoSprite />
        <Header />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <RevealObserver />
        <Analytics />
        <JsonLd />
      </body>
    </html>
  );
}

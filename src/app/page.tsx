import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <Portfolio />
      {/* Só aparece quando houver depoimentos reais (src/data/testimonials.ts). */}
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}

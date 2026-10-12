'use client';

import { useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@/components/ui/Icons';
import { PhotoCreditLine } from '@/components/ui/PhotoCreditLine';
import { Picture } from '@/components/ui/Picture';
import type { PortfolioCategory, PortfolioImage } from '@/data/portfolio';
import { stagger } from '@/lib/motion';

type Filter = PortfolioCategory | 'todos';

type PortfolioGalleryProps = {
  items: PortfolioImage[];
  categories: { id: PortfolioCategory; label: string }[];
};

const SWIPE_THRESHOLD = 48;

/** Galeria masonry com filtros e lightbox (teclado, toque e crédito da foto). */
export function PortfolioGallery({ items, categories }: PortfolioGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const [filter, setFilter] = useState<Filter>('todos');
  const [openId, setOpenId] = useState<string | null>(null);

  const filters: { id: Filter; label: string }[] = [{ id: 'todos', label: 'Todos' }, ...categories];
  const visible = items.filter(
    (item) => filter === 'todos' || item.categories.includes(filter),
  );
  const openIndex = visible.findIndex((item) => item.id === openId);
  const current = openIndex >= 0 ? visible[openIndex] : undefined;
  const filterLabel = filters.find((f) => f.id === filter)?.label ?? '';

  const open = (id: string) => {
    setOpenId(id);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const goTo = (index: number) => {
    const next = visible[(index + visible.length) % visible.length];
    if (next) setOpenId(next.id);
  };
  const step = (delta: number) => goTo(openIndex + delta);

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    const actions: Record<string, () => void> = {
      ArrowLeft: () => step(-1),
      ArrowRight: () => step(1),
      Home: () => goTo(0),
      End: () => goTo(visible.length - 1),
    };
    const action = actions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: PointerEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    // Só conta como gesto se for mais horizontal que vertical.
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
      step(dx < 0 ? 1 : -1);
    }
  };

  return (
    <>
      <div
        role="group"
        aria-label="Filtrar fotos do portfólio"
        className="mt-10 flex flex-wrap gap-2.5"
        data-reveal
      >
        {filters.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={filter === option.id}
            onClick={() => setFilter(option.id)}
            className="min-h-11 rounded-full border border-forest/30 px-5 text-sm font-medium text-forest transition-colors duration-300 hover:border-forest aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-ivory"
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {visible.length} {visible.length === 1 ? 'foto' : 'fotos'} em {filterLabel}
      </p>

      {/* Todas as fotos ficam montadas; o filtro só esconde, para não recarregar imagens. */}
      <ul className="mt-8 columns-2 gap-3 sm:gap-4 lg:mt-10 lg:columns-3 lg:gap-6">
        {items.map((item, index) => {
          const shown = visible.includes(item);
          return (
            <li key={item.id} hidden={!shown} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-6">
              <button
                type="button"
                onClick={() => open(item.id)}
                aria-haspopup="dialog"
                data-reveal="zoom"
                style={stagger(index % 3, 110)}
                className="group relative block w-full overflow-hidden bg-line"
              >
                <span className="sr-only">Ampliar foto: </span>
                <Picture
                  image={item}
                  sizes="(min-width: 1280px) 384px, (min-width: 1024px) 30vw, 46vw"
                  className="block overflow-hidden"
                  imgClassName="h-full w-full object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  imgStyle={{ aspectRatio: item.galleryRatio ?? '3 / 4' }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-forest-deep/0 transition-colors duration-500 group-hover:bg-forest-deep/15"
                />
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Foto ampliada"
        onClose={() => setOpenId(null)}
        onKeyDown={onKeyDown}
        onClick={(event) => {
          // Clique fora da foto e dos controles fecha.
          if (event.target === event.currentTarget) close();
        }}
        className="on-dark dialog-fade fixed inset-0 m-0 h-dvh w-full overflow-hidden bg-forest-deep/97 text-ivory backdrop:bg-forest-deep"
      >
        {current && (
          <div className="pointer-events-none flex h-full flex-col">
            <div className="pointer-events-auto flex h-16 shrink-0 items-center justify-between gap-4 px-4 sm:px-6">
              <p className="text-sm tracking-[0.14em] text-sage tabular-nums" aria-live="polite">
                <span className="sr-only">Foto </span>
                {openIndex + 1} <span aria-hidden="true">/</span>
                <span className="sr-only"> de </span> {visible.length}
                <span className="sr-only">: {current.alt}</span>
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Fechar foto ampliada"
                className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-ivory/10"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <div
              className="flex min-h-0 flex-1 touch-pan-y items-center justify-center gap-2 px-2 sm:gap-4 sm:px-6"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (swipeStart.current = null)}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Foto anterior"
                className="pointer-events-auto hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory/10 sm:flex"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>

              <Picture
                key={current.id}
                image={current}
                placeholder={false}
                sizes="min(92vw, 62vh)"
                className="pointer-events-auto flex h-full min-w-0 items-center justify-center"
                imgClassName="h-auto max-h-full w-auto max-w-full object-contain select-none [-webkit-user-drag:none]"
                imgStyle={{ maxWidth: `min(100%, ${current.width}px)` }}
              />

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Próxima foto"
                className="pointer-events-auto hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory/10 sm:flex"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="pointer-events-auto flex min-h-16 shrink-0 items-center justify-between gap-4 px-4 py-2 sm:justify-center sm:px-6">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Foto anterior"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/30 sm:hidden"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <PhotoCreditLine credit={current.credit} className="text-center text-[0.8125rem]" />
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Próxima foto"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/30 sm:hidden"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

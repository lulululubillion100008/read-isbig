import type { Book, BookTheme } from '@/lib/types';

interface BookSidebarProps {
  book: Book;
  pageNumber: number;
  totalPages: number;
  theme: BookTheme;
}

export default function BookSidebar({ book, pageNumber, totalPages, theme }: BookSidebarProps) {
  return (
    <div
      className="relative flex w-[60px] shrink-0 flex-col items-center py-10 md:w-[80px] lg:w-[100px]"
      style={{
        background: `linear-gradient(175deg, ${theme.sidebarBg} 0%, ${theme.sidebarBg}e8 50%, ${theme.sidebarBg}d0 100%)`,
      }}
    >
      {/* Ghost border - outline_variant at 15% opacity */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-px"
        style={{
          background: 'linear-gradient(180deg, rgba(225, 190, 188, 0.15) 0%, rgba(225, 190, 188, 0.05) 50%, rgba(225, 190, 188, 0.1) 100%)',
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
        }}
      />

      {/* Book title - vertical calligraphy */}
      <div className="writing-vertical flex-1 overflow-hidden">
        <h2
          className="text-base font-semibold tracking-[0.25em] text-white/85 md:text-lg lg:text-xl"
          style={{
            lineHeight: 1.9,
            textShadow: '0 1px 3px rgba(0,0,0,0.15)',
            fontFamily: 'var(--font-serif)',
          }}
        >
          {book.title}
        </h2>
      </div>

      {/* Author */}
      <div className="writing-vertical mt-8 overflow-hidden">
        <p
          className="text-[11px] font-light tracking-[0.2em] text-white/35 md:text-xs"
          style={{ lineHeight: 1.9, fontFamily: 'var(--font-serif)' }}
        >
          {book.author}
        </p>
      </div>

      {/* Page number - Lab readout style */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span
          className="text-2xl font-extralight tracking-tight text-white/90 md:text-3xl lg:text-4xl"
          style={{
            fontVariantNumeric: 'tabular-nums',
            textShadow: '0 1px 4px rgba(0,0,0,0.12)',
            fontFamily: 'var(--font-label)',
          }}
        >
          {pageNumber}
        </span>
        <div
          className="mx-auto mt-2 mb-1.5 h-px w-6"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        />
        <span
          className="block text-[10px] font-medium uppercase tracking-[0.2em] text-white/25"
          style={{ fontFamily: 'var(--font-label)' }}
        >
          {totalPages}
        </span>
      </div>
    </div>
  );
}

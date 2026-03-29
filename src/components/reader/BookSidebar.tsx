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
      className="relative flex w-[60px] shrink-0 flex-col items-center py-6 md:w-[80px] lg:w-[100px]"
      style={{ backgroundColor: theme.sidebarBg }}
    >
      {/* Book title - vertical */}
      <div
        className="flex-1 overflow-hidden"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
        }}
      >
        <h2 className="text-base font-bold tracking-widest text-white md:text-lg lg:text-xl">
          {book.title}
        </h2>
      </div>

      {/* Author - vertical */}
      <div
        className="mt-4 overflow-hidden"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
        }}
      >
        <p className="text-xs text-white/50 md:text-sm">
          {book.author}
        </p>
      </div>

      {/* Page number - bottom */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
          {pageNumber}
        </span>
        <span className="block text-xs text-white/40">/ {totalPages}</span>
      </div>
    </div>
  );
}

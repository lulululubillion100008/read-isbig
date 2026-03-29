import Link from 'next/link';
import type { BookSummary } from '@/lib/types';

interface BookCardProps {
  summary: BookSummary;
}

export default function BookCard({ summary }: BookCardProps) {
  const { book, theme, readingTime } = summary;

  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
        {/* Cover - gradient with title */}
        <div
          className="relative flex h-48 items-center justify-center p-4 md:h-56"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
          }}
        >
          <h3
            className="text-center text-xl font-bold leading-tight text-white drop-shadow-md md:text-2xl"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            {book.title}
          </h3>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-sm text-gray-500">{book.author}</p>

          <div className="mt-2 flex items-center gap-2">
            {book.category && (
              <span
                className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {book.category}
              </span>
            )}
            <span className="text-xs text-gray-400">{readingTime} 分钟阅读</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

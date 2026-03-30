import Link from 'next/link';
import type { BookSummary } from '@/lib/types';
import { getBookDetailById } from '@/lib/mock-categories';
import RatingBadge from '@/components/explore/RatingBadge';

interface BookCardProps {
  summary: BookSummary;
}

export default function BookCard({ summary }: BookCardProps) {
  const { book, theme, readingTime } = summary;
  const detail = getBookDetailById(book.id);

  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div
        className="hover-lift overflow-hidden"
        style={{ background: 'var(--surface-container-lowest)' }}
      >
        {/* Cover - ink wash gradient */}
        <div
          className="relative flex aspect-[4/3] items-end p-5"
          style={{
            background: `linear-gradient(160deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 60%, ${theme.accentColor || theme.secondaryColor} 100%)`,
          }}
        >
          {/* Subtle ink overlays */}
          <div className="absolute right-[-20%] top-[-20%] h-[60%] w-[60%] bg-white/8 blur-2xl" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[40%] w-[40%] bg-black/10 blur-2xl" />

          {/* Book title */}
          <h3
            className="relative z-10 text-lg font-bold leading-snug text-white md:text-xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.25)', fontFamily: 'var(--font-serif)' }}
          >
            {book.title}
          </h3>

          {/* Rating badge */}
          {detail && (
            <div className="absolute right-3 top-3 z-10">
              <RatingBadge score={detail.score} rating={detail.rating} size="sm" />
            </div>
          )}
        </div>

        {/* Info section - tonal bg, no border */}
        <div className="px-4 py-3.5" style={{ background: 'var(--surface-container-lowest)' }}>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{book.author}</p>
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            {detail ? (
              detail.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 text-[11px] font-medium"
                  style={{
                    background: 'var(--surface-container-high)',
                    color: 'var(--text-tertiary)',
                    fontFamily: 'var(--font-label)',
                  }}
                >
                  {cat}
                </span>
              ))
            ) : (
              book.category && (
                <span
                  className="px-2 py-0.5 text-[11px] font-medium text-white"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {book.category}
                </span>
              )
            )}
            <span
              className="ml-auto text-[11px]"
              style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
            >
              {readingTime} min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

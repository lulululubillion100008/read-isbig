import Link from 'next/link';
import type { BookDetail } from '@/lib/types';
import RatingBadge from './RatingBadge';

interface BookListCardProps {
  book: BookDetail;
}

function getBookGradient(title: string): string {
  const colors = [
    ['#9a131d', '#BC2F32'],
    ['#006a62', '#00a497'],
    ['#004f87', '#0068ae'],
    ['#59413f', '#8d706e'],
    ['#9a131d', '#004f87'],
    ['#006a62', '#BC2F32'],
    ['#7a0e17', '#9a131d'],
    ['#004f87', '#006a62'],
    ['#BC2F32', '#59413f'],
    ['#0068ae', '#006a62'],
  ];
  const index = title.charCodeAt(0) % colors.length;
  return `linear-gradient(135deg, ${colors[index][0]}, ${colors[index][1]})`;
}

export default function BookListCard({ book }: BookListCardProps) {
  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div
        className="flex gap-5 transition-all duration-400"
        style={{
          padding: '1.25rem',
          background: 'var(--surface-container-lowest)',
        }}
      >
        {/* Cover - ink wash gradient */}
        <div
          className="flex h-32 w-22 shrink-0 items-center justify-center overflow-hidden transition-transform duration-400 group-hover:scale-[1.02]"
          style={{
            width: '5.5rem',
            background: getBookGradient(book.title),
          }}
        >
          <span
            className="px-2 text-center text-xs font-bold leading-tight text-white drop-shadow-md"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {book.title}
          </span>
        </div>

        {/* Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <h3
              className="text-base font-bold"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
            >
              {book.title}
            </h3>
            <span
              className="mt-1 inline-block text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              {book.author}
            </span>
            <p
              className="mt-1.5 text-xs leading-relaxed line-clamp-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {book.description}
            </p>
          </div>

          {/* Tags - tonal bg, no border */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {book.categories.map((cat) => (
              <span
                key={cat}
                className="inline-block px-2.5 py-0.5 text-xs font-medium"
                style={{
                  background: 'var(--surface-container-high)',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'var(--font-label)',
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="flex shrink-0 flex-col items-end justify-between py-0.5">
          <RatingBadge score={book.score} rating={book.rating} size="sm" />
          {book.totalReaders && (
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
            >
              {(book.totalReaders / 10000).toFixed(1)}万人读过
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

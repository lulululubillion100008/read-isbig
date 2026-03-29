import Link from 'next/link';
import type { BookDetail } from '@/lib/types';
import RatingBadge from './RatingBadge';

interface BookListCardProps {
  book: BookDetail;
}

// 根据书名生成渐变色
function getBookGradient(title: string): string {
  const colors = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a18cd1', '#fbc2eb'],
    ['#fccb90', '#d57eeb'],
    ['#e0c3fc', '#8ec5fc'],
    ['#f5576c', '#ff6f91'],
    ['#667eea', '#5FC3E4'],
  ];
  const index = title.charCodeAt(0) % colors.length;
  return `linear-gradient(135deg, ${colors[index][0]}, ${colors[index][1]})`;
}

export default function BookListCard({ book }: BookListCardProps) {
  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div
        className="flex gap-5"
        style={{
          padding: '1.25rem',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--surface)',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border-subtle)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Cover */}
        <div
          className="flex h-32 w-22 shrink-0 items-center justify-center overflow-hidden"
          style={{
            width: '5.5rem',
            borderRadius: 'var(--radius-md)',
            background: getBookGradient(book.title),
            boxShadow: 'var(--shadow-md)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="px-2 text-center text-xs font-bold leading-tight text-white drop-shadow-md">
            {book.title}
          </span>
        </div>

        {/* Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <h3
              className="text-base font-bold"
              style={{
                color: 'var(--text-primary)',
                transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {book.title}
            </h3>
            <Link
              href={`/author/${book.authorId}`}
              className="mt-1 inline-block text-sm font-medium"
              style={{
                color: 'var(--text-secondary)',
                transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {book.author}
            </Link>
            <p
              className="mt-1.5 text-xs leading-relaxed line-clamp-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {book.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {book.categories.map((cat) => (
              <span
                key={cat}
                className="inline-block px-2.5 py-0.5 text-xs font-medium"
                style={{
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(99, 102, 241, 0.06)',
                  color: 'var(--text-tertiary)',
                  border: '1px solid var(--border-subtle)',
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
              style={{ color: 'var(--text-tertiary)' }}
            >
              {(book.totalReaders / 10000).toFixed(1)}万人读过
            </span>
          )}
        </div>

        {/* Hover style */}
        <style>{`
          .group:hover > div:first-child {
            box-shadow: var(--shadow-card-hover) !important;
            transform: translateY(-1px);
          }
        `}</style>
      </div>
    </Link>
  );
}

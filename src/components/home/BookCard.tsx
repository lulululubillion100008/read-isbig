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

          {/* 评分徽章 - 右上角 */}
          {detail && (
            <div className="absolute right-2 top-2">
              <RatingBadge score={detail.score} rating={detail.rating} size="sm" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          {/* 作者（可点击） */}
          {detail ? (
            <Link
              href={`/author/${detail.authorId}`}
              className="text-sm text-gray-500 hover:text-indigo-500 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {book.author}
            </Link>
          ) : (
            <p className="text-sm text-gray-500">{book.author}</p>
          )}

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {/* 分类标签 */}
            {detail ? (
              detail.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500"
                >
                  {cat}
                </span>
              ))
            ) : (
              book.category && (
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {book.category}
                </span>
              )
            )}
            <span className="text-xs text-gray-400">{readingTime} 分钟阅读</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

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
      <div className="hover-lift overflow-hidden rounded-[var(--radius-lg)] bg-white" style={{ boxShadow: 'var(--shadow-card)' }}>
        {/* Cover - 渐变封面 */}
        <div
          className="relative flex aspect-[4/3] items-end p-5"
          style={{
            background: `linear-gradient(160deg, ${theme.primaryColor} 0%, ${theme.secondaryColor} 60%, ${theme.accentColor || theme.secondaryColor} 100%)`,
          }}
        >
          {/* 毛玻璃装饰 */}
          <div className="absolute right-[-20%] top-[-20%] h-[60%] w-[60%] rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-black/10 blur-2xl" />

          {/* 书名 */}
          <h3 className="relative z-10 text-lg font-bold leading-snug text-white md:text-xl" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>
            {book.title}
          </h3>

          {/* 评分徽章 */}
          {detail && (
            <div className="absolute right-3 top-3 z-10">
              <RatingBadge score={detail.score} rating={detail.rating} size="sm" />
            </div>
          )}
        </div>

        {/* 信息区 */}
        <div className="px-4 py-3.5">
          <p className="text-sm font-medium text-[var(--text-secondary)]">{book.author}</p>
          <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
            {detail ? (
              detail.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500 ring-1 ring-slate-100"
                >
                  {cat}
                </span>
              ))
            ) : (
              book.category && (
                <span
                  className="rounded-md px-2 py-0.5 text-[11px] font-medium text-white"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {book.category}
                </span>
              )
            )}
            <span className="ml-auto text-[11px] text-[var(--text-tertiary)]">{readingTime} min</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

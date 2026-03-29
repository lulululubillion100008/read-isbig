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
      <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white/80 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-gray-200">
        {/* 左侧封面 */}
        <div
          className="flex h-28 w-20 shrink-0 items-center justify-center rounded-xl shadow-md"
          style={{ background: getBookGradient(book.title) }}
        >
          <span className="px-2 text-center text-xs font-bold leading-tight text-white drop-shadow-md">
            {book.title}
          </span>
        </div>

        {/* 中间信息 */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {book.title}
            </h3>
            <Link
              href={`/author/${book.authorId}`}
              className="mt-0.5 inline-block text-sm text-gray-500 hover:text-indigo-500 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {book.author}
            </Link>
            <p className="mt-1 text-xs text-gray-400 line-clamp-2">{book.description}</p>
          </div>

          {/* 底部标签 */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {book.categories.map((cat) => (
              <span
                key={cat}
                className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* 右侧评分 */}
        <div className="flex shrink-0 flex-col items-end justify-between">
          <RatingBadge score={book.score} rating={book.rating} size="sm" />
          {book.totalReaders && (
            <span className="text-xs text-gray-400">
              {(book.totalReaders / 10000).toFixed(1)}万人读过
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

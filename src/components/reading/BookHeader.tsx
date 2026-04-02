import type { Book } from '@/lib/types';

interface BookHeaderProps {
  book: Book;
  readingTimeMin: number;
}

export default function BookHeader({ book, readingTimeMin }: BookHeaderProps) {
  // 基于书名生成渐变色
  const gradients = [
    ['#1D1D1F', '#3A3A3C'],
    ['#2C3E50', '#34495E'],
    ['#1A1A2E', '#16213E'],
    ['#2D132C', '#1A1A2E'],
    ['#0D1117', '#21262D'],
    ['#1B2838', '#2A475E'],
  ];
  const charCode = (book.title.charCodeAt(0) || 0) + (book.title.charCodeAt(1) || 0);
  const [from, to] = gradients[charCode % gradients.length] ?? gradients[0];

  return (
    <div className="relative overflow-hidden">
      {/* 封面渐变 */}
      <div
        className="flex flex-col items-center justify-center px-6 py-16 text-center md:py-20"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        {/* 书名 */}
        <h1 className="max-w-lg text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl font-serif">
          {book.title}
        </h1>

        {/* 作者 */}
        <p className="mt-3 text-sm text-white/60">
          {book.author}
        </p>

        {/* 标签 */}
        <div className="mt-5 flex items-center gap-3 text-xs text-white/40">
          {book.category && (
            <>
              <span>{book.category}</span>
              <span className="h-0.5 w-0.5 rounded-full bg-white/30" />
            </>
          )}
          <span>约 {readingTimeMin} 分钟</span>
          {book.score != null && (
            <>
              <span className="h-0.5 w-0.5 rounded-full bg-white/30" />
              <span>{book.score.toFixed(1)} 分</span>
            </>
          )}
        </div>

        {/* 简介 */}
        {book.description && (
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
            {book.description}
          </p>
        )}
      </div>
    </div>
  );
}

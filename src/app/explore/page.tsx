import Link from 'next/link';
import { CATEGORIES, BOOK_DETAILS } from '@/lib/mock-categories';
import CategoryCard from '@/components/explore/CategoryCard';
import RatingBadge from '@/components/explore/RatingBadge';

// 神作推荐卡片
function MasterpieceCard({ book }: { book: typeof BOOK_DETAILS[number] }) {
  // 根据书名生成渐变色
  const colors = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a18cd1', '#fbc2eb'],
  ];
  const index = book.title.charCodeAt(0) % colors.length;
  const gradient = `linear-gradient(135deg, ${colors[index][0]}, ${colors[index][1]})`;

  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div className="relative w-44 shrink-0 overflow-hidden rounded-2xl border-2 border-yellow-300/50 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-200/40">
        {/* 金色光晕 */}
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 to-transparent" />

        {/* 封面 */}
        <div
          className="flex h-52 items-center justify-center p-3"
          style={{ background: gradient }}
        >
          <h3 className="text-center text-lg font-bold leading-tight text-white drop-shadow-lg">
            {book.title}
          </h3>
        </div>

        {/* 信息 */}
        <div className="relative bg-white/90 backdrop-blur-sm p-3">
          <div className="absolute -top-4 right-2">
            <RatingBadge score={book.score} rating={book.rating} size="sm" />
          </div>
          <p className="text-sm font-medium text-gray-700 mt-1">{book.author}</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {book.categories.slice(0, 2).map((cat) => (
              <span key={cat} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ExplorePage() {
  const masterpieces = BOOK_DETAILS.filter((b) => b.score >= 9.0).sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/30">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors">
            &larr; Read Is Big
          </Link>
        </div>
      </header>

      {/* 标题区 */}
      <section className="px-6 pt-12 pb-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            探索
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            发现你的下一本好书，开启新的思维旅程
          </p>
        </div>
      </section>

      {/* 神作推荐 */}
      <section className="pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">神作推荐</h2>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-600">
              {masterpieces.length} 本
            </span>
          </div>
        </div>

        {/* 横向滚动 */}
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="mx-auto flex max-w-6xl gap-4 px-6">
            {masterpieces.map((book) => (
              <MasterpieceCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* 分类浏览 */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1.5 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
          <h2 className="text-2xl font-bold text-gray-900">分类浏览</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Read Is Big. 让阅读更高效。</p>
      </footer>
    </div>
  );
}

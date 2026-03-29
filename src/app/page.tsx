import Link from 'next/link';
import { mockSummaries } from '@/lib/mock-data';
import { CATEGORIES, BOOK_DETAILS } from '@/lib/mock-categories';
import HomeClient from '@/components/home/HomeClient';
import BookCard from '@/components/home/BookCard';

export default function Home() {
  const masterpieces = BOOK_DETAILS.filter((b) => b.score >= 9.0).sort((a, b) => b.score - a.score);
  const excellentBooks = BOOK_DETAILS.filter((b) => b.rating === '佳作').sort((a, b) => b.score - a.score);
  const displayCategories = CATEGORIES.slice(0, 8);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* 个性化引导 (客户端组件) */}
      <HomeClient />

      {/* Hero section */}
      <header className="flex flex-col items-center px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <h1 className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
          Read Is Big
        </h1>
        <p className="mt-3 text-lg text-gray-500 md:text-xl">
          15分钟，读懂一本好书
        </p>
      </header>

      {/* 分类入口 - 横向滚动 */}
      <section className="pb-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">分类浏览</h2>
            <Link href="/explore" className="text-sm text-indigo-500 hover:text-indigo-600 transition-colors">
              查看全部 &rarr;
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="mx-auto flex max-w-6xl gap-3 px-6">
            {displayCategories.map((cat) => (
              <Link
                key={cat.name}
                href={`/explore/${encodeURIComponent(cat.name)}`}
                className="flex shrink-0 items-center gap-2 rounded-full border border-gray-100 bg-white px-4 py-2.5 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                style={{ borderColor: `${cat.color}33` }}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-400">
                  {cat.bookCount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 神作推荐 */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-7 w-1.5 rounded-full bg-gradient-to-b from-orange-500 to-red-500" />
          <h2 className="text-2xl font-bold text-gray-800">神作推荐</h2>
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-600">
            {masterpieces.length} 本
          </span>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {masterpieces.map((book) => {
            const summary = mockSummaries.find((s) => s.bookId === book.id);
            if (summary) {
              return <BookCard key={summary.id} summary={summary} />;
            }
            return null;
          })}
        </div>
      </section>

      {/* 佳作推荐 */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-7 w-1.5 rounded-full bg-gradient-to-b from-yellow-400 to-orange-400" />
          <h2 className="text-2xl font-bold text-gray-800">佳作推荐</h2>
          <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700">
            {excellentBooks.length} 本
          </span>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {excellentBooks.map((book) => {
            const summary = mockSummaries.find((s) => s.bookId === book.id);
            if (summary) {
              return <BookCard key={summary.id} summary={summary} />;
            }
            return null;
          })}
        </div>
      </section>

      {/* 探索更多 */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <Link
          href="/explore"
          className="group flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-indigo-200"
        >
          <span className="text-lg font-bold text-gray-700 group-hover:text-indigo-600 transition-colors">
            探索更多好书
          </span>
          <span className="text-2xl transition-transform group-hover:translate-x-1">&rarr;</span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Read Is Big. 让阅读更高效。</p>
      </footer>
    </div>
  );
}

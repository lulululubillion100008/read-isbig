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
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      {/* 个性化引导 (客户端组件) */}
      <HomeClient />

      {/* Hero section - 参考 Apple Books 简洁大气风格 */}
      <header className="relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-100/60 to-purple-100/40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-100/40 to-rose-100/30 blur-3xl" />
        </div>

        <div className="relative flex flex-col items-center px-6 pt-16 pb-4 md:pt-24 md:pb-8">
          {/* Logo */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200/50 md:h-16 md:w-16">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:h-8 md:w-8">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>

          <h1 className="gradient-text text-center text-4xl font-extrabold tracking-tighter md:text-5xl lg:text-6xl">
            Read Is Big
          </h1>
          <p className="mt-3 max-w-md text-center text-base text-[var(--text-secondary)] md:text-lg">
            15 分钟读懂一本好书，AI 提炼精华，思维导图呈现
          </p>
        </div>
      </header>

      {/* 搜索 + 引导 */}
      <section className="relative z-10 px-6 pb-12">
        <HomeClient />
      </section>

      {/* 分类入口 - 参考微信读书胶囊标签 */}
      <section className="pb-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">分类浏览</h2>
            <Link href="/explore" className="text-sm font-medium text-indigo-500 transition-colors hover:text-indigo-600">
              全部分类 &rarr;
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="mx-auto flex max-w-6xl gap-2.5 px-6">
            {displayCategories.map((cat) => (
              <Link
                key={cat.name}
                href={`/explore/${encodeURIComponent(cat.name)}`}
                className="flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
                  {cat.bookCount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 神作推荐 - 参考豆瓣评分高亮风格 */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-red-500 shadow-sm shadow-orange-200/60">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">神作推荐</h2>
          <span className="rounded-full bg-gradient-to-r from-orange-50 to-red-50 px-3 py-1 text-xs font-semibold text-orange-600 ring-1 ring-orange-100">
            {masterpieces.length} 本
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
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
      <section className="mx-auto w-full max-w-6xl px-6 pb-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 shadow-sm shadow-emerald-200/60">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">佳作推荐</h2>
          <span className="rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-100">
            {excellentBooks.length} 本
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
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
          className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-5 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-indigo-200/40"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="relative text-lg font-bold text-white">
            探索更多好书
          </span>
          <span className="relative text-xl text-white/80 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-subtle)] bg-white/50 py-8 text-center">
        <p className="text-sm text-[var(--text-tertiary)]">&copy; {new Date().getFullYear()} Read Is Big. 让阅读更高效。</p>
      </footer>
    </div>
  );
}

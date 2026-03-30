import Link from 'next/link';
import { mockSummaries } from '@/lib/mock-data';
import { CATEGORIES, BOOK_DETAILS } from '@/lib/mock-categories';
import HomeClient from '@/components/home/HomeClient';
import BookCard from '@/components/home/BookCard';

export default function Home() {
  const masterpieces = BOOK_DETAILS.filter((b) => b.score >= 9.0).sort((a, b) => b.score - a.score);
  const excellentBooks = BOOK_DETAILS.filter((b) => b.rating === '佳作').sort((a, b) => b.score - a.score);
  const displayCategories = CATEGORIES.slice(0, 8);

  const summaryByBookId = new Map(mockSummaries.map(s => [s.bookId, s]));

  return (
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--background)' }}>
      {/* Hero - The Digital Scholar's Sanctuary */}
      <header className="relative overflow-hidden">
        {/* Ink wash background - subtle warm tones */}
        <div className="absolute inset-0 ink-wash" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 bg-[var(--primary)]/5 blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 bg-[var(--secondary)]/5 blur-[100px]" />
        </div>

        <div className="relative flex flex-col px-6 pt-16 pb-4 md:pt-24 md:pb-8">
          {/* Asymmetric layout - title left-aligned */}
          <div className="mx-auto w-full max-w-6xl">
            {/* Lab protocol tag */}
            <div className="mb-6 flex items-center gap-3">
              <span
                className="font-label text-[10px] font-medium uppercase tracking-[0.3em]"
                style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
              >
                Laboratory Protocol 01
              </span>
              <div className="h-px flex-1" style={{ background: 'var(--outline-variant)', opacity: 0.4 }} />
            </div>

            {/* Seal stamp logo */}
            <div
              className="mb-8 flex h-14 w-14 items-center justify-center md:h-16 md:w-16"
              style={{ background: 'var(--primary)' }}
            >
              <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                读
              </span>
            </div>

            {/* Title - dramatic serif */}
            <h1
              className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', lineHeight: 1.1 }}
            >
              Read Is Big
            </h1>
            <p
              className="mt-4 max-w-lg text-base leading-relaxed md:text-lg"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
            >
              15 分钟读懂一本好书，AI 提炼精华，思维导图呈现
            </p>
          </div>
        </div>
      </header>

      {/* Search + onboarding */}
      <section className="relative z-10 px-6 pb-12">
        <HomeClient />
      </section>

      {/* Category pills - no borders, tonal backgrounds */}
      <section className="pb-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-5 flex items-center justify-between">
            <h2
              className="text-base font-semibold"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
            >
              分类浏览
            </h2>
            <Link
              href="/explore"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--primary)', fontFamily: 'var(--font-label)' }}
            >
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
                className="flex shrink-0 items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'var(--surface-container-low)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className="px-1.5 py-0.5 text-[10px] font-semibold"
                  style={{
                    background: 'var(--surface-container-high)',
                    color: 'var(--text-tertiary)',
                    fontFamily: 'var(--font-label)',
                  }}
                >
                  {cat.bookCount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Masterpiece recommendations - Vermilion accent */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-12">
        <div className="mb-6 flex items-center gap-3">
          {/* Seal stamp icon */}
          <div
            className="flex h-8 w-8 items-center justify-center"
            style={{ background: 'var(--primary)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <h2
            className="text-xl font-bold"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
          >
            神作推荐
          </h2>
          <span
            className="px-3 py-1 text-xs font-semibold"
            style={{
              background: 'var(--primary)',
              color: 'var(--on-primary)',
              fontFamily: 'var(--font-label)',
            }}
          >
            {masterpieces.length} 本
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {masterpieces.map((book) => {
            const summary = summaryByBookId.get(book.id);
            if (summary) {
              return <BookCard key={summary.id} summary={summary} />;
            }
            return null;
          })}
        </div>
      </section>

      {/* Excellent books - Jade accent */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-14">
        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center"
            style={{ background: 'var(--secondary)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h2
            className="text-xl font-bold"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
          >
            佳作推荐
          </h2>
          <span
            className="px-3 py-1 text-xs font-semibold"
            style={{
              background: 'var(--secondary)',
              color: 'var(--on-secondary)',
              fontFamily: 'var(--font-label)',
            }}
          >
            {excellentBooks.length} 本
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {excellentBooks.map((book) => {
            const summary = summaryByBookId.get(book.id);
            if (summary) {
              return <BookCard key={summary.id} summary={summary} />;
            }
            return null;
          })}
        </div>
      </section>

      {/* Explore CTA - Vermilion to tertiary gradient */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <Link
          href="/explore"
          className="group relative flex items-center justify-center gap-3 overflow-hidden px-8 py-5 transition-all duration-500 hover:scale-[1.01]"
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 50%, var(--tertiary) 100%)',
          }}
        >
          <span
            className="relative text-lg font-bold text-white"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            探索更多好书
          </span>
          <span className="relative text-xl text-white/80 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
      </section>

      {/* Footer - tonal separation, no border */}
      <footer
        className="py-8 text-center"
        style={{ background: 'var(--surface-container-low)' }}
      >
        <p
          className="text-sm"
          style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
        >
          &copy; {new Date().getFullYear()} Read Is Big. 让阅读更高效。
        </p>
      </footer>
    </div>
  );
}

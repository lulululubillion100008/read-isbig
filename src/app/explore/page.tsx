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
      <div
        className="relative w-44 shrink-0 overflow-hidden"
        style={{
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border-subtle)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Cover */}
        <div
          className="relative flex h-56 items-center justify-center p-4"
          style={{ background: gradient }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/15" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          <h3 className="relative z-10 text-center text-lg font-bold leading-tight text-white drop-shadow-lg">
            {book.title}
          </h3>
        </div>

        {/* Info */}
        <div
          className="relative p-4"
          style={{
            background: 'var(--surface)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div className="absolute -top-4 right-3">
            <RatingBadge score={book.score} rating={book.rating} size="sm" />
          </div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {book.author}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {book.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 text-xs font-medium"
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

      </div>
    </Link>
  );
}

export default function ExplorePage() {
  const masterpieces = BOOK_DETAILS.filter((b) => b.score >= 9.0).sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="glass sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-base font-semibold"
            style={{
              color: 'var(--text-primary)',
              transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            &larr; Read Is Big
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16">
        {/* Decorative blurs -- Apple/WeChat style */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#6366f1]/10 blur-[120px]" />
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#ec4899]/8 blur-[100px]" />
        <div className="absolute left-1/3 top-24 h-64 w-64 rounded-full bg-[#a855f7]/8 blur-[100px]" />
        <div className="absolute right-1/3 bottom-0 h-48 w-48 rounded-full bg-[#06b6d4]/6 blur-[80px]" />

        <div className="relative mx-auto max-w-6xl">
          <h1 className="float-up gradient-text text-5xl font-extrabold tracking-tight md:text-7xl">
            探索
          </h1>
          <p
            className="float-up float-up-delay-1 mt-5 max-w-xl text-lg leading-relaxed md:text-xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            发现你的下一本好书，开启新的思维旅程
          </p>
        </div>
      </section>

      {/* Masterpiece recommendations */}
      <section className="float-up float-up-delay-2 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-3 mb-10">
            <div
              className="h-8 w-1.5 rounded-full"
              style={{ background: 'linear-gradient(to bottom, var(--warm), #ef4444)' }}
            />
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              神作推荐
            </h2>
            <span
              className="px-3 py-1 text-xs font-semibold"
              style={{
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--warm)',
                border: '1px solid rgba(245, 158, 11, 0.15)',
              }}
            >
              {masterpieces.length} 本
            </span>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="mx-auto flex max-w-6xl gap-6 px-6">
            {masterpieces.map((book) => (
              <MasterpieceCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Category browsing */}
      <section className="float-up float-up-delay-3 mx-auto max-w-6xl px-6 pb-28">
        <div className="flex items-center gap-3 mb-10">
          <div
            className="h-8 w-1.5 rounded-full"
            style={{ background: 'linear-gradient(to bottom, var(--accent), #a855f7)' }}
          />
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            分类浏览
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 text-center text-sm"
        style={{
          borderTop: '1px solid var(--border-subtle)',
          color: 'var(--text-tertiary)',
        }}
      >
        <p>&copy; {new Date().getFullYear()} Read Is Big. 让阅读更高效。</p>
      </footer>
    </div>
  );
}

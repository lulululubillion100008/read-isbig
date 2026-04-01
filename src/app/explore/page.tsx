import Link from 'next/link';
import { CATEGORIES, BOOK_DETAILS } from '@/lib/mock-categories';
import CategoryCard from '@/components/explore/CategoryCard';
import RatingBadge from '@/components/explore/RatingBadge';

function MasterpieceCard({ book }: { book: typeof BOOK_DETAILS[number] }) {
  const colors = [
    ['#ad3332', '#9c2627'],
    ['#416757', '#355a4b'],
    ['#5b605c', '#4f5450'],
    ['#59615f', '#757c7a'],
    ['#ad3332', '#5b605c'],
    ['#416757', '#9c2627'],
  ];
  const index = book.title.charCodeAt(0) % colors.length;
  const gradient = `linear-gradient(135deg, ${colors[index][0]}, ${colors[index][1]})`;

  return (
    <Link href={`/book/${book.id}`} className="group block">
      <div
        className="relative w-44 shrink-0 overflow-hidden transition-all duration-300"
        style={{
          background: 'var(--surface-container-lowest)',
        }}
      >
        {/* Cover - ink wash gradient */}
        <div
          className="relative flex h-56 items-center justify-center p-4"
          style={{ background: gradient }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
          <h3
            className="relative z-10 text-center text-lg font-bold leading-tight text-white drop-shadow-lg"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {book.title}
          </h3>
        </div>

        {/* Info - tonal separation, no border */}
        <div
          className="relative p-4"
          style={{ background: 'var(--surface-container-lowest)' }}
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
                  background: 'var(--surface-container-high)',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'var(--font-label)',
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
      {/* Header - glass nav */}
      <header className="glass sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-base font-semibold transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            &larr; Read Is Big
          </Link>
          <span
            className="text-[10px] font-medium uppercase tracking-[0.3em]"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
          >
            Digital Archive
          </span>
        </div>
      </header>

      {/* Hero - asymmetric editorial */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16">
        <div className="absolute inset-0 ink-wash" />
        <div className="absolute -left-32 -top-32 h-96 w-96 bg-[var(--primary)]/5 blur-[120px]" />
        <div className="absolute -right-24 top-0 h-80 w-80 bg-[var(--tertiary)]/5 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl">
          {/* Lab protocol */}
          <div className="mb-4 flex items-center gap-3">
            <span
              className="text-[10px] font-medium uppercase tracking-[0.3em]"
              style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
            >
              Archive Protocol
            </span>
            <div className="h-px flex-1" style={{ background: 'var(--outline-variant)', opacity: 0.3 }} />
          </div>

          <h1
            className="float-up text-5xl font-bold tracking-tight md:text-7xl"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}
          >
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

      {/* Masterpiece section */}
      <section className="float-up float-up-delay-2 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-3 mb-10">
            <div
              className="h-8 w-1.5"
              style={{ background: 'linear-gradient(to bottom, var(--primary), var(--primary-container))' }}
            />
            <h2
              className="text-2xl font-bold tracking-tight"
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

      {/* Category grid */}
      <section className="float-up float-up-delay-3 mx-auto max-w-6xl px-6 pb-28">
        <div className="flex items-center gap-3 mb-10">
          <div
            className="h-8 w-1.5"
            style={{ background: 'linear-gradient(to bottom, var(--secondary), var(--tertiary))' }}
          />
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
          >
            分类浏览
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </section>

      {/* Footer - tonal separation */}
      <footer
        className="py-12 text-center text-sm"
        style={{
          background: 'var(--surface-container-low)',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-label)',
        }}
      >
        <p>&copy; {new Date().getFullYear()} Read Is Big. 让阅读更高效。</p>
      </footer>
    </div>
  );
}

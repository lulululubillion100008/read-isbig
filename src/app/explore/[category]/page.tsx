import type { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES, getBooksByCategory } from '@/lib/mock-categories';
import type { BookRating } from '@/lib/types';
import BookListCard from '@/components/explore/BookListCard';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: rawCategory } = await params;
  const categoryName = decodeURIComponent(rawCategory);
  const categoryInfo = CATEGORIES.find((c) => c.name === categoryName);

  if (!categoryInfo) {
    return { title: '未找到分类' };
  }

  return {
    title: `${categoryInfo.name} - 探索 - Read Is Big`,
    description: categoryInfo.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: rawCategory } = await params;
  const categoryName = decodeURIComponent(rawCategory);
  const categoryInfo = CATEGORIES.find((c) => c.name === categoryName);
  const allBooks = getBooksByCategory(categoryName);

  const sortedBooks = [...allBooks].sort((a, b) => b.score - a.score);

  const ratingGroups: { label: BookRating | '全部'; books: typeof sortedBooks }[] = [
    { label: '全部', books: sortedBooks },
    { label: '神作', books: sortedBooks.filter((b) => b.rating === '神作') },
    { label: '佳作', books: sortedBooks.filter((b) => b.rating === '佳作') },
    { label: '良作', books: sortedBooks.filter((b) => b.rating === '良作') },
  ];

  if (!categoryInfo) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: 'var(--background)' }}
      >
        <div className="text-center">
          <h1
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
          >
            未找到该分类
          </h1>
          <Link
            href="/explore"
            className="mt-4 inline-block font-medium"
            style={{ color: 'var(--primary)' }}
          >
            返回探索页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="glass sticky top-0 z-20">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/explore"
            className="text-sm font-medium transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            &larr; 返回探索
          </Link>
          <span
            className="text-[10px] font-medium uppercase tracking-[0.3em]"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
          >
            Archive / {categoryInfo.name}
          </span>
        </div>
      </header>

      {/* Category header */}
      <section className="relative overflow-hidden px-6 pt-16 pb-14">
        <div className="absolute inset-0 ink-wash" />
        <div
          className="absolute -right-24 -top-24 h-72 w-72 opacity-12 blur-[100px]"
          style={{ backgroundColor: categoryInfo.color }}
        />
        <div
          className="absolute -left-16 bottom-0 h-48 w-48 opacity-8 blur-[80px]"
          style={{ backgroundColor: categoryInfo.color }}
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="float-up flex items-center gap-6">
            <span
              className="flex h-20 w-20 items-center justify-center text-4xl"
              style={{
                background: `linear-gradient(135deg, ${categoryInfo.color}15, ${categoryInfo.color}35)`,
              }}
            >
              {categoryInfo.icon}
            </span>
            <div>
              <h1
                className="text-3xl font-extrabold tracking-tight md:text-4xl"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
              >
                {categoryInfo.name}
              </h1>
              <p
                className="mt-2 text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {categoryInfo.description}
              </p>
            </div>
          </div>
          <div className="float-up float-up-delay-1 mt-6">
            <span
              className="inline-flex items-center px-4 py-1.5 text-sm font-semibold text-white"
              style={{
                backgroundColor: categoryInfo.color,
                fontFamily: 'var(--font-label)',
              }}
            >
              共 {allBooks.length} 本书
            </span>
          </div>
        </div>
      </section>

      {/* Filters + book list */}
      <section className="mx-auto max-w-4xl px-6 pb-28">
        <div className="float-up float-up-delay-2 mb-10 flex gap-3 overflow-x-auto pb-2">
          {ratingGroups.map((group) => (
            <span
              key={group.label}
              className="inline-flex shrink-0 items-center px-4 py-2 text-sm font-medium"
              style={{
                fontFamily: 'var(--font-label)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                ...(group.label === '全部'
                  ? {
                      background: 'var(--text-primary)',
                      color: 'var(--inverse-on-surface)',
                    }
                  : {
                      background: 'var(--surface-container-low)',
                      color: 'var(--text-secondary)',
                    }),
              }}
            >
              {group.label}
              <span className="ml-1.5 opacity-50">{group.books.length}</span>
            </span>
          ))}
        </div>

        {sortedBooks.length === 0 ? (
          <p className="py-20 text-center text-base" style={{ color: 'var(--text-tertiary)' }}>
            该分类暂无书籍
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {sortedBooks.map((book) => (
              <BookListCard key={book.id} book={book} />
            ))}
          </div>
        )}
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

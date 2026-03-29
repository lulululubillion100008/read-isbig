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

  // 按评分排序
  const sortedBooks = [...allBooks].sort((a, b) => b.score - a.score);

  // 按评级分组
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
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            未找到该分类
          </h1>
          <Link
            href="/explore"
            className="mt-4 inline-block font-medium"
            style={{ color: 'var(--accent)' }}
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
            className="text-sm font-medium"
            style={{
              color: 'var(--text-secondary)',
              transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            &larr; 返回探索
          </Link>
        </div>
      </header>

      {/* Category header */}
      <section className="relative overflow-hidden px-6 pt-16 pb-14">
        {/* Decorative blurs */}
        <div
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-12 blur-[100px]"
          style={{ backgroundColor: categoryInfo.color }}
        />
        <div
          className="absolute -left-16 bottom-0 h-48 w-48 rounded-full opacity-8 blur-[80px]"
          style={{ backgroundColor: categoryInfo.color }}
        />
        <div
          className="absolute right-1/3 top-1/2 h-32 w-32 rounded-full opacity-6 blur-[60px]"
          style={{ backgroundColor: categoryInfo.color }}
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="float-up flex items-center gap-6">
            <span
              className="flex h-20 w-20 items-center justify-center text-4xl"
              style={{
                borderRadius: 'var(--radius-xl)',
                background: `linear-gradient(135deg, ${categoryInfo.color}15, ${categoryInfo.color}35)`,
                boxShadow: `0 8px 32px ${categoryInfo.color}18`,
                border: `1px solid ${categoryInfo.color}20`,
              }}
            >
              {categoryInfo.icon}
            </span>
            <div>
              <h1
                className="text-3xl font-extrabold tracking-tight md:text-4xl"
                style={{ color: 'var(--text-primary)' }}
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
                borderRadius: 'var(--radius-md)',
                boxShadow: `0 4px 16px ${categoryInfo.color}30`,
              }}
            >
              共 {allBooks.length} 本书
            </span>
          </div>
        </div>
      </section>

      {/* Filters + book list */}
      <section className="mx-auto max-w-4xl px-6 pb-28">
        {/* Filter tags */}
        <div className="float-up float-up-delay-2 mb-10 flex gap-3 overflow-x-auto pb-2">
          {ratingGroups.map((group) => (
            <span
              key={group.label}
              className="inline-flex shrink-0 items-center px-4 py-2 text-sm font-medium"
              style={{
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                ...(group.label === '全部'
                  ? {
                      background: 'var(--text-primary)',
                      color: '#ffffff',
                      boxShadow: 'var(--shadow-md)',
                    }
                  : {
                      background: 'var(--surface)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: 'var(--shadow-sm)',
                    }),
              }}
            >
              {group.label}
              <span className="ml-1.5 opacity-50">{group.books.length}</span>
            </span>
          ))}
        </div>

        {/* Book list */}
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

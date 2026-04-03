import { prisma } from '@/lib/db';
import SearchBar from '@/components/home/SearchBar';
import BookCard from '@/components/home/BookCard';
import CategoryPills from '@/components/home/CategoryPills';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface ExplorePageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? '';
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1);
  const limit = 18;

  const where = query
    ? {
        OR: [
          { title: { contains: query } },
          { author: { contains: query } },
        ],
      }
    : {};

  const [books, total] = await Promise.all([
    prisma.book.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        score: true,
        description: true,
      },
    }),
    prisma.book.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-8 md:px-6 md:pt-20">
      {/* 头部 */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
          >
            &larr; 首页
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)]">
            {query ? `搜索: ${query}` : '探索'}
          </h1>
        </div>
        <div className="hidden sm:block">
          <SearchBar />
        </div>
      </div>

      {/* 移动端搜索栏 */}
      <div className="mb-4 sm:hidden">
        <SearchBar />
      </div>

      {/* 分类 */}
      <div className="mb-6">
        <CategoryPills />
      </div>

      {/* 结果 */}
      {books.length > 0 ? (
        <>
          <p className="mb-4 text-xs text-[var(--text-quaternary)]">
            共 {total} 本书
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                category={book.category ?? undefined}
                score={book.score ?? undefined}
                description={book.description ?? undefined}
              />
            ))}
          </div>

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link
                  href={`/explore?${query ? `q=${encodeURIComponent(query)}&` : ''}page=${page - 1}`}
                  className="rounded-lg bg-[var(--gray-6)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                >
                  上一页
                </Link>
              )}
              <span className="text-xs text-[var(--text-quaternary)]">
                {page} / {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/explore?${query ? `q=${encodeURIComponent(query)}&` : ''}page=${page + 1}`}
                  className="rounded-lg bg-[var(--gray-6)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                >
                  下一页
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center py-20 text-center">
          <p className="text-sm text-[var(--text-tertiary)]">
            {query ? `未找到"${query}"相关的书籍` : '暂无书籍'}
          </p>
        </div>
      )}
    </main>
  );
}

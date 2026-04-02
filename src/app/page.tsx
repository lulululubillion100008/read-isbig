import { prisma } from '@/lib/db';
import SearchBar from '@/components/home/SearchBar';
import BookCard from '@/components/home/BookCard';
import CategoryPills from '@/components/home/CategoryPills';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 查询最新书籍
  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' },
    take: 12,
    select: {
      id: true,
      title: true,
      author: true,
      category: true,
      score: true,
      description: true,
    },
  });

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-12 md:px-6">
      {/* 头部 */}
      <div className="mb-10 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
          Read Is Big
        </h1>
        <p className="mt-2 text-sm text-[var(--text-tertiary)]">
          15 分钟，读懂一本好书
        </p>
        <div className="mt-6 w-full max-w-md">
          <SearchBar />
        </div>
      </div>

      {/* 分类标签 */}
      <div className="mb-6">
        <CategoryPills />
      </div>

      {/* 书籍列表 */}
      {books.length > 0 ? (
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
      ) : (
        <div className="flex flex-col items-center py-20 text-center">
          <p className="text-sm text-[var(--text-tertiary)]">
            还没有书籍，开始添加第一本吧
          </p>
          <Link
            href="/explore"
            className="mt-4 rounded-full bg-[var(--text-primary)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            探索书籍
          </Link>
        </div>
      )}
    </main>
  );
}

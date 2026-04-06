import { prisma } from '@/lib/db';
import SearchBar from '@/components/home/SearchBar';
import BookCard from '@/components/home/BookCard';
import CategoryPills from '@/components/home/CategoryPills';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 并行查询：精选推荐、最新书籍、全站统计
  const [featuredBooks, latestBooks, totalStats] = await Promise.all([
    prisma.book.findMany({
      where: { score: { gte: 8.5 } },
      orderBy: { score: 'desc' },
      take: 6,
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        score: true,
        description: true,
      },
    }),
    prisma.book.findMany({
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
    }),
    Promise.all([
      prisma.book.count(),
      prisma.user.count(),
      prisma.readingHistory.count(),
    ]),
  ]);

  const [bookCount, userCount, readCount] = totalStats;

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-12 md:px-6 md:pt-16">
      {/* ─── Hero Section ─── */}
      <section className="mb-14 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl">
          Read Is Big
        </h1>
        <p className="mt-3 text-lg text-[var(--text-secondary)]">
          15 分钟，读懂一本好书
        </p>
        <p className="mt-2 max-w-md text-sm text-[var(--text-tertiary)]">
          输入任何一本书的名字，AI 帮你提炼精华，思维导图式呈现，让你快速获得一本书的核心价值。
        </p>

        {/* 搜索栏 */}
        <div className="mt-6 w-full max-w-md">
          <SearchBar />
        </div>

        {/* 工作原理 */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-center text-xs text-[var(--text-tertiary)]">
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--text-primary)] text-sm font-bold text-white">1</span>
            <span>输入书名</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--text-primary)] text-sm font-bold text-white">2</span>
            <span>AI 提炼精华</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--text-primary)] text-sm font-bold text-white">3</span>
            <span>沉浸式阅读</span>
          </div>
        </div>

        {/* 社会证明 */}
        {bookCount > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-[var(--text-tertiary)]">
            <span><strong className="text-[var(--text-secondary)]">{bookCount}</strong> 本书籍</span>
            {userCount > 0 && <span><strong className="text-[var(--text-secondary)]">{userCount}</strong> 位读者</span>}
            {readCount > 0 && <span><strong className="text-[var(--text-secondary)]">{readCount}</strong> 次阅读</span>}
          </div>
        )}
      </section>

      {/* ─── 分类标签 ─── */}
      <div className="mb-8">
        <CategoryPills />
      </div>

      {/* ─── 精选推荐（神作） ─── */}
      {featuredBooks.length > 0 && (
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              精选推荐
            </h2>
            <Link
              href="/explore"
              className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
            >
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBooks.map((book) => (
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
        </section>
      )}

      {/* ─── 最新上架 ─── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {featuredBooks.length > 0 ? '最新上架' : '全部书籍'}
          </h2>
        </div>
        {latestBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {latestBooks.map((book) => (
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
              还没有书籍，试试搜索添加第一本吧
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

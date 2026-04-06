'use client';

import MotionBookCard from '@/components/motion/MotionBookCard';
import SearchBar from './SearchBar';
import CategoryPills from './CategoryPills';
import Link from 'next/link';

interface BookData {
  id: string;
  title: string;
  author: string;
  category?: string | null;
  score?: number | null;
  description?: string | null;
}

interface AnimatedHomeProps {
  featuredBooks: BookData[];
  latestBooks: BookData[];
  bookCount: number;
  userCount: number;
  readCount: number;
}

export default function AnimatedHome({
  featuredBooks,
  latestBooks,
  bookCount,
  userCount,
  readCount,
}: AnimatedHomeProps) {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-12 md:px-6 md:pt-16">
      {/* ─── Hero Section — CSS stagger entrance ─── */}
      <section className="mb-14 flex flex-col items-center text-center">
        <h1 className="vibe-enter text-4xl font-bold tracking-tight text-[var(--text-primary)] md:text-5xl" style={{ '--enter-order': 0 } as React.CSSProperties}>
          Read Is Big
        </h1>
        <p className="vibe-enter mt-3 text-lg text-[var(--text-secondary)]" style={{ '--enter-order': 1 } as React.CSSProperties}>
          15 分钟，读懂一本好书
        </p>
        <p className="vibe-enter mt-2 max-w-md text-sm text-[var(--text-tertiary)]" style={{ '--enter-order': 2 } as React.CSSProperties}>
          输入任何一本书的名字，AI 帮你提炼精华，思维导图式呈现，让你快速获得一本书的核心价值。
        </p>

        {/* 搜索栏 */}
        <div className="vibe-enter mt-6 w-full max-w-md" style={{ '--enter-order': 3 } as React.CSSProperties}>
          <SearchBar />
        </div>

        {/* 工作原理 */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-center text-xs text-[var(--text-tertiary)]">
          {['输入书名', 'AI 提炼精华', '沉浸式阅读'].map((step, i) => (
            <div
              key={step}
              className="vibe-enter-scale flex flex-col items-center gap-1.5"
              style={{ '--enter-order': i } as React.CSSProperties}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--text-primary)] text-sm font-bold text-white">
                {i + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* 社会证明 */}
        {bookCount > 0 && (
          <div className="vibe-enter mt-6 flex flex-wrap justify-center gap-6 text-xs text-[var(--text-tertiary)]" style={{ '--enter-order': 5 } as React.CSSProperties}>
            <span>
              <strong className="text-[var(--text-secondary)]">{bookCount}</strong> 本书籍
            </span>
            {userCount > 0 && (
              <span>
                <strong className="text-[var(--text-secondary)]">{userCount}</strong> 位读者
              </span>
            )}
            {readCount > 0 && (
              <span>
                <strong className="text-[var(--text-secondary)]">{readCount}</strong> 次阅读
              </span>
            )}
          </div>
        )}
      </section>

      {/* ─── 分类标签 ─── */}
      <div className="vibe-scroll-reveal mb-8">
        <CategoryPills />
      </div>

      {/* ─── 精选推荐 ─── */}
      {featuredBooks.length > 0 && (
        <section className="vibe-scroll-reveal mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">精选推荐</h2>
            <Link
              href="/explore"
              className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
            >
              查看全部
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBooks.map((book, i) => (
              <div
                key={book.id}
                className="vibe-scroll-reveal"
                style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
              >
                <MotionBookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  category={book.category ?? undefined}
                  score={book.score ?? undefined}
                  description={book.description ?? undefined}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── 最新上架 ─── */}
      <section className="vibe-scroll-reveal">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {featuredBooks.length > 0 ? '最新上架' : '全部书籍'}
          </h2>
        </div>
        {latestBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {latestBooks.map((book, i) => (
              <div
                key={book.id}
                className="vibe-scroll-reveal"
                style={{ '--reveal-delay': `${i * 50}ms` } as React.CSSProperties}
              >
                <MotionBookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  category={book.category ?? undefined}
                  score={book.score ?? undefined}
                  description={book.description ?? undefined}
                />
              </div>
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

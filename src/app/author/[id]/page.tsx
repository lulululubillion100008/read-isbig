import type { Metadata } from 'next';
import Link from 'next/link';
import { getAuthorById, getBooksByAuthor } from '@/lib/mock-categories';
import RatingBadge from '@/components/explore/RatingBadge';

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { id } = await params;
  const author = getAuthorById(id);

  if (!author) {
    return { title: '未找到作者' };
  }

  return {
    title: `${author.name} - Read Is Big`,
    description: author.bio ?? `了解作者${author.name}的作品与生平`,
  };
}

// 根据书名生成渐变色
function getBookGradient(title: string): string {
  const colors = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a18cd1', '#fbc2eb'],
    ['#fccb90', '#d57eeb'],
    ['#e0c3fc', '#8ec5fc'],
  ];
  const index = title.charCodeAt(0) % colors.length;
  return `linear-gradient(135deg, ${colors[index][0]}, ${colors[index][1]})`;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;
  const author = getAuthorById(id);
  const books = getBooksByAuthor(id).sort((a, b) => b.score - a.score);

  if (!author) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: 'var(--background)' }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            未找到该作者
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

  // 生卒年显示
  const lifespan = author.birthYear
    ? author.deathYear
      ? `${author.birthYear} - ${author.deathYear}`
      : `${author.birthYear} - 至今`
    : '';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-dark sticky top-0 z-20">
        <div className="mx-auto flex max-w-4xl items-center px-6 py-4">
          <Link
            href="/explore"
            className="text-sm font-medium text-gray-300"
            style={{ transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            &larr; 返回探索
          </Link>
        </div>
      </header>

      {/* Author Hero -- immersive dark gradient */}
      <section
        className="relative overflow-hidden px-6 pt-20 pb-24"
        style={{
          background: 'linear-gradient(165deg, #0c1222 0%, #141e38 35%, #1a1a2e 65%, var(--background) 100%)',
        }}
      >
        {/* Decorative orbs */}
        <div className="absolute left-1/2 top-8 h-80 w-80 -translate-x-1/2 rounded-full bg-[#6366f1]/12 blur-[120px]" />
        <div className="absolute right-1/4 top-28 h-56 w-56 rounded-full bg-[#a855f7]/10 blur-[100px]" />
        <div className="absolute left-1/4 bottom-8 h-48 w-48 rounded-full bg-[#ec4899]/8 blur-[80px]" />
        <div className="absolute right-1/3 bottom-16 h-32 w-32 rounded-full bg-[#06b6d4]/6 blur-[60px]" />

        <div className="relative mx-auto max-w-4xl">
          <div className="float-up flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute inset-0 scale-150 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-25" />
              <div
                className="relative flex h-32 w-32 items-center justify-center rounded-full text-5xl font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--accent), #a855f7, #ec4899)',
                  boxShadow: '0 12px 40px rgba(99, 102, 241, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                  border: '3px solid rgba(255,255,255,0.12)',
                }}
              >
                {author.name.charAt(0)}
              </div>
            </div>

            <h1 className="float-up float-up-delay-1 mt-8 text-4xl font-extrabold text-white tracking-tight md:text-5xl">
              {author.name}
            </h1>

            {/* Nationality & lifespan */}
            <div className="float-up float-up-delay-2 mt-4 flex items-center gap-3 text-sm text-gray-400">
              {author.nationality && (
                <span className="font-medium">{author.nationality}</span>
              )}
              {lifespan && (
                <>
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.2)' }}
                  />
                  <span>{lifespan}</span>
                </>
              )}
            </div>

            {/* Tags */}
            {author.tags && author.tags.length > 0 && (
              <div className="float-up float-up-delay-3 mt-6 flex flex-wrap justify-center gap-2.5">
                {author.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 text-sm font-medium text-gray-200"
                    style={{
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content area */}
      <div style={{ background: 'var(--background)' }}>
        <div className="mx-auto max-w-4xl px-6">
          {/* Bio */}
          <section className="py-14">
            <h2
              className="flex items-center gap-3 text-xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              <span
                className="h-6 w-1 rounded-full"
                style={{ background: 'linear-gradient(to bottom, var(--accent), #a855f7)' }}
              />
              关于作者
            </h2>
            <p
              className="mt-6 text-base leading-[1.9]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {author.bio}
            </p>
          </section>

          {/* Achievements */}
          {author.achievements && author.achievements.length > 0 && (
            <section className="pb-14">
              <h2
                className="flex items-center gap-3 text-xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                <span
                  className="h-6 w-1 rounded-full"
                  style={{ background: 'linear-gradient(to bottom, var(--warm), #ef4444)' }}
                />
                主要成就
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {author.achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4"
                    style={{
                      padding: '1.25rem 1.5rem',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--surface)',
                      boxShadow: 'var(--shadow-card)',
                      border: '1px solid var(--border-subtle)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{
                        background: 'linear-gradient(135deg, var(--warm), #ef4444)',
                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Books by this author */}
          {books.length > 0 && (
            <section className="pb-28">
              <h2
                className="flex items-center gap-3 text-xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                <span
                  className="h-6 w-1 rounded-full"
                  style={{ background: 'linear-gradient(to bottom, var(--success), #059669)' }}
                />
                该作者的书籍
                <span
                  className="px-3 py-1 text-xs font-semibold"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(16, 185, 129, 0.08)',
                    color: 'var(--success)',
                    border: '1px solid rgba(16, 185, 129, 0.12)',
                  }}
                >
                  {books.length} 本
                </span>
              </h2>

              <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                  <Link key={book.id} href={`/book/${book.id}`} className="group block">
                    <div
                      className="overflow-hidden"
                      style={{
                        borderRadius: 'var(--radius-xl)',
                        background: 'var(--surface)',
                        boxShadow: 'var(--shadow-card)',
                        border: '1px solid var(--border-subtle)',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {/* Cover */}
                      <div
                        className="relative flex h-48 items-center justify-center p-5"
                        style={{ background: getBookGradient(book.title) }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/12" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent" />
                        <h3 className="relative z-10 text-center text-base font-bold leading-tight text-white drop-shadow-lg">
                          {book.title}
                        </h3>
                        {/* Rating badge */}
                        <div className="absolute right-3 top-3">
                          <RatingBadge score={book.score} rating={book.rating} size="sm" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <div className="flex flex-wrap gap-1.5">
                          {book.categories.slice(0, 2).map((cat) => (
                            <span
                              key={cat}
                              className="px-2.5 py-0.5 text-xs font-medium"
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
                        {book.totalReaders && (
                          <p
                            className="mt-2.5 text-xs font-medium"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            {(book.totalReaders / 10000).toFixed(1)}万人读过
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer
        className="py-12 text-center text-sm"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border-subtle)',
          color: 'var(--text-tertiary)',
        }}
      >
        <p>&copy; {new Date().getFullYear()} Read Is Big. 让阅读更高效。</p>
      </footer>
    </div>
  );
}

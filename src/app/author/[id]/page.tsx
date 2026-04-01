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

function getBookGradient(title: string): string {
  const colors = [
    ['#ad3332', '#9c2627'],
    ['#416757', '#355a4b'],
    ['#5b605c', '#4f5450'],
    ['#59615f', '#757c7a'],
    ['#ad3332', '#5b605c'],
    ['#416757', '#9c2627'],
    ['#67040d', '#ad3332'],
    ['#5b605c', '#416757'],
  ];
  const index = title.charCodeAt(0) % colors.length;
  return `linear-gradient(135deg, ${colors[index][0]}, ${colors[index][1]})`;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;
  const author = getAuthorById(id);

  if (!author) {
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
            未找到该作者
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

  const books = getBooksByAuthor(id).sort((a, b) => b.score - a.score);

  const lifespan = author.birthYear
    ? author.deathYear
      ? `${author.birthYear} - ${author.deathYear}`
      : `${author.birthYear} - 至今`
    : '';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-dark sticky top-0 z-20">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="/explore"
            className="text-sm font-medium transition-colors"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            &larr; 返回探索
          </Link>
          <span
            className="text-[10px] font-medium uppercase tracking-[0.3em]"
            style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-label)' }}
          >
            Author Profile
          </span>
        </div>
      </header>

      {/* Author Hero - ink wash dark gradient */}
      <section
        className="relative overflow-hidden px-6 pt-20 pb-24"
        style={{
          background: 'linear-gradient(165deg, #2d3432 0%, #1a2220 35%, #181e1c 65%, var(--background) 100%)',
        }}
      >
        {/* Decorative orbs - design system palette */}
        <div className="absolute left-1/2 top-8 h-80 w-80 -translate-x-1/2 blur-[120px]" style={{ background: 'rgba(173, 51, 50, 0.12)' }} />
        <div className="absolute right-1/4 top-28 h-56 w-56 blur-[100px]" style={{ background: 'rgba(91, 96, 92, 0.10)' }} />
        <div className="absolute left-1/4 bottom-8 h-48 w-48 blur-[80px]" style={{ background: 'rgba(65, 103, 87, 0.08)' }} />

        <div className="relative mx-auto max-w-4xl">
          <div className="float-up flex flex-col items-center text-center">
            {/* Avatar - Seal stamp style */}
            <div className="relative">
              <div className="absolute inset-0 scale-150 blur-2xl" style={{ background: 'rgba(173, 51, 50, 0.25)' }} />
              <div
                className="relative flex h-32 w-32 items-center justify-center text-5xl font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #ad3332, #9c2627)',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                {author.name.charAt(0)}
              </div>
            </div>

            <h1
              className="float-up float-up-delay-1 mt-8 text-4xl font-extrabold text-white tracking-tight md:text-5xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {author.name}
            </h1>

            {/* Nationality & lifespan */}
            <div className="float-up float-up-delay-2 mt-4 flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {author.nationality && (
                <span className="font-medium">{author.nationality}</span>
              )}
              {lifespan && (
                <>
                  <span className="h-1 w-1" style={{ background: 'rgba(255,255,255,0.2)' }} />
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
                    className="px-4 py-1.5 text-sm font-medium"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      background: 'rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(24px)',
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
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
            >
              <span
                className="h-6 w-1"
                style={{ background: 'linear-gradient(to bottom, #ad3332, #9c2627)' }}
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
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
              >
                <span
                  className="h-6 w-1"
                  style={{ background: 'linear-gradient(to bottom, #416757, #355a4b)' }}
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
                      background: 'var(--surface-container-lowest)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <span
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-xs font-bold text-white"
                      style={{
                        background: 'linear-gradient(135deg, #416757, #355a4b)',
                        fontFamily: 'var(--font-label)',
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
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
              >
                <span
                  className="h-6 w-1"
                  style={{ background: 'linear-gradient(to bottom, #5b605c, #4f5450)' }}
                />
                该作者的书籍
                <span
                  className="px-3 py-1 text-xs font-semibold"
                  style={{
                    background: 'rgba(91, 96, 92, 0.08)',
                    color: '#5b605c',
                    fontFamily: 'var(--font-label)',
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
                        background: 'var(--surface-container-lowest)',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {/* Cover */}
                      <div
                        className="relative flex h-48 items-center justify-center p-5"
                        style={{ background: getBookGradient(book.title) }}
                      >
                        <h3
                          className="relative z-10 text-center text-base font-bold leading-tight text-white drop-shadow-lg"
                          style={{ fontFamily: 'var(--font-serif)' }}
                        >
                          {book.title}
                        </h3>
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
                                background: 'var(--surface-container-high)',
                                color: 'var(--text-tertiary)',
                                fontFamily: 'var(--font-label)',
                              }}
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        {book.totalReaders && (
                          <p
                            className="mt-2.5 text-xs font-medium"
                            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
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

      {/* Footer - tonal bg separation */}
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

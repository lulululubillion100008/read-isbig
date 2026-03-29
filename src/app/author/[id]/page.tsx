import Link from 'next/link';
import { getAuthorById, getBooksByAuthor } from '@/lib/mock-categories';
import RatingBadge from '@/components/explore/RatingBadge';

interface AuthorPageProps {
  params: Promise<{ id: string }>;
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">未找到该作者</h1>
          <Link href="/explore" className="mt-4 inline-block text-indigo-500 hover:underline">
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-50">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center px-6 py-4">
          <Link href="/explore" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            &larr; 返回探索
          </Link>
        </div>
      </header>

      {/* 作者信息区 - 深色背景 */}
      <section className="relative overflow-hidden px-6 pt-12 pb-16">
        {/* 装饰光晕 */}
        <div className="absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-32 h-32 w-32 rounded-full bg-purple-500/15 blur-2xl" />

        <div className="relative mx-auto max-w-4xl">
          {/* 头像区域 */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              {/* 光晕效果 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-lg opacity-40" />
              {/* 头像占位 */}
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl font-bold text-white shadow-xl ring-4 ring-white/20">
                {author.name.charAt(0)}
              </div>
            </div>

            <h1 className="mt-6 text-3xl font-extrabold text-white md:text-4xl">
              {author.name}
            </h1>

            {/* 国籍与生卒年 */}
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
              {author.nationality && <span>{author.nationality}</span>}
              {lifespan && (
                <>
                  <span className="h-1 w-1 rounded-full bg-gray-500" />
                  <span>{lifespan}</span>
                </>
              )}
            </div>

            {/* 标签 */}
            {author.tags && author.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {author.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3.5 py-1 text-sm font-medium text-gray-200 backdrop-blur-sm border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 白色背景区域 */}
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-6">
          {/* 简介 */}
          <section className="py-10">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <span className="h-6 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />
              关于作者
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              {author.bio}
            </p>
          </section>

          {/* 主要成就 */}
          {author.achievements && author.achievements.length > 0 && (
            <section className="pb-10">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <span className="h-6 w-1 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500" />
                主要成就
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {author.achievements.map((achievement, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 p-4 border border-yellow-100/50"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 该作者的书籍 */}
          {books.length > 0 && (
            <section className="pb-20">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <span className="h-6 w-1 rounded-full bg-gradient-to-b from-green-400 to-emerald-500" />
                该作者的书籍
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                  {books.length} 本
                </span>
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                  <Link key={book.id} href={`/book/${book.id}`} className="group block">
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      {/* 封面 */}
                      <div
                        className="relative flex h-40 items-center justify-center p-3"
                        style={{ background: getBookGradient(book.title) }}
                      >
                        <h3 className="text-center text-base font-bold leading-tight text-white drop-shadow-md">
                          {book.title}
                        </h3>
                        {/* 评分徽章 */}
                        <div className="absolute right-2 top-2">
                          <RatingBadge score={book.score} rating={book.rating} size="sm" />
                        </div>
                      </div>

                      {/* 信息 */}
                      <div className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {book.categories.slice(0, 2).map((cat) => (
                            <span key={cat} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                              {cat}
                            </span>
                          ))}
                        </div>
                        {book.totalReaders && (
                          <p className="mt-1.5 text-xs text-gray-400">
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
      <footer className="border-t border-gray-100 bg-white py-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Read Is Big. 让阅读更高效。</p>
      </footer>
    </div>
  );
}

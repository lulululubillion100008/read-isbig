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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">未找到该分类</h1>
          <Link href="/explore" className="mt-4 inline-block text-indigo-500 hover:underline">
            返回探索页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/30">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/explore" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
            &larr; 返回探索
          </Link>
        </div>
      </header>

      {/* 分类头部 */}
      <section className="px-6 pt-10 pb-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${categoryInfo.color}33, ${categoryInfo.color}66)`,
              }}
            >
              {categoryInfo.icon}
            </span>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{categoryInfo.name}</h1>
              <p className="mt-1 text-gray-500">{categoryInfo.description}</p>
            </div>
          </div>
          <div className="mt-4">
            <span
              className="inline-block rounded-full px-3 py-1 text-sm font-medium text-white"
              style={{ backgroundColor: categoryInfo.color }}
            >
              共 {allBooks.length} 本书
            </span>
          </div>
        </div>
      </section>

      {/* 筛选标签 + 书籍列表 */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        {/* 筛选标签 */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {ratingGroups.map((group) => (
            <span
              key={group.label}
              className={`inline-block shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                group.label === '全部'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {group.label}
              <span className="ml-1 opacity-60">{group.books.length}</span>
            </span>
          ))}
        </div>

        {/* 书籍列表 */}
        {sortedBooks.length === 0 ? (
          <p className="py-12 text-center text-gray-400">该分类暂无书籍</p>
        ) : (
          <div className="flex flex-col gap-4">
            {sortedBooks.map((book) => (
              <BookListCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Read Is Big. 让阅读更高效。</p>
      </footer>
    </div>
  );
}

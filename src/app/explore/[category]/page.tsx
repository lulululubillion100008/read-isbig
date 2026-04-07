import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import BookCard from '@/components/home/BookCard';
import CategoryPills from '@/components/home/CategoryPills';
import Link from 'next/link';

export const revalidate = 300;

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: rawCategory } = await params;
  const categoryName = decodeURIComponent(rawCategory);
  return {
    title: `${categoryName} - 探索 - Read Is Big`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: rawCategory } = await params;
  const categoryName = decodeURIComponent(rawCategory);

  const books = await prisma.book.findMany({
    where: { category: categoryName },
    orderBy: { createdAt: 'desc' },
    take: 30,
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
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-8 md:px-6 md:pt-20">
      <div className="mb-6">
        <Link
          href="/explore"
          className="text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
        >
          &larr; 探索
        </Link>
        <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)]">{categoryName}</h1>
      </div>

      <div className="mb-6">
        <CategoryPills active={categoryName} />
      </div>

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
            该分类暂无书籍
          </p>
        </div>
      )}
    </main>
  );
}

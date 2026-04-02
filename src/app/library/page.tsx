import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Link from 'next/link';
import BookCard from '@/components/home/BookCard';
import LibraryTabs from '@/components/library/LibraryTabs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '我的书架 - Read Is Big',
};

export default async function LibraryPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="text-sm text-[var(--text-tertiary)]">请先登录查看书架</p>
        <Link
          href="/"
          className="mt-4 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          &larr; 返回首页
        </Link>
      </main>
    );
  }

  let userId: string;
  try {
    const payload = verifyToken(token);
    if (!payload) throw new Error('invalid token');
    userId = payload.userId;
  } catch {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="text-sm text-[var(--text-tertiary)]">登录已过期，请重新登录</p>
        <Link
          href="/"
          className="mt-4 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          &larr; 返回首页
        </Link>
      </main>
    );
  }

  const [favorites, history] = await Promise.all([
    prisma.userFavorite.findMany({
      where: { userId },
      include: {
        book: {
          select: { id: true, title: true, author: true, category: true, score: true, description: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.readingHistory.findMany({
      where: { userId },
      include: {
        book: {
          select: { id: true, title: true, author: true, category: true, score: true, description: true },
        },
      },
      orderBy: { readAt: 'desc' },
      take: 20,
    }),
  ]);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-8 md:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
          >
            &larr; 首页
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)]">我的书架</h1>
        </div>
      </div>

      <LibraryTabs
        favorites={favorites.map((f) => f.book)}
        history={history.map((h) => h.book)}
      />
    </main>
  );
}

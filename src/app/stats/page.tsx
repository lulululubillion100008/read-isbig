import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import Link from 'next/link';
import StatsOverview from '@/components/stats/StatsOverview';

export const metadata: Metadata = {
  title: '阅读统计 - Read Is Big',
};

export default async function StatsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="text-sm text-[var(--text-tertiary)]">请先登录查看统计</p>
        <Link
          href="/"
          className="mt-4 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          &larr; 返回首页
        </Link>
      </main>
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="text-sm text-[var(--text-tertiary)]">登录已过期</p>
      </main>
    );
  }

  const userId = payload.userId;
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [totalSessions, weekSessions, historyCount, recentBooks] = await Promise.all([
    prisma.readingSession.aggregate({
      where: { userId },
      _sum: { durationMin: true },
    }),
    prisma.readingSession.aggregate({
      where: { userId, startedAt: { gte: weekAgo } },
      _sum: { durationMin: true },
    }),
    prisma.readingHistory.count({ where: { userId } }),
    prisma.readingHistory.findMany({
      where: { userId },
      include: { book: { select: { id: true, title: true } } },
      orderBy: { readAt: 'desc' },
      take: 10,
    }),
  ]);

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 pb-24 pt-8 md:px-6">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
        >
          &larr; 首页
        </Link>
        <h1 className="mt-1 text-2xl font-bold text-[var(--text-primary)]">阅读统计</h1>
      </div>

      <StatsOverview
        totalMinutes={totalSessions._sum.durationMin ?? 0}
        thisWeekMinutes={weekSessions._sum.durationMin ?? 0}
        totalBooks={historyCount}
        recentBooks={recentBooks.map((h) => ({
          id: h.book.id,
          title: h.book.title,
          lastRead: h.readAt,
        }))}
      />
    </main>
  );
}

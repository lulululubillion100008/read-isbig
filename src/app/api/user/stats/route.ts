import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ success: false, error: '未登录' }, { status: 401 });
  }

  // 并行查询统计数据
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalBooksRead,
    totalSessions,
    weekSessions,
    recentHistory,
  ] = await Promise.all([
    prisma.readingHistory.count({ where: { userId } }),
    prisma.readingSession.aggregate({
      where: { userId },
      _sum: { durationMin: true },
    }),
    prisma.readingSession.aggregate({
      where: { userId, startedAt: { gte: weekAgo } },
      _sum: { durationMin: true },
    }),
    prisma.readingHistory.findMany({
      where: { userId },
      include: { book: { select: { id: true, title: true } } },
      orderBy: { readAt: 'desc' },
      take: 5,
    }),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      totalBooksRead,
      totalMinutes: totalSessions._sum.durationMin ?? 0,
      thisWeekMinutes: weekSessions._sum.durationMin ?? 0,
      recentBooks: recentHistory.map((h) => ({
        bookId: h.book.id,
        title: h.book.title,
        lastRead: h.readAt,
      })),
    },
  });
}

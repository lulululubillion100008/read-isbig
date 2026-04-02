import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;
  if (!token) {
    return NextResponse.json({ success: false, error: '未登录' }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ success: false, error: '登录已过期' }, { status: 401 });
  }

  const userId = payload.userId;

  // 并行查询统计数据
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalBooks,
    totalSessions,
    weekSessions,
    recentHistory,
  ] = await Promise.all([
    prisma.userFavorite.count({ where: { userId } }),
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
      totalBooksRead: totalBooks,
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

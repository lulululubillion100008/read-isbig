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
    favoriteCount,
    achievementCount,
    categoryResult,
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
    prisma.userFavorite.count({ where: { userId } }),
    prisma.userAchievement.count({ where: { userId } }),
    prisma.readingHistory.findMany({
      where: { userId },
      select: { book: { select: { category: true } } },
      distinct: ['bookId'],
    }),
  ]);

  const categoriesExplored = new Set(
    categoryResult.map(r => r.book.category).filter(Boolean)
  ).size;

  // Calculate reading streak (days with reading history)
  const last30Days = await prisma.readingHistory.findMany({
    where: { userId, readAt: { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) } },
    select: { readAt: true },
    orderBy: { readAt: 'desc' },
  });

  let currentStreak = 0;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const readDays = new Set(
    last30Days.map(r => {
      const d = new Date(r.readAt);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );

  for (let i = 0; i < 30; i++) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (readDays.has(key)) {
      currentStreak++;
    } else if (i > 0) {
      break; // streak broken
    }
    // Allow today to be missing (haven't read yet today)
  }

  return NextResponse.json({
    success: true,
    data: {
      totalBooksRead,
      totalMinutes: totalSessions._sum.durationMin ?? 0,
      thisWeekMinutes: weekSessions._sum.durationMin ?? 0,
      currentStreak,
      favoriteCount,
      achievementCount,
      categoriesExplored,
      recentBooks: recentHistory.map((h) => ({
        bookId: h.book.id,
        title: h.book.title,
        lastRead: h.readAt,
      })),
    },
  });
}

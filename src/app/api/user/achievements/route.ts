import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

/**
 * GET /api/user/achievements — 获取用户成就列表
 */
export async function GET(request: Request) {
  const userId = getUserIdFromRequest(request)
  if (!userId) {
    return NextResponse.json({ success: false, error: '未登录' }, { status: 401 })
  }

  try {
    const [allAchievements, userAchievements] = await Promise.all([
      prisma.achievement.findMany(),
      prisma.userAchievement.findMany({
        where: { userId },
        select: { achievementId: true, unlockedAt: true },
      }),
    ])

    const unlockedMap = new Map(
      userAchievements.map(ua => [ua.achievementId, ua.unlockedAt])
    )

    const achievements = allAchievements.map(a => ({
      id: a.id,
      key: a.key,
      name: a.name,
      description: a.description,
      icon: a.icon,
      unlocked: unlockedMap.has(a.id),
      unlockedAt: unlockedMap.get(a.id) ?? null,
    }))

    return NextResponse.json({ success: true, data: achievements })
  } catch {
    return NextResponse.json(
      { success: false, error: '获取成就列表失败' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/user/achievements — 检查并解锁新成就
 */
export async function POST(request: Request) {
  const userId = getUserIdFromRequest(request)
  if (!userId) {
    return NextResponse.json({ success: false, error: '未登录' }, { status: 401 })
  }

  try {
  // Gather user stats
  const [readingCount, favoriteCount, categoryResult, qaCount, minutesResult] = await Promise.all([
    prisma.readingHistory.count({ where: { userId } }),
    prisma.userFavorite.count({ where: { userId } }),
    prisma.readingHistory.findMany({
      where: { userId },
      select: { book: { select: { category: true } } },
      distinct: ['bookId'],
    }),
    prisma.aIMessage.count({
      where: { conversation: { userId }, role: 'user' },
    }),
    prisma.readingSession.aggregate({
      where: { userId },
      _sum: { durationMin: true },
    }),
  ])

  const categoryCount = new Set(categoryResult.map(r => r.book.category).filter(Boolean)).size
  const totalMinutes = minutesResult._sum.durationMin ?? 0

  // TODO: streak calculation would need date-by-date analysis
  // For now we check simpler conditions
  const stats: Record<string, number> = {
    reading_count: readingCount,
    favorite_count: favoriteCount,
    category_count: categoryCount,
    qa_count: qaCount,
    total_minutes: totalMinutes,
    streak: 0, // placeholder
  }

  // Check all achievements
  const allAchievements = await prisma.achievement.findMany()
  const existing = await prisma.userAchievement.findMany({
    where: { userId },
    select: { achievementId: true },
  })
  const existingSet = new Set(existing.map(e => e.achievementId))

  const newlyUnlocked: string[] = []

  for (const ach of allAchievements) {
    if (existingSet.has(ach.id)) continue

    // Parse condition: "reading_count >= 5"
    const match = ach.condition.match(/^(\w+)\s*>=\s*(\d+)$/)
    if (!match) continue

    const [, metric, threshold] = match
    const value = stats[metric] ?? 0

    if (value >= Number(threshold)) {
      await prisma.userAchievement.create({
        data: { userId, achievementId: ach.id },
      })
      newlyUnlocked.push(ach.key)
    }
  }

  return NextResponse.json({
    success: true,
    data: { newlyUnlocked },
  })
  } catch {
    return NextResponse.json(
      { success: false, error: '检查成就失败' },
      { status: 500 }
    )
  }
}

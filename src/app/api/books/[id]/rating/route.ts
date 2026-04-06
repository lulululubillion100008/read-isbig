import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { z } from 'zod'

type RouteParams = { params: Promise<{ id: string }> }

const ratingSchema = z.object({
  score: z.number().int().min(1).max(5),
  feedback: z.string().max(500).optional(),
})

/**
 * POST /api/books/[id]/rating — 对书籍精华内容评分
 */
export async function POST(req: NextRequest, { params }: RouteParams) {
  const userId = getUserIdFromRequest(req)
  if (!userId) {
    return NextResponse.json({ success: false, error: '请先登录' }, { status: 401 })
  }

  const { id: bookId } = await params

  const summary = await prisma.bookSummary.findFirst({
    where: { bookId },
    orderBy: { generatedAt: 'desc' },
  })

  if (!summary) {
    return NextResponse.json({ success: false, error: '未找到该书的精华内容' }, { status: 404 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: '无效的请求体' }, { status: 400 })
  }

  const parsed = ratingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: '请提供 1-5 的评分' }, { status: 400 })
  }

  const { score, feedback } = parsed.data

  // Upsert rating
  await prisma.summaryRating.upsert({
    where: { summaryId_userId: { summaryId: summary.id, userId } },
    update: { score, feedback },
    create: { summaryId: summary.id, userId, score, feedback },
  })

  // Recalculate average
  const agg = await prisma.summaryRating.aggregate({
    where: { summaryId: summary.id },
    _avg: { score: true },
    _count: true,
  })

  await prisma.bookSummary.update({
    where: { id: summary.id },
    data: {
      rating: agg._avg.score ?? 0,
      ratingCount: agg._count,
    },
  })

  return NextResponse.json({
    success: true,
    data: {
      rating: agg._avg.score,
      ratingCount: agg._count,
    },
  })
}

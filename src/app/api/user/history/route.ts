import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { readingHistorySchema } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const userId = getUserIdFromRequest(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: '未登录' },
        { status: 401 }
      )
    }

    const history = await prisma.readingHistory.findMany({
      where: { userId },
      include: {
        book: {
          select: { id: true, title: true, author: true, category: true },
        },
      },
      orderBy: { readAt: 'desc' },
      take: 50,
    })

    return NextResponse.json({ success: true, data: history })
  } catch {
    return NextResponse.json(
      { success: false, error: '获取阅读历史失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const userId = getUserIdFromRequest(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: '未登录' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const parsed = readingHistorySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? '参数无效' },
        { status: 400 }
      )
    }

    const { bookId, lastReadPage } = parsed.data

    const record = await prisma.readingHistory.upsert({
      where: { userId_bookId: { userId, bookId } },
      update: { lastReadPage, readAt: new Date() },
      create: { userId, bookId, lastReadPage },
    })

    return NextResponse.json({ success: true, data: record })
  } catch {
    return NextResponse.json(
      { success: false, error: '更新阅读进度失败' },
      { status: 500 }
    )
  }
}

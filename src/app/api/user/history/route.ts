import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

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
      include: { book: true },
      orderBy: { readAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: history })
  } catch (error) {
    console.error('History GET error:', error)
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

    const { bookId, lastReadPage } = await request.json()

    if (!bookId) {
      return NextResponse.json(
        { success: false, error: '缺少bookId' },
        { status: 400 }
      )
    }

    const record = await prisma.readingHistory.upsert({
      where: { userId_bookId: { userId, bookId } },
      update: { lastReadPage: lastReadPage ?? 0, readAt: new Date() },
      create: { userId, bookId, lastReadPage: lastReadPage ?? 0 },
    })

    return NextResponse.json({ success: true, data: record })
  } catch (error) {
    console.error('History POST error:', error)
    return NextResponse.json(
      { success: false, error: '更新阅读进度失败' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'

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
      include: { book: true },
      orderBy: { readAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: history })
  } catch (error) {
    console.error('History GET error:', error instanceof Error ? error.message : 'unknown')
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
    const bookId = typeof body.bookId === 'string' ? body.bookId.trim() : ''

    if (!bookId || !/^[a-z][a-z0-9]{20,30}$/.test(bookId)) {
      return NextResponse.json(
        { success: false, error: '无效的bookId' },
        { status: 400 }
      )
    }

    const page = Number(body.lastReadPage)
    const lastReadPage = Number.isInteger(page) && page >= 0 && page <= 10000 ? page : 0

    const record = await prisma.readingHistory.upsert({
      where: { userId_bookId: { userId, bookId } },
      update: { lastReadPage, readAt: new Date() },
      create: { userId, bookId, lastReadPage },
    })

    return NextResponse.json({ success: true, data: record })
  } catch (error) {
    console.error('History POST error:', error instanceof Error ? error.message : 'unknown')
    return NextResponse.json(
      { success: false, error: '更新阅读进度失败' },
      { status: 500 }
    )
  }
}

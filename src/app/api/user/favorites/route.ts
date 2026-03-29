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

    const favorites = await prisma.userFavorite.findMany({
      where: { userId },
      include: { book: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: favorites })
  } catch (error) {
    console.error('Favorites GET error:', error)
    return NextResponse.json(
      { success: false, error: '获取收藏列表失败' },
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

    const { bookId } = await request.json()

    if (!bookId) {
      return NextResponse.json(
        { success: false, error: '缺少bookId' },
        { status: 400 }
      )
    }

    const favorite = await prisma.userFavorite.upsert({
      where: { userId_bookId: { userId, bookId } },
      update: {},
      create: { userId, bookId },
    })

    return NextResponse.json({ success: true, data: favorite })
  } catch (error) {
    console.error('Favorites POST error:', error)
    return NextResponse.json(
      { success: false, error: '添加收藏失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = getUserIdFromRequest(request)
    if (!userId) {
      return NextResponse.json(
        { success: false, error: '未登录' },
        { status: 401 }
      )
    }

    const { bookId } = await request.json()

    if (!bookId) {
      return NextResponse.json(
        { success: false, error: '缺少bookId' },
        { status: 400 }
      )
    }

    await prisma.userFavorite.deleteMany({
      where: { userId, bookId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Favorites DELETE error:', error)
    return NextResponse.json(
      { success: false, error: '取消收藏失败' },
      { status: 500 }
    )
  }
}

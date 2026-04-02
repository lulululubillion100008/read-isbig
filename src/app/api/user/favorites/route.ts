import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { favoriteSchema } from '@/lib/validation'

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
  } catch {
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

    const body = await request.json()
    const parsed = favoriteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: '无效的bookId' },
        { status: 400 }
      )
    }

    const { bookId } = parsed.data

    const favorite = await prisma.userFavorite.upsert({
      where: { userId_bookId: { userId, bookId } },
      update: {},
      create: { userId, bookId },
    })

    return NextResponse.json({ success: true, data: favorite })
  } catch {
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

    const body = await request.json()
    const parsed = favoriteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: '无效的bookId' },
        { status: 400 }
      )
    }

    const { bookId } = parsed.data

    await prisma.userFavorite.deleteMany({
      where: { userId, bookId },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: '取消收藏失败' },
      { status: 500 }
    )
  }
}

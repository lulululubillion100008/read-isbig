import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const ip = getClientIp(request)
  const { success: allowed } = rateLimit(`search:${ip}`, 30, 60_000)
  if (!allowed) {
    return Response.json(
      { success: false, error: '请求过于频繁，请稍后重试' },
      { status: 429 }
    )
  }

  const rawQuery = request.nextUrl.searchParams.get('q') || ''
  const query = rawQuery.slice(0, 200)

  if (!query.trim()) {
    return Response.json({ success: true, data: [] })
  }

  try {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { author: { contains: query } },
        ],
      },
      take: 20,
      orderBy: { createdAt: 'desc' },
    })

    return Response.json({
      success: true,
      data: books.map(b => ({
        id: b.id,
        title: b.title,
        author: b.author,
        category: b.category,
      })),
    })
  } catch {
    return Response.json(
      { success: false, error: '搜索失败，请稍后重试' },
      { status: 500 }
    )
  }
}

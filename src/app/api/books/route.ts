import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category')
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 20))
  const skip = (page - 1) * limit

  const where = category ? { category } : {}

  const [books, total] = await Promise.all([
    prisma.book.findMany({
      where,
      skip,
      take: limit,
      orderBy: [
        { score: 'desc' },
        { createdAt: 'desc' },
      ],
    }),
    prisma.book.count({ where }),
  ])

  return Response.json({
    success: true,
    data: books,
    meta: { total, page, limit },
  })
}

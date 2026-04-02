import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const rawQuery = request.nextUrl.searchParams.get('q') || ''
  const query = rawQuery.slice(0, 200)

  if (!query.trim()) {
    return Response.json({ success: true, data: [] })
  }

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
}

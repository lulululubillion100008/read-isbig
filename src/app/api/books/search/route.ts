import type { NextRequest } from 'next/server'
import { searchMockBooks } from '@/lib/mock-data'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || ''
  const results = searchMockBooks(query)

  return Response.json({
    success: true,
    data: results.map(s => ({
      id: s.bookId,
      title: s.book.title,
      author: s.book.author,
      category: s.book.category,
      readingTime: s.readingTime,
    }))
  })
}

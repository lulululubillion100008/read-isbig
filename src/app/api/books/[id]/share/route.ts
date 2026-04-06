import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * GET /api/books/[id]/share — 获取分享数据（公开接口，无需登录）
 * 返回书籍基本信息和前 2 章精华预览
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const book = await prisma.book.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      author: true,
      category: true,
      description: true,
      score: true,
    },
  })

  if (!book) {
    return Response.json({ success: false, error: '书籍不存在' }, { status: 404 })
  }

  const summary = await prisma.bookSummary.findFirst({
    where: { bookId: id },
    orderBy: { generatedAt: 'desc' },
    select: {
      chaptersJson: true,
      readingTime: true,
      rating: true,
      ratingCount: true,
    },
  })

  // Return preview: only first 2 chapters for non-logged-in users
  let previewChapters: unknown[] = []
  let totalChapters = 0

  if (summary?.chaptersJson) {
    try {
      const chapters = JSON.parse(summary.chaptersJson)
      totalChapters = chapters.length
      previewChapters = chapters.slice(0, 2)
    } catch {
      // ignore
    }
  }

  return Response.json({
    success: true,
    data: {
      book,
      preview: {
        chapters: previewChapters,
        totalChapters,
        readingTime: summary?.readingTime ?? 15,
        rating: summary?.rating,
        ratingCount: summary?.ratingCount ?? 0,
      },
    },
  })
}

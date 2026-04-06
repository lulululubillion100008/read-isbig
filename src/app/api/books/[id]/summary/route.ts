import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { generateBookSummary } from '@/lib/ai/summary'
import { getUserIdFromRequest } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'
import { bookIdSchema } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  // 先查缓存
  const existing = await prisma.bookSummary.findFirst({
    where: { bookId: id },
    include: { book: true },
    orderBy: { generatedAt: 'desc' },
  })

  if (existing) {
    return Response.json({
      success: true,
      data: {
        bookId: existing.bookId,
        book: existing.book,
        chapters: existing.chaptersJson ? JSON.parse(existing.chaptersJson) : [],
        readingTime: existing.readingTime,
        contentType: existing.contentType,
        generatedAt: existing.generatedAt,
      },
    })
  }

  // 查找书籍元数据
  const book = await prisma.book.findUnique({ where: { id } })
  if (!book) {
    return Response.json({ success: false, error: '书籍未找到' }, { status: 404 })
  }

  return Response.json({
    success: false,
    error: '该书尚无内容，请使用 POST 生成',
  }, { status: 404 })
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const userId = getUserIdFromRequest(request)
  if (!userId) {
    return Response.json({ success: false, error: '请先登录' }, { status: 401 })
  }

  const { id } = await context.params

  const parsed = bookIdSchema.safeParse({ bookId: id })
  if (!parsed.success) {
    return Response.json({ success: false, error: '无效的书籍ID' }, { status: 400 })
  }

  const rateLimitKey = `generate:${userId}`
  const { success: allowed } = rateLimit(rateLimitKey, 3, 60_000)
  if (!allowed) {
    return Response.json(
      { success: false, error: '请求过于频繁，请稍后重试' },
      { status: 429 }
    )
  }

  // 查找或创建书籍
  let book = await prisma.book.findUnique({ where: { id } })

  if (!book) {
    // 尝试从请求体获取书籍信息
    let body: { title?: string; author?: string } = {}
    try {
      body = await request.json()
    } catch {
      // empty body
    }

    if (!body.title || typeof body.title !== 'string' || body.title.length > 200) {
      return Response.json(
        { success: false, error: '书籍不存在，请提供有效的 title 和 author' },
        { status: 400 }
      )
    }

    book = await prisma.book.create({
      data: {
        title: body.title.trim(),
        author: typeof body.author === 'string' ? body.author.trim().slice(0, 100) : '未知作者',
      },
    })
  }

  // 检查是否已有内容
  const existing = await prisma.bookSummary.findFirst({
    where: { bookId: id },
    orderBy: { generatedAt: 'desc' },
  })

  if (existing?.chaptersJson) {
    return Response.json({
      success: true,
      data: {
        bookId: id,
        book,
        chapters: JSON.parse(existing.chaptersJson),
        readingTime: existing.readingTime,
        contentType: existing.contentType,
        generatedAt: existing.generatedAt,
      },
    })
  }

  // AI 生成
  try {
    const result = await generateBookSummary({
      bookTitle: book.title,
      bookAuthor: book.author,
    })

    // 更新书籍元数据
    await prisma.book.update({
      where: { id },
      data: {
        category: result.book?.category ?? book.category,
        description: result.book?.description ?? book.description,
      },
    })

    // 存储生成结果
    const summary = await prisma.bookSummary.create({
      data: {
        bookId: id,
        pagesJson: '[]',
        themeJson: '{}',
        chaptersJson: JSON.stringify(result.chapters ?? []),
        contentType: result.contentType ?? 'mixed',
        readingTime: result.totalReadingTimeMin ?? 15,
      },
    })

    return Response.json({
      success: true,
      data: {
        bookId: id,
        book: { ...book, category: result.book?.category, description: result.book?.description },
        chapters: result.chapters ?? [],
        readingTime: summary.readingTime,
        contentType: summary.contentType,
        generatedAt: summary.generatedAt,
      },
    })
  } catch {
    return Response.json(
      { success: false, error: 'AI 生成失败，请稍后重试' },
      { status: 500 }
    )
  }
}

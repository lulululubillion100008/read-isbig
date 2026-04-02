import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { aiQuestionSchema } from '@/lib/validation';
import { streamQA } from '@/lib/ai/qa';

type RouteParams = { params: Promise<{ id: string }> };

/**
 * POST /api/books/[id]/qa — 流式 AI 问答（需登录）
 */
export async function POST(req: NextRequest, { params }: RouteParams) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ success: false, error: '请先登录' }, { status: 401 });
  }

  const { id } = await params;

  const { success: allowed } = rateLimit(`qa:${userId}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: '请求过于频繁，请稍后重试' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: '无效的请求体' },
      { status: 400 }
    );
  }

  const parsed = aiQuestionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: '请输入有效的问题' },
      { status: 400 }
    );
  }

  const { question, history } = parsed.data;

  // 获取书籍信息
  const book = await prisma.book.findUnique({
    where: { id },
    select: { title: true, author: true },
  });

  if (!book) {
    return NextResponse.json(
      { success: false, error: '书籍不存在' },
      { status: 404 }
    );
  }

  // 获取书籍摘要作为上下文
  const summary = await prisma.bookSummary.findFirst({
    where: { bookId: id },
    orderBy: { generatedAt: 'desc' },
    select: { chaptersJson: true },
  });

  const bookContext = summary?.chaptersJson
    ? extractContextFromChapters(summary.chaptersJson)
    : `《${book.title}》是${book.author}的作品。`;

  // 构建对话历史
  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];
  if (history && history.length > 0) {
    for (const msg of history.slice(-6)) { // 最近6条，防止上下文过长
      messages.push({ role: msg.role, content: msg.content });
    }
  }
  messages.push({ role: 'user', content: question });

  try {
    const stream = await streamQA({
      bookTitle: book.title,
      bookAuthor: book.author,
      bookContext,
      messages,
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: '问答失败，请稍后重试' },
      { status: 500 }
    );
  }
}

/**
 * 从 chapters JSON 提取文本上下文（限制长度）
 */
function extractContextFromChapters(chaptersJson: string): string {
  try {
    const chapters = JSON.parse(chaptersJson);
    const texts: string[] = [];
    let totalLength = 0;
    const maxLength = 3000;

    for (const chapter of chapters) {
      if (totalLength >= maxLength) break;
      texts.push(`## ${chapter.title}`);
      totalLength += chapter.title.length;

      for (const block of chapter.blocks ?? []) {
        if (totalLength >= maxLength) break;
        if (block.content && typeof block.content === 'string') {
          texts.push(block.content);
          totalLength += block.content.length;
        }
      }
    }

    return texts.join('\n\n');
  } catch {
    return '';
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromRequest } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { aiQuestionSchema, bookIdSchema } from '@/lib/validation';
import { streamQA } from '@/lib/ai/qa';
import { checkQAQuota } from '@/lib/quota';
import { logAIUsage } from '@/lib/ai/usage';

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

  const idCheck = bookIdSchema.safeParse({ bookId: id });
  if (!idCheck.success) {
    return NextResponse.json({ success: false, error: '无效的书籍ID' }, { status: 400 });
  }

  const { success: allowed } = rateLimit(`qa:${userId}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: '请求过于频繁，请稍后重试' },
      { status: 429 }
    );
  }

  // 配额检查
  const quota = await checkQAQuota(userId);
  if (!quota.allowed) {
    return NextResponse.json(
      { success: false, error: '本月问答额度已用完，请升级计划', quota },
      { status: 403 }
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

    // Log QA usage (fire-and-forget, estimate tokens)
    logAIUsage({
      userId,
      bookId: id,
      action: 'qa',
      model: 'claude-sonnet-4-20250514',
      inputTokens: Math.ceil(bookContext.length / 4 + question.length / 4),
      outputTokens: 500, // estimated
    }).catch(() => {});

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

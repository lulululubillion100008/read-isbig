import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { bookIdSchema } from '@/lib/validation';
import { getUserIdFromRequest } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { generateBookScene, getDefaultScene } from '@/lib/ai/scene';

type RouteParams = { params: Promise<{ id: string }> };

/**
 * GET /api/books/[id]/scene — 获取书籍氛围场景
 * 优先返回缓存，无缓存则返回默认场景
 */
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const parsed = bookIdSchema.safeParse({ bookId: id });
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: '无效的书籍ID' }, { status: 400 });
  }

  try {
    const cached = await prisma.bookScene.findUnique({
      where: { bookId: id },
    });

    if (cached) {
      const sceneConfig = safeParseSceneConfig(cached.sceneConfig);
      return NextResponse.json({
        success: true,
        data: {
          sceneType: cached.sceneType,
          description: sceneConfig.description,
          config: sceneConfig.config,
        },
      });
    }

    const book = await prisma.book.findUnique({
      where: { id },
      select: { category: true },
    });

    return NextResponse.json({
      success: true,
      data: getDefaultScene(book?.category ?? undefined),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: '获取场景失败，请稍后重试' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/books/[id]/scene — AI 生成并缓存场景（需登录）
 */
export async function POST(req: NextRequest, { params }: RouteParams) {
  const userId = getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ success: false, error: '请先登录' }, { status: 401 });
  }

  const { id } = await params;
  const parsed = bookIdSchema.safeParse({ bookId: id });
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: '无效的书籍ID' }, { status: 400 });
  }

  const { success: allowed } = rateLimit(`scene:${userId}`, 5, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: '请求过于频繁，请稍后重试' },
      { status: 429 }
    );
  }

  try {
    const book = await prisma.book.findUnique({
      where: { id },
      select: { title: true, author: true, category: true, description: true },
    });

    if (!book) {
      return NextResponse.json({ success: false, error: '书籍不存在' }, { status: 404 });
    }

    // 已有缓存直接返回
    const existing = await prisma.bookScene.findUnique({ where: { bookId: id } });
    if (existing) {
      const sceneConfig = safeParseSceneConfig(existing.sceneConfig);
      return NextResponse.json({
        success: true,
        data: {
          sceneType: existing.sceneType,
          description: sceneConfig.description,
          config: sceneConfig.config,
        },
      });
    }

    // AI 生成场景
    const scene = await generateBookScene({
      bookTitle: book.title,
      bookAuthor: book.author,
      category: book.category ?? undefined,
      description: book.description ?? undefined,
    });

    await prisma.bookScene.create({
      data: {
        bookId: id,
        sceneType: scene.sceneType,
        sceneConfig: JSON.stringify({
          description: scene.description,
          config: scene.config,
        }),
      },
    });

    return NextResponse.json({ success: true, data: scene });
  } catch {
    // AI 失败时返回默认场景
    const book = await prisma.book.findUnique({
      where: { id },
      select: { category: true },
    }).catch(() => null);

    return NextResponse.json({
      success: true,
      data: getDefaultScene(book?.category ?? undefined),
    });
  }
}

/** 安全解析 sceneConfig，避免 spread 未知字段 */
function safeParseSceneConfig(raw: string): {
  description: string;
  config: Record<string, unknown>;
} {
  try {
    const parsed = JSON.parse(raw);
    return {
      description: typeof parsed.description === 'string' ? parsed.description : '',
      config: parsed.config && typeof parsed.config === 'object' ? parsed.config : {},
    };
  } catch {
    return { description: '', config: {} };
  }
}

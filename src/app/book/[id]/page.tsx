import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import BookReaderWrapper from './BookReaderWrapper';

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await props.params;
  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) {
    return { title: '未找到书籍 - Read Is Big' };
  }

  return {
    title: `${book.title} - Read Is Big`,
    description: book.description ?? `阅读《${book.title}》的深度解读`,
  };
}

export default async function BookPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) {
    notFound();
  }

  // 并行查询内容和场景
  const [summary, sceneRecord] = await Promise.all([
    prisma.bookSummary.findFirst({
      where: { bookId: id },
      orderBy: { generatedAt: 'desc' },
    }),
    prisma.bookScene.findUnique({ where: { bookId: id } }),
  ]);

  const chapters = (() => {
    try {
      const parsed = summary?.chaptersJson ? JSON.parse(summary.chaptersJson) : null;
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  })();

  // 解析场景配置（如有缓存），显式提取字段避免 spread 未知属性
  const scene = (() => {
    if (!sceneRecord) return null;
    try {
      const parsed = JSON.parse(sceneRecord.sceneConfig);
      return {
        sceneType: sceneRecord.sceneType as 'nature' | 'interior' | 'abstract',
        description: typeof parsed.description === 'string' ? parsed.description : '',
        config: parsed.config && typeof parsed.config === 'object' ? parsed.config : {},
      };
    } catch {
      return null;
    }
  })();

  return (
    <BookReaderWrapper
      book={{
        id: book.id,
        title: book.title,
        author: book.author,
        coverImage: book.coverImage ?? undefined,
        category: book.category ?? undefined,
        description: book.description ?? undefined,
        score: book.score ?? undefined,
        createdAt: book.createdAt,
      }}
      initialChapters={chapters}
      initialScene={scene}
      readingTime={summary?.readingTime ?? 15}
      contentType={summary?.contentType ?? 'mixed'}
    />
  );
}

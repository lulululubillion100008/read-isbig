import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMockSummaryByBookId } from '@/lib/mock-data';
import SummaryReader from '@/components/reader/SummaryReader';

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await props.params;
  const summary = getMockSummaryByBookId(id);

  if (!summary) {
    return { title: '未找到书籍' };
  }

  return {
    title: `${summary.book.title} - Read Is Big`,
    description: summary.book.description ?? `阅读《${summary.book.title}》的精华解读`,
  };
}

export default async function BookPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const summary = getMockSummaryByBookId(id);

  if (!summary) {
    notFound();
  }

  return <SummaryReader summary={summary} />;
}

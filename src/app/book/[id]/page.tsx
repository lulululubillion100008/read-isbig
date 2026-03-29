import { notFound } from 'next/navigation';
import { getMockSummaryByBookId } from '@/lib/mock-data';
import SummaryReader from '@/components/reader/SummaryReader';

export default async function BookPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const summary = getMockSummaryByBookId(id);

  if (!summary) {
    notFound();
  }

  return <SummaryReader summary={summary} />;
}

import type { BookSummary } from '@/lib/types';
import { summariesPart1 } from '@/lib/mock-data-part1';
import { summariesPart2 } from '@/lib/mock-data-part2';
import { summariesPart3 } from '@/lib/mock-data-part3';

export const mockSummaries: BookSummary[] = [
  ...summariesPart1,
  ...summariesPart2,
  ...summariesPart3,
];

export function getMockSummaryByBookId(bookId: string): BookSummary | undefined {
  return mockSummaries.find((s) => s.bookId === bookId);
}

export function searchMockBooks(query: string): BookSummary[] {
  if (!query.trim()) return mockSummaries;
  const q = query.toLowerCase();
  return mockSummaries.filter(
    (s) =>
      s.book.title.toLowerCase().includes(q) ||
      s.book.author.toLowerCase().includes(q) ||
      (s.book.category && s.book.category.toLowerCase().includes(q))
  );
}

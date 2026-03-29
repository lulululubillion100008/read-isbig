import type { BookSummary } from '@/lib/types';
import BookCard from './BookCard';

interface BookGridProps {
  books: BookSummary[];
}

export default function BookGrid({ books }: BookGridProps) {
  if (books.length === 0) {
    return (
      <p className="py-12 text-center text-gray-400">暂无书籍数据</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {books.map((summary) => (
        <BookCard key={summary.id} summary={summary} />
      ))}
    </div>
  );
}

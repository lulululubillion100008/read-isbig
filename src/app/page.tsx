import { mockSummaries } from '@/lib/mock-data';
import BookSearch from '@/components/home/BookSearch';
import BookGrid from '@/components/home/BookGrid';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Hero section */}
      <header className="flex flex-col items-center px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          Read Is Big
        </h1>
        <p className="mt-3 text-lg text-gray-500 md:text-xl">
          15分钟，读懂一本好书
        </p>
      </header>

      {/* Search section */}
      <section className="px-6 pb-16">
        <BookSearch />
      </section>

      {/* Featured books */}
      <section className="mx-auto w-full max-w-6xl flex-1 px-6 pb-20">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">精选书籍</h2>
        <BookGrid books={mockSummaries} />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Read Is Big. 让阅读更高效。</p>
      </footer>
    </div>
  );
}

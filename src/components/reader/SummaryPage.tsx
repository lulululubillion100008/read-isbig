import type { SummaryPage as SummaryPageType, Book, BookTheme } from '@/lib/types';
import BookSidebar from './BookSidebar';
import { TopBanner, MetadataBar, MindMapSection } from '@/components/mindmap';

interface SummaryPageProps {
  page: SummaryPageType;
  book: Book;
  totalPages: number;
  theme: BookTheme;
  fontFamily?: string;
  fontSize?: number;
}

function BackgroundPattern({ pattern, color }: { pattern?: string; color: string }) {
  if (!pattern || pattern === 'none') return null;

  const patternStyles: Record<string, React.CSSProperties> = {
    dots: {
      backgroundImage: `radial-gradient(${color}15 1px, transparent 1px)`,
      backgroundSize: '20px 20px',
    },
    lines: {
      backgroundImage: `repeating-linear-gradient(0deg, ${color}08, ${color}08 1px, transparent 1px, transparent 20px)`,
    },
    waves: {
      backgroundImage: `repeating-linear-gradient(45deg, ${color}06, ${color}06 1px, transparent 1px, transparent 15px)`,
    },
    grid: {
      backgroundImage: `linear-gradient(${color}08 1px, transparent 1px), linear-gradient(90deg, ${color}08 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
    },
  };

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={patternStyles[pattern] || {}}
      aria-hidden="true"
    />
  );
}

export default function SummaryPage({ page, book, totalPages, theme, fontFamily, fontSize }: SummaryPageProps) {
  const formattedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="flex min-h-screen w-full">
      {/* Left sidebar */}
      <BookSidebar
        book={book}
        pageNumber={page.pageNumber}
        totalPages={totalPages}
        theme={theme}
      />

      {/* Main content area */}
      <div className="relative flex flex-1 flex-col overflow-hidden bg-white">
        <BackgroundPattern pattern={theme.backgroundPattern} color={theme.primaryColor} />

        {/* Top banner */}
        <TopBanner title={page.chapterTitle} theme={theme} />

        {/* Metadata bar */}
        <MetadataBar bookTitle={book.title} date={formattedDate} theme={theme} />

        {/* Content - scrollable */}
        <div className="relative flex-1 overflow-y-auto px-6 py-4" style={{ fontFamily, fontSize: fontSize ? `${fontSize}px` : undefined }}>
          <div className="flex flex-col gap-1">
            {page.sections.map((section, index) => (
              <MindMapSection key={index} section={section} theme={theme} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

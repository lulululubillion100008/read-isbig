'use client';

import type { BookTheme } from '@/lib/types';

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  theme: BookTheme;
}

export default function PageNavigation({
  currentPage,
  totalPages,
  onPageChange,
  theme,
}: PageNavigationProps) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div
      className="flex items-center justify-between px-4 py-3 sm:px-6"
      style={{
        background: 'var(--surface-container-low)',
      }}
    >
      {/* Previous */}
      <button
        onClick={() => !isFirst && onPageChange(currentPage - 1)}
        disabled={isFirst}
        className="flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-300 active:scale-95 sm:px-6"
        style={{
          background: isFirst ? 'var(--surface-container-high)' : `${theme.primaryColor}10`,
          color: isFirst ? 'var(--text-tertiary)' : theme.primaryColor,
          opacity: isFirst ? 0.5 : 1,
          cursor: isFirst ? 'default' : 'pointer',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="hidden sm:inline">上一页</span>
      </button>

      {/* Dots + page number */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                aria-label={`第${page}页`}
                className="relative flex items-center justify-center transition-all duration-300"
                style={{
                  width: 44,
                  height: 44,
                }}
              >
                <span
                  style={{
                    width: isActive ? 24 : 8,
                    height: 8,
                    backgroundColor: isActive ? theme.primaryColor : `${theme.primaryColor}20`,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </button>
            );
          })}
        </div>
        <span
          className="text-xs font-medium tabular-nums"
          style={{ color: 'var(--text-tertiary)', letterSpacing: '0.05em', fontFamily: 'var(--font-label)' }}
        >
          {currentPage} / {totalPages}
        </span>
      </div>

      {/* Next */}
      <button
        onClick={() => !isLast && onPageChange(currentPage + 1)}
        disabled={isLast}
        className="flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-300 active:scale-95 sm:px-6"
        style={{
          background: isLast ? 'var(--surface-container-high)' : theme.primaryColor,
          color: isLast ? 'var(--text-tertiary)' : '#ffffff',
          opacity: isLast ? 0.5 : 1,
          cursor: isLast ? 'default' : 'pointer',
        }}
      >
        <span className="hidden sm:inline">下一页</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

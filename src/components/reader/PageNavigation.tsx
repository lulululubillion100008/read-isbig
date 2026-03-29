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
  return (
    <div
      className="flex flex-col items-center gap-3 py-5"
      style={{ background: 'var(--surface)' }}
    >
      {/* Dot indicators */}
      <div className="flex items-center gap-2.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`跳转到第${page}页`}
              className="relative flex items-center justify-center"
              style={{
                width: isActive ? 28 : 7,
                height: 7,
                borderRadius: 100,
                backgroundColor: isActive ? theme.primaryColor : `${theme.primaryColor}18`,
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive
                  ? `0 2px 8px ${theme.primaryColor}35, 0 0 0 3px ${theme.primaryColor}08`
                  : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Page text */}
      <p
        className="text-[11px] font-medium tracking-wider"
        style={{
          color: 'var(--text-tertiary)',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.08em',
        }}
      >
        {currentPage} / {totalPages}
      </p>
    </div>
  );
}

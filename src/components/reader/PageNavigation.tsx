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
    <div className="flex flex-col items-center gap-2 py-3">
      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`跳转到第${page}页`}
            className="h-3 w-3 rounded-full border-2 transition-all duration-200 hover:scale-125"
            style={
              page === currentPage
                ? {
                    backgroundColor: theme.primaryColor,
                    borderColor: theme.primaryColor,
                  }
                : {
                    backgroundColor: 'transparent',
                    borderColor: '#d1d5db',
                  }
            }
          />
        ))}
      </div>

      {/* Page text */}
      <p className="text-sm text-gray-500">
        第 {currentPage} 页 / 共 {totalPages} 页
      </p>
    </div>
  );
}

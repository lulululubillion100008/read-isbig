'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { BookSummary } from '@/lib/types';
import SummaryPage from './SummaryPage';
import PageNavigation from './PageNavigation';
import { useSwipe } from '@/hooks/useSwipe';

interface SummaryReaderProps {
  summary: BookSummary;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function SummaryReader({ summary }: SummaryReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);
  const totalPages = summary.pages.length;

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      setDirection(page > currentPage ? 1 : -1);
      setCurrentPage(page);
    },
    [currentPage, totalPages]
  );

  const goNext = useCallback(() => {
    if (currentPage < totalPages) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  }, [currentPage, totalPages]);

  const goPrev = useCallback(() => {
    if (currentPage > 1) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Swipe navigation
  const swipeHandlers = useSwipe({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
  });

  const page = summary.pages.find((p) => p.pageNumber === currentPage);
  if (!page) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50" {...swipeHandlers}>
      {/* Page content with animation */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <SummaryPage
              page={page}
              book={summary.book}
              totalPages={totalPages}
              theme={summary.theme}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        theme={summary.theme}
      />
    </div>
  );
}

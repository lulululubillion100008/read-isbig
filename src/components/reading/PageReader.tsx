'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Chapter } from '@/lib/types';
import ContentRenderer from './ContentRenderer';
import { useSwipe } from '@/hooks/useSwipe';

interface PageReaderProps {
  chapters: Chapter[];
  fontSize: number;
  fontFamily?: string;
  onProgressChange?: (progress: number) => void;
  onChapterChange?: (chapterIndex: number) => void;
}

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '30%' : '-30%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-30%' : '30%',
    opacity: 0,
  }),
};

export default function PageReader({
  chapters,
  fontSize,
  fontFamily,
  onProgressChange,
  onChapterChange,
}: PageReaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalChapters = chapters.length;

  useEffect(() => {
    const progress = totalChapters > 1
      ? Math.round((currentIndex / (totalChapters - 1)) * 100)
      : 100;
    onProgressChange?.(progress);
  }, [currentIndex, totalChapters, onProgressChange]);

  const goNext = useCallback(() => {
    if (currentIndex < totalChapters - 1) {
      setDirection(1);
      const next = currentIndex + 1;
      setCurrentIndex(next);
      onChapterChange?.(next);
    }
  }, [currentIndex, totalChapters, onChapterChange]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      const prev = currentIndex - 1;
      setCurrentIndex(prev);
      onChapterChange?.(prev);
    }
  }, [currentIndex, onChapterChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const swipeHandlers = useSwipe({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
  });

  const chapter = chapters[currentIndex];
  if (!chapter) return null;

  return (
    <div className="relative h-full overflow-hidden" {...swipeHandlers}>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 overflow-y-auto custom-scrollbar"
        >
          <div className="px-5 py-8 md:px-8 md:py-12">
            <div className="mb-6">
              <div className="mb-1 text-xs font-medium uppercase tracking-widest text-[var(--text-quaternary)]">
                {currentIndex + 1} / {totalChapters}
              </div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-serif md:text-2xl">
                {chapter.title}
              </h2>
            </div>

            <ContentRenderer
              blocks={chapter.blocks}
              fontSize={fontSize}
              fontFamily={fontFamily}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 翻页指示 */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5">
        {chapters.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === currentIndex) return;
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
              onChapterChange?.(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'w-6 bg-[var(--text-primary)]'
                : 'w-1.5 bg-[var(--gray-5)] hover:bg-[var(--gray-4)]'
            }`}
            aria-label={`第 ${i + 1} 章`}
          />
        ))}
      </div>
    </div>
  );
}

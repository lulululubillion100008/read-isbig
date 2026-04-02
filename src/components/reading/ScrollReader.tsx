'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import type { Chapter } from '@/lib/types';
import ContentRenderer from './ContentRenderer';

interface ScrollReaderProps {
  chapters: Chapter[];
  fontSize: number;
  fontFamily?: string;
  onProgressChange?: (progress: number) => void;
  onChapterChange?: (chapterIndex: number) => void;
}

export default function ScrollReader({
  chapters,
  fontSize,
  fontFamily,
  onProgressChange,
  onChapterChange,
}: ScrollReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeChapterRef = useRef(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const progress = scrollHeight > clientHeight
      ? Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
      : 100;
    onProgressChange?.(progress);

    // 检测当前章节（使用 ref 避免依赖 state 导致事件重新绑定）
    const scrollCenter = scrollTop + clientHeight / 3;
    for (let i = chapterRefs.current.length - 1; i >= 0; i--) {
      const el = chapterRefs.current[i];
      if (el && el.offsetTop <= scrollCenter) {
        if (i !== activeChapterRef.current) {
          activeChapterRef.current = i;
          onChapterChange?.(i);
        }
        break;
      }
    }
  }, [onProgressChange, onChapterChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto custom-scrollbar"
    >
      <div className="px-5 py-8 md:px-8 md:py-12">
        {chapters.map((chapter, i) => (
          <div
            key={chapter.id}
            ref={(el) => { chapterRefs.current[i] = el; }}
            className="mb-12"
          >
            {/* 章节标题 */}
            <div className="mb-6">
              <div className="mb-1 text-xs font-medium uppercase tracking-widest text-[var(--text-quaternary)]">
                第 {i + 1} 章
              </div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-serif md:text-2xl">
                {chapter.title}
              </h2>
              <div className="mt-2 text-xs text-[var(--text-tertiary)]">
                约 {chapter.readingTimeMin} 分钟
              </div>
            </div>

            <ContentRenderer
              blocks={chapter.blocks}
              fontSize={fontSize}
              fontFamily={fontFamily}
            />

            {/* 章节分隔 */}
            {i < chapters.length - 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <span className="h-px w-12 bg-[var(--gray-6)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gray-5)]" />
                <span className="h-px w-12 bg-[var(--gray-6)]" />
              </div>
            )}
          </div>
        ))}

        {/* 阅读完成 */}
        <div className="py-16 text-center">
          <p className="text-sm text-[var(--text-tertiary)]">
            — 阅读完毕 —
          </p>
        </div>
      </div>
    </div>
  );
}

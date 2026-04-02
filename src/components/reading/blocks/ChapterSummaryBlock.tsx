import type { ContentBlock } from '@/lib/types';

interface ChapterSummaryBlockProps {
  block: ContentBlock;
}

export default function ChapterSummaryBlock({ block }: ChapterSummaryBlockProps) {
  return (
    <div className="my-6 rounded-[var(--radius-lg)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--text-quaternary)]">
        章节概要
      </div>
      <p className="text-base leading-[1.8] text-[var(--text-primary)] font-serif">
        {block.content}
      </p>
    </div>
  );
}

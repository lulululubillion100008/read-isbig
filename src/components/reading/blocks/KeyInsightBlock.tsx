import type { ContentBlock } from '@/lib/types';

interface KeyInsightBlockProps {
  block: ContentBlock;
}

export default function KeyInsightBlock({ block }: KeyInsightBlockProps) {
  return (
    <div className="my-6 rounded-[var(--radius-md)] bg-[var(--surface-secondary)] px-5 py-4">
      <div className="mb-1.5 text-xs font-medium uppercase tracking-widest text-[var(--text-tertiary)]">
        核心洞见
      </div>
      <p className="text-base font-medium leading-[1.7] text-[var(--text-primary)] font-serif">
        {block.content}
      </p>
    </div>
  );
}

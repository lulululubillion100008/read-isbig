import type { ContentBlock } from '@/lib/types';

interface CalloutBlockProps {
  block: ContentBlock;
}

export default function CalloutBlock({ block }: CalloutBlockProps) {
  return (
    <aside className="my-6 rounded-[var(--radius-md)] border border-[var(--border-secondary)] bg-[var(--surface)] px-5 py-4">
      <p className="text-sm leading-[1.7] text-[var(--text-tertiary)] font-serif">
        {block.content}
      </p>
    </aside>
  );
}

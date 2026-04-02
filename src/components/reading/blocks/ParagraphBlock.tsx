import type { ContentBlock } from '@/lib/types';

interface ParagraphBlockProps {
  block: ContentBlock;
}

export default function ParagraphBlock({ block }: ParagraphBlockProps) {
  return (
    <p className="text-base leading-[1.8] text-[var(--text-secondary)] font-serif">
      {block.content}
    </p>
  );
}

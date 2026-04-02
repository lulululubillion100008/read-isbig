import type { ContentBlock } from '@/lib/types';

interface QuoteBlockProps {
  block: ContentBlock;
}

export default function QuoteBlock({ block }: QuoteBlockProps) {
  return (
    <blockquote className="my-6 border-l-2 border-[var(--gray-5)] pl-5">
      <p className="text-base leading-[1.8] italic text-[var(--text-secondary)] font-serif">
        {block.content}
      </p>
      {block.metadata?.attribution && (
        <footer className="mt-2 text-sm text-[var(--text-tertiary)]">
          — {block.metadata.attribution}
        </footer>
      )}
    </blockquote>
  );
}

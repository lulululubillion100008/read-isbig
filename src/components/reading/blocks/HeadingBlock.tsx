import type { ContentBlock } from '@/lib/types';

interface HeadingBlockProps {
  block: ContentBlock;
}

export default function HeadingBlock({ block }: HeadingBlockProps) {
  const level = block.level ?? 2;

  const styles: Record<number, string> = {
    1: 'text-2xl md:text-3xl font-bold mt-10 mb-4',
    2: 'text-xl md:text-2xl font-bold mt-8 mb-3',
    3: 'text-lg md:text-xl font-semibold mt-6 mb-2',
    4: 'text-base md:text-lg font-semibold mt-5 mb-2',
  };

  const className = `font-serif tracking-tight text-[var(--text-primary)] ${styles[level] ?? styles[2]}`;

  switch (level) {
    case 1:
      return <h1 className={className}>{block.content}</h1>;
    case 3:
      return <h3 className={className}>{block.content}</h3>;
    case 4:
      return <h4 className={className}>{block.content}</h4>;
    default:
      return <h2 className={className}>{block.content}</h2>;
  }
}

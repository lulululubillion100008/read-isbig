'use client';

import type { ContentBlock } from '@/lib/types';
import {
  HeadingBlock,
  ParagraphBlock,
  QuoteBlock,
  KeyInsightBlock,
  ExpandableBlock,
  ListBlock,
  CalloutBlock,
  DividerBlock,
  ChapterSummaryBlock,
} from './blocks';

interface ContentRendererProps {
  blocks: ContentBlock[];
  fontSize?: number;
  fontFamily?: string;
}

/** Blocks that benefit from a slightly more dramatic entrance */
const accentBlocks = new Set(['quote', 'key-insight', 'callout', 'chapter-summary']);

export default function ContentRenderer({
  blocks,
  fontSize = 16,
  fontFamily,
}: ContentRendererProps) {
  const renderBlock = (block: ContentBlock, index: number): React.ReactNode => {
    const key = `${block.type}-${index}`;

    switch (block.type) {
      case 'heading':
        return <HeadingBlock key={key} block={block} />;
      case 'paragraph':
        return <ParagraphBlock key={key} block={block} />;
      case 'quote':
        return <QuoteBlock key={key} block={block} />;
      case 'key-insight':
        return <KeyInsightBlock key={key} block={block} />;
      case 'chapter-summary':
        return <ChapterSummaryBlock key={key} block={block} />;
      case 'expandable':
        return <ExpandableBlock key={key} block={block} renderBlock={renderBlock} />;
      case 'numbered-list':
      case 'bullet-list':
        return <ListBlock key={key} block={block} />;
      case 'callout':
        return <CalloutBlock key={key} block={block} />;
      case 'divider':
        return <DividerBlock key={key} />;
      default:
        return <ParagraphBlock key={key} block={block} />;
    }
  };

  return (
    <div
      className="reading-body mx-auto space-y-4"
      style={{
        fontSize: `${fontSize}px`,
        ...(fontFamily ? { fontFamily } : {}),
      }}
    >
      {blocks.map((block, i) => (
        <div
          key={`${block.type}-${i}`}
          className="vibe-scroll-reveal"
          style={{
            '--reveal-delay': `${Math.min(i * 30, 200)}ms`,
          } as React.CSSProperties}
        >
          {renderBlock(block, i)}
        </div>
      ))}
    </div>
  );
}

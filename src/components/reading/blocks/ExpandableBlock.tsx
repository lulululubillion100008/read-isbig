'use client';

import { useState } from 'react';
import type { ContentBlock } from '@/lib/types';

interface ExpandableBlockProps {
  block: ContentBlock;
  renderBlock: (block: ContentBlock, index: number) => React.ReactNode;
}

export default function ExpandableBlock({ block, renderBlock }: ExpandableBlockProps) {
  const [expanded, setExpanded] = useState(block.expanded ?? false);

  return (
    <div className="my-4">
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="group flex w-full items-center gap-2 text-left"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`shrink-0 text-[var(--text-tertiary)] transition-transform duration-200 ${
            expanded ? 'rotate-90' : ''
          }`}
        >
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
          {block.content}
        </span>
      </button>

      {expanded && block.children && (
        <div className="ml-6 mt-3 space-y-3 animate-slide-up">
          {block.children.map((child, i) => renderBlock(child, i))}
        </div>
      )}
    </div>
  );
}

import type { ContentBlock } from '@/lib/types';

interface ListBlockProps {
  block: ContentBlock;
}

export default function ListBlock({ block }: ListBlockProps) {
  const items = block.children ?? [];
  const isNumbered = block.type === 'numbered-list';

  if (items.length === 0 && block.content) {
    const lines = block.content.split('\n').filter(Boolean);
    return (
      <ListWrapper isNumbered={isNumbered}>
        {lines.map((line, i) => (
          <li key={i} className="text-base leading-[1.7] text-[var(--text-secondary)] font-serif">
            {line}
          </li>
        ))}
      </ListWrapper>
    );
  }

  return (
    <ListWrapper isNumbered={isNumbered}>
      {items.map((item, i) => (
        <li key={i} className="text-base leading-[1.7] text-[var(--text-secondary)] font-serif">
          {item.content}
        </li>
      ))}
    </ListWrapper>
  );
}

function ListWrapper({
  isNumbered,
  children,
}: {
  isNumbered: boolean;
  children: React.ReactNode;
}) {
  const className = 'my-4 space-y-2 pl-5';

  if (isNumbered) {
    return <ol className={`${className} list-decimal`}>{children}</ol>;
  }
  return <ul className={`${className} list-disc`}>{children}</ul>;
}

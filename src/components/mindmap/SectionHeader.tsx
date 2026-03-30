import type { BookTheme } from '@/lib/types';

interface SectionHeaderProps {
  title: string;
  depth?: number;
  theme: BookTheme;
}

export default function SectionHeader({ title, depth = 0, theme }: SectionHeaderProps) {
  const sizeClass =
    depth === 0
      ? 'text-xl md:text-2xl'
      : depth === 1
        ? 'text-lg md:text-xl'
        : 'text-base md:text-lg';

  const Tag = depth === 0 ? 'h2' : depth === 1 ? 'h3' : 'h4';

  return (
    <div className={depth === 0 ? 'py-2' : 'py-1'}>
      <Tag
        className={`font-bold ${sizeClass}`}
        style={{
          color: 'var(--text-primary)',
          letterSpacing: depth === 0 ? '0.02em' : '0.01em',
          lineHeight: 1.4,
          fontFamily: 'var(--font-serif)',
        }}
      >
        {title}
      </Tag>
      {depth === 0 && (
        <div
          className="mt-2.5 h-[2.5px] w-10"
          style={{
            background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.primaryColor}40)`,
          }}
        />
      )}
    </div>
  );
}

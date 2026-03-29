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
    <div className="py-1">
      <Tag className={`font-bold text-gray-900 ${sizeClass}`}>
        {title}
      </Tag>
      {depth === 0 && (
        <div
          className="mt-1.5 h-0.5 w-12 rounded-full"
          style={{ backgroundColor: theme.primaryColor }}
        />
      )}
    </div>
  );
}

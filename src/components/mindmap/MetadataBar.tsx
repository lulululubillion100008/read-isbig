import type { BookTheme } from '@/lib/types';

interface MetadataBarProps {
  bookTitle: string;
  date: string;
  theme: BookTheme;
}

export default function MetadataBar({ bookTitle, date, theme }: MetadataBarProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-x-6 gap-y-1 px-6 py-3.5 text-[13px] sm:px-10"
      style={{ borderBottom: '1px solid var(--border-subtle)' }}
    >
      <span>
        <span style={{ color: 'var(--text-tertiary)' }}>内容来源: </span>
        <span className="font-medium" style={{ color: theme.primaryColor }}>
          {bookTitle}
        </span>
      </span>
      <span style={{ color: 'var(--text-tertiary)' }}>
        精华提炼: <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Read Is Big</span>
      </span>
      <span style={{ color: 'var(--text-tertiary)' }}>
        时间: <span style={{ color: 'var(--text-secondary)' }}>{date}</span>
      </span>
    </div>
  );
}

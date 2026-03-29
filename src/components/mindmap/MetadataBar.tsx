import type { BookTheme } from '@/lib/types';

interface MetadataBarProps {
  bookTitle: string;
  date: string;
  theme: BookTheme;
}

export default function MetadataBar({ bookTitle, date, theme }: MetadataBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 px-6 py-3 text-sm">
      <span>
        <span className="text-gray-500">内容来源: </span>
        <span className="font-medium" style={{ color: theme.primaryColor }}>
          {bookTitle}
        </span>
      </span>
      <span className="text-gray-400">
        精华提炼: <span className="font-medium text-gray-500">Read Is Big</span>
      </span>
      <span className="text-gray-400">
        时间: <span className="text-gray-500">{date}</span>
      </span>
    </div>
  );
}

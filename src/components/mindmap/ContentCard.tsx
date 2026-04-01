import type { BookTheme } from '@/lib/types';
import type { ReactNode } from 'react';

interface ContentCardProps {
  children: ReactNode;
  theme: BookTheme;
  accent?: boolean;
}

export default function ContentCard({ children, theme, accent = false }: ContentCardProps) {
  return (
    <div
      className="relative p-5 md:p-6"
      style={{
        background: 'var(--surface-container-lowest)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {accent && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{ background: `${theme.primaryColor}80` }}
        />
      )}
      {children}
    </div>
  );
}

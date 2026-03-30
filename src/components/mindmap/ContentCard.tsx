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
      className="p-5 md:p-6"
      style={{
        background: 'var(--surface-container-lowest)',
        ...(accent
          ? { borderLeft: `3px solid ${theme.primaryColor}80` }
          : {}),
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

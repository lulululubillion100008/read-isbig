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
        borderRadius: 'var(--radius-xl)',
        background: 'var(--surface, #fff)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-card)',
        ...(accent
          ? { borderLeftWidth: '3px', borderLeftColor: `${theme.primaryColor}80` }
          : {}),
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

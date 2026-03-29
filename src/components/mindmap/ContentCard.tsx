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
      className="rounded-lg border border-gray-200 bg-white p-4 md:p-6"
      style={
        accent
          ? { borderLeftWidth: '4px', borderLeftColor: theme.primaryColor }
          : undefined
      }
    >
      {children}
    </div>
  );
}

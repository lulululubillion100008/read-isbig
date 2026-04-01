import type { BookTheme } from '@/lib/types';
import type { ReactNode } from 'react';

interface ConnectingLineProps {
  children: ReactNode;
  theme: BookTheme;
  hasConnector?: boolean;
}

export default function ConnectingLine({ children, theme, hasConnector = true }: ConnectingLineProps) {
  if (!hasConnector) {
    return <div className="pl-6">{children}</div>;
  }

  return (
    <div
      className="connector-tree relative ml-4 pl-6"
      style={{
        borderLeftWidth: '1.5px',
        borderLeftStyle: 'solid',
        borderLeftColor: `${theme.connectorColor}80`,
        '--connector-color': `${theme.connectorColor}80`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

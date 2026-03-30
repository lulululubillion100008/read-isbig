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
      }}
    >
      {children}

      <style>{`
        .connector-tree > * {
          position: relative;
        }
        .connector-tree > *::before {
          content: '';
          position: absolute;
          left: -24px;
          top: 14px;
          width: 18px;
          height: 0;
          border-top: 1.5px solid ${theme.connectorColor}80;
        }
        .connector-tree > *:last-child::after {
          content: '';
          position: absolute;
          left: -25.5px;
          top: 14px;
          bottom: -1px;
          width: 2px;
          background: var(--surface-container-lowest, #fff);
        }
      `}</style>
    </div>
  );
}

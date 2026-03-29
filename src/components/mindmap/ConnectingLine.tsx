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
        borderLeftWidth: '2px',
        borderLeftStyle: 'solid',
        borderLeftColor: theme.connectorColor,
      }}
    >
      {/*
        Each direct child gets a horizontal branch via CSS.
        We use a wrapper div with a ::before-like approach:
        a small absolute horizontal line for each item.
      */}
      {children}

      {/* Inline styles for the branch pseudo-elements */}
      <style>{`
        .connector-tree > * {
          position: relative;
        }
        .connector-tree > *::before {
          content: '';
          position: absolute;
          left: -24px;
          top: 14px;
          width: 20px;
          height: 0;
          border-top: 2px solid ${theme.connectorColor};
        }
      `}</style>
    </div>
  );
}

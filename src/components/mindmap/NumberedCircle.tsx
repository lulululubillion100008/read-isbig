import type { BookTheme } from '@/lib/types';

interface NumberedCircleProps {
  number: number;
  theme: BookTheme;
}

export default function NumberedCircle({ number, theme }: NumberedCircleProps) {
  return (
    <div
      className="flex h-7 w-7 shrink-0 items-center justify-center text-xs font-bold text-white"
      style={{
        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}cc)`,
        fontFamily: 'var(--font-label)',
      }}
    >
      {number}
    </div>
  );
}

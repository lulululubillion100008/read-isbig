import type { BookTheme } from '@/lib/types';

interface NumberedCircleProps {
  number: number;
  theme: BookTheme;
}

export default function NumberedCircle({ number, theme }: NumberedCircleProps) {
  return (
    <div
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{
        background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}cc)`,
        boxShadow: `0 2px 6px ${theme.primaryColor}25`,
      }}
    >
      {number}
    </div>
  );
}

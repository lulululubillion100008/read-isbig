import type { BookTheme } from '@/lib/types';

interface ConceptBoxProps {
  label: string;
  theme: BookTheme;
  variant?: 'primary' | 'outline';
}

export default function ConceptBox({ label, theme, variant = 'outline' }: ConceptBoxProps) {
  const isPrimary = variant === 'primary';

  return (
    <div
      className="inline-block rounded-md px-4 py-2 text-sm font-bold leading-snug"
      style={{
        backgroundColor: isPrimary ? theme.primaryColor : '#ffffff',
        color: isPrimary ? '#ffffff' : theme.primaryColor,
        border: `2px solid ${theme.conceptBoxBorder}`,
      }}
    >
      {label}
    </div>
  );
}

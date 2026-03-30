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
      className="inline-block text-sm font-semibold leading-snug"
      style={{
        backgroundColor: isPrimary ? theme.primaryColor : `${theme.primaryColor}06`,
        color: isPrimary ? '#ffffff' : theme.primaryColor,
        padding: '10px 18px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        letterSpacing: '0.02em',
        fontFamily: 'var(--font-serif)',
      }}
    >
      {label}
    </div>
  );
}

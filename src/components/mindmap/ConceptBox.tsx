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
        border: `1.5px solid ${isPrimary ? 'transparent' : `${theme.primaryColor}20`}`,
        borderRadius: 'var(--radius-lg)',
        padding: '10px 18px',
        boxShadow: isPrimary
          ? `0 2px 12px ${theme.primaryColor}25, 0 1px 3px rgba(0,0,0,0.08)`
          : 'var(--shadow-sm)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </div>
  );
}

import type { BookTheme } from '@/lib/types';

interface HighlightTextProps {
  text: string;
  theme: BookTheme;
  inline?: boolean;
}

export default function HighlightText({ text, theme, inline = false }: HighlightTextProps) {
  const Tag = inline ? 'span' : 'p';

  return (
    <Tag
      className="font-semibold"
      style={{
        color: theme.highlightColor,
        lineHeight: 1.8,
        letterSpacing: '0.01em',
      }}
    >
      {text}
    </Tag>
  );
}

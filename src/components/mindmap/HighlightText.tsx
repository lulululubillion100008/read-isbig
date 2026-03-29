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
      style={{ color: theme.highlightColor }}
    >
      {text}
    </Tag>
  );
}

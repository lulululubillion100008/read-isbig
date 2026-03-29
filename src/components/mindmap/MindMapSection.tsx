import type { Section, BookTheme } from '@/lib/types';
import SectionHeader from './SectionHeader';
import ConceptBox from './ConceptBox';
import ConnectingLine from './ConnectingLine';
import NumberedItem from './NumberedItem';
import HighlightText from './HighlightText';
import ContentCard from './ContentCard';

interface MindMapSectionProps {
  section: Section;
  theme: BookTheme;
  depth?: number;
}

export default function MindMapSection({ section, theme, depth = 0 }: MindMapSectionProps) {
  switch (section.type) {
    case 'header':
      return <SectionHeader title={section.content} depth={depth} theme={theme} />;

    case 'concept-box':
      return (
        <div className="py-2.5">
          <ConceptBox
            label={section.content}
            theme={theme}
            variant={section.emphasis ? 'primary' : 'outline'}
          />
        </div>
      );

    case 'mindmap-branch':
      return (
        <div className="py-2.5">
          <p
            className="mb-2.5 font-semibold"
            style={{
              color: theme.primaryColor,
              letterSpacing: '0.01em',
            }}
          >
            {section.content}
          </p>
          {section.children && section.children.length > 0 && (
            <ConnectingLine theme={theme}>
              <div className="flex flex-col gap-2">
                {section.children.map((child, i) => (
                  <MindMapSection key={i} section={child} theme={theme} depth={depth + 1} />
                ))}
              </div>
            </ConnectingLine>
          )}
        </div>
      );

    case 'numbered-list':
      return (
        <div className="py-2.5">
          {section.items && section.items.length > 0 && (
            <div className="flex flex-col gap-1">
              {section.items.map((item) => (
                <NumberedItem key={item.number} item={item} theme={theme} />
              ))}
            </div>
          )}
        </div>
      );

    case 'highlight':
      return (
        <div className="py-2.5">
          <HighlightText text={section.content} theme={theme} />
        </div>
      );

    case 'text':
      return (
        <p
          className="py-1.5 leading-relaxed"
          style={{
            color: section.emphasis ? theme.highlightColor : 'var(--text-secondary)',
            fontWeight: section.emphasis ? 600 : 400,
            lineHeight: 1.85,
          }}
        >
          {section.content}
        </p>
      );

    case 'card-group':
      return (
        <div className="py-2.5">
          <ContentCard theme={theme} accent>
            <div className="flex flex-col gap-2">
              {section.children?.map((child, i) => (
                <MindMapSection key={i} section={child} theme={theme} depth={depth + 1} />
              ))}
            </div>
          </ContentCard>
        </div>
      );

    case 'quote':
      return (
        <blockquote
          className="my-4 border-l-[3px] py-2.5 pl-5 italic"
          style={{
            borderLeftColor: `${theme.primaryColor}60`,
            color: 'var(--text-secondary)',
            lineHeight: 1.85,
          }}
        >
          {section.content}
        </blockquote>
      );

    default:
      return (
        <p style={{ color: 'var(--text-secondary)' }}>
          {section.content}
        </p>
      );
  }
}

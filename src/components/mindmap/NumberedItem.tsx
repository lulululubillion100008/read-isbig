import type { BookTheme, NumberedItemData } from '@/lib/types';
import MindMapSection from './MindMapSection';
import NumberedCircle from './NumberedCircle';

interface NumberedItemProps {
  item: NumberedItemData;
  theme: BookTheme;
}

export default function NumberedItem({ item, theme }: NumberedItemProps) {
  return (
    <div className="flex gap-3 py-2">
      {/* Numbered circle */}
      <NumberedCircle number={item.number} theme={theme} />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="font-bold leading-snug text-gray-900">{item.title}</p>
        {item.description && (
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            {item.description}
          </p>
        )}
        {item.children && item.children.length > 0 && (
          <div className="mt-2 space-y-2">
            {item.children.map((child, idx) => (
              <MindMapSection key={idx} section={child} theme={theme} depth={1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

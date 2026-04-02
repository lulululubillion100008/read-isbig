'use client';

import Link from 'next/link';

const CATEGORIES = [
  '全部', '商业', '管理', '心理学', '哲学', '文学', '小说',
  '历史', '科技', '自我成长', '传记', '经济',
];

interface CategoryPillsProps {
  active?: string;
}

export default function CategoryPills({ active }: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat || (!active && cat === '全部');
        const href = cat === '全部' ? '/explore' : `/explore/${encodeURIComponent(cat)}`;

        return (
          <Link
            key={cat}
            href={href}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? 'bg-[var(--text-primary)] text-white'
                : 'bg-[var(--gray-6)] text-[var(--text-secondary)] hover:bg-[var(--gray-5)]'
            }`}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}

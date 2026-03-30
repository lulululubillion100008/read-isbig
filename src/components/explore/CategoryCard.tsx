import Link from 'next/link';
import type { CategoryInfo } from '@/lib/types';

interface CategoryCardProps {
  category: CategoryInfo;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/explore/${encodeURIComponent(category.name)}`} className="group block">
      <div
        className="relative overflow-hidden transition-all duration-400"
        style={{
          background: 'var(--surface-container-lowest)',
          padding: '1.5rem',
        }}
      >
        {/* Decorative gradient orb */}
        <div
          className="absolute -right-6 -top-6 h-24 w-24 opacity-15 blur-2xl"
          style={{ backgroundColor: category.color }}
        />
        <div
          className="absolute -bottom-4 -left-4 h-16 w-16 opacity-8 blur-xl"
          style={{ backgroundColor: category.color }}
        />

        {/* Accent bar - visible on hover via group */}
        <div
          className="absolute left-0 top-0 h-full w-1 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          style={{ backgroundColor: category.color }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div
            className="flex h-12 w-12 items-center justify-center text-2xl"
            style={{
              background: `linear-gradient(135deg, ${category.color}18, ${category.color}30)`,
            }}
          >
            {category.icon}
          </div>
          <h3
            className="mt-3.5 text-base font-bold"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
          >
            {category.name}
          </h3>
          <p
            className="mt-1.5 text-sm leading-relaxed line-clamp-2"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {category.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span
              className="inline-flex items-center px-2.5 py-1 text-xs font-semibold"
              style={{
                background: `${category.color}14`,
                color: category.color,
                fontFamily: 'var(--font-label)',
              }}
            >
              {category.bookCount} 本书
            </span>
            <span
              className="text-xs font-medium transition-all duration-300 group-hover:translate-x-1"
              style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
            >
              查看 &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

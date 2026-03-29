import Link from 'next/link';
import type { CategoryInfo } from '@/lib/types';

interface CategoryCardProps {
  category: CategoryInfo;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/explore/${encodeURIComponent(category.name)}`} className="group block">
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 'var(--radius-xl)',
          background: 'var(--surface)',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border-subtle)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: '1.5rem',
        }}
      >
        {/* Decorative gradient orb */}
        <div
          className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
          style={{
            backgroundColor: category.color,
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        <div
          className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full opacity-10 blur-xl"
          style={{ backgroundColor: category.color }}
        />

        {/* Accent bar */}
        <div
          className="absolute left-0 top-0 h-full w-1 opacity-0"
          style={{
            backgroundColor: category.color,
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div
            className="flex h-12 w-12 items-center justify-center text-2xl"
            style={{
              borderRadius: 'var(--radius-md)',
              background: `linear-gradient(135deg, ${category.color}18, ${category.color}30)`,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {category.icon}
          </div>
          <h3
            className="mt-3.5 text-base font-bold"
            style={{
              color: 'var(--text-primary)',
              transition: 'color 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
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
                borderRadius: 'var(--radius-sm)',
                background: `${category.color}14`,
                color: category.color,
              }}
            >
              {category.bookCount} 本书
            </span>
            <span
              className="text-xs font-medium"
              style={{
                color: 'var(--text-tertiary)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              查看 &rarr;
            </span>
          </div>
        </div>

        {/* Hover overlay */}
        <style>{`
          .group:hover > div {
            box-shadow: var(--shadow-card-hover) !important;
            transform: translateY(-2px);
          }
          .group:hover > div > div:first-child {
            opacity: 0.35 !important;
          }
        `}</style>
      </div>
    </Link>
  );
}

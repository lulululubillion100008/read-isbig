import Link from 'next/link';
import type { CategoryInfo } from '@/lib/types';

interface CategoryCardProps {
  category: CategoryInfo;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/explore/${encodeURIComponent(category.name)}`} className="group block">
      <div
        className="relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:scale-105 hover:shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${category.color}22, ${category.color}44)`,
          borderLeft: `3px solid ${category.color}`,
        }}
      >
        {/* 毛玻璃装饰圆 */}
        <div
          className="absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-20 blur-xl"
          style={{ backgroundColor: category.color }}
        />
        <div
          className="absolute -bottom-2 -left-2 h-14 w-14 rounded-full opacity-15 blur-lg"
          style={{ backgroundColor: category.color }}
        />

        {/* 内容 */}
        <div className="relative z-10">
          <span className="text-3xl">{category.icon}</span>
          <h3 className="mt-2 text-lg font-bold text-gray-900">{category.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{category.description}</p>
          <div className="mt-3 flex items-center justify-between">
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: category.color }}
            >
              {category.bookCount} 本书
            </span>
            <span className="text-xs text-gray-400 transition-colors group-hover:text-gray-600">
              查看 &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

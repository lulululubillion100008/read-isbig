import Link from 'next/link';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  category?: string;
  score?: number;
  description?: string;
}

export default function BookCard({
  id,
  title,
  author,
  category,
  score,
  description,
}: BookCardProps) {
  return (
    <Link
      href={`/book/${id}`}
      className="group flex flex-col rounded-xl bg-[var(--surface)] p-4 transition-shadow hover:shadow-md"
    >
      {/* 标签行 */}
      <div className="mb-2 flex items-center gap-2">
        {category && (
          <span className="rounded-full bg-[var(--gray-6)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-tertiary)]">
            {category}
          </span>
        )}
        {score && score > 0 && (
          <span className="text-[10px] font-medium text-[var(--text-quaternary)]">
            {score.toFixed(1)}
          </span>
        )}
      </div>

      {/* 标题 */}
      <h3 className="text-[15px] font-semibold leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent)]">
        {title}
      </h3>

      {/* 作者 */}
      <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">{author}</p>

      {/* 描述 */}
      {description && (
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--text-quaternary)]">
          {description}
        </p>
      )}
    </Link>
  );
}

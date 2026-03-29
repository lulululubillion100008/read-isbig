import type { BookRating } from '@/lib/types';
import { getRatingGradient } from '@/lib/types';

interface RatingBadgeProps {
  score: number;
  rating: BookRating;
  size?: 'sm' | 'md' | 'lg';
}

export default function RatingBadge({ score, rating, size = 'md' }: RatingBadgeProps) {
  const gradient = getRatingGradient(rating);

  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-1 gap-1',
    md: 'text-xs px-3 py-1.5 gap-1.5',
    lg: 'text-sm px-4 py-2 gap-2',
  };

  const scoreSizeClasses = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-base',
  };

  return (
    <div
      className={`inline-flex items-center bg-gradient-to-r ${gradient} ${sizeClasses[size]} font-bold text-white`}
      style={{
        borderRadius: 'var(--radius-2xl)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)',
        border: '1px solid rgba(255,255,255,0.18)',
        letterSpacing: '0.01em',
      }}
    >
      <span
        className={`${scoreSizeClasses[size]} font-extrabold tabular-nums`}
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
      >
        {score.toFixed(1)}
      </span>
      <span className="font-semibold" style={{ opacity: 0.92, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
        {rating}
      </span>
    </div>
  );
}

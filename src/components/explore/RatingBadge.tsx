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
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  };

  const scoreSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
  };

  return (
    <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${gradient} ${sizeClasses[size]} font-bold text-white shadow-sm`}>
      <span className={`${scoreSizeClasses[size]} font-extrabold`}>{score.toFixed(1)}</span>
      <span className="opacity-90">{rating}</span>
    </div>
  );
}

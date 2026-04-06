'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SPRING_PRESETS } from '@/hooks/useVibeMotion';

interface MotionBookCardProps {
  id: string;
  title: string;
  author: string;
  category?: string;
  score?: number;
  description?: string;
}

/**
 * Physics-inspired book card with magnetic tilt on hover.
 * Adapted from vibedev-motion's useGravityUI + apple preset.
 */
export default function MotionBookCard({
  id,
  title,
  author,
  category,
  score,
  description,
}: MotionBookCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateY: x * 10, rotateX: -y * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      style={{ perspective: 600 }}
      whileHover={{ scale: 1.02 }}
      transition={SPRING_PRESETS.apple}
    >
      <Link
        ref={cardRef}
        href={`/book/${id}`}
        className="group relative flex flex-col overflow-hidden rounded-xl bg-[var(--surface)] p-4"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Tilt layer */}
        <motion.div
          animate={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
          }}
          transition={SPRING_PRESETS.snappy}
          style={{ transformStyle: 'preserve-3d' }}
          className="flex flex-col"
        >
          {/* Ambient light glow — follows cursor, inspired by useEnvironmentalLight */}
          {isHovered && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${(tilt.rotateY / 10 + 0.5) * 100}% ${(-tilt.rotateX / 8 + 0.5) * 100}%, rgba(0,113,227,0.06) 0%, transparent 70%)`,
              }}
            />
          )}

          {/* Tags */}
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

          {/* Title */}
          <h3 className="text-[15px] font-semibold leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
            {title}
          </h3>

          {/* Author */}
          <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">{author}</p>

          {/* Description */}
          {description && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--text-quaternary)]">
              {description}
            </p>
          )}
        </motion.div>

        {/* Bottom shadow — dynamic depth on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl"
          animate={{
            boxShadow: isHovered
              ? '0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'
              : '0 1px 3px rgba(0,0,0,0.04)',
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </Link>
    </motion.div>
  );
}

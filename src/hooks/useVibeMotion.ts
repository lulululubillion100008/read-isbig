'use client';

import { useRef, useCallback, useEffect, useState } from 'react';

/**
 * Apple-style spring presets inspired by vibedev-motion's physics catalogs.
 * These map to framer-motion's spring transition config.
 */
export const SPRING_PRESETS = {
  /** Silky, premium, intentional — high damping, medium stiffness */
  apple: { type: 'spring' as const, stiffness: 200, damping: 26, mass: 1 },
  /** Snappy micro-interactions */
  snappy: { type: 'spring' as const, stiffness: 400, damping: 30, mass: 0.8 },
  /** Gentle entrance animations */
  gentle: { type: 'spring' as const, stiffness: 120, damping: 20, mass: 1 },
  /** Bouncy feedback */
  bouncy: { type: 'spring' as const, stiffness: 300, damping: 15, mass: 0.8 },
} as const;

/**
 * Magnetic tilt effect — inspired by vibedev-motion's useGravityUI.
 * Tracks cursor position over an element and returns rotateX/rotateY values
 * for a subtle 3D tilt toward the cursor.
 */
export function useMagneticTilt(intensity: number = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      setTilt({
        rotateY: deltaX * intensity,
        rotateX: -deltaY * intensity,
      });
    },
    [intensity],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { ref, tilt };
}

/**
 * In-view detection for scroll-triggered reveals.
 * Inspired by vibedev-motion's useVibeInView.
 */
export function useInView(options?: {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const { threshold = 0.15, once = true, rootMargin = '0px 0px -60px 0px' } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, isInView };
}

/**
 * Stagger delay calculator for children entrance animations.
 */
export function staggerDelay(index: number, base: number = 0.04): number {
  return index * base;
}

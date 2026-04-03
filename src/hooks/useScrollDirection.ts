'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Detects scroll direction with a threshold to avoid jitter.
 * Returns 'up' | 'down' | null (at top of page).
 */
export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (currentY <= 10) {
          // At top of page — always show nav
          setDirection(null);
        } else if (delta > threshold) {
          setDirection('down');
        } else if (delta < -threshold) {
          setDirection('up');
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return direction;
}

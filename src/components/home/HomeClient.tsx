'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import BookSearch from './BookSearch';

// 懒加载引导流程，避免影响首屏加载
const OnboardingFlow = dynamic(
  () => import('@/components/onboarding/OnboardingFlow'),
  { ssr: false }
);

export default function HomeClient() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('readisbig_onboarding');
    if (!saved) {
      setShowOnboarding(true);
    } else {
      const parsed = JSON.parse(saved);
      if (!parsed.completedAt) {
        setShowOnboarding(true);
      }
    }
  }, []);

  return (
    <>
      {/* 搜索框 */}
      <section className="px-6 pb-16">
        <BookSearch />
      </section>

      {/* 个性化引导 */}
      {mounted && showOnboarding && (
        <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
      )}
    </>
  );
}

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import BookSearch from './BookSearch';

// 懒加载引导流程，避免影响首屏加载
const OnboardingFlow = dynamic(
  () => import('@/components/onboarding/OnboardingFlow'),
  { ssr: false }
);

function shouldShowOnboarding(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('readisbig_onboarding');
  if (!saved) return true;
  try {
    const parsed = JSON.parse(saved);
    return !parsed.completedAt;
  } catch {
    return true;
  }
}

export default function HomeClient() {
  const [showOnboarding, setShowOnboarding] = useState(shouldShowOnboarding);
  const [mounted] = useState(() => typeof window !== 'undefined');

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

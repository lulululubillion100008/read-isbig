'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import BookSearch from './BookSearch';

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
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (shouldShowOnboarding()) {
      setShowOnboarding(true);
    }
  }, []);

  return (
    <>
      <BookSearch />
      {mounted && showOnboarding && createPortal(
        <OnboardingFlow onComplete={() => setShowOnboarding(false)} />,
        document.body
      )}
    </>
  );
}

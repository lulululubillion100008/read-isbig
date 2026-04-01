'use client';

import { useState, useCallback } from 'react';

export interface OnboardingAnswers {
  interests: string[];      // 选择的兴趣分类
  readingGoal?: string;     // 阅读目标
  preferredStyle?: string;  // 偏好风格
  completedAt?: Date;
}

const STORAGE_KEY = 'readisbig_onboarding';

function loadFromStorage(): { answers: OnboardingAnswers; isComplete: boolean } {
  if (typeof window === 'undefined') return { answers: { interests: [] }, isComplete: true };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as OnboardingAnswers;
      return { answers: parsed, isComplete: !!parsed.completedAt };
    }
  } catch { /* corrupted data */ }
  return { answers: { interests: [] }, isComplete: false };
}

export function useOnboarding() {
  const [isComplete, setIsComplete] = useState(() => loadFromStorage().isComplete);
  const [answers, setAnswers] = useState<OnboardingAnswers>(() => loadFromStorage().answers);
  const [step, setStep] = useState(0);

  const saveAnswers = useCallback((updates: Partial<OnboardingAnswers>) => {
    setAnswers((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleInterest = useCallback((interest: string) => {
    setAnswers((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      const next = { ...prev, interests };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const nextStep = useCallback(() => {
    setStep((s) => Math.min(s + 1, 2));
  }, []);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const complete = useCallback(() => {
    const final = { ...answers, completedAt: new Date() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(final));
    setAnswers(final);
    setIsComplete(true);
  }, [answers]);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAnswers({ interests: [] });
    setIsComplete(false);
    setStep(0);
  }, []);

  return {
    isComplete,
    answers,
    step,
    setStep,
    saveAnswers,
    toggleInterest,
    nextStep,
    prevStep,
    complete,
    reset,
  };
}

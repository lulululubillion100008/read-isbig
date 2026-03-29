'use client';

import { useState, useCallback, useEffect } from 'react';

export interface OnboardingAnswers {
  interests: string[];      // 选择的兴趣分类
  readingGoal?: string;     // 阅读目标
  preferredStyle?: string;  // 偏好风格
  completedAt?: Date;
}

const STORAGE_KEY = 'readisbig_onboarding';

export function useOnboarding() {
  const [isComplete, setIsComplete] = useState(true); // 默认true防止闪烁
  const [answers, setAnswers] = useState<OnboardingAnswers>({ interests: [] });
  const [step, setStep] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as OnboardingAnswers;
      setAnswers(parsed);
      setIsComplete(!!parsed.completedAt);
    } else {
      setIsComplete(false);
    }
  }, []);

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
    setStep((s) => s + 1);
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

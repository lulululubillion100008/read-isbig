'use client';

import { useState, useCallback } from 'react';

interface RatingPromptProps {
  bookId: string;
  onDismiss: () => void;
}

export default function RatingPrompt({ bookId, onDismiss }: RatingPromptProps) {
  const [score, setScore] = useState(0);
  const [hovering, setHovering] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (score === 0 || submitting) return;
    setSubmitting(true);

    try {
      await fetch(`/api/books/${bookId}/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ score }),
      });
      setSubmitted(true);
      setTimeout(onDismiss, 1500);
    } catch {
      setSubmitting(false);
    }
  }, [bookId, score, submitting, onDismiss]);

  if (submitted) {
    return (
      <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-[var(--surface)] px-6 py-4 shadow-lg">
        <p className="text-sm text-[var(--text-secondary)]">感谢你的评价！</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-[var(--surface)] px-6 py-4 shadow-lg">
      <p className="mb-3 text-center text-sm font-medium text-[var(--text-primary)]">
        这份精华对你有帮助吗？
      </p>
      <div className="mb-3 flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onMouseEnter={() => setHovering(n)}
            onMouseLeave={() => setHovering(0)}
            onClick={() => setScore(n)}
            className="text-2xl transition-transform hover:scale-110"
            aria-label={`${n} 星`}
          >
            {n <= (hovering || score) ? '★' : '☆'}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        <button
          onClick={onDismiss}
          className="rounded-full px-4 py-1.5 text-xs text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
        >
          跳过
        </button>
        <button
          onClick={handleSubmit}
          disabled={score === 0 || submitting}
          className="rounded-full bg-[var(--text-primary)] px-4 py-1.5 text-xs text-white disabled:opacity-40"
        >
          {submitting ? '提交中...' : '提交评价'}
        </button>
      </div>
    </div>
  );
}

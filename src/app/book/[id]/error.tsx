'use client';

export default function BookError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('Book error:', error.message, error.digest);
  return (
    <div className="flex min-h-screen items-center justify-center px-6 bg-[var(--background)]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">
          书籍加载失败
        </h2>
        <p className="mt-2 text-[var(--text-secondary)]">
          抱歉，无法加载该书籍内容，请稍后重试。
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-[var(--radius-md)] bg-[var(--text-primary)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          重试
        </button>
      </div>
    </div>
  );
}

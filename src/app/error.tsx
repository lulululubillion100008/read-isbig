'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: 'var(--background)' }}
    >
      <div className="text-center">
        <h2
          className="text-2xl font-bold"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
        >
          出了点问题
        </h2>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          抱歉，页面加载时发生了错误，请稍后重试。
        </p>
        <button
          onClick={reset}
          className="mt-6 px-6 py-2.5 text-sm font-medium text-white transition-colors"
          style={{ background: 'linear-gradient(135deg, #ad3332, #9c2627)' }}
        >
          重试
        </button>
      </div>
    </div>
  );
}

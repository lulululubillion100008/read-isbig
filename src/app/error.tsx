'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">出了点问题</h2>
        <p className="mt-2 text-gray-500">抱歉，页面加载时发生了错误，请稍后重试。</p>
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          重试
        </button>
      </div>
    </div>
  );
}

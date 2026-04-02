'use client';

import { useState } from 'react';
import type { Book, Chapter, BookContent, BookScene } from '@/lib/types';
import BookReader from '@/components/reading/BookReader';
import BookHeader from '@/components/reading/BookHeader';

interface BookReaderWrapperProps {
  book: Book;
  initialChapters: Chapter[] | null;
  initialScene: BookScene | null;
  readingTime: number;
  contentType: string;
}

export default function BookReaderWrapper({
  book,
  initialChapters,
  initialScene,
  readingTime,
  contentType,
}: BookReaderWrapperProps) {
  const [chapters, setChapters] = useState<Chapter[] | null>(initialChapters);
  const [scene, setScene] = useState<BookScene | null>(initialScene);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/books/${book.id}/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: book.title, author: book.author }),
      });

      const data = await res.json();
      if (data.success && data.data?.chapters) {
        setChapters(data.data.chapters);

        // 同时生成氛围场景（不阻塞阅读）
        if (!scene) {
          fetch(`/api/books/${book.id}/scene`, { method: 'POST' })
            .then((r) => r.json())
            .then((s) => { if (s.success && s.data) setScene(s.data); })
            .catch(() => { /* 场景生成失败不影响阅读 */ });
        }
      } else {
        setError(data.error ?? '生成失败，请重试');
      }
    } catch {
      setError('网络错误，请检查连接后重试');
    } finally {
      setLoading(false);
    }
  };

  // 有内容 → 进入阅读器
  if (chapters && chapters.length > 0) {
    const content: BookContent = {
      bookId: book.id,
      chapters,
      totalReadingTimeMin: readingTime,
      contentType: contentType as BookContent['contentType'],
    };

    return <BookReader book={book} content={content} scene={scene} />;
  }

  // 无内容 → 显示生成页面
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <BookHeader book={book} readingTimeMin={readingTime} />

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        {error && (
          <div className="mb-6 max-w-md rounded-[var(--radius-md)] bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <p className="mb-6 text-center text-sm text-[var(--text-tertiary)]">
          这本书尚未生成解读内容
        </p>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-[var(--radius-md)] bg-[var(--text-primary)] px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeLinecap="round" />
              </svg>
              AI 正在生成中...
            </span>
          ) : (
            'AI 生成深度解读'
          )}
        </button>

        {loading && (
          <p className="mt-4 text-center text-xs text-[var(--text-quaternary)]">
            预计需要 15-30 秒
          </p>
        )}
      </div>
    </div>
  );
}

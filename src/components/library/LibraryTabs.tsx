'use client';

import { useState } from 'react';
import BookCard from '@/components/home/BookCard';

interface BookInfo {
  id: string;
  title: string;
  author: string;
  category: string | null;
  score: number | null;
  description: string | null;
}

interface LibraryTabsProps {
  favorites: BookInfo[];
  history: BookInfo[];
}

export default function LibraryTabs({ favorites, history }: LibraryTabsProps) {
  const [tab, setTab] = useState<'favorites' | 'history'>('favorites');

  const books = tab === 'favorites' ? favorites : history;

  return (
    <>
      {/* 标签切换 */}
      <div className="mb-6 flex gap-1 rounded-lg bg-[var(--gray-6)] p-1">
        <button
          onClick={() => setTab('favorites')}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
            tab === 'favorites'
              ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-sm'
              : 'text-[var(--text-tertiary)]'
          }`}
        >
          收藏 ({favorites.length})
        </button>
        <button
          onClick={() => setTab('history')}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
            tab === 'history'
              ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-sm'
              : 'text-[var(--text-tertiary)]'
          }`}
        >
          最近阅读 ({history.length})
        </button>
      </div>

      {/* 书籍列表 */}
      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              category={book.category ?? undefined}
              score={book.score ?? undefined}
              description={book.description ?? undefined}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-16 text-center">
          <p className="text-sm text-[var(--text-tertiary)]">
            {tab === 'favorites' ? '还没有收藏的书' : '还没有阅读记录'}
          </p>
        </div>
      )}
    </>
  );
}

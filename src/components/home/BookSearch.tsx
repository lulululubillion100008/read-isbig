'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchMockBooks } from '@/lib/mock-data';

export default function BookSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<
    { bookId: string; title: string; author: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(() => {
    const results = searchMockBooks(query);
    if (results.length === 1) {
      router.push(`/book/${results[0].bookId}`);
    } else if (results.length > 0) {
      router.push(`/book/${results[0].bookId}`);
    }
  }, [query, router]);

  // Debounced suggestion search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      const results = searchMockBooks(query);
      setSuggestions(
        results.map((s) => ({
          bookId: s.bookId,
          title: s.book.title,
          author: s.book.author,
        }))
      );
      setShowSuggestions(results.length > 0);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      handleSearch();
    }
  };

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl">
      <div className="flex items-center rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-lg transition-shadow focus-within:shadow-xl">
        {/* Search icon */}
        <svg
          className="mr-3 h-6 w-6 shrink-0 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="输入书名，获取精华阅读..."
          className="flex-1 bg-transparent text-lg text-gray-800 outline-none placeholder:text-gray-400"
        />

        <button
          onClick={() => {
            setShowSuggestions(false);
            handleSearch();
          }}
          className="ml-3 rounded-xl bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          搜索
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          {suggestions.map((s) => (
            <button
              key={s.bookId}
              onClick={() => {
                setShowSuggestions(false);
                router.push(`/book/${s.bookId}`);
              }}
              className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-gray-50"
            >
              <span className="text-base font-medium text-gray-800">{s.title}</span>
              <span className="text-sm text-gray-400">{s.author}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

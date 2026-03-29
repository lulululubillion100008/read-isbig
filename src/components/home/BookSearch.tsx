'use client';

import { useState, useCallback, useEffect, useRef, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { searchMockBooks } from '@/lib/mock-data';

export default function BookSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<
    { bookId: string; title: string; author: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(() => {
    const results = searchMockBooks(query);
    if (results.length > 0) {
      router.push(`/book/${results[0].bookId}`);
    }
  }, [query, router]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      startTransition(() => {
        if (!query.trim()) {
          setSuggestions([]);
          setShowSuggestions(false);
          return;
        }
        const results = searchMockBooks(query);
        setSuggestions(
          results.map((s) => ({
            bookId: s.bookId,
            title: s.book.title,
            author: s.book.author,
          }))
        );
        setShowSuggestions(results.length > 0);
      });
    }, query.trim() ? 300 : 0);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setFocused(false);
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
    <div ref={containerRef} className="relative mx-auto w-full max-w-xl">
      <div
        className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 transition-all duration-300"
        style={{
          boxShadow: focused ? 'var(--shadow-xl), 0 0 0 2px rgba(99,102,241,0.15)' : 'var(--shadow-md)',
          border: '1px solid',
          borderColor: focused ? 'rgba(99,102,241,0.3)' : 'var(--border-subtle)',
        }}
      >
        {/* Search icon */}
        <svg
          className="h-5 w-5 shrink-0 text-[var(--text-tertiary)] transition-colors duration-300"
          style={{ color: focused ? 'var(--accent)' : undefined }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => { setFocused(true); suggestions.length > 0 && setShowSuggestions(true); }}
          placeholder="搜索书名、作者..."
          className="flex-1 bg-transparent text-base text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
        />

        <button
          onClick={() => {
            setShowSuggestions(false);
            handleSearch();
          }}
          className="shrink-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200/50 transition-all duration-300 hover:shadow-md hover:shadow-indigo-200/60 active:scale-95"
        >
          搜索
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div
          className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl bg-white"
          style={{ boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-subtle)' }}
        >
          {suggestions.map((s, i) => (
            <button
              key={s.bookId}
              onClick={() => {
                setShowSuggestions(false);
                router.push(`/book/${s.bookId}`);
              }}
              className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors duration-150 hover:bg-slate-50"
              style={{ borderBottom: i < suggestions.length - 1 ? '1px solid var(--border-subtle)' : undefined }}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-[var(--text-primary)]">{s.title}</span>
                <span className="block text-xs text-[var(--text-tertiary)]">{s.author}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

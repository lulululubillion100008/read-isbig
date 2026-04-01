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
        className="flex items-center gap-3 px-5 py-3.5 transition-all duration-300"
        style={{
          background: focused ? 'var(--surface-container-lowest)' : 'var(--surface-container-low)',
          /* Underline-only on focus - Electric Blue activation */
          borderBottom: focused ? '2px solid var(--tertiary)' : '2px solid var(--outline-variant)',
        }}
      >
        {/* Search icon */}
        <svg
          className="h-5 w-5 shrink-0 transition-colors duration-300"
          style={{ color: focused ? 'var(--tertiary)' : 'var(--text-tertiary)' }}
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
          onFocus={() => { setFocused(true); if (suggestions.length > 0) setShowSuggestions(true); }}
          placeholder="搜索书名、作者..."
          aria-label="搜索书名、作者"
          className="flex-1 bg-transparent text-base outline-none placeholder:text-[var(--text-tertiary)]"
          style={{ color: 'var(--text-primary)' }}
        />

        <button
          onClick={() => {
            setShowSuggestions(false);
            handleSearch();
          }}
          className="shrink-0 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%)',
            fontFamily: 'var(--font-label)',
          }}
        >
          搜索
        </button>
      </div>

      {/* Suggestions dropdown - tonal bg, no border */}
      {showSuggestions && (
        <div
          className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden"
          style={{
            background: 'var(--surface-container-lowest)',
            boxShadow: 'var(--shadow-ambient)',
          }}
        >
          {suggestions.map((s) => (
            <button
              key={s.bookId}
              onClick={() => {
                setShowSuggestions(false);
                router.push(`/book/${s.bookId}`);
              }}
              className="suggestion-item flex w-full items-center gap-3 px-5 py-3.5 text-left"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center"
                style={{ background: 'var(--primary)', color: 'white' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{s.title}</span>
                <span className="block text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}>{s.author}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

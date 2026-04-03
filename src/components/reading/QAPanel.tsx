'use client';

import { useState, useRef, useEffect } from 'react';
import { useAIChat } from '@/hooks/useAIChat';

interface QAPanelProps {
  bookId: string;
  bookTitle: string;
  onClose: () => void;
}

export default function QAPanel({ bookId, bookTitle, onClose }: QAPanelProps) {
  const { messages, isStreaming, error, sendMessage, stopStreaming } = useAIChat({ bookId });
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自动滚到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 打开时聚焦输入框，关闭时 abort 流
  useEffect(() => {
    inputRef.current?.focus();
    return () => stopStreaming();
  }, [stopStreaming]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[var(--background)]/95 backdrop-blur-lg">
      {/* 头部 */}
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <div className="flex-1">
          <h2 className="text-sm font-medium text-[var(--text-primary)]">AI 问答</h2>
          <p className="text-xs text-[var(--text-quaternary)]">{bookTitle}</p>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--gray-6)]"
          aria-label="关闭问答"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* 消息列表 */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="mb-2 text-sm text-[var(--text-tertiary)]">
              关于这本书，你想了解什么？
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                '这本书的核心观点是什么？',
                '作者的写作风格如何？',
                '最有价值的3个洞见？',
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={isStreaming}
                  className={`rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-colors hover:bg-[var(--gray-6)] ${isStreaming ? 'opacity-40 pointer-events-none' : ''}`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[var(--text-primary)] text-white'
                    : 'bg-[var(--gray-6)] text-[var(--text-primary)]'
                }`}
              >
                {msg.content || (
                  <span className="inline-flex items-center gap-1 text-[var(--text-quaternary)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:300ms]" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mx-auto mt-3 max-w-2xl rounded-lg bg-red-50 px-3 py-2 text-center text-xs text-red-600">
            {error}
          </div>
        )}
      </div>

      {/* 输入区 */}
      <div className="border-t border-[var(--border)] px-4 py-3">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入你的问题..."
            disabled={isStreaming}
            className="flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-quaternary)] focus:border-[var(--text-tertiary)] disabled:opacity-50"
          />
          {isStreaming ? (
            <button
              type="button"
              onClick={stopStreaming}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--gray-4)] text-white"
              aria-label="停止"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--text-primary)] text-white transition-opacity disabled:opacity-30"
              aria-label="发送"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 7-7 7 7" />
                <path d="M12 19V5" />
              </svg>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

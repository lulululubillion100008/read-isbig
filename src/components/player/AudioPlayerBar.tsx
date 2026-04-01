'use client';

import { useState } from 'react';
import type { BookTheme } from '@/lib/types';
import type { TTSState, TTSOptions } from '@/hooks/useTTS';

interface AudioPlayerBarProps {
  state: TTSState;
  options: TTSOptions;
  totalPages: number;
  bookTitle: string;
  theme: BookTheme;
  onPlay: (fromPage?: number) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onSkipToPage: (page: number) => void;
  onUpdateOptions: (options: Partial<TTSOptions>) => void;
}

export default function AudioPlayerBar({
  state,
  options,
  totalPages,
  bookTitle,
  theme,
  onPlay,
  onPause,
  onResume,
  onStop,
  onSkipToPage,
  onUpdateOptions,
}: AudioPlayerBarProps) {
  const [showSpeedPanel, setShowSpeedPanel] = useState(false);

  const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div
      className="player-bar fixed bottom-0 left-0 right-0 z-50 text-white safe-area-bottom"
      style={{
        background: 'rgba(12, 15, 14, 0.92)',
        backdropFilter: 'blur(24px) saturate(180%)',
      }}
    >
      {/* Progress bar */}
      <div
        className="h-[3px] w-full"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="relative h-full"
          style={{
            width: `${state.progress}%`,
            background: `linear-gradient(to right, ${theme.primaryColor}, ${theme.primaryColor}cc)`,
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2"
            style={{ background: theme.primaryColor }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 px-5 py-3.5 md:px-6">
        {/* Book info */}
        <div className="mr-2 min-w-0 flex-1">
          <p
            className="truncate text-sm font-semibold"
            style={{ letterSpacing: '0.01em', fontFamily: 'var(--font-serif)' }}
          >
            {bookTitle}
          </p>
          <p
            className="mt-0.5 text-xs"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-label)' }}
          >
            第 {state.currentPage} 页 / 共 {totalPages} 页
          </p>
        </div>

        {/* Previous */}
        <button
          onClick={() => onSkipToPage(state.currentPage - 1)}
          disabled={state.currentPage <= 1}
          className="flex h-9 w-9 items-center justify-center disabled:opacity-20"
          style={{ color: 'rgba(255,255,255,0.65)' }}
          aria-label="上一页"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
          </svg>
        </button>

        {/* Play/Pause - Seal Stamp style */}
        <button
          onClick={() => {
            if (!state.isPlaying) {
              onPlay();
            } else if (state.isPaused) {
              onResume();
            } else {
              onPause();
            }
          }}
          className="flex h-12 w-12 items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.primaryColor}dd)`,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          aria-label={state.isPlaying && !state.isPaused ? '暂停' : '播放'}
        >
          {state.isPlaying && !state.isPaused ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Next */}
        <button
          onClick={() => onSkipToPage(state.currentPage + 1)}
          disabled={state.currentPage >= totalPages}
          className="flex h-9 w-9 items-center justify-center disabled:opacity-20"
          style={{ color: 'rgba(255,255,255,0.65)' }}
          aria-label="下一页"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6h2v12h-2V6zm-3.5 6L4 18V6l8.5 6z" />
          </svg>
        </button>

        {/* Stop */}
        {state.isPlaying && (
          <button
            onClick={onStop}
            className="flex h-9 w-9 items-center justify-center"
            style={{
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.06)',
            }}
            aria-label="停止"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z" />
            </svg>
          </button>
        )}

        {/* Speed */}
        <div className="relative">
          <button
            onClick={() => setShowSpeedPanel(!showSpeedPanel)}
            className="flex h-9 min-w-[3rem] items-center justify-center px-2.5 text-xs font-semibold tabular-nums"
            style={{
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.06)',
              fontFamily: 'var(--font-label)',
            }}
          >
            {options.rate}x
          </button>

          {showSpeedPanel && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowSpeedPanel(false)}
              />
              <div
                className="absolute bottom-full right-0 z-50 mb-3 overflow-hidden"
                style={{
                  background: 'rgba(12, 15, 14, 0.95)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                }}
              >
                {speeds.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      onUpdateOptions({ rate: speed });
                      setShowSpeedPanel(false);
                    }}
                    className="flex w-full items-center justify-center px-7 py-3 text-sm tabular-nums"
                    style={{
                      color: options.rate === speed ? theme.primaryColor : 'rgba(255,255,255,0.7)',
                      fontWeight: options.rate === speed ? 600 : 400,
                      background: options.rate === speed ? 'rgba(255,255,255,0.05)' : 'transparent',
                      fontFamily: 'var(--font-label)',
                    }}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

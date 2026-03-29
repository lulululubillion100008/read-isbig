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
    <div className="player-bar fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/80 text-white safe-area-bottom">
      {/* 进度条 */}
      <div className="h-1 w-full bg-white/10">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${state.progress}%`,
            backgroundColor: theme.primaryColor,
          }}
        />
      </div>

      <div className="flex items-center gap-3 px-4 py-3 md:px-6">
        {/* 书籍信息 */}
        <div className="mr-2 min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{bookTitle}</p>
          <p className="text-xs text-white/50">
            第 {state.currentPage} 页 / 共 {totalPages} 页
          </p>
        </div>

        {/* 上一页 */}
        <button
          onClick={() => onSkipToPage(state.currentPage - 1)}
          disabled={state.currentPage <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white disabled:opacity-30"
          aria-label="上一页"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
          </svg>
        </button>

        {/* 播放/暂停 */}
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
          className="flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:scale-105"
          style={{ backgroundColor: theme.primaryColor }}
          aria-label={state.isPlaying && !state.isPaused ? '暂停' : '播放'}
        >
          {state.isPlaying && !state.isPaused ? (
            // 暂停图标
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            // 播放图标
            <svg className="ml-0.5 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* 下一页 */}
        <button
          onClick={() => onSkipToPage(state.currentPage + 1)}
          disabled={state.currentPage >= totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white disabled:opacity-30"
          aria-label="下一页"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zm2 0h2V6h-2v12z" transform="scale(-1,1) translate(-24,0)" />
            <path d="M16 6h2v12h-2V6zm-3.5 6L4 18V6l8.5 6z" />
          </svg>
        </button>

        {/* 停止 */}
        {state.isPlaying && (
          <button
            onClick={onStop}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
            aria-label="停止"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z" />
            </svg>
          </button>
        )}

        {/* 语速 */}
        <div className="relative">
          <button
            onClick={() => setShowSpeedPanel(!showSpeedPanel)}
            className="flex h-9 min-w-[3rem] items-center justify-center rounded-full bg-white/10 px-2 text-xs font-medium text-white/70 transition-colors hover:text-white"
          >
            {options.rate}x
          </button>

          {showSpeedPanel && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowSpeedPanel(false)}
              />
              <div className="absolute bottom-full right-0 z-50 mb-2 overflow-hidden rounded-xl bg-gray-900 shadow-xl">
                {speeds.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      onUpdateOptions({ rate: speed });
                      setShowSpeedPanel(false);
                    }}
                    className="flex w-full items-center justify-center px-6 py-2.5 text-sm transition-colors hover:bg-white/10"
                    style={{
                      color: options.rate === speed ? theme.primaryColor : 'white',
                      fontWeight: options.rate === speed ? 600 : 400,
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

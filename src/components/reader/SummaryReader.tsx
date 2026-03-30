'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { BookSummary } from '@/lib/types';
import SummaryPage from './SummaryPage';
import PageNavigation from './PageNavigation';
import ReaderSettingsPanel from './ReaderSettingsPanel';
import AudioPlayerBar from '@/components/player/AudioPlayerBar';
import { useSwipe } from '@/hooks/useSwipe';
import { useReaderSettings } from '@/hooks/useReaderSettings';
import { FONT_OPTIONS_LIST } from '@/hooks/useReaderSettings';
import { useTTS } from '@/hooks/useTTS';
import Link from 'next/link';

interface SummaryReaderProps {
  summary: BookSummary;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '40%' : '-40%',
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-40%' : '40%',
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)',
  }),
};

export default function SummaryReader({ summary }: SummaryReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSettings } = useReaderSettings();
  const totalPages = summary.pages.length;

  const tts = useTTS(summary.pages, (page) => {
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  });
  const [showPlayer, setShowPlayer] = useState(false);

  const fontCSS = FONT_OPTIONS_LIST.find(f => f.value === settings.fontFamily)?.css || FONT_OPTIONS_LIST[0].css;

  const closeSettings = useCallback(() => setShowSettings(false), []);

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      setDirection(page > currentPage ? 1 : -1);
      setCurrentPage(page);
    },
    [currentPage, totalPages]
  );

  const goNext = useCallback(() => {
    if (currentPage < totalPages) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  }, [currentPage, totalPages]);

  const goPrev = useCallback(() => {
    if (currentPage > 1) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const swipeHandlers = useSwipe({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
  });

  const page = summary.pages.find((p) => p.pageNumber === currentPage);
  if (!page) return null;

  return (
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--background)' }} {...swipeHandlers}>
      {/* Floating glass toolbar - Scholar's Studio */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-4 sm:px-6 sm:pt-5">
        <div
          className="glass mx-auto flex max-w-2xl items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3"
        >
          {/* Back - seal stamp style */}
          <Link
            href="/"
            className="group flex h-9 w-9 items-center justify-center transition-all"
            style={{ color: 'var(--text-secondary)' }}
            title="返回首页"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </Link>

          {/* Lab protocol indicator */}
          <span
            className="hidden sm:block text-[10px] font-medium uppercase tracking-[0.3em]"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
          >
            Reading Protocol
          </span>

          {/* Controls */}
          <div className="flex items-center gap-1">
            {/* TTS */}
            <button
              onClick={() => {
                if (!showPlayer) {
                  setShowPlayer(true);
                  tts.play(currentPage);
                } else {
                  tts.stop();
                  setShowPlayer(false);
                }
              }}
              className="flex h-9 w-9 items-center justify-center transition-all"
              style={{
                color: showPlayer ? 'var(--primary)' : 'var(--text-secondary)',
                background: showPlayer ? 'rgba(154, 19, 29, 0.08)' : 'transparent',
              }}
              title={showPlayer ? '关闭播客模式' : '播客模式'}
            >
              {showPlayer ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              )}
            </button>

            {/* Divider - ghost border */}
            <div
              className="mx-1 h-4 w-px"
              style={{ background: 'var(--outline-variant)', opacity: 0.4 }}
            />

            {/* Settings */}
            <button
              onClick={() => setShowSettings(true)}
              className="flex h-9 w-9 items-center justify-center transition-all"
              style={{ color: 'var(--text-secondary)' }}
              title="阅读设置"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: 'tween',
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0"
          >
            <SummaryPage
              page={page}
              book={summary.book}
              totalPages={totalPages}
              theme={summary.theme}
              fontFamily={fontCSS}
              fontSize={settings.fontSize}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        theme={summary.theme}
      />

      {/* Audio player */}
      {showPlayer && (
        <AudioPlayerBar
          state={tts.state}
          options={tts.options}
          totalPages={totalPages}
          bookTitle={summary.book.title}
          theme={summary.theme}
          onPlay={tts.play}
          onPause={tts.pause}
          onResume={tts.resume}
          onStop={() => {
            tts.stop();
            setShowPlayer(false);
          }}
          onSkipToPage={tts.skipToPage}
          onUpdateOptions={tts.updateOptions}
        />
      )}

      {/* Settings panel */}
      {showSettings && (
        <ReaderSettingsPanel
          settings={settings}
          onUpdateSettings={updateSettings}
          onClose={closeSettings}
          theme={summary.theme}
        />
      )}
    </div>
  );
}

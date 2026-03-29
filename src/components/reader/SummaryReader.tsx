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
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function SummaryReader({ summary }: SummaryReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSettings } = useReaderSettings();
  const totalPages = summary.pages.length;

  // 播客模式 TTS
  const tts = useTTS(summary.pages, (page) => {
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
  });
  const [showPlayer, setShowPlayer] = useState(false);

  // 获取当前字体的CSS值
  const fontCSS = FONT_OPTIONS_LIST.find(f => f.value === settings.fontFamily)?.css || FONT_OPTIONS_LIST[0].css;

  // 监听关闭设置面板事件
  useEffect(() => {
    const handleClose = () => setShowSettings(false);
    window.addEventListener('closeSettingsPanel', handleClose);
    return () => window.removeEventListener('closeSettingsPanel', handleClose);
  }, []);

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

  // Keyboard navigation
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

  // Swipe navigation
  const swipeHandlers = useSwipe({
    onSwipeLeft: goNext,
    onSwipeRight: goPrev,
  });

  const page = summary.pages.find((p) => p.pageNumber === currentPage);
  if (!page) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50" {...swipeHandlers}>
      {/* 顶部操作栏 */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3">
        {/* 返回首页按钮 */}
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
          title="返回首页"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </Link>

        <div className="flex items-center gap-2">
          {/* 播客模式按钮 */}
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
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            title={showPlayer ? '关闭播客模式' : '播客模式'}
          >
            {showPlayer ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h12v12H6z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            )}
          </button>

          {/* 设置按钮 */}
          <button
            onClick={() => setShowSettings(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
            title="阅读设置"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
        </div>
      </div>

      {/* Page content with animation */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
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

      {/* 播客模式播放条 */}
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

      {/* 设置面板 */}
      {showSettings && (
        <ReaderSettingsPanel
          settings={settings}
          onUpdateSettings={updateSettings}
          theme={summary.theme}
        />
      )}
    </div>
  );
}

'use client';

import { useState, useCallback, lazy, Suspense } from 'react';
import type { Book, BookContent, BookScene } from '@/lib/types';
import { useReaderSettings, BACKGROUND_THEMES } from '@/hooks/useReaderSettings';
import ReaderToolbar from './ReaderToolbar';
import ReadingProgress from './ReadingProgress';
import ReaderSettingsPanel from './ReaderSettingsPanel';
import ScrollReader from './ScrollReader';
import PageReader from './PageReader';
import QAPanel from './QAPanel';
import RatingPrompt from './RatingPrompt';

const AtmosphereCanvas = lazy(() => import('@/components/atmosphere/AtmosphereCanvas'));

interface BookReaderProps {
  book: Book;
  content: BookContent;
  scene?: BookScene | null;
}

export default function BookReader({ book, content, scene }: BookReaderProps) {
  const { settings, updateSettings, getFontCSS } = useReaderSettings();
  const [showSettings, setShowSettings] = useState(false);
  const [showQA, setShowQA] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [ratingDismissed, setRatingDismissed] = useState(false);
  const [progress, setProgress] = useState(0);

  const bgTheme = BACKGROUND_THEMES[settings.backgroundTheme];
  const fontCSS = getFontCSS();

  const handleProgressChange = useCallback((p: number) => {
    setProgress(p);
    if (p >= 0.8 && !ratingDismissed && !showRating) {
      setShowRating(true);
    }
  }, [ratingDismissed, showRating]);

  const closeSettings = useCallback(() => setShowSettings(false), []);

  return (
    <div
      className="relative flex h-screen flex-col"
      style={{
        backgroundColor: bgTheme.bg,
        color: bgTheme.text,
      }}
    >
      {/* 氛围背景层 */}
      {scene && (
        <Suspense fallback={null}>
          <AtmosphereCanvas scene={scene} />
        </Suspense>
      )}

      {/* 顶部进度条 */}
      <ReadingProgress progress={progress} />

      {/* 工具栏 */}
      <ReaderToolbar
        bookTitle={book.title}
        bookId={book.id}
        onSettingsClick={() => setShowSettings(true)}
        onQAClick={() => setShowQA(true)}
      />

      {/* 主内容区 */}
      <div
        className="relative z-10 flex-1 overflow-hidden pt-14"
        style={{ backgroundColor: bgTheme.bg }}
      >
        {/* 书籍头部 - 只在滚动模式下显示 */}
        {settings.readingMode === 'scroll' && (
          <div className="sr-only">
            {/* BookHeader 集成在 ScrollReader 上方 */}
          </div>
        )}

        {settings.readingMode === 'scroll' ? (
          <ScrollReader
            chapters={content.chapters}
            fontSize={settings.fontSize}
            fontFamily={fontCSS}
            onProgressChange={handleProgressChange}
          />
        ) : (
          <PageReader
            chapters={content.chapters}
            fontSize={settings.fontSize}
            fontFamily={fontCSS}
            onProgressChange={handleProgressChange}
          />
        )}
      </div>

      {/* 设置面板 */}
      {showSettings && (
        <ReaderSettingsPanel
          settings={settings}
          onUpdateSettings={updateSettings}
          onClose={closeSettings}
        />
      )}

      {/* AI 问答面板 */}
      {showQA && (
        <QAPanel
          bookId={book.id}
          bookTitle={book.title}
          onClose={() => setShowQA(false)}
        />
      )}

      {/* 评价提示 */}
      {showRating && !ratingDismissed && (
        <RatingPrompt
          bookId={book.id}
          onDismiss={() => {
            setShowRating(false);
            setRatingDismissed(true);
          }}
        />
      )}
    </div>
  );
}

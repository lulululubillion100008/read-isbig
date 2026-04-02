'use client';

import { useCallback } from 'react';
import type { ReaderSettings } from '@/hooks/useReaderSettings';
import { FONT_OPTIONS_LIST, BACKGROUND_THEMES } from '@/hooks/useReaderSettings';
import type { ReadingMode, BackgroundTheme } from '@/lib/types';

interface ReaderSettingsPanelProps {
  settings: ReaderSettings;
  onUpdateSettings: (updates: Partial<ReaderSettings>) => void;
  onClose: () => void;
}

const READING_MODES: { value: ReadingMode; label: string }[] = [
  { value: 'scroll', label: '滚动' },
  { value: 'page', label: '翻页' },
];

export default function ReaderSettingsPanel({
  settings,
  onUpdateSettings,
  onClose,
}: ReaderSettingsPanelProps) {
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="w-full max-w-lg rounded-t-[var(--radius-xl)] bg-[var(--surface)] px-6 py-6 shadow-[var(--shadow-lg)] animate-slide-up">
        {/* 拖拽指示条 */}
        <div className="mb-5 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-[var(--gray-5)]" />
        </div>

        {/* 字号 */}
        <section className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--text-primary)]">字号</span>
            <span className="text-sm text-[var(--text-tertiary)]">{settings.fontSize}px</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-tertiary)]">A</span>
            <input
              type="range"
              min={14}
              max={24}
              step={1}
              value={settings.fontSize}
              onChange={(e) => onUpdateSettings({ fontSize: Number(e.target.value) })}
              className="flex-1 accent-[var(--text-primary)]"
            />
            <span className="text-lg text-[var(--text-tertiary)]">A</span>
          </div>
        </section>

        {/* 字体 */}
        <section className="mb-6">
          <span className="mb-3 block text-sm font-medium text-[var(--text-primary)]">字体</span>
          <div className="grid grid-cols-2 gap-2">
            {FONT_OPTIONS_LIST.map((font) => (
              <button
                key={font.value}
                onClick={() => onUpdateSettings({ fontFamily: font.value })}
                className={`rounded-[var(--radius-sm)] px-3 py-2.5 text-sm transition-all ${
                  settings.fontFamily === font.value
                    ? 'bg-[var(--text-primary)] text-white'
                    : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)]'
                }`}
                style={{ fontFamily: font.css }}
              >
                {font.label}
              </button>
            ))}
          </div>
        </section>

        {/* 阅读模式 */}
        <section className="mb-6">
          <span className="mb-3 block text-sm font-medium text-[var(--text-primary)]">阅读模式</span>
          <div className="flex gap-2">
            {READING_MODES.map((mode) => (
              <button
                key={mode.value}
                onClick={() => onUpdateSettings({ readingMode: mode.value })}
                className={`flex-1 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium transition-all ${
                  settings.readingMode === mode.value
                    ? 'bg-[var(--text-primary)] text-white'
                    : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-tertiary)]'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </section>

        {/* 背景色 */}
        <section className="mb-2">
          <span className="mb-3 block text-sm font-medium text-[var(--text-primary)]">背景</span>
          <div className="flex gap-3">
            {(Object.entries(BACKGROUND_THEMES) as [BackgroundTheme, typeof BACKGROUND_THEMES.white][]).map(
              ([key, theme]) => (
                <button
                  key={key}
                  onClick={() => onUpdateSettings({ backgroundTheme: key })}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    settings.backgroundTheme === key
                      ? 'border-[var(--text-primary)] scale-110'
                      : 'border-[var(--border-primary)]'
                  }`}
                  style={{ backgroundColor: theme.bg }}
                  aria-label={theme.label}
                >
                  {settings.backgroundTheme === key && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

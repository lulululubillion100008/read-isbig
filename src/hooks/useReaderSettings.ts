'use client'
import { useState, useCallback, useEffect } from 'react'
import type { ReadingMode, BackgroundTheme } from '@/lib/types'

export type FontFamily = 'noto-sans' | 'noto-serif' | 'lxgw-wenkai' | 'system';

export interface ReaderSettings {
  fontFamily: FontFamily;
  fontSize: number;
  readingMode: ReadingMode;
  backgroundTheme: BackgroundTheme;
}

const FONT_OPTIONS: { value: FontFamily; label: string; css: string }[] = [
  { value: 'system', label: '系统字体', css: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Noto Sans SC", sans-serif' },
  { value: 'noto-serif', label: '思源宋体', css: '"Noto Serif SC", Georgia, serif' },
  { value: 'lxgw-wenkai', label: '霞鹜文楷', css: '"LXGW WenKai", cursive' },
  { value: 'noto-sans', label: '思源黑体', css: '"Noto Sans SC", sans-serif' },
];

export const FONT_OPTIONS_LIST = FONT_OPTIONS;

const STORAGE_KEY = 'readerSettings';

const DEFAULT_SETTINGS: ReaderSettings = {
  fontFamily: 'noto-serif',
  fontSize: 17,
  readingMode: 'scroll',
  backgroundTheme: 'white',
};

export const BACKGROUND_THEMES: Record<BackgroundTheme, { label: string; bg: string; text: string }> = {
  white: { label: '白色', bg: '#FFFFFF', text: '#1D1D1F' },
  warm: { label: '暖色', bg: '#FAF5EE', text: '#2C2417' },
  dark: { label: '深色', bg: '#1C1C1E', text: '#E5E5EA' },
};

export function useReaderSettings() {
  // 始终以默认值初始化，避免 hydration 不匹配
  const [settings, setSettings] = useState<ReaderSettings>(DEFAULT_SETTINGS);

  // 客户端挂载后从 localStorage 恢复
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
      } catch {
        // ignore corrupt data
      }
    }
  }, []);

  const updateSettings = useCallback((updates: Partial<ReaderSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...updates };
      // persist outside the updater to avoid side effects in StrictMode double-invoke
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage full or unavailable
      }
      return next;
    });
  }, []);

  const getFontCSS = useCallback(() => {
    return FONT_OPTIONS.find(f => f.value === settings.fontFamily)?.css || FONT_OPTIONS[0].css;
  }, [settings.fontFamily]);

  return { settings, updateSettings, getFontCSS };
}

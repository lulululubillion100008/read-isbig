'use client'
import { useState, useCallback } from 'react'

export type FontFamily = 'noto-sans' | 'noto-serif' | 'lxgw-wenkai' | 'source-han-sans' | 'zcool-kuaile';

export interface ReaderSettings {
  fontFamily: FontFamily;
  fontSize: number; // 14-24px
}

const FONT_OPTIONS: { value: FontFamily; label: string; css: string }[] = [
  { value: 'noto-sans', label: '思源黑体', css: '"Noto Sans SC", sans-serif' },
  { value: 'noto-serif', label: '思源宋体', css: '"Noto Serif SC", serif' },
  { value: 'lxgw-wenkai', label: '霞鹜文楷', css: '"LXGW WenKai", cursive' },
  { value: 'source-han-sans', label: '方正黑体', css: '"Source Han Sans SC", sans-serif' },
  { value: 'zcool-kuaile', label: '站酷快乐体', css: '"ZCOOL KuaiLe", cursive' },
];

export const FONT_OPTIONS_LIST = FONT_OPTIONS;

export function useReaderSettings() {
  const [settings, setSettings] = useState<ReaderSettings>(() => {
    // 尝试从localStorage读取
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('readerSettings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore malformed data
        }
      }
    }
    return { fontFamily: 'noto-sans', fontSize: 16 };
  });

  const updateSettings = useCallback((updates: Partial<ReaderSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('readerSettings', JSON.stringify(next));
      return next;
    });
  }, []);

  const getFontCSS = useCallback(() => {
    return FONT_OPTIONS.find(f => f.value === settings.fontFamily)?.css || FONT_OPTIONS[0].css;
  }, [settings.fontFamily]);

  return { settings, updateSettings, getFontCSS };
}

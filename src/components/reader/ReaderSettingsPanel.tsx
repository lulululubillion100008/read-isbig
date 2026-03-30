'use client';

import { useEffect, useRef } from 'react';
import type { ReaderSettings } from '@/hooks/useReaderSettings';
import { FONT_OPTIONS_LIST } from '@/hooks/useReaderSettings';
import type { BookTheme } from '@/lib/types';

interface ReaderSettingsPanelProps {
  settings: ReaderSettings;
  onUpdateSettings: (updates: Partial<ReaderSettings>) => void;
  onClose: () => void;
  theme: BookTheme;
}

export default function ReaderSettingsPanel({
  settings,
  onUpdateSettings,
  onClose,
  theme,
}: ReaderSettingsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(27, 28, 26, 0.25)',
          backdropFilter: 'blur(16px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.8)',
          animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Settings panel - Glassmorphism */}
      <div
        ref={panelRef}
        className="glass relative z-10 w-full max-w-md sm:m-4"
        style={{
          padding: '28px 28px 36px',
          animation: 'settingsPanelIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Handle bar (mobile) */}
        <div className="mb-6 flex justify-center sm:hidden">
          <div
            className="h-[5px] w-10"
            style={{ background: 'var(--outline-variant)', opacity: 0.5 }}
          />
        </div>

        {/* Title */}
        <h2
          className="mb-7 text-center text-[15px] font-semibold tracking-wide"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
        >
          阅读设置
        </h2>

        {/* Font selection */}
        <div className="mb-7">
          <label
            className="mb-3.5 block text-[11px] font-medium uppercase tracking-[0.12em]"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
          >
            字体
          </label>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
            {FONT_OPTIONS_LIST.map((font) => {
              const isSelected = settings.fontFamily === font.value;
              return (
                <button
                  key={font.value}
                  onClick={() => onUpdateSettings({ fontFamily: font.value })}
                  className="relative overflow-hidden px-2 py-3.5 text-sm transition-all"
                  style={{
                    fontFamily: font.css,
                    color: isSelected ? theme.primaryColor : 'var(--text-secondary)',
                    background: isSelected
                      ? `${theme.primaryColor}08`
                      : 'var(--surface-container-high)',
                    fontWeight: isSelected ? 600 : 400,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {font.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Font size */}
        <div className="mb-7">
          <label
            className="mb-3.5 block text-[11px] font-medium uppercase tracking-[0.12em]"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
          >
            字号
          </label>
          <div className="flex items-center gap-4">
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}
            >
              A
            </span>
            <div className="relative flex-1">
              <input
                type="range"
                min={14}
                max={24}
                step={1}
                value={settings.fontSize}
                onChange={(e) =>
                  onUpdateSettings({ fontSize: Number(e.target.value) })
                }
                className="h-1 w-full cursor-pointer appearance-none"
                style={{
                  background: `linear-gradient(to right, ${theme.primaryColor} 0%, ${theme.primaryColor} ${((settings.fontSize - 14) / 10) * 100}%, var(--surface-container-high) ${((settings.fontSize - 14) / 10) * 100}%, var(--surface-container-high) 100%)`,
                  accentColor: theme.primaryColor,
                }}
              />
            </div>
            <span
              className="font-semibold"
              style={{ color: 'var(--text-tertiary)', fontSize: '18px' }}
            >
              A
            </span>
            <span
              className="ml-1 min-w-[3.5ch] text-center text-xs font-medium tabular-nums"
              style={{
                color: theme.primaryColor,
                background: `${theme.primaryColor}08`,
                padding: '3px 8px',
                fontFamily: 'var(--font-label)',
              }}
            >
              {settings.fontSize}
            </span>
          </div>
        </div>

        {/* Preview */}
        <div
          className="overflow-hidden"
          style={{
            background: 'var(--surface-container-low)',
            padding: '20px 24px',
          }}
        >
          <label
            className="mb-3 block text-[10px] font-medium uppercase tracking-[0.12em]"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-label)' }}
          >
            预览效果
          </label>
          <p
            style={{
              fontFamily:
                FONT_OPTIONS_LIST.find((f) => f.value === settings.fontFamily)
                  ?.css || FONT_OPTIONS_LIST[0].css,
              fontSize: `${settings.fontSize}px`,
              lineHeight: 1.9,
              color: 'var(--text-primary)',
              letterSpacing: '0.01em',
            }}
          >
            人类之所以能统治世界，是因为我们是唯一能编造并相信虚构故事的动物。
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes settingsPanelIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (min-width: 640px) {
          @keyframes settingsPanelIn {
            from {
              transform: scale(0.9) translateY(16px);
              opacity: 0;
            }
            to {
              transform: scale(1) translateY(0);
              opacity: 1;
            }
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import type { ReaderSettings } from '@/hooks/useReaderSettings';
import { FONT_OPTIONS_LIST } from '@/hooks/useReaderSettings';
import type { BookTheme } from '@/lib/types';

interface ReaderSettingsPanelProps {
  settings: ReaderSettings;
  onUpdateSettings: (updates: Partial<ReaderSettings>) => void;
  theme: BookTheme;
}

export default function ReaderSettingsPanel({
  settings,
  onUpdateSettings,
  theme,
}: ReaderSettingsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // 面板外点击关闭 - 通过父组件控制
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // 派发自定义事件让父组件关闭面板
        window.dispatchEvent(new CustomEvent('closeSettingsPanel'));
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 设置面板 */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-md rounded-t-2xl bg-white p-6 shadow-xl sm:rounded-2xl sm:m-4"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {/* 标题 */}
        <h2 className="mb-5 text-center text-lg font-semibold text-gray-800">
          阅读设置
        </h2>

        {/* 字体选择区域 */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-600">
            字体
          </label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {FONT_OPTIONS_LIST.map((font) => {
              const isSelected = settings.fontFamily === font.value;
              return (
                <button
                  key={font.value}
                  onClick={() => onUpdateSettings({ fontFamily: font.value })}
                  className={`rounded-lg border-2 px-2 py-2.5 text-sm transition-all ${
                    isSelected
                      ? 'border-current shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{
                    fontFamily: font.css,
                    borderColor: isSelected ? theme.primaryColor : undefined,
                    color: isSelected ? theme.primaryColor : '#374151',
                    backgroundColor: isSelected ? `${theme.primaryColor}08` : undefined,
                  }}
                >
                  {font.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 字号选择区域 */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-600">
            字号
          </label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400" style={{ fontSize: '12px' }}>
              A
            </span>
            <input
              type="range"
              min={14}
              max={24}
              step={1}
              value={settings.fontSize}
              onChange={(e) =>
                onUpdateSettings({ fontSize: Number(e.target.value) })
              }
              className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200"
              style={{
                accentColor: theme.primaryColor,
              }}
            />
            <span className="text-lg font-bold text-gray-400" style={{ fontSize: '20px' }}>
              A
            </span>
            <span className="ml-1 min-w-[3ch] text-center text-sm text-gray-500">
              {settings.fontSize}px
            </span>
          </div>
        </div>

        {/* 预览区域 */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <label className="mb-2 block text-xs font-medium text-gray-400">
            预览效果
          </label>
          <p
            style={{
              fontFamily:
                FONT_OPTIONS_LIST.find((f) => f.value === settings.fontFamily)
                  ?.css || FONT_OPTIONS_LIST[0].css,
              fontSize: `${settings.fontSize}px`,
              lineHeight: 1.8,
              color: '#1f2937',
            }}
          >
            人类之所以能统治世界，是因为我们是唯一能编造并相信虚构故事的动物。
          </p>
        </div>
      </div>

      {/* 滑出动画 */}
      <style>{`
        @keyframes slideUp {
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
          @keyframes slideUp {
            from {
              transform: scale(0.95);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        }
      `}</style>
    </div>
  );
}

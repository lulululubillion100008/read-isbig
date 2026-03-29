'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { SummaryPage, Section, NumberedItemData } from '@/lib/types';

export interface TTSOptions {
  rate?: number;   // 语速 0.5-2.0, 默认 1.0
  pitch?: number;  // 音调 0-2, 默认 1.0
  voice?: string;  // 语音名称
}

export interface TTSState {
  isPlaying: boolean;
  isPaused: boolean;
  currentPage: number;
  progress: number; // 0-100 当前页朗读进度
  availableVoices: SpeechSynthesisVoice[];
}

// 从Section提取纯文本
function extractTextFromSection(section: Section): string {
  let text = section.content || '';

  if (section.items) {
    text += section.items.map((item: NumberedItemData) => {
      let itemText = `第${item.number}点，${item.title}。`;
      if (item.description) itemText += item.description;
      return itemText;
    }).join('');
  }

  if (section.children) {
    text += section.children.map(extractTextFromSection).join('');
  }

  return text;
}

// 从SummaryPage提取纯文本
function extractTextFromPage(page: SummaryPage): string {
  const parts: string[] = [];
  parts.push(page.chapterTitle + '。');

  for (const section of page.sections) {
    const sectionText = extractTextFromSection(section);
    if (sectionText.trim()) {
      parts.push(sectionText);
    }
  }

  return parts.join('\n');
}

export function useTTS(
  pages: SummaryPage[],
  onPageChange?: (page: number) => void
) {
  const [state, setState] = useState<TTSState>({
    isPlaying: false,
    isPaused: false,
    currentPage: 1,
    progress: 0,
    availableVoices: [],
  });

  const [options, setOptions] = useState<TTSOptions>({
    rate: 1.0,
    pitch: 1.0,
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const shouldContinueRef = useRef(false);
  const totalCharsRef = useRef(0);

  // 加载可用语音
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const zhVoices = voices.filter(
        (v) => v.lang.startsWith('zh') || v.lang.startsWith('cmn')
      );
      setState((prev) => ({
        ...prev,
        availableVoices: zhVoices.length > 0 ? zhVoices : voices,
      }));
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  // 朗读单页
  const speakPage = useCallback(
    (pageNumber: number) => {
      const page = pages.find((p) => p.pageNumber === pageNumber);
      if (!page) return;

      // 停止当前朗读
      speechSynthesis.cancel();

      const text = extractTextFromPage(page);
      totalCharsRef.current = text.length;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;

      // 选择中文语音
      if (options.voice) {
        const voice = state.availableVoices.find((v) => v.name === options.voice);
        if (voice) utterance.voice = voice;
      } else {
        const zhVoice = state.availableVoices.find(
          (v) => v.lang.startsWith('zh-CN') || v.lang.startsWith('zh_CN')
        );
        if (zhVoice) utterance.voice = zhVoice;
      }

      // 进度追踪
      utterance.onboundary = (event) => {
        if (totalCharsRef.current > 0) {
          const progress = Math.min(
            100,
            Math.round((event.charIndex / totalCharsRef.current) * 100)
          );
          setState((prev) => ({ ...prev, progress }));
        }
      };

      // 朗读完成，自动切换下一页
      utterance.onend = () => {
        setState((prev) => ({ ...prev, progress: 100 }));

        if (shouldContinueRef.current && pageNumber < pages.length) {
          const nextPage = pageNumber + 1;
          setState((prev) => ({
            ...prev,
            currentPage: nextPage,
            progress: 0,
          }));
          onPageChange?.(nextPage);
          // 短暂停顿后朗读下一页
          setTimeout(() => {
            if (shouldContinueRef.current) {
              speakPage(nextPage);
            }
          }, 800);
        } else {
          // 全部朗读完毕
          setState((prev) => ({
            ...prev,
            isPlaying: false,
            isPaused: false,
            progress: 0,
          }));
          shouldContinueRef.current = false;
        }
      };

      utterance.onerror = () => {
        setState((prev) => ({
          ...prev,
          isPlaying: false,
          isPaused: false,
        }));
        shouldContinueRef.current = false;
      };

      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
    },
    [pages, options, state.availableVoices, onPageChange]
  );

  // 播放
  const play = useCallback(
    (fromPage?: number) => {
      const startPage = fromPage || state.currentPage;
      shouldContinueRef.current = true;
      setState((prev) => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
        currentPage: startPage,
        progress: 0,
      }));
      onPageChange?.(startPage);
      speakPage(startPage);
    },
    [state.currentPage, speakPage, onPageChange]
  );

  // 暂停
  const pause = useCallback(() => {
    speechSynthesis.pause();
    setState((prev) => ({ ...prev, isPaused: true }));
  }, []);

  // 恢复
  const resume = useCallback(() => {
    speechSynthesis.resume();
    setState((prev) => ({ ...prev, isPaused: false }));
  }, []);

  // 停止
  const stop = useCallback(() => {
    shouldContinueRef.current = false;
    speechSynthesis.cancel();
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      progress: 0,
    }));
  }, []);

  // 跳转到指定页播放
  const skipToPage = useCallback(
    (pageNumber: number) => {
      if (pageNumber < 1 || pageNumber > pages.length) return;
      setState((prev) => ({ ...prev, currentPage: pageNumber, progress: 0 }));
      onPageChange?.(pageNumber);
      if (state.isPlaying) {
        speechSynthesis.cancel();
        speakPage(pageNumber);
      }
    },
    [pages.length, state.isPlaying, speakPage, onPageChange]
  );

  // 更新设置
  const updateOptions = useCallback((newOptions: Partial<TTSOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  }, []);

  // 清理
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return {
    state,
    options,
    play,
    pause,
    resume,
    stop,
    skipToPage,
    updateOptions,
  };
}

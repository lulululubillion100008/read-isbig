'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Chapter, ContentBlock } from '@/lib/types';

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  voice?: string;
}

export interface TTSState {
  isPlaying: boolean;
  isPaused: boolean;
  currentChapter: number;
  progress: number;
  availableVoices: SpeechSynthesisVoice[];
}

function extractTextFromBlock(block: ContentBlock): string {
  let text = block.content || '';
  if (block.children) {
    text += block.children.map(extractTextFromBlock).join('');
  }
  return text;
}

function extractTextFromChapter(chapter: Chapter): string {
  const parts: string[] = [chapter.title + '。'];
  for (const block of chapter.blocks) {
    const blockText = extractTextFromBlock(block);
    if (blockText.trim()) {
      parts.push(blockText);
    }
  }
  return parts.join('\n');
}

export function useTTS(
  chapters: Chapter[],
  onChapterChange?: (chapterIndex: number) => void
) {
  const [state, setState] = useState<TTSState>({
    isPlaying: false,
    isPaused: false,
    currentChapter: 0,
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
  const speakChapterRef = useRef<(index: number) => void>(() => {});
  const nextChapterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const speakChapter = useCallback(
    (chapterIndex: number) => {
      const chapter = chapters[chapterIndex];
      if (!chapter) return;

      speechSynthesis.cancel();

      const text = extractTextFromChapter(chapter);
      totalCharsRef.current = text.length;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;

      if (options.voice) {
        const voice = state.availableVoices.find((v) => v.name === options.voice);
        if (voice) utterance.voice = voice;
      } else {
        const zhVoice = state.availableVoices.find(
          (v) => v.lang.startsWith('zh-CN') || v.lang.startsWith('zh_CN')
        );
        if (zhVoice) utterance.voice = zhVoice;
      }

      utterance.onboundary = (event) => {
        if (totalCharsRef.current > 0) {
          const progress = Math.min(
            100,
            Math.round((event.charIndex / totalCharsRef.current) * 100)
          );
          setState((prev) => ({ ...prev, progress }));
        }
      };

      utterance.onend = () => {
        setState((prev) => ({ ...prev, progress: 100 }));

        if (shouldContinueRef.current && chapterIndex < chapters.length - 1) {
          const nextChapter = chapterIndex + 1;
          setState((prev) => ({
            ...prev,
            currentChapter: nextChapter,
            progress: 0,
          }));
          onChapterChange?.(nextChapter);
          if (nextChapterTimeoutRef.current) {
            clearTimeout(nextChapterTimeoutRef.current);
          }
          nextChapterTimeoutRef.current = setTimeout(() => {
            if (shouldContinueRef.current) {
              speakChapterRef.current(nextChapter);
            }
          }, 800);
        } else {
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
    [chapters, options, state.availableVoices, onChapterChange]
  );

  useEffect(() => {
    speakChapterRef.current = speakChapter;
  }, [speakChapter]);

  const play = useCallback(
    (fromChapter?: number) => {
      const startChapter = fromChapter ?? state.currentChapter;
      shouldContinueRef.current = true;
      setState((prev) => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
        currentChapter: startChapter,
        progress: 0,
      }));
      onChapterChange?.(startChapter);
      speakChapter(startChapter);
    },
    [state.currentChapter, speakChapter, onChapterChange]
  );

  const pause = useCallback(() => {
    speechSynthesis.pause();
    setState((prev) => ({ ...prev, isPaused: true }));
  }, []);

  const resume = useCallback(() => {
    speechSynthesis.resume();
    setState((prev) => ({ ...prev, isPaused: false }));
  }, []);

  const stop = useCallback(() => {
    shouldContinueRef.current = false;
    if (nextChapterTimeoutRef.current) {
      clearTimeout(nextChapterTimeoutRef.current);
      nextChapterTimeoutRef.current = null;
    }
    speechSynthesis.cancel();
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      progress: 0,
    }));
  }, []);

  const skipToChapter = useCallback(
    (chapterIndex: number) => {
      if (chapterIndex < 0 || chapterIndex >= chapters.length) return;
      setState((prev) => ({ ...prev, currentChapter: chapterIndex, progress: 0 }));
      onChapterChange?.(chapterIndex);
      if (state.isPlaying) {
        speechSynthesis.cancel();
        speakChapter(chapterIndex);
      }
    },
    [chapters.length, state.isPlaying, speakChapter, onChapterChange]
  );

  const updateOptions = useCallback((newOptions: Partial<TTSOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  }, []);

  useEffect(() => {
    return () => {
      if (nextChapterTimeoutRef.current) {
        clearTimeout(nextChapterTimeoutRef.current);
      }
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
    skipToChapter,
    updateOptions,
  };
}

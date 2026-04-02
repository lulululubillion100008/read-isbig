import 'server-only';

import { callClaude } from './client';
import { SUMMARY_SYSTEM_PROMPT, buildSummaryUserMessage } from './prompts';

export interface GenerateSummaryOptions {
  bookTitle: string;
  bookAuthor?: string;
  crawledData?: string;
  chapterCount?: number;
}

export async function generateBookSummary(options: GenerateSummaryOptions) {
  const { bookTitle, bookAuthor, crawledData, chapterCount = 5 } = options;

  const text = await callClaude({
    system: SUMMARY_SYSTEM_PROMPT,
    userMessage: buildSummaryUserMessage({
      title: bookTitle,
      author: bookAuthor,
      crawledData,
      chapterCount,
    }),
    maxTokens: 12000,
    timeoutMs: 60000,
  });

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse summary JSON');

  return JSON.parse(jsonMatch[0]);
}

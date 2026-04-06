import 'server-only';

import { callClaude, getUsage } from './client';
import { SUMMARY_SYSTEM_PROMPT, buildSummaryUserMessage } from './prompts';
import { logAIUsage } from './usage';
import { getSmartModel } from './usage';

export interface GenerateSummaryOptions {
  bookTitle: string;
  bookAuthor?: string;
  crawledData?: string;
  chapterCount?: number;
  userId?: string;
  bookId?: string;
}

export async function generateBookSummary(options: GenerateSummaryOptions) {
  const { bookTitle, bookAuthor, crawledData, chapterCount = 5, userId, bookId } = options;

  const model = await getSmartModel('claude-sonnet-4-20250514');

  const text = await callClaude({
    system: SUMMARY_SYSTEM_PROMPT,
    userMessage: buildSummaryUserMessage({
      title: bookTitle,
      author: bookAuthor,
      crawledData,
      chapterCount,
    }),
    model,
    maxTokens: 12000,
    timeoutMs: 60000,
  });

  // Log AI usage
  const usage = getUsage(text);
  if (usage) {
    logAIUsage({
      userId,
      bookId,
      action: 'summary',
      model: usage.model,
      inputTokens: usage.inputTokens,
      outputTokens: usage.outputTokens,
    }).catch(() => {}) // fire-and-forget
  }

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse summary JSON');

  return JSON.parse(jsonMatch[0]);
}

import 'server-only';

import { callClaudeStream } from './client';
import { buildQASystemPrompt } from './prompts';

export interface QAStreamOptions {
  bookTitle: string;
  bookAuthor: string;
  bookContext: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
}

/**
 * 流式问答 — 返回 ReadableStream<Uint8Array>
 */
export async function streamQA(options: QAStreamOptions): Promise<ReadableStream<Uint8Array>> {
  const { bookTitle, bookAuthor, bookContext, messages } = options;

  const systemPrompt = buildQASystemPrompt(bookTitle, bookAuthor, bookContext);

  return callClaudeStream({
    system: systemPrompt,
    messages,
    maxTokens: 2000,
    timeoutMs: 30000,
  });
}

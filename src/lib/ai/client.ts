import 'server-only';

/**
 * 调用 Anthropic Messages API
 */
export async function callClaude(options: {
  system: string;
  userMessage: string;
  model?: string;
  maxTokens?: number;
  timeoutMs?: number;
}): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const {
    system,
    userMessage,
    model = 'claude-sonnet-4-20250514',
    maxTokens = 8000,
    timeoutMs = 60000,
  } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2024-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: userMessage }],
        system,
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  const data = await response.json();
  // Return text + usage info for logging
  const text = data.content[0].text;
  const usage = data.usage as { input_tokens?: number; output_tokens?: number } | undefined;

  return Object.assign(text as string, {
    _usage: {
      inputTokens: usage?.input_tokens ?? 0,
      outputTokens: usage?.output_tokens ?? 0,
      model,
    },
  });
}

export interface ClaudeUsage {
  inputTokens: number;
  outputTokens: number;
  model: string;
}

/** Extract usage from callClaude result */
export function getUsage(result: string): ClaudeUsage | null {
  const r = result as string & { _usage?: ClaudeUsage };
  return r._usage ?? null;
}

/**
 * 调用 Anthropic Messages API（流式）
 */
export async function callClaudeStream(options: {
  system: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  model?: string;
  maxTokens?: number;
  timeoutMs?: number;
}): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured');
  }

  const {
    system,
    messages,
    model = 'claude-sonnet-4-20250514',
    maxTokens = 4000,
    timeoutMs = 60000,
  } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2024-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        messages,
        system,
        stream: true,
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  if (!response.body) {
    throw new Error('No response body');
  }

  // 将 Anthropic SSE 流转为纯文本流（带行缓冲，处理跨 chunk 拆分）
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';

  return new ReadableStream({
    async pull(streamController) {
      const { done, value } = await reader.read();
      if (done) {
        streamController.close();
        return;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      // 最后一个元素可能是不完整的行，保留在 buffer 中
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6);
        if (jsonStr === '[DONE]') continue;

        try {
          const event = JSON.parse(jsonStr);
          if (event.type === 'content_block_delta' && event.delta?.text) {
            streamController.enqueue(encoder.encode(event.delta.text));
          }
        } catch {
          // 跳过无法解析的行
        }
      }
    },
  });
}

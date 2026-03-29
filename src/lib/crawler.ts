// Crawl4AI 集成模块
// 用于从网上抓取书籍信息，作为AI生成摘要的输入数据

export interface BookCrawlerData {
  title: string;
  author: string;
  coverImage?: string;
  tableOfContents?: string[];
  synopsis?: string;
  keyPoints?: string[];
  reviews?: string[];
  rating?: number;
}

export interface CrawlConfig {
  apiUrl: string;  // Crawl4AI API地址
  apiKey?: string;
}

const ALLOWED_DOMAINS = ['search.douban.com', 'book.douban.com']

function validateTargetUrl(url: string): void {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw new Error('Invalid URL')
  }
  if (parsed.protocol !== 'https:') {
    throw new Error('Only HTTPS URLs are permitted')
  }
  if (!ALLOWED_DOMAINS.some(d => parsed.hostname === d || parsed.hostname.endsWith('.' + d))) {
    throw new Error(`Domain not in allowlist: ${parsed.hostname}`)
  }
}

// Crawl4AI API 调用
export async function crawlBookData(bookTitle: string, config?: CrawlConfig): Promise<BookCrawlerData | null> {
  const crawlUrl = config?.apiUrl || process.env.CRAWL4AI_API_URL

  if (!crawlUrl) {
    return null
  }

  try {
    const targetUrl = `https://search.douban.com/book/subject_search?search_text=${encodeURIComponent(bookTitle)}`
    validateTargetUrl(targetUrl)

    const doubanData = await crawlSource(crawlUrl, targetUrl, config?.apiKey)
    return parseBookData(doubanData, bookTitle)
  } catch (error) {
    console.error('[Crawler] Failed to crawl book data:', error instanceof Error ? error.message : 'unknown')
    return null
  }
}

async function crawlSource(apiUrl: string, targetUrl: string, apiKey?: string): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        urls: [targetUrl],
        word_count_threshold: 50,
        extraction_strategy: 'LLMExtractionStrategy',
      }),
      signal: controller.signal,
    })

    if (!response.ok) throw new Error(`Crawl failed: ${response.status}`)
    const data = await response.json()
    return data.results?.[0]?.markdown || ''
  } finally {
    clearTimeout(timeout)
  }
}

function parseBookData(markdown: string, bookTitle: string): BookCrawlerData {
  return {
    title: bookTitle,
    author: '',
    synopsis: markdown.slice(0, 3000),
  }
}

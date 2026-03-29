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

// Crawl4AI API 调用
export async function crawlBookData(bookTitle: string, config?: CrawlConfig): Promise<BookCrawlerData | null> {
  const crawlUrl = config?.apiUrl || process.env.CRAWL4AI_API_URL

  if (!crawlUrl) {
    // Crawl4AI API URL not configured, skipping crawl
    return null
  }

  try {
    // 抓取豆瓣读书信息
    const doubanData = await crawlSource(crawlUrl, `https://search.douban.com/book/subject_search?search_text=${encodeURIComponent(bookTitle)}`, config?.apiKey)

    // 解析并返回结构化数据
    return parseBookData(doubanData, bookTitle)
  } catch (error) {
    console.error('[Crawler] Failed to crawl book data:', error)
    return null
  }
}

async function crawlSource(apiUrl: string, targetUrl: string, apiKey?: string): Promise<string> {
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
  })

  if (!response.ok) throw new Error(`Crawl failed: ${response.status}`)
  const data = await response.json()
  return data.results?.[0]?.markdown || ''
}

function parseBookData(markdown: string, bookTitle: string): BookCrawlerData {
  return {
    title: bookTitle,
    author: '',
    synopsis: markdown.slice(0, 2000),
  }
}

/**
 * Batch generates book summaries using Claude API.
 * Processes books without existing BookSummary records.
 *
 * Usage: node scripts/generate-summaries.mjs [--limit N] [--concurrency N]
 */
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { query, executeBatch } from './db-utils.mjs'

// Load API key
let apiKey = ''
for (const f of [resolve('/tmp/.env.prod'), resolve(import.meta.dirname, '../.env.local')]) {
  try {
    const env = readFileSync(f, 'utf8')
    const m = env.match(/ANTHROPIC_API_KEY="?([^"\n]+)"?/)
    if (m) { apiKey = m[1].trim(); break }
  } catch { /* skip */ }
}
if (!apiKey) { console.error('Missing ANTHROPIC_API_KEY'); process.exit(1) }

const args = process.argv.slice(2)
const limitArg = args.indexOf('--limit')
const concArg = args.indexOf('--concurrency')
const LIMIT = limitArg >= 0 ? parseInt(args[limitArg + 1]) : 999
const CONCURRENCY = concArg >= 0 ? parseInt(args[concArg + 1]) : 3

const PROMPT = `你是一位资深的书评人和内容策划师。请为以下书籍生成一份深度解读摘要。

书名：{title}
作者：{author}
分类：{category}
简介：{description}

请生成 3-5 个章节的深度解读，严格按照以下 JSON 格式输出（不要输出任何其他内容）：

[
  {
    "id": "ch-{slug}-1",
    "title": "第一章 · {章节标题}",
    "readingTimeMin": 3-5,
    "blocks": [
      {"type": "heading", "content": "小标题", "level": 1},
      {"type": "paragraph", "content": "正文段落..."},
      {"type": "quote", "content": "书中经典引用\\n—— 出处"},
      {"type": "key-insight", "content": "核心洞见/观点提炼..."},
      {"type": "paragraph", "content": "更多分析..."},
      {"type": "callout", "content": "总结性观点或延伸思考..."}
    ]
  }
]

要求：
1. 每章 6-10 个 blocks，内容丰富有深度
2. block 类型包括：heading, paragraph, quote, key-insight, callout, numbered-list
3. 引用真实的书中原文或经典语句
4. 提供独到的分析视角，不要泛泛而谈
5. 总阅读时间控制在 10-20 分钟
6. slug 用书名拼音首字母缩写，如 "hlm" 表示红楼梦
7. 直接输出 JSON 数组，不要用 markdown 代码块包裹`

async function callClaude(prompt) {
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }],
    }),
  })
  if (!resp.ok) {
    const err = await resp.text()
    throw new Error(`API ${resp.status}: ${err}`)
  }
  const data = await resp.json()
  return data.content[0].text
}

function generateId() {
  return 'bs-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

async function generateForBook(book) {
  const prompt = PROMPT
    .replace('{title}', book.title)
    .replace('{author}', book.author)
    .replace('{category}', book.category || '')
    .replace('{description}', book.description || '')
    .replace('{slug}', book.title)

  const text = await callClaude(prompt)

  // Parse JSON, stripping any markdown fences
  let json = text.trim()
  if (json.startsWith('```')) {
    json = json.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }
  const chapters = JSON.parse(json)

  // Calculate total reading time
  const totalTime = chapters.reduce((sum, ch) => sum + (ch.readingTimeMin || 3), 0)

  // Insert BookSummary
  const summaryId = generateId()
  const chaptersJson = JSON.stringify(chapters).replace(/'/g, "''")

  await query(
    `INSERT INTO BookSummary (id, bookId, pagesJson, themeJson, chaptersJson, contentType, readingTime, generatedAt)
     VALUES ('${summaryId}', '${book.id}', '[]', '{}', '${chaptersJson}', 'deep-analysis', ${totalTime}, datetime('now'))`
  )

  return { title: book.title, chapters: chapters.length, time: totalTime }
}

// Main
console.log('=== 批量生成书籍摘要 ===')
console.log(`并发数: ${CONCURRENCY}, 限制: ${LIMIT}`)

const books = await query(
  `SELECT b.id, b.title, b.author, b.category, b.description
   FROM Book b
   WHERE b.id NOT IN (SELECT bookId FROM BookSummary)
   ORDER BY b.category, b.title
   LIMIT ${LIMIT}`
)

console.log(`待生成: ${books.rows.length} 本\n`)

let completed = 0
let failed = 0

// Process in batches
for (let i = 0; i < books.rows.length; i += CONCURRENCY) {
  const batch = books.rows.slice(i, i + CONCURRENCY)
  const results = await Promise.allSettled(
    batch.map(book => generateForBook(book))
  )

  for (let j = 0; j < results.length; j++) {
    const r = results[j]
    const book = batch[j]
    if (r.status === 'fulfilled') {
      completed++
      console.log(`✓ [${completed}/${books.rows.length}] ${r.value.title} (${r.value.chapters}章, ${r.value.time}min)`)
    } else {
      failed++
      console.error(`✗ [${completed + failed}/${books.rows.length}] ${book.title}: ${r.reason.message?.substring(0, 100)}`)
    }
  }

  // Brief pause between batches to avoid rate limits
  if (i + CONCURRENCY < books.rows.length) {
    await new Promise(r => setTimeout(r, 1000))
  }
}

console.log(`\n=== 完成 ===`)
console.log(`成功: ${completed}, 失败: ${failed}, 总计: ${books.rows.length}`)

/**
 * Database utility for direct Turso HTTP API access.
 * Usage: import { query, execute } from './db-utils.mjs'
 */
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load env from .env.prod or .env.local
let authToken = ''
let dbUrl = ''
for (const f of [resolve('/tmp/.env.prod'), resolve(import.meta.dirname, '../.env.local')]) {
  try {
    const env = readFileSync(f, 'utf8')
    const urlMatch = env.match(/TURSO_DATABASE_URL="?([^"\n]+)"?/)
    const tokenMatch = env.match(/TURSO_AUTH_TOKEN="?([^"\n]+)"?/)
    if (urlMatch) dbUrl = urlMatch[1].trim().replace('libsql://', 'https://')
    if (tokenMatch) authToken = tokenMatch[1].trim()
    if (dbUrl && authToken) break
  } catch { /* skip */ }
}

if (!dbUrl || !authToken) {
  console.error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN')
  process.exit(1)
}

export { dbUrl, authToken }

export async function query(sql, args) {
  const stmt = args ? { sql, args } : { sql }
  const resp = await fetch(`${dbUrl}/v2/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [{ type: 'execute', stmt }, { type: 'close' }],
    }),
  })
  const data = await resp.json()
  if (!data.results || data.results[0].type === 'error') {
    throw new Error(JSON.stringify(data.results?.[0]?.error || data))
  }
  const result = data.results[0].response.result
  // Convert to simple objects
  const cols = result.cols.map(c => c.name)
  const rows = result.rows.map(row =>
    Object.fromEntries(row.map((cell, i) => [cols[i], cell?.value ?? null]))
  )
  return { cols, rows, raw: result }
}

export async function execute(sql, args) {
  return query(sql, args)
}

export async function executeBatch(statements) {
  const requests = statements.map(s => ({
    type: 'execute',
    stmt: typeof s === 'string' ? { sql: s } : s,
  }))
  requests.push({ type: 'close' })
  const resp = await fetch(`${dbUrl}/v2/pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests }),
  })
  const data = await resp.json()
  return data.results
}

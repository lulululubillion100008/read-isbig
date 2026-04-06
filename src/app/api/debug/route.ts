import { createClient as createHttpClient } from '@libsql/client/http'
import { createClient } from '@libsql/client'

export const dynamic = 'force-dynamic'

export async function GET() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  const httpUrl = tursoUrl!.replace('libsql://', 'https://')
  const info: Record<string, unknown> = {
    httpUrl: httpUrl.substring(0, 40) + '...',
    AUTH_TOKEN_SET: !!authToken,
  }

  // Test 1: HTTP transport with https:// URL
  try {
    const client = createHttpClient({ url: httpUrl, authToken: authToken! })
    const result = await client.execute('SELECT COUNT(*) as cnt FROM Book')
    info.httpClientCount = result.rows[0]?.cnt
    info.httpClientStatus = 'connected'
  } catch (error) {
    info.httpClientStatus = 'error'
    info.httpClientError = error instanceof Error ? error.message : String(error)
  }

  // Test 2: Default transport
  try {
    const client = createClient({ url: httpUrl, authToken: authToken! })
    const result = await client.execute('SELECT COUNT(*) as cnt FROM Book')
    info.defaultClientCount = result.rows[0]?.cnt
  } catch (error) {
    info.defaultClientError = error instanceof Error ? error.message : String(error)
  }

  return Response.json(info)
}

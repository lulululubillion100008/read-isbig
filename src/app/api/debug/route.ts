export const dynamic = 'force-dynamic'

export async function GET() {
  const tursoUrl = process.env.TURSO_DATABASE_URL?.trim()
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim()
  const httpUrl = tursoUrl!.replace('libsql://', 'https://')
  const info: Record<string, unknown> = {
    httpUrl: httpUrl.substring(0, 50),
    AUTH_TOKEN_LEN: authToken?.length,
    nodeVersion: process.version,
  }

  // Test 1: Raw fetch to Turso HTTP API
  try {
    const resp = await fetch(`${httpUrl}/v2/pipeline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          { type: 'execute', stmt: { sql: 'SELECT COUNT(*) as cnt FROM Book' } },
          { type: 'close' },
        ],
      }),
    })
    const data = await resp.json()
    info.fetchStatus = resp.status
    info.fetchResult = JSON.stringify(data).substring(0, 300)
  } catch (error) {
    info.fetchError = error instanceof Error ? error.message : String(error)
  }

  // Test 2: Check cross-fetch patch status
  try {
    const crossFetch = await import('cross-fetch')
    const cfReq = new crossFetch.Request('https://example.com')
    const nativeReq = new Request('https://example.com')
    info.crossFetchPatched = cfReq.constructor.name === nativeReq.constructor.name
    info.crossFetchRequestName = cfReq.constructor.name
    info.nativeRequestName = nativeReq.constructor.name
  } catch (error) {
    info.crossFetchError = error instanceof Error ? error.message : String(error)
  }

  // Test 3: @libsql/client
  try {
    const { createClient } = await import('@libsql/client')
    info.importOk = true
    const client = createClient({ url: httpUrl, authToken: authToken! })
    info.clientCreated = true
    const result = await client.execute('SELECT COUNT(*) as cnt FROM Book')
    info.libsqlCount = result.rows[0]?.cnt
  } catch (error) {
    info.libsqlError = error instanceof Error ? `${error.message} | ${error.stack?.split('\n').slice(0, 4).join(' -> ')}` : String(error)
  }

  // Test 4: Prisma
  try {
    const { prisma } = await import('@/lib/db')
    const count = await prisma.book.count()
    info.prismaCount = count
  } catch (error) {
    info.prismaError = error instanceof Error ? error.message : String(error)
  }

  return Response.json(info)
}

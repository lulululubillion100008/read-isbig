export const dynamic = 'force-dynamic'

export async function GET() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
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

  // Test 2: @libsql/client
  try {
    const { createClient } = await import('@libsql/client')
    info.importOk = true
    const client = createClient({ url: httpUrl, authToken: authToken! })
    info.clientCreated = true
    const result = await client.execute('SELECT COUNT(*) as cnt FROM Book')
    info.libsqlCount = result.rows[0]?.cnt
  } catch (error) {
    info.libsqlError = error instanceof Error ? `${error.message} | ${error.stack?.split('\n')[1]}` : String(error)
  }

  return Response.json(info)
}

import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

export const dynamic = 'force-dynamic'

export async function GET() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  const info: Record<string, unknown> = {
    TURSO_URL: tursoUrl?.substring(0, 40) + '...',
    AUTH_TOKEN_SET: !!authToken,
    AUTH_TOKEN_LEN: authToken?.length,
    NODE_ENV: process.env.NODE_ENV,
  }

  // Test 1: Try creating adapter directly
  try {
    const adapter = new PrismaLibSql({
      url: tursoUrl!,
      authToken: authToken!,
    })
    info.adapterCreated = true

    // Test 2: Try creating PrismaClient with adapter
    const client = new PrismaClient({ adapter })
    info.clientCreated = true

    // Test 3: Try querying
    const count = await client.book.count()
    info.bookCount = count
    info.dbStatus = 'connected'
  } catch (error) {
    info.dbStatus = 'error'
    info.dbError = error instanceof Error ? error.message : String(error)
    info.dbStack = error instanceof Error ? error.stack?.split('\n').slice(0, 8) : undefined
  }

  return Response.json(info)
}

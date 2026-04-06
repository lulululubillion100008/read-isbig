import { createClient } from '@libsql/client'

export const dynamic = 'force-dynamic'

export async function GET() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  const info: Record<string, unknown> = {
    TURSO_URL: tursoUrl?.substring(0, 40) + '...',
    AUTH_TOKEN_SET: !!authToken,
    NODE_ENV: process.env.NODE_ENV,
  }

  // Convert libsql:// to https:// for serverless compatibility
  const httpUrl = tursoUrl!.replace('libsql://', 'https://')
  info.httpUrl = httpUrl.substring(0, 40) + '...'

  // Test 1a: Raw libsql client with original URL
  try {
    const client = createClient({ url: tursoUrl!, authToken: authToken! })
    const result = await client.execute('SELECT COUNT(*) as cnt FROM Book')
    info.rawOriginalCount = result.rows[0]?.cnt
  } catch (error) {
    info.rawOriginalError = error instanceof Error ? error.message : String(error)
  }

  // Test 1b: Raw libsql client with https:// URL
  try {
    const client = createClient({ url: httpUrl, authToken: authToken! })
    const result = await client.execute('SELECT COUNT(*) as cnt FROM Book')
    info.rawHttpCount = result.rows[0]?.cnt
    info.rawHttpStatus = 'connected'
  } catch (error) {
    info.rawHttpStatus = 'error'
    info.rawHttpError = error instanceof Error ? error.message : String(error)
  }

  // Test 2: Prisma with adapter
  try {
    const { PrismaLibSql } = await import('@prisma/adapter-libsql')
    const { PrismaClient } = await import('@prisma/client')
    const adapter = new PrismaLibSql({ url: tursoUrl!, authToken: authToken! })
    const prisma = new PrismaClient({ adapter })
    const count = await prisma.book.count()
    info.prismaBookCount = count
    info.prismaStatus = 'connected'
  } catch (error) {
    info.prismaStatus = 'error'
    info.prismaError = error instanceof Error ? error.message : String(error)
    if (error && typeof error === 'object' && 'code' in error) {
      info.prismaCode = (error as { code: string }).code
    }
  }

  return Response.json(info)
}

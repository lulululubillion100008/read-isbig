import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const info: Record<string, unknown> = {
    DATABASE_URL_SET: !!process.env.DATABASE_URL,
    DATABASE_URL_PREFIX: process.env.DATABASE_URL?.substring(0, 30) + '...',
    AUTH_TOKEN_SET: !!process.env.DATABASE_AUTH_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
  }

  try {
    const count = await prisma.book.count()
    info.bookCount = count
    info.dbStatus = 'connected'
  } catch (error) {
    info.dbStatus = 'error'
    info.dbError = error instanceof Error ? error.message : String(error)
    info.dbStack = error instanceof Error ? error.stack?.split('\n').slice(0, 5) : undefined
  }

  return Response.json(info)
}

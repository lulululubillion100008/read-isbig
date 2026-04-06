import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  // Use TURSO_DATABASE_URL for cloud (Vercel), fall back to DATABASE_URL for local dev
  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || 'file:./dev.db'
  const authToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN

  const adapter = new PrismaLibSql({
    url,
    ...(authToken ? { authToken } : {}),
    // Use native fetch instead of cross-fetch to avoid URL parsing issues on Vercel
    fetch: globalThis.fetch,
  })

  const client = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  })
  globalForPrisma.prisma = client
  return client
}

export const prisma = getPrismaClient()

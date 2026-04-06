import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  const url = process.env.DATABASE_URL || 'file:./dev.db'
  const authToken = process.env.DATABASE_AUTH_TOKEN

  const adapter = new PrismaLibSql({
    url,
    ...(authToken ? { authToken } : {}),
  })

  // @ts-expect-error -- Prisma types mark datasourceUrl as `never` when adapter is set,
  // but without it Prisma validates DATABASE_URL as SQLite and rejects https:// URLs.
  // The adapter overrides the actual connection; this just satisfies Prisma's URL parser.
  const client = new PrismaClient({
    adapter,
    datasourceUrl: 'file:./placeholder.db',
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  })
  globalForPrisma.prisma = client
  return client
}

export const prisma = getPrismaClient()

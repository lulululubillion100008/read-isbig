import path from 'node:path'
import { defineConfig } from 'prisma/config'

// When using PrismaLibSql adapter at runtime, the datasource URL here
// is only used by Prisma CLI (migrate/push). At runtime, db.ts overrides
// the connection via the adapter. Use a dummy SQLite URL for CLI compatibility
// when DATABASE_URL is a libsql:// URL.
const rawUrl = process.env.DATABASE_URL || 'file:./dev.db'
const isRemote = rawUrl.startsWith('libsql://') || rawUrl.startsWith('https://')
const datasourceUrl = isRemote ? 'file:./dev.db' : rawUrl

export default defineConfig({
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
  datasource: {
    url: datasourceUrl,
  },
})

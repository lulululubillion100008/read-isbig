import type { NextRequest } from 'next/server'
import { getMockSummaryByBookId } from '@/lib/mock-data'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const summary = getMockSummaryByBookId(id)

  if (!summary) {
    return Response.json({ success: false, error: '书籍未找到' }, { status: 404 })
  }

  return Response.json({ success: true, data: summary })
}

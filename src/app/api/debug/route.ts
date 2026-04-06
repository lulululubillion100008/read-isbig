export const dynamic = 'force-dynamic'

export async function GET() {
  // Debug endpoint disabled in production
  return Response.json({ status: 'ok' })
}

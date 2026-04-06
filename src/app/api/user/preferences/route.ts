import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getUserIdFromRequest } from '@/lib/auth'
import { z } from 'zod'

const preferencesSchema = z.object({
  interests: z.array(z.string().max(50)).max(10).optional(),
  readingGoal: z.string().max(100).optional(),
  preferredStyle: z.string().max(50).optional(),
  theme: z.enum(['light', 'dark']).optional(),
})

export async function GET(request: Request) {
  const userId = getUserIdFromRequest(request)
  if (!userId) {
    return NextResponse.json({ success: false, error: '未登录' }, { status: 401 })
  }

  const prefs = await prisma.userPreferences.findUnique({
    where: { userId },
  })

  if (!prefs) {
    return NextResponse.json({ success: true, data: null })
  }

  return NextResponse.json({
    success: true,
    data: {
      interests: JSON.parse(prefs.interests),
      readingGoal: prefs.readingGoal,
      preferredStyle: prefs.preferredStyle,
      theme: prefs.theme,
    },
  })
}

export async function PUT(request: Request) {
  const userId = getUserIdFromRequest(request)
  if (!userId) {
    return NextResponse.json({ success: false, error: '未登录' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: '无效的请求体' }, { status: 400 })
  }

  const parsed = preferencesSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: '参数无效' }, { status: 400 })
  }

  const { interests, readingGoal, preferredStyle, theme } = parsed.data

  const data: Record<string, unknown> = {}
  if (interests !== undefined) data.interests = JSON.stringify(interests)
  if (readingGoal !== undefined) data.readingGoal = readingGoal
  if (preferredStyle !== undefined) data.preferredStyle = preferredStyle
  if (theme !== undefined) data.theme = theme

  const prefs = await prisma.userPreferences.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
  })

  return NextResponse.json({
    success: true,
    data: {
      interests: JSON.parse(prefs.interests),
      readingGoal: prefs.readingGoal,
      preferredStyle: prefs.preferredStyle,
      theme: prefs.theme,
    },
  })
}

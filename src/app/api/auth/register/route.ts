import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, createToken } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
    const { success: allowed } = rateLimit(`register:${ip}`, 3, 60_000)
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: '请求过于频繁，请稍后重试' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 255) : ''
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : ''
    const password = typeof body.password === 'string' ? body.password.slice(0, 72) : ''

    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, error: '请填写所有必填字段' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: '邮箱格式不正确' },
        { status: 400 }
      )
    }

    if (password.length < 10) {
      return NextResponse.json(
        { success: false, error: '密码至少需要10个字符' },
        { status: 400 }
      )
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return NextResponse.json(
        { success: false, error: '密码需包含大写字母、小写字母和数字' },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { success: false, error: '该邮箱已被注册' },
        { status: 409 }
      )
    }

    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    })

    const token = createToken(user.id)

    const response = NextResponse.json({
      success: true,
      data: {
        user: { id: user.id, email: user.email, name: user.name },
      },
    })

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Register error:', error instanceof Error ? error.message : 'unknown')
    return NextResponse.json(
      { success: false, error: '注册失败，请稍后重试' },
      { status: 500 }
    )
  }
}

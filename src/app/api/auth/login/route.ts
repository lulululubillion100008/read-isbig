import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyPassword, createToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim().slice(0, 255) : ''
    const password = typeof body.password === 'string' ? body.password.slice(0, 72) : ''

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: '请填写邮箱和密码' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { success: false, error: '邮箱或密码错误' },
        { status: 401 }
      )
    }

    const valid = await verifyPassword(password, user.password)
    if (!valid) {
      return NextResponse.json(
        { success: false, error: '邮箱或密码错误' },
        { status: 401 }
      )
    }

    const token = createToken(user.id)

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email, name: user.name },
      },
    })
  } catch (error) {
    console.error('Login error:', error instanceof Error ? error.message : 'unknown')
    return NextResponse.json(
      { success: false, error: '登录失败，请稍后重试' },
      { status: 500 }
    )
  }
}

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET environment variable must be set')
  }
  return secret
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function createToken(userId: string): string {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: '7d', algorithm: 'HS256' })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] }) as { userId: string }
  } catch {
    return null
  }
}

export function getUserIdFromRequest(request: Request): string | null {
  // Try HttpOnly cookie first
  const cookieHeader = request.headers.get('Cookie') ?? ''
  const cookieMatch = cookieHeader.match(/(?:^|;\s*)auth_token=([^;]+)/)
  if (cookieMatch) {
    const payload = verifyToken(cookieMatch[1])
    if (payload) return payload.userId
  }

  // Fallback to Authorization header for API clients
  const auth = request.headers.get('Authorization')
  if (auth?.startsWith('Bearer ')) {
    const payload = verifyToken(auth.slice(7))
    return payload?.userId || null
  }

  return null
}

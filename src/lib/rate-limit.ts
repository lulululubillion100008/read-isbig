const MAX_ENTRIES = 10_000
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

interface RateLimitResult {
  success: boolean
  remaining: number
}

/**
 * Extract a trusted client IP from request headers.
 * Prefers x-real-ip (set by Vercel/nginx, not spoofable),
 * falls back to rightmost x-forwarded-for entry.
 */
export function getClientIp(request: Request): string {
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()

  const xff = request.headers.get('x-forwarded-for')
  if (xff) {
    const last = xff.split(',').at(-1)?.trim()
    if (last) return last
  }

  return 'anonymous'
}

export function rateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 60_000
): RateLimitResult {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetTime) {
    // Fail closed when map is at capacity to prevent memory exhaustion
    if (!entry && rateLimitMap.size >= MAX_ENTRIES) {
      return { success: false, remaining: 0 }
    }
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return { success: true, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 }
  }

  const updated = { count: entry.count + 1, resetTime: entry.resetTime }
  rateLimitMap.set(key, updated)
  return { success: true, remaining: limit - updated.count }
}

// Periodic cleanup to prevent memory leak
if (typeof globalThis !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimitMap) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }, 60_000)
}

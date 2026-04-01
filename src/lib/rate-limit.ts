const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

interface RateLimitResult {
  success: boolean
  remaining: number
}

export function rateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 60_000
): RateLimitResult {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetTime) {
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

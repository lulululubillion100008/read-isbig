import 'server-only'

import { prisma } from './db'

export interface QuotaCheck {
  allowed: boolean
  remaining: number
  plan: string
}

const PLAN_LIMITS: Record<string, { monthlyGenerations: number; monthlyQA: number }> = {
  free: { monthlyGenerations: 5, monthlyQA: 20 },
  pro: { monthlyGenerations: -1, monthlyQA: -1 }, // -1 = unlimited
  premium: { monthlyGenerations: -1, monthlyQA: -1 },
}

function getMonthStart(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

export async function checkGenerationQuota(userId: string): Promise<QuotaCheck> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, credits: true, planExpiresAt: true },
  })

  if (!user) return { allowed: false, remaining: 0, plan: 'free' }

  const plan = isPlanActive(user) ? user.plan : 'free'
  const limits = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free

  // Unlimited
  if (limits.monthlyGenerations === -1) {
    return { allowed: true, remaining: 999, plan }
  }

  // Check extra credits first
  if (user.credits > 0) {
    return { allowed: true, remaining: user.credits, plan }
  }

  // Count monthly usage
  const monthStart = getMonthStart()
  const count = await prisma.aIUsageLog.count({
    where: {
      userId,
      action: 'summary',
      createdAt: { gte: monthStart },
    },
  })

  const remaining = Math.max(0, limits.monthlyGenerations - count)
  return { allowed: remaining > 0, remaining, plan }
}

export async function checkQAQuota(userId: string): Promise<QuotaCheck> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, planExpiresAt: true },
  })

  if (!user) return { allowed: false, remaining: 0, plan: 'free' }

  const plan = isPlanActive(user) ? user.plan : 'free'
  const limits = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free

  if (limits.monthlyQA === -1) {
    return { allowed: true, remaining: 999, plan }
  }

  const monthStart = getMonthStart()
  const count = await prisma.aIUsageLog.count({
    where: {
      userId,
      action: 'qa',
      createdAt: { gte: monthStart },
    },
  })

  const remaining = Math.max(0, limits.monthlyQA - count)
  return { allowed: remaining > 0, remaining, plan }
}

export async function deductCredit(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { credits: { decrement: 1 } },
  })
}

function isPlanActive(user: { plan: string; planExpiresAt: Date | null }): boolean {
  if (user.plan === 'free') return true
  if (!user.planExpiresAt) return true
  return user.planExpiresAt > new Date()
}

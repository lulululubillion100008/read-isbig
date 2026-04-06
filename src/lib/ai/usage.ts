import 'server-only'

import { prisma } from '../db'

// Cost per 1M tokens (approximate, Claude Sonnet 4)
const COST_TABLE: Record<string, { input: number; output: number }> = {
  'claude-sonnet-4-20250514': { input: 3.0, output: 15.0 },
  'claude-haiku-4-5-20251001': { input: 0.8, output: 4.0 },
}

export async function logAIUsage(options: {
  userId?: string
  bookId?: string
  action: string
  model: string
  inputTokens: number
  outputTokens: number
}): Promise<void> {
  const { userId, bookId, action, model, inputTokens, outputTokens } = options

  const rates = COST_TABLE[model] ?? { input: 3.0, output: 15.0 }
  const costUsd =
    (inputTokens / 1_000_000) * rates.input +
    (outputTokens / 1_000_000) * rates.output

  await prisma.aIUsageLog.create({
    data: { userId, bookId, action, model, inputTokens, outputTokens, costUsd },
  })
}

/**
 * Get current month's total cost for smart degradation decisions
 */
export async function getMonthlyUsage(): Promise<{ totalCost: number; totalCalls: number }> {
  const monthStart = new Date()
  monthStart.setDate(1)
  monthStart.setHours(0, 0, 0, 0)

  const result = await prisma.aIUsageLog.aggregate({
    where: { createdAt: { gte: monthStart } },
    _sum: { costUsd: true },
    _count: true,
  })

  return {
    totalCost: result._sum.costUsd ?? 0,
    totalCalls: result._count,
  }
}

// Monthly budget threshold (USD)
const MONTHLY_BUDGET = Number(process.env.AI_MONTHLY_BUDGET) || 100

/**
 * Determine the best model based on budget usage
 */
export async function getSmartModel(preferredModel: string): Promise<string> {
  const { totalCost } = await getMonthlyUsage()
  const usageRatio = totalCost / MONTHLY_BUDGET

  // > 95% budget: block new generations
  if (usageRatio > 0.95) {
    throw new Error('本月 AI 额度已用尽，请下月再试')
  }

  // > 80% budget: downgrade to Haiku
  if (usageRatio > 0.8 && preferredModel.includes('sonnet')) {
    return 'claude-haiku-4-5-20251001'
  }

  return preferredModel
}

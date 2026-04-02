import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址').max(255),
  password: z.string().min(6, '密码至少6个字符').max(72),
})

export const registerSchema = z.object({
  name: z.string().min(1, '请输入名字').max(50),
  email: z.string().email('请输入有效的邮箱地址').max(255),
  password: z
    .string()
    .min(10, '密码至少10个字符')
    .max(72)
    .regex(/[a-z]/, '密码需包含小写字母')
    .regex(/[A-Z]/, '密码需包含大写字母')
    .regex(/\d/, '密码需包含数字'),
})

export const bookIdString = z.string().min(1).max(50)

export const bookIdSchema = z.object({
  bookId: bookIdString,
})

export const favoriteSchema = z.object({
  bookId: bookIdString,
})

export const readingHistorySchema = z.object({
  bookId: bookIdString,
  lastReadPage: z.number().int().min(0).max(10000),
})

export const searchSchema = z.object({
  q: z.string().max(200).default(''),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
})

export const aiQuestionSchema = z.object({
  question: z.string().min(1, '请输入问题').max(1000),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(2000),
  })).max(6).optional(),
})

export const readingSessionSchema = z.object({
  bookId: bookIdString,
  durationMin: z.number().int().min(1).max(1440),
})

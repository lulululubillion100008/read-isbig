'use client'

import { createContext, useState, useEffect, useCallback } from 'react'
import type { UserProfile } from '@/lib/types'

export interface AuthContextType {
  user: UserProfile | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  })
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('auth_token')
    }
    return true
  })

  const saveAuth = useCallback((t: string, u: UserProfile) => {
    setToken(t)
    setUser(u)
    localStorage.setItem('auth_token', t)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('auth_token')
  }, [])

  // On mount: restore token and fetch user
  useEffect(() => {
    const stored = localStorage.getItem('auth_token')
    if (!stored) {
      return
    }

    let cancelled = false

    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${stored}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (data.success && data.data?.user) {
          setUser(data.data.user as UserProfile)
        } else {
          localStorage.removeItem('auth_token')
          setToken(null)
        }
      })
      .catch(() => {
        if (cancelled) return
        localStorage.removeItem('auth_token')
        setToken(null)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || '登录失败')
      saveAuth(data.data.token, data.data.user as UserProfile)
    },
    [saveAuth]
  )

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || '注册失败')
      saveAuth(data.data.token, data.data.user as UserProfile)
    },
    [saveAuth]
  )

  return (
    <AuthContext value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext>
  )
}

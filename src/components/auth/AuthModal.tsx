'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin?: () => void
}

type Tab = 'login' | 'register'

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const { login, register } = useAuth()
  const [tab, setTab] = useState<Tab>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register fields
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm] = useState('')

  const modalRef = useRef<HTMLDivElement>(null)
  const titleId = 'auth-modal-title'

  // Focus trap
  useEffect(() => {
    if (!isOpen) return

    const modal = modalRef.current
    if (!modal) return

    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const focusFirst = () => {
      const first = modal.querySelector<HTMLElement>(focusableSelector)
      first?.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusable = modal.querySelectorAll<HTMLElement>(focusableSelector)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    focusFirst()
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const switchTab = (t: Tab) => {
    setTab(t)
    setError('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(loginEmail, loginPassword)
      onLogin?.()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (regPassword !== regConfirm) {
      setError('两次输入的密码不一致')
      return
    }
    if (regPassword.length < 10) {
      setError('密码至少需要10个字符')
      return
    }

    setLoading(true)

    try {
      await register(regName, regEmail, regPassword)
      onLogin?.()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />

      {/* Modal card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md mx-4 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top decorative gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="关闭"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-8 pt-8 pb-2">
          {/* Title */}
          <h2 id={titleId} className="text-2xl font-bold text-gray-800 mb-1">
            {tab === 'login' ? '欢迎回来' : '加入我们'}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {tab === 'login' ? '登录继续你的阅读之旅' : '创建账号开启精华阅读'}
          </p>

          {/* Tab switcher */}
          <div className="relative flex mb-6 bg-gray-100 rounded-2xl p-1" role="tablist">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-transform duration-300 ease-out ${
                tab === 'register' ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'
              }`}
            />
            <button
              role="tab"
              aria-selected={tab === 'login'}
              aria-controls="login-panel"
              className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 ${
                tab === 'login' ? 'text-gray-800' : 'text-gray-400'
              }`}
              onClick={() => switchTab('login')}
            >
              登录
            </button>
            <button
              role="tab"
              aria-selected={tab === 'register'}
              aria-controls="register-panel"
              className={`relative z-10 flex-1 py-2.5 text-sm font-medium rounded-xl transition-colors duration-200 ${
                tab === 'register' ? 'text-gray-800' : 'text-gray-400'
              }`}
              onClick={() => switchTab('register')}
            >
              注册
            </button>
          </div>
        </div>

        <div className="px-8 pb-8">
          {/* Error message */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 text-red-500 text-sm rounded-xl" role="alert">
              {error}
            </div>
          )}

          {/* Login form */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4" id="login-panel" role="tabpanel">
              <div>
                <label htmlFor="login-email" className="sr-only">邮箱地址</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="邮箱地址"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="sr-only">密码</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="密码"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    登录中...
                  </span>
                ) : '登录'}
              </button>
            </form>
          )}

          {/* Register form */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4" id="register-panel" role="tabpanel">
              <div>
                <label htmlFor="reg-name" className="sr-only">昵称</label>
                <input
                  id="reg-name"
                  type="text"
                  placeholder="昵称"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all"
                />
              </div>
              <div>
                <label htmlFor="reg-email" className="sr-only">邮箱地址</label>
                <input
                  id="reg-email"
                  type="email"
                  placeholder="邮箱地址"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all"
                />
              </div>
              <div>
                <label htmlFor="reg-password" className="sr-only">密码（至少10位）</label>
                <input
                  id="reg-password"
                  type="password"
                  placeholder="密码（至少10位）"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all"
                />
              </div>
              <div>
                <label htmlFor="reg-confirm" className="sr-only">确认密码</label>
                <input
                  id="reg-confirm"
                  type="password"
                  placeholder="确认密码"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    注册中...
                  </span>
                ) : '创建账号'}
              </button>
            </form>
          )}

          {/* Bottom hint */}
          <p className="mt-6 text-center text-xs text-gray-400">
            {tab === 'login' ? (
              <>还没有账号？<button onClick={() => switchTab('register')} className="text-purple-500 hover:text-purple-600 font-medium">立即注册</button></>
            ) : (
              <>已有账号？<button onClick={() => switchTab('login')} className="text-purple-500 hover:text-purple-600 font-medium">去登录</button></>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

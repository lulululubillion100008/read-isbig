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

  const inputStyle = {
    background: 'var(--surface-container-low)',
    color: 'var(--text-primary)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(12, 15, 14, 0.4)',
          backdropFilter: 'blur(24px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
        }}
      />

      {/* Modal card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md mx-4 overflow-hidden"
        style={{
          background: 'rgba(250, 249, 245, 0.95)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top decorative bar - Vermilion gradient */}
        <div
          className="h-1.5"
          style={{ background: 'linear-gradient(to right, #ad3332, #9c2627, #5b605c)' }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="关闭"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center transition-colors"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-8 pt-8 pb-2">
          {/* Title */}
          <h2
            id={titleId}
            className="text-2xl font-bold mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
          >
            {tab === 'login' ? '欢迎回来' : '加入我们'}
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
            {tab === 'login' ? '登录继续你的阅读之旅' : '创建账号开启精华阅读'}
          </p>

          {/* Tab switcher */}
          <div
            className="relative flex mb-6 p-1"
            style={{ background: 'var(--surface-container-high)' }}
            role="tablist"
          >
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] transition-transform duration-300 ease-out"
              style={{
                background: 'var(--surface-container-lowest)',
                transform: tab === 'register' ? 'translateX(calc(100% + 8px))' : 'translateX(0)',
              }}
            />
            <button
              role="tab"
              aria-selected={tab === 'login'}
              aria-controls="login-panel"
              className="relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors duration-200"
              style={{ color: tab === 'login' ? 'var(--text-primary)' : 'var(--text-tertiary)' }}
              onClick={() => switchTab('login')}
            >
              登录
            </button>
            <button
              role="tab"
              aria-selected={tab === 'register'}
              aria-controls="register-panel"
              className="relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors duration-200"
              style={{ color: tab === 'register' ? 'var(--text-primary)' : 'var(--text-tertiary)' }}
              onClick={() => switchTab('register')}
            >
              注册
            </button>
          </div>
        </div>

        <div className="px-8 pb-8">
          {/* Error message */}
          {error && (
            <div
              className="mb-4 px-4 py-3 text-sm"
              style={{
                background: 'rgba(173, 51, 50, 0.06)',
                color: '#ad3332',
              }}
              role="alert"
            >
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
                  className="w-full px-5 py-3.5 text-base outline-none placeholder:text-[var(--text-tertiary)]"
                  style={inputStyle}
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
                  className="w-full px-5 py-3.5 text-base outline-none placeholder:text-[var(--text-tertiary)]"
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #ad3332, #9c2627)',
                }}
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
                  className="w-full px-5 py-3.5 text-base outline-none placeholder:text-[var(--text-tertiary)]"
                  style={inputStyle}
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
                  className="w-full px-5 py-3.5 text-base outline-none placeholder:text-[var(--text-tertiary)]"
                  style={inputStyle}
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
                  className="w-full px-5 py-3.5 text-base outline-none placeholder:text-[var(--text-tertiary)]"
                  style={inputStyle}
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
                  className="w-full px-5 py-3.5 text-base outline-none placeholder:text-[var(--text-tertiary)]"
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #ad3332, #9c2627)',
                }}
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
          <p className="mt-6 text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {tab === 'login' ? (
              <>还没有账号？<button onClick={() => switchTab('register')} className="font-medium" style={{ color: 'var(--primary)' }}>立即注册</button></>
            ) : (
              <>已有账号？<button onClick={() => switchTab('login')} className="font-medium" style={{ color: 'var(--primary)' }}>去登录</button></>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

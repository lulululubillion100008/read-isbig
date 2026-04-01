import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: 'var(--background)' }}
    >
      <div className="text-center">
        <h1
          className="text-6xl font-bold"
          style={{ color: 'var(--outline-variant)', fontFamily: 'var(--font-serif)' }}
        >
          404
        </h1>
        <h2
          className="mt-4 text-2xl font-bold"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}
        >
          页面未找到
        </h2>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          抱歉，您访问的页面不存在。
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-2.5 text-sm font-medium text-white transition-colors"
          style={{ background: 'linear-gradient(135deg, #ad3332, #9c2627)' }}
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}

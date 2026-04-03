'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';

const NAV_ITEMS = [
  { label: '首页', href: '/' },
  { label: '探索', href: '/explore' },
  { label: '书架', href: '/library' },
  { label: '统计', href: '/stats' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const openAuth = useCallback(() => setShowAuth(true), []);
  const closeAuth = useCallback(() => setShowAuth(false), []);

  // 阅读页面隐藏导航
  if (pathname.startsWith('/book/')) return null;

  const needsAuth = (href: string) => href === '/library' || href === '/stats';

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      {/* ─── 桌面顶部导航 ─── */}
      <header className="fixed top-0 left-0 right-0 z-30 hidden border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-lg md:block">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-[var(--text-primary)] font-serif">
            Read Is Big
          </Link>

          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              if (needsAuth(item.href) && !user) {
                return (
                  <button
                    key={item.href}
                    onClick={openAuth}
                    className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-[var(--text-tertiary)] transition-colors hover:bg-[var(--gray-6)] hover:text-[var(--text-primary)]"
                  >
                    {item.label}
                  </button>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-[var(--gray-6)] text-[var(--text-primary)]'
                      : 'text-[var(--text-tertiary)] hover:bg-[var(--gray-6)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="ml-2 h-5 w-px bg-[var(--border)]" />

            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <span className="text-sm text-[var(--text-secondary)]">{user.name}</span>
                <button
                  onClick={() => logout()}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-[var(--text-tertiary)] transition-colors hover:bg-[var(--gray-6)] hover:text-[var(--text-primary)]"
                >
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={openAuth}
                className="ml-2 rounded-lg px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #ad3332, #9c2627)' }}
              >
                登录
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* ─── 移动端底部导航 ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-lg md:hidden">
        <div className="mx-auto flex max-w-lg">
          {NAV_ITEMS.map((item) => {
            if (needsAuth(item.href) && !user) {
              return (
                <button
                  key={item.href}
                  onClick={openAuth}
                  className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors text-[var(--text-quaternary)]"
                >
                  <NavIcon href={item.href} />
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-quaternary)]'
                }`}
              >
                <NavIcon href={item.href} />
                {item.label}
              </Link>
            );
          })}

          {!user && (
            <button
              onClick={openAuth}
              className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors text-[var(--text-quaternary)]"
            >
              <NavIcon href="user" />
              登录
            </button>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={showAuth}
        onClose={closeAuth}
        onLogin={closeAuth}
      />
    </>
  );
}

function NavIcon({ href }: { href: string }) {
  const props = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (href) {
    case '/':
      return <svg {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    case '/explore':
      return <svg {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
    case '/library':
      return <svg {...props}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>;
    case '/stats':
      return <svg {...props}><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" /></svg>;
  }
}

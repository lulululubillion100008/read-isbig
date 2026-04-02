import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import AuthProvider from "@/components/auth/AuthProvider";
import BottomNav from "@/components/layout/BottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Read Is Big — 15分钟，读懂一本好书",
  description: "AI 深度解读书籍精华，沉浸式阅读体验，让你快速获取一本书的核心价值",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] antialiased">
        <AuthProvider>
          {children}
          <BottomNav />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}

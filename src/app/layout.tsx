import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Read Is Big - 15分钟读懂一本好书",
  description: "AI 提炼书籍精华，思维导图式呈现，让你快速获取一本书的核心价值",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Stitch Design System Fonts: Noto Serif (Display), Manrope (Body), Space Grotesk (Labels) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Noto+Serif:wght@400;500;600;700&family=Noto+Serif+SC:wght@400;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text-primary)]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

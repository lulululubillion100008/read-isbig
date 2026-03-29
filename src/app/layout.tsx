import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_SC, Noto_Serif_SC, ZCOOL_KuaiLe } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const zcoolKuaiLe = ZCOOL_KuaiLe({
  variable: "--font-zcool-kuaile",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Read Is Big - 精华阅读",
  description: "输入书名，15分钟获取一本书的精华内容",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansSC.variable} ${notoSerifSC.variable} ${zcoolKuaiLe.variable} h-full antialiased`}
    >
      <head>
        {/* 霞鹜文楷 - 通过CDN引入（Google Fonts未收录） */}
        <link
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css"
          rel="stylesheet"
        />
        {/* Source Han Sans SC（思源黑体）- 通过CDN引入 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Han+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

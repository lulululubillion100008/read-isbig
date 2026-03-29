<div align="center">

# Read Is Big

### 15分钟，读懂一本好书

**将人类知识精华，用最美的方式呈现给你**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Claude AI](https://img.shields.io/badge/Claude_AI-Powered-D97706?style=for-the-badge)](https://anthropic.com)

---

*输入任何一本书的名字，AI 帮你提炼精华，思维导图式呈现，让你快速获得一本书的核心价值。*

</div>

---

## Why Read Is Big?

在这个信息爆炸的时代，我们有太多想读的书，却没有足够的时间。

**Read Is Big** 让你在 **15-25 分钟** 内，通过精美的思维导图式排版，获取一本书的核心精华。每本书都有独特的视觉风格，让阅读变成一种享受。

---

## Features

### 核心功能

| 功能 | 描述 |
|------|------|
| **AI 精华提炼** | 输入书名，Claude AI 自动生成结构化的读书笔记 |
| **思维导图式展示** | 类似「樊登读书」的精美思维导图排版，层次清晰 |
| **每本书独特主题** | 每本书根据其特质生成独特的配色方案和视觉风格 |
| **播客模式** | 眼睛累了？一键切换语音朗读，像听播客一样吸收知识 |
| **智能爬虫** | 集成 Crawl4AI，从豆瓣等平台抓取书籍元数据 |

### 阅读体验

| 功能 | 描述 |
|------|------|
| **滑动翻页** | 支持触摸滑动和键盘操作，流畅的页面切换动画 |
| **5 种中文字体** | 思源黑体、思源宋体、霞鹜文楷、方正黑体、站酷快乐体 |
| **字号调节** | 14-24px 自由调节，找到最舒适的阅读大小 |
| **响应式设计** | PC、平板、手机完美适配 |

### 知识平台

| 功能 | 描述 |
|------|------|
| **书籍分类** | 14 大分类：创业、管理、文学、武侠、科幻、哲学... |
| **智能评分** | 神作(9.0+)、佳作(8.0+)、良作(7.0+) 分级展示 |
| **作者主页** | 查看作者简介、成就、关联书籍 |
| **个性化推荐** | 新用户引导 → 兴趣分析 → 定制书单 |

### 用户系统

| 功能 | 描述 |
|------|------|
| **注册登录** | 邮箱注册，JWT 安全认证 |
| **阅读历史** | 自动记录阅读进度，随时继续 |
| **收藏书籍** | 一键收藏，构建个人知识库 |

---

## Tech Stack

```
Frontend:     Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
Animation:    Framer Motion (页面切换、交互动画)
AI Engine:    Claude API (智能摘要生成)
Web Crawler:  Crawl4AI (书籍数据抓取)
Database:     Prisma + SQLite
Auth:         JWT + bcrypt
TTS:          Web Speech API (语音朗读)
Fonts:        5 种 Google/CDN 中文字体
```

---

## 项目架构

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 首页 (搜索 + 推荐)
│   ├── book/[id]/page.tsx        # 书籍精华阅读页
│   ├── explore/                  # 分类浏览
│   ├── author/[id]/              # 作者详情
│   └── api/                      # 后端 API
│       ├── auth/                 # 认证 (登录/注册)
│       ├── books/                # 书籍搜索和摘要
│       └── user/                 # 用户数据
├── components/
│   ├── mindmap/                  # 思维导图组件 (11个)
│   │   ├── MindMapSection.tsx    # 核心递归渲染器
│   │   ├── ConceptBox.tsx        # 概念框
│   │   ├── ConnectingLine.tsx    # CSS 连接线
│   │   ├── NumberedItem.tsx      # 编号项 ❶❷❸
│   │   └── ...
│   ├── reader/                   # 阅读器
│   │   ├── SummaryReader.tsx     # 主阅读器 (翻页动画)
│   │   ├── BookSidebar.tsx       # 竖排书名边栏
│   │   ├── SummaryPage.tsx       # 页面渲染器
│   │   └── ReaderSettingsPanel.tsx # 字体/字号设置
│   ├── player/                   # 播客播放器
│   ├── home/                     # 首页组件
│   ├── explore/                  # 探索页组件
│   ├── auth/                     # 认证组件
│   └── onboarding/               # 新用户引导
├── hooks/                        # React Hooks
│   ├── useTTS.ts                 # 语音合成
│   ├── useSwipe.ts               # 触摸手势
│   ├── useReaderSettings.ts      # 阅读器设置
│   └── useOnboarding.ts          # 引导流程
├── lib/                          # 工具库
│   ├── claude.ts                 # Claude AI 集成
│   ├── crawler.ts                # Crawl4AI 集成
│   ├── auth.ts                   # JWT 认证
│   ├── db.ts                     # 数据库
│   └── types.ts                  # TypeScript 类型
└── prisma/
    └── schema.prisma             # 数据库模型
```

---

## Quick Start

### 1. 克隆项目

```bash
git clone https://github.com/lulululubillion100008/read-isbig.git
cd read-isbig
```

### 2. 安装依赖

```bash
npm install
```

### 3. 环境配置

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-secure-jwt-secret"
ANTHROPIC_API_KEY="sk-ant-..."          # Claude API 密钥
CRAWL4AI_API_URL="http://localhost:11235" # 可选: Crawl4AI 服务地址
```

### 4. 初始化数据库

```bash
npx prisma db push
```

### 5. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 开始使用！

---

## Roadmap

- [x] 思维导图式书籍精华展示
- [x] 每本书独特的视觉主题
- [x] 播客模式 (TTS 语音朗读)
- [x] 5 种中文字体 + 字号调节
- [x] 14 大书籍分类 + 评分系统
- [x] 作者详情页 + 关联书籍
- [x] 个性化新用户引导
- [x] 用户系统 (注册/登录/收藏/历史)
- [ ] 高质量 AI 语音 (OpenAI TTS / Azure)
- [ ] 社交功能 (分享、评论、书友圈)
- [ ] 离线阅读模式
- [ ] 多语言支持
- [ ] 移动端 App (React Native)
- [ ] AI 对话式读书问答

---

## 致谢

- [Claude AI](https://anthropic.com) - AI 精华生成引擎
- [Crawl4AI](https://github.com/unclecode/crawl4ai) - 智能网页爬虫
- [obra/superpowers](https://github.com/obra/superpowers) - Claude Code 增强
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code) - 开发配置

---

<div align="center">

**让每个人都能用最短的时间，获取一本书最大的价值。**

Made with ❤️ by Read Is Big Team

</div>

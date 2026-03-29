// 书籍基本信息
export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  category?: string;
  description?: string;
  createdAt: Date;
}

// 书籍主题风格 - 每本书都有独特的视觉风格
export interface BookTheme {
  primaryColor: string;      // 主色（如红色 #E53935）
  secondaryColor: string;    // 辅色
  accentColor: string;       // 强调色
  sidebarBg: string;         // 侧边栏背景色
  bannerBg: string;          // 标题条背景色
  bannerText: string;        // 标题条文字色
  connectorColor: string;    // 连接线颜色
  conceptBoxBorder: string;  // 概念框边框色
  highlightColor: string;    // 高亮文字色
  backgroundPattern?: string; // 背景纹理类型: 'dots' | 'lines' | 'waves' | 'grid' | 'none'
  backgroundImage?: string;  // 背景图片URL
  fontStyle?: 'classic' | 'modern' | 'elegant' | 'bold'; // 字体风格
}

// 书籍摘要
export interface BookSummary {
  id: string;
  bookId: string;
  book: Book;
  theme: BookTheme;          // 每本书的独特主题
  pages: SummaryPage[];
  readingTime: number;       // 预计阅读时间(分钟)
  generatedAt: Date;
}

// 摘要页面
export interface SummaryPage {
  pageNumber: number;
  chapterTitle: string;       // 显示在顶部黑色标题条
  sections: Section[];
}

// 内容类型
export type SectionType =
  | 'header'           // 粗体章节标题
  | 'concept-box'      // 红框概念标签
  | 'mindmap-branch'   // 思维导图分支（有连接线）
  | 'numbered-list'    // 编号列表 ❶❷❸
  | 'highlight'        // 高亮强调文字
  | 'text'             // 普通段落
  | 'card-group'       // 分组卡片容器
  | 'quote';           // 引用块

// 内容节
export interface Section {
  type: SectionType;
  content: string;
  emphasis?: boolean;         // 是否强调（红色）
  children?: Section[];       // 子节点（递归结构）
  items?: NumberedItemData[]; // 编号列表数据
}

// 编号项数据
export interface NumberedItemData {
  number: number;             // 1-9
  title: string;
  description?: string;
  children?: Section[];       // 编号项也可以有子节点
}

// 用户
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

// 阅读历史
export interface ReadingHistory {
  userId: string;
  bookId: string;
  book: Book;
  lastReadPage: number;
  readAt: Date;
}

// 用户收藏
export interface UserFavorite {
  userId: string;
  bookId: string;
  book: Book;
  createdAt: Date;
}

// API 响应
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

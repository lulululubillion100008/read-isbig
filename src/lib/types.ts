// ─── Book ────────────────────────────────────────────────

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage?: string;
  category?: string;
  description?: string;
  score?: number;
  publishYear?: number;
  totalReaders?: number;
  tagsJson?: string;
  createdAt: Date;
}

// ─── Content System ──────────────────────────────────────

export type ContentBlockType =
  | 'heading'
  | 'paragraph'
  | 'quote'
  | 'key-insight'
  | 'chapter-summary'
  | 'expandable'
  | 'numbered-list'
  | 'bullet-list'
  | 'callout'
  | 'divider';

export interface ContentBlock {
  type: ContentBlockType;
  content: string;
  level?: number;
  children?: ContentBlock[];
  expanded?: boolean;
  metadata?: Record<string, string>;
}

export interface Chapter {
  id: string;
  title: string;
  blocks: ContentBlock[];
  readingTimeMin: number;
}

export interface BookContent {
  bookId: string;
  chapters: Chapter[];
  totalReadingTimeMin: number;
  contentType: 'summary' | 'deep-analysis' | 'mixed';
}

// ─── Reading ─────────────────────────────────────────────

export type ReadingMode = 'scroll' | 'page' | 'card' | 'chapter';

export type BackgroundTheme = 'white' | 'warm' | 'dark';

// ─── Scene (Three.js atmosphere) ─────────────────────────

export type SceneType = 'nature' | 'interior' | 'abstract';

export interface BookScene {
  sceneType: SceneType;
  description: string;
  config: {
    palette: string[];
    elements: string[];
    mood: string;
    timeOfDay: 'dawn' | 'day' | 'dusk' | 'night';
  };
}

// ─── User ────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

// ─── Reading History & Favorites ─────────────────────────

export interface ReadingHistory {
  userId: string;
  bookId: string;
  book: Book;
  lastReadPage: number;
  readAt: Date;
}

export interface UserFavorite {
  userId: string;
  bookId: string;
  book: Book;
  createdAt: Date;
}

// ─── Reading Stats ───────────────────────────────────────

export interface ReadingStats {
  totalBooksRead: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  thisWeekMinutes: number;
  recentBooks: { bookId: string; title: string; lastRead: Date }[];
}

// ─── API ─────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

// ─── Categories & Ratings ────────────────────────────────

export type BookCategory =
  | '创业' | '管理' | '商业' | '经济'
  | '心理学' | '哲学' | '自我成长'
  | '文学' | '小说' | '散文' | '诗歌'
  | '武侠' | '科幻' | '悬疑'
  | '历史' | '传记' | '社科'
  | '科技' | '编程' | '设计'
  | '亲子' | '教育' | '健康';

export type BookRating = '神作' | '佳作' | '良作' | '普通';

export function getBookRating(score: number): BookRating {
  if (score >= 9.0) return '神作';
  if (score >= 8.0) return '佳作';
  if (score >= 7.0) return '良作';
  return '普通';
}

export function getRatingColor(rating: BookRating): string {
  switch (rating) {
    case '神作': return '#1D1D1F';
    case '佳作': return '#424245';
    case '良作': return '#6E6E73';
    default: return '#86868B';
  }
}

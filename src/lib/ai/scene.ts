import 'server-only';

import { callClaude } from './client';
import type { BookScene, SceneType } from '@/lib/types';

interface GenerateSceneOptions {
  bookTitle: string;
  bookAuthor?: string;
  category?: string;
  description?: string;
}

const SCENE_SYSTEM_PROMPT = `你是一位视觉氛围设计师。根据书籍信息，生成一个Three.js场景配置，用于阅读时的沉浸式背景氛围。

输出严格JSON格式：
{
  "sceneType": "nature" | "interior" | "abstract",
  "description": "一句话描述场景意境",
  "config": {
    "palette": ["#hex1", "#hex2", "#hex3"],
    "elements": ["element1", "element2"],
    "mood": "serene" | "solemn" | "energetic" | "contemplative" | "mysterious",
    "timeOfDay": "dawn" | "day" | "dusk" | "night"
  }
}

场景类型选择逻辑：
- nature: 文学、诗歌、散文、自然相关 → 水面、雾气、柳叶、萤火虫
- interior: 商业、管理、历史、传记、哲学 → 壁炉、暖光、书架、烛火
- abstract: 科技、编程、设计、心理学、科幻 → 粒子、渐变、几何体

配色要求：
- 3个十六进制颜色，从深到浅
- 与书籍主题和意境匹配
- 色调统一，高级感

只输出JSON，不要其他文字。`;

export async function generateBookScene(options: GenerateSceneOptions): Promise<BookScene> {
  const { bookTitle, bookAuthor, category, description } = options;

  const userMessage = [
    `书名：《${bookTitle}》`,
    bookAuthor ? `作者：${bookAuthor}` : null,
    category ? `分类：${category}` : null,
    description ? `简介：${description}` : null,
  ].filter(Boolean).join('\n');

  const text = await callClaude({
    system: SCENE_SYSTEM_PROMPT,
    userMessage,
    model: 'claude-haiku-4-5-20251001',
    maxTokens: 500,
    timeoutMs: 15000,
  });

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse scene JSON');
  }

  const parsed = JSON.parse(jsonMatch[0]);

  // 验证并规范化
  const validSceneTypes: SceneType[] = ['nature', 'interior', 'abstract'];
  const sceneType = validSceneTypes.includes(parsed.sceneType)
    ? parsed.sceneType
    : 'abstract';

  const validMoods = ['serene', 'solemn', 'energetic', 'contemplative', 'mysterious'];
  const mood = validMoods.includes(parsed.config?.mood)
    ? parsed.config.mood
    : 'contemplative';

  const validTimes = ['dawn', 'day', 'dusk', 'night'];
  const timeOfDay = validTimes.includes(parsed.config?.timeOfDay)
    ? parsed.config.timeOfDay
    : 'dusk';

  const palette = Array.isArray(parsed.config?.palette)
    ? parsed.config.palette.filter((c: string) => /^#[0-9a-fA-F]{6}$/.test(c)).slice(0, 3)
    : [];

  // 确保至少3个颜色
  const defaultPalette = ['#1a1a2e', '#16213e', '#0f3460'];
  while (palette.length < 3) {
    palette.push(defaultPalette[palette.length]);
  }

  return {
    sceneType,
    description: typeof parsed.description === 'string' ? parsed.description : '',
    config: {
      palette,
      elements: Array.isArray(parsed.config?.elements) ? parsed.config.elements : [],
      mood,
      timeOfDay,
    },
  };
}

/**
 * 根据书籍分类返回默认场景（无需AI调用）
 */
export function getDefaultScene(category?: string): BookScene {
  const categorySceneMap: Record<string, BookScene> = {
    '文学': {
      sceneType: 'nature',
      description: '湖畔微风，柳枝轻摇',
      config: {
        palette: ['#2d4a3e', '#4a7c6f', '#8fb8a8'],
        elements: ['water', 'willows', 'mist'],
        mood: 'serene',
        timeOfDay: 'dusk',
      },
    },
    '诗歌': {
      sceneType: 'nature',
      description: '月下清泉，萤火点点',
      config: {
        palette: ['#1a1a2e', '#2d3a5c', '#5c7aa8'],
        elements: ['moonlight', 'fireflies', 'water'],
        mood: 'serene',
        timeOfDay: 'night',
      },
    },
    '商业': {
      sceneType: 'interior',
      description: '深沉书房，炉火温暖',
      config: {
        palette: ['#8b4513', '#d2691e', '#f4a460'],
        elements: ['fireplace', 'bookshelf', 'candle'],
        mood: 'solemn',
        timeOfDay: 'night',
      },
    },
    '管理': {
      sceneType: 'interior',
      description: '宁静书斋，烛光摇曳',
      config: {
        palette: ['#654321', '#8b6914', '#daa520'],
        elements: ['desk', 'candle', 'bookshelf'],
        mood: 'contemplative',
        timeOfDay: 'night',
      },
    },
    '科技': {
      sceneType: 'abstract',
      description: '数据星河，粒子流动',
      config: {
        palette: ['#0a0a2e', '#1a1a4e', '#3a3a8e'],
        elements: ['particles', 'grid', 'organic'],
        mood: 'energetic',
        timeOfDay: 'night',
      },
    },
    '哲学': {
      sceneType: 'abstract',
      description: '思维深渊，星辰闪烁',
      config: {
        palette: ['#1a0a2e', '#2e1a4e', '#5a3a8e'],
        elements: ['particles', 'nebula', 'organic'],
        mood: 'contemplative',
        timeOfDay: 'night',
      },
    },
  };

  if (category && categorySceneMap[category]) {
    return categorySceneMap[category];
  }

  // 通用默认场景
  return {
    sceneType: 'abstract',
    description: '静谧空间，光影浮动',
    config: {
      palette: ['#1D1D1F', '#2C3E50', '#34495E'],
      elements: ['particles', 'ambient'],
      mood: 'contemplative',
      timeOfDay: 'dusk',
    },
  };
}

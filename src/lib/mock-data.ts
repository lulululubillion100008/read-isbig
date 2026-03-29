import type { BookSummary } from '@/lib/types';

export const mockSummaries: BookSummary[] = [
  {
    id: 'summary-1',
    bookId: 'book-1',
    book: {
      id: 'book-1',
      title: '思考，快与慢',
      author: '丹尼尔·卡尼曼',
      category: '心理学',
      description: '诺贝尔经济学奖得主的思维之作，揭示人类决策的两套系统。',
      createdAt: new Date('2024-01-15'),
    },
    theme: {
      primaryColor: '#E53935',
      secondaryColor: '#FF8A80',
      accentColor: '#D32F2F',
      sidebarBg: '#1A1A1A',
      bannerBg: '#212121',
      bannerText: '#FFFFFF',
      connectorColor: '#E53935',
      conceptBoxBorder: '#E53935',
      highlightColor: '#E53935',
      backgroundPattern: 'dots',
      fontStyle: 'modern',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 双系统理论',
        sections: [
          {
            type: 'header',
            content: '人类思维的两套系统',
          },
          {
            type: 'concept-box',
            content: '系统1: 快思考',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '系统1的特征',
            children: [
              { type: 'text', content: '自动运行，无需努力' },
              { type: 'text', content: '基于直觉和经验' },
              { type: 'text', content: '速度极快，但容易出错' },
            ],
          },
          {
            type: 'concept-box',
            content: '系统2: 慢思考',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '系统2的特征',
            children: [
              { type: 'text', content: '需要集中注意力' },
              { type: 'text', content: '逻辑推理和分析' },
              { type: 'text', content: '速度慢，但更准确' },
            ],
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 认知偏差',
        sections: [
          {
            type: 'header',
            content: '常见的认知偏差',
          },
          {
            type: 'numbered-list',
            content: '六大认知偏差',
            items: [
              {
                number: 1,
                title: '锚定效应',
                description: '我们的判断会被最先接触的信息所影响。',
              },
              {
                number: 2,
                title: '可得性偏差',
                description: '越容易想到的事情，我们越觉得它发生的概率高。',
              },
              {
                number: 3,
                title: '损失厌恶',
                description: '失去100元的痛苦大于获得100元的快乐。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '认识偏差不是缺点，而是大脑进化的结果。',
          },
          {
            type: 'quote',
            content: '"我们对自己的了解，远不如自己以为的那么多。" —— 卡尼曼',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 实践应用',
        sections: [
          {
            type: 'header',
            content: '如何利用双系统做出更好的决策',
          },
          {
            type: 'card-group',
            content: '实践建议',
            children: [
              {
                type: 'text',
                content: '重要决策时，刻意启动系统2进行深度思考。',
                emphasis: true,
              },
              {
                type: 'text',
                content: '建立检查清单，减少系统1的盲区。',
              },
              {
                type: 'text',
                content: '用数据替代直觉，尤其在统计问题上。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '最好的决策者，是能够在两套系统之间灵活切换的人。',
          },
        ],
      },
    ],
    readingTime: 15,
    generatedAt: new Date('2024-06-01'),
  },
  {
    id: 'summary-2',
    bookId: 'book-2',
    book: {
      id: 'book-2',
      title: '原则',
      author: '瑞·达利欧',
      category: '商业',
      description: '桥水基金创始人的人生和工作原则。',
      createdAt: new Date('2024-02-10'),
    },
    theme: {
      primaryColor: '#1565C0',
      secondaryColor: '#90CAF9',
      accentColor: '#0D47A1',
      sidebarBg: '#0D1B2A',
      bannerBg: '#1B2838',
      bannerText: '#FFFFFF',
      connectorColor: '#1565C0',
      conceptBoxBorder: '#1565C0',
      highlightColor: '#1565C0',
      backgroundPattern: 'lines',
      fontStyle: 'bold',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 生活原则',
        sections: [
          {
            type: 'header',
            content: '拥抱现实，应对现实',
          },
          {
            type: 'concept-box',
            content: '极度透明 + 极度真实',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '核心生活原则',
            children: [
              { type: 'text', content: '痛苦 + 反思 = 进步' },
              { type: 'text', content: '做到头脑极度开放' },
              { type: 'text', content: '理解人与人大不相同' },
            ],
          },
          {
            type: 'highlight',
            content: '生活中最重要的事情是你要成为什么样的人，以及你为此做了什么。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 工作原则',
        sections: [
          {
            type: 'header',
            content: '打造极度透明的组织',
          },
          {
            type: 'numbered-list',
            content: '五步流程',
            items: [
              { number: 1, title: '明确目标', description: '知道自己想要什么。' },
              { number: 2, title: '发现问题', description: '识别阻碍目标实现的障碍。' },
              { number: 3, title: '诊断根因', description: '找到问题的根本原因。' },
              { number: 4, title: '规划方案', description: '设计解决问题的方案。' },
              { number: 5, title: '坚决执行', description: '落实方案，达成目标。' },
            ],
          },
          {
            type: 'quote',
            content: '"失败是成功的前奏。" —— 瑞·达利欧',
          },
        ],
      },
    ],
    readingTime: 12,
    generatedAt: new Date('2024-06-15'),
  },
  {
    id: 'summary-3',
    bookId: 'book-3',
    book: {
      id: 'book-3',
      title: '人类简史',
      author: '尤瓦尔·赫拉利',
      category: '历史',
      description: '从动物到上帝，人类如何走到今天。',
      createdAt: new Date('2024-03-05'),
    },
    theme: {
      primaryColor: '#2E7D32',
      secondaryColor: '#A5D6A7',
      accentColor: '#1B5E20',
      sidebarBg: '#1A2E1A',
      bannerBg: '#2E3B2E',
      bannerText: '#FFFFFF',
      connectorColor: '#2E7D32',
      conceptBoxBorder: '#2E7D32',
      highlightColor: '#2E7D32',
      backgroundPattern: 'waves',
      fontStyle: 'classic',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 认知革命',
        sections: [
          {
            type: 'header',
            content: '想象的力量',
          },
          {
            type: 'concept-box',
            content: '认知革命: 约7万年前',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '人类与其他动物的区别',
            children: [
              { type: 'text', content: '语言：不仅描述现实，还能创造虚构故事' },
              { type: 'text', content: '合作：通过共同神话实现大规模协作' },
              { type: 'text', content: '想象力：金钱、国家、法律都是想象的产物' },
            ],
          },
          {
            type: 'highlight',
            content: '智人之所以能统治世界，是因为我们是唯一能编造并相信虚构故事的动物。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 农业革命',
        sections: [
          {
            type: 'header',
            content: '历史上最大的骗局',
          },
          {
            type: 'text',
            content: '农业革命让人类从采集者变成了农民，但并没有让生活变得更好。',
          },
          {
            type: 'mindmap-branch',
            content: '农业革命的代价',
            children: [
              { type: 'text', content: '饮食单一化，健康下降' },
              { type: 'text', content: '劳动时间大幅增加' },
              { type: 'text', content: '社会不平等开始出现' },
            ],
          },
          {
            type: 'quote',
            content: '"不是我们驯化了小麦，而是小麦驯化了我们。" —— 赫拉利',
          },
        ],
      },
    ],
    readingTime: 14,
    generatedAt: new Date('2024-07-01'),
  },
  {
    id: 'summary-4',
    bookId: 'book-4',
    book: {
      id: 'book-4',
      title: '被讨厌的勇气',
      author: '岸见一郎 / 古贺史健',
      category: '哲学',
      description: '阿德勒心理学的通俗解读，关于自由与幸福的对话。',
      createdAt: new Date('2024-04-20'),
    },
    theme: {
      primaryColor: '#F57C00',
      secondaryColor: '#FFE0B2',
      accentColor: '#E65100',
      sidebarBg: '#2E1A00',
      bannerBg: '#3E2723',
      bannerText: '#FFFFFF',
      connectorColor: '#F57C00',
      conceptBoxBorder: '#F57C00',
      highlightColor: '#F57C00',
      backgroundPattern: 'grid',
      fontStyle: 'elegant',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 课题分离',
        sections: [
          {
            type: 'header',
            content: '一切烦恼皆来自人际关系',
          },
          {
            type: 'concept-box',
            content: '课题分离',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '课题分离的核心',
            children: [
              { type: 'text', content: '分清「这是谁的课题」' },
              { type: 'text', content: '不干涉别人的课题' },
              { type: 'text', content: '也不让别人干涉自己的课题' },
            ],
          },
          {
            type: 'highlight',
            content: '自由就是被别人讨厌。如果你害怕被讨厌，就永远不会自由。',
          },
        ],
      },
    ],
    readingTime: 10,
    generatedAt: new Date('2024-07-15'),
  },
];

export function getMockSummaryByBookId(bookId: string): BookSummary | undefined {
  return mockSummaries.find((s) => s.bookId === bookId);
}

export function searchMockBooks(query: string): BookSummary[] {
  if (!query.trim()) return mockSummaries;
  const q = query.toLowerCase();
  return mockSummaries.filter(
    (s) =>
      s.book.title.toLowerCase().includes(q) ||
      s.book.author.toLowerCase().includes(q) ||
      (s.book.category && s.book.category.toLowerCase().includes(q))
  );
}

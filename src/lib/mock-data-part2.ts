import type { BookSummary } from '@/lib/types';

export const summariesPart2: BookSummary[] = [
  {
    id: 'summary-11',
    bookId: 'book-11',
    book: {
      id: 'book-11',
      title: '射雕英雄传',
      author: '金庸',
      category: '武侠',
      description: '金庸"射雕三部曲"的开篇之作，郭靖与黄蓉的传奇故事。',
      createdAt: new Date('2024-03-01'),
    },
    theme: {
      primaryColor: '#8B4513',
      secondaryColor: '#D2691E',
      accentColor: '#A0522D',
      sidebarBg: '#1C1008',
      bannerBg: '#2C1A0E',
      bannerText: '#F5DEB3',
      connectorColor: '#8B4513',
      conceptBoxBorder: '#D2691E',
      highlightColor: '#CD853F',
      backgroundPattern: 'waves',
      fontStyle: 'classic',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 大漠风沙·少年郭靖',
        sections: [
          {
            type: 'header',
            content: '侠之大者，为国为民',
          },
          {
            type: 'concept-box',
            content: '郭靖：天资愚钝却心志坚定的少年英雄',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '郭靖的成长之路',
            children: [
              { type: 'text', content: '蒙古大漠中长大，性格质朴忠厚' },
              { type: 'text', content: '拜江南七怪为师，勤学苦练不辍' },
              { type: 'text', content: '得洪七公传授降龙十八掌，武功大进' },
              { type: 'text', content: '与黄蓉相遇，开启传奇人生' },
            ],
          },
          {
            type: 'highlight',
            content: '金庸以郭靖证明：天赋不足可以用毅力弥补，真正的英雄不在聪明，而在坚持。',
          },
          {
            type: 'quote',
            content: '"靖哥哥，你虽然笨，但你是天底下最好的人。" —— 黄蓉',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 五绝争锋·武林格局',
        sections: [
          {
            type: 'header',
            content: '华山论剑与天下五绝',
          },
          {
            type: 'numbered-list',
            content: '天下五绝',
            items: [
              { number: 1, title: '东邪黄药师', description: '桃花岛主，博学多才，亦正亦邪，蔑视礼法。' },
              { number: 2, title: '西毒欧阳锋', description: '白驼山庄主，心狠手辣，一生追求武功天下第一。' },
              { number: 3, title: '南帝段智兴', description: '大理国皇帝，精通一阳指，后出家为僧号一灯大师。' },
              { number: 4, title: '北丐洪七公', description: '丐帮帮主，侠义心肠，降龙十八掌震古烁今。' },
              { number: 5, title: '中神通王重阳', description: '全真教创始人，天下武功第一，英年早逝。' },
            ],
          },
          {
            type: 'highlight',
            content: '五绝代表了五种不同的人生哲学：自由、野心、慈悲、正义、超脱。',
          },
          {
            type: 'text',
            content: '华山论剑不仅是武功的较量，更是金庸对不同价值观的深刻探讨。每一位绝顶高手背后，都有一段令人唏嘘的故事。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 蓉儿智慧·才女风华',
        sections: [
          {
            type: 'header',
            content: '黄蓉：才貌双全的奇女子',
          },
          {
            type: 'concept-box',
            content: '黄蓉与郭靖：互补型伴侣的典范',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '黄蓉的多面才华',
            children: [
              { type: 'text', content: '智谋过人：多次以智慧化解危机，是郭靖的军师' },
              { type: 'text', content: '厨艺精湛：以美食打动洪七公，换取武功传授' },
              { type: 'text', content: '博学多识：琴棋书画无所不通，深得父亲真传' },
              { type: 'text', content: '武功不俗：打狗棒法与兰花拂穴手独步江湖' },
            ],
          },
          {
            type: 'highlight',
            content: '黄蓉的聪明与郭靖的忠厚形成完美互补，金庸以此揭示：最好的爱情是彼此成就。',
          },
          {
            type: 'quote',
            content: '"我偏要勉强。" —— 黄蓉面对困难时的态度',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 家国情怀·侠义精神',
        sections: [
          {
            type: 'header',
            content: '从个人恩怨到家国天下',
          },
          {
            type: 'mindmap-branch',
            content: '射雕的主题层次',
            children: [
              { type: 'text', content: '第一层：个人成长——郭靖从愚钝少年到一代大侠' },
              { type: 'text', content: '第二层：爱情婚姻——郭靖黄蓉的相知相守' },
              { type: 'text', content: '第三层：江湖恩怨——正邪之争与武林纷争' },
              { type: 'text', content: '第四层：家国情怀——襄阳保卫战的壮烈牺牲' },
            ],
          },
          {
            type: 'concept-box',
            content: '侠之大者，为国为民——金庸武侠的终极命题',
            emphasis: true,
          },
          {
            type: 'text',
            content: '郭靖守襄阳城数十年，最终城破殉国。他用一生诠释了什么是真正的侠义：不是快意恩仇，而是为苍生担当。',
          },
          {
            type: 'highlight',
            content: '《射雕》超越了一般武侠小说的格局，将个人命运与民族存亡紧密相连。',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '第五章: 文学价值·深远影响',
        sections: [
          {
            type: 'header',
            content: '射雕的文学地位与文化影响',
          },
          {
            type: 'numbered-list',
            content: '射雕的文学成就',
            items: [
              { number: 1, title: '人物塑造', description: '创造了华语文学中最经典的英雄形象和爱情故事。' },
              { number: 2, title: '结构创新', description: '将历史背景与虚构情节完美融合，开创武侠小说新境界。' },
              { number: 3, title: '思想深度', description: '探讨了英雄、正义、爱情、家国等永恒主题。' },
            ],
          },
          {
            type: 'card-group',
            content: '射雕带来的启示',
            children: [
              { type: 'text', content: '坚持与毅力可以弥补天赋的不足' },
              { type: 'text', content: '真正的英雄是心怀天下的人' },
              { type: 'text', content: '最好的爱情建立在相互尊重与成就之上' },
            ],
          },
          {
            type: 'quote',
            content: '"飞雪连天射白鹿，笑书神侠倚碧鸳。" —— 金庸十四部小说首字联',
          },
        ],
      },
    ],
    readingTime: 17,
    generatedAt: new Date('2024-06-11'),
  },
  {
    id: 'summary-12',
    bookId: 'book-12',
    book: {
      id: 'book-12',
      title: '未来简史',
      author: '尤瓦尔·赫拉利',
      category: '社科',
      description: '探讨人类未来将如何被科技、算法和人工智能重塑。',
      createdAt: new Date('2024-03-05'),
    },
    theme: {
      primaryColor: '#00BCD4',
      secondaryColor: '#80DEEA',
      accentColor: '#0097A7',
      sidebarBg: '#0A1628',
      bannerBg: '#0D2137',
      bannerText: '#E0F7FA',
      connectorColor: '#00BCD4',
      conceptBoxBorder: '#00BCD4',
      highlightColor: '#26C6DA',
      backgroundPattern: 'grid',
      fontStyle: 'modern',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 人类的新议题',
        sections: [
          {
            type: 'header',
            content: '征服饥荒、瘟疫与战争之后',
          },
          {
            type: 'concept-box',
            content: '人类历史上三大敌人已基本被征服',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '人类的新目标',
            children: [
              { type: 'text', content: '追求永生：生物技术延长寿命' },
              { type: 'text', content: '获得幸福：通过生化手段调控情绪' },
              { type: 'text', content: '化身为神：技术赋予人类神一般的创造力' },
            ],
          },
          {
            type: 'highlight',
            content: '21世纪人类的核心议题不再是生存，而是如何升级成"神人"（Homo Deus）。',
          },
          {
            type: 'text',
            content: '赫拉利指出，历史上第一次，死于营养过剩的人多于饿死的人，死于自杀的人多于死于战争的人。人类正在进入一个全新的时代。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 数据主义的崛起',
        sections: [
          {
            type: 'header',
            content: '从人文主义到数据主义',
          },
          {
            type: 'numbered-list',
            content: '人类信仰的演变',
            items: [
              { number: 1, title: '神权时代', description: '一切权威来自上帝，宗教主导社会秩序。' },
              { number: 2, title: '人文主义时代', description: '个人体验和感受成为最高权威。' },
              { number: 3, title: '数据主义时代', description: '算法比你更了解你自己，数据流成为最高价值。' },
            ],
          },
          {
            type: 'concept-box',
            content: '数据主义：宇宙由数据流组成，任何事物的价值取决于对数据处理的贡献',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"算法正在观察你，它比你更了解你自己。" —— 赫拉利',
          },
          {
            type: 'highlight',
            content: '当算法比你更了解你自己时，人文主义的核心信条——"听从内心"——将变得毫无意义。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 人类的价值危机',
        sections: [
          {
            type: 'header',
            content: '当算法取代人类决策',
          },
          {
            type: 'card-group',
            content: '人工智能带来的挑战',
            children: [
              { type: 'text', content: '就业危机：大量工作被自动化取代，"无用阶级"出现' },
              { type: 'text', content: '自由意志：算法替人做决定，个人选择权被侵蚀' },
              { type: 'text', content: '不平等加剧：技术精英与普通人的鸿沟越来越大' },
              { type: 'text', content: '意义丧失：人类在宇宙中的特殊地位受到根本质疑' },
            ],
          },
          {
            type: 'highlight',
            content: '未来最大的问题不是人工智能产生意识，而是人类可能失去存在的意义。',
          },
          {
            type: 'text',
            content: '赫拉利警告：如果我们不反思科技发展的方向，人类可能会亲手创造出自己的替代者。这不是科幻，而是正在发生的现实。',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 未来的选择',
        sections: [
          {
            type: 'header',
            content: '我们能否主宰自己的命运？',
          },
          {
            type: 'mindmap-branch',
            content: '面对未来的关键思考',
            children: [
              { type: 'text', content: '技术不是命运：我们可以选择如何使用技术' },
              { type: 'text', content: '政治选择至关重要：需要新的社会契约' },
              { type: 'text', content: '教育需要革新：培养适应性而非专业技能' },
              { type: 'text', content: '全球合作：跨国问题需要跨国解决方案' },
            ],
          },
          {
            type: 'numbered-list',
            content: '赫拉利的建议',
            items: [
              { number: 1, title: '认识自己', description: '在算法认识你之前，先深入了解自己。' },
              { number: 2, title: '保持学习', description: '持续更新认知，适应快速变化的世界。' },
              { number: 3, title: '质疑叙事', description: '不要盲目接受任何宏大叙事。' },
            ],
          },
          {
            type: 'quote',
            content: '"在一个信息爆炸的世界里，清晰的思考就是力量。" —— 赫拉利',
          },
          {
            type: 'highlight',
            content: '未来不是注定的——但如果我们不主动塑造它，就会被它塑造。',
          },
        ],
      },
    ],
    readingTime: 13,
    generatedAt: new Date('2024-06-12'),
  },
  {
    id: 'summary-13',
    bookId: 'book-13',
    book: {
      id: 'book-13',
      title: '干法',
      author: '稻盛和夫',
      category: '管理',
      description: '关于工作的哲学，揭示通过热爱工作实现人生价值的秘诀。',
      createdAt: new Date('2024-03-10'),
    },
    theme: {
      primaryColor: '#FF6F00',
      secondaryColor: '#FFB74D',
      accentColor: '#E65100',
      sidebarBg: '#1A1206',
      bannerBg: '#2D1F0A',
      bannerText: '#FFF8E1',
      connectorColor: '#FF6F00',
      conceptBoxBorder: '#FF6F00',
      highlightColor: '#FFA000',
      backgroundPattern: 'dots',
      fontStyle: 'bold',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 工作的意义',
        sections: [
          {
            type: 'header',
            content: '为什么要热爱工作？',
          },
          {
            type: 'concept-box',
            content: '工作是磨炼灵魂的修行',
            emphasis: true,
          },
          {
            type: 'text',
            content: '稻盛和夫认为，工作不仅仅是谋生手段，更是提升心性、磨炼灵魂的最佳方式。一个人如果能够全身心投入工作，就能体会到人生的充实与幸福。',
          },
          {
            type: 'mindmap-branch',
            content: '工作态度的三个层次',
            children: [
              { type: 'text', content: '不燃型：需要外部驱动才能工作' },
              { type: 'text', content: '可燃型：受到激励后能燃烧' },
              { type: 'text', content: '自燃型：自己就能熊熊燃烧的人' },
            ],
          },
          {
            type: 'highlight',
            content: '要成为"自燃型"的人——不需要别人点燃，自己就能燃烧。',
          },
          {
            type: 'quote',
            content: '"工作即修行，极致即开悟。" —— 稻盛和夫',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 付出不亚于任何人的努力',
        sections: [
          {
            type: 'header',
            content: '持续努力的力量',
          },
          {
            type: 'numbered-list',
            content: '稻盛和夫的工作方程式',
            items: [
              { number: 1, title: '人生·工作结果 = 思维方式 × 热情 × 能力', description: '思维方式可以是负数，它决定了结果的方向。' },
              { number: 2, title: '热情（0-100分）', description: '发自内心地热爱工作，比天赋更重要。' },
              { number: 3, title: '能力（0-100分）', description: '能力可以通过持续学习和实践来提升。' },
            ],
          },
          {
            type: 'concept-box',
            content: '思维方式决定一切：即使能力和热情再高，错误的思维方式会让结果变成负数',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '一个拥有正确思维方式、满腔热情的普通人，可以超越一个才华横溢但心态消极的天才。',
          },
          {
            type: 'text',
            content: '稻盛和夫自己就是这个方程式的最佳证明：他大学成绩平平，第一份工作几乎想辞职，但凭借持续的努力创建了两家世界500强企业。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 将工作做到极致',
        sections: [
          {
            type: 'header',
            content: '追求完美主义',
          },
          {
            type: 'card-group',
            content: '极致工作的要素',
            children: [
              { type: 'text', content: '每天进步一点点：今天比昨天好，明天比今天好' },
              { type: 'text', content: '注重细节：魔鬼在细节中，产品要做到零缺陷' },
              { type: 'text', content: '创造性工作：每天都要思考如何改进，不做重复劳动' },
              { type: 'text', content: '以高标准要求自己：不是"够好就行"，而是"追求完美"' },
            ],
          },
          {
            type: 'highlight',
            content: '当你把工作当作自己的作品来打磨时，工作就不再是负担，而是创作。',
          },
          {
            type: 'quote',
            content: '"已经很好了"是进步的最大敌人。要持续追问"还能不能更好"。',
          },
          {
            type: 'text',
            content: '稻盛创建京瓷时，要求陶瓷产品的精度达到毫米级别，远超客户要求。正是这种极致追求，让京瓷成为世界顶级精密陶瓷企业。',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 利他之心',
        sections: [
          {
            type: 'header',
            content: '从利己到利他的升华',
          },
          {
            type: 'mindmap-branch',
            content: '利他经营哲学',
            children: [
              { type: 'text', content: '为员工：让员工在物质和精神上都获得幸福' },
              { type: 'text', content: '为客户：提供超越期望的产品和服务' },
              { type: 'text', content: '为社会：企业应当回馈社会，承担责任' },
            ],
          },
          {
            type: 'concept-box',
            content: '敬天爱人：尊重天理，关爱他人',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '干法的核心启示',
            items: [
              { number: 1, title: '热爱工作', description: '把工作当作人生修行，全力以赴。' },
              { number: 2, title: '持续努力', description: '付出不亚于任何人的努力。' },
              { number: 3, title: '追求极致', description: '在每个细节上精益求精。' },
              { number: 4, title: '利他之心', description: '为他人创造价值，最终也成就自己。' },
            ],
          },
          {
            type: 'highlight',
            content: '稻盛和夫用一生证明：工作的终极意义不是赚钱，而是通过工作成为更好的人。',
          },
        ],
      },
    ],
    readingTime: 10,
    generatedAt: new Date('2024-06-13'),
  },
  {
    id: 'summary-14',
    bookId: 'book-14',
    book: {
      id: 'book-14',
      title: '流浪地球',
      author: '刘慈欣',
      category: '科幻',
      description: '人类带着地球流浪宇宙的壮阔史诗。',
      createdAt: new Date('2024-03-15'),
    },
    theme: {
      primaryColor: '#283593',
      secondaryColor: '#7986CB',
      accentColor: '#1A237E',
      sidebarBg: '#080C1A',
      bannerBg: '#0D1230',
      bannerText: '#C5CAE9',
      connectorColor: '#3F51B5',
      conceptBoxBorder: '#283593',
      highlightColor: '#5C6BC0',
      backgroundPattern: 'lines',
      fontStyle: 'modern',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 太阳危机',
        sections: [
          {
            type: 'header',
            content: '当太阳即将毁灭',
          },
          {
            type: 'concept-box',
            content: '氦闪：太阳将在400年内急剧膨胀，吞噬地球',
            emphasis: true,
          },
          {
            type: 'text',
            content: '科学家发现太阳内部的氢正在急速聚变，太阳将经历一次致命的"氦闪"。届时太阳体积将膨胀至吞没地球轨道，人类文明面临灭顶之灾。',
          },
          {
            type: 'mindmap-branch',
            content: '人类的两种选择',
            children: [
              { type: 'text', content: '方案A：建造飞船逃离——但无法承载全部人类' },
              { type: 'text', content: '方案B：流浪地球计划——带着整个地球一起逃亡' },
            ],
          },
          {
            type: 'highlight',
            content: '人类选择了最疯狂也最伟大的方案：不抛弃家园，带着地球去流浪。',
          },
          {
            type: 'quote',
            content: '"我没见过黑夜，我没见过星星，我没见过春天、秋天和冬天。" —— 流浪地球时代的孩子',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 流浪地球计划',
        sections: [
          {
            type: 'header',
            content: '人类史上最宏大的工程',
          },
          {
            type: 'numbered-list',
            content: '流浪地球五步计划',
            items: [
              { number: 1, title: '刹车时代', description: '用地球发动机使地球停止自转。' },
              { number: 2, title: '逃逸时代', description: '全功率开动发动机，使地球飞出太阳系。' },
              { number: 3, title: '流浪时代I（加速）', description: '在外太空中加速，飞向半人马座比邻星。' },
              { number: 4, title: '流浪时代II（减速）', description: '在中途开始减速。' },
              { number: 5, title: '新太阳时代', description: '泊入比邻星轨道，开始新的文明。' },
            ],
          },
          {
            type: 'highlight',
            content: '整个计划将持续2500年，跨越100代人。没有人能看到终点，但每一代人都在为后人铺路。',
          },
          {
            type: 'text',
            content: '一万两千台地球发动机矗立在亚欧大陆上，每台高达一万一千米，比珠穆朗玛峰还要高。它们喷射出的等离子体光柱，成为流浪时代人类唯一的光源。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 人性的考验',
        sections: [
          {
            type: 'header',
            content: '末日之下的人性光辉与黑暗',
          },
          {
            type: 'card-group',
            content: '流浪时代的社会变迁',
            children: [
              { type: 'text', content: '地表变为冰封荒原，人类迁入地下城生活' },
              { type: 'text', content: '爱情和家庭观念发生巨变，人们不再执着于长久关系' },
              { type: 'text', content: '教育完全转向理工科，文学艺术被视为奢侈品' },
              { type: 'text', content: '全球统一政府建立，一切资源用于流浪计划' },
            ],
          },
          {
            type: 'concept-box',
            content: '信任危机：当太阳看起来一切正常时，人们开始怀疑流浪计划是骗局',
            emphasis: true,
          },
          {
            type: 'text',
            content: '叛军推翻了联合政府，将坚持流浪计划的科学家和官员处以极刑。然而就在这一刻，太阳氦闪爆发，证明了流浪计划的正确。这是人类历史上最惨烈的讽刺。',
          },
          {
            type: 'highlight',
            content: '刘慈欣揭示了一个残酷的真相：人类最大的敌人不是宇宙，而是自己的猜疑与恐惧。',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 科幻与现实',
        sections: [
          {
            type: 'header',
            content: '流浪地球的深层思考',
          },
          {
            type: 'mindmap-branch',
            content: '作品的多维解读',
            children: [
              { type: 'text', content: '科学维度：硬科幻的极致想象，物理学原理严谨' },
              { type: 'text', content: '哲学维度：存在的意义在于前行本身' },
              { type: 'text', content: '社会维度：集体主义与个人自由的冲突' },
              { type: 'text', content: '人性维度：希望与绝望之间的永恒拉锯' },
            ],
          },
          {
            type: 'quote',
            content: '"希望是这个时代像钻石一样珍贵的东西。" —— 流浪地球',
          },
          {
            type: 'numbered-list',
            content: '流浪地球的启示',
            items: [
              { number: 1, title: '团结的力量', description: '面对共同危机，人类可以团结完成不可能的任务。' },
              { number: 2, title: '长期主义', description: '真正伟大的事业，需要跨越代际的坚持。' },
              { number: 3, title: '理性与信任', description: '科学精神和相互信任是文明存续的基石。' },
            ],
          },
          {
            type: 'highlight',
            content: '刘慈欣用一个关于逃亡的故事，写出了人类最壮丽的诗篇：即使前路漫漫，也绝不放弃。',
          },
        ],
      },
    ],
    readingTime: 11,
    generatedAt: new Date('2024-06-14'),
  },
  {
    id: 'summary-15',
    bookId: 'book-15',
    book: {
      id: 'book-15',
      title: '穷查理宝典',
      author: '查理·芒格',
      category: '商业',
      description: '巴菲特的黄金搭档查理·芒格的智慧箴言录。',
      createdAt: new Date('2024-03-20'),
    },
    theme: {
      primaryColor: '#2E7D32',
      secondaryColor: '#81C784',
      accentColor: '#1B5E20',
      sidebarBg: '#0A1A0D',
      bannerBg: '#122A16',
      bannerText: '#E8F5E9',
      connectorColor: '#2E7D32',
      conceptBoxBorder: '#2E7D32',
      highlightColor: '#43A047',
      backgroundPattern: 'none',
      fontStyle: 'classic',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 多元思维模型',
        sections: [
          {
            type: 'header',
            content: '跨学科的智慧框架',
          },
          {
            type: 'concept-box',
            content: '手里只有锤子的人，看什么都像钉子',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '核心思维模型',
            children: [
              { type: 'text', content: '心理学：人类误判心理学，识别认知偏差' },
              { type: 'text', content: '经济学：机会成本、激励机制、规模效应' },
              { type: 'text', content: '数学：复利效应、概率论、排列组合' },
              { type: 'text', content: '生物学：进化论、适者生存、协同效应' },
              { type: 'text', content: '物理学：临界质量、势能与动能转化' },
            ],
          },
          {
            type: 'highlight',
            content: '芒格主张建立100个以上的思维模型，从不同学科的角度分析问题，才能做出明智的决策。',
          },
          {
            type: 'text',
            content: '芒格是一位跨学科的通才，他广泛阅读物理、生物、心理学、历史等领域的书籍，并将这些知识融会贯通，形成了独特的多元思维模型体系。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 人类误判心理学',
        sections: [
          {
            type: 'header',
            content: '25种常见的心理误判',
          },
          {
            type: 'numbered-list',
            content: '关键心理误判倾向',
            items: [
              { number: 1, title: '激励与惩罚超级效应', description: '永远不要低估激励的力量，人们会按照激励的方向行动。' },
              { number: 2, title: '喜爱/厌恶倾向', description: '我们倾向于忽视自己喜欢的人/事物的缺点。' },
              { number: 3, title: '避免不一致性倾向', description: '人类大脑抵制改变，已有观念很难被纠正。' },
              { number: 4, title: '社会认同倾向', description: '人们倾向于模仿周围人的行为，尤其是在不确定时。' },
            ],
          },
          {
            type: 'highlight',
            content: '了解心理误判不是为了操纵他人，而是为了避免自己被这些偏差所操纵。',
          },
          {
            type: 'quote',
            content: '"我这辈子遇到的聪明人没有不每天阅读的——没有，一个都没有。" —— 芒格',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 投资哲学',
        sections: [
          {
            type: 'header',
            content: '逆向思维与能力圈',
          },
          {
            type: 'concept-box',
            content: '反过来想，总是反过来想',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '芒格的投资原则',
            children: [
              { type: 'text', content: '能力圈：只投资自己真正理解的领域' },
              { type: 'text', content: '安全边际：以远低于内在价值的价格买入' },
              { type: 'text', content: '长期持有：找到伟大的公司，然后坐等' },
              { type: 'text', content: '集中投资：把鸡蛋放在少数篮子里，然后看好它们' },
            ],
          },
          {
            type: 'mindmap-branch',
            content: '逆向思维的应用',
            children: [
              { type: 'text', content: '不问"如何成功"，先问"如何避免失败"' },
              { type: 'text', content: '不找好公司，先排除坏公司' },
              { type: 'text', content: '不追求完美决策，先避免愚蠢错误' },
            ],
          },
          {
            type: 'highlight',
            content: '芒格说：如果我知道自己会死在哪里，我就永远不去那个地方。',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 人生智慧',
        sections: [
          {
            type: 'header',
            content: '简单生活与终身学习',
          },
          {
            type: 'numbered-list',
            content: '芒格的人生原则',
            items: [
              { number: 1, title: '终身学习', description: '每天睡前要比早上起床时更聪明一点。' },
              { number: 2, title: '延迟满足', description: '不贪图即时收益，愿意为长期目标付出等待。' },
              { number: 3, title: '诚实守信', description: '信誉是最重要的资产，永远不要做损害信誉的事。' },
              { number: 4, title: '理性决策', description: '用事实和逻辑决策，而非情绪和直觉。' },
            ],
          },
          {
            type: 'quote',
            content: '"获得智慧是一种道德责任，不仅仅是为了让自己的生活更美好。" —— 芒格',
          },
          {
            type: 'text',
            content: '芒格99岁辞世，留下了无数智慧箴言。他的人生本身就是对其哲学的最佳诠释：持续学习、理性思考、简单生活、诚实做人。',
          },
          {
            type: 'highlight',
            content: '穷查理宝典不仅是一本投资书，更是一本关于如何思考、如何生活的智慧之书。',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '第五章: 检查清单与实践',
        sections: [
          {
            type: 'header',
            content: '将智慧转化为行动',
          },
          {
            type: 'concept-box',
            content: '检查清单：用系统化的方法避免愚蠢错误',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '芒格的决策检查清单',
            children: [
              { type: 'text', content: '是否在自己的能力圈内？' },
              { type: 'text', content: '是否存在重大的心理误判风险？' },
              { type: 'text', content: '反过来想，最坏的情况是什么？' },
              { type: 'text', content: '激励机制是否合理？谁在从中受益？' },
              { type: 'text', content: '是否有足够的安全边际？' },
            ],
          },
          {
            type: 'mindmap-branch',
            content: '总结：芒格思维的核心',
            children: [
              { type: 'text', content: '跨学科思维：从多个角度理解世界' },
              { type: 'text', content: '逆向思维：先避免错误，再追求正确' },
              { type: 'text', content: '理性主义：用事实和逻辑取代情绪' },
            ],
          },
          {
            type: 'quote',
            content: '"让自己配得上你想要的东西。" —— 芒格',
          },
        ],
      },
    ],
    readingTime: 14,
    generatedAt: new Date('2024-06-15'),
  },
  {
    id: 'summary-16',
    bookId: 'book-16',
    book: {
      id: 'book-16',
      title: '百年孤独',
      author: '加西亚·马尔克斯',
      category: '文学',
      description: '魔幻现实主义文学的巅峰之作，布恩迪亚家族七代人的传奇故事。',
      createdAt: new Date('2024-03-25'),
    },
    theme: {
      primaryColor: '#F9A825',
      secondaryColor: '#FFF176',
      accentColor: '#F57F17',
      sidebarBg: '#1A1500',
      bannerBg: '#2D2400',
      bannerText: '#FFFDE7',
      connectorColor: '#F9A825',
      conceptBoxBorder: '#F9A825',
      highlightColor: '#FFD600',
      backgroundPattern: 'waves',
      fontStyle: 'elegant',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 马孔多的诞生',
        sections: [
          {
            type: 'header',
            content: '一个家族与一座城的起源',
          },
          {
            type: 'quote',
            content: '"多年以后，面对行刑队，奥雷里亚诺·布恩迪亚上校将会回想起父亲带他去见识冰块的那个遥远的下午。" —— 开篇第一句',
          },
          {
            type: 'concept-box',
            content: '马孔多：一个被孤独笼罩的虚构小镇，拉丁美洲百年历史的缩影',
            emphasis: true,
          },
          {
            type: 'text',
            content: '何塞·阿尔卡蒂奥·布恩迪亚带领族人穿越丛林，建立了马孔多。这座小镇从一片蛮荒之地发展为繁华市镇，最终又归于毁灭——正如拉丁美洲的命运。',
          },
          {
            type: 'mindmap-branch',
            content: '开创者的特质',
            children: [
              { type: 'text', content: '无穷的好奇心：对新事物的痴迷探索' },
              { type: 'text', content: '执着到疯狂：为了炼金术和科学实验废寝忘食' },
              { type: 'text', content: '孤独的宿命：最终被绑在树上，在孤独中死去' },
            ],
          },
          {
            type: 'highlight',
            content: '马尔克斯用一个家族的故事，写尽了一个大陆的百年沧桑。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 循环的命运',
        sections: [
          {
            type: 'header',
            content: '七代人的轮回与宿命',
          },
          {
            type: 'numbered-list',
            content: '布恩迪亚家族的命运模式',
            items: [
              { number: 1, title: '重复的名字', description: '何塞·阿尔卡蒂奥和奥雷里亚诺的名字反复出现，暗示命运的循环。' },
              { number: 2, title: '重复的性格', description: '奥雷里亚诺们沉默孤僻，何塞们鲁莽热情——跨代遗传。' },
              { number: 3, title: '重复的错误', description: '每一代人都在重蹈前辈的覆辙，却从不从历史中学习。' },
            ],
          },
          {
            type: 'concept-box',
            content: '孤独是这个家族的诅咒：每个人都被困在自己的世界里，无法真正与他人连接',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '马尔克斯用循环叙事揭示：不了解历史的人注定重蹈覆辙。',
          },
          {
            type: 'text',
            content: '七代人中，有革命领袖、有暴君、有圣人、有荡妇、有学者、有疯子。他们各有各的命运，却共享同一种孤独。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 魔幻与现实',
        sections: [
          {
            type: 'header',
            content: '魔幻现实主义的艺术手法',
          },
          {
            type: 'card-group',
            content: '魔幻元素',
            children: [
              { type: 'text', content: '黄色蝴蝶：每当毛里西奥出现，黄蝴蝶漫天飞舞' },
              { type: 'text', content: '失眠症瘟疫：全镇人失眠并遗忘一切' },
              { type: 'text', content: '升天的美女：蕾梅黛丝抓着床单飞向天空' },
              { type: 'text', content: '持续四年的大雨：象征殖民掠夺后的衰败' },
            ],
          },
          {
            type: 'text',
            content: '马尔克斯的魔幻现实主义不是荒诞的幻想，而是用超现实的手法来表达拉丁美洲那些"看似不可能却真实发生"的事情。在那片土地上，现实本身就比魔幻更离奇。',
          },
          {
            type: 'highlight',
            content: '魔幻是手法，现实是目的——马尔克斯用最不可思议的方式讲述了最真实的故事。',
          },
          {
            type: 'quote',
            content: '"生命中真正重要的不是你遭遇了什么，而是你记住了哪些事，又是如何铭记的。" —— 马尔克斯',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 孤独的本质',
        sections: [
          {
            type: 'header',
            content: '孤独：人类永恒的困境',
          },
          {
            type: 'mindmap-branch',
            content: '孤独的多种面貌',
            children: [
              { type: 'text', content: '权力的孤独：奥雷里亚诺上校发动32场战争，最终在孤独中制作小金鱼' },
              { type: 'text', content: '爱情的孤独：阿玛兰妲拒绝所有追求者，独守一生' },
              { type: 'text', content: '知识的孤独：梅尔基亚德斯带来外部知识，却无人真正理解' },
              { type: 'text', content: '时代的孤独：马孔多被世界遗忘，封闭在自己的时间里' },
            ],
          },
          {
            type: 'concept-box',
            content: '孤独的反面不是陪伴，而是理解与连接',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '百年孤独的悲剧在于：每个人都渴望被理解，却没有人愿意先去理解别人。',
          },
          {
            type: 'text',
            content: '马尔克斯认为，孤独不仅是个人的命运，更是整个拉丁美洲的历史处境——被殖民、被剥削、被遗忘的大陆。',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '第五章: 预言与终结',
        sections: [
          {
            type: 'header',
            content: '羊皮卷的预言与家族的终结',
          },
          {
            type: 'text',
            content: '当最后一个布恩迪亚终于破译了梅尔基亚德斯的羊皮卷，他发现那上面记载的正是这个家族的全部历史。在他读完最后一行的同时，马孔多被飓风从地面上抹去。',
          },
          {
            type: 'quote',
            content: '"命定的家族将不会有在大地上第二次出现的机会。" —— 羊皮卷的最后一句',
          },
          {
            type: 'numbered-list',
            content: '百年孤独的文学价值',
            items: [
              { number: 1, title: '叙事创新', description: '打破线性时间，过去、现在、未来交织在一起。' },
              { number: 2, title: '文化表达', description: '让拉丁美洲的声音被全世界听到。' },
              { number: 3, title: '人类寓言', description: '超越地域和时代，讲述了人类共通的孤独体验。' },
            ],
          },
          {
            type: 'highlight',
            content: '《百年孤独》不仅是一部小说，更是一面镜子，让每个读者都能从中看到自己的孤独。',
          },
        ],
      },
    ],
    readingTime: 16,
    generatedAt: new Date('2024-06-16'),
  },
  {
    id: 'summary-17',
    bookId: 'book-17',
    book: {
      id: 'book-17',
      title: '刻意练习',
      author: '安德斯·艾利克森',
      category: '自我成长',
      description: '揭示从新手到大师的秘密，天才不是天生的，而是练出来的。',
      createdAt: new Date('2024-04-01'),
    },
    theme: {
      primaryColor: '#7B1FA2',
      secondaryColor: '#CE93D8',
      accentColor: '#6A1B9A',
      sidebarBg: '#120A1A',
      bannerBg: '#1E0E2D',
      bannerText: '#F3E5F5',
      connectorColor: '#7B1FA2',
      conceptBoxBorder: '#AB47BC',
      highlightColor: '#9C27B0',
      backgroundPattern: 'grid',
      fontStyle: 'bold',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 天才的真相',
        sections: [
          {
            type: 'header',
            content: '天才是练出来的',
          },
          {
            type: 'concept-box',
            content: '没有所谓的"天生天才"，杰出表现是大量刻意练习的结果',
            emphasis: true,
          },
          {
            type: 'text',
            content: '艾利克森研究了从音乐家到运动员、从国际象棋大师到外科医生的各类专家，发现他们的卓越能力都来自长期的刻意练习，而非天赋。所谓"天赋异禀"的背后，是数千小时的专注训练。',
          },
          {
            type: 'mindmap-branch',
            content: '推翻"天才论"的证据',
            children: [
              { type: 'text', content: '莫扎特：4岁前就接受了父亲高强度的音乐训练' },
              { type: 'text', content: '帕格尼尼：每天练琴超过8小时' },
              { type: 'text', content: '泰格·伍兹：2岁开始接受父亲的高尔夫训练' },
            ],
          },
          {
            type: 'highlight',
            content: '10000小时定律是一种误读——不是简单的重复，而是有目的、有反馈的刻意练习。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 刻意练习的原则',
        sections: [
          {
            type: 'header',
            content: '什么是真正的刻意练习？',
          },
          {
            type: 'numbered-list',
            content: '刻意练习的四大要素',
            items: [
              { number: 1, title: '明确的目标', description: '不是"变得更好"，而是"在某个具体方面达到某个具体标准"。' },
              { number: 2, title: '专注的注意力', description: '练习时必须全神贯注，心不在焉的重复毫无意义。' },
              { number: 3, title: '即时的反馈', description: '需要知道自己哪里做得好、哪里需要改进。' },
              { number: 4, title: '走出舒适区', description: '始终在能力边缘练习，做"刚好超出能力范围"的事。' },
            ],
          },
          {
            type: 'concept-box',
            content: '刻意练习 ≠ 简单重复：关键区别在于是否有目的性和反馈机制',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '一个有20年经验的医生，未必比一个有5年刻意练习经验的医生更优秀。经验年数不等于能力。',
          },
          {
            type: 'quote',
            content: '"如果你从不强迫自己走出舒适区，就永远无法进步。" —— 艾利克森',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 心理表征',
        sections: [
          {
            type: 'header',
            content: '专家大脑的秘密',
          },
          {
            type: 'concept-box',
            content: '心理表征：专家和新手的核心区别',
            emphasis: true,
          },
          {
            type: 'text',
            content: '心理表征是一种与我们大脑正在思考的某个物体、概念、信息相对应的心理结构。专家之所以卓越，是因为他们通过大量练习建立了更加精细、复杂的心理表征。',
          },
          {
            type: 'card-group',
            content: '心理表征的体现',
            children: [
              { type: 'text', content: '国际象棋大师：不是记住棋子位置，而是识别棋局模式' },
              { type: 'text', content: '优秀医生：看到的不是症状清单，而是疾病的整体图景' },
              { type: 'text', content: '顶级运动员：能提前预判对手动作，做出直觉反应' },
              { type: 'text', content: '作家大师：在脑中构建完整的叙事结构和人物关系' },
            ],
          },
          {
            type: 'highlight',
            content: '刻意练习的本质就是建立和优化心理表征——让大脑能更高效地处理信息。',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 实践指南',
        sections: [
          {
            type: 'header',
            content: '如何在生活中应用刻意练习',
          },
          {
            type: 'mindmap-branch',
            content: '实施刻意练习的步骤',
            children: [
              { type: 'text', content: '第一步：找到你所在领域的专家标准' },
              { type: 'text', content: '第二步：分解技能为可练习的子技能' },
              { type: 'text', content: '第三步：设计针对性的练习方案' },
              { type: 'text', content: '第四步：寻找能提供反馈的导师或系统' },
              { type: 'text', content: '第五步：持续监测进步并调整方案' },
            ],
          },
          {
            type: 'numbered-list',
            content: '常见误区',
            items: [
              { number: 1, title: '误区：天赋决定上限', description: '真相：刻意练习可以突破你认为的"天花板"。' },
              { number: 2, title: '误区：练习越多越好', description: '真相：低质量的重复不仅无用，还可能强化错误习惯。' },
              { number: 3, title: '误区：到了一定年龄就学不会了', description: '真相：大脑的可塑性终生存在，任何年龄都可以学习新技能。' },
            ],
          },
          {
            type: 'highlight',
            content: '刻意练习最大的启示是：你的潜力远比你以为的要大得多，前提是你愿意用正确的方法去开发它。',
          },
          {
            type: 'quote',
            content: '"最终的学习目标不是知识本身，而是改变——改变你的心理表征，从而改变你的表现。" —— 艾利克森',
          },
        ],
      },
    ],
    readingTime: 11,
    generatedAt: new Date('2024-06-17'),
  },
  {
    id: 'summary-18',
    bookId: 'book-18',
    book: {
      id: 'book-18',
      title: '自卑与超越',
      author: '阿尔弗雷德·阿德勒',
      category: '心理学',
      description: '个体心理学创始人阿德勒的经典之作，探讨自卑感与人生意义。',
      createdAt: new Date('2024-04-05'),
    },
    theme: {
      primaryColor: '#00695C',
      secondaryColor: '#80CBC4',
      accentColor: '#004D40',
      sidebarBg: '#051410',
      bannerBg: '#0A2A22',
      bannerText: '#E0F2F1',
      connectorColor: '#00695C',
      conceptBoxBorder: '#00897B',
      highlightColor: '#26A69A',
      backgroundPattern: 'dots',
      fontStyle: 'elegant',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 生活的意义',
        sections: [
          {
            type: 'header',
            content: '人生意义在于贡献与合作',
          },
          {
            type: 'concept-box',
            content: '个体心理学核心：人的一切行为都有目的，都指向超越自卑',
            emphasis: true,
          },
          {
            type: 'text',
            content: '阿德勒认为，人生的意义不是由环境或命运决定的，而是我们自己赋予的。一个人对生活意义的理解，决定了他的行为模式和人生走向。',
          },
          {
            type: 'mindmap-branch',
            content: '人生三大课题',
            children: [
              { type: 'text', content: '工作：通过劳动创造价值，获得社会认可' },
              { type: 'text', content: '社交：建立合作关系，融入社会群体' },
              { type: 'text', content: '亲密关系：在爱与婚姻中学会付出和信任' },
            ],
          },
          {
            type: 'highlight',
            content: '真正健康的人生意义，必然包含对他人的关心和对社会的贡献。',
          },
          {
            type: 'quote',
            content: '"意义不是由环境决定的，我们通过赋予环境以意义来决定自己。" —— 阿德勒',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 自卑与补偿',
        sections: [
          {
            type: 'header',
            content: '自卑感：人类进步的动力',
          },
          {
            type: 'concept-box',
            content: '自卑感不是疾病，而是人类追求卓越的起点',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '自卑感的三种走向',
            items: [
              { number: 1, title: '健康补偿', description: '承认不足，努力提升自己，在贡献中获得价值感。' },
              { number: 2, title: '过度补偿', description: '追求优越感走向极端，变成控制欲、攻击性或虚荣心。' },
              { number: 3, title: '自卑情结', description: '被自卑感压垮，逃避挑战，用"我不行"作为借口。' },
            ],
          },
          {
            type: 'card-group',
            content: '自卑感的来源',
            children: [
              { type: 'text', content: '器官自卑：身体缺陷带来的不安全感' },
              { type: 'text', content: '被溺爱：从未学会独立面对困难' },
              { type: 'text', content: '被忽视：缺乏关爱，不相信自己值得被爱' },
            ],
          },
          {
            type: 'highlight',
            content: '每个人都有自卑感，区别在于你是用它来驱动成长，还是被它困住。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 社会情感',
        sections: [
          {
            type: 'header',
            content: '合作精神是心理健康的标志',
          },
          {
            type: 'concept-box',
            content: '社会情感（Gemeinschaftsgefühl）：对他人的关心和与社会的联结感',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '社会情感的培养',
            children: [
              { type: 'text', content: '家庭：母亲是孩子社会情感的第一任老师' },
              { type: 'text', content: '学校：学会合作、竞争和建立友谊' },
              { type: 'text', content: '社会：在工作和社交中践行合作精神' },
            ],
          },
          {
            type: 'text',
            content: '阿德勒指出，所有失败的人生——犯罪者、神经症患者、自杀者——都有一个共同特征：缺乏社会情感。他们只关心自己，无法与他人建立真正的合作关系。',
          },
          {
            type: 'highlight',
            content: '心理健康的人不是没有问题的人，而是能够在关心他人中找到力量的人。',
          },
          {
            type: 'quote',
            content: '"所有真正"生活意义"的标志就是：它们都是别人能够共享的意义。" —— 阿德勒',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 超越自卑的实践',
        sections: [
          {
            type: 'header',
            content: '从自卑走向超越',
          },
          {
            type: 'numbered-list',
            content: '阿德勒的实践建议',
            items: [
              { number: 1, title: '接纳自卑', description: '承认自己的不完美是超越的第一步。' },
              { number: 2, title: '关注他人', description: '把注意力从"我不够好"转向"我能为别人做什么"。' },
              { number: 3, title: '课题分离', description: '分清什么是自己的课题，什么是别人的课题。' },
              { number: 4, title: '勇气行动', description: '改变需要勇气——做你害怕但正确的事。' },
            ],
          },
          {
            type: 'card-group',
            content: '阿德勒思想的现代应用',
            children: [
              { type: 'text', content: '教育：鼓励而非惩罚，培养孩子的勇气和合作能力' },
              { type: 'text', content: '职场：领导力不是控制他人，而是激发团队合作' },
              { type: 'text', content: '亲密关系：平等尊重，而非依附或控制' },
            ],
          },
          {
            type: 'highlight',
            content: '阿德勒最核心的信息是：你的人生不由过去决定，而由你此刻的选择决定。你有勇气改变。',
          },
          {
            type: 'quote',
            content: '"重要的不是你被给予了什么，而是你如何利用被给予的东西。" —— 阿德勒',
          },
        ],
      },
    ],
    readingTime: 12,
    generatedAt: new Date('2024-06-18'),
  },
  {
    id: 'summary-19',
    bookId: 'book-19',
    book: {
      id: 'book-19',
      title: '笑傲江湖',
      author: '金庸',
      category: '武侠',
      description: '一部关于自由与权力的武侠寓言，令狐冲的潇洒人生。',
      createdAt: new Date('2024-04-10'),
    },
    theme: {
      primaryColor: '#546E7A',
      secondaryColor: '#B0BEC5',
      accentColor: '#37474F',
      sidebarBg: '#0E1518',
      bannerBg: '#1A252B',
      bannerText: '#ECEFF1',
      connectorColor: '#546E7A',
      conceptBoxBorder: '#78909C',
      highlightColor: '#607D8B',
      backgroundPattern: 'lines',
      fontStyle: 'classic',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 令狐冲·自由之魂',
        sections: [
          {
            type: 'header',
            content: '武侠世界中最洒脱的灵魂',
          },
          {
            type: 'concept-box',
            content: '令狐冲：不受拘束、率性而为的自由人格典范',
            emphasis: true,
          },
          {
            type: 'text',
            content: '令狐冲是金庸笔下最特别的主角之一。他不追求权力，不渴望成为武林盟主，只想和朋友喝酒弹琴，与爱人笑傲江湖。在一个充满阴谋和野心的武林中，他是一股清流。',
          },
          {
            type: 'mindmap-branch',
            content: '令狐冲的性格特质',
            children: [
              { type: 'text', content: '重情重义：对师门忠诚，对朋友赤诚' },
              { type: 'text', content: '不拘礼法：与田伯光、向问天等"邪道"也能结交' },
              { type: 'text', content: '淡泊名利：多次拒绝权力和地位的诱惑' },
              { type: 'text', content: '真诚坦率：从不掩饰自己的感情和想法' },
            ],
          },
          {
            type: 'highlight',
            content: '令狐冲代表了一种理想人格：在浊世中保持本心，在权力面前保持自由。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 正邪之辨',
        sections: [
          {
            type: 'header',
            content: '谁是正？谁是邪？',
          },
          {
            type: 'concept-box',
            content: '笑傲江湖最深刻的命题：名门正派未必正，魔教中人未必邪',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '"正派"的真面目',
            children: [
              { type: 'text', content: '岳不群：君子剑的外表下藏着最阴毒的野心' },
              { type: 'text', content: '左冷禅：为统一五岳不择手段，嗜权如命' },
              { type: 'text', content: '余沧海：灭满门，抢辟邪剑谱，残忍至极' },
              { type: 'text', content: '正派弟子：盲从师长，助纣为虐而不自知' },
            ],
          },
          {
            type: 'card-group',
            content: '"邪派"的真性情',
            children: [
              { type: 'text', content: '任盈盈：日月神教圣姑，却温柔善良、深情专一' },
              { type: 'text', content: '向问天：豪爽仗义，为兄弟两肋插刀' },
              { type: 'text', content: '曲洋与刘正风：正邪两派之人因音乐成为知己' },
            ],
          },
          {
            type: 'highlight',
            content: '金庸用笑傲江湖告诉我们：判断一个人不要看他的标签，而要看他的行为。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 权力的毒药',
        sections: [
          {
            type: 'header',
            content: '权力如何腐蚀人性',
          },
          {
            type: 'numbered-list',
            content: '被权力毁灭的人',
            items: [
              { number: 1, title: '岳不群', description: '为了得到辟邪剑谱不惜自宫、背叛妻子、陷害弟子，从"君子"堕落为伪君子。' },
              { number: 2, title: '左冷禅', description: '野心勃勃要统一五岳剑派，最终被自己的贪欲所毁。' },
              { number: 3, title: '任我行', description: '推翻东方不败后，自己也走上了独裁的老路。' },
              { number: 4, title: '东方不败', description: '为了绝世武功付出了最大的代价，迷失在权力的幻象中。' },
            ],
          },
          {
            type: 'concept-box',
            content: '权力的悖论：越是追求绝对权力的人，越会失去最珍贵的东西',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"千秋万载，一统江湖"——这句口号是对权力崇拜最辛辣的讽刺。',
          },
          {
            type: 'highlight',
            content: '金庸以武林写政治，以江湖写社会——笑傲江湖是一部政治寓言。',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 琴箫合奏·知己之情',
        sections: [
          {
            type: 'header',
            content: '超越正邪的灵魂共鸣',
          },
          {
            type: 'text',
            content: '嵩山派掌门刘正风与魔教长老曲洋，一正一邪，却因共同热爱音乐成为知己。他们合作的《笑傲江湖曲》，琴箫和鸣，超越了江湖恩怨，代表了最纯粹的艺术与友情。',
          },
          {
            type: 'mindmap-branch',
            content: '《笑傲江湖曲》的象征',
            children: [
              { type: 'text', content: '自由：音乐不分正邪，超越世俗桎梏' },
              { type: 'text', content: '知己：真正的灵魂共鸣无关身份和立场' },
              { type: 'text', content: '理想：一个没有偏见和仇恨的世界' },
            ],
          },
          {
            type: 'highlight',
            content: '令狐冲与任盈盈继承了这首曲子，也继承了它所代表的精神：笑傲江湖，不问正邪。',
          },
          {
            type: 'quote',
            content: '"曲中有杀伐之声，也有温婉之意；有英雄气概，也有儿女柔情。" —— 关于《笑傲江湖曲》',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '第五章: 笑傲江湖·终极自由',
        sections: [
          {
            type: 'header',
            content: '退隐江湖，方得自由',
          },
          {
            type: 'card-group',
            content: '笑傲江湖的核心思想',
            children: [
              { type: 'text', content: '自由高于权力：令狐冲放弃一切权位，选择与任盈盈隐居' },
              { type: 'text', content: '人性高于立场：不以正邪论人，而以善恶判行' },
              { type: 'text', content: '真情高于礼法：打破门派之见，追求真挚的感情' },
              { type: 'text', content: '本心高于功利：在一个功利的世界里保持赤子之心' },
            ],
          },
          {
            type: 'concept-box',
            content: '笑傲江湖四个字的含义：以笑面对世间纷争，以傲骨拒绝权力诱惑',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '笑傲江湖的现代启示',
            items: [
              { number: 1, title: '警惕伪善', description: '越是冠冕堂皇的人，越需要审视其真实目的。' },
              { number: 2, title: '珍惜自由', description: '权力和地位不值得用自由和真性情来交换。' },
              { number: 3, title: '超越偏见', description: '不要被标签和阵营蒙蔽了对人的真实判断。' },
            ],
          },
          {
            type: 'quote',
            content: '"人生在世，会当畅情适意，连呼三大碗。" —— 令狐冲',
          },
        ],
      },
    ],
    readingTime: 16,
    generatedAt: new Date('2024-06-19'),
  },
  {
    id: 'summary-20',
    bookId: 'book-20',
    book: {
      id: 'book-20',
      title: '创新者的窘境',
      author: '克莱顿·克里斯坦森',
      category: '商业',
      description: '颠覆性创新理论的奠基之作，解释为什么优秀企业会失败。',
      createdAt: new Date('2024-04-15'),
    },
    theme: {
      primaryColor: '#C62828',
      secondaryColor: '#EF9A9A',
      accentColor: '#B71C1C',
      sidebarBg: '#1A0808',
      bannerBg: '#2D0F0F',
      bannerText: '#FFEBEE',
      connectorColor: '#C62828',
      conceptBoxBorder: '#E53935',
      highlightColor: '#D32F2F',
      backgroundPattern: 'grid',
      fontStyle: 'modern',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 优秀企业为何失败',
        sections: [
          {
            type: 'header',
            content: '管理越好的企业越容易被颠覆',
          },
          {
            type: 'concept-box',
            content: '创新者的窘境：企业正是因为做对了一切，才最终走向失败',
            emphasis: true,
          },
          {
            type: 'text',
            content: '克里斯坦森通过研究硬盘行业、挖掘机行业、钢铁行业等案例，发现一个反直觉的规律：行业领先者之所以被颠覆，不是因为管理不善，恰恰是因为它们"太优秀了"——太善于倾听现有客户、太擅长优化现有产品。',
          },
          {
            type: 'mindmap-branch',
            content: '优秀企业的"致命优点"',
            children: [
              { type: 'text', content: '专注于现有客户的需求——忽视了未来客户' },
              { type: 'text', content: '追求更高的利润率——放弃了低端市场' },
              { type: 'text', content: '完善的决策流程——过滤掉了颠覆性机会' },
              { type: 'text', content: '强大的组织惯性——无法适应新的竞争规则' },
            ],
          },
          {
            type: 'highlight',
            content: '这就是窘境：你越是做好本职工作，就越容易被颠覆性创新者淘汰。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 两种创新',
        sections: [
          {
            type: 'header',
            content: '延续性创新与颠覆性创新',
          },
          {
            type: 'numbered-list',
            content: '两种创新的对比',
            items: [
              { number: 1, title: '延续性创新', description: '在现有技术轨道上做得更好、更快、更便宜。大公司擅长这类创新。' },
              { number: 2, title: '颠覆性创新', description: '开辟新的价值网络，初期性能较差但更便宜或更方便。小公司的武器。' },
            ],
          },
          {
            type: 'concept-box',
            content: '颠覆性创新的特点：初期"更差"，但满足了被忽视的市场需求',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '经典颠覆案例',
            children: [
              { type: 'text', content: '小硬盘颠覆大硬盘：性能差但体积小，满足了PC市场' },
              { type: 'text', content: '小型钢厂颠覆大型钢厂：质量低但成本更低' },
              { type: 'text', content: '数码相机颠覆胶片：早期画质差，但方便且成本趋零' },
              { type: 'text', content: '智能手机颠覆PC：处理能力弱但随时随地可用' },
            ],
          },
          {
            type: 'highlight',
            content: '颠覆者从不正面挑战在位者——它们从被忽视的角落开始，等你注意到时已经太晚了。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 价值网络与资源依赖',
        sections: [
          {
            type: 'header',
            content: '为什么大公司看到了颠覆却无法应对',
          },
          {
            type: 'concept-box',
            content: '价值网络：企业所在的生态系统决定了它能看到什么、做什么',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '大企业无法应对颠覆的结构性原因',
            children: [
              { type: 'text', content: '客户绑定：现有客户不需要颠覆性产品' },
              { type: 'text', content: '利润压力：颠覆性市场初期规模小、利润低' },
              { type: 'text', content: '资源分配：理性的资源分配流程会否决颠覆性项目' },
              { type: 'text', content: '组织能力：为延续性创新优化的组织无法适应新游戏' },
            ],
          },
          {
            type: 'text',
            content: '克里斯坦森指出，这不是管理者的个人问题，而是组织的结构性问题。即使管理者个人认识到颠覆的威胁，组织的资源分配机制也会系统性地否决颠覆性创新项目。',
          },
          {
            type: 'quote',
            content: '"好的管理者正是导致领先企业失败的原因。" —— 克里斯坦森',
          },
          {
            type: 'highlight',
            content: '理性的资源分配反而成了创新的敌人——这就是创新者的窘境最讽刺的地方。',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 应对颠覆的策略',
        sections: [
          {
            type: 'header',
            content: '如何在颠覆中生存',
          },
          {
            type: 'numbered-list',
            content: '克里斯坦森的建议',
            items: [
              { number: 1, title: '成立独立组织', description: '将颠覆性创新项目放在独立的小团队中，不受主业务的资源争夺。' },
              { number: 2, title: '匹配市场规模', description: '让小组织去开拓小市场，不要用大公司的标准衡量新业务。' },
              { number: 3, title: '拥抱试错', description: '颠覆性市场无法预测，必须通过快速迭代来发现方向。' },
              { number: 4, title: '关注非消费者', description: '颠覆性机会往往来自目前不是你客户的人群。' },
            ],
          },
          {
            type: 'card-group',
            content: '创新者窘境的现代启示',
            children: [
              { type: 'text', content: '保持危机感：今天的优势可能是明天的包袱' },
              { type: 'text', content: '重视低端市场：被你看不上的市场可能孕育着颠覆者' },
              { type: 'text', content: '组织灵活性：建立能快速适应变化的组织结构' },
              { type: 'text', content: '自我颠覆：与其被别人颠覆，不如先颠覆自己' },
            ],
          },
          {
            type: 'highlight',
            content: '在这个加速变化的时代，唯一不变的策略就是持续创新——不是做得更好，而是做得不同。',
          },
          {
            type: 'quote',
            content: '"颠覆性技术应该被视为一种营销挑战，而不是技术挑战。" —— 克里斯坦森',
          },
        ],
      },
    ],
    readingTime: 13,
    generatedAt: new Date('2024-06-20'),
  },
];

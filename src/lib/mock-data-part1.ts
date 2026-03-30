import type { BookSummary } from '@/lib/types';

export const summariesPart1: BookSummary[] = [
  // ─── 1. 思考，快与慢 ───
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
      accentColor: '#B71C1C',
      sidebarBg: '#FFF5F5',
      bannerBg: '#D32F2F',
      bannerText: '#FFFFFF',
      connectorColor: '#E57373',
      conceptBoxBorder: '#EF5350',
      highlightColor: '#C62828',
      backgroundPattern: 'dots',
      fontStyle: 'modern',
    },
    readingTime: 15,
    generatedAt: new Date('2024-06-01'),
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '双系统理论：大脑的两位主角',
        sections: [
          {
            type: 'header',
            content: '系统1与系统2：人类思维的双引擎',
          },
          {
            type: 'concept-box',
            content: '系统1（快思考）：自动化、无意识、快速、不费力。它负责直觉判断，如识别面部表情、完成"2+2=?"等简单运算。',
            emphasis: true,
          },
          {
            type: 'concept-box',
            content: '系统2（慢思考）：需要注意力、有意识、缓慢、费力。它负责复杂推理，如计算"17×24"、在嘈杂环境中寻找特定声音。',
            emphasis: true,
          },
          {
            type: 'text',
            content: '卡尼曼指出，我们的大部分日常决策由系统1主导。系统2虽然更精确，但天生"懒惰"——它倾向于接受系统1的建议，除非遇到明显矛盾。这种认知上的"节能模式"在大多数情况下有效，但也是偏见和错误判断的根源。',
          },
          {
            type: 'highlight',
            content: '核心洞见：我们以为自己在理性思考，实际上大部分时候是系统1在自动驾驶，系统2只是橡皮图章。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"思考之于人类，就如同游泳之于猫——能做到，但并非自然倾向。"——丹尼尔·卡尼曼',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '启发式与偏见：直觉的陷阱',
        sections: [
          {
            type: 'header',
            content: '三大启发式：大脑的捷径与代价',
          },
          {
            type: 'numbered-list',
            content: '人类判断中的三大核心启发式',
            items: [
              {
                number: 1,
                title: '可得性启发式',
                description: '我们根据信息"浮现"的容易程度来判断事件发生的概率。媒体大量报道飞机失事，使人们高估飞行风险，却低估更危险的驾车出行。',
              },
              {
                number: 2,
                title: '代表性启发式',
                description: '我们根据某事物与典型案例的相似程度做判断，忽略基础概率。例如"琳达问题"：知道琳达关心社会正义后，人们更倾向认为她是"银行出纳员兼女权主义者"而非单纯的"银行出纳员"。',
              },
              {
                number: 3,
                title: '锚定效应',
                description: '初始信息会强烈影响后续判断。实验中，先看到"10"和先看到"65"的受试者，对联合国中非洲国家比例的估计差异巨大，尽管这些数字完全随机。',
              },
            ],
          },
          {
            type: 'mindmap-branch',
            content: '偏见的连锁反应',
            children: [
              { type: 'text', content: '过度自信偏见 → 高估自己判断的准确性' },
              { type: 'text', content: '后见之明偏见 → "我早就知道会这样"' },
              { type: 'text', content: '框架效应 → 同一事实不同表述导致不同决策' },
              { type: 'text', content: '光环效应 → 对一个特质的好感扩散到其他方面' },
            ],
          },
          {
            type: 'highlight',
            content: '启发式并非缺陷，而是进化赋予我们的高效工具。问题在于我们不知道自己何时在使用它们，更不知道它们何时会出错。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '前景理论：非理性的经济人',
        sections: [
          {
            type: 'header',
            content: '前景理论：颠覆传统经济学的基石',
          },
          {
            type: 'text',
            content: '传统经济学假设人是"理性经济人"，总能做出效用最大化的选择。卡尼曼与特沃斯基通过大量实验证明，人类的实际决策行为系统性地偏离理性模型。前景理论正是这一发现的理论框架，也是卡尼曼获得诺贝尔奖的核心贡献。',
          },
          {
            type: 'concept-box',
            content: '损失厌恶：失去100元的痛苦感大约是获得100元的快乐感的2倍。这意味着人们为避免损失愿意承担更大风险，却在面对收益时趋于保守。',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '前景理论的四个核心发现',
            items: [
              {
                number: 1,
                title: '参考点依赖',
                description: '人们评估结果不是看绝对值，而是看相对于参考点的变化。年薪从50万降到40万比从30万升到40万更痛苦，尽管最终收入相同。',
              },
              {
                number: 2,
                title: '敏感度递减',
                description: '从100到200的感受差异，大于从1000到1100的差异。这解释了为什么富人对同等金额变化的感受弱于穷人。',
              },
              {
                number: 3,
                title: '确定性效应',
                description: '人们过度重视确定性结果，低估仅仅是高概率的结果。95%的确定与100%的确定，心理感受差异巨大。',
              },
              {
                number: 4,
                title: '可能性效应',
                description: '人们对极小概率事件过度反应。买彩票和买保险，本质上都源于对小概率事件的非理性加权。',
              },
            ],
          },
          {
            type: 'quote',
            content: '"对于大多数人而言，害怕失去的恐惧比期望获得的渴望更为强烈。"——丹尼尔·卡尼曼',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '两个自我：体验与记忆的分裂',
        sections: [
          {
            type: 'header',
            content: '体验自我vs记忆自我：谁在掌控幸福？',
          },
          {
            type: 'mindmap-branch',
            content: '两个自我的特征对比',
            children: [
              { type: 'text', content: '体验自我 → 活在当下，感受每一刻的快乐或痛苦' },
              { type: 'text', content: '记忆自我 → 事后重建叙事，决定我们"记住"的故事' },
              { type: 'text', content: '冲突 → 记忆自我常常覆盖体验自我的真实感受' },
            ],
          },
          {
            type: 'concept-box',
            content: '峰终定律：人们对一段经历的评价主要取决于高峰时刻（最好或最坏）和结束时的感受，而非整体体验的平均值。一场两小时的精彩电影加上糟糕的结局，其评价会低于一场一般的电影加上精彩的结局。',
            emphasis: true,
          },
          {
            type: 'text',
            content: '这一发现对医疗、旅游、客户服务等领域有深远影响。例如，结肠镜检查实验中，延长检查时间但减轻最后阶段的不适，患者对整个过程的回忆评价显著提高，尽管客观上他们经历了更多的总体不适。',
          },
          {
            type: 'highlight',
            content: '我们不是在两段经历之间做选择，而是在两段经历的记忆之间做选择。决定我们未来行为的，不是我们实际经历了什么，而是我们记住了什么。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"幸福是一个复杂的词汇，它不应该被用来指代单一的含义。"——丹尼尔·卡尼曼',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '实践应用：如何做更好的决策',
        sections: [
          {
            type: 'header',
            content: '对抗偏见：提升决策质量的策略',
          },
          {
            type: 'numbered-list',
            content: '日常决策中的实用建议',
            items: [
              {
                number: 1,
                title: '建立"事前验尸"机制',
                description: '在做重要决策前，想象"一年后这个决定失败了"，然后倒推可能的原因。这种方法能有效克服过度乐观偏见。',
              },
              {
                number: 2,
                title: '使用外部视角',
                description: '不要只关注你的具体情况（内部视角），而要参考类似情况的统计数据（外部视角）。创业成功率的基础概率比你的个人感觉更可靠。',
              },
              {
                number: 3,
                title: '警惕WYSIATI陷阱',
                description: '"你所看到的就是全部"（What You See Is All There Is）。系统1善于用有限信息构建连贯故事，让你误以为已经掌握了足够信息。',
              },
              {
                number: 4,
                title: '减缓判断速度',
                description: '在重要决策中刻意启动系统2。写下利弊清单、设置冷静期、征求不同意见，都是有效方法。',
              },
            ],
          },
          {
            type: 'card-group',
            content: '本书核心要点回顾',
            children: [
              { type: 'text', content: '认知偏见不是个人缺陷，而是人类思维的结构性特征' },
              { type: 'text', content: '知道偏见的存在不能自动消除它，但可以设计制度来对抗它' },
              { type: 'text', content: '好的决策不是追求完美预测，而是建立稳健的决策流程' },
              { type: 'text', content: '组织的理性程度可以超过个人——通过制度设计弥补个体局限' },
            ],
          },
          {
            type: 'highlight',
            content: '这本书最深刻的启示：承认无知比假装全知更接近智慧。理解我们思维的局限，本身就是超越局限的第一步。',
            emphasis: true,
          },
        ],
      },
    ],
  },

  // ─── 2. 原则 ───
  {
    id: 'summary-2',
    bookId: 'book-2',
    book: {
      id: 'book-2',
      title: '原则',
      author: '瑞·达利欧',
      category: '商业',
      description: '桥水基金创始人的人生和工作原则。',
      createdAt: new Date('2024-01-20'),
    },
    theme: {
      primaryColor: '#1565C0',
      secondaryColor: '#64B5F6',
      accentColor: '#0D47A1',
      sidebarBg: '#F0F7FF',
      bannerBg: '#1976D2',
      bannerText: '#FFFFFF',
      connectorColor: '#42A5F5',
      conceptBoxBorder: '#2196F3',
      highlightColor: '#0D47A1',
      backgroundPattern: 'grid',
      fontStyle: 'bold',
    },
    readingTime: 12,
    generatedAt: new Date('2024-06-02'),
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '达利欧的人生旅程：从失败中学习',
        sections: [
          {
            type: 'header',
            content: '一个投资传奇的起点与低谷',
          },
          {
            type: 'text',
            content: '瑞·达利欧在1975年创立了桥水基金，将其发展为全球最大的对冲基金。但他的成功并非一帆风顺——1982年，他曾因错误判断墨西哥债务危机而几乎破产，不得不解雇所有员工，甚至向父亲借钱度日。这次惨痛的失败成为他人生的转折点。',
          },
          {
            type: 'concept-box',
            content: '痛苦+反思=进步。达利欧将这个公式视为个人成长的核心引擎。每一次失败都是一次学习机会，关键是你是否愿意正视痛苦并从中提取教训。',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '达利欧的核心信念：生活中最重要的事情是弄清楚什么是真实的，然后基于真实做出最优决策。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"我发现，拥抱现实并与之打交道，比抱怨现实不是你希望的样子要好得多。"——瑞·达利欧',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '生活原则：拥抱现实、追求真相',
        sections: [
          {
            type: 'header',
            content: '五步流程：从目标到成功',
          },
          {
            type: 'numbered-list',
            content: '达利欧的五步成功流程',
            items: [
              {
                number: 1,
                title: '设定清晰目标',
                description: '不要把欲望和目标混为一谈。目标是你真正需要达到的，欲望则可能让你偏离方向。优先排序至关重要。',
              },
              {
                number: 2,
                title: '识别问题',
                description: '不要容忍问题的存在。对问题的容忍就是对失败的纵容。准确诊断问题比急于找到解决方案更重要。',
              },
              {
                number: 3,
                title: '诊断根因',
                description: '区分直接原因和根本原因。"我错过了火车"是直接原因，"我总是忘记查看时刻表"才是根本原因。',
              },
              {
                number: 4,
                title: '设计解决方案',
                description: '方案设计要像写电影剧本一样，可视化每一步。好的方案应该在执行之前就能预见到大部分障碍。',
              },
              {
                number: 5,
                title: '贯彻执行',
                description: '执行力是区分成功者和空想家的关键。建立良好的工作习惯，用清单追踪进度，确保每一步都落到实处。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '极度透明与极度真实：达利欧坚信，隐藏真相只会延迟问题的爆发。在桥水，每一场会议都被录像，每个人都可以（且被鼓励）直接挑战任何人的观点，无论职级高低。',
            emphasis: true,
          },
          {
            type: 'text',
            content: '这五个步骤不要求你在每个方面都表现出色。你只需要知道自己在哪些步骤上薄弱，然后找到能弥补这些弱点的人来帮助你。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '工作原则：创意择优体系',
        sections: [
          {
            type: 'header',
            content: '创意择优：让最好的想法胜出',
          },
          {
            type: 'text',
            content: '达利欧认为，传统组织中有两种决策模式——独裁制（老板说了算）和民主制（一人一票）——都存在严重缺陷。他提出了第三条路：创意择优（Idea Meritocracy），即让最有能力、最有见地的人在决策中发挥更大的影响力。',
          },
          {
            type: 'mindmap-branch',
            content: '创意择优的三大支柱',
            children: [
              { type: 'text', content: '极度真实 → 每个人都有义务说出真实想法，即使令人不舒服' },
              { type: 'text', content: '极度透明 → 信息对所有人开放，消除信息不对称' },
              { type: 'text', content: '可信度加权决策 → 在相关领域有更多经验和记录的人拥有更大的决策权重' },
            ],
          },
          {
            type: 'concept-box',
            content: '棒球卡系统：桥水为每个员工建立了类似"棒球卡"的档案，记录他们在各个维度的能力评分。这些数据公开透明，帮助团队在分配任务和做出决策时匹配最合适的人选。',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '组织中最大的敌人不是能力不足，而是自负。当人们把"是否正确"看得比"自己是否被认可"更重要时，组织才能真正进步。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '认知偏见与开放思维',
        sections: [
          {
            type: 'header',
            content: '两大障碍：自我意识与盲点',
          },
          {
            type: 'numbered-list',
            content: '阻碍理性决策的关键障碍',
            items: [
              {
                number: 1,
                title: '自我意识障碍',
                description: '大脑的底层防御机制让你把对自己观点的攻击等同于人身攻击。当有人说"你的方案有问题"时，杏仁核的反应和被老虎追赶几乎一样。',
              },
              {
                number: 2,
                title: '盲点障碍',
                description: '每个人都有认知盲点——你擅长细节但看不到全局，或者你善于创新但不擅执行。关键是承认盲点的存在，并找到互补的伙伴。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '深思熟虑的分歧：当你与他人意见不同时，不要急于争论或妥协，而是寻求理解对方推理过程。问"你为什么这样认为？"比"你错了"有效一百倍。',
            emphasis: true,
          },
          {
            type: 'text',
            content: '达利欧建议培养"超级现实主义"心态：对自己的弱点诚实，对他人的反馈开放，对失败的教训感恩。这不是鸡汤，而是一套严格的操作系统。',
          },
          {
            type: 'quote',
            content: '"如果你没有经历过失败，那说明你没有尝试过超出能力范围的事情。"——瑞·达利欧',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '原则的系统化与机器思维',
        sections: [
          {
            type: 'header',
            content: '把原则变成算法：决策的系统化',
          },
          {
            type: 'text',
            content: '达利欧最具前瞻性的主张之一是将决策原则系统化为算法。在桥水，许多投资决策已经由计算机系统执行，这些系统编码了团队数十年积累的决策原则。人类的角色从"做决策"转变为"优化决策系统"。',
          },
          {
            type: 'mindmap-branch',
            content: '系统化思维的层次',
            children: [
              { type: 'text', content: '第一层：记录原则 → 把模糊的直觉变成清晰的文字' },
              { type: 'text', content: '第二层：测试原则 → 用历史数据验证原则的有效性' },
              { type: 'text', content: '第三层：自动化原则 → 将验证过的原则编码为决策算法' },
              { type: 'text', content: '第四层：迭代优化 → 持续收集反馈，修正算法偏差' },
            ],
          },
          {
            type: 'card-group',
            content: '本书最重要的几条原则',
            children: [
              { type: 'text', content: '拥抱现实并与之打交道，不要逃避或抱怨' },
              { type: 'text', content: '痛苦是进步的信号，逃避痛苦就是逃避成长' },
              { type: 'text', content: '做到极度透明和极度真实' },
              { type: 'text', content: '理解人与人之间的差异，善用互补' },
              { type: 'text', content: '把原则系统化，让好的决策变得可复制' },
            ],
          },
          {
            type: 'highlight',
            content: '达利欧的终极建议：写下你自己的原则。不需要从完美开始，但需要从诚实开始。随着时间推移，你的原则会不断完善，它们将成为你最宝贵的资产。',
            emphasis: true,
          },
        ],
      },
    ],
  },

  // ─── 3. 人类简史 ───
  {
    id: 'summary-3',
    bookId: 'book-3',
    book: {
      id: 'book-3',
      title: '人类简史',
      author: '尤瓦尔·赫拉利',
      category: '历史',
      description: '从动物到上帝，人类如何走到今天。',
      createdAt: new Date('2024-02-01'),
    },
    theme: {
      primaryColor: '#2E7D32',
      secondaryColor: '#81C784',
      accentColor: '#1B5E20',
      sidebarBg: '#F1F8E9',
      bannerBg: '#388E3C',
      bannerText: '#FFFFFF',
      connectorColor: '#66BB6A',
      conceptBoxBorder: '#43A047',
      highlightColor: '#1B5E20',
      backgroundPattern: 'waves',
      fontStyle: 'classic',
    },
    readingTime: 14,
    generatedAt: new Date('2024-06-03'),
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '认知革命：想象力改变一切',
        sections: [
          {
            type: 'header',
            content: '七万年前的认知大爆炸',
          },
          {
            type: 'text',
            content: '大约七万年前，智人（Homo sapiens）发生了一场认知革命。在此之前，人类只是非洲大草原上一种普通的灵长类动物，不比黑猩猩、大猩猩更特别。但一次基因突变（可能改变了大脑的内部连接方式）赋予了智人一种前所未有的能力：虚构故事。',
          },
          {
            type: 'concept-box',
            content: '虚构故事的力量：人类是唯一能相信并不存在之事物的动物。国家、宗教、公司、金钱、人权——这些都是人类集体想象的产物。正是这种共同的"虚构"能力，让数百万陌生人得以灵活合作。',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '认知革命带来的关键能力',
            children: [
              { type: 'text', content: '语言 → 不仅传递事实（"河边有狮子"），还能讨论想象之物（"我们部落的守护神"）' },
              { type: 'text', content: '八卦 → 维系复杂的社交网络，上限约150人（邓巴数）' },
              { type: 'text', content: '虚构故事 → 突破150人上限，让上万人围绕共同信念协作' },
            ],
          },
          {
            type: 'highlight',
            content: '赫拉利的核心论点：人类统治地球不是因为我们更强壮或更聪明，而是因为我们是唯一能进行大规模灵活合作的物种。这种合作建立在共同的虚构叙事之上。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '农业革命：史上最大骗局？',
        sections: [
          {
            type: 'header',
            content: '从采集到农耕：进步还是陷阱？',
          },
          {
            type: 'text',
            content: '赫拉利提出了一个颠覆性的观点：农业革命不是人类的伟大进步，而可能是"历史上最大的骗局"。表面上看，人类驯化了小麦；实际上，是小麦驯化了人类。',
          },
          {
            type: 'numbered-list',
            content: '农业革命的代价',
            items: [
              {
                number: 1,
                title: '更差的饮食',
                description: '采集者每天吃数十种食物，营养均衡。农民主要依赖少数几种谷物，营养单一，牙齿健康也大幅退化。',
              },
              {
                number: 2,
                title: '更长的工时',
                description: '采集者每天工作约4小时，其余时间用于社交和休闲。农民从日出到日落弯腰劳作，生活更加辛苦。',
              },
              {
                number: 3,
                title: '更多的疾病',
                description: '定居生活导致传染病蔓延，与家畜共处带来新的病原体。密集的人口使流行病成为常态。',
              },
              {
                number: 4,
                title: '更大的不平等',
                description: '食物可以储存和积累，催生了私有制、阶级分化和战争。少数精英控制多数人的劳动成果。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '奢侈品陷阱：每一代人做出的小改进（种更多小麦、建更大仓库）在积累后形成了不可逆转的路径依赖。人口增长使得回到采集生活变得不可能。今天我们面对手机和社交媒体，可能正在重蹈同样的覆辙。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"小麦没有给人类提供更好的饮食，没有给人类更多的安全感，也没有给人类更多的幸福。但小麦做到了一件事：让人口大幅增长。"——尤瓦尔·赫拉利',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '人类的统一：帝国、金钱与宗教',
        sections: [
          {
            type: 'header',
            content: '三大统一力量：帝国、货币与宗教',
          },
          {
            type: 'mindmap-branch',
            content: '推动人类文化统一的三大力量',
            children: [
              {
                type: 'text',
                content: '帝国 → 通过征服将不同文化纳入同一政治体系。帝国是"恶"还是"善"？答案是两者兼而有之。',
              },
              {
                type: 'text',
                content: '金钱 → 人类最成功的虚构故事。一张纸币之所以有价值，纯粹因为所有人都相信它有价值。',
              },
              {
                type: 'text',
                content: '宗教 → 为社会秩序提供超自然的合法性。"这不仅仅是人的规矩，这是神的旨意。"',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '金钱的本质：金钱是有史以来最成功的互信系统。基督徒和穆斯林可能无法就神学达成一致，但他们完全可以在一枚金币的价值上达成共识。',
            emphasis: true,
          },
          {
            type: 'text',
            content: '赫拉利指出一个重要趋势：人类历史的方向是走向统一，而非分裂。数千年前地球上有数万个独立的文化群体，今天几乎所有人都生活在同一个全球性的政治和经济体系之中。',
          },
          {
            type: 'highlight',
            content: '帝国的悖论：我们今天最珍视的许多文化遗产——语言、宗教、艺术、法律——恰恰是帝国征服和文化压迫的产物。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '科学革命：承认无知的力量',
        sections: [
          {
            type: 'header',
            content: '五百年来最深刻的变革',
          },
          {
            type: 'text',
            content: '公元1500年前后，欧洲发生了一场前所未有的革命——不是发现了新知识，而是承认了自己的无知。在此之前，人类相信所有重要问题的答案已经存在于宗教经典或古代智慧中。科学革命的核心突破是接受"我们不知道"，并发展出通过观察和实验来获取新知识的方法论。',
          },
          {
            type: 'numbered-list',
            content: '科学革命的三大引擎',
            items: [
              {
                number: 1,
                title: '承认无知',
                description: '科学理论都是暂时的假说，随时可能被推翻。这种认知上的谦逊是一切科学进步的前提。',
              },
              {
                number: 2,
                title: '科学与帝国的联盟',
                description: '欧洲帝国资助科学考察（达尔文的贝格尔号之旅由英国海军赞助），科学发现反过来为帝国扩张提供技术优势。',
              },
              {
                number: 3,
                title: '科学与资本的联盟',
                description: '信贷体系基于对未来增长的信任。科学提供了"未来会更好"的信念基础，资本则为科学研究提供资金。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '增长的信条：现代经济的核心信念是"明天的蛋糕会比今天大"。这种对增长的信仰，使得借贷和投资成为可能，也驱动了过去五百年的物质进步。但问题是：在一个有限的星球上，无限增长是否可持续？',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"现代科学与以往所有知识体系的最大差别在于：它愿意承认自己的无知。"——尤瓦尔·赫拉利',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '人类的未来：从智人到智神？',
        sections: [
          {
            type: 'header',
            content: '站在进化的十字路口',
          },
          {
            type: 'text',
            content: '赫拉利在本书最后提出了令人深思的问题：智人正在获得改造自身的技术能力——基因工程、人工智能、脑机接口——我们即将从"智人"变为"智神"。但我们准备好了吗？',
          },
          {
            type: 'mindmap-branch',
            content: '三条可能改变人类物种的技术路径',
            children: [
              { type: 'text', content: '生物工程 → 直接修改DNA，设计"超级人类"' },
              { type: 'text', content: '半机械人工程 → 人机融合，通过植入芯片增强认知能力' },
              { type: 'text', content: '非有机生命工程 → 创造纯粹的人工智能，可能完全取代碳基生命' },
            ],
          },
          {
            type: 'card-group',
            content: '本书留给读者的核心问题',
            children: [
              { type: 'text', content: '如果我们能消除痛苦、延长寿命甚至永生，我们还是"人类"吗？' },
              { type: 'text', content: '我们有能力改造世界，但我们知道自己想要什么吗？' },
              { type: 'text', content: '科技让我们变成了神，但我们依然是不满足的神。' },
              { type: 'text', content: '历史不是为了预测未来，而是为了让我们从过去的路径中解放出来。' },
            ],
          },
          {
            type: 'highlight',
            content: '本书最后一句话的力量："拥有神的能力，但不负责任、贪得无厌，且连自己想要什么都不知道，天下危险，莫此为甚。"',
            emphasis: true,
          },
        ],
      },
    ],
  },

  // ─── 4. 被讨厌的勇气 ───
  {
    id: 'summary-4',
    bookId: 'book-4',
    book: {
      id: 'book-4',
      title: '被讨厌的勇气',
      author: '岸见一郎 / 古贺史健',
      category: '哲学',
      description: '阿德勒心理学的通俗解读，关于自由与幸福的对话。',
      createdAt: new Date('2024-02-10'),
    },
    theme: {
      primaryColor: '#FF6F00',
      secondaryColor: '#FFB74D',
      accentColor: '#E65100',
      sidebarBg: '#FFF8E1',
      bannerBg: '#F57C00',
      bannerText: '#FFFFFF',
      connectorColor: '#FFA726',
      conceptBoxBorder: '#FB8C00',
      highlightColor: '#E65100',
      backgroundPattern: 'lines',
      fontStyle: 'elegant',
    },
    readingTime: 10,
    generatedAt: new Date('2024-06-04'),
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '否定"原因论"：你的不幸是自己选择的',
        sections: [
          {
            type: 'header',
            content: '目的论vs原因论：阿德勒的根本颠覆',
          },
          {
            type: 'text',
            content: '弗洛伊德认为过去的创伤决定了现在的行为（原因论）。阿德勒则提出了截然不同的观点：不是"因为过去受了伤所以现在不幸"，而是"因为现在不想改变，所以搬出过去的创伤作为借口"（目的论）。',
          },
          {
            type: 'concept-box',
            content: '目的论的核心主张：人的行为不是由过去的原因驱动，而是由当下的目的驱动。一个人"不敢出门"不是因为过去被欺负的创伤，而是因为"不出门"在当下服务于某个目的——比如获得家人的关注和同情。',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '这个观点初听残酷，但实际上蕴含深刻的自由：如果问题由过去决定，你无力改变过去；但如果问题由当下的选择决定，你可以立刻做出不同的选择。',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '原因论与目的论的对比',
            children: [
              { type: 'text', content: '原因论 → "因为小时候被忽视，所以我不信任人" → 被动、无力改变' },
              { type: 'text', content: '目的论 → "我选择不信任人，因为这样更安全" → 主动、可以改变' },
            ],
          },
          {
            type: 'quote',
            content: '"重要的不是被给予了什么，而是如何使用被给予的东西。"——阿尔弗雷德·阿德勒',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '课题分离：自由的起点',
        sections: [
          {
            type: 'header',
            content: '一切人际关系的烦恼都源于课题的混淆',
          },
          {
            type: 'concept-box',
            content: '课题分离原则：判断一件事是"谁的课题"的标准很简单——这件事的最终后果由谁承担？如果是对方承担，那就是对方的课题，你无权干涉；如果是你承担，那就是你的课题，别人无权干涉。',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '课题分离的实际应用',
            items: [
              {
                number: 1,
                title: '孩子不学习',
                description: '学习是孩子的课题，不是父母的课题。父母可以表示愿意提供帮助，但不应强迫或代替孩子做决定。因为不学习的后果最终由孩子自己承担。',
              },
              {
                number: 2,
                title: '他人不认可你',
                description: '别人如何看待你，是别人的课题。你能做的是真诚地做好自己的事。如果你为了讨好别人而改变自己，那你就侵入了自己的课题——你在用别人的标准绑架自己。',
              },
              {
                number: 3,
                title: '伴侣的情绪',
                description: '你可以关心、支持伴侣，但对方的情绪是对方的课题。承担不属于自己的课题，只会导致疲惫和怨恨。',
              },
            ],
          },
          {
            type: 'text',
            content: '课题分离不是冷漠。它是尊重——尊重他人有做出自己选择的权利，也尊重自己不必为他人的选择负责。真正的爱不是控制，而是信任对方有能力处理自己的人生。',
          },
          {
            type: 'highlight',
            content: '"不要为了满足别人的期望而活。" 这是阿德勒心理学中最简洁、也最有力量的一句忠告。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '共同体感觉：从竞争到贡献',
        sections: [
          {
            type: 'header',
            content: '幸福的本质：对共同体的贡献感',
          },
          {
            type: 'text',
            content: '阿德勒认为，人类的核心需求不是"被爱"或"被认可"，而是"归属感"——感觉自己在这个世界上有一个位置。而获得归属感的方式不是等待别人的接纳，而是主动对共同体做出贡献。',
          },
          {
            type: 'concept-box',
            content: '贡献感而非贡献本身：重要的不是你客观上为他人做了多少，而是你主观上感受到了多少贡献感。一位退休老人在社区花园浇花，客观贡献也许有限，但主观的贡献感可能带来深刻的幸福。',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '从自我中心到共同体感觉',
            children: [
              { type: 'text', content: '自我接纳 → 接受不完美的自己，不与他人比较' },
              { type: 'text', content: '他者信赖 → 无条件信任他人，即使可能被背叛' },
              { type: 'text', content: '他者贡献 → 为他人和社会做出贡献，获得归属感' },
            ],
          },
          {
            type: 'card-group',
            content: '自我接纳vs自我肯定',
            children: [
              { type: 'text', content: '自我肯定："我能行，我最棒" → 忽视现实，可能导致更大的挫败感' },
              { type: 'text', content: '自我接纳："我确实有不足，但我接受这样的自己并努力改进" → 基于现实的积极态度' },
            ],
          },
          {
            type: 'quote',
            content: '"幸福就是贡献感。"——阿尔弗雷德·阿德勒',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '活在当下：人生是连续的刹那',
        sections: [
          {
            type: 'header',
            content: '否定"人生的意义"：拥抱每一个当下',
          },
          {
            type: 'text',
            content: '书中的哲人提出了一个激进的主张：人生没有终极目标，人生不是一条从起点到终点的线段，而是无数"刹那"的连续。执着于未来的目标（"等我升职了就幸福了"），反而会错过当下的生活。',
          },
          {
            type: 'concept-box',
            content: '人生是舞蹈，不是旅行。旅行的意义在于到达终点，但舞蹈的意义在于每一个舞步本身。如果你把人生当旅行，你会永远焦虑"还没到"；如果你把人生当舞蹈，每一刻都是完整的。',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '活在当下的实践方法',
            items: [
              {
                number: 1,
                title: '聚焦"此时此地"',
                description: '不沉溺于过去的后悔，不焦虑未来的不确定。过去和未来都不存在于当下这个瞬间。',
              },
              {
                number: 2,
                title: '认真但不严肃',
                description: '认真对待每一件事，但不要把它看得太严肃。人生中没有什么事情重要到值得你牺牲当下的快乐。',
              },
              {
                number: 3,
                title: '拒绝人生的"延期"',
                description: '不要说"等我准备好了再开始"。你永远不会完全准备好。此刻就是最好的开始时间。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '被讨厌的勇气的最终含义：选择自由的人生，意味着接受不被所有人喜欢的可能。这不是对抗，而是解放——从他人的期望中解放出来，活出属于自己的人生。',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '本书核心思想总结',
            children: [
              { type: 'text', content: '人不是被过去决定的，而是被当下的选择定义的' },
              { type: 'text', content: '分清自己的课题和别人的课题，是一切自由的前提' },
              { type: 'text', content: '幸福来自对共同体的贡献感，而非他人的认可' },
              { type: 'text', content: '人生的意义不在远方，而在每一个当下的选择中' },
            ],
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '勇气的实践：改变从今天开始',
        sections: [
          {
            type: 'header',
            content: '知道与做到之间：勇气的鸿沟',
          },
          {
            type: 'text',
            content: '本书以青年与哲人的对话形式展开，青年的每一次质疑都代表了读者内心的抗拒。到最后，青年不得不承认：阿德勒心理学的道理他都懂了，但"懂"和"做到"之间隔着一道鸿沟——这道鸿沟的名字叫"勇气"。',
          },
          {
            type: 'concept-box',
            content: '改变需要勇气：阿德勒说"人生是可以改变的"，但他从不说改变是容易的。改变意味着放弃已知的、虽然痛苦但熟悉的生活模式，走向未知。这需要巨大的勇气。',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '获得勇气的三个来源',
            items: [
              {
                number: 1,
                title: '自我接纳带来的勇气',
                description: '当你不再试图成为"别人眼中的完美形象"，而是接受真实的自己时，你就获得了行动的勇气。',
              },
              {
                number: 2,
                title: '信赖他人带来的勇气',
                description: '相信他人不会恶意伤害你，即使被背叛，也不改变信赖的态度。这种信赖本身就是一种力量。',
              },
              {
                number: 3,
                title: '贡献感带来的勇气',
                description: '当你感受到自己的存在对他人有价值时，你会获得面对任何困难的勇气。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '阿德勒心理学不是一种"读完就有用"的知识。它需要用一生的时间去实践。据说阿德勒本人曾说："要真正理解阿德勒心理学并改变生活方式，需要相当于你已活岁月一半的时间。"',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"世界很简单，人生也是一样。不是「世界」复杂，而是「你」把世界看得复杂了。"——《被讨厌的勇气》',
          },
        ],
      },
    ],
  },

  // ─── 5. 活法 ───
  {
    id: 'summary-5',
    bookId: 'book-5',
    book: {
      id: 'book-5',
      title: '活法',
      author: '稻盛和夫',
      category: '哲学',
      description: '稻盛和夫的人生哲学，关于如何在工作和生活中找到真正的意义与幸福。',
      createdAt: new Date('2024-02-20'),
    },
    theme: {
      primaryColor: '#6A1B9A',
      secondaryColor: '#CE93D8',
      accentColor: '#4A148C',
      sidebarBg: '#F3E5F5',
      bannerBg: '#7B1FA2',
      bannerText: '#FFFFFF',
      connectorColor: '#AB47BC',
      conceptBoxBorder: '#8E24AA',
      highlightColor: '#4A148C',
      backgroundPattern: 'dots',
      fontStyle: 'elegant',
    },
    readingTime: 11,
    generatedAt: new Date('2024-06-05'),
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '人生的意义：磨炼灵魂',
        sections: [
          {
            type: 'header',
            content: '人生的目的：提升心性，磨炼灵魂',
          },
          {
            type: 'text',
            content: '稻盛和夫在27岁创立京瓷，52岁创立KDDI，78岁受邀拯救濒临破产的日航并使其重新上市。这位创造了两家世界500强企业的经营之神，其人生哲学的起点却极为质朴——他相信人活着的意义就是"提升心性，磨炼灵魂"。',
          },
          {
            type: 'concept-box',
            content: '稻盛和夫的人生方程式：人生·工作的结果 = 思维方式 × 热情 × 能力。其中"思维方式"的取值范围是-100到+100，"热情"和"能力"的取值范围是0到100。这意味着，一个能力很强、热情也很高但思维方式为负（自私、消极）的人，成就会是巨大的负值。',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '思维方式是乘数中唯一可以为负值的因素。一个心术不正的天才比一个心地善良的普通人更危险。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"人生就是一场修行。我们降临到这个世上，就是来经历各种各样的苦难，在苦难中磨炼心性，提升灵魂的品格。"——稻盛和夫',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '工作即修行：劳动的崇高意义',
        sections: [
          {
            type: 'header',
            content: '全身心投入工作是最好的修行',
          },
          {
            type: 'text',
            content: '在许多人看来，工作只是谋生的手段。但稻盛和夫认为，工作是磨炼灵魂最有效的方式。他年轻时在一家濒临倒闭的绝缘瓷器公司工作，同期入职的人纷纷离职，他因无处可去而留下，最终选择"既然无法逃避，不如全力以赴"。这一选择改变了他的一生。',
          },
          {
            type: 'numbered-list',
            content: '稻盛和夫的工作哲学',
            items: [
              {
                number: 1,
                title: '付出不亚于任何人的努力',
                description: '不是与他人比较，而是自己和自己比——今天是否比昨天更努力？做到了"不亚于任何人的努力"，结果自然会来。',
              },
              {
                number: 2,
                title: '要谦虚不要骄傲',
                description: '成功时保持谦逊，因为成功是无数因素的共同结果，你个人的贡献只是其中一部分。骄傲是衰落的开始。',
              },
              {
                number: 3,
                title: '每天反省',
                description: '每天睡前回顾当天的言行，是否有自私的念头？是否伤害了他人？持续的自我反省是人格完善的基础。',
              },
              {
                number: 4,
                title: '感谢活着',
                description: '对生命本身心怀感恩。活着就是最大的幸福，在此基础上一切困难都是可以面对的考验。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '从"喜欢工作"到"爱上工作"：稻盛和夫承认，不是每个人一开始就能找到热爱的工作。但他建议先全力投入手头的工作，当你做到极致时，工作本身会回馈你成就感和热爱。',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '工作不是消耗生命的代价，而是充实生命的手段。认真工作的人，灵魂在发光。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '利他之心：经营与人生的根本',
        sections: [
          {
            type: 'header',
            content: '利他是最高级的利己',
          },
          {
            type: 'text',
            content: '稻盛和夫经营的核心理念不是利润最大化，而是"为全体员工的物质和精神两方面的幸福而努力，同时为人类社会的进步和发展做出贡献"。这不是口号——当他创立京瓷时，就将这条写入了公司章程。',
          },
          {
            type: 'mindmap-branch',
            content: '利他精神的三个层次',
            children: [
              { type: 'text', content: '家庭层面 → 关爱家人，承担责任，这是利他的起点' },
              { type: 'text', content: '组织层面 → 为员工创造幸福，为客户提供价值' },
              { type: 'text', content: '社会层面 → 为人类社会的进步做出贡献，这是利他的最高境界' },
            ],
          },
          {
            type: 'concept-box',
            content: '日航重建的启示：2010年，78岁的稻盛和夫接手已破产的日本航空。他以零薪酬出任CEO，将"利他之心"注入组织文化，仅用两年就让日航扭亏为盈并重新上市，创下了日航历史上最高的利润记录。',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '利他心的实践智慧',
            children: [
              { type: 'text', content: '做事前先问："这样做对对方好吗？对社会好吗？"' },
              { type: 'text', content: '不要期待回报——真正的利他是无条件的给予' },
              { type: 'text', content: '利他不是牺牲——当你帮助他人时，你的灵魂也在成长' },
              { type: 'text', content: '利他的反面不是利己，而是只顾自己——适当的自利是合理的' },
            ],
          },
          {
            type: 'quote',
            content: '"以利他之心做事，命运就会向好的方向转变。"——稻盛和夫',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '宇宙意志与因果法则',
        sections: [
          {
            type: 'header',
            content: '善念引导善果：宇宙的因果法则',
          },
          {
            type: 'text',
            content: '稻盛和夫相信宇宙中存在一种推动万物向善的"意志"或"趋势"。这不是迷信，而是他从数十年的人生经验中总结出的法则：怀着善念做事的人，长期来看总会得到善果；反之亦然。',
          },
          {
            type: 'concept-box',
            content: '心念决定命运：稻盛和夫认为，一个人心中持续描绘的愿景，最终会变成现实。但这里的"描绘"不是空想——它要求你带着强烈的愿望、配合不懈的努力、保持纯粹的动机。三者缺一不可。',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '稻盛和夫的"六项精进"',
            items: [
              {
                number: 1,
                title: '付出不亚于任何人的努力',
                description: '努力到老天爷都看不下去、出手相助的程度。',
              },
              {
                number: 2,
                title: '要谦虚，不要骄傲',
                description: '"满招损，谦受益"——中国古训在稻盛哲学中占据核心位置。',
              },
              {
                number: 3,
                title: '要每天反省',
                description: '每天睡前审视自己的言行，是否做到了诚实、正直、善良？',
              },
              {
                number: 4,
                title: '活着就要感谢',
                description: '对一切心怀感恩——包括逆境，因为逆境是最好的老师。',
              },
              {
                number: 5,
                title: '积善行，思利他',
                description: '持续做善事，想着为他人做贡献，善的能量会累积起来。',
              },
              {
                number: 6,
                title: '不要有感性的烦恼',
                description: '已经发生的事情无法改变，过度的烦恼只会消耗能量。接受现实，把精力放在能改变的事情上。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '六项精进看似简单，难在日复一日地坚持。稻盛和夫说："平凡的事情坚持做，就变得不平凡了。"',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '活法的终极智慧',
        sections: [
          {
            type: 'header',
            content: '以单纯之心面对复杂世界',
          },
          {
            type: 'text',
            content: '稻盛和夫的哲学常被批评为"过于简单"或"过于理想化"。但他的回应是：正因为这个世界足够复杂，我们更需要简单的原则来指导行动。当你面对复杂的选择时，回到最基本的判断标准——"这件事作为人而言是否正确？"——往往能找到答案。',
          },
          {
            type: 'mindmap-branch',
            content: '活法的核心哲学框架',
            children: [
              { type: 'text', content: '人生观 → 人生是磨炼灵魂的道场' },
              { type: 'text', content: '工作观 → 工作是最好的修行方式' },
              { type: 'text', content: '经营观 → 以利他之心经营企业和人生' },
              { type: 'text', content: '宇宙观 → 善念引导善果，这是宇宙的法则' },
            ],
          },
          {
            type: 'card-group',
            content: '稻盛和夫留给世人的智慧',
            children: [
              { type: 'text', content: '能力会因为努力而成长，但思维方式决定成长的方向' },
              { type: 'text', content: '人生没有无意义的经历，每一次磨难都在打磨你的灵魂' },
              { type: 'text', content: '最好的经营就是做正确的事——对员工、客户、社会都正确的事' },
              { type: 'text', content: '简单的原则、持续的实践、纯粹的动机——这就是活法' },
            ],
          },
          {
            type: 'highlight',
            content: '稻盛和夫用一生证明了一件事：一个坚持"做正确的事"的普通人，可以创造非凡的成就。他的"活法"不是天才的专利，而是每一个普通人都可以实践的人生哲学。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"人生的意义在于提升心性，磨炼灵魂。离开这个世界时，灵魂比来到这个世界时更美好一点——我认为这就是人生的目的。"——稻盛和夫',
          },
        ],
      },
    ],
  },

  // ─── 6. 天龙八部 ───
  {
    id: 'summary-6',
    bookId: 'book-6',
    book: {
      id: 'book-6',
      title: '天龙八部',
      author: '金庸',
      category: '武侠',
      description: '金庸笔下最宏大的武侠巨著，三位主角的命运交织出一幅波澜壮阔的江湖画卷。',
      createdAt: new Date('2024-03-01'),
    },
    theme: {
      primaryColor: '#4E342E',
      secondaryColor: '#A1887F',
      accentColor: '#3E2723',
      sidebarBg: '#EFEBE9',
      bannerBg: '#5D4037',
      bannerText: '#FFE0B2',
      connectorColor: '#8D6E63',
      conceptBoxBorder: '#6D4C41',
      highlightColor: '#3E2723',
      backgroundPattern: 'waves',
      fontStyle: 'classic',
    },
    readingTime: 18,
    generatedAt: new Date('2024-06-06'),
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '段誉：痴情公子的江湖路',
        sections: [
          {
            type: 'header',
            content: '大理段誉：从书生到武林高手',
          },
          {
            type: 'text',
            content: '段誉是大理国镇南王段正淳之子，性格温文尔雅，不喜武学却偏爱佛经。机缘巧合之下，他学会了六脉神剑和凌波微步——前者是天下至高的指法绝学，后者是逍遥派的绝顶轻功。讽刺的是，他的六脉神剑时灵时不灵，恰如他的命运般变幻莫测。',
          },
          {
            type: 'concept-box',
            content: '段誉的悲剧根源：他一路追寻的"神仙姐姐"王语嫣，实则折射了他对理想与完美的执着。他爱的不是真实的王语嫣，而是自己心中完美女性的投射。这种"痴"既是他的魅力，也是他的枷锁。',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '段誉的身世之谜',
            children: [
              { type: 'text', content: '名义之父 → 段正淳（大理镇南王，风流多情）' },
              { type: 'text', content: '生父 → 段延庆（大理皇室正统，身残志坚的"恶贯满盈"）' },
              { type: 'text', content: '身世揭示 → 他深爱的几位"妹妹"其实与他并无血缘关系' },
            ],
          },
          {
            type: 'highlight',
            content: '段誉这条线讲的是"痴"——对人的痴情，对理想的执着。金庸借此探讨：我们追寻的是真实的对象，还是心中的幻象？',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"你样样都好，只是不是她。"——段誉心中永恒的遗憾',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '萧峰：英雄的宿命与悲歌',
        sections: [
          {
            type: 'header',
            content: '乔峰到萧峰：身份认同的崩塌与重建',
          },
          {
            type: 'text',
            content: '萧峰是《天龙八部》中最悲壮的人物，也被许多读者视为金庸笔下最伟大的英雄。他武功盖世、义薄云天、豪迈洒脱，是中原武林人人敬仰的丐帮帮主。然而，当他的契丹人身份被揭露，一切在顷刻间崩塌。',
          },
          {
            type: 'numbered-list',
            content: '萧峰命运的五次重击',
            items: [
              {
                number: 1,
                title: '身份暴露',
                description: '发现自己是契丹人后裔，被视为"异族"，遭到他一心效忠的中原武林的集体背叛。',
              },
              {
                number: 2,
                title: '师父被杀',
                description: '养育他的乔三槐夫妇、授业恩师玄苦大师相继被害，矛头指向他本人。',
              },
              {
                number: 3,
                title: '聚贤庄血战',
                description: '面对昔日朋友的围攻，他不得不以一己之力对抗整个中原武林。"虽万千人吾往矣"的悲壮在此达到顶峰。',
              },
              {
                number: 4,
                title: '误杀阿朱',
                description: '因中了"以彼之道还施彼身"的奸计，亲手打死了最爱的人阿朱。这是他永远无法愈合的伤。',
              },
              {
                number: 5,
                title: '雁门关自尽',
                description: '在阻止辽帝耶律洪基南侵后，萧峰以自杀维护宋辽和平，完成了他的终极选择。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '萧峰的悲剧本质：他是一个夹在两个民族之间的人——汉人不容他，契丹人利用他。他的悲剧不是个人的失败，而是民族仇恨这一集体疯狂的牺牲品。',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '金庸通过萧峰追问：正义是否分民族？英雄是否分血统？在民族偏见面前，个人的善良和正义是否注定无力？',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '虚竹：命运的荒诞与馈赠',
        sections: [
          {
            type: 'header',
            content: '少林小僧的奇异人生',
          },
          {
            type: 'text',
            content: '虚竹是少林寺一名相貌平平、资质愚钝的小和尚，一心向佛，遵守清规戒律。然而命运偏偏要和他开最大的玩笑——他歪打正着破解了珍珑棋局，获得了无崖子七十年的功力，成为逍遥派掌门，又被西夏公主选为驸马。',
          },
          {
            type: 'mindmap-branch',
            content: '虚竹一再被迫破戒',
            children: [
              { type: 'text', content: '杀戒 → 被迫卷入江湖纷争，不得不出手' },
              { type: 'text', content: '荤戒 → 被灌酒吃肉，浑然不知' },
              { type: 'text', content: '色戒 → 在冰窖中与梦姑（西夏公主）相会' },
              { type: 'text', content: '身份 → 发现自己是少林方丈玄慈与叶二娘之子' },
            ],
          },
          {
            type: 'concept-box',
            content: '虚竹的隐喻：人越想控制命运，命运越不受控制。虚竹越想做一个安分的和尚，命运越是把他推向和尚的反面。金庸借此表达：人生的精彩往往不在计划之中。',
            emphasis: true,
          },
          {
            type: 'text',
            content: '虚竹的故事是三条线中最具荒诞色彩的。他的每一次"破戒"都不是出于自愿，但每一次破戒都把他引向更广阔的人生。他最终成为灵鹫宫主人、娶了公主，却始终保持着那颗质朴善良的心。',
          },
          {
            type: 'highlight',
            content: '虚竹这条线讲的是"嗔"——执着于规矩和形式的修行，最终不及一颗赤诚善良的心。真正的修行不在寺庙，而在红尘。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '众生之相：配角的光芒',
        sections: [
          {
            type: 'header',
            content: '天龙八部众生相：人人都是主角',
          },
          {
            type: 'text',
            content: '"天龙八部"这个书名来自佛教用语，指天、龙、夜叉等八种非人众生。金庸以此为名，意在描绘芸芸众生的喜怒哀乐、爱恨情仇。书中几乎每一个配角都有完整的心理逻辑和令人动容的故事。',
          },
          {
            type: 'card-group',
            content: '令人难忘的配角群像',
            children: [
              { type: 'text', content: '游坦之：因爱生痴，自愿戴上铁头面具，是爱情中"卑微到尘埃"的极端写照' },
              { type: 'text', content: '阿紫：刁蛮任性却深爱萧峰，最终抱着萧峰的遗体跳崖，令人唏嘘' },
              { type: 'text', content: '慕容复：一心复国的"南慕容"，最终在坟前称帝，疯癫中映照着执念的可悲' },
              { type: 'text', content: '鸠摩智：绝世高僧却贪恋武学，最终失去一身武功反而得到了真正的佛法解脱' },
            ],
          },
          {
            type: 'concept-box',
            content: '慕容复的悲剧：他的才智、武功、容貌、家世都是一流的，但他的一生被"复国"这个执念所绑架。为了复国，他可以背叛朋友、利用爱人、抛弃尊严。最终，他在坟头称帝的疯癫场景，是全书最令人心寒的画面之一。',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '金庸在《天龙八部》中展现了一个深刻的佛学主题："求不得"之苦。每个人都在追求自己最渴望的东西，而越追求越得不到——段誉求爱不得，萧峰求认同不得，慕容复求复国不得。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"人生在世，充满着痛苦和烦恼。每个人都有自己的「天龙八部」——那些缠绕一生的执念和不可得之苦。"',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '佛学意蕴与人文关怀',
        sections: [
          {
            type: 'header',
            content: '超越武侠：天龙八部的终极命题',
          },
          {
            type: 'text',
            content: '《天龙八部》被认为是金庸创作生涯中主题最深刻的作品。它超越了传统武侠小说的"复仇—报恩"模式，将佛学的"苦集灭道"融入叙事结构之中。三位主角分别代表佛教中的"贪、嗔、痴"三毒，而他们的人生旅程就是与这三毒和解的过程。',
          },
          {
            type: 'mindmap-branch',
            content: '三毒与三位主角',
            children: [
              { type: 'text', content: '段誉 → 痴（对理想女性的执迷不悟）' },
              { type: 'text', content: '萧峰 → 嗔（对命运不公的愤怒与抗争）' },
              { type: 'text', content: '虚竹 → 贪（被动获得的世俗欲望与佛门清修的矛盾）' },
            ],
          },
          {
            type: 'numbered-list',
            content: '天龙八部的核心主题',
            items: [
              {
                number: 1,
                title: '民族偏见的批判',
                description: '萧峰的悲剧根源在于宋辽之间的民族仇恨。金庸以此呼吁：不要以血统来判断一个人的善恶。',
              },
              {
                number: 2,
                title: '执念的代价',
                description: '从慕容复的复国梦到鸠摩智的武学痴，书中几乎所有悲剧都源于执念——对某个目标的过度执着，反而让人失去了更重要的东西。',
              },
              {
                number: 3,
                title: '命运的无常',
                description: '虚竹想做和尚做不了，段誉想做书生做不了。人生的走向往往不是自己能选择的，唯一能选择的是面对命运的态度。',
              },
            ],
          },
          {
            type: 'card-group',
            content: '天龙八部的文学遗产',
            children: [
              { type: 'text', content: '它证明了武侠小说可以承载严肃的哲学思考' },
              { type: 'text', content: '萧峰是中国文学中最伟大的悲剧英雄之一' },
              { type: 'text', content: '金庸以江湖为舞台，演绎了人类共通的苦难与救赎' },
            ],
          },
          {
            type: 'highlight',
            content: '《天龙八部》的终极启示：世间万般苦痛，皆因执念而起。放下执念不是放弃追求，而是在追求的同时，不被结果所绑架。',
            emphasis: true,
          },
        ],
      },
    ],
  },

  // ─── 7. 三体 ───
  {
    id: 'summary-7',
    bookId: 'book-7',
    book: {
      id: 'book-7',
      title: '三体',
      author: '刘慈欣',
      category: '科幻',
      description: '中国科幻里程碑之作，展现了宇宙文明之间的黑暗森林法则。',
      createdAt: new Date('2024-03-10'),
    },
    theme: {
      primaryColor: '#263238',
      secondaryColor: '#78909C',
      accentColor: '#00BCD4',
      sidebarBg: '#ECEFF1',
      bannerBg: '#37474F',
      bannerText: '#B2EBF2',
      connectorColor: '#546E7A',
      conceptBoxBorder: '#00ACC1',
      highlightColor: '#006064',
      backgroundPattern: 'grid',
      fontStyle: 'modern',
    },
    readingTime: 16,
    generatedAt: new Date('2024-06-07'),
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '红岸基地：人类的第一声呼唤',
        sections: [
          {
            type: 'header',
            content: '从文革到星空：叶文洁的绝望与选择',
          },
          {
            type: 'text',
            content: '故事始于文化大革命。天体物理学家叶文洁亲眼目睹父亲在批斗中被打死，自己也遭受迫害。对人类彻底失望的她，在红岸基地——一个用于搜寻外星文明的军事设施——做出了改变人类命运的选择：她向太空发射了地球的坐标信号，邀请外星文明来"拯救"（或毁灭）人类。',
          },
          {
            type: 'concept-box',
            content: '叶文洁的核心悖论：她是一位善良的科学家，却做出了可能导致人类灭亡的决定。她的逻辑是——人类已经证明自己无法自我纠正，唯一的希望是外部力量的介入。这种"以善意为名的极端行为"是全书最具争议的道德命题。',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '第一部的核心冲突',
            children: [
              { type: 'text', content: '叶文洁 → 对人类绝望，向三体世界发出邀请' },
              { type: 'text', content: '三体世界 → 接收信号，开始入侵计划（舰队将在450年后抵达）' },
              { type: 'text', content: '汪淼 → 纳米材料科学家，通过"三体游戏"发现三体文明的存在' },
              { type: 'text', content: 'ETO（地球三体组织） → 人类中的"叛军"，欢迎三体入侵' },
            ],
          },
          {
            type: 'highlight',
            content: '刘慈欣提出了一个令人不安的问题：如果你对人类彻底失望，你会选择向外星文明发出求救信号吗？即使这可能意味着人类的终结？',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"你们是虫子。"——三体人对人类的评价',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '黑暗森林法则：宇宙社会学的基石',
        sections: [
          {
            type: 'header',
            content: '宇宙是一片黑暗森林',
          },
          {
            type: 'text',
            content: '《三体》系列中最核心、最具影响力的概念是"黑暗森林法则"。这一法则由面壁者罗辑在第二部《黑暗森林》中推导得出，它解释了为什么宇宙看起来如此寂静（费米悖论），并彻底改变了人类对宇宙的认知。',
          },
          {
            type: 'numbered-list',
            content: '黑暗森林法则的推导过程',
            items: [
              {
                number: 1,
                title: '公理一：生存是文明的第一需要',
                description: '任何文明都将自身的生存置于最高优先级。这是不言自明的——如果一个文明不优先保证生存，它就不会存在到今天。',
              },
              {
                number: 2,
                title: '公理二：文明不断增长和扩张',
                description: '物质总量基本恒定，但文明的需求不断增长。这意味着不同文明之间必然存在资源竞争。',
              },
              {
                number: 3,
                title: '猜疑链',
                description: '即使两个文明都是善意的，它们也无法确认对方的善意。"我觉得你是善意的，但我不知道你是否觉得我觉得你是善意的……"这条猜疑链永远无法终结。',
              },
              {
                number: 4,
                title: '技术爆炸',
                description: '一个看似弱小的文明可能在短时间内发生技术爆炸，超越强大的文明。因此，任何文明都是潜在威胁。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '黑暗森林法则的结论：宇宙中的每个文明都是持枪的猎人，在黑暗的森林中潜行。如果发现了另一个文明，唯一理性的选择是立即消灭对方。因此，暴露自己的坐标就等于自杀。整个宇宙保持沉默，是因为说话意味着死亡。',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '黑暗森林法则对费米悖论给出了一个冷酷但逻辑自洽的回答：外星文明不是不存在，而是不敢暴露自己。宇宙不是空旷的，而是寂静的——因为恐惧。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '面壁计划：人类最后的反击',
        sections: [
          {
            type: 'header',
            content: '在智子监视下的绝密战略',
          },
          {
            type: 'text',
            content: '三体人向地球发射了"智子"——由质子展开成二维后刻蚀电路、再折叠回高维的超级计算机。智子能实时监控地球上的一切通讯和科学实验，使人类的基础物理学研究陷入瘫痪。但智子有一个盲点：它无法读取人类的思维。',
          },
          {
            type: 'concept-box',
            content: '面壁计划：联合国选出四位"面壁者"，赋予他们不受质疑地调动全球资源的权力。他们的真实战略只能藏在自己心中，所有外在行为都可能是伪装。这是人类利用"思维不透明"这一唯一优势的终极战略。',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '四位面壁者的命运',
            children: [
              { type: 'text', content: '泰勒：企图用量子幽灵舰队自杀式攻击，被破壁后自杀' },
              { type: 'text', content: '雷迪亚兹：企图用核弹制造水星坠落攻击，被破壁后被暴怒的民众用石头砸死' },
              { type: 'text', content: '希恩斯：企图用思想钢印控制人类意志，其妻子山杉惠子是他的破壁人' },
              { type: 'text', content: '罗辑：悟出黑暗森林法则，用"同归于尽"的威慑实现了与三体的恐怖平衡' },
            ],
          },
          {
            type: 'text',
            content: '罗辑最终的成功不在于打败三体人，而在于将地球的坐标暴露风险变成了一种威慑武器：如果三体人攻击地球，人类就向宇宙广播三体世界的坐标，让黑暗森林中的其他猎人消灭三体文明。',
          },
          {
            type: 'highlight',
            content: '面壁计划的精妙在于它将人类最大的"弱点"（个体思维的不可知性）转化为最大的"武器"。这是科幻文学中最具原创性的战略构思之一。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '降维打击：宇宙的终极武器',
        sections: [
          {
            type: 'header',
            content: '二向箔：毁灭的优雅与残忍',
          },
          {
            type: 'text',
            content: '《三体》第三部《死神永生》中最震撼的情节之一，是歌者文明使用"二向箔"对太阳系发动了降维打击——将三维空间压缩为二维平面。整个太阳系像一幅画一样被展开，所有三维物体在二维化的过程中被彻底摧毁。',
          },
          {
            type: 'concept-box',
            content: '降维打击的哲学含义：这不仅是一种科幻武器，更是一个深刻的隐喻。在竞争中，真正的强者不是在同一维度上比你更强，而是直接改变游戏规则——把你拉到一个你无法生存的维度。',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '三体系列中的宇宙终极规则',
            items: [
              {
                number: 1,
                title: '宇宙本来是十维的',
                description: '在远古的宇宙战争中，各文明不断使用降维武器，将宇宙从十维压缩到了今天的三维。降维是不可逆的。',
              },
              {
                number: 2,
                title: '光速是宇宙的"安全声明"',
                description: '将一片区域的光速降低到逃逸速度以下，就能制造一个"黑域"——向宇宙宣告"我们已经自我封闭，不再构成威胁"。',
              },
              {
                number: 3,
                title: '宇宙的终极命运',
                description: '如果所有文明都不归还从大宇宙中夺取的质量，宇宙将无法收缩重启，最终走向热寂——永恒的死亡。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '"降维打击"这个概念已经超越了科幻，成为商业和社会领域的常用词汇。它提醒我们：最大的威胁不是来自同一层面的竞争者，而是来自改变游戏规则的破坏者。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"弱小和无知不是生存的障碍，傲慢才是。"——刘慈欣《三体》',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '三体的哲学遗产',
        sections: [
          {
            type: 'header',
            content: '超越科幻：三体对现实世界的启示',
          },
          {
            type: 'text',
            content: '《三体》不仅是一部科幻小说，更是一部关于文明、伦理和生存的哲学著作。它获得了雨果奖，被翻译成数十种语言，深刻影响了全球读者对宇宙和人类处境的思考。',
          },
          {
            type: 'mindmap-branch',
            content: '三体的核心哲学命题',
            children: [
              { type: 'text', content: '道德的相对性 → 在生存面前，道德标准是否还有效？' },
              { type: 'text', content: '文明的脆弱性 → 看似强大的文明可能在瞬间被抹去' },
              { type: 'text', content: '技术的两面性 → 科技既是文明的希望，也是毁灭的工具' },
              { type: 'text', content: '个体与群体 → 一个人的善意是否能抵消集体的疯狂？' },
            ],
          },
          {
            type: 'card-group',
            content: '三体留给读者的思考',
            children: [
              { type: 'text', content: '如果宇宙真是黑暗森林，人类该如何自处？向外扩张还是自我封闭？' },
              { type: 'text', content: '程心的"圣母"选择导致了人类的灾难——善良在生死存亡面前是否是一种奢侈？' },
              { type: 'text', content: '维德"前进，不择手段地前进"的理念是否正确？' },
              { type: 'text', content: '面对不可知的宇宙，人类最应该培养的品质是什么？' },
            ],
          },
          {
            type: 'concept-box',
            content: '程心与维德的对决：这是全书最核心的伦理冲突。程心代表人文主义——即使面对灭亡也要保持人性和善良。维德代表生存主义——为了活下去可以放弃一切道德底线。刘慈欣没有给出标准答案，而是让读者自己选择。',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '《三体》的终极启示不是恐惧，而是谦卑。在浩瀚的宇宙面前，人类文明不过是暗夜中的一点微光。但正是这微光的存在，赋予了无意义的宇宙以意义。',
            emphasis: true,
          },
        ],
      },
    ],
  },

  // ─── 8. 呐喊 ───
  {
    id: 'summary-8',
    bookId: 'book-8',
    book: {
      id: 'book-8',
      title: '呐喊',
      author: '鲁迅',
      category: '文学',
      description: '鲁迅的第一部小说集，以犀利的笔锋揭露旧社会的种种弊病。',
      createdAt: new Date('2024-03-15'),
    },
    theme: {
      primaryColor: '#455A64',
      secondaryColor: '#90A4AE',
      accentColor: '#D84315',
      sidebarBg: '#FAFAFA',
      bannerBg: '#37474F',
      bannerText: '#FFCCBC',
      connectorColor: '#78909C',
      conceptBoxBorder: '#BF360C',
      highlightColor: '#BF360C',
      backgroundPattern: 'lines',
      fontStyle: 'classic',
    },
    readingTime: 13,
    generatedAt: new Date('2024-06-08'),
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '铁屋中的呐喊：鲁迅的写作初衷',
        sections: [
          {
            type: 'header',
            content: '从弃医从文到铁屋中的呐喊',
          },
          {
            type: 'text',
            content: '鲁迅在日本仙台医学院学习时，看到日俄战争的幻灯片——中国人围观同胞被砍头却面无表情。他由此领悟：中国人需要的不是医治身体，而是医治精神。于是他弃医从文，拿起了比手术刀更锋利的武器——文字。',
          },
          {
            type: 'concept-box',
            content: '铁屋子的比喻：鲁迅在《呐喊·自序》中说，假如有一间铁屋子，绝无窗户且万难破毁，里面有许多熟睡的人，不久都要闷死了。你要不要叫醒他们？叫醒了只是让他们在清醒中感受死亡的痛苦，这是否更残忍？但鲁迅的回答是：既然有人醒了，就不能说绝没有打破铁屋的希望。',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '《呐喊》收录的重要篇目',
            children: [
              { type: 'text', content: '《狂人日记》 → 中国第一篇白话小说，揭示"吃人"的封建礼教' },
              { type: 'text', content: '《孔乙己》 → 科举制度毒害下的落魄文人' },
              { type: 'text', content: '《药》 → 革命者的牺牲与民众的愚昧' },
              { type: 'text', content: '《阿Q正传》 → "精神胜利法"的永恒讽刺' },
              { type: 'text', content: '《故乡》 → 社会阶层的隔阂与儿时友谊的幻灭' },
            ],
          },
          {
            type: 'highlight',
            content: '鲁迅写作的根本动力不是文学野心，而是对国民性的痛苦反思。他的每一篇小说都像一面镜子，照出社会最不愿面对的真相。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"凡是愚弱的国民，即使体格如何健全，如何茁壮，也只能做毫无意义的示众的材料和看客。"——鲁迅',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '狂人日记与阿Q正传',
        sections: [
          {
            type: 'header',
            content: '两座文学丰碑：疯狂的清醒与清醒的疯狂',
          },
          {
            type: 'concept-box',
            content: '《狂人日记》的革命性：表面上写一个精神病患者的妄想——他觉得所有人都要"吃"他。但读者很快发现，"狂人"才是唯一清醒的人。他看穿了封建礼教的本质——"仁义道德"的字缝里，满本都写着"吃人"二字。',
            emphasis: true,
          },
          {
            type: 'text',
            content: '《狂人日记》最震撼的结尾是："没有吃过人的孩子，或者还有？救救孩子……"这不是一个疯子的呓语，而是一个清醒者对下一代的绝望呼救。',
          },
          {
            type: 'numbered-list',
            content: '阿Q的"精神胜利法"典型表现',
            items: [
              {
                number: 1,
                title: '被打后的自我安慰',
                description: '"我总算被儿子打了。"通过把对方贬低为"儿子"，在精神上将屈辱转化为胜利。',
              },
              {
                number: 2,
                title: '选择性遗忘',
                description: '不愉快的事情很快就忘记了。记忆像筛子一样自动过滤掉失败和屈辱。',
              },
              {
                number: 3,
                title: '欺软怕硬',
                description: '被强者欺负后，转头去欺负更弱的人（如小尼姑），以此恢复心理平衡。',
              },
              {
                number: 4,
                title: '盲目跟风"革命"',
                description: '阿Q不理解革命的含义，却兴奋地想要参加，因为他以为革命就是"我也可以抢东西了"。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '"精神胜利法"是鲁迅对国民劣根性最深刻的概括。一百多年后，阿Q精神在生活中依然随处可见——每当我们用自我欺骗来逃避现实时，我们都是阿Q的后人。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"哀其不幸，怒其不争。"——鲁迅对底层民众的复杂情感',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '社会百态：孔乙己、药、故乡',
        sections: [
          {
            type: 'header',
            content: '三篇经典：知识分子、革命者与农民',
          },
          {
            type: 'card-group',
            content: '三个阶层的悲剧缩影',
            children: [
              { type: 'text', content: '《孔乙己》：科举制度的牺牲品。他是"站着喝酒而穿长衫的唯一的人"——既不属于底层劳动者，也无法进入上层社会，悬在中间，被两边嘲笑。' },
              { type: 'text', content: '《药》：革命者夏瑜为推翻封建统治而献身，但他的鲜血却被愚昧的民众当作治病的"药"——蘸着人血的馒头。革命者的牺牲，民众竟浑然不知。' },
              { type: 'text', content: '《故乡》：少年闰土是"我"的玩伴，活泼勇敢。二十年后再见，他叫出了一声"老爷"——社会等级制度已经在他们之间筑起了不可逾越的高墙。' },
            ],
          },
          {
            type: 'concept-box',
            content: '鲁迅笔下的"看客"心理：在《药》中，围观者兴奋地观看刑场上的杀人场景；在《孔乙己》中，酒客们以取笑孔乙己为乐。这种"看客"心态——对他人的苦难漠不关心，甚至以之为娱乐——是鲁迅反复批判的国民劣根性。',
            emphasis: true,
          },
          {
            type: 'text',
            content: '《故乡》结尾的名句："其实地上本没有路，走的人多了，也便成了路。"这既是对现实的无奈，也是对未来的一丝希望——即使前路未知，只要有人愿意走，终会踏出一条路来。',
          },
          {
            type: 'highlight',
            content: '鲁迅的伟大在于他不仅批判"敌人"（封建制度、帝国主义），更批判"自己人"（国民的劣根性）。这种自我解剖的勇气，使他的作品具有超越时代的力量。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '鲁迅的文学遗产与当代意义',
        sections: [
          {
            type: 'header',
            content: '为什么今天仍然需要读鲁迅',
          },
          {
            type: 'text',
            content: '鲁迅去世近百年，但他的作品依然生命力旺盛。这不仅因为他的文学技巧高超，更因为他揭示的问题——精神胜利法、看客心态、对知识分子的嘲讽、对革命的复杂态度——至今仍然存在于我们的社会中。',
          },
          {
            type: 'numbered-list',
            content: '《呐喊》的当代启示',
            items: [
              {
                number: 1,
                title: '警惕精神胜利法',
                description: '在社交媒体时代，"精神胜利法"以更隐蔽的形式存在。用段子消解严肃议题、用调侃替代反思，本质上都是阿Q的变体。',
              },
              {
                number: 2,
                title: '拒绝看客心态',
                description: '互联网让"围观"变得更容易。当我们在热搜面前只是"吃瓜"而不思考，我们就是鲁迅笔下的看客。',
              },
              {
                number: 3,
                title: '独立思考的勇气',
                description: '《狂人日记》中的"狂人"是唯一敢说"吃人"真相的人，尽管被视为疯子。在群体思维盛行的时代，独立思考需要更大的勇气。',
              },
            ],
          },
          {
            type: 'mindmap-branch',
            content: '鲁迅的写作风格特点',
            children: [
              { type: 'text', content: '白描手法 → 寥寥数笔勾勒人物全貌，不加修饰' },
              { type: 'text', content: '冷峻讽刺 → 不动声色中蕴含最深的悲悯' },
              { type: 'text', content: '象征手法 → "铁屋子""人血馒头"等意象层次丰富' },
              { type: 'text', content: '复杂叙事 → 在同情与批判之间保持张力' },
            ],
          },
          {
            type: 'concept-box',
            content: '鲁迅的矛盾与伟大：他对国民性的批判有时近乎绝望，但他仍然选择写作——用文字唤醒沉睡的人。这本身就是对"铁屋子比喻"的回答：即使不确定能否打破铁屋，也要发出呐喊。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"真的猛士，敢于直面惨淡的人生，敢于正视淋漓的鲜血。"——鲁迅',
          },
        ],
      },
    ],
  },

  // ─── 9. 挪威的森林 ───
  {
    id: 'summary-9',
    bookId: 'book-9',
    book: {
      id: 'book-9',
      title: '挪威的森林',
      author: '村上春树',
      category: '小说',
      description: '一段关于青春、爱情与失去的忧伤物语。',
      createdAt: new Date('2024-03-20'),
    },
    theme: {
      primaryColor: '#00695C',
      secondaryColor: '#80CBC4',
      accentColor: '#004D40',
      sidebarBg: '#E0F2F1',
      bannerBg: '#00796B',
      bannerText: '#E0F2F1',
      connectorColor: '#4DB6AC',
      conceptBoxBorder: '#00897B',
      highlightColor: '#004D40',
      backgroundPattern: 'waves',
      fontStyle: 'elegant',
    },
    readingTime: 12,
    generatedAt: new Date('2024-06-09'),
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '渡边、直子与木月：青春的创伤',
        sections: [
          {
            type: 'header',
            content: '三人世界的崩塌：从木月之死开始',
          },
          {
            type: 'text',
            content: '故事始于一架飞往汉堡的客机上。37岁的渡边听到机舱内播放《挪威的森林》，思绪瞬间被拉回了二十年前的东京。那时他十八岁，刚刚经历了最好的朋友木月的自杀——没有遗书，没有征兆，十七岁的生命在车库中戛然而止。',
          },
          {
            type: 'concept-box',
            content: '木月之死的深层意义：木月的自杀不仅仅是一个情节起点，它象征着"完美青春"的不可能。木月是那种什么都好的人——聪明、帅气、受欢迎。但正是因为太"完美"，他无法面对成长所必然带来的妥协和瑕疵。',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '三角关系的情感结构',
            children: [
              { type: 'text', content: '木月与直子 → 青梅竹马，互为彼此世界的全部' },
              { type: 'text', content: '木月与渡边 → 最好的朋友，但渡边永远无法完全理解木月' },
              { type: 'text', content: '渡边与直子 → 木月死后，两人因共同的失去而走到一起' },
            ],
          },
          {
            type: 'highlight',
            content: '村上春树在这部小说中探讨的核心问题是：我们如何与死亡共存？不是接受死亡的哲学意义，而是在日常生活中，如何带着逝者的记忆继续活下去。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"死并非生的对立面，而是作为生的一部分永存。"——村上春树《挪威的森林》',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '直子与绿子：生与死的两极',
        sections: [
          {
            type: 'header',
            content: '两个女性：沉沦的过去与鲜活的当下',
          },
          {
            type: 'text',
            content: '直子和绿子是渡边生命中最重要的两个女性，她们代表着截然相反的力量。直子向内、沉静、脆弱，活在逝去的记忆中；绿子向外、活泼、坚韧，充满生命力。渡边在两人之间的犹疑，本质上是他在"死亡的引力"和"生活的召唤"之间的选择。',
          },
          {
            type: 'card-group',
            content: '直子与绿子的对比',
            children: [
              { type: 'text', content: '直子：安静、内敛、美丽而脆弱。她住在远离城市的疗养院"阿美寮"，像一朵在暗处枯萎的花。她与渡边的关系建立在对木月的共同怀念之上。' },
              { type: 'text', content: '绿子：活泼、大胆、充满生命力。她经历了父母的相继去世，却始终保持着对生活的热爱。她对渡边说"我要你百分之百地只看我一个人"——这种直接和热烈是直子所没有的。' },
            ],
          },
          {
            type: 'concept-box',
            content: '阿美寮的象征意义：这个远离城市的疗养院，是一个介于生与死之间的空间。住在这里的人（包括直子）既不完全活着，也不完全死去。渡边每次探访阿美寮，都像是在生死边界上行走。',
            emphasis: true,
          },
          {
            type: 'text',
            content: '玲子是阿美寮中另一个重要角色——一位曾经才华横溢的音乐家，因精神崩溃来到这里。她成为直子和渡边之间的桥梁，也代表着"从黑暗中走出来"的可能性。',
          },
          {
            type: 'highlight',
            content: '村上春树不是让读者在直子和绿子之间做选择，而是让我们看到：健康地活下去，需要同时拥抱失去的勇气和热爱生活的力量。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '孤独与连接：村上式的存在主义',
        sections: [
          {
            type: 'header',
            content: '每个人都是一座孤岛',
          },
          {
            type: 'text',
            content: '《挪威的森林》中几乎所有角色都处于某种孤独之中。渡边在拥挤的大学里像一个旁观者；直子被自己的内心世界困住；绿子虽然开朗，却承受着父母双亡的孤独；永�的生活看似精彩纷呈，内心却空虚得令人恐惧。',
          },
          {
            type: 'mindmap-branch',
            content: '孤独的多种面貌',
            children: [
              { type: 'text', content: '渡边 → 主动选择的疏离，用阅读和散步维持与世界的距离' },
              { type: 'text', content: '直子 → 被创伤囚禁的封闭，无法与他人建立真正的连接' },
              { type: 'text', content: '永泽 → 才华横溢却情感冷漠，用征服他人来填补内心的虚无' },
              { type: 'text', content: '初美 → 深爱永泽却无法被真正爱回，温柔背后是深深的绝望' },
            ],
          },
          {
            type: 'concept-box',
            content: '永泽与初美的悲剧：永泽是渡边在大学的"朋友"——聪明、英俊、有野心。但他对待感情的方式是冷酷的。初美深爱永泽，最终在永泽出国后自杀。永泽和木月形成了有趣的对比：一个过于拥抱生活以至于伤害他人，一个过于逃避生活以至于伤害自己。',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '村上春树暗示：真正的连接不在于消除孤独，而在于两个孤独的人愿意走向彼此。渡边最终拨通绿子的电话，就是这种走向彼此的尝试——尽管他不知道自己在哪里。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"我在哪里都不是，在一个什么也没有的地方，不停地叫你的名字。"——渡边对绿子',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '成长的代价与文学的治愈',
        sections: [
          {
            type: 'header',
            content: '失去即成长：挪威的森林的终极主题',
          },
          {
            type: 'text',
            content: '《挪威的森林》是村上春树最"现实主义"的小说，没有他标志性的超现实元素。正因如此，它的情感力量更加直接和强烈。这是一个关于"成长必然伴随失去"的故事——我们每长大一点，就失去一些珍贵的东西。',
          },
          {
            type: 'numbered-list',
            content: '小说中的层层失去',
            items: [
              {
                number: 1,
                title: '友情的失去',
                description: '木月的死带走了渡边青春中最无忧无虑的部分。从此，他再也不能毫无负担地与人交往。',
              },
              {
                number: 2,
                title: '爱情的失去',
                description: '直子的死让渡边明白，有些人你无论多么努力去爱，都无法拯救。爱不是万能的。',
              },
              {
                number: 3,
                title: '纯真的失去',
                description: '整部小说是对"纯真年代"的告别。当最后一页翻过，渡边（和读者）都不再年轻了。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '披头士的《挪威的森林》：这首歌在小说中是直子最喜欢的曲子。歌曲本身讲述的是一段没有结果的邂逅——"她带我去她的房间，第二天早上醒来，她已经走了。"这种美好而无常的基调，恰如小说本身。',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '为什么这本小说如此打动人',
            children: [
              { type: 'text', content: '它不试图提供答案——它只是诚实地呈现年轻人面对生死时的困惑和无力' },
              { type: 'text', content: '村上的文字有一种独特的"温柔距离感"——既亲密又克制' },
              { type: 'text', content: '每个读者都能在其中找到自己失去过的某个人或某段时光' },
              { type: 'text', content: '它告诉我们：带着失去活下去，本身就是一种勇气' },
            ],
          },
          {
            type: 'highlight',
            content: '《挪威的森林》的最终启示：我们无法阻止失去，但可以选择如何记住。在记忆中，逝去的人永远年轻，而我们带着他们的影子继续前行。',
            emphasis: true,
          },
        ],
      },
    ],
  },

  // ─── 10. 卓有成效的管理者 ───
  {
    id: 'summary-10',
    bookId: 'book-10',
    book: {
      id: 'book-10',
      title: '卓有成效的管理者',
      author: '彼得·德鲁克',
      category: '管理',
      description: '管理学经典之作，教你如何成为一个高效的管理者。',
      createdAt: new Date('2024-03-25'),
    },
    theme: {
      primaryColor: '#1A237E',
      secondaryColor: '#7986CB',
      accentColor: '#FF6F00',
      sidebarBg: '#E8EAF6',
      bannerBg: '#283593',
      bannerText: '#C5CAE9',
      connectorColor: '#5C6BC0',
      conceptBoxBorder: '#3F51B5',
      highlightColor: '#FF6F00',
      backgroundPattern: 'grid',
      fontStyle: 'bold',
    },
    readingTime: 11,
    generatedAt: new Date('2024-06-10'),
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '有效性：管理者的核心使命',
        sections: [
          {
            type: 'header',
            content: '有效性可以学习：每个知识工作者都是管理者',
          },
          {
            type: 'text',
            content: '德鲁克在本书开篇就颠覆了一个常见误解：管理者不一定是"管人的人"。在知识经济时代，任何通过自己的知识对组织做出贡献的人，都是管理者——无论他有没有下属。一个软件工程师在选择技术方案时，一个医生在决定治疗计划时，都在做管理决策。',
          },
          {
            type: 'concept-box',
            content: '德鲁克的核心主张：才华横溢不等于有效。许多聪明绝顶的人终其一生碌碌无为，因为他们从未学会如何将自己的才华转化为成果。有效性是一种可以习得的技能，而非天赋。',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '管理者面临的四种现实约束',
            items: [
              {
                number: 1,
                title: '时间属于别人',
                description: '管理者的时间被无数人"占有"——上级、下属、客户、同事。如果不主动管理时间，时间就会被他人的需求吞噬。',
              },
              {
                number: 2,
                title: '被迫忙于"日常运营"',
                description: '除非主动做出改变，否则管理者会被日常事务淹没，永远在救火，永远没有时间做真正重要的事。',
              },
              {
                number: 3,
                title: '身处组织之中',
                description: '管理者的成果必须通过他人来实现。你的方案再好，如果无法被组织中的其他人理解和执行，就毫无价值。',
              },
              {
                number: 4,
                title: '受限于组织内部',
                description: '组织内部只有成本，成果存在于组织外部。管理者必须穿透组织的围墙，关注外部的机会和变化。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '德鲁克反复强调：效率是"把事情做对"，有效性是"做对的事情"。管理者的首要职责不是提高效率，而是确保组织在做正确的事。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '掌握时间：有效性的基础',
        sections: [
          {
            type: 'header',
            content: '记录时间、管理时间、集中时间',
          },
          {
            type: 'text',
            content: '德鲁克认为，时间是管理者最稀缺的资源。金钱可以筹集，人才可以招聘，但时间无法增加。因此，有效的管理者都从管理时间开始——不是从管理任务开始。',
          },
          {
            type: 'numbered-list',
            content: '时间管理三步法',
            items: [
              {
                number: 1,
                title: '记录时间',
                description: '连续记录实际时间使用情况，至少持续三到四周。大多数管理者会惊讶地发现，他们以为自己花在重要事务上的时间，实际上远少于预期。',
              },
              {
                number: 2,
                title: '诊断时间',
                description: '审视记录，找出可以削减或委派的活动。问三个问题：这件事如果完全不做，会有什么后果？这件事能否让别人代做？我在浪费别人的时间吗？',
              },
              {
                number: 3,
                title: '集中时间',
                description: '将可自由支配的时间集中为大块。德鲁克发现，即使是普通的知识工作，也需要至少90分钟的不间断时间才能产出有价值的成果。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '组织中大量的时间浪费来自于制度性问题：过多的会议（说明组织结构有问题）、过多的人际协调（说明职责划分不清）、过多的信息获取（说明信息系统设计不当）。',
            emphasis: true,
          },
          {
            type: 'highlight',
            content: '德鲁克的时间观念：不要从"该做什么"出发，而是从"有多少时间"出发。先搞清楚自己实际拥有多少可支配时间，再决定能做什么。',
            emphasis: true,
          },
          {
            type: 'quote',
            content: '"时间是最特殊的资源。在任何其他资源中都有替代品的可能，唯独时间没有。"——彼得·德鲁克',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '用人之长：充分发挥人才优势',
        sections: [
          {
            type: 'header',
            content: '卓有成效的管理者用人所长，而非补人所短',
          },
          {
            type: 'text',
            content: '德鲁克关于用人最深刻的洞见是：有效的管理者不试图改变人，而是发挥每个人已有的长处。他举了林肯的例子——林肯任命格兰特为总司令时，有人提醒他格兰特嗜酒。林肯回答："如果我知道他喝的什么牌子的酒，我会送给其他将军每人一箱。"',
          },
          {
            type: 'concept-box',
            content: '职位设计的原则：好的职位应该让人凭借长处就能出色完成工作，而不是要求一个全能型人才。如果一个职位连续两三个人都做不好，不是人的问题，是职位设计的问题。',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '用人之长的四个原则',
            children: [
              { type: 'text', content: '不设计"只有天才才能胜任"的职位 → 组织必须靠普通人做出不普通的事' },
              { type: 'text', content: '让每个职位都有足够的"宽度" → 让人有空间发挥长处' },
              { type: 'text', content: '从"这个人能做什么"出发 → 而非从"这个人有什么缺点"出发' },
              { type: 'text', content: '容忍缺点 → 只要缺点不在职位的关键领域，就应该被接受' },
            ],
          },
          {
            type: 'text',
            content: '德鲁克还强调了"管理上司"的重要性。有效的管理者了解上司的工作风格和长处，用上司最擅长的方式与其沟通。这不是溜须拍马，而是让上司能够有效地支持你的工作。',
          },
          {
            type: 'highlight',
            content: '组织的目的不是把弱者变成强者，而是让每个人的长处都能得到充分发挥。一个只看到人的缺点的管理者，注定是无效的。',
            emphasis: true,
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '要事优先与决策的艺术',
        sections: [
          {
            type: 'header',
            content: '集中精力于少数关键领域',
          },
          {
            type: 'text',
            content: '德鲁克观察到，卓有成效的管理者有一个共同特征：他们一次只做一件最重要的事。这听起来简单，执行起来却极其困难——因为总有紧急的事情在争抢注意力。',
          },
          {
            type: 'numbered-list',
            content: '确定优先级的原则',
            items: [
              {
                number: 1,
                title: '重将来而非重过去',
                description: '不要因为"我们一直在做这件事"就继续做。问自己：如果今天还没有开始做这件事，知道了现在所知道的一切，我还会开始做吗？',
              },
              {
                number: 2,
                title: '重机会而非重问题',
                description: '把最好的资源分配给机会，而不是问题。问题再多也只能减少损失，只有机会能带来成果。',
              },
              {
                number: 3,
                title: '选择自己的方向',
                description: '不要随波逐流。卓有成效的管理者设定自己的优先顺序，而不是被外界的压力所左右。',
              },
              {
                number: 4,
                title: '目标高远',
                description: '不要选择"安全"的目标。有影响力的成果来自于大胆但经过深思熟虑的选择。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '决策的关键不在于速度而在于质量。德鲁克区分了两种决策：一种是适应性决策（大部分情况可以套用已有的规则），另一种是真正的战略决策（需要改变游戏规则）。有效的管理者在适应性决策上快速处理，在战略决策上深入思考。',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '德鲁克的决策五要素',
            children: [
              { type: 'text', content: '判断问题的性质——是偶发的还是系统性的？' },
              { type: 'text', content: '明确决策要达成的边界条件和目标' },
              { type: 'text', content: '先考虑"正确的解决方案"，再考虑"可行的妥协"' },
              { type: 'text', content: '将行动方案内置于决策中——谁做、何时做、如何验证' },
              { type: 'text', content: '建立反馈机制，用实际结果检验决策的有效性' },
            ],
          },
          {
            type: 'highlight',
            content: '德鲁克的管理哲学归结为一句话：管理者存在的意义不是做更多的事，而是确保正确的事得以完成。少即是多——这不仅适用于管理，也适用于人生。',
            emphasis: true,
          },
        ],
      },
    ],
  },
];

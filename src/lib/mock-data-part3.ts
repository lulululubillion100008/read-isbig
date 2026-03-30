import type { BookSummary } from '@/lib/types';

export const summariesPart3: BookSummary[] = [
  // 21. 朝花夕拾
  {
    id: 'summary-21',
    bookId: 'book-21',
    book: {
      id: 'book-21',
      title: '朝花夕拾',
      author: '鲁迅',
      category: '文学',
      description: '鲁迅唯一的散文集，回忆童年与青年时代的温情与苦涩。',
      createdAt: new Date('2024-03-10'),
    },
    theme: {
      primaryColor: '#5D4037',
      secondaryColor: '#8D6E63',
      accentColor: '#3E2723',
      sidebarBg: '#2C1E16',
      bannerBg: '#1B1210',
      bannerText: '#EFEBE9',
      connectorColor: '#5D4037',
      conceptBoxBorder: '#8D6E63',
      highlightColor: '#A1887F',
      backgroundPattern: 'lines',
      fontStyle: 'classic',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 童年的乐园',
        sections: [
          {
            type: 'header',
            content: '百草园与三味书屋——童年的两极',
          },
          {
            type: 'concept-box',
            content: '百草园：自由与天性的象征',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '百草园中的生命记忆',
            children: [
              { type: 'text', content: '碧绿的菜畦、光滑的石井栏、高大的皂荚树' },
              { type: 'text', content: '鸣蝉、黄蜂、叫天子——自然界的无穷乐趣' },
              { type: 'text', content: '长妈妈讲述美女蛇的故事，恐怖与好奇交织' },
              { type: 'text', content: '雪地捕鸟的冬日欢乐，闰土父亲传授的技艺' },
            ],
          },
          {
            type: 'concept-box',
            content: '三味书屋：规训与束缚的开始',
            emphasis: true,
          },
          {
            type: 'text',
            content: '从百草园到三味书屋的转变，隐喻着从自由天性到社会规训的必经之路。寿镜吾老先生虽然严厉，却也有其可爱之处——读书入神时的摇头晃脑，构成了鲁迅对传统教育的复杂态度。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 人物群像',
        sections: [
          {
            type: 'header',
            content: '温情与批判交织的人物书写',
          },
          {
            type: 'numbered-list',
            content: '散文集中的关键人物',
            items: [
              {
                number: 1,
                title: '长妈妈',
                description: '质朴善良的保姆，虽有愚昧的一面（踩死隐鼠），却真心疼爱鲁迅，费尽周折买来《山海经》。',
              },
              {
                number: 2,
                title: '藤野先生',
                description: '在日本仙台求学时遇到的解剖学教授，不带民族偏见，认真修改鲁迅的讲义，是鲁迅最敬重的老师。',
              },
              {
                number: 3,
                title: '范爱农',
                description: '一个正直却不得志的知识分子，最终溺水而亡，折射出辛亥革命后知识分子的悲剧命运。',
              },
              {
                number: 4,
                title: '衍太太',
                description: '表面和善、实则阴险的邻居，鼓励孩子做危险的事，代表了鲁迅笔下市侩世故的一类人。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '鲁迅笔下的人物从不是非黑即白，而是在温情回忆中融入了深刻的社会批判。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 社会批判',
        sections: [
          {
            type: 'header',
            content: '以回忆为武器的社会批判',
          },
          {
            type: 'concept-box',
            content: '封建礼教对儿童天性的压抑',
            emphasis: true,
          },
          {
            type: 'text',
            content: '《五猖会》中父亲强迫鲁迅在出发看赛会前背诵《鉴略》，孩子的兴奋被瞬间浇灭。这不仅是个人经历的记录，更是对封建教育扼杀儿童天性的深刻控诉。',
          },
          {
            type: 'mindmap-branch',
            content: '批判的多重维度',
            children: [
              { type: 'text', content: '《二十四孝图》：揭露封建孝道的虚伪与残忍' },
              { type: 'text', content: '《无常》：借鬼神世界讽刺人间不公——阴间比阳间更有公理' },
              { type: 'text', content: '《琐记》：批判迂腐的洋务学堂教育' },
            ],
          },
          {
            type: 'quote',
            content: '"我常想在纷扰中寻出一点闲静来，然而委实不容易。"——鲁迅在喧嚣中寻找内心平静的写照。',
          },
          {
            type: 'highlight',
            content: '《朝花夕拾》的独特之处在于：它不是冷峻的匕首，而是带着体温的回忆录，温柔中藏着锋芒。',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 文学价值',
        sections: [
          {
            type: 'header',
            content: '散文的艺术与思想遗产',
          },
          {
            type: 'numbered-list',
            content: '《朝花夕拾》的文学贡献',
            items: [
              {
                number: 1,
                title: '散文体裁的革新',
                description: '将叙事、抒情、议论三者融合，开创了中国现代散文的新范式。',
              },
              {
                number: 2,
                title: '双重叙事视角',
                description: '以成人的眼光回望童年，在怀旧与反思之间形成张力。',
              },
              {
                number: 3,
                title: '个人记忆与民族命运',
                description: '个人经历折射整个时代的变迁，从晚清到民国的社会转型。',
              },
            ],
          },
          {
            type: 'card-group',
            content: '核心主题',
            children: [
              { type: 'text', content: '童年的纯真与成人世界的复杂' },
              { type: 'text', content: '传统文化的温情与糟粕并存' },
              { type: 'text', content: '知识分子在时代洪流中的抉择' },
              { type: 'text', content: '回忆作为精神寄托与反思工具' },
            ],
          },
          {
            type: 'quote',
            content: '"朝花夕拾"——早晨的花傍晚拾起，寓意对过去的珍视与重新审视。在时间的距离中，苦涩化为回甘。',
          },
        ],
      },
    ],
    readingTime: 10,
    generatedAt: new Date('2024-03-10'),
  },

  // 22. 海边的卡夫卡
  {
    id: 'summary-22',
    bookId: 'book-22',
    book: {
      id: 'book-22',
      title: '海边的卡夫卡',
      author: '村上春树',
      category: '小说',
      description: '一个15岁少年离家出走的奇幻之旅，关于命运与自我救赎。',
      createdAt: new Date('2024-03-12'),
    },
    theme: {
      primaryColor: '#006064',
      secondaryColor: '#00838F',
      accentColor: '#00ACC1',
      sidebarBg: '#0D2B2E',
      bannerBg: '#0A1F21',
      bannerText: '#E0F7FA',
      connectorColor: '#00838F',
      conceptBoxBorder: '#006064',
      highlightColor: '#26C6DA',
      backgroundPattern: 'waves',
      fontStyle: 'modern',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 逃离与宿命',
        sections: [
          {
            type: 'header',
            content: '田村卡夫卡——逃离命运的少年',
          },
          {
            type: 'concept-box',
            content: '俄狄浦斯式的诅咒',
            emphasis: true,
          },
          {
            type: 'text',
            content: '十五岁的田村卡夫卡在生日那天离家出走，逃向四国的高松市。他的父亲——著名雕塑家田村浩一——对他施加了一个可怕的预言：你将弑父，并与你的母亲和姐姐交合。整部小说围绕着这个预言展开，少年试图通过逃离来对抗宿命。',
          },
          {
            type: 'mindmap-branch',
            content: '卡夫卡的逃亡路线',
            children: [
              { type: 'text', content: '东京出发，乘坐夜间巴士前往高松' },
              { type: 'text', content: '在甲村图书馆找到精神的避风港' },
              { type: 'text', content: '遇见佐伯女士——可能的生母' },
              { type: 'text', content: '最终进入森林深处的"另一个世界"' },
            ],
          },
          {
            type: 'highlight',
            content: '"世界上最坚强的十五岁少年"——这是卡夫卡给自己的定位，也是他对抗命运的武器。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 双线叙事',
        sections: [
          {
            type: 'header',
            content: '中田与卡夫卡——两条命运线的交织',
          },
          {
            type: 'concept-box',
            content: '中田先生：失去影子的老人',
            emphasis: true,
          },
          {
            type: 'text',
            content: '中田先生在二战期间的一次神秘事件中失去了识字能力和部分记忆，却获得了与猫对话的能力。他是卡夫卡的镜像——一个被命运剥夺了正常生活的温和老人，在不自觉中完成了卡夫卡预言中"弑父"的部分。',
          },
          {
            type: 'numbered-list',
            content: '两条叙事线的对比',
            items: [
              {
                number: 1,
                title: '卡夫卡线',
                description: '奇数章节，第一人称叙述，向内探索自我意识与欲望。',
              },
              {
                number: 2,
                title: '中田线',
                description: '偶数章节，第三人称叙述，在外部世界中执行命运的安排。',
              },
              {
                number: 3,
                title: '交汇点',
                description: '两条线在"入口之石"处交汇，打开了现实与超现实的通道。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '村上春树的双线结构暗示：命运不是线性的，自我的不同面向可能在不同维度同时展开。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 隐喻世界',
        sections: [
          {
            type: 'header',
            content: '森林、图书馆与入口之石',
          },
          {
            type: 'card-group',
            content: '核心隐喻',
            children: [
              { type: 'text', content: '森林：无意识的深层领域，自我迷失与重生之地' },
              { type: 'text', content: '甲村图书馆：知识与记忆的庇护所，连接过去与现在' },
              { type: 'text', content: '入口之石：现实与异世界的门槛，存在的边界' },
              { type: 'text', content: '天降鱼雨/蛭雨：超自然力量对现实秩序的侵入' },
            ],
          },
          {
            type: 'concept-box',
            content: '佐伯女士的十五岁幽灵',
            emphasis: true,
          },
          {
            type: 'text',
            content: '佐伯女士年轻时的幽灵每晚出现在图书馆的房间里，凝视着一幅名为"海边的卡夫卡"的画。这个意象将时间折叠——十五岁的佐伯与十五岁的卡夫卡在不同的时空中相遇，暗示爱与记忆可以超越时间。',
          },
          {
            type: 'quote',
            content: '"命运就像沙尘暴，你无处逃遁。当你从沙尘暴中逃出，你已不是跨入沙尘暴时的那个人了。"',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 音乐与文学引用',
        sections: [
          {
            type: 'header',
            content: '贯穿全书的文化密码',
          },
          {
            type: 'mindmap-branch',
            content: '文学与音乐的互文',
            children: [
              { type: 'text', content: '卡夫卡（作家）：变形、异化、无法逃离的荒诞' },
              { type: 'text', content: '贝多芬《大公三重奏》：佐伯青春时代的旋律' },
              { type: 'text', content: '《源氏物语》：活灵的概念，精神与肉体的分离' },
              { type: 'text', content: '俄狄浦斯神话：预言的自我实现与反抗' },
            ],
          },
          {
            type: 'numbered-list',
            content: '叙事技巧',
            items: [
              {
                number: 1,
                title: '第二人称叙述',
                description: '卡夫卡章节中"叫乌鸦的少年"以第二人称出现，是卡夫卡内心的另一个声音。',
              },
              {
                number: 2,
                title: '开放式结局',
                description: '预言是否真的实现？佐伯是否是母亲？村上刻意留下模糊空间。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '村上春树说："我想写一个现代版的《源氏物语》"——古典的宿命主题在现代语境中获得了新的意义。',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '第五章: 成长与回归',
        sections: [
          {
            type: 'header',
            content: '穿越暴风雨后的自我重建',
          },
          {
            type: 'text',
            content: '卡夫卡在森林深处的"另一个世界"中见到了年轻的佐伯，体验了一种超越时间的存在。但他最终选择回到现实世界——不是因为那里更好，而是因为"活在现实中"本身就是一种勇气。',
          },
          {
            type: 'concept-box',
            content: '回归即成长',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '卡夫卡的成长轨迹',
            items: [
              {
                number: 1,
                title: '出发：逃离',
                description: '被恐惧和愤怒驱动，试图通过物理距离逃避预言。',
              },
              {
                number: 2,
                title: '经历：直面',
                description: '在图书馆和森林中，直面自己的欲望、暴力和脆弱。',
              },
              {
                number: 3,
                title: '回归：接受',
                description: '接受自己已被暴风雨改变的事实，以新的自我回到世界。',
              },
            ],
          },
          {
            type: 'quote',
            content: '"暴风雨结束后，你不会记得自己是怎样活过来的。但有一件事是确定的：当你穿过了暴风雨，你就不再是从前那个人。"',
          },
          {
            type: 'highlight',
            content: '这是一部关于"成为自己"的小说。真正的救赎不在于逃离命运，而在于穿越命运后依然选择活下去。',
          },
        ],
      },
    ],
    readingTime: 14,
    generatedAt: new Date('2024-03-12'),
  },

  // 23. 黑暗森林
  {
    id: 'summary-23',
    bookId: 'book-23',
    book: {
      id: 'book-23',
      title: '黑暗森林',
      author: '刘慈欣',
      category: '科幻',
      description: '三体第二部，面壁者与宇宙文明的终极博弈。',
      createdAt: new Date('2024-03-15'),
    },
    theme: {
      primaryColor: '#1A237E',
      secondaryColor: '#283593',
      accentColor: '#536DFE',
      sidebarBg: '#0D1030',
      bannerBg: '#080B20',
      bannerText: '#C5CAE9',
      connectorColor: '#3949AB',
      conceptBoxBorder: '#1A237E',
      highlightColor: '#7986CB',
      backgroundPattern: 'dots',
      fontStyle: 'bold',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 面壁计划',
        sections: [
          {
            type: 'header',
            content: '人类最后的反击——面壁者',
          },
          {
            type: 'concept-box',
            content: '面壁计划：利用智子无法监测人类思维的漏洞',
            emphasis: true,
          },
          {
            type: 'text',
            content: '三体人的智子锁死了地球基础科学，并实时监控人类的一切通讯与行为。然而智子无法读取人类的思想。联合国利用这一漏洞，授权四位面壁者制定只存在于大脑中的战略计划，任何人无法质疑其行为的真实目的。',
          },
          {
            type: 'numbered-list',
            content: '四位面壁者',
            items: [
              {
                number: 1,
                title: '弗雷德里克·泰勒',
                description: '前美国国防部长，计划用纳米材料和核弹打造人类舰队的"量子幽灵"。',
              },
              {
                number: 2,
                title: '曼努尔·雷迪亚兹',
                description: '委内瑞拉总统，计划引爆水星将其推入太阳，把太阳系变成"焦土"。',
              },
              {
                number: 3,
                title: '比尔·希恩斯',
                description: '脑科学家，研究"思想钢印"——用技术手段制造坚定的信仰。',
              },
              {
                number: 4,
                title: '罗辑',
                description: '一个普通的社会学教授，看似最不称职的面壁者，却是最终的关键。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '三体人为每位面壁者指定了一位"破壁人"——地球三体组织的精英，专门破解面壁者的真实计划。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 罗辑的觉醒',
        sections: [
          {
            type: 'header',
            content: '从玩世不恭到文明守护者',
          },
          {
            type: 'text',
            content: '罗辑最初是一个享乐主义者，利用面壁者的特权为自己营造了一个伊甸园式的生活——在北欧雪山中与梦中情人庄颜过着田园般的日子。然而当其他面壁者相继被破壁，当庄颜和孩子进入冬眠，罗辑被迫直面自己的使命。',
          },
          {
            type: 'concept-box',
            content: '叶文洁的启示：宇宙社会学的两条公理',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '宇宙社会学基本公理',
            children: [
              { type: 'text', content: '第一公理：生存是文明的第一需要' },
              { type: 'text', content: '第二公理：文明不断增长和扩张，但宇宙中的物质总量保持不变' },
            ],
          },
          {
            type: 'highlight',
            content: '这两条看似简单的公理，加上"猜疑链"和"技术爆炸"两个概念，推导出了宇宙文明间最残酷的生存法则。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 黑暗森林法则',
        sections: [
          {
            type: 'header',
            content: '宇宙文明的终极法则',
          },
          {
            type: 'concept-box',
            content: '黑暗森林法则',
            emphasis: true,
          },
          {
            type: 'text',
            content: '宇宙就是一座黑暗森林，每个文明都是带枪的猎人。在这片森林中，他人就是地狱，就是永恒的威胁。任何暴露自己存在的文明都将被立即消灭。因为在猜疑链的作用下，即使善意的文明也无法确定对方的善意，而技术爆炸使得任何弱小的文明都可能在瞬间变为威胁。',
          },
          {
            type: 'mindmap-branch',
            content: '黑暗森林法则的推导',
            children: [
              { type: 'text', content: '猜疑链：文明间无法建立信任，因为"你不知道我是否认为你是善意的"无限循环' },
              { type: 'text', content: '技术爆炸：任何文明都可能在短时间内实现技术飞跃，弱者可能突然变为强者' },
              { type: 'text', content: '结论：发现即毁灭——最安全的策略就是消灭一切被发现的文明' },
            ],
          },
          {
            type: 'quote',
            content: '"宇宙很大，但生命更大。"——罗辑在理解黑暗森林法则后的感慨。',
          },
          {
            type: 'highlight',
            content: '黑暗森林法则是对费米悖论（宇宙中为何没有外星文明的迹象？）的一种惊人回答：不是没有，而是暴露者都已被消灭。',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 末日之战',
        sections: [
          {
            type: 'header',
            content: '水滴与人类舰队的覆灭',
          },
          {
            type: 'text',
            content: '人类用两百年时间建造了庞大的太空舰队，自信已具备与三体文明抗衡的实力。然而三体舰队的先遣探测器——一个被称为"水滴"的光滑物体——仅用三十分钟便摧毁了人类全部两千余艘战舰。水滴的表面由强相互作用力材料制成，是人类科技无法理解的存在。',
          },
          {
            type: 'concept-box',
            content: '末日之战：技术代差下的绝望',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '末日之战的启示',
            items: [
              {
                number: 1,
                title: '科技自大的代价',
                description: '人类以为两百年的发展足以对抗外星文明，却不知在宇宙尺度上这不过是沧海一粟。',
              },
              {
                number: 2,
                title: '降维打击的概念雏形',
                description: '水滴对人类舰队的摧毁预示了更高维度文明的打击方式。',
              },
              {
                number: 3,
                title: '逃亡主义的正当性',
                description: '"青铜时代号"和"蓝色空间号"的逃亡被证明是唯一正确的选择。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '末日之战是《三体》系列中最震撼的场景之一，彻底粉碎了人类的技术优越感。',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '第五章: 威慑与均衡',
        sections: [
          {
            type: 'header',
            content: '罗辑的最终博弈',
          },
          {
            type: 'text',
            content: '在人类几近绝望之际，罗辑完成了他的面壁计划。他向宇宙广播了一颗恒星的坐标，随后这颗恒星被未知的高级文明摧毁——这验证了黑暗森林法则的真实性。罗辑以此为威慑：如果三体文明不退让，他将广播三体星系和太阳系的坐标，同归于尽。',
          },
          {
            type: 'concept-box',
            content: '黑暗森林威慑：宇宙版的核威慑',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '威慑的本质',
            children: [
              { type: 'text', content: '相互确保毁灭（MAD）：广播坐标意味着双方同时暴露' },
              { type: 'text', content: '罗辑成为"执剑人"：手握全人类与三体文明的生死开关' },
              { type: 'text', content: '脆弱的和平：威慑的有效性取决于执剑人的决心' },
            ],
          },
          {
            type: 'card-group',
            content: '《黑暗森林》的思想遗产',
            children: [
              { type: 'text', content: '宇宙社会学：将国际关系理论拓展到宇宙尺度' },
              { type: 'text', content: '文明的道德困境：生存与道德能否并存？' },
              { type: 'text', content: '个体与文明：一个人的思想如何拯救整个物种' },
              { type: 'text', content: '技术乐观主义的反思：科技进步不等于文明安全' },
            ],
          },
          {
            type: 'quote',
            content: '"给岁月以文明，而不是给文明以岁月。"——面对宇宙的黑暗，选择如何度过有限的存在。',
          },
        ],
      },
    ],
    readingTime: 15,
    generatedAt: new Date('2024-03-15'),
  },

  // 24. 非暴力沟通
  {
    id: 'summary-24',
    bookId: 'book-24',
    book: {
      id: 'book-24',
      title: '非暴力沟通',
      author: '马歇尔·卢森堡',
      category: '心理学',
      description: '一种基于爱与尊重的沟通方式，化解冲突、建立连接。',
      createdAt: new Date('2024-03-18'),
    },
    theme: {
      primaryColor: '#2E7D32',
      secondaryColor: '#43A047',
      accentColor: '#66BB6A',
      sidebarBg: '#1A2E1B',
      bannerBg: '#0F1F10',
      bannerText: '#E8F5E9',
      connectorColor: '#388E3C',
      conceptBoxBorder: '#2E7D32',
      highlightColor: '#81C784',
      backgroundPattern: 'grid',
      fontStyle: 'elegant',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 沟通中的暴力',
        sections: [
          {
            type: 'header',
            content: '语言中隐藏的暴力',
          },
          {
            type: 'concept-box',
            content: '暴力沟通的四种形式',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '日常语言中的隐性暴力',
            items: [
              {
                number: 1,
                title: '道德评判',
                description: '"你太自私了""你怎么这么懒"——用道德标签否定他人的存在。',
              },
              {
                number: 2,
                title: '比较',
                description: '"你看看人家的孩子"——比较是最隐蔽的暴力，剥夺人的独特价值。',
              },
              {
                number: 3,
                title: '回避责任',
                description: '"我不得不这样做"——用"不得不"掩盖自己的选择权。',
              },
              {
                number: 4,
                title: '强人所难',
                description: '用威胁或惩罚迫使他人服从，而非邀请合作。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '卢森堡认为：语言暴力的根源不是恶意，而是我们从未学习过如何表达真实的感受和需要。',
          },
          {
            type: 'quote',
            content: '"语言是窗户，也是墙壁。它既能打开心扉，也能关闭心门。"',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 非暴力沟通的四要素',
        sections: [
          {
            type: 'header',
            content: 'NVC模型：观察-感受-需要-请求',
          },
          {
            type: 'numbered-list',
            content: '非暴力沟通的四个核心步骤',
            items: [
              {
                number: 1,
                title: '观察（Observation）',
                description: '客观描述所看到的事实，不加评判。"你这周有三天晚回家"而非"你总是很晚回来"。',
              },
              {
                number: 2,
                title: '感受（Feeling）',
                description: '表达由此产生的真实感受。"我感到担心和孤独"而非"你让我很生气"。',
              },
              {
                number: 3,
                title: '需要（Need）',
                description: '说明感受背后未被满足的需要。"因为我需要陪伴和安全感。"',
              },
              {
                number: 4,
                title: '请求（Request）',
                description: '提出具体、可操作的请求。"你能否在晚归时给我发个消息？"',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '观察与评论的区别是NVC的关键第一步',
            emphasis: true,
          },
          {
            type: 'text',
            content: '印度哲学家克里希那穆提曾说："不带评论的观察是人类智力的最高形式。"区分观察和评论，意味着放弃"对与错"的二元思维，转而关注"发生了什么"和"我有什么感受"。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 倾听的力量',
        sections: [
          {
            type: 'header',
            content: '用心倾听：连接的基础',
          },
          {
            type: 'text',
            content: '非暴力沟通不仅是表达自己的方式，更是倾听他人的方式。当他人说出带有攻击性的话语时，NVC训练我们透过语言听到对方未被满足的需要。',
          },
          {
            type: 'mindmap-branch',
            content: '倾听的四个层次',
            children: [
              { type: 'text', content: '敷衍式倾听：假装在听，心不在焉' },
              { type: 'text', content: '选择性倾听：只听自己想听的部分' },
              { type: 'text', content: '专注式倾听：全神贯注于对方的话语' },
              { type: 'text', content: '同理心倾听：感受对方话语背后的情感与需要' },
            ],
          },
          {
            type: 'concept-box',
            content: '同理心不是同情心',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '同理心vs同情心',
            children: [
              { type: 'text', content: '同情心："你真可怜"——居高临下的怜悯' },
              { type: 'text', content: '同理心："你一定很难过"——平等的理解与陪伴' },
              { type: 'text', content: '同情心关注问题本身，同理心关注人的感受' },
              { type: 'text', content: '同理心需要"全然的临在"——放下自己的判断和建议' },
            ],
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 实践与转化',
        sections: [
          {
            type: 'header',
            content: '在日常生活中践行NVC',
          },
          {
            type: 'numbered-list',
            content: 'NVC的应用场景',
            items: [
              {
                number: 1,
                title: '亲密关系',
                description: '将"你从不关心我"转化为"当你连续加班时，我感到被忽略，因为我需要亲密连接。"',
              },
              {
                number: 2,
                title: '亲子教育',
                description: '将"你怎么又考这么差"转化为"看到成绩单，我有些担心，因为我希望你能有更好的学习体验。"',
              },
              {
                number: 3,
                title: '职场冲突',
                description: '将"你的报告太差了"转化为"报告中有几处数据需要核实，我希望我们能一起确保准确性。"',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '自我同理：NVC从善待自己开始',
            emphasis: true,
          },
          {
            type: 'text',
            content: '卢森堡强调，非暴力沟通的第一步是对自己使用NVC。当我们犯错时，用"我选择这样做是因为……"替代"我不得不""我应该"，重新找回自主权和自我慈悲。',
          },
          {
            type: 'quote',
            content: '"当我们真正倾听彼此的需要，敌意就会消融——因为所有人的需要本质上都是相同的：被看见、被理解、被尊重。"',
          },
          {
            type: 'highlight',
            content: 'NVC不是一种沟通技巧，而是一种生活方式——它邀请我们重新看待人与人之间的关系。',
          },
        ],
      },
    ],
    readingTime: 11,
    generatedAt: new Date('2024-03-18'),
  },

  // 25. 影响力
  {
    id: 'summary-25',
    bookId: 'book-25',
    book: {
      id: 'book-25',
      title: '影响力',
      author: '罗伯特·西奥迪尼',
      category: '心理学',
      description: '揭示说服他人的六大心理学原则。',
      createdAt: new Date('2024-03-20'),
    },
    theme: {
      primaryColor: '#BF360C',
      secondaryColor: '#E64A19',
      accentColor: '#FF6E40',
      sidebarBg: '#2C1308',
      bannerBg: '#1A0B05',
      bannerText: '#FBE9E7',
      connectorColor: '#D84315',
      conceptBoxBorder: '#BF360C',
      highlightColor: '#FF8A65',
      backgroundPattern: 'none',
      fontStyle: 'bold',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 影响力的武器',
        sections: [
          {
            type: 'header',
            content: '自动反应与固定行为模式',
          },
          {
            type: 'text',
            content: '西奥迪尼发现，人类在面对复杂决策时，往往依赖心理捷径（固定行为模式）来做出反应。这些捷径在大多数情况下是有效的，但也使我们容易被有意利用这些模式的人所操纵。',
          },
          {
            type: 'concept-box',
            content: '触发特征：一个简单的信号就能启动一连串自动行为',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '六大影响力原则概览',
            items: [
              {
                number: 1,
                title: '互惠原则',
                description: '我们倾向于回报别人给予我们的好处。',
              },
              {
                number: 2,
                title: '承诺和一致性',
                description: '一旦做出选择或表明立场，我们会努力保持一致。',
              },
              {
                number: 3,
                title: '社会认同',
                description: '我们会参考他人的行为来决定自己的行为。',
              },
              {
                number: 4,
                title: '喜好原则',
                description: '我们更容易答应自己喜欢的人提出的请求。',
              },
              {
                number: 5,
                title: '权威原则',
                description: '我们倾向于服从权威人士的指示。',
              },
              {
                number: 6,
                title: '稀缺原则',
                description: '越稀少的东西，我们越觉得它有价值。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '了解这些原则不仅是为了防止被操纵，更是为了理解人类决策的深层机制。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 互惠与承诺',
        sections: [
          {
            type: 'header',
            content: '亏欠感与一致性的力量',
          },
          {
            type: 'concept-box',
            content: '互惠原则：人情债是最强的社会纽带',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '互惠原则的运作方式',
            children: [
              { type: 'text', content: '免费试用、免费样品——制造亏欠感' },
              { type: 'text', content: '拒绝-退让策略：先提大要求被拒，再提小要求更易被接受' },
              { type: 'text', content: '即使是不请自来的好处，也会激发回报的义务感' },
              { type: 'text', content: '互惠的力量超越了对给予者的好恶' },
            ],
          },
          {
            type: 'concept-box',
            content: '承诺和一致性：言行一致的心理需求',
            emphasis: true,
          },
          {
            type: 'text',
            content: '一旦我们做出了某个承诺（尤其是公开的、书面的、付出努力的），内心就会产生强大的压力来保持一致。商家利用"登门槛效应"：先让你答应一个小请求，再逐步升级。因为人们不愿意被视为言行不一的人。',
          },
          {
            type: 'quote',
            content: '"脑子里的一致性自动导航系统让我们在很多时候无需思考就能做出决定——但这也正是危险所在。"',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 社会认同与喜好',
        sections: [
          {
            type: 'header',
            content: '从众心理与人际吸引力',
          },
          {
            type: 'concept-box',
            content: '社会认同：在不确定时，我们看别人怎么做',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '社会认同的表现',
            items: [
              {
                number: 1,
                title: '罐头笑声效应',
                description: '电视节目加入笑声轨道，观众就更觉得节目好笑。',
              },
              {
                number: 2,
                title: '排队效应',
                description: '门口排长队的餐厅被认为更好吃，即使品质一样。',
              },
              {
                number: 3,
                title: '旁观者效应',
                description: '在紧急情况下，人越多反而越少人施救——"别人不动，我也不动"。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '喜好原则：我们买的不是产品，是销售员的魅力',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '让人喜欢你的五个因素',
            children: [
              { type: 'text', content: '外表魅力：好看的人被认为更聪明、更善良（光环效应）' },
              { type: 'text', content: '相似性：我们喜欢与自己相似的人' },
              { type: 'text', content: '恭维：真诚的赞美几乎总是有效的' },
              { type: 'text', content: '接触与合作：越熟悉越喜欢（曝光效应）' },
              { type: 'text', content: '关联：将产品与美好事物联系起来（明星代言的原理）' },
            ],
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 权威与稀缺',
        sections: [
          {
            type: 'header',
            content: '服从权威与害怕失去',
          },
          {
            type: 'concept-box',
            content: '权威原则：头衔、制服和符号的魔力',
            emphasis: true,
          },
          {
            type: 'text',
            content: '米尔格拉姆的电击实验震惊世界：65%的普通人在"科学家"的命令下，对无辜者施加了可能致命的电击。权威的力量不在于强制，而在于我们内心深处对专家和领导者的服从惯性。即使是权威的象征——白大褂、西装、头衔——就足以让人顺从。',
          },
          {
            type: 'concept-box',
            content: '稀缺原则：越少越想要',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '稀缺效应的应用',
            items: [
              {
                number: 1,
                title: '限时优惠',
                description: '"仅剩最后3件"——人为制造紧迫感。',
              },
              {
                number: 2,
                title: '独家信息',
                description: '被告知信息是"独家"的，人们会更加重视。',
              },
              {
                number: 3,
                title: '损失厌恶',
                description: '失去某物的痛苦是获得同等事物快乐的两倍。',
              },
            ],
          },
          {
            type: 'card-group',
            content: '防御策略',
            children: [
              { type: 'text', content: '觉察自动反应：当你感到"必须立刻行动"时，暂停一下' },
              { type: 'text', content: '区分真实稀缺与人为稀缺' },
              { type: 'text', content: '质疑权威的资格和动机' },
              { type: 'text', content: '问自己："如果没有这个影响因素，我还会做同样的决定吗？"' },
            ],
          },
          {
            type: 'highlight',
            content: '影响力是中性的工具——它可以用于操纵，也可以用于正当的说服。关键在于使用者的意图和接受者的觉察力。',
          },
        ],
      },
    ],
    readingTime: 12,
    generatedAt: new Date('2024-03-20'),
  },

  // 26. 乌合之众
  {
    id: 'summary-26',
    bookId: 'book-26',
    book: {
      id: 'book-26',
      title: '乌合之众',
      author: '古斯塔夫·勒庞',
      category: '社科',
      description: '大众心理学的奠基之作，揭示群体行为的非理性本质。',
      createdAt: new Date('2024-03-22'),
    },
    theme: {
      primaryColor: '#4A148C',
      secondaryColor: '#6A1B9A',
      accentColor: '#AB47BC',
      sidebarBg: '#1A0830',
      bannerBg: '#10051F',
      bannerText: '#F3E5F5',
      connectorColor: '#7B1FA2',
      conceptBoxBorder: '#4A148C',
      highlightColor: '#CE93D8',
      backgroundPattern: 'grid',
      fontStyle: 'classic',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 群体的时代',
        sections: [
          {
            type: 'header',
            content: '个人消失，群体崛起',
          },
          {
            type: 'text',
            content: '勒庞在19世纪末预言：未来的时代将是"群体的时代"。当个人加入群体，他的智力水平会下降，个性会消失，被群体的共同特征所取代。这不是简单的"人多力量大"，而是一种心理上的质变。',
          },
          {
            type: 'concept-box',
            content: '群体心理的核心命题：群体中的个人，其思想和感情会发生根本性的转变',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '群体形成的条件',
            children: [
              { type: 'text', content: '个体意识消失：自觉的个性让位于无意识的群体人格' },
              { type: 'text', content: '情感传染：情绪像病毒一样在群体中迅速扩散' },
              { type: 'text', content: '暗示易感性：群体中的人如同被催眠，极易接受暗示' },
              { type: 'text', content: '匿名性：身处群体中的安全感让人敢于放纵本能' },
            ],
          },
          {
            type: 'highlight',
            content: '勒庞的观察在社交媒体时代获得了惊人的验证——网络暴力、舆论风暴都是群体心理的现代表现。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 群体的特征',
        sections: [
          {
            type: 'header',
            content: '冲动、易变、非理性',
          },
          {
            type: 'numbered-list',
            content: '群体的五大心理特征',
            items: [
              {
                number: 1,
                title: '冲动性与多变性',
                description: '群体像是被外部刺激驱动的奴隶，缺乏深思熟虑的能力，情绪随风摆荡。',
              },
              {
                number: 2,
                title: '易受暗示和轻信',
                description: '群体分不清真实与想象，集体幻觉比个人幻觉更强大、更真实。',
              },
              {
                number: 3,
                title: '情感的夸张和简单化',
                description: '群体不承认中间地带，要么绝对崇拜，要么绝对厌弃。',
              },
              {
                number: 4,
                title: '偏执与专横',
                description: '群体要求绝对服从，异见者会被视为敌人。',
              },
              {
                number: 5,
                title: '道德水平的降低',
                description: '群体可以英勇献身，也可以残忍杀戮——取决于被什么暗示所驱动。',
              },
            ],
          },
          {
            type: 'quote',
            content: '"群体只知道简单而极端的感情，一个人给他们提供的意见、想法和信念，要么被全盘接受，要么被一口拒绝。"',
          },
          {
            type: 'highlight',
            content: '群体的智慧低于个人——这是勒庞最具争议也最有洞察力的论断。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 领袖与说服术',
        sections: [
          {
            type: 'header',
            content: '如何控制群体的心智',
          },
          {
            type: 'concept-box',
            content: '群体领袖：信念的狂热者',
            emphasis: true,
          },
          {
            type: 'text',
            content: '勒庞指出，群体领袖往往不是智力最高的人，而是信念最坚定、意志最强烈的人。他们用自身的狂热感染群体，用简单的口号取代复杂的论证。历史上的革命领袖、宗教领袖无不如此。',
          },
          {
            type: 'mindmap-branch',
            content: '说服群体的三种手段',
            children: [
              { type: 'text', content: '断言：简洁有力的断言比逻辑论证更有效，不需要论据' },
              { type: 'text', content: '重复：同一断言反复出现，最终会被接受为事实' },
              { type: 'text', content: '传染：一旦关键少数接受，情绪和信念便如瘟疫般扩散' },
            ],
          },
          {
            type: 'card-group',
            content: '群体信仰的特征',
            children: [
              { type: 'text', content: '形象思维优先：群体用画面思考，不用逻辑思考' },
              { type: 'text', content: '需要偶像崇拜：群体需要一个强有力的领袖来崇拜' },
              { type: 'text', content: '宗教化倾向：即使是世俗信仰，群体也会赋予它宗教般的虔诚' },
              { type: 'text', content: '词语的魔力：词语的含义不重要，唤起的联想和画面才重要' },
            ],
          },
          {
            type: 'highlight',
            content: '勒庞的分析被后来的独裁者们精确地运用——希特勒的《我的奋斗》中多次引用勒庞的观点。',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 当代启示',
        sections: [
          {
            type: 'header',
            content: '群体心理在信息时代的延伸',
          },
          {
            type: 'numbered-list',
            content: '勒庞理论的现代验证',
            items: [
              {
                number: 1,
                title: '社交媒体回音室',
                description: '算法将相似观点的人聚集在一起，形成更极端的群体共识。',
              },
              {
                number: 2,
                title: '网络暴力与人肉搜索',
                description: '匿名性降低道德约束，情绪传染导致暴力升级。',
              },
              {
                number: 3,
                title: '信息茧房',
                description: '群体的轻信特征在虚假新闻时代被放大，人们更相信符合预期的谣言。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '勒庞的局限与反思',
            emphasis: true,
          },
          {
            type: 'text',
            content: '勒庞的理论有其时代局限性：他过于精英主义，对群体持过度悲观的态度，忽视了群体在民主运动中的积极作用。但他的核心洞察——群体行为遵循非理性的心理规律——至今仍具有强大的解释力。',
          },
          {
            type: 'card-group',
            content: '如何保持独立思考',
            children: [
              { type: 'text', content: '警惕情绪传染：当你感到强烈的集体愤怒时，先冷静下来' },
              { type: 'text', content: '质疑"所有人都这么想"的假设' },
              { type: 'text', content: '寻找不同立场的信息来源，打破信息茧房' },
              { type: 'text', content: '记住：你同意群体不代表群体是对的，不同意也不代表你是错的' },
            ],
          },
          {
            type: 'quote',
            content: '"在群体的灵魂中，人的才智和个性被削弱了。异质被同质所吞没，无意识的品质占了上风。"',
          },
        ],
      },
    ],
    readingTime: 10,
    generatedAt: new Date('2024-03-22'),
  },

  // 27. 从0到1
  {
    id: 'summary-27',
    bookId: 'book-27',
    book: {
      id: 'book-27',
      title: '从0到1',
      author: '彼得·蒂尔',
      category: '创业',
      description: 'PayPal创始人的创业哲学，如何创造垄断式创新。',
      createdAt: new Date('2024-03-25'),
    },
    theme: {
      primaryColor: '#F57F17',
      secondaryColor: '#F9A825',
      accentColor: '#FFCA28',
      sidebarBg: '#2A1E08',
      bannerBg: '#1A1305',
      bannerText: '#FFFDE7',
      connectorColor: '#F9A825',
      conceptBoxBorder: '#F57F17',
      highlightColor: '#FFD54F',
      backgroundPattern: 'lines',
      fontStyle: 'modern',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 从0到1 vs 从1到N',
        sections: [
          {
            type: 'header',
            content: '垂直进步与水平进步',
          },
          {
            type: 'concept-box',
            content: '从0到1是创造全新事物（垂直进步），从1到N是复制已有模式（水平进步/全球化）',
            emphasis: true,
          },
          {
            type: 'text',
            content: '彼得·蒂尔认为，真正的进步不是在已有模式上做微小改进，而是创造前所未有的东西。技术使我们能从0到1，而全球化只是从1到N。中国复制美国的模式是从1到N，但发明下一个搜索引擎或社交网络才是从0到1。',
          },
          {
            type: 'mindmap-branch',
            content: '蒂尔的"面试题"',
            children: [
              { type: 'text', content: '"哪些重要的真理，是很少有人同意你的？"' },
              { type: 'text', content: '好的答案揭示被忽视的机会——大多数人认为X，但事实是反X' },
              { type: 'text', content: '创业就是找到一个被主流忽视的真理，并围绕它建立公司' },
            ],
          },
          {
            type: 'highlight',
            content: '蒂尔批判"精益创业"的流行范式——他认为真正的创新不是快速迭代，而是大胆押注于一个大愿景。',
          },
          {
            type: 'quote',
            content: '"如果你做的事情和别人一模一样，那你就不是在创造未来，而只是在复制过去。"',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 竞争与垄断',
        sections: [
          {
            type: 'header',
            content: '竞争是失败者的游戏',
          },
          {
            type: 'concept-box',
            content: '垄断资本主义 > 完美竞争',
            emphasis: true,
          },
          {
            type: 'text',
            content: '传统经济学推崇完美竞争，但蒂尔认为竞争会侵蚀利润。真正成功的企业都是某种形式的垄断——Google垄断了搜索，Apple垄断了高端智能手机生态。垄断企业才有资源进行长期创新。',
          },
          {
            type: 'numbered-list',
            content: '构建垄断的四个特征',
            items: [
              {
                number: 1,
                title: '专有技术',
                description: '至少比竞争对手好10倍的核心技术，使模仿变得极其困难。',
              },
              {
                number: 2,
                title: '网络效应',
                description: '用户越多，产品越有价值。但必须先在小市场取得主导地位。',
              },
              {
                number: 3,
                title: '规模经济',
                description: '固定成本分摊到更多用户，边际成本趋近于零（软件的天然优势）。',
              },
              {
                number: 4,
                title: '品牌',
                description: '强大品牌是垄断的最后一层护城河，但品牌必须建立在实质之上。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '蒂尔的建议：从一个小而明确的市场开始，主导它，然后逐步扩展到相邻市场。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 幂次法则',
        sections: [
          {
            type: 'header',
            content: '风险投资的秘密：幂次法则',
          },
          {
            type: 'concept-box',
            content: '少数公司会产生绝大部分回报',
            emphasis: true,
          },
          {
            type: 'text',
            content: '在风险投资中，回报分布不是正态的，而是遵循幂次法则。最好的投资所产生的回报等于甚至超过其余所有投资的总和。这意味着每个投资决策都应该以"这家公司能否成为整个基金的回报来源？"来衡量。',
          },
          {
            type: 'mindmap-branch',
            content: '幂次法则的启示',
            children: [
              { type: 'text', content: '职业选择：加入一家可能改变世界的公司，比创建一家注定平庸的公司更好' },
              { type: 'text', content: '资源分配：将最好的资源集中在最有潜力的项目上' },
              { type: 'text', content: '个人发展：找到你最擅长的一件事，把它做到极致' },
            ],
          },
          {
            type: 'card-group',
            content: '反直觉的创业思维',
            children: [
              { type: 'text', content: '大胆好过平庸：不完美的计划好过没有计划' },
              { type: 'text', content: '竞争市场的利润薄如刀片，垄断市场才有超额利润' },
              { type: 'text', content: '销售和分销与产品同等重要' },
              { type: 'text', content: '人工智能最好的应用是增强人类，而非取代人类' },
            ],
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 创始人与未来',
        sections: [
          {
            type: 'header',
            content: '创始人的悖论与人类的未来',
          },
          {
            type: 'text',
            content: '蒂尔观察到创始人往往是极端人物：他们要么被神话化，要么被妖魔化。乔布斯、霍华德·休斯、比尔·盖茨——他们都是"异类"，但正是这种极端性使他们能看到别人看不到的东西。',
          },
          {
            type: 'numbered-list',
            content: '蒂尔的七个问题',
            items: [
              {
                number: 1,
                title: '工程问题',
                description: '你能创造突破性技术，而不仅仅是小幅改进吗？',
              },
              {
                number: 2,
                title: '时机问题',
                description: '现在是开始这项业务的正确时机吗？',
              },
              {
                number: 3,
                title: '垄断问题',
                description: '你能在一个小市场中占据大份额吗？',
              },
              {
                number: 4,
                title: '团队问题',
                description: '你有合适的团队来执行这个计划吗？',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '乐观的确定论者',
            emphasis: true,
          },
          {
            type: 'text',
            content: '蒂尔将世界观分为四种：乐观确定、乐观不确定、悲观确定、悲观不确定。他呼吁回归"乐观的确定论"——不是盲目乐观，而是相信未来是可以被设计和创造的，然后全力以赴去实现。',
          },
          {
            type: 'quote',
            content: '"每一个正确答案都必然是大多数人还没有发现的秘密。"',
          },
        ],
      },
    ],
    readingTime: 11,
    generatedAt: new Date('2024-03-25'),
  },

  // 28. 红楼梦
  {
    id: 'summary-28',
    bookId: 'book-28',
    book: {
      id: 'book-28',
      title: '红楼梦',
      author: '曹雪芹',
      category: '文学',
      description: '中国古典文学巅峰之作，贾宝玉与林黛玉的爱情悲剧与封建家族的兴衰。',
      createdAt: new Date('2024-03-28'),
    },
    theme: {
      primaryColor: '#880E4F',
      secondaryColor: '#AD1457',
      accentColor: '#F06292',
      sidebarBg: '#2C0A1A',
      bannerBg: '#1A0610',
      bannerText: '#FCE4EC',
      connectorColor: '#C2185B',
      conceptBoxBorder: '#880E4F',
      highlightColor: '#F48FB1',
      backgroundPattern: 'waves',
      fontStyle: 'elegant',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 石头与神话',
        sections: [
          {
            type: 'header',
            content: '女娲补天遗石——大荒山的前世今生',
          },
          {
            type: 'concept-box',
            content: '神话框架：通灵宝玉的来历',
            emphasis: true,
          },
          {
            type: 'text',
            content: '《红楼梦》以神话开篇。女娲补天时炼就三万六千五百零一块石头，唯独多出一块未用。这块被弃的补天石（通灵宝玉）在大荒山无稽崖青埂峰下，被一僧一道带入红尘，化为贾宝玉口中含的那块美玉，历经人间悲欢后重归太虚幻境。',
          },
          {
            type: 'mindmap-branch',
            content: '另一个前世：木石前盟',
            children: [
              { type: 'text', content: '神瑛侍者以甘露灌溉绛珠仙草，使其得以修炼成人形' },
              { type: 'text', content: '绛珠仙子（林黛玉前身）要以一生的眼泪偿还灌溉之恩' },
              { type: 'text', content: '"还泪说"奠定了宝黛爱情的悲剧基调' },
              { type: 'text', content: '木石前盟vs金玉良缘——命运与人为安排的对抗' },
            ],
          },
          {
            type: 'highlight',
            content: '曹雪芹以"真事隐（甄士隐）""假语存（贾雨村）"暗示：小说中的真真假假，需要读者自行体悟。',
          },
          {
            type: 'quote',
            content: '"满纸荒唐言，一把辛酸泪。都云作者痴，谁解其中味？"',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 大观园的世界',
        sections: [
          {
            type: 'header',
            content: '贾府——封建社会的微缩模型',
          },
          {
            type: 'concept-box',
            content: '四大家族：贾史王薛，一荣俱荣，一损俱损',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '贾府的核心人物',
            items: [
              {
                number: 1,
                title: '贾宝玉',
                description: '叛逆的贵公子，厌恶仕途经济，追求"真性情"。他的"女清男浊"论挑战了整个封建价值体系。',
              },
              {
                number: 2,
                title: '林黛玉',
                description: '才华横溢、敏感多疑的寄居者。她的诗才与眼泪是对抗命运的武器，"葬花吟"是她生命哲学的宣言。',
              },
              {
                number: 3,
                title: '薛宝钗',
                description: '端庄贤淑、通晓世故的大家闺秀。她代表封建社会对女性的理想塑造，却也有着不为人知的寂寞。',
              },
              {
                number: 4,
                title: '王熙凤',
                description: '精明强干、杀伐决断的当家人。她是贾府的实际掌权者，"机关算尽太聪明，反误了卿卿性命"。',
              },
            ],
          },
          {
            type: 'text',
            content: '大观园是曹雪芹为年轻女性创造的理想世界——诗社、画作、音乐充盈其中。然而这座伊甸园从建成之日起就注定要被外部世界的力量所摧毁。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 情与礼的冲突',
        sections: [
          {
            type: 'header',
            content: '宝黛爱情——封建礼教下的不可能',
          },
          {
            type: 'text',
            content: '宝玉和黛玉的爱情是中国文学史上最动人也最痛苦的恋情。他们在精神上完全契合——同样厌恶虚伪，同样追求真实——却无法在封建婚姻制度中得到承认。因为在那个时代，婚姻是家族利益的结合，不是个人情感的选择。',
          },
          {
            type: 'card-group',
            content: '爱情的证据与阻碍',
            children: [
              { type: 'text', content: '共读《西厢记》：两颗自由心灵的共鸣时刻' },
              { type: 'text', content: '黛玉葬花：以落花自喻，感叹美好事物的必然消逝' },
              { type: 'text', content: '金玉良缘：贾母、王夫人属意的薛宝钗，代表了"合适"的婚姻' },
              { type: 'text', content: '调包计：以欺骗手段让宝玉与宝钗成婚，是对真情最残酷的否定' },
            ],
          },
          {
            type: 'concept-box',
            content: '黛玉之死：泪尽而逝',
            emphasis: true,
          },
          {
            type: 'text',
            content: '黛玉焚稿断痴情，在宝玉与宝钗成婚之时含恨而死。她的死兑现了前世"还泪"的约定，也宣告了纯真爱情在世俗秩序面前的彻底失败。这不仅是个人悲剧，更是一个时代的悲剧。',
          },
          {
            type: 'quote',
            content: '"一朝春尽红颜老，花落人亡两不知。"——林黛玉《葬花吟》',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 家族的衰落',
        sections: [
          {
            type: 'header',
            content: '从烈火烹油到树倒猢狲散',
          },
          {
            type: 'concept-box',
            content: '贾府衰亡的深层原因',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '衰落的多重因素',
            children: [
              { type: 'text', content: '经济危机：入不敷出的排场消耗，外面架子虽大，内囊已经空了' },
              { type: 'text', content: '道德腐败：贾珍、贾赦等人的荒淫无度，败坏家风' },
              { type: 'text', content: '教育失败：宝玉不愿走仕途，贾环、贾蓉品行低劣' },
              { type: 'text', content: '政治风险：元妃薨逝，靠山倒塌，抄家之祸终至' },
            ],
          },
          {
            type: 'numbered-list',
            content: '大观园众女儿的命运',
            items: [
              {
                number: 1,
                title: '元春',
                description: '入宫为妃，看似荣耀实则身不由己。"虎兕相逢大梦归"，英年早逝。',
              },
              {
                number: 2,
                title: '迎春',
                description: '嫁给"中山狼"孙绍祖，被虐致死。性格懦弱是她的致命伤。',
              },
              {
                number: 3,
                title: '探春',
                description: '才干出众却无法力挽狂澜，远嫁海外，"千里东风一梦遥"。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '"好一似食尽鸟投林，落了片白茫茫大地真干净"——曹雪芹以佛家的空观审视繁华与衰败的循环。',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '第五章: 文学遗产',
        sections: [
          {
            type: 'header',
            content: '一部"说不尽"的书',
          },
          {
            type: 'text',
            content: '鲁迅曾说："经学家看见易，道学家看见淫，才子看见缠绵，革命家看见排满，流言家看见宫闱秘事。"《红楼梦》的伟大在于它的多义性——每个人都能从中读到不同的东西。',
          },
          {
            type: 'numbered-list',
            content: '《红楼梦》的文学成就',
            items: [
              {
                number: 1,
                title: '人物塑造',
                description: '四百余个有名有姓的人物，每个人都有独特的语言风格和性格特征。',
              },
              {
                number: 2,
                title: '叙事结构',
                description: '草蛇灰线、伏脉千里。前八十回的每个细节都为后文埋下伏笔。',
              },
              {
                number: 3,
                title: '诗词曲赋',
                description: '每首诗词都是人物命运的隐喻，如《好了歌》暗示全书的终极主题。',
              },
              {
                number: 4,
                title: '百科全书式的社会描绘',
                description: '从饮食、服饰到园林建筑，从宗法制度到官场运作，全方位展现封建社会。',
              },
            ],
          },
          {
            type: 'concept-box',
            content: '"红学"：围绕一本书形成的独立学科',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '《红楼梦》的核心问题',
            children: [
              { type: 'text', content: '后四十回之谜：高鹗续书是否符合曹雪芹原意？' },
              { type: 'text', content: '自传说vs虚构说：小说与曹家真实历史的关系' },
              { type: 'text', content: '色空观念：繁华皆幻，万境归空的佛学主题' },
              { type: 'text', content: '女性主义先声：对女性才华与命运的深切同情' },
            ],
          },
          {
            type: 'quote',
            content: '"开辟鸿蒙，谁为情种？都只为风月情浓。"——《红楼梦引子》，道尽全书的情之至深。',
          },
        ],
      },
    ],
    readingTime: 20,
    generatedAt: new Date('2024-03-28'),
  },

  // 29. 道德经
  {
    id: 'summary-29',
    bookId: 'book-29',
    book: {
      id: 'book-29',
      title: '道德经',
      author: '老子',
      category: '哲学',
      description: '中国哲学的源头之一，道家思想的核心经典。',
      createdAt: new Date('2024-04-01'),
    },
    theme: {
      primaryColor: '#33691E',
      secondaryColor: '#558B2F',
      accentColor: '#8BC34A',
      sidebarBg: '#1A2E0F',
      bannerBg: '#101D08',
      bannerText: '#F1F8E9',
      connectorColor: '#689F38',
      conceptBoxBorder: '#33691E',
      highlightColor: '#AED581',
      backgroundPattern: 'dots',
      fontStyle: 'classic',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 道——万物之源',
        sections: [
          {
            type: 'header',
            content: '不可言说的终极真理',
          },
          {
            type: 'quote',
            content: '"道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。"——开篇即宣告语言的局限。',
          },
          {
            type: 'concept-box',
            content: '道：先于万物、超越万物的终极实在',
            emphasis: true,
          },
          {
            type: 'text',
            content: '老子的"道"是中国哲学最核心的概念之一。它不是一个实体，不是一个神灵，而是宇宙运行的根本规律和万物生成的源头。道无形无象、不可言说，但又无处不在、无时不在。它既是存在的根据，也是存在的方式。',
          },
          {
            type: 'mindmap-branch',
            content: '道的特征',
            children: [
              { type: 'text', content: '先天地而生：道在宇宙形成之前就已存在' },
              { type: 'text', content: '独立而不改：不依赖外物，不随时间改变' },
              { type: 'text', content: '周行而不殆：循环运行，永不停歇' },
              { type: 'text', content: '可以为天下母：一切事物的终极根源' },
            ],
          },
          {
            type: 'highlight',
            content: '"道生一，一生二，二生三，三生万物"——用最简洁的语言描述了宇宙的生成论。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 辩证法——对立统一',
        sections: [
          {
            type: 'header',
            content: '万物负阴而抱阳',
          },
          {
            type: 'text',
            content: '老子是中国最早的辩证法思想家。他深刻洞察到一切事物都包含对立面，且对立面之间相互依存、相互转化。这种辩证思维深刻影响了中国人的思维方式。',
          },
          {
            type: 'card-group',
            content: '对立统一的命题',
            children: [
              { type: 'text', content: '有无相生：有与无不是对立的，而是相互产生的' },
              { type: 'text', content: '难易相成：难与易相互促成，没有难就无所谓易' },
              { type: 'text', content: '长短相形：长短是相对的，通过比较才能显现' },
              { type: 'text', content: '高下相倾：高与下相互倾覆，循环往复' },
            ],
          },
          {
            type: 'concept-box',
            content: '反者道之动——事物发展到极端必然向反面转化',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '辩证法的实践智慧',
            items: [
              {
                number: 1,
                title: '祸兮福所倚',
                description: '灾祸之中蕴含着转机，福气之中潜伏着危机。',
              },
              {
                number: 2,
                title: '柔弱胜刚强',
                description: '水滴石穿，舌头比牙齿更长久。柔韧比刚硬更有生命力。',
              },
              {
                number: 3,
                title: '知足不辱',
                description: '知道满足就不会受到羞辱，知道适可而止就不会遭遇危险。',
              },
            ],
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 无为而治',
        sections: [
          {
            type: 'header',
            content: '最高明的治理是让人感觉不到治理',
          },
          {
            type: 'concept-box',
            content: '无为：不是无所作为，而是不妄为、不强为',
            emphasis: true,
          },
          {
            type: 'text',
            content: '老子的"无为"是最容易被误解的概念。它不是消极怠惰，而是顺应自然规律、不逞强妄为的行动哲学。水不争而利万物，大国应"为天下溪"——处下不争，反而赢得天下归附。',
          },
          {
            type: 'quote',
            content: '"太上，不知有之；其次，亲而誉之；其次，畏之；其次，侮之。"——最好的领导者，人民不知道他的存在。',
          },
          {
            type: 'mindmap-branch',
            content: '无为在治国中的体现',
            children: [
              { type: 'text', content: '不尚贤：不过度推崇贤能，免得人们争名夺利' },
              { type: 'text', content: '不贵难得之货：不追捧稀有物品，免得人们偷盗抢夺' },
              { type: 'text', content: '使民无知无欲：不是愚民，而是减少虚伪的欲望和机巧的知识' },
              { type: 'text', content: '治大国若烹小鲜：治理大国要像煎小鱼一样，不要频繁翻动' },
            ],
          },
          {
            type: 'highlight',
            content: '无为的现代意义：减少不必要的干预，让系统自我调节——这与复杂系统理论和自由市场经济的理念暗合。',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 上善若水',
        sections: [
          {
            type: 'header',
            content: '水的哲学——柔弱与谦下',
          },
          {
            type: 'quote',
            content: '"上善若水。水善利万物而不争，处众人之所恶，故几于道。"',
          },
          {
            type: 'concept-box',
            content: '水是老子哲学的核心意象',
            emphasis: true,
          },
          {
            type: 'numbered-list',
            content: '水的七种品德',
            items: [
              {
                number: 1,
                title: '居善地',
                description: '善于选择地方——水总是流向低处，安于卑下。',
              },
              {
                number: 2,
                title: '心善渊',
                description: '心思深沉如渊——不轻浮，深邃宁静。',
              },
              {
                number: 3,
                title: '与善仁',
                description: '与人交往善于仁爱——滋润万物不求回报。',
              },
              {
                number: 4,
                title: '言善信',
                description: '说话善于诚信——潮汐有信，从不失期。',
              },
              {
                number: 5,
                title: '正善治',
                description: '为政善于治理——水利工程体现水的力量。',
              },
            ],
          },
          {
            type: 'text',
            content: '老子以水喻道，揭示了一种"以柔克刚"的生存智慧。天下莫柔弱于水，而攻坚强者莫之能胜。这不是懦弱的退让，而是一种更高层次的力量——懂得何时顺势而为，何时积蓄力量。',
          },
          {
            type: 'highlight',
            content: '水的哲学被广泛应用于中国武术（太极拳）、战略（以柔克刚）、人生智慧（低调做人）之中。',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '第五章: 永恒的智慧',
        sections: [
          {
            type: 'header',
            content: '五千言的不朽影响',
          },
          {
            type: 'text',
            content: '《道德经》仅五千余字，却被翻译成数十种语言，成为除《圣经》外被翻译次数最多的书籍。它影响了中国两千多年的文化、政治、宗教和艺术，也深刻影响了西方的哲学、物理学和管理学。',
          },
          {
            type: 'card-group',
            content: '《道德经》的跨领域影响',
            children: [
              { type: 'text', content: '物理学：量子力学中"观察改变结果"与"道"的不可言说性暗合' },
              { type: 'text', content: '管理学：仆人式领导、赋权型管理与"无为而治"相通' },
              { type: 'text', content: '心理学：接纳承诺疗法（ACT）与"无为"的非对抗哲学呼应' },
              { type: 'text', content: '生态学："天地不仁，以万物为刍狗"——自然不偏爱，万物平等' },
            ],
          },
          {
            type: 'concept-box',
            content: '老子与孔子：中国文化的两极',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '道家vs儒家',
            children: [
              { type: 'text', content: '儒家重入世，道家重出世；二者互补构成完整的中国文化' },
              { type: 'text', content: '儒家说"知其不可而为之"，道家说"为而不争"' },
              { type: 'text', content: '达则兼济天下（儒），穷则独善其身（道）' },
            ],
          },
          {
            type: 'quote',
            content: '"知人者智，自知者明。胜人者有力，自胜者强。"——最终的修行不是征服世界，而是认识和超越自己。',
          },
        ],
      },
    ],
    readingTime: 12,
    generatedAt: new Date('2024-04-01'),
  },

  // 30. 苏东坡传
  {
    id: 'summary-30',
    bookId: 'book-30',
    book: {
      id: 'book-30',
      title: '苏东坡传',
      author: '林语堂',
      category: '传记',
      description: '林语堂笔下的苏轼传记，展现一代文豪的旷达人生。',
      createdAt: new Date('2024-04-05'),
    },
    theme: {
      primaryColor: '#0D47A1',
      secondaryColor: '#1565C0',
      accentColor: '#42A5F5',
      sidebarBg: '#081E3F',
      bannerBg: '#051228',
      bannerText: '#E3F2FD',
      connectorColor: '#1976D2',
      conceptBoxBorder: '#0D47A1',
      highlightColor: '#64B5F6',
      backgroundPattern: 'grid',
      fontStyle: 'elegant',
    },
    pages: [
      {
        pageNumber: 1,
        chapterTitle: '第一章: 天才少年',
        sections: [
          {
            type: 'header',
            content: '眉山苏家——一门三杰',
          },
          {
            type: 'text',
            content: '苏轼（1037-1101），字子瞻，号东坡居士，生于四川眉山一个书香门第。父亲苏洵大器晚成，二十七岁始发愤读书；弟弟苏辙同样才华横溢。父子三人同列"唐宋八大家"，史称"三苏"。',
          },
          {
            type: 'concept-box',
            content: '嘉祐二年（1057）：苏轼兄弟同科进士及第，震动京师',
            emphasis: true,
          },
          {
            type: 'mindmap-branch',
            content: '少年苏轼的才华展现',
            children: [
              { type: 'text', content: '欧阳修读其文章惊叹："老夫当避此人，放他出一头地也"' },
              { type: 'text', content: '主考官误以为是自己弟子曾巩所写，为避嫌判为第二名' },
              { type: 'text', content: '二十一岁名震天下，被视为文坛领袖的接班人' },
              { type: 'text', content: '母亲程氏的教育：以东汉范滂为榜样，培养其正直品格' },
            ],
          },
          {
            type: 'quote',
            content: '林语堂评价苏东坡："他是一个不可救药的乐天派，一个伟大的人道主义者，一个百姓的朋友。"',
          },
          {
            type: 'highlight',
            content: '苏轼的才华不仅在于文学——他是诗人、词人、散文家、书法家、画家、美食家、工程师，堪称"通才"的极致。',
          },
        ],
      },
      {
        pageNumber: 2,
        chapterTitle: '第二章: 宦海沉浮',
        sections: [
          {
            type: 'header',
            content: '新旧党争中的苏轼',
          },
          {
            type: 'text',
            content: '苏轼的政治生涯与王安石变法紧密交织。他既反对王安石急进的新法（认为扰民害民），又反对旧党全面废除新法的做法（认为有些政策确有益处）。这种不偏不倚的立场使他两面不讨好，一生在贬谪中度过。',
          },
          {
            type: 'numbered-list',
            content: '贬谪之路',
            items: [
              {
                number: 1,
                title: '乌台诗案（1079）',
                description: '被指控以诗文讽刺朝政，入狱一百三十天，差点被处死。这是北宋最大的文字狱。',
              },
              {
                number: 2,
                title: '黄州贬谪（1080-1084）',
                description: '被贬为黄州团练副使，生活困顿。却在此写下《赤壁赋》《念奴娇》等千古名篇。',
              },
              {
                number: 3,
                title: '惠州贬谪（1094）',
                description: '被贬岭南瘴疠之地。却写出"日啖荔枝三百颗，不辞长作岭南人"。',
              },
              {
                number: 4,
                title: '儋州贬谪（1097）',
                description: '被贬到海南岛——当时等同于流放绝域。他在那里办学堂、教化百姓。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '每一次贬谪不仅没有压垮苏轼，反而激发了他更伟大的创作。逆境是他的灵感之源。',
          },
        ],
      },
      {
        pageNumber: 3,
        chapterTitle: '第三章: 文学巅峰',
        sections: [
          {
            type: 'header',
            content: '黄州时期——苏轼的涅槃重生',
          },
          {
            type: 'concept-box',
            content: '黄州五年是苏轼文学创作的黄金时期',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '黄州时期的代表作',
            children: [
              { type: 'text', content: '《念奴娇·赤壁怀古》：豪放词的巅峰，"大江东去，浪淘尽，千古风流人物"' },
              { type: 'text', content: '《前赤壁赋》：哲理散文的极品，在天地苍茫中思考人生的短暂与永恒' },
              { type: 'text', content: '《后赤壁赋》：梦幻与现实交织，道士化鹤的意象充满禅意' },
              { type: 'text', content: '《定风波》："竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生"' },
            ],
          },
          {
            type: 'text',
            content: '苏轼彻底革新了宋词的面貌——他把词从花间酒筵的"小道"提升为可以抒怀言志的"大道"，开创了豪放派词风。但他同样擅长婉约之作，"十年生死两茫茫"对亡妻的思念至今读来令人动容。',
          },
          {
            type: 'mindmap-branch',
            content: '苏轼的多维才华',
            children: [
              { type: 'text', content: '书法：与黄庭坚、米芾、蔡襄并称"宋四家"，《寒食帖》被誉为天下第三行书' },
              { type: 'text', content: '绘画：开创"士人画"（文人画）传统，主张"论画以形似，见与儿童邻"' },
              { type: 'text', content: '美食：东坡肉、东坡肘子、东坡鱼——将贬谪生活变成美食发明' },
            ],
          },
          {
            type: 'quote',
            content: '"人生到处知何似，应似飞鸿踏雪泥。泥上偶然留指爪，鸿飞那复计东西。"',
          },
        ],
      },
      {
        pageNumber: 4,
        chapterTitle: '第四章: 旷达人生',
        sections: [
          {
            type: 'header',
            content: '儒释道合一的人生哲学',
          },
          {
            type: 'concept-box',
            content: '苏轼的精神世界融合了儒家的责任感、佛家的超脱和道家的自然',
            emphasis: true,
          },
          {
            type: 'text',
            content: '苏轼不是一个纯粹的儒者、佛教徒或道士，而是将三家智慧融于一身。入世时积极进取、造福百姓（杭州疏浚西湖、徐州抗洪），出世时坦然面对逆境、诗酒自娱。这种"也无风雨也无晴"的人生态度，成为后世中国文人的精神标杆。',
          },
          {
            type: 'numbered-list',
            content: '苏轼的人格特质',
            items: [
              {
                number: 1,
                title: '幽默',
                description: '苏轼可能是中国历史上最幽默的文人。与佛印禅师的斗嘴故事流传千古。',
              },
              {
                number: 2,
                title: '真诚',
                description: '他从不掩饰自己的情感——开心就大笑，悲伤就痛哭，对朋友推心置腹。',
              },
              {
                number: 3,
                title: '善良',
                description: '在杭州建医院（安乐坊）、在黄州劝阻杀婴陋习，处处体现人道关怀。',
              },
              {
                number: 4,
                title: '旷达',
                description: '面对人生的起伏跌宕，始终保持"此心安处是吾乡"的从容。',
              },
            ],
          },
          {
            type: 'highlight',
            content: '苏轼与弟弟苏辙的兄弟之情是中国文学史上的佳话——"但愿人长久，千里共婵娟"正是写给弟弟的。',
          },
        ],
      },
      {
        pageNumber: 5,
        chapterTitle: '第五章: 千古风流',
        sections: [
          {
            type: 'header',
            content: '林语堂为何写苏东坡',
          },
          {
            type: 'text',
            content: '林语堂在英文世界中为苏东坡写传，不仅因为苏轼的文学成就，更因为苏轼的人格魅力——在林语堂看来，苏东坡是中国文化中"最可爱的人"。这部传记以西方读者能理解的方式，展现了一个活生生的中国文人形象。',
          },
          {
            type: 'concept-box',
            content: '苏东坡的当代价值',
            emphasis: true,
          },
          {
            type: 'card-group',
            content: '苏轼给现代人的启示',
            children: [
              { type: 'text', content: '逆境智慧：每一次被贬都是一次重生的机会' },
              { type: 'text', content: '跨界精神：不要被单一身份定义，做一个丰富的人' },
              { type: 'text', content: '幽默力量：笑对人生的荒谬，比愤怒更有力量' },
              { type: 'text', content: '活在当下：无论身处何方，都能找到生活的乐趣' },
            ],
          },
          {
            type: 'mindmap-branch',
            content: '苏轼的身后影响',
            children: [
              { type: 'text', content: '词的革新：开创豪放派，拓宽词的表现领域' },
              { type: 'text', content: '文人画传统：影响了元明清数百年的绘画风格' },
              { type: 'text', content: '人格典范：成为中国知识分子面对逆境时的精神导师' },
              { type: 'text', content: '地理文化：杭州西湖苏堤、黄州东坡赤壁，处处留下文化印迹' },
            ],
          },
          {
            type: 'quote',
            content: '"苏东坡是一个无可救药的乐天派，一个伟大的人道主义者，一个百姓的朋友，一个大文豪，大书法家，创新的画家......但是这还不足以道出苏东坡的全部。"——林语堂',
          },
          {
            type: 'highlight',
            content: '一千年过去了，苏东坡依然是中国文化中最温暖、最智慧、最令人亲近的灵魂。',
          },
        ],
      },
    ],
    readingTime: 14,
    generatedAt: new Date('2024-04-05'),
  },
];

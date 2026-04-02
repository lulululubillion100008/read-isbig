/**
 * 填充两本书的完整阅读内容 + 氛围场景
 * 运行: npx tsx scripts/seed-content.ts
 */
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const url = process.env.DATABASE_URL || 'file:./dev.db';
const authToken = process.env.DATABASE_AUTH_TOKEN;
const adapter = new PrismaLibSql({ url, ...(authToken ? { authToken } : {}) });
const prisma = new PrismaClient({ adapter });

// ─── 唐诗三百首 内容 ───────────────────────────────────────
const tangPoetryChapters = [
  {
    id: 'ch-tang-1',
    title: '第一章 · 山水之间',
    readingTimeMin: 4,
    blocks: [
      { type: 'heading', content: '山水诗的意境与精神', level: 1 },
      { type: 'paragraph', content: '唐代诗人对山水的描绘，不仅仅是对自然景物的写实，更是一种精神上的追求和人生态度的表达。王维的"诗中有画，画中有诗"，正是这种山水精神的极致体现。' },
      { type: 'quote', content: '空山新雨后，天气晚来秋。明月松间照，清泉石上流。\n—— 王维《山居秋暝》' },
      { type: 'key-insight', content: '王维的山水诗开创了"以禅入诗"的传统：自然不是被观赏的客体，而是诗人内心宁静的投射。空山、明月、清泉——每一个意象都指向内心的澄明。' },
      { type: 'paragraph', content: '与王维的空灵不同，李白笔下的山水往往带有壮阔的浪漫色彩。瀑布、长江、蜀道——自然在李白眼中是雄奇的、奔放的、不可驯服的力量。' },
      { type: 'quote', content: '日照香炉生紫烟，遥看瀑布挂前川。飞流直下三千尺，疑是银河落九天。\n—— 李白《望庐山瀑布》' },
      { type: 'callout', content: '唐代山水诗的两极：王维代表"静"的极致——向内观照，在自然中找到禅意的宁静；李白代表"动"的极致——向外扩张，在自然中释放生命的狂放。两者共同构成了唐诗山水美学的完整图景。' },
      { type: 'paragraph', content: '杜甫的山水诗则融入了更多的社会关怀和历史沉思。他笔下的泰山不仅是自然的壮丽，更寄托着"会当凌绝顶，一览众山小"的人生抱负和政治理想。' },
    ],
  },
  {
    id: 'ch-tang-2',
    title: '第二章 · 离别与思念',
    readingTimeMin: 4,
    blocks: [
      { type: 'heading', content: '唐人的别离美学', level: 1 },
      { type: 'paragraph', content: '在交通不便的唐代，一次别离可能意味着数年甚至永别。因此，送别诗成为唐诗中最打动人心的题材之一。诗人们在送别中倾注了最真挚的情感。' },
      { type: 'quote', content: '渭城朝雨浥轻尘，客舍青青柳色新。劝君更尽一杯酒，西出阳关无故人。\n—— 王维《送元二使安西》' },
      { type: 'key-insight', content: '唐代送别诗的深层意蕴：酒不仅是饯行之物，更是时间的隐喻。一杯酒的短暂对应着离别后漫长的思念，杯中的温热对应着阳关之外的苍凉。这种对比产生了巨大的情感张力。' },
      { type: 'paragraph', content: '李白的送别则别具一格，他善于以辽阔的自然意象来承载离情，将个人的离愁放置于天地之间，既有深情又不失豪迈。' },
      { type: 'quote', content: '故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。\n—— 李白《黄鹤楼送孟浩然之广陵》' },
      { type: 'paragraph', content: '思念之诗同样感人至深。张九龄的"海上生明月，天涯共此时"，将个人的思念升华为人类共通的情感体验。月亮成为连接彼此的桥梁，无论相隔多远，抬头望向同一轮明月。' },
      { type: 'callout', content: '唐诗中的思念不是私密的呢喃，而是与天地共振的情感。诗人将个人之情投射于江河、明月、春风，让有限的离愁获得了无限的时空维度。' },
    ],
  },
  {
    id: 'ch-tang-3',
    title: '第三章 · 边塞与豪情',
    readingTimeMin: 3,
    blocks: [
      { type: 'heading', content: '大漠孤烟：盛唐的边塞精神', level: 1 },
      { type: 'paragraph', content: '盛唐是一个充满自信和开拓精神的时代，边塞诗正是这种时代气质的文学表达。高适、岑参、王昌龄等诗人，以亲身经历写出了边塞的壮美与残酷。' },
      { type: 'quote', content: '大漠孤烟直，长河落日圆。\n—— 王维《使至塞上》' },
      { type: 'key-insight', content: '仅用十个字，王维描绘出了一幅永恒的大漠画面。"直"字写出了孤烟在无风大漠中的挺拔，"圆"字写出了落日在地平线上的完满。极简的语言，极致的美感。这就是唐诗的力量。' },
      { type: 'paragraph', content: '边塞诗不仅写战争的壮烈，也写戍边将士的思乡之情。王昌龄的"但使龙城飞将在，不教胡马度阴山"，既有保家卫国的豪情，又暗含对和平的渴望。' },
      { type: 'quote', content: '黄沙百战穿金甲，不破楼兰终不还。\n—— 王昌龄《从军行》' },
      { type: 'callout', content: '边塞诗的核心张力在于：将士们既向往建功立业的荣耀，又忍受着离家万里的孤独。这种矛盾成就了边塞诗独特的悲壮美感。' },
    ],
  },
  {
    id: 'ch-tang-4',
    title: '第四章 · 人生与哲思',
    readingTimeMin: 3,
    blocks: [
      { type: 'heading', content: '诗意的人生智慧', level: 1 },
      { type: 'paragraph', content: '唐诗不仅是文学，更是一部浓缩的人生哲学。诗人们在短短几十个字中，表达了对时间、命运、自由和人生意义的深刻思考。' },
      { type: 'quote', content: '前不见古人，后不见来者。念天地之悠悠，独怆然而涕下。\n—— 陈子昂《登幽州台歌》' },
      { type: 'key-insight', content: '陈子昂站在幽州台上的这一刻，感受到了人在时间长河中的渺小和孤独。这不是消极的悲观，而是对个体存在的清醒认知——正因为生命有限，我们的选择才有意义。' },
      { type: 'paragraph', content: '李白用另一种方式回应了人生的有限性。他不是悲叹，而是以极度的热烈和自信来拥抱当下的每一刻。' },
      { type: 'quote', content: '天生我材必有用，千金散尽还复来。\n—— 李白《将进酒》' },
      { type: 'paragraph', content: '杜甫则在苦难中展现了另一种人生智慧——关怀他人。即使自己茅屋为秋风所破，他想到的不是自身的困苦，而是天下寒士的境遇。这种超越个人的悲悯，是唐诗最伟大的精神遗产之一。' },
      { type: 'callout', content: '唐诗中的三种人生态度：陈子昂的"清醒的孤独"、李白的"热烈的自由"、杜甫的"深沉的悲悯"——至今仍是我们面对人生困境时的精神资源。' },
    ],
  },
  {
    id: 'ch-tang-5',
    title: '第五章 · 唐诗的永恒',
    readingTimeMin: 3,
    blocks: [
      { type: 'heading', content: '为什么今天仍要读唐诗', level: 1 },
      { type: 'paragraph', content: '一千三百年过去了，唐诗为何依然鲜活？因为它触及的是人类最根本的情感和追问：对美的感受、对离别的伤感、对自由的渴望、对人生意义的探寻。这些主题超越了时代。' },
      { type: 'key-insight', content: '唐诗的永恒性源于它的"通感"能力。当李白写下"举头望明月，低头思故乡"，他触及的不是某个时代、某个地方的乡愁，而是所有人类共通的思念之情。这种直抵人心的简洁，是唐诗最强大的力量。' },
      { type: 'paragraph', content: '唐诗也提供了一种独特的审美训练。在当今信息过载的时代，唐诗教会我们用更少的字表达更深的意思，用更慢的节奏感受更多的美。每一首诗都是一次"减法"的练习。' },
      { type: 'numbered-list', content: '唐诗给当代人的启示：', children: [
        { type: 'paragraph', content: '学会"看见"——像王维一样，在日常生活中发现诗意的美' },
        { type: 'paragraph', content: '学会表达——用最精准的语言传达最深的感受' },
        { type: 'paragraph', content: '学会共情——从古人的诗句中找到与自己处境的共鸣' },
        { type: 'paragraph', content: '学会沉静——在快节奏的生活中，留出读诗的慢时光' },
      ]},
      { type: 'paragraph', content: '读唐诗，不是为了复古，而是为了在古典的美感中找到应对现代生活的智慧。每一首好诗，都是跨越千年的一次灵魂对话。' },
    ],
  },
];

// ─── 思考，快与慢 内容 ─────────────────────────────────────
const thinkingChapters = [
  {
    id: 'ch-think-1',
    title: '第一章 · 两个系统',
    readingTimeMin: 4,
    blocks: [
      { type: 'heading', content: '大脑的两种思考模式', level: 1 },
      { type: 'paragraph', content: '丹尼尔·卡尼曼将人类的思考方式分为两个系统：系统1（快思考）和系统2（慢思考）。这个简单的框架，揭示了我们日常决策中无数隐藏的偏见和错误。' },
      { type: 'key-insight', content: '系统1是自动的、快速的、几乎不费力的。它让你看到"2+2"立刻想到4，让你看到愤怒的表情立刻感到威胁。系统2是需要注意力的、缓慢的、费力的。它让你计算17×24，让你在嘈杂的派对上专注听某个人说话。' },
      { type: 'paragraph', content: '关键洞察是：我们以为自己大部分时间在用系统2做理性决策，但实际上，系统1才是日常生活的真正主宰。系统2更像一个懒惰的监督者，通常只是为系统1的直觉判断做背书。' },
      { type: 'quote', content: '我们对自己的了解远不如自以为的那么多。我们不是理性的决策者，而是自以为理性的直觉动物。' },
      { type: 'callout', content: '系统1的力量在于效率——你不需要思考就能开车回家。它的危险也在于效率——你不需要思考就做出了可能后悔的判断。认识这一点，是变得更理性的第一步。' },
    ],
  },
  {
    id: 'ch-think-2',
    title: '第二章 · 锚定与框架',
    readingTimeMin: 4,
    blocks: [
      { type: 'heading', content: '你的判断如何被无关信息操控', level: 1 },
      { type: 'paragraph', content: '锚定效应是最普遍也最容易被利用的认知偏见之一。当你需要做出数量估计时，最先接触到的数字会成为一个"锚"，强烈影响你最终的判断——即使这个数字完全无关。' },
      { type: 'key-insight', content: '卡尼曼的经典实验：先让被试转动一个操纵过的幸运轮盘（只能停在10或65），然后问"非洲国家在联合国的百分比"。轮盘停在10的人平均回答25%，停在65的人平均回答45%。一个完全随机的数字，改变了人们对事实问题的判断。' },
      { type: 'paragraph', content: '框架效应同样强大。同一个事实，用不同方式表述，会引发截然不同的决策。"手术成功率90%"让人安心，"手术死亡率10%"让人恐惧——但它们描述的是同一件事。' },
      { type: 'quote', content: '你做出的选择，很大程度上取决于问题是如何被提出的，而不是问题本身的客观事实。' },
      { type: 'numbered-list', content: '日常生活中的锚定效应：', children: [
        { type: 'paragraph', content: '商品标价先写"原价¥999"再写"现价¥399"——999就是锚' },
        { type: 'paragraph', content: '薪资谈判中先开价的人往往占优——他设定了锚点' },
        { type: 'paragraph', content: '房产中介先带你看贵的差房子——让之后的房子显得"超值"' },
      ]},
      { type: 'callout', content: '防御策略：当你需要做重要判断时，问自己"我的参考点是什么？它是客观的还是被人为设置的？"仅仅意识到锚定效应的存在，就能显著减少它的影响。' },
    ],
  },
  {
    id: 'ch-think-3',
    title: '第三章 · 过度自信',
    readingTimeMin: 3,
    blocks: [
      { type: 'heading', content: '为什么专家的预测常常不如猴子', level: 1 },
      { type: 'paragraph', content: '过度自信是人类最顽固的认知偏见。研究表明，当人们说"我100%确定"时，他们的错误率约为20%。当他们说"我有90%把握"时，错误率高达50%。' },
      { type: 'key-insight', content: '卡尼曼指出一个反直觉的发现：在需要长期预测的领域（股市、政治、经济），专家的预测准确率往往不比随机猜测好多少。但专家们对自己预测的信心，远远高于实际的准确率。"知道自己不知道"比掌握更多信息更有价值。' },
      { type: 'paragraph', content: '过度自信的根源在于：我们的大脑天生擅长构建"连贯的故事"。只要一个解释听起来合理，系统1就会赋予它高度的确信感。我们把"故事的连贯性"误当作了"判断的准确性"。' },
      { type: 'quote', content: '信心并不是判断质量的可靠指标。你对一个判断感到非常确定，只是说明你构建了一个连贯的故事——不是说明这个故事是真的。' },
      { type: 'callout', content: '克服过度自信的方法：做重大决策前，主动寻找反对你的证据。如果你只能想到支持自己观点的理由，这本身就是一个警告信号——你可能陷入了"确认偏见"。' },
    ],
  },
  {
    id: 'ch-think-4',
    title: '第四章 · 损失厌恶',
    readingTimeMin: 3,
    blocks: [
      { type: 'heading', content: '失去100元的痛苦 > 得到100元的快乐', level: 1 },
      { type: 'paragraph', content: '前景理论是卡尼曼获得诺贝尔奖的核心贡献。它揭示了一个简单而深刻的事实：人类对损失的厌恶，远远大于对同等收益的喜爱。失去100元带来的痛苦，大约是获得100元带来快乐的2倍。' },
      { type: 'key-insight', content: '损失厌恶解释了大量"不理性"行为：为什么人们在股票亏损时不愿割肉（不想"确认"损失），为什么免费试用如此有效（你已经"拥有"了，取消等于"失去"），为什么谈判中让步如此困难（每次让步都是一次"损失"）。' },
      { type: 'paragraph', content: '损失厌恶还影响着我们的风险偏好。面对确定的收益时，人们倾向于保守（"落袋为安"）；面对确定的损失时，人们反而愿意冒险（"搏一搏，单车变摩托"）。' },
      { type: 'quote', content: '对损失的恐惧比对收益的渴望更强大。这就是为什么威胁比奖励更能改变人的行为。' },
      { type: 'callout', content: '实用建议：做重大决策时，试着用"拥有"和"失去"两种框架重新审视同一个选择。如果你在两种框架下做出不同的决定，说明你被损失厌恶而非理性在驱动。' },
    ],
  },
  {
    id: 'ch-think-5',
    title: '第五章 · 如何做更好的决策',
    readingTimeMin: 3,
    blocks: [
      { type: 'heading', content: '从认知偏见到理性决策', level: 1 },
      { type: 'paragraph', content: '卡尼曼的研究看似悲观——我们似乎无法摆脱系统1的偏见。但他也指出了改进的路径：我们虽然无法消除偏见，但可以通过制度和习惯来减少其影响。' },
      { type: 'key-insight', content: '卡尼曼的核心建议不是"更努力地思考"（这反而可能增加过度自信），而是"改变做决策的方式"。用清单代替直觉，用数据代替故事，用流程代替灵感。这不浪漫，但有效。' },
      { type: 'numbered-list', content: '卡尼曼的决策改进框架：', children: [
        { type: 'paragraph', content: '延迟判断——给系统2时间介入，不要在情绪高峰时做决定' },
        { type: 'paragraph', content: '外部视角——问"像我这种情况的人，通常结果如何？"而不是"我觉得我会怎样"' },
        { type: 'paragraph', content: '预验尸法——假设决策已经失败，回溯可能的原因' },
        { type: 'paragraph', content: '量化替代直觉——能用数字的地方不用感觉' },
        { type: 'paragraph', content: '决策卫生——用结构化流程减少噪声和偏见的干扰' },
      ]},
      { type: 'paragraph', content: '这本书最深远的影响不在于任何单一的发现，而在于它改变了我们看待自己的方式。我们不再是"理性人"，而是"有可预测偏见的人"——而了解这些偏见，恰恰是变得更明智的起点。' },
      { type: 'callout', content: '最终启示：完美的理性是不可能的，但"足够好的理性"是可以训练的。关键不是消除所有偏见，而是在最重要的决策中，给系统2一个发言的机会。' },
    ],
  },
];

// ─── 场景配置 ─────────────────────────────────────────────
const tangPoetryScene = {
  sceneType: 'nature',
  sceneConfig: JSON.stringify({
    description: '月下竹林，薄雾轻绕，远山如黛',
    config: {
      palette: ['#2C3E50', '#34495E', '#5D8AA8', '#A3C1AD', '#F5F5DC'],
      elements: ['bamboo', 'moon', 'mist', 'mountains'],
      mood: 'serene',
      timeOfDay: 'night',
    },
  }),
};

const thinkingScene = {
  sceneType: 'abstract',
  sceneConfig: JSON.stringify({
    description: '神经网络般的光线连接，代表思维的两个系统',
    config: {
      palette: ['#1A1A2E', '#16213E', '#0F3460', '#E94560', '#F5F5F5'],
      elements: ['particles', 'connections', 'waves', 'pulses'],
      mood: 'contemplative',
      timeOfDay: 'night',
    },
  }),
};

async function main() {
  console.log('开始填充内容...');

  // 确保 Book 记录存在
  await prisma.book.upsert({
    where: { id: 'book-tang-poetry' },
    update: {},
    create: {
      id: 'book-tang-poetry',
      title: '唐诗三百首',
      author: '蘅塘退士',
      category: '诗歌',
      description: '中国古典诗歌的巅峰之作，精选唐代名篇，涵盖李白、杜甫、王维等大家的传世佳作',
      score: 9.2,
    },
  });
  await prisma.book.upsert({
    where: { id: 'book-thinking-fast' },
    update: {},
    create: {
      id: 'book-thinking-fast',
      title: '思考，快与慢',
      author: '丹尼尔·卡尼曼',
      category: '心理学',
      description: '诺贝尔经济学奖得主揭示人类思维的两套系统，颠覆你对理性决策的认知',
      score: 8.8,
    },
  });
  console.log('✓ 书籍元数据已确认');

  // 唐诗三百首 — BookSummary
  const existingTang = await prisma.bookSummary.findFirst({
    where: { bookId: 'book-tang-poetry' },
  });
  if (existingTang) {
    await prisma.bookSummary.update({
      where: { id: existingTang.id },
      data: {
        chaptersJson: JSON.stringify(tangPoetryChapters),
        contentType: 'deep-analysis',
        readingTime: 17,
      },
    });
    console.log('✓ 唐诗三百首 内容已更新');
  } else {
    await prisma.bookSummary.create({
      data: {
        bookId: 'book-tang-poetry',
        pagesJson: '[]',
        themeJson: '{}',
        chaptersJson: JSON.stringify(tangPoetryChapters),
        contentType: 'deep-analysis',
        readingTime: 17,
      },
    });
    console.log('✓ 唐诗三百首 内容已创建');
  }

  // 思考快与慢 — BookSummary
  const existingThink = await prisma.bookSummary.findFirst({
    where: { bookId: 'book-thinking-fast' },
  });
  if (existingThink) {
    await prisma.bookSummary.update({
      where: { id: existingThink.id },
      data: {
        chaptersJson: JSON.stringify(thinkingChapters),
        contentType: 'deep-analysis',
        readingTime: 17,
      },
    });
    console.log('✓ 思考快与慢 内容已更新');
  } else {
    await prisma.bookSummary.create({
      data: {
        bookId: 'book-thinking-fast',
        pagesJson: '[]',
        themeJson: '{}',
        chaptersJson: JSON.stringify(thinkingChapters),
        contentType: 'deep-analysis',
        readingTime: 17,
      },
    });
    console.log('✓ 思考快与慢 内容已创建');
  }

  // 唐诗三百首 — BookScene
  await prisma.bookScene.upsert({
    where: { bookId: 'book-tang-poetry' },
    update: tangPoetryScene,
    create: { bookId: 'book-tang-poetry', ...tangPoetryScene },
  });
  console.log('✓ 唐诗三百首 场景已设置');

  // 思考快与慢 — BookScene
  await prisma.bookScene.upsert({
    where: { bookId: 'book-thinking-fast' },
    update: thinkingScene,
    create: { bookId: 'book-thinking-fast', ...thinkingScene },
  });
  console.log('✓ 思考快与慢 场景已设置');

  console.log('\n全部完成！');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

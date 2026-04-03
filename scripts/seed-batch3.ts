/**
 * 填充第3批5本新书的元数据 + 内容 + 场景
 * 运行: npx tsx scripts/seed-batch3.ts
 */
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const url = process.env.DATABASE_URL || 'file:./dev.db';
const authToken = process.env.DATABASE_AUTH_TOKEN;
const adapter = new PrismaLibSql({ url, ...(authToken ? { authToken } : {}) });
const prisma = new PrismaClient({ adapter });

interface BookSeed {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  score: number;
  scene: { sceneType: string; sceneConfig: string };
  chapters: Array<{
    id: string;
    title: string;
    readingTimeMin: number;
    blocks: Array<Record<string, unknown>>;
  }>;
}

const books: BookSeed[] = [
  // ─── 1. 百年孤独 ──────────────────────────────────────
  {
    id: 'book-hundred-years',
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    category: '文学',
    description: '魔幻现实主义的巅峰杰作，布恩迪亚家族七代人的命运史诗，关于孤独、循环与拉丁美洲的百年寓言',
    score: 9.3,
    scene: {
      sceneType: 'nature',
      sceneConfig: JSON.stringify({
        description: '热带雨林中的马孔多小镇，金色蝴蝶在潮湿的空气中飞舞',
        config: {
          palette: ['#2D5016', '#4A7C28', '#F4D03F', '#E67E22', '#1B4332'],
          elements: ['butterflies', 'rain', 'jungle', 'mist'],
          mood: 'mystical',
          timeOfDay: 'dusk',
        },
      }),
    },
    chapters: [
      {
        id: 'ch-hy-1', title: '第一章 · 马孔多的创世', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '冰块与镜子——一个小镇的诞生', level: 1 },
          { type: 'paragraph', content: '小说的开头是文学史上最著名的句子之一："多年以后，面对行刑队，奥雷里亚诺·布恩迪亚上校将会回想起父亲带他去见识冰块的那个遥远的下午。"这一句话中包含了三个时间层次——现在、未来和过去——马尔克斯用这种时间的折叠，为整部小说奠定了基调。' },
          { type: 'key-insight', content: '马孔多是一面镜子。马尔克斯不是在写一个虚构小镇的故事，而是在写整个拉丁美洲的缩影——殖民、独立、内战、独裁、外国资本入侵、文化遗忘——所有这些都在布恩迪亚家族的七代人中循环上演。' },
          { type: 'paragraph', content: '何塞·阿尔卡蒂奥·布恩迪亚是马孔多的创建者，一个充满好奇心和野心的人。他痴迷于吉普赛人梅尔基亚德斯带来的种种新奇事物——磁铁、放大镜、冰块。这些看似新奇的东西，象征着"现代性"对原始世界的第一次冲击。' },
          { type: 'quote', content: '"世界太新，很多事物还没有名字，提到它们的时候还需要用手指去指。"——这句话既是对马孔多的描述，也是对整个大陆童年期的隐喻。' },
          { type: 'callout', content: '马尔克斯的时间观：在《百年孤独》中，时间不是线性的，而是循环的。每一代人都在重复上一代人的错误和命运，仿佛被一种看不见的力量所驱使。这种宿命感是这部小说最令人不安也最引人深思的地方。' },
        ],
      },
      {
        id: 'ch-hy-2', title: '第二章 · 孤独的谱系', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '七代人的孤独变奏', level: 1 },
          { type: 'paragraph', content: '布恩迪亚家族的每一代人都以不同的方式体验着孤独。何塞·阿尔卡蒂奥沉迷于科学实验的孤独、乌尔苏拉维持家族秩序的孤独、奥雷里亚诺上校在32场战争中的孤独、阿玛兰妲终身等待一个不会来的爱人的孤独。' },
          { type: 'key-insight', content: '马尔克斯笔下的孤独不是简单的"独处"，而是一种存在性的隔绝——每个人都被困在自己的世界里，即使身边围满了人。奥雷里亚诺上校在晚年反复制作小金鱼又融化重做，这个动作既是创造也是毁灭，是孤独最精确的象征。' },
          { type: 'paragraph', content: '家族成员的名字不断重复——何塞·阿尔卡蒂奥、奥雷里亚诺——这不仅是叙事技巧，更是主题的一部分：历史在重复，人们在重复前辈的错误，而没有人从中学到任何东西。' },
          { type: 'quote', content: '"布恩迪亚家族的每个人脸上都带着一种无可救药的孤独印记。"' },
          { type: 'callout', content: '反思：马尔克斯通过一个家族的故事提出了一个普遍性的问题——人类能否打破历史的循环？还是我们注定要重复同样的悲剧？这个问题至今仍然没有答案。' },
        ],
      },
      {
        id: 'ch-hy-3', title: '第三章 · 魔幻与现实', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '为什么魔幻现实主义是必要的', level: 1 },
          { type: 'paragraph', content: '在《百年孤独》中，死者的幽灵与活人同桌吃饭，一场持续四年的大雨淹没了整个小镇，一个美女升天而去。这些"不可能"的事件在小说中被当作日常来叙述，没有惊讶，没有解释。' },
          { type: 'key-insight', content: '马尔克斯的魔幻现实主义不是幻想文学。它的核心逻辑是：当现实本身已经荒诞到了极点——大屠杀被政府否认、香蕉公司控制整个国家、独裁者统治几十年——那么用"正常"的方式来叙述这些事反而是不真实的。魔幻是比写实更准确地捕捉拉美现实的方式。' },
          { type: 'paragraph', content: '小说结尾，最后一个布恩迪亚在破译梅尔基亚德斯的羊皮卷时发现，家族的整个历史早已被预言写就。当他读完最后一行时，马孔多被一阵飓风从地球上抹去——"注定经受百年孤独的家族不会有第二次机会在大地上出现。"' },
          { type: 'callout', content: '《百年孤独》的终极启示：孤独不是一种选择，而是一种处境。但意识到自己的孤独，意识到历史的循环，或许就是打破循环的第一步——虽然马尔克斯本人对此并不乐观。' },
        ],
      },
    ],
  },

  // ─── 2. 枪炮、病菌与钢铁 ─────────────────────────────
  {
    id: 'book-guns-germs-steel',
    title: '枪炮、病菌与钢铁',
    author: '贾雷德·戴蒙德',
    category: '历史',
    description: '人类社会的命运为何如此不同？一部追溯13000年人类文明差异根源的宏大叙事',
    score: 8.9,
    scene: {
      sceneType: 'abstract',
      sceneConfig: JSON.stringify({
        description: '地球大陆板块上不同文明的光点此消彼长',
        config: {
          palette: ['#1A1A2E', '#16213E', '#0F3460', '#E94560', '#ECB365'],
          elements: ['continents', 'connections', 'waves', 'particles'],
          mood: 'analytical',
          timeOfDay: 'night',
        },
      }),
    },
    chapters: [
      {
        id: 'ch-ggs-1', title: '第一章 · 耶利的问题', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '为什么是欧洲人征服了美洲，而不是反过来？', level: 1 },
          { type: 'paragraph', content: '1972年，新几内亚政治家耶利问了戴蒙德一个简单而深刻的问题："为什么你们白人制造了那么多货物，而我们黑人却几乎什么也没有？"这个问题成为了整本书的出发点。' },
          { type: 'key-insight', content: '戴蒙德的核心论点：不同大陆上人类社会的发展差异，根本原因不是种族的智力差异，而是地理环境的差异。具体来说，是各大陆可驯化的动植物种类、大陆的轴线方向、以及生态障碍的分布，决定了哪些社会能最先发展出农业、文字、技术和国家组织。' },
          { type: 'paragraph', content: '为什么新月沃地（今中东地区）成为最早的文明发源地？因为那里恰好集中了世界上最多的可驯化谷物（小麦、大麦）和大型哺乳动物（牛、羊、猪、马）。这不是因为那里的人更聪明，而是因为他们运气好——生物多样性的彩票开给了他们。' },
          { type: 'quote', content: '"历史遵循不同的道路前进，其原因是各民族所处的环境不同，而不是各民族之间的生物学差异。"' },
          { type: 'callout', content: '这个论点在今天依然具有颠覆性：它彻底否定了任何形式的种族优越论，把文明差异的根源从"人"转移到了"地"。' },
        ],
      },
      {
        id: 'ch-ggs-2', title: '第二章 · 农业的力量', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '粮食生产如何催生文明', level: 1 },
          { type: 'paragraph', content: '农业是文明的基础设施。只有当一个社会能够生产足够多的粮食来养活非农业人口时，才会出现专职的士兵、工匠、祭司、官僚和发明家。这就是为什么狩猎采集社会无法发展出复杂的技术和国家组织。' },
          { type: 'key-insight', content: '大陆轴线理论是本书最精彩的洞见之一。欧亚大陆是东西向延伸的，同纬度地区气候相似，因此作物和家畜可以在大陆上快速传播（小麦从中东传到中国只用了几千年）。而美洲和非洲是南北向延伸的，不同纬度的气候差异极大，作物传播极为困难（玉米从墨西哥传到美国东部用了数千年）。' },
          { type: 'paragraph', content: '这一个地理差异导致了巨大的连锁反应：欧亚大陆的社会更早进入农业，更早产生剩余粮食，更早发展出专业分工、文字、技术和大型政治组织。到15世纪大航海时代，这种数千年积累的差距已经变成了不可逾越的鸿沟。' },
          { type: 'callout', content: '思考：如果把非洲大陆旋转90度变成东西向，人类历史会完全不同吗？戴蒙德的分析暗示：很可能是的。这就是地理决定论的力量——也是它的局限。' },
        ],
      },
      {
        id: 'ch-ggs-3', title: '第三章 · 病菌的武器', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '看不见的征服者', level: 1 },
          { type: 'paragraph', content: '当皮萨罗率领168名西班牙士兵击败印加帝国8万大军时，真正的武器不是枪炮和钢铁，而是天花。欧洲殖民者带来的传染病消灭了美洲95%的原住民——这是人类历史上最大规模的种族灭绝，而施害者甚至不知道自己在做什么。' },
          { type: 'key-insight', content: '为什么病菌总是从欧亚大陆传向其他大陆，而不是反过来？因为欧亚大陆的人与家畜共同生活了数千年，天花来自牛、流感来自猪、麻疹来自犬。长期接触让欧亚人获得了一定程度的免疫力，而美洲和大洋洲的人对这些疾病毫无抵抗力。没有大型可驯化动物的大陆，也就没有"人畜共患病"的进化训练场。' },
          { type: 'paragraph', content: '这个发现彻底改变了我们对"征服"的理解：西班牙人不是靠勇气和战术征服了美洲，而是靠细菌——一种他们自己都不理解的生物武器。历史的进程在很大程度上是由微生物决定的。' },
          { type: 'callout', content: '《枪炮、病菌与钢铁》的终极启示：个人和民族的命运，在很大程度上取决于他们无法控制的地理和生态条件。这不是宿命论，而是一种更谦卑的历史观——承认运气和环境的作用，比假装一切都是"努力"的结果更接近真相。' },
        ],
      },
    ],
  },

  // ─── 3. 当下的力量 ──────────────────────────────────
  {
    id: 'book-power-of-now',
    title: '当下的力量',
    author: '埃克哈特·托利',
    category: '心理学',
    description: '一部关于意识觉醒与活在当下的灵性指南，帮助你从思维的牢笼中解放出来',
    score: 8.5,
    scene: {
      sceneType: 'nature',
      sceneConfig: JSON.stringify({
        description: '宁静的湖面倒映着天空，水面上一片落叶泛起涟漪',
        config: {
          palette: ['#F0F4EF', '#A7C4BC', '#8DB4A2', '#5C7A6E', '#2C3E50'],
          elements: ['water', 'ripples', 'leaves', 'light'],
          mood: 'serene',
          timeOfDay: 'dawn',
        },
      }),
    },
    chapters: [
      {
        id: 'ch-pn-1', title: '第一章 · 你不是你的思维', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '观察者与被观察者', level: 1 },
          { type: 'paragraph', content: '托利提出了一个颠覆性的观点：你头脑中那个不停说话的声音——那个评判、焦虑、计划、后悔的声音——不是"你"。你是那个能够"观察"这个声音的意识。大多数人一生都认同于自己的思维，以为"我就是我的想法"，这就是痛苦的根源。' },
          { type: 'key-insight', content: '思维的本质是强迫性的。你有没有注意到，即使你不想思考，你的大脑也在不停地产生想法？这种"思维噪音"消耗了我们大量的生命能量，让我们永远活在对过去的反刍和对未来的焦虑中——唯独不在当下。' },
          { type: 'paragraph', content: '托利说他经历了一次深刻的意识转化：在极度痛苦的某个夜晚，他突然意识到"我无法再和自己共处"这句话暗示了两个"我"的存在——一个在受苦的"我"和一个在观察受苦的"我"。这个发现让他从认同思维中脱离出来。' },
          { type: 'quote', content: '"你不等于你的心智。觉知到这一点的那一天，你就自由了。"' },
          { type: 'callout', content: '练习：现在，暂停阅读10秒钟。闭上眼睛，注意你脑海中正在产生的想法——但不要参与它们，只是"看着"它们来来去去，像看天上飘过的云。那个正在"看"的，就是真正的你。' },
        ],
      },
      {
        id: 'ch-pn-2', title: '第二章 · 痛苦之身', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '情绪痛苦的隐藏机制', level: 1 },
          { type: 'paragraph', content: '托利引入了一个独特的概念："痛苦之身"（pain-body）。他认为每个人内心都有一个由过去未被消化的情绪痛苦所形成的能量体。这个痛苦之身是一个半自主的实体——它会在特定的情境下被"激活"，接管你的思维和行为，让你做出你事后会后悔的事情。' },
          { type: 'key-insight', content: '痛苦之身需要"喂养"——它以负面情绪为食。这就是为什么有些人似乎总在制造戏剧和冲突：不是因为他们想要痛苦，而是他们内心的痛苦之身需要痛苦来维持自己的存在。意识到这一点，你就不再是痛苦之身的傀儡。' },
          { type: 'paragraph', content: '当痛苦之身被激活时，你会感到一股强烈的负面情绪涌上来——愤怒、恐惧、悲伤。在这个时刻，大多数人会被情绪完全淹没。但如果你能保持一丝觉知——"我注意到痛苦之身正在活动"——这个简单的觉察就开始削弱它的力量。' },
          { type: 'callout', content: '下次你感到强烈的负面情绪时，试着对自己说："这是我的痛苦之身在说话，不是真正的我。"你不需要压抑情绪，只需要"看见"它。光是看见这个动作，就是转化的开始。' },
        ],
      },
      {
        id: 'ch-pn-3', title: '第三章 · 进入当下', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '唯一真实存在的时刻', level: 1 },
          { type: 'paragraph', content: '托利的核心教导：过去和未来都只存在于思维之中。你永远无法在"过去"做任何事——你记忆中的过去是现在的一个思维活动。你也永远无法在"未来"做任何事——你计划中的未来也是现在的一个思维活动。唯一真实的、你能够体验和行动的，永远是"现在这一刻"。' },
          { type: 'key-insight', content: '这不是叫你不要计划或不要学习历史。而是说：计划的行为发生在当下，回忆的行为发生在当下，阅读这些文字的行为发生在当下。当你全然地在当下时，思维变成了一个有用的工具而不是牢笼——你需要它的时候使用它，不需要的时候放下它。' },
          { type: 'paragraph', content: '如何进入当下？托利建议从身体开始——感受你的双手、呼吸、脚下的地面。身体永远存在于当下（不像思维可以去往过去和未来），所以回到身体感受就是回到当下最直接的途径。' },
          { type: 'callout', content: '《当下的力量》最深刻的悖论：你不需要"达到"当下，因为你已经在这里了。你需要做的不是"获得"什么，而是"放下"——放下对过去的执着和对未来的焦虑，你自然就回到了当下。这是减法，不是加法。' },
        ],
      },
    ],
  },

  // ─── 4. 乌合之众 ──────────────────────────────────
  {
    id: 'book-the-crowd',
    title: '乌合之众',
    author: '古斯塔夫·勒庞',
    category: '社会学',
    description: '群体心理学的开山之作，揭示个体在群体中如何丧失理性，成为情绪和本能的奴隶',
    score: 8.3,
    scene: {
      sceneType: 'abstract',
      sceneConfig: JSON.stringify({
        description: '无数光点汇聚成涌动的人潮，个体的光芒在集体中消融',
        config: {
          palette: ['#1A1A2E', '#302B63', '#4A4E69', '#9A8C98', '#F2E9E4'],
          elements: ['particles', 'waves', 'vortex', 'connections'],
          mood: 'turbulent',
          timeOfDay: 'dusk',
        },
      }),
    },
    chapters: [
      {
        id: 'ch-tc-1', title: '第一章 · 群体的灵魂', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '当个体变成群体', level: 1 },
          { type: 'paragraph', content: '勒庞在1895年提出了一个至今仍令人不安的观察：当个体组成群体时，他们的智力水平会下降到群体中最低成员的水平。一群教授聚在一起做出的集体决策，可能还不如其中一个教授单独做出的决策。' },
          { type: 'key-insight', content: '群体的三大特征：①冲动性——群体无法进行延迟满足或深思熟虑；②易受暗示——群体像被催眠的人一样容易接受外部暗示；③情绪传染——一个人的情绪可以像病毒一样在群体中迅速扩散，最终整个群体被同一种情绪支配。' },
          { type: 'paragraph', content: '勒庞认为，群体中的个体会经历一种"心理退化"——他们的理性思维能力被抑制，而原始的情绪和本能被释放。这不是因为群体中的人"变坏了"，而是群体的匿名性让他们失去了个人责任感，同时群体的集体力量让他们感到无所不能。' },
          { type: 'quote', content: '"在集体心灵中，个人的才智和个性被削弱了。异质性被同质性所吞没，无意识的品质占据了上风。"' },
          { type: 'callout', content: '想想社交媒体——推特上的"群体审判"、微博上的"网络暴力"——勒庞在130年前描述的群体心理，在数字时代以更极端的形式重现了。唯一的区别是：今天的群体可以在几分钟内形成，而不需要人们物理地聚集在一起。' },
        ],
      },
      {
        id: 'ch-tc-2', title: '第二章 · 群体的领袖', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '如何操控群体的心智', level: 1 },
          { type: 'paragraph', content: '勒庞发现，群体不是被逻辑和证据说服的，而是被形象和情绪征服的。有效的群体领袖使用三种工具：断言（简单、直接、不给论证）、重复（重复就是力量）和传染（让已经被说服的人去感染其他人）。' },
          { type: 'key-insight', content: '"断言—重复—传染"的公式解释了为什么政治宣传、广告营销和宗教传播使用惊人相似的策略。你不需要证明一个说法是真的——你只需要足够多的人足够多次地重复它。到了某个临界点，它就会"变成"真的。' },
          { type: 'paragraph', content: '勒庞还观察到，群体领袖通常不是最聪明的人，而是"信念最坚定"的人。群体需要的不是理性分析，而是确定感——越是不确定的时代，群体越渴望一个给出简单答案的领袖，即使这些答案是错误的。' },
          { type: 'callout', content: '在信息过载的今天，勒庞的洞见比以往更加重要：我们以为互联网让人们更理性（因为信息更充分了），但实际效果恰恰相反——信息过载让人更依赖简单的叙事和情绪化的判断，这正是群体心理的温床。' },
        ],
      },
      {
        id: 'ch-tc-3', title: '第三章 · 超越群体', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '如何保持个体的思考', level: 1 },
          { type: 'paragraph', content: '勒庞的分析虽然偏悲观，但也暗示了一条出路：意识到群体心理的存在，本身就是一种防御。当你感到一股强烈的集体情绪——愤怒、恐惧、狂热——正在裹挟你时，停下来问自己："如果我现在是一个人，我会做同样的判断吗？"' },
          { type: 'key-insight', content: '勒庞的局限也很明显：他将群体一概而论为非理性的，忽视了群体智慧的一面（如"集体智慧"现象）。现代心理学研究表明，在满足特定条件时——独立思考、多元视角、适当的聚合机制——群体的判断可以优于个人。关键在于群体的结构设计。' },
          { type: 'paragraph', content: '这本书写于民主制度还在确立的年代，勒庞对群众力量的恐惧带有明显的精英主义倾向。但剥去时代局限，他对群体心理机制的描述——冲动、传染、服从——依然是理解当代社会现象不可缺少的工具。' },
          { type: 'callout', content: '《乌合之众》的最终提醒：做一个独立思考者不是天赋，而是需要持续练习的技能。每当你发现自己在附和一种"所有人都这么认为"的观点时，那恰恰是你最需要停下来独立思考的时刻。' },
        ],
      },
    ],
  },

  // ─── 5. 刻意练习 ──────────────────────────────────
  {
    id: 'book-peak',
    title: '刻意练习',
    author: '安德斯·艾利克森',
    category: '自我成长',
    description: '天才不是天生的。心理学家揭示卓越表现背后的科学原理，颠覆"天赋论"的迷思',
    score: 8.2,
    scene: {
      sceneType: 'interior',
      sceneConfig: JSON.stringify({
        description: '安静的练习室，钢琴上的光影，无数个日夜的积累',
        config: {
          palette: ['#2C2C2C', '#4A4A4A', '#D4A574', '#F5E6CC', '#FFFFFF'],
          elements: ['spotlight', 'instrument', 'warmth', 'focus'],
          mood: 'focused',
          timeOfDay: 'night',
        },
      }),
    },
    chapters: [
      {
        id: 'ch-pk-1', title: '第一章 · 天赋的谎言', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '莫扎特不是天才——至少不是你以为的那种', level: 1 },
          { type: 'paragraph', content: '莫扎特被公认为音乐天才的典范：4岁作曲，6岁巡演。但艾利克森指出了被忽略的事实：莫扎特的父亲是当时欧洲最优秀的音乐教育家之一，从莫扎特3岁起就对他进行了密集的系统训练。莫扎特早期的"作品"实际上是他父亲的改编和润色。' },
          { type: 'key-insight', content: '艾利克森30年研究的核心发现：在几乎所有领域——音乐、体育、国际象棋、医学——"天才"的表现背后都有大量的刻意练习。没有任何可靠的科学证据表明，存在一种不需要练习就能达到专家水平的先天"天赋"。差异在于练习的质量和数量，而不是基因。' },
          { type: 'paragraph', content: '这个发现不是在否认个体差异的存在——身高、手指长度确实会影响某些领域的表现。但在绝大多数复杂技能中，练习的作用远远超过了先天差异。问题是：大多数人的练习方式是错误的。' },
          { type: 'quote', content: '"没有人能够不通过多年的刻苦训练就发展出超凡的能力。没有捷径，也没有例外。"' },
          { type: 'callout', content: '这个观点对教育有深远的意义：如果我们相信"天赋决定论"，就会过早地给孩子贴标签——"他不是学数学的料"；但如果我们相信练习的力量，就会关注如何设计更好的训练方法。' },
        ],
      },
      {
        id: 'ch-pk-2', title: '第二章 · 心理表征', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '专家的大脑里到底有什么不同', level: 1 },
          { type: 'paragraph', content: '国际象棋大师能在5秒内记住一个棋局的所有棋子位置——但如果把棋子随机摆放，他们的记忆力和新手一样差。这说明专家的优势不是"超级记忆力"，而是他们拥有丰富的"心理表征"——对特定领域模式的深层理解。' },
          { type: 'key-insight', content: '心理表征是专家和新手的根本区别。新手看到的是一堆孤立的信息，专家看到的是有意义的模式和结构。医生一眼看出X光片中的异常，不是因为他们的眼睛更好，而是因为他们的大脑中已经建立了成千上万个"正常vs异常"的心理表征。' },
          { type: 'paragraph', content: '刻意练习的本质就是建立和优化心理表征。每一次有目的的练习，都在大脑中创建、修正和强化这些表征。这就是为什么"无脑重复"（比如毫无目标地弹钢琴10年）不等于刻意练习——没有反馈和修正的重复不会建立更好的心理表征。' },
          { type: 'callout', content: '想想你在工作中的"自动驾驶"状态——你已经做了5年的事情，但技能水平可能在第2年就停滞了。这是因为你停止了刻意练习，进入了"舒适区重复"。要继续进步，你需要持续挑战自己的心理表征。' },
        ],
      },
      {
        id: 'ch-pk-3', title: '第三章 · 刻意练习的原则', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '如何正确地练习', level: 1 },
          { type: 'paragraph', content: '艾利克森区分了三种练习：天真的练习（无目标地重复）、有目的的练习（有目标但缺乏系统方法）和刻意练习（有明确目标、即时反馈、专注于弱点、在舒适区边缘工作）。只有第三种能够持续产生进步。' },
          { type: 'key-insight', content: '刻意练习的四个核心要素：①有明确的、具体的目标（不是"弹好钢琴"，而是"在120BPM下完美演奏第三乐章的第17-24小节"）；②全神贯注（刻意练习不是休闲活动，它需要100%的注意力）；③即时反馈（知道自己做对了什么、做错了什么）；④持续走出舒适区（始终挑战比当前水平稍难一点的任务）。' },
          { type: 'numbered-list', content: '将刻意练习应用到你的领域：', children: [
            { type: 'paragraph', content: '找到你所在领域的"标准训练方法"——如果有优秀的教练或导师，效果最好' },
            { type: 'paragraph', content: '拆解技能——把复杂技能分解为可以单独练习的子技能' },
            { type: 'paragraph', content: '专注于弱点——花80%的练习时间在你最薄弱的环节上' },
            { type: 'paragraph', content: '建立反馈循环——记录、评估、调整' },
            { type: 'paragraph', content: '保持专注——短时间的高质量练习优于长时间的低质量重复' },
          ]},
          { type: 'callout', content: '《刻意练习》的核心信息：卓越不是天赋的产物，而是正确练习的产物。这既是好消息（你可以变得更好），也是坏消息（没有捷径，只有日复一日的刻意训练）。选择权在你手中。' },
        ],
      },
    ],
  },
];

async function main() {
  console.log('开始填充第3批5本新书...\n');

  for (const book of books) {
    await prisma.book.upsert({
      where: { id: book.id },
      update: {
        title: book.title,
        author: book.author,
        category: book.category,
        description: book.description,
        score: book.score,
      },
      create: {
        id: book.id,
        title: book.title,
        author: book.author,
        category: book.category,
        description: book.description,
        score: book.score,
      },
    });

    const existing = await prisma.bookSummary.findFirst({
      where: { bookId: book.id },
    });
    if (existing) {
      await prisma.bookSummary.update({
        where: { id: existing.id },
        data: {
          chaptersJson: JSON.stringify(book.chapters),
          contentType: 'deep-analysis',
          readingTime: book.chapters.reduce((s, c) => s + c.readingTimeMin, 0),
        },
      });
    } else {
      await prisma.bookSummary.create({
        data: {
          bookId: book.id,
          pagesJson: '[]',
          themeJson: '{}',
          chaptersJson: JSON.stringify(book.chapters),
          contentType: 'deep-analysis',
          readingTime: book.chapters.reduce((s, c) => s + c.readingTimeMin, 0),
        },
      });
    }

    await prisma.bookScene.upsert({
      where: { bookId: book.id },
      update: book.scene,
      create: { bookId: book.id, ...book.scene },
    });

    console.log(`✓ ${book.title} — ${book.chapters.length}章, ${book.chapters.reduce((s, c) => s + c.readingTimeMin, 0)}分钟`);
  }

  console.log('\n全部完成！');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

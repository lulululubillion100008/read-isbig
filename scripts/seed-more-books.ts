/**
 * 填充5本新书的元数据 + 内容 + 场景
 * 运行: npx tsx scripts/seed-more-books.ts
 */
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({ url: 'file:./dev.db' });
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
  // ─── 1. 人类简史 ────────────────────────────────────────
  {
    id: 'book-sapiens',
    title: '人类简史',
    author: '尤瓦尔·赫拉利',
    category: '历史',
    description: '从动物到上帝，一部颠覆认知的人类演化史，重新审视我们作为物种的过去、现在与未来',
    score: 9.1,
    scene: {
      sceneType: 'abstract',
      sceneConfig: JSON.stringify({
        description: '时间长河中的文明星光，从远古篝火到现代城市',
        config: {
          palette: ['#1B2838', '#2C3E50', '#E67E22', '#F39C12', '#ECF0F1'],
          elements: ['particles', 'connections', 'timeline', 'stars'],
          mood: 'epic',
          timeOfDay: 'night',
        },
      }),
    },
    chapters: [
      {
        id: 'ch-sap-1', title: '第一章 · 认知革命', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '一个无足轻重的物种如何统治地球', level: 1 },
          { type: 'paragraph', content: '大约7万年前，一个名为"智人"的灵长类动物开始做出非常特别的事情。它们开始讲述一些"虚构的故事"——关于神灵、国家、金钱、公司——这些并不存在于物理世界中的东西。这就是认知革命。' },
          { type: 'key-insight', content: '赫拉利的核心论点：智人之所以能统治地球，不是因为我们更强壮或更聪明，而是因为我们是唯一能够"相信虚构故事"的物种。正是这种能力，让成千上万的陌生人能够为了共同的目标而协作。' },
          { type: 'paragraph', content: '一只黑猩猩首领最多能管理约50只同伴，因为它需要和每一个成员建立个人关系。但一个人类领袖可以通过"虚构的故事"——宗教、意识形态、法律——让数百万人朝同一个方向前进。' },
          { type: 'quote', content: '大量的陌生人只要共同相信某个故事，就能成功合作。世界上所有大规模人类合作——从宗教到国家到经济体系——都根植于虚构的故事。' },
          { type: 'callout', content: '反思：你今天使用的每一张纸币、你的公司、你的国籍——这些都是"虚构的故事"。它们之所以有效，仅仅因为足够多的人同时相信它们。' },
        ],
      },
      {
        id: 'ch-sap-2', title: '第二章 · 农业革命的陷阱', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '史上最大的骗局', level: 1 },
          { type: 'paragraph', content: '传统叙事把农业革命描述为人类的伟大进步。赫拉利却提出了一个挑衅的观点：农业革命是"史上最大的骗局"。不是人类驯化了小麦，而是小麦驯化了人类。' },
          { type: 'key-insight', content: '采集者的生活：每天工作3-6小时，饮食多样，社交丰富，疾病较少。农民的生活：每天劳作10-12小时，饮食单一，身体退化，疾病增多。从个体幸福的角度，农业革命是一次巨大的倒退。' },
          { type: 'paragraph', content: '那为什么人类没有回头？因为农业革命是一个渐进的过程，每一代人只做了微小的改变，等到意识到整体方向时，已经无法回头——人口增长锁定了农业社会，没有足够的野果养活所有人了。' },
          { type: 'quote', content: '小麦从一种无名的野草变成了遍布世界的植物——从小麦的角度来看，人类才是被利用的那一方。' },
          { type: 'callout', content: '这个逻辑在今天仍然适用：我们以为智能手机让生活更便利，但工作邮件的即时回复要求、社交媒体的成瘾设计——是我们驯化了技术，还是技术驯化了我们？' },
        ],
      },
      {
        id: 'ch-sap-3', title: '第三章 · 帝国与宗教', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '想象的秩序如何构建文明', level: 1 },
          { type: 'paragraph', content: '当人类社群扩大到几千人以上，就需要更强大的"虚构故事"来维持秩序。宗教、帝国和金钱成为了人类历史上最成功的三大故事系统。' },
          { type: 'key-insight', content: '金钱是人类发明的最成功的"互信系统"。两个素不相识的人可能信仰不同的神、效忠不同的国王，但他们都愿意接受同一枚金币。金钱之所以有价值，不是因为金属本身，而是因为整个交易网络中的人都相信它有价值。' },
          { type: 'paragraph', content: '帝国的作用被简单地归结为"压迫"是不准确的。帝国也是文化融合的加速器——从罗马法到中华文化圈，帝国创造了大规模的统一标准，让不同族群能够交流协作。' },
          { type: 'callout', content: '赫拉利的深层观点：没有纯粹的"正义"或"压迫"叙事。每一个帝国、宗教、意识形态都既是压迫的工具，也是合作的平台。理解历史需要接受这种根本性的矛盾。' },
        ],
      },
      {
        id: 'ch-sap-4', title: '第四章 · 科学革命', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '承认无知的力量', level: 1 },
          { type: 'paragraph', content: '1500年前后，欧洲发生了一次根本性的思想转变：人们开始承认"我们不知道"。这看似简单的认识论转变，开启了整个科学革命——因为只有承认无知，才有探索的动力。' },
          { type: 'key-insight', content: '科学革命的核心不是任何具体发现，而是一种全新的知识态度。古代文明相信"所有重要的知识已经被掌握"（在经典中、在神谕中）；现代科学相信"我们最重要的知识尚未被发现"。这一转变改变了一切。' },
          { type: 'paragraph', content: '科学、帝国与资本主义形成了正反馈循环：科学需要资金，帝国需要技术，资本主义需要增长。三者互相喂养，加速了人类力量的指数级增长——同时也加速了对自然的破坏。' },
          { type: 'quote', content: '现代科学体系与所有先前的知识体系之间最大的不同在于：它坦诚地承认自己的无知。' },
        ],
      },
      {
        id: 'ch-sap-5', title: '第五章 · 智人的终结？', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '当人类成为神', level: 1 },
          { type: 'paragraph', content: '赫拉利在最后提出了最令人不安的问题：智人可能正在通过生物工程、人工智能和基因编辑，将自己改造成一个全新的物种。40亿年来的自然选择规则，可能即将被"智能设计"取代。' },
          { type: 'key-insight', content: '赫拉利的终极警告：我们拥有了神一样的能力（改造基因、创造AI、重塑生态），却仍然保持着采集者时代的欲望和恐惧。一个拥有神力但不知道自己想要什么的物种，可能是宇宙中最危险的存在。' },
          { type: 'paragraph', content: '这本书并不提供答案，而是重新定义了问题：在我们急于追求更强大的技术之前，也许应该先问自己——"我们到底想要什么？"' },
          { type: 'callout', content: '《人类简史》的最大价值不在于讲述历史，而在于提供一面镜子：让我们看清那些我们习以为常的"现实"（国家、金钱、宗教）其实都是虚构的故事——理解这一点，才能真正自由地思考未来。' },
        ],
      },
    ],
  },

  // ─── 2. 小王子 ─────────────────────────────────────────
  {
    id: 'book-little-prince',
    title: '小王子',
    author: '安托万·德·圣埃克苏佩里',
    category: '文学',
    description: '一部写给大人的童话，关于爱、孤独与生命中真正重要的东西',
    score: 9.0,
    scene: {
      sceneType: 'nature',
      sceneConfig: JSON.stringify({
        description: '星空下的沙漠，一朵玫瑰在星球上绽放',
        config: {
          palette: ['#0C1445', '#1A237E', '#FFD54F', '#FF8A65', '#F5F5DC'],
          elements: ['stars', 'desert', 'moon', 'flowers'],
          mood: 'dreamy',
          timeOfDay: 'night',
        },
      }),
    },
    chapters: [
      {
        id: 'ch-lp-1', title: '第一章 · 驯养与被驯养', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '什么是"驯养"？', level: 1 },
          { type: 'paragraph', content: '《小王子》中最核心的概念是"驯养"(apprivoiser)。狐狸对小王子说："驯养，就是建立联系。"在驯养之前，你对我而言只是千万个男孩中的一个；在驯养之后，你就是世界上独一无二的。' },
          { type: 'quote', content: '"对我来说，你只不过是一个小男孩，就像其他千万个小男孩一样。我不需要你。你也同样用不着我。对你来说，我也不过是一只狐狸，和其他千万只狐狸一样。但是，如果你驯养了我，我们就彼此需要了。"' },
          { type: 'key-insight', content: '驯养的本质是"投入时间"。我们对一个人、一件事的爱，不是因为对方天生特别，而是因为我们在其中投入了时间和心血。正是你为你的玫瑰花费的时间，使你的玫瑰变得如此重要。' },
          { type: 'paragraph', content: '这解释了为什么小王子的玫瑰花和花园里成千上万朵一模一样的玫瑰不同——不是因为它更美，而是因为小王子浇灌过它、为它挡过风、听过它的抱怨。关系的独特性来自共同经历的时间。' },
          { type: 'callout', content: '在这个一切都可以被"替换"的时代，驯养的哲学提醒我们：真正有价值的关系需要不可替代的时间投入。没有捷径，没有替代品。' },
        ],
      },
      {
        id: 'ch-lp-2', title: '第二章 · 大人的世界', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '所有大人都曾经是小孩', level: 1 },
          { type: 'paragraph', content: '小王子在旅途中遇到了六个星球上的大人：国王、虚荣的人、酒鬼、商人、点灯人和地理学家。他们分别代表了大人世界的六种荒谬：权力欲、虚荣心、逃避、贪婪、盲从和空洞的知识。' },
          { type: 'key-insight', content: '圣埃克苏佩里的洞察：大人们忙于"重要的事"——计算星星的数量、统治空无一人的王国——却忘记了真正重要的事：看一次日落，闻一朵花，和一个朋友说话。忙碌本身成了逃避生活本质的方式。' },
          { type: 'quote', content: '"大人们真的非常奇怪。"小王子在旅途中只能这样自言自语。' },
          { type: 'paragraph', content: '唯一让小王子有好感的是点灯人——因为他是唯一一个在为别人做事的人。尽管他的工作看似荒谬（在一个一分钟转一圈的星球上不停地点灯灭灯），但至少他忠于自己的承诺。' },
          { type: 'callout', content: '审视自己：你是否也在某个时刻变成了那个计算星星的商人——声称"拥有"很多东西，却不知道拥有它们的意义是什么？' },
        ],
      },
      {
        id: 'ch-lp-3', title: '第三章 · 看不见的本质', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '用心才能看见', level: 1 },
          { type: 'paragraph', content: '这是《小王子》中最著名的一句话，也是全书的哲学核心："本质的东西用眼睛是看不见的，只有用心才能看清。"' },
          { type: 'quote', content: '"这是我的秘密。很简单：只有用心灵才能看得清事物的本质，真正重要的东西是肉眼无法看见的。"\n—— 狐狸' },
          { type: 'key-insight', content: '这不是一句心灵鸡汤，而是一种认识论的宣言：我们用理性和数据衡量世界时，恰恰会遗漏最重要的维度——爱、友谊、美、意义。这些无法量化的东西，才是生活的本质。' },
          { type: 'paragraph', content: '飞行员一开始画的蟒蛇吞大象的画，大人们看到的是"一顶帽子"。孩子能看到真相，不是因为他们更聪明，而是因为他们还没有被"只相信看得见的东西"这个大人法则驯化。' },
          { type: 'callout', content: '《小王子》之所以能打动一代又一代读者，是因为它唤醒了我们内心深处已经快要遗忘的那个孩子——那个曾经知道什么是真正重要的孩子。' },
        ],
      },
    ],
  },

  // ─── 3. 原则 ───────────────────────────────────────────
  {
    id: 'book-principles',
    title: '原则',
    author: '瑞·达利欧',
    category: '商业',
    description: '桥水基金创始人40年的生活和工作原则，一套系统化的决策框架',
    score: 8.4,
    scene: {
      sceneType: 'interior',
      sceneConfig: JSON.stringify({
        description: '现代极简办公室，落地窗外是城市天际线',
        config: {
          palette: ['#2C3E50', '#34495E', '#3498DB', '#ECF0F1', '#BDC3C7'],
          elements: ['desk', 'window', 'cityscape', 'warmlight'],
          mood: 'focused',
          timeOfDay: 'dawn',
        },
      }),
    },
    chapters: [
      {
        id: 'ch-pr-1', title: '第一章 · 拥抱现实', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '痛苦 + 反思 = 进步', level: 1 },
          { type: 'paragraph', content: '达利欧的第一原则：现实是你无法改变的，但你对现实的反应决定了你的命运。大多数人面对痛苦的本能是逃避或否认，但真正的成长只发生在你直面痛苦并从中学习的时候。' },
          { type: 'key-insight', content: '达利欧的公式：痛苦 + 反思 = 进步。每一次失败和痛苦都是一个学习机会。关键不是避免犯错，而是建立一个系统，确保同样的错误不会犯第二次。' },
          { type: 'paragraph', content: '他在1982年曾公开预测美国经济崩溃，结果大错特错，几乎赔光所有钱，不得不借4000美元维持家庭。这次失败成为他人生的转折点——他开始建立系统化的决策流程，不再依赖直觉。' },
          { type: 'quote', content: '我发现，想要拥有更好的生活，最好的方式就是：找到你犯错的模式，把这些模式写下来变成原则，然后系统性地遵循这些原则。' },
          { type: 'callout', content: '实践建议：每次遇到重大挫折后，写下三个问题的答案：①发生了什么？②我的判断哪里出了问题？③下次遇到类似情况应该怎么做？这就是建立个人"原则库"的起点。' },
        ],
      },
      {
        id: 'ch-pr-2', title: '第二章 · 极度透明', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '让最好的想法胜出', level: 1 },
          { type: 'paragraph', content: '桥水基金最具争议也最成功的文化是"极度透明"和"创意择优"。在桥水，任何人都可以质疑任何人的观点——包括达利欧本人。等级和资历不能成为观点正确的理由。' },
          { type: 'key-insight', content: '创意择优的核心：不是"谁说的"重要，而是"说了什么"重要。当一个实习生用数据和逻辑挑战CEO的判断时，CEO有义务认真回应，而不是用权威压制。最好的决策来自于思想的竞争，而不是权力的排序。' },
          { type: 'paragraph', content: '这种文化的代价是：很多人无法适应这种"被公开批评"的环境，桥水的员工离职率远高于行业平均。但达利欧认为，短期的不适换来的是长期的卓越决策。' },
          { type: 'callout', content: '你不需要在公司推行"极度透明"，但可以从一个小习惯开始：每次做重要决策时，主动找一个你信任的人来"攻击"你的方案。如果你的方案经得住攻击，你会更有信心；如果经不住，你就避免了一个错误。' },
        ],
      },
      {
        id: 'ch-pr-3', title: '第三章 · 系统化决策', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '把原则变成算法', level: 1 },
          { type: 'paragraph', content: '达利欧最独特的贡献是：他把自己的决策原则编码成了计算机算法。桥水的投资决策不是由个人直觉驱动，而是由几百条经过验证的原则组成的系统驱动。' },
          { type: 'key-insight', content: '原则 → 算法 → 系统。达利欧的方法论：①从经历中提炼原则；②把原则用明确的if-then规则表达；③将规则编入决策系统；④用实际结果反馈修正。这让决策质量不再依赖于个人的情绪状态。' },
          { type: 'numbered-list', content: '达利欧的5步流程：', children: [
            { type: 'paragraph', content: '设定目标——知道你真正想要什么' },
            { type: 'paragraph', content: '发现问题——诚实面对阻碍你的障碍' },
            { type: 'paragraph', content: '诊断根因——不停留在表面，找到深层原因' },
            { type: 'paragraph', content: '设计方案——制定解决问题的计划' },
            { type: 'paragraph', content: '执行到底——坚持执行直到达成目标' },
          ]},
          { type: 'callout', content: '这本书最大的价值不是达利欧的具体原则（它们可能不适用于你的情况），而是"建立原则"这个方法本身。每个人都应该有自己的原则库——它是你人生经验的结晶和未来决策的指南。' },
        ],
      },
    ],
  },

  // ─── 4. 被讨厌的勇气 ──────────────────────────────────
  {
    id: 'book-courage-disliked',
    title: '被讨厌的勇气',
    author: '岸见一郎 / 古贺史健',
    category: '心理学',
    description: '阿德勒心理学的哲学对话，关于自由、勇气和人际关系的颠覆性思考',
    score: 8.6,
    scene: {
      sceneType: 'nature',
      sceneConfig: JSON.stringify({
        description: '山顶的清晨，云海之上，一人独坐',
        config: {
          palette: ['#E8D5B7', '#F5E6CC', '#87CEEB', '#FFFFFF', '#D4A574'],
          elements: ['clouds', 'mountains', 'sunlight', 'mist'],
          mood: 'liberating',
          timeOfDay: 'dawn',
        },
      }),
    },
    chapters: [
      {
        id: 'ch-cd-1', title: '第一章 · 目的论 vs 原因论', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '你的不幸是你自己选择的', level: 1 },
          { type: 'paragraph', content: '阿德勒心理学的第一个颠覆：弗洛伊德说"过去的创伤决定了现在的你"（原因论），阿德勒说"你现在的目的决定了你如何解读过去"（目的论）。一个人闭门不出，不是因为过去受过伤，而是因为不出门可以达到某个目的——比如获得关注、避免失败。' },
          { type: 'key-insight', content: '这不是在指责受害者，而是在赋予你力量：如果你的不幸是由过去的创伤"决定"的，你就无能为力；但如果你的不幸是你当前的目的"造成"的，你就有改变的可能——因为目的是可以改变的。' },
          { type: 'quote', content: '"重要的不是你经历了什么，而是你如何使用你的经历。"——阿德勒' },
          { type: 'paragraph', content: '一个在严厉家庭中长大的人，可以选择"因为父母严厉所以我缺乏自信"的叙事，也可以选择"正因为经历了严厉的环境，我更懂得温柔的价值"的叙事。客观事实不变，但你选择的叙事决定了你的人生方向。' },
          { type: 'callout', content: '练习：选一件你一直在"归因于过去"的事情，试着用目的论重新审视——"我保持这个状态，是因为它在为我实现什么目的？"这个问题可能让你不舒服，但它也可能是改变的起点。' },
        ],
      },
      {
        id: 'ch-cd-2', title: '第二章 · 课题分离', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '你的课题，不是我的课题', level: 1 },
          { type: 'paragraph', content: '"课题分离"是阿德勒心理学中最实用的概念。判断一件事是谁的课题，标准很简单：这个选择的后果最终由谁承担？如果答案不是你，那就不是你的课题。' },
          { type: 'key-insight', content: '人际关系中绝大部分的烦恼，都来自于我们侵入了别人的课题，或者允许别人侵入了我们的课题。你的孩子不爱学习——学习是孩子的课题；你的同事不喜欢你——喜不喜欢是同事的课题。你能做的是把自己的课题做好，仅此而已。' },
          { type: 'paragraph', content: '这不是冷漠，而是尊重。课题分离的前提是"信任"——我相信你有能力处理自己的课题，所以我不干涉；我也相信自己有能力处理我的课题，所以我不需要你的认可。' },
          { type: 'quote', content: '"如果你想要自由，就要有被别人讨厌的勇气。"不是要你去招惹别人，而是要你放弃"让所有人都喜欢我"这个不可能的任务。' },
          { type: 'callout', content: '被讨厌的勇气不是叛逆，而是成熟——它意味着你不再把自己的价值建立在他人的评价之上，而是建立在自己的选择和行动之上。' },
        ],
      },
      {
        id: 'ch-cd-3', title: '第三章 · 共同体感觉', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '幸福的终极答案', level: 1 },
          { type: 'paragraph', content: '阿德勒认为，人的幸福感来源于"共同体感觉"——觉得自己在某个共同体中有归属感、有贡献。这个共同体可以小到一个家庭，大到整个人类。' },
          { type: 'key-insight', content: '阿德勒的幸福公式：自我接纳（接受不完美的自己）+ 他者信赖（无条件信任他人）+ 他者贡献（为他人做贡献）= 共同体感觉 = 幸福。注意"他者贡献"不是自我牺牲——你是因为贡献本身让你快乐，而不是为了得到回报。' },
          { type: 'paragraph', content: '这本书的哲学可以归结为一句话：人生的意义不是被赋予的，而是你自己赋予的。你选择什么样的叙事、什么样的目的、什么样的贡献方式——这些选择的总和，就是你的人生。' },
          { type: 'callout', content: '《被讨厌的勇气》最深远的影响：它不是告诉你如何成功，而是告诉你如何在平凡中找到自由和幸福。不需要改变世界，不需要所有人认可——你只需要做好自己的课题，为你所在的共同体做出贡献。' },
        ],
      },
    ],
  },

  // ─── 5. 三体 ───────────────────────────────────────────
  {
    id: 'book-three-body',
    title: '三体',
    author: '刘慈欣',
    category: '科幻',
    description: '中国科幻文学的巅峰之作，宇宙尺度的文明博弈与黑暗森林法则',
    score: 9.4,
    scene: {
      sceneType: 'abstract',
      sceneConfig: JSON.stringify({
        description: '深空中三颗恒星的混沌运动，文明的微光在黑暗中闪烁',
        config: {
          palette: ['#000000', '#0D1B2A', '#1B263B', '#E63946', '#F1FAEE'],
          elements: ['stars', 'orbits', 'particles', 'nebula'],
          mood: 'cosmic',
          timeOfDay: 'night',
        },
      }),
    },
    chapters: [
      {
        id: 'ch-tb-1', title: '第一章 · 三体问题', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '当文明被物理法则诅咒', level: 1 },
          { type: 'paragraph', content: '三体文明的悲剧根源于一个数学问题：三个天体在引力作用下的运动是不可预测的。三体星系的三颗太阳以混沌方式运动，导致行星表面的气候在"恒纪元"和"乱纪元"之间随机切换。' },
          { type: 'key-insight', content: '刘慈欣的天才之处在于：他把一个纯粹的数学问题（三体问题无解析解）转化为一个文明的生存困境——一个无法预测自己星球明天是否会被烤焦或冻死的文明，会发展出怎样的文化和价值观？答案是：极端的集体主义、对个体的漠视、以及不惜一切代价寻找新家园的决心。' },
          { type: 'paragraph', content: '三体文明在两百次毁灭与重生中发展出了独特的能力：脱水（将个体干燥保存以度过乱纪元）和思维透明（三体人无法说谎，因为思维直接暴露）。这种"无谎言"的设定，为后续地球人与三体人的博弈埋下了关键伏笔。' },
          { type: 'callout', content: '三体问题不仅是物理学概念，更是一个隐喻：当命运本身是混沌和不可预测的，文明应该如何应对？刘慈欣给出的答案冰冷而深刻。' },
        ],
      },
      {
        id: 'ch-tb-2', title: '第二章 · 黑暗森林法则', readingTimeMin: 4,
        blocks: [
          { type: 'heading', content: '宇宙社会学的两条公理', level: 1 },
          { type: 'paragraph', content: '"黑暗森林法则"是《三体》最具影响力的思想实验。罗辑在面壁计划中推导出了宇宙文明的生存法则，仅用两条公理和两个概念就构建了整个宇宙社会学。' },
          { type: 'key-insight', content: '两条公理：①生存是文明的第一需要；②文明不断增长和扩张，但宇宙中的物质总量不变。两个概念：①猜疑链（你无法确定对方是否善意，对方也无法确定你是否善意，无限递推）；②技术爆炸（一个落后文明可能在短时间内超越你）。推论：发现任何其他文明，最安全的策略是立即摧毁。' },
          { type: 'quote', content: '宇宙就是一座黑暗森林，每个文明都是带枪的猎人。他必须小心，因为林中到处都有与他一样的猎人。如果他发现了别的生命，能做的只有一件事：开枪消灭之。' },
          { type: 'paragraph', content: '这个法则之所以震撼，是因为它不依赖于"外星人是邪恶的"这个假设——即使所有文明都是善意的，猜疑链和技术爆炸的存在仍然会导致同样的结论。这是一个纯逻辑推导的悲剧。' },
          { type: 'callout', content: '黑暗森林法则超越了科幻的范畴，它本质上是一个博弈论问题：在信息不完全、后果不可逆的条件下，理性主体会如何选择？这个问题在国际关系、商业竞争中同样存在。' },
        ],
      },
      {
        id: 'ch-tb-3', title: '第三章 · 降维打击', readingTimeMin: 3,
        blocks: [
          { type: 'heading', content: '当维度成为武器', level: 1 },
          { type: 'paragraph', content: '"降维打击"已经成为日常用语，但它的原始含义远比商业比喻更加恐怖：高维文明使用"二向箔"，将整个太阳系从三维压缩成二维——所有的星球、飞船、生命，都变成了一幅无限薄的画。' },
          { type: 'key-insight', content: '降维打击的深层含义：真正的文明差距不是"你有核弹我有弓箭"的量级差异，而是"我能改变你存在的物理法则"的维度差异。你甚至无法理解攻击是如何发生的，就像一个二维生物无法理解"高度"这个概念。' },
          { type: 'paragraph', content: '更绝望的是"安全声明"——有些文明为了在黑暗森林中生存，主动将自己降维，向宇宙宣告"我已经不构成威胁"。这是一种文明层面的自残，换取生存权。' },
          { type: 'callout', content: '《三体》最终的哲学追问：面对一个冷酷的宇宙，是选择"生存至上"还是"保持文明的尊严"？程心两次在关键时刻选择了人性和爱，两次导致了灾难性后果——但刘慈欣留给读者的问题是：她真的错了吗？' },
        ],
      },
    ],
  },
];

async function main() {
  console.log('开始填充5本新书...\n');

  for (const book of books) {
    // 创建或更新书籍元数据
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

    // 创建或更新内容
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

    // 创建或更新场景
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

/**
 * 新增《当我们不再理解世界》
 * 运行: npx tsx scripts/seed-labatut.ts
 */
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const url = process.env.DATABASE_URL || 'file:./dev.db';
const authToken = process.env.DATABASE_AUTH_TOKEN;
const adapter = new PrismaLibSql({ url, ...(authToken ? { authToken } : {}) });
const prisma = new PrismaClient({ adapter });

const book = {
  id: 'book-when-we-cease',
  title: '当我们不再理解世界',
  author: '[智利] 本哈明·拉巴图特',
  category: '文学',
  description: '一部游走于虚构与非虚构之间的奇书，讲述那些触碰知识边界的科学家们如何坠入疯狂与黑暗——当人类的理解力抵达极限，世界开始变得不可理解',
  score: 9.1,
  scene: {
    sceneType: 'abstract',
    sceneConfig: JSON.stringify({
      description: '深邃的宇宙虚空中，数学方程像闪电一样划过，光与暗的边界在颤动',
      config: {
        palette: ['#0A0A1A', '#1A1A3E', '#2E1A4A', '#6B3FA0', '#E8E8F0'],
        elements: ['equations', 'void', 'lightning', 'particles'],
        mood: 'uncanny',
        timeOfDay: 'night',
      },
    }),
  },
  chapters: [
    {
      id: 'ch-wwc-1',
      title: '第一章 · 普鲁士蓝',
      readingTimeMin: 5,
      blocks: [
        { type: 'heading', content: '一种颜色的两面——从颜料到毒气', level: 1 },
        { type: 'paragraph', content: '拉巴图特以一种颜色开篇：普鲁士蓝。1706年，柏林的染料制造商迪斯巴赫意外合成了这种史上第一种人造蓝色颜料。它美得令人窒息，迅速征服了欧洲画坛——葛饰北斋的《神奈川冲浪里》那标志性的蓝色浪花，用的就是普鲁士蓝。但这种蓝色有一个可怕的亲属：氰化物。' },
        { type: 'key-insight', content: '拉巴图特从一开始就在暗示全书的核心命题：美与毁灭、创造与灾难之间的距离，远比我们想象的要近。每一次人类智识的飞跃——从合成颜料到核裂变——都同时打开了通往天堂和地狱的门。普鲁士蓝是全书的隐喻：同一种化学结构，既能创造世界上最美的蓝色，也能制造最致命的毒气。' },
        { type: 'paragraph', content: '弗里茨·哈伯是这个故事最令人不安的主角。他发明了从空气中固定氮的方法（哈伯-博施法），让人类不再受限于天然肥料，养活了数十亿人口——这可能是20世纪最重要的发明。但同一个人，也是化学武器之父：他在第一次世界大战中主持了氯气攻击，亲眼看着数千名士兵在战壕中窒息而死。' },
        { type: 'quote', content: '"在和平时期，科学家属于世界；在战争时期，科学家属于他的国家。"——弗里茨·哈伯' },
        { type: 'paragraph', content: '哈伯的妻子克拉拉·伊梅瓦尔——本身也是化学博士——在得知丈夫主持了伊普尔毒气攻击后，用哈伯的军用手枪自杀了。哈伯在第二天一早便奔赴东线，继续他的毒气战争。拉巴图特用近乎冷酷的精确记录了这个细节，不做评判，让事实本身产生令人窒息的道德重量。' },
        { type: 'callout', content: '拉巴图特的叙事策略：他不是在写科学史，而是在写"知识的恐怖"。每个章节都在追问同一个问题——当人类的理解力深入到现实的某个层面时，那里等待他们的不是启蒙，而是某种深渊。' },
      ],
    },
    {
      id: 'ch-wwc-2',
      title: '第二章 · 施瓦西的奇点',
      readingTimeMin: 5,
      blocks: [
        { type: 'heading', content: '在战壕中发现黑洞', level: 1 },
        { type: 'paragraph', content: '1915年末，卡尔·施瓦西正在第一次世界大战的俄国前线服役。他一边计算炮弹弹道，一边阅读爱因斯坦刚刚发表的广义相对论。在战壕的泥泞和炮火中，他找到了爱因斯坦场方程的第一个精确解——施瓦西度规。这个解描述了一个质量足够大的天体周围时空的弯曲方式。' },
        { type: 'key-insight', content: '施瓦西的解中隐藏着一个令所有人不安的东西：当质量被压缩到足够小的半径（后来被称为"施瓦西半径"）时，时空曲率变得无穷大——一个奇点，物理定律在此崩溃。爱因斯坦本人认为这是数学上的怪癖，不可能在现实中出现。他错了。这就是我们今天所说的黑洞。' },
        { type: 'paragraph', content: '施瓦西在寄出他的论文几个月后就死在了前线——不是死于敌人的子弹，而是死于一种罕见的自身免疫性疾病，天疱疮。他的皮肤从内部开始溃烂。拉巴图特在这里创造了一个令人战栗的平行：施瓦西发现了宇宙中的一个"伤口"——一个时空自身溃烂的地方——而他自己的身体也在以同样的方式从内部瓦解。' },
        { type: 'paragraph', content: '拉巴图特追问：施瓦西是否在战争的极端环境中获得了某种超越常规的洞察力？当你每天面对死亡时，你是否更容易看穿现实的表象，直视它底层那令人恐惧的数学结构？这不是科学问题，而是存在性的问题——知识是否有一个人类不应该跨过的边界？' },
        { type: 'quote', content: '施瓦西在信中写道："战争对待我很友善，尽管炮弹的咆啸足够近，让我可以把这场战争中最核心的数学问题解决掉。"' },
        { type: 'callout', content: '黑洞从数学怪癖到被证实真实存在，花了一个世纪。2019年事件视界望远镜拍下了第一张黑洞照片。施瓦西在泥泞战壕中写下的方程，描述的竟是宇宙中最极端的真实。' },
      ],
    },
    {
      id: 'ch-wwc-3',
      title: '第三章 · 海森堡的不确定性',
      readingTimeMin: 5,
      blocks: [
        { type: 'heading', content: '量子力学——理解力的终结', level: 1 },
        { type: 'paragraph', content: '维尔纳·海森堡在1925年提出了矩阵力学，随后又发现了不确定性原理：你不可能同时精确测量一个粒子的位置和动量。这不是技术上的限制，而是自然本身的属性。在最微观的层面上，世界不是确定的——它是概率性的、模糊的、本质上不可完全知晓的。' },
        { type: 'key-insight', content: '拉巴图特在这里触及了全书最核心的恐惧：如果物理学告诉我们，在最基本的层面上，现实是不可理解的呢？不是"尚未被理解"，而是"原则上不可理解"——就像你永远无法同时看到一枚硬币的正反面。不确定性原理不是说我们的仪器不够好，而是说确定性本身在量子世界中不存在。' },
        { type: 'paragraph', content: '海森堡的发现让同时代最伟大的头脑产生了深刻的分裂。薛定谔讨厌矩阵力学，认为它丑陋到"令人反胃"。爱因斯坦说出了那句著名的"上帝不会掷骰子"。玻尔反驳道："不要告诉上帝应该怎么做。"这场争论持续了几十年，至今没有真正结束。' },
        { type: 'paragraph', content: '但拉巴图特关心的不是物理争论本身，而是它对海森堡这个人的影响。一个天才少年如何在发现了自然的终极秘密后迷失了方向？海森堡后来留在纳粹德国参与了原子弹项目——尽管他后来声称自己暗中破坏了这个项目，但历史证据并不支持这个说法。' },
        { type: 'quote', content: '"我记得与玻尔讨论到很晚的那些夜晚，讨论结束后我独自在附近的公园里散步，一遍又一遍地问自己同一个问题：自然真的可以像原子实验中表现的那样荒谬吗？"——海森堡' },
        { type: 'callout', content: '拉巴图特暗示的问题：量子力学的创立者们——海森堡、薛定谔、玻尔——他们理解自己发现的东西吗？费曼后来说："如果你认为你理解了量子力学，那你就没有理解量子力学。"如果连创造者都无法理解，那"理解"这个词本身是否需要被重新定义？' },
      ],
    },
    {
      id: 'ch-wwc-4',
      title: '第四章 · 格罗滕迪克的出走',
      readingTimeMin: 5,
      blocks: [
        { type: 'heading', content: '数学天才的自我放逐', level: 1 },
        { type: 'paragraph', content: '亚历山大·格罗滕迪克是20世纪最伟大的数学家之一，也是最神秘的。他在代数几何领域的工作——概形理论、上同调理论、拓扑斯理论——彻底重塑了现代数学的基础。菲尔兹奖得主皮埃尔·德利涅说格罗滕迪克拥有一种"近乎超自然的"数学直觉。' },
        { type: 'key-insight', content: '格罗滕迪克的方法与其他数学家截然不同：他不是解决具体问题，而是不断扩大数学的定义本身，直到问题在更广阔的框架中自动消解。他把这比喻为"让海水上涨来淹没障碍"，而不是用锤子敲开坚果。这种方法让他看到了其他人看不到的联系，但也让他越来越远离人类直觉所能把握的范围。' },
        { type: 'paragraph', content: '1970年，在声望的顶峰，格罗滕迪克突然离开了学术界。他搬到了法国南部比利牛斯山脚下的一个小村庄，过起了隐居生活。他烧毁了大量手稿，拒绝发表新论文，切断了几乎所有的社会联系。他开始对生态运动、佛教和神秘主义产生兴趣，认为数学已经被军事-工业复合体所腐蚀。' },
        { type: 'paragraph', content: '拉巴图特将格罗滕迪克的出走描绘为一种不可避免的结局：当一个人的思维深入到抽象的极致——当数学变成了一种不再与人类经验有任何对应物的纯粹形式——他也就失去了与人类世界的联系。格罗滕迪克不是"疯了"，而是他到达了一个思维的高度，在那里，回到日常世界变得不再可能。' },
        { type: 'quote', content: '格罗滕迪克写道："发现的激情能够把一个人完全吞噬，就像烈火吞噬一切可燃物一样——最终只剩下灰烬。"' },
        { type: 'callout', content: '格罗滕迪克于2014年在隐居中去世，留下了数万页未发表的手稿。他的故事是全书最动人的隐喻：知识的追求到了极致，是否必然导向孤独和疯狂？人类心智是否有一个内建的极限——超过这个极限，理解本身就变成了它的反面？' },
      ],
    },
    {
      id: 'ch-wwc-5',
      title: '第五章 · 不可理解的世界',
      readingTimeMin: 4,
      blocks: [
        { type: 'heading', content: '当知识的光芒变成黑暗', level: 1 },
        { type: 'paragraph', content: '拉巴图特在全书的最后将所有线索编织在一起。从普鲁士蓝的双重面孔，到施瓦西在战壕中发现的时空黑洞，到海森堡的不确定性原理，到格罗滕迪克的自我放逐——所有故事都指向同一个结论：人类的理解力有一个边界，而这个边界不是可以通过更多的研究和更好的仪器来克服的。' },
        { type: 'key-insight', content: '这本书最深刻的洞见不在于任何一个具体的科学发现，而在于它揭示的一种模式：在知识的最前沿，创造与毁灭、理性与疯狂、美与恐怖之间的界线开始消融。哈伯养活了世界也毒杀了世界，施瓦西发现了美丽的数学也发现了时空的裂缝，海森堡揭示了自然的法则也揭示了自然的不可知性，格罗滕迪克登上了思维的巅峰也跌入了孤独的深渊。' },
        { type: 'paragraph', content: '拉巴图特最精妙的叙事手法是他对"真实"与"虚构"边界的模糊处理。书中的每一个故事都基于真实的历史事件和人物，但他自由地在事实中编织想象，在文献记录的缝隙中填入虚构的情感和场景。读者永远无法确定哪些是史实，哪些是作者的创造——而这恰恰呼应了全书的主题：在知识的边界上，确定性消失了。' },
        { type: 'paragraph', content: '这本书仅176页，但它的密度和深度远超许多大部头。拉巴图特用诗一般的语言写科学，用小说家的直觉写历史，创造了一种独特的文体——"非虚构小说"或"思辨文学"。它提醒我们：世界不是一本等待人类阅读的书，它有自己的秘密，而有些秘密可能不适合人类知道。' },
        { type: 'callout', content: '《当我们不再理解世界》的终极追问：启蒙运动以来，人类一直相信"知识就是力量"，理解世界是人类的使命和权利。但如果在知识的尽头等待我们的不是光明，而是一种更深的黑暗呢？这本书不提供答案——它的价值恰恰在于让你不舒服地坐在这个问题里，无处可逃。' },
      ],
    },
  ],
};

async function main() {
  console.log('新增《当我们不再理解世界》...\n');

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
  const summaryData = {
    chaptersJson: JSON.stringify(book.chapters),
    contentType: 'deep-analysis',
    readingTime: book.chapters.reduce((s, c) => s + c.readingTimeMin, 0),
  };
  if (existing) {
    await prisma.bookSummary.update({ where: { id: existing.id }, data: summaryData });
  } else {
    await prisma.bookSummary.create({
      data: { bookId: book.id, pagesJson: '[]', themeJson: '{}', ...summaryData },
    });
  }

  await prisma.bookScene.upsert({
    where: { bookId: book.id },
    update: book.scene,
    create: { bookId: book.id, ...book.scene },
  });

  console.log(`✓ ${book.title} — ${book.chapters.length}章, ${book.chapters.reduce((s, c) => s + c.readingTimeMin, 0)}分钟`);
  console.log('\n完成！');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

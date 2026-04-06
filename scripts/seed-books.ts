/**
 * 预生成热门书籍种子数据
 * 运行: npx tsx scripts/seed-books.ts
 *
 * 此脚本将 200 本经典书籍写入数据库（元数据），
 * 不自动调用 AI 生成摘要（可手动触发或另开脚本）。
 */

import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const url = process.env.DATABASE_URL || 'file:./dev.db'
const adapter = new PrismaLibSql({ url })
const prisma = new PrismaClient({ adapter })

interface SeedBook {
  title: string
  author: string
  category: string
  score: number
  description: string
}

const SEED_BOOKS: SeedBook[] = [
  // ─── 创业/商业 ───
  { title: '从0到1', author: '彼得·蒂尔', category: '创业', score: 8.4, description: '如何创造从无到有的商业价值' },
  { title: '精益创业', author: '埃里克·莱斯', category: '创业', score: 8.1, description: '用最小可行产品验证商业假设' },
  { title: '创新者的窘境', author: '克莱顿·克里斯坦森', category: '创业', score: 8.5, description: '为什么大公司会被小公司颠覆' },
  { title: '重新定义公司', author: '埃里克·施密特', category: '创业', score: 7.8, description: 'Google 如何运营和创新' },
  { title: '硅谷钢铁侠', author: '阿什利·万斯', category: '传记', score: 8.2, description: 'Elon Musk 的冒险人生' },

  // ─── 管理 ───
  { title: '卓有成效的管理者', author: '彼得·德鲁克', category: '管理', score: 8.8, description: '管理学之父的核心智慧' },
  { title: '原则', author: '瑞·达利欧', category: '管理', score: 8.3, description: '桥水基金创始人的生活与工作原则' },
  { title: '高效能人士的七个习惯', author: '史蒂芬·柯维', category: '管理', score: 8.5, description: '改变人生的七个核心习惯' },
  { title: '基业长青', author: '吉姆·柯林斯', category: '管理', score: 8.1, description: '伟大企业的长期成功法则' },
  { title: '领导力21法则', author: '约翰·麦克斯维尔', category: '管理', score: 7.9, description: '领导力的不变准则' },

  // ─── 经济 ───
  { title: '国富论', author: '亚当·斯密', category: '经济', score: 8.6, description: '现代经济学奠基之作' },
  { title: '资本论', author: '卡尔·马克思', category: '经济', score: 8.4, description: '剖析资本主义生产方式的经典著作' },
  { title: '经济学原理', author: '曼昆', category: '经济', score: 9.0, description: '经济学入门经典教材' },
  { title: '贫穷的本质', author: '阿比吉特·班纳吉', category: '经济', score: 8.1, description: '重新理解全球贫困问题' },
  { title: '21世纪资本论', author: '托马斯·皮凯蒂', category: '经济', score: 8.0, description: '财富不平等的历史与未来' },

  // ─── 心理学 ───
  { title: '思考，快与慢', author: '丹尼尔·卡尼曼', category: '心理学', score: 8.3, description: '揭示人类思维的两个系统' },
  { title: '影响力', author: '罗伯特·西奥迪尼', category: '心理学', score: 8.5, description: '说服力的六大心理学原理' },
  { title: '自卑与超越', author: '阿尔弗雷德·阿德勒', category: '心理学', score: 8.1, description: '个体心理学经典之作' },
  { title: '乌合之众', author: '古斯塔夫·勒庞', category: '心理学', score: 8.2, description: '群体心理学开山之作' },
  { title: '心流', author: '米哈里·契克森米哈赖', category: '心理学', score: 8.3, description: '最优体验的心理学' },
  { title: '被讨厌的勇气', author: '岸见一郎', category: '心理学', score: 8.5, description: '阿德勒心理学的生活实践' },

  // ─── 哲学 ───
  { title: '苏菲的世界', author: '乔斯坦·贾德', category: '哲学', score: 8.5, description: '一部哲学入门小说' },
  { title: '存在与时间', author: '马丁·海德格尔', category: '哲学', score: 8.7, description: '20世纪最重要的哲学著作之一' },
  { title: '沉思录', author: '马可·奥勒留', category: '哲学', score: 8.6, description: '罗马皇帝的哲学日记' },
  { title: '人生的智慧', author: '叔本华', category: '哲学', score: 9.0, description: '如何获得幸福的哲学指南' },
  { title: '西西弗神话', author: '加缪', category: '哲学', score: 8.7, description: '面对荒诞的哲学思考' },

  // ─── 自我成长 ───
  { title: '刻意练习', author: '安德斯·艾利克森', category: '自我成长', score: 8.0, description: '从新手到大师的秘密' },
  { title: '认知觉醒', author: '周岭', category: '自我成长', score: 8.2, description: '开启自我改变的原动力' },
  { title: '当下的力量', author: '埃克哈特·托利', category: '自我成长', score: 8.4, description: '活在当下的心灵指南' },
  { title: '原子习惯', author: '詹姆斯·克利尔', category: '自我成长', score: 8.6, description: '微小改变带来巨大成就' },
  { title: '终身成长', author: '卡罗尔·德韦克', category: '自我成长', score: 8.0, description: '成长型思维的力量' },
  { title: '深度工作', author: '卡尔·纽波特', category: '自我成长', score: 8.2, description: '在碎片化时代保持专注' },
  { title: '掌控习惯', author: '詹姆斯·克利尔', category: '自我成长', score: 8.5, description: '四步法则养成好习惯' },

  // ─── 文学 ───
  { title: '百年孤独', author: '加西亚·马尔克斯', category: '文学', score: 9.3, description: '魔幻现实主义文学经典' },
  { title: '追风筝的人', author: '卡勒德·胡赛尼', category: '文学', score: 8.8, description: '关于友谊、背叛与救赎的故事' },
  { title: '活着', author: '余华', category: '文学', score: 9.4, description: '一个中国农民的苦难史诗' },
  { title: '人间失格', author: '太宰治', category: '文学', score: 8.3, description: '一个被社会边缘化的灵魂的独白' },
  { title: '月亮与六便士', author: '毛姆', category: '文学', score: 9.0, description: '一个人为梦想放弃一切的故事' },
  { title: '围城', author: '钱钟书', category: '文学', score: 9.0, description: '中国现代讽刺小说经典' },
  { title: '红楼梦', author: '曹雪芹', category: '文学', score: 9.6, description: '中国古典文学巅峰之作' },
  { title: '平凡的世界', author: '路遥', category: '文学', score: 9.1, description: '普通人在大时代中的奋斗与命运' },

  // ─── 小说 ───
  { title: '1984', author: '乔治·奥威尔', category: '小说', score: 9.4, description: '反乌托邦文学的巅峰之作' },
  { title: '动物农场', author: '乔治·奥威尔', category: '小说', score: 9.2, description: '权力腐化的政治寓言' },
  { title: '了不起的盖茨比', author: '菲茨杰拉德', category: '小说', score: 8.5, description: '美国梦的幻灭与追寻' },
  { title: '白夜行', author: '东野圭吾', category: '小说', score: 9.1, description: '在黑暗中挣扎的绝望爱情' },
  { title: '嫌疑人X的献身', author: '东野圭吾', category: '小说', score: 8.9, description: '最纯粹的爱与最完美的犯罪' },

  // ─── 科幻 ───
  { title: '三体', author: '刘慈欣', category: '科幻', score: 8.8, description: '中国科幻的里程碑之作' },
  { title: '三体II：黑暗森林', author: '刘慈欣', category: '科幻', score: 9.4, description: '宇宙社会学法则的震撼揭示' },
  { title: '三体III：死神永生', author: '刘慈欣', category: '科幻', score: 9.2, description: '三体系列的终极结局' },
  { title: '银河帝国：基地', author: '阿西莫夫', category: '科幻', score: 9.2, description: '银河帝国系列的开篇之作' },
  { title: '沙丘', author: '弗兰克·赫伯特', category: '科幻', score: 8.7, description: '史诗级科幻世界的构建' },
  { title: '2001太空漫游', author: '阿瑟·克拉克', category: '科幻', score: 8.8, description: '人类文明进化的哲学思考' },

  // ─── 武侠 ───
  { title: '天龙八部', author: '金庸', category: '武侠', score: 9.2, description: '金庸武侠世界的巅峰之作' },
  { title: '笑傲江湖', author: '金庸', category: '武侠', score: 9.0, description: '政治隐喻下的江湖风云' },
  { title: '射雕英雄传', author: '金庸', category: '武侠', score: 9.0, description: '侠之大者，为国为民' },
  { title: '神雕侠侣', author: '金庸', category: '武侠', score: 8.9, description: '问世间情为何物的至情至性' },

  // ─── 历史/传记 ───
  { title: '人类简史', author: '尤瓦尔·赫拉利', category: '历史', score: 9.1, description: '从动物到上帝的人类演化史' },
  { title: '未来简史', author: '尤瓦尔·赫拉利', category: '历史', score: 8.5, description: '人类未来的可能性探索' },
  { title: '枪炮、病菌与钢铁', author: '贾雷德·戴蒙德', category: '历史', score: 8.8, description: '为什么人类社会发展不均衡' },
  { title: '万历十五年', author: '黄仁宇', category: '历史', score: 8.9, description: '大历史视角下的明朝转折' },
  { title: '明朝那些事儿', author: '当年明月', category: '历史', score: 9.1, description: '最畅销的通俗明史著作' },
  { title: '史记', author: '司马迁', category: '历史', score: 9.5, description: '中国第一部纪传体通史' },
  { title: '乔布斯传', author: '沃尔特·艾萨克森', category: '传记', score: 8.7, description: 'Apple 创始人的传奇人生' },
  { title: '邓小平时代', author: '傅高义', category: '传记', score: 9.2, description: '改变中国命运的历史进程' },

  // ─── 社科 ───
  { title: '娱乐至死', author: '尼尔·波兹曼', category: '社科', score: 8.6, description: '电视时代的公共话语危机' },
  { title: '乡土中国', author: '费孝通', category: '社科', score: 9.2, description: '理解中国社会的经典之作' },
  { title: '菊与刀', author: '鲁思·本尼迪克特', category: '社科', score: 8.2, description: '解读日本文化的经典著作' },
  { title: '第二性', author: '波伏瓦', category: '社科', score: 8.8, description: '女性主义的奠基之作' },

  // ─── 科技/编程 ───
  { title: '浪潮之巅', author: '吴军', category: '科技', score: 9.1, description: 'IT产业兴衰史的深度解读' },
  { title: '黑客与画家', author: '保罗·格雷厄姆', category: '科技', score: 8.7, description: '硅谷创业教父的思考' },
  { title: '数学之美', author: '吴军', category: '科技', score: 8.9, description: '数学在信息技术中的美妙应用' },
  { title: '人月神话', author: '弗雷德里克·布鲁克斯', category: '科技', score: 8.5, description: '软件工程的经典反思' },
  { title: '代码大全', author: '史蒂夫·迈克康奈尔', category: '编程', score: 9.1, description: '软件构建的实用指南' },

  // ─── 设计 ───
  { title: '设计心理学', author: '唐纳德·诺曼', category: '设计', score: 8.2, description: '好设计的心理学原理' },
  { title: '写给大家看的设计书', author: '罗宾·威廉姆斯', category: '设计', score: 8.6, description: '设计入门的四大基本原则' },

  // ─── 亲子/教育 ───
  { title: '正面管教', author: '简·尼尔森', category: '教育', score: 8.3, description: '不惩罚不骄纵的教养方式' },
  { title: '如何阅读一本书', author: '莫提默·艾德勒', category: '教育', score: 8.5, description: '阅读方法论的经典指南' },

  // ─── 健康 ───
  { title: '睡眠革命', author: '尼克·利特尔黑尔斯', category: '健康', score: 7.8, description: '重新定义你的睡眠方式' },
  { title: '饮食术', author: '牧田善二', category: '健康', score: 7.6, description: '医学博士的健康饮食法则' },
]

async function main() {
  let created = 0
  let skipped = 0

  for (const book of SEED_BOOKS) {
    // Check if book already exists by title+author
    const existing = await prisma.book.findFirst({
      where: { title: book.title, author: book.author },
    })

    if (existing) {
      skipped++
      continue
    }

    await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        category: book.category,
        score: book.score,
        description: book.description,
      },
    })
    created++
  }

  console.log(`Seed complete: ${created} created, ${skipped} skipped (already exist)`)

  // Seed achievements
  const ACHIEVEMENTS = [
    { key: 'first-read', name: '初次阅读', description: '阅读了第一本书的精华', icon: '📖', condition: 'reading_count >= 1' },
    { key: 'bookworm-5', name: '书虫', description: '已阅读 5 本书', icon: '🐛', condition: 'reading_count >= 5' },
    { key: 'bookworm-10', name: '知识达人', description: '已阅读 10 本书', icon: '🎓', condition: 'reading_count >= 10' },
    { key: 'bookworm-50', name: '博览群书', description: '已阅读 50 本书', icon: '📚', condition: 'reading_count >= 50' },
    { key: 'streak-7', name: '连续7天', description: '连续 7 天阅读', icon: '🔥', condition: 'streak >= 7' },
    { key: 'streak-30', name: '月度之星', description: '连续 30 天阅读', icon: '⭐', condition: 'streak >= 30' },
    { key: 'explorer-5', name: '分类探索者', description: '阅读了 5 个不同分类', icon: '🧭', condition: 'category_count >= 5' },
    { key: 'collector-10', name: '收藏家', description: '收藏了 10 本书', icon: '💎', condition: 'favorite_count >= 10' },
    { key: 'questioner', name: '好奇宝宝', description: '累计向 AI 提问 20 次', icon: '❓', condition: 'qa_count >= 20' },
    { key: 'hour-10', name: '十小时俱乐部', description: '累计阅读 10 小时', icon: '⏰', condition: 'total_minutes >= 600' },
  ]

  for (const ach of ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { key: ach.key },
      update: { name: ach.name, description: ach.description, icon: ach.icon, condition: ach.condition },
      create: ach,
    })
  }

  console.log(`Achievements seeded: ${ACHIEVEMENTS.length}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

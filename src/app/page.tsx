import { prisma } from '@/lib/db';
import AnimatedHome from '@/components/home/AnimatedHome';

export const revalidate = 60;

export default async function Home() {
  const [featuredBooks, latestBooks, totalStats] = await Promise.all([
    prisma.book.findMany({
      where: { score: { gte: 8.5 } },
      orderBy: { score: 'desc' },
      take: 6,
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        score: true,
        description: true,
      },
    }),
    prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
      take: 12,
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        score: true,
        description: true,
      },
    }),
    Promise.all([
      prisma.book.count(),
      prisma.user.count(),
      prisma.readingHistory.count(),
    ]),
  ]);

  const [bookCount, userCount, readCount] = totalStats;

  return (
    <AnimatedHome
      featuredBooks={featuredBooks}
      latestBooks={latestBooks}
      bookCount={bookCount}
      userCount={userCount}
      readCount={readCount}
    />
  );
}

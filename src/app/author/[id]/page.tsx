import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Author ${id} - Read Is Big`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { id } = await params;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">
        作者页 — 即将重构
      </h1>
      <p className="mt-2 text-sm text-[var(--text-tertiary)]">ID: {id}</p>
      <Link
        href="/explore"
        className="mt-6 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        &larr; 返回探索
      </Link>
    </main>
  );
}

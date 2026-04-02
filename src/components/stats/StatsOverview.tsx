import Link from 'next/link';

interface StatsOverviewProps {
  totalMinutes: number;
  thisWeekMinutes: number;
  totalBooks: number;
  recentBooks: Array<{ id: string; title: string; lastRead: Date }>;
}

export default function StatsOverview({
  totalMinutes,
  thisWeekMinutes,
  totalBooks,
  recentBooks,
}: StatsOverviewProps) {
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMin = totalMinutes % 60;

  return (
    <div className="space-y-6">
      {/* 数据卡片 */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="累计阅读" value={totalHours > 0 ? `${totalHours}h ${remainingMin}m` : `${totalMinutes}m`} />
        <StatCard label="本周阅读" value={`${thisWeekMinutes}m`} />
        <StatCard label="读过书籍" value={`${totalBooks}`} />
      </div>

      {/* 最近阅读 */}
      <div>
        <h2 className="mb-3 text-sm font-medium text-[var(--text-secondary)]">最近阅读</h2>
        {recentBooks.length > 0 ? (
          <div className="space-y-2">
            {recentBooks.map((book) => (
              <Link
                key={book.id}
                href={`/book/${book.id}`}
                className="flex items-center justify-between rounded-lg bg-[var(--surface)] px-4 py-3 transition-shadow hover:shadow-sm"
              >
                <span className="text-sm text-[var(--text-primary)]">{book.title}</span>
                <span className="text-xs text-[var(--text-quaternary)]">
                  {formatRelativeDate(book.lastRead)}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-[var(--text-tertiary)]">
            还没有阅读记录
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[var(--surface)] p-4 text-center">
      <div className="text-xl font-bold text-[var(--text-primary)]">{value}</div>
      <div className="mt-1 text-[10px] text-[var(--text-quaternary)]">{label}</div>
    </div>
  );
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return '今天';
  if (days === 1) return '昨天';
  if (days < 7) return `${days}天前`;
  if (days < 30) return `${Math.floor(days / 7)}周前`;
  return `${Math.floor(days / 30)}月前`;
}

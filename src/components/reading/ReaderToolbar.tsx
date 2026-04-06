'use client';

import Link from 'next/link';

interface ReaderToolbarProps {
  bookTitle: string;
  bookId?: string;
  onSettingsClick: () => void;
  onQAClick?: () => void;
}

export default function ReaderToolbar({
  bookTitle,
  bookId,
  onSettingsClick,
  onQAClick,
}: ReaderToolbarProps) {
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/book/${bookId}`;
    const shareData = {
      title: `《${bookTitle}》- 15分钟读懂精华`,
      text: `我正在用 Read Is Big 阅读《${bookTitle}》的精华解读，15分钟读懂一本好书！`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareUrl}`);
      // TODO: show toast
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 md:px-6">
        {/* 返回 */}
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface)]/80 backdrop-blur-md text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          aria-label="返回首页"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </Link>

        {/* 书名 */}
        <span className="max-w-[40%] truncate text-sm font-medium text-[var(--text-tertiary)]">
          {bookTitle}
        </span>

        {/* 工具按钮 */}
        <div className="flex items-center gap-1">
          {/* 分享 */}
          {bookId && (
            <button
              onClick={handleShare}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface)]/80 backdrop-blur-md text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              aria-label="分享"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          )}

          {/* AI 问答 */}
          {onQAClick && (
            <button
              onClick={onQAClick}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface)]/80 backdrop-blur-md text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              aria-label="AI 问答"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          )}

          {/* 设置 */}
          <button
            onClick={onSettingsClick}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface)]/80 backdrop-blur-md text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            aria-label="阅读设置"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

interface ReadingProgressProps {
  progress: number; // 0-100
}

export default function ReadingProgress({ progress }: ReadingProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full bg-[var(--text-primary)] transition-[width] duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%`, opacity: 0.3 }}
      />
    </div>
  );
}

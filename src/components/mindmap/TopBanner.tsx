import type { BookTheme } from '@/lib/types';

interface TopBannerProps {
  title: string;
  theme: BookTheme;
}

export default function TopBanner({ title, theme }: TopBannerProps) {
  return (
    <div
      className="relative w-full overflow-hidden px-6 pt-18 pb-5 sm:px-10 sm:pt-20"
      style={{ backgroundColor: theme.bannerBg }}
    >
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
        }}
      />
      <h1
        className="relative text-xl font-bold tracking-wide md:text-2xl"
        style={{
          color: theme.bannerText,
          lineHeight: 1.4,
          letterSpacing: '0.02em',
          fontFamily: 'var(--font-serif)',
        }}
      >
        {title}
      </h1>
    </div>
  );
}

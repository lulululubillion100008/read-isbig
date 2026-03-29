import type { BookTheme } from '@/lib/types';

interface TopBannerProps {
  title: string;
  theme: BookTheme;
}

export default function TopBanner({ title, theme }: TopBannerProps) {
  return (
    <div
      className="w-full px-6 py-4"
      style={{ backgroundColor: theme.bannerBg }}
    >
      <h1
        className="text-xl font-bold tracking-wide md:text-2xl"
        style={{ color: theme.bannerText }}
      >
        {title}
      </h1>
    </div>
  );
}

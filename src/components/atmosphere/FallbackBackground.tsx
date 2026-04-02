'use client';

import type { BookScene } from '@/lib/types';

interface FallbackBackgroundProps {
  scene: BookScene;
}

export default function FallbackBackground({ scene }: FallbackBackgroundProps) {
  const { palette, mood } = scene.config;
  const [c1, c2, c3] = palette.length >= 3
    ? palette
    : ['#1D1D1F', '#2C3E50', '#34495E'];

  // 根据心境调整透明度和动画
  const opacity = mood === 'serene' ? 0.15 : mood === 'solemn' ? 0.2 : 0.12;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* 基础渐变 */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${c1}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, ${c2}${Math.round(opacity * 0.7 * 255).toString(16).padStart(2, '0')}, ${c3}${Math.round(opacity * 0.5 * 255).toString(16).padStart(2, '0')})`,
        }}
      />

      {/* 光晕效果 */}
      <div
        className="absolute -top-1/4 -right-1/4 h-[60%] w-[60%] rounded-full blur-[120px]"
        style={{ backgroundColor: c1, opacity: opacity * 0.6 }}
      />
      <div
        className="absolute -bottom-1/4 -left-1/4 h-[50%] w-[50%] rounded-full blur-[100px]"
        style={{ backgroundColor: c2, opacity: opacity * 0.4 }}
      />

      {/* 微动画光斑 */}
      <div
        className="absolute top-1/3 left-1/2 h-[30%] w-[30%] -translate-x-1/2 rounded-full blur-[80px] animate-[float-glow_8s_ease-in-out_infinite_alternate]"
        style={{
          backgroundColor: c3,
          opacity: opacity * 0.3,
        }}
      />
    </div>
  );
}

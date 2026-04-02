'use client';

import { useState, useEffect } from 'react';

export type DeviceTier = 'high' | 'medium' | 'low';

export function useDeviceCapability(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('medium');

  useEffect(() => {
    const detect = (): DeviceTier => {
      // 检查 WebGL 支持
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return 'low';
      } catch {
        return 'low';
      }

      // 检查硬件并发数
      const cores = navigator.hardwareConcurrency ?? 4;

      // 检查内存 (仅 Chrome)
      const nav = navigator as Navigator & { deviceMemory?: number };
      const memory = nav.deviceMemory ?? 4;

      // 检查是否移动端
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

      // 检查屏幕分辨率
      const pixelRatio = window.devicePixelRatio ?? 1;
      const pixels = window.innerWidth * window.innerHeight * pixelRatio;

      if (isMobile || cores <= 2 || memory <= 2) return 'low';
      if (cores >= 8 && memory >= 8 && pixels > 2000000) return 'high';
      return 'medium';
    };

    setTier(detect());
  }, []);

  return tier;
}

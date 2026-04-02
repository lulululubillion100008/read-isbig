'use client';

import { Suspense, lazy } from 'react';
import type { BookScene } from '@/lib/types';
import { useDeviceCapability } from './hooks/useDeviceCapability';
import FallbackBackground from './FallbackBackground';

const SceneManager = lazy(() => import('./SceneManager'));

const R3FCanvas = lazy(() =>
  import('@react-three/fiber').then((mod) => ({
    default: mod.Canvas,
  }))
);

interface AtmosphereCanvasProps {
  scene: BookScene;
}

export default function AtmosphereCanvas({ scene }: AtmosphereCanvasProps) {
  // useDeviceCapability 已包含 WebGL 检测，low 表示无 WebGL 或低端设备
  const deviceTier = useDeviceCapability();

  if (deviceTier === 'low') {
    return <FallbackBackground scene={scene} />;
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      <Suspense fallback={<FallbackBackground scene={scene} />}>
        <R3FCanvas
          dpr={deviceTier === 'high' ? [1, 2] : [1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 60 }}
          frameloop="always"
          style={{ position: 'absolute', inset: 0 }}
          gl={{ antialias: deviceTier === 'high', alpha: true }}
        >
          <SceneManager scene={scene} quality={deviceTier} />
        </R3FCanvas>
      </Suspense>
    </div>
  );
}

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type { PointLight as PointLightType, Points, BufferGeometry, NormalBufferAttributes } from 'three';

interface InteriorSceneProps {
  palette: string[];
  mood: string;
  quality: 'high' | 'medium' | 'low';
}

function FireplaceGlow({ color, intensity }: { color: string; intensity: number }) {
  const lightRef = useRef<PointLightType>(null);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    const t = clock.getElapsedTime();
    // 壁炉光线闪烁
    lightRef.current.intensity = intensity + Math.sin(t * 3) * 0.15 + Math.sin(t * 7) * 0.05;
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, -0.5, -3]}
      color={color}
      intensity={intensity}
      distance={10}
      decay={2}
    />
  );
}

function DustMotes({ count, color }: { count: number; color: string }) {
  const ref = useRef<Points<BufferGeometry<NormalBufferAttributes>>>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = Math.random() * 4 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const positions = ref.current.geometry.attributes.position;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const y = positions.getY(i);
      positions.setY(i, y + Math.sin(t + i) * 0.001);
      positions.setX(i, positions.getX(i) + Math.cos(t * 0.5 + i * 0.3) * 0.0005);
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color={color}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export default function InteriorScene({ palette, mood, quality }: InteriorSceneProps) {
  const c1 = palette[0] ?? '#8b4513';
  const c2 = palette[1] ?? c1;
  const c3 = palette[2] ?? c2;
  const dustCount = quality === 'high' ? 300 : quality === 'medium' ? 120 : 50;
  const fireIntensity = mood === 'solemn' ? 1.2 : 0.8;

  return (
    <>
      {/* 深色环境光 */}
      <ambientLight intensity={0.08} color="#1a1a2e" />

      {/* 壁炉暖光 */}
      <FireplaceGlow color={c1} intensity={fireIntensity} />

      {/* 侧面微弱补光 */}
      <pointLight position={[3, 2, 0]} color={c2} intensity={0.15} distance={8} decay={2} />

      {/* 尘埃微粒 */}
      <DustMotes count={dustCount} color={c3 ?? c2} />

      {/* 书架轮廓（几何体暗示） */}
      {quality !== 'low' && (
        <group position={[-3, 0, -4]}>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} position={[0, i * 0.8 - 1, 0]}>
              <boxGeometry args={[2, 0.05, 0.6]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
            </mesh>
          ))}
        </group>
      )}
    </>
  );
}

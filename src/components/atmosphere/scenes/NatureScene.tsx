'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Cloud } from '@react-three/drei';
import type { Points, BufferGeometry, NormalBufferAttributes } from 'three';
import * as THREE from 'three';

interface NatureSceneProps {
  palette: string[];
  mood: string;
  timeOfDay: string;
  quality: 'high' | 'medium' | 'low';
}

function Particles({ count, color, spread, speed }: {
  count: number;
  color: string;
  spread: number;
  speed: number;
}) {
  const ref = useRef<Points<BufferGeometry<NormalBufferAttributes>>>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;
    }
    return pos;
  }, [count, spread]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * speed * 0.1;
    ref.current.rotation.x += delta * speed * 0.05;
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
        size={0.02}
        color={color}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function WaterPlane({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = -1.5 + Math.sin(t * 0.3) * 0.05;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function NatureScene({ palette, mood, timeOfDay, quality }: NatureSceneProps) {
  const c1 = palette[0] ?? '#2d4a3e';
  const c2 = palette[1] ?? c1;
  const c3 = palette[2] ?? c2;
  const particleCount = quality === 'high' ? 500 : quality === 'medium' ? 200 : 80;

  const ambientIntensity = timeOfDay === 'night' ? 0.2 : timeOfDay === 'dusk' ? 0.4 : 0.6;
  const fogColor = timeOfDay === 'night' ? '#0a0a0f' : '#e8e8ed';

  return (
    <>
      <fog attach="fog" args={[fogColor, 5, 20]} />
      <ambientLight intensity={ambientIntensity} color={c1} />
      <directionalLight
        position={[5, 5, 3]}
        intensity={mood === 'serene' ? 0.4 : 0.3}
        color={c2}
      />

      {/* 水面 */}
      <WaterPlane color={c1} />

      {/* 漂浮粒子（萤火虫/花瓣） */}
      <Particles count={particleCount} color={c3 ?? c2} spread={8} speed={0.3} />

      {/* 云雾 */}
      {quality !== 'low' && (
        <>
          <Float speed={0.5} floatIntensity={0.3}>
            <Cloud
              position={[-3, 2, -5]}
              opacity={0.15}
              speed={0.2}
              color={c1}
            />
          </Float>
          <Float speed={0.3} floatIntensity={0.2}>
            <Cloud
              position={[4, 3, -8]}
              opacity={0.1}
              speed={0.15}
              color={c2}
            />
          </Float>
        </>
      )}
    </>
  );
}

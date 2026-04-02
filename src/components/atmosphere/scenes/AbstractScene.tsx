'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Points, BufferGeometry, NormalBufferAttributes } from 'three';

interface AbstractSceneProps {
  palette: string[];
  mood: string;
  quality: 'high' | 'medium' | 'low';
}

function FlowingParticles({ count, palette, speed }: {
  count: number;
  palette: string[];
  speed: number;
}) {
  const ref = useRef<Points<BufferGeometry<NormalBufferAttributes>>>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * 5 + 1;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = Math.sin(theta) * r - 3;

      // 从 palette 中选色
      const hex = palette[i % palette.length];
      const rgb = hexToRgb(hex);
      col[i * 3] = rgb.r;
      col[i * 3 + 1] = rgb.g;
      col[i * 3 + 2] = rgb.b;
    }
    return [pos, col];
  }, [count, palette]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.rotation.y = t * 0.05;

    const positions = ref.current.geometry.attributes.position;
    for (let i = 0; i < Math.min(count, 100); i++) {
      const y = positions.getY(i);
      positions.setY(i, y + Math.sin(t + i * 0.1) * 0.002);
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16) / 255,
    g: parseInt(clean.substring(2, 4), 16) / 255,
    b: parseInt(clean.substring(4, 6), 16) / 255,
  };
}

export default function AbstractScene({ palette, mood, quality }: AbstractSceneProps) {
  const particleCount = quality === 'high' ? 800 : quality === 'medium' ? 400 : 150;
  const speed = mood === 'energetic' ? 1.5 : mood === 'serene' ? 0.5 : 1.0;

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 3, 0]} intensity={0.3} color={palette[0]} distance={10} />

      <FlowingParticles
        count={particleCount}
        palette={palette}
        speed={speed}
      />

      {/* 中心有机形状 */}
      {quality !== 'low' && (
        <OrganicShape color={palette[1] ?? palette[0]} />
      )}
    </>
  );
}

function OrganicShape({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.1;
    ref.current.rotation.y = t * 0.15;
    ref.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);
  });

  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <icosahedronGeometry args={[1.5, 3]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}


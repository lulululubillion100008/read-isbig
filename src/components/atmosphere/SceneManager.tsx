'use client';

import { Suspense, lazy } from 'react';
import type { BookScene, SceneType } from '@/lib/types';

const NatureScene = lazy(() => import('./scenes/NatureScene'));
const InteriorScene = lazy(() => import('./scenes/InteriorScene'));
const AbstractScene = lazy(() => import('./scenes/AbstractScene'));

interface SceneManagerProps {
  scene: BookScene;
  quality: 'high' | 'medium' | 'low';
}

export default function SceneManager({ scene, quality }: SceneManagerProps) {
  const { sceneType, config } = scene;
  const { palette, mood, timeOfDay } = config;

  return (
    <Suspense fallback={null}>
      <SceneRenderer
        sceneType={sceneType}
        palette={palette}
        mood={mood}
        timeOfDay={timeOfDay}
        quality={quality}
      />
    </Suspense>
  );
}

function SceneRenderer({
  sceneType,
  palette,
  mood,
  timeOfDay,
  quality,
}: {
  sceneType: SceneType;
  palette: string[];
  mood: string;
  timeOfDay: string;
  quality: 'high' | 'medium' | 'low';
}) {
  switch (sceneType) {
    case 'nature':
      return (
        <NatureScene
          palette={palette}
          mood={mood}
          timeOfDay={timeOfDay}
          quality={quality}
        />
      );
    case 'interior':
      return (
        <InteriorScene
          palette={palette}
          mood={mood}
          quality={quality}
        />
      );
    case 'abstract':
      return (
        <AbstractScene
          palette={palette}
          mood={mood}
          quality={quality}
        />
      );
    default:
      return (
        <AbstractScene
          palette={palette}
          mood={mood}
          quality={quality}
        />
      );
  }
}

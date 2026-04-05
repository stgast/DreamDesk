'use client';

import { useEffect, useRef, useCallback } from 'react';

const TUBES_CDN_URL = 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';

// DreamDesk Premium Color Theme
const THEMES = [
  {
    name: 'Blue (Default)',
    tubes: ['#adc6ff', '#7b8fff', '#4a5dbf'],
    lights: ['#adc6ff', '#7b8fff', '#c3b6ff', '#4a5dbf'],
  },
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<any>(null);

  const initTubes = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      // Dynamically import the ESM module from CDN
      // @ts-ignore - Dynamic import from URL
      const module = await import(/* webpackIgnore: true */ TUBES_CDN_URL);
      const TubesCursor = module.default;

      if (!TubesCursor || !canvasRef.current) return;

      const initialTheme = THEMES[0];

      // Initialize the Tubes effect
      appRef.current = TubesCursor(canvas, {
        tubes: {
          colors: initialTheme.tubes,
          lights: {
            intensity: 220,
            colors: initialTheme.lights,
          },
        },
      });

      console.log('[TubesBackground] Initialized with theme:', initialTheme.name);

    } catch (err) {
      console.warn('[TubesBackground] Failed to load tubes module:', err);
    }
  }, []);

  useEffect(() => {
    initTubes();

    return () => {
      if (appRef.current) {
        try {
          if (appRef.current.dispose) appRef.current.dispose();
          else if (appRef.current.destroy) appRef.current.destroy();
        } catch (e) {}
        appRef.current = null;
      }
    };
  }, [initTubes]);

  return (
    <canvas
      ref={canvasRef}
      id="tubes-canvas"
      className="absolute inset-0 w-full h-full pointer-events-auto z-0 opacity-80"
    />
  );
}

export { ParticleBackground };
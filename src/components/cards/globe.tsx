'use client';

import createGlobe from 'cobe';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useSpring } from 'react-spring';
import { motion } from 'framer-motion';
import { GlobeIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';

export function GlobeCard() {
  const { resolvedTheme } = useTheme();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pointerInteracting = React.useRef<number | null>(null);
  const pointerInteractionMovement = React.useRef(0);
  const [time, setTime] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 10000);

    return () => clearInterval(interval);
  }, []);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 10,
      tension: 400,
      friction: 100,
      precision: 0.001,
    },
  }));

  React.useEffect(() => {
    let direction = 1;
    let phi = 3.5;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
        window.addEventListener('resize', onResize);
      }
    };
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.4,
      dark: resolvedTheme === 'dark' ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 12000,
      mapBrightness: 4,
      baseColor: resolvedTheme === 'dark' ? [0.5, 0.5, 0.5] : [1, 1, 1],
      markerColor: [0.1, 0.75, 0.9],
      glowColor: resolvedTheme === 'dark' ? [0.5, 0.5, 0.5] : [0.9, 0.9, 0.9],
      markers: [
        // Kliplev latitute and longitude
        { location: [54.9372, 9.4033], size: 0.1 },
      ],
      scale: 1,
      onRender: (state: any) => {
        state.phi = phi + r.get();

        direction = -1;
        phi += 0.003;

        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [r, resolvedTheme]);

  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      className="relative col-span-5  col-start-5 row-span-1 row-start-1 gap-6 overflow-hidden rounded-xl bg-white/75 p-4 ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:bg-muted/80 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10 md:col-span-3 md:col-start-3 md:row-span-1"
    >
      <div className="flex flex-col gap-1">
        <div className="z-10 flex items-center gap-2">
          <GlobeIcon className="h-4 w-4 shrink-0" />
          <h2 className="flex gap-1 text-xs font-light md:text-sm">
            Kliplev, Denmark
          </h2>
        </div>
        <div className="z-10 flex items-center gap-2">
          {time && time.getHours() > 6 && time.getHours() < 18 ? (
            <SunIcon className="h-4 w-4 shrink-0" />
          ) : (
            <MoonIcon className="h-4 w-4 shrink-0" />
          )}
          <p className="text-xs">
            {time &&
              time.toLocaleTimeString('da-DK', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
          </p>
        </div>
      </div>
      <div className="absolute -inset-x-10 bottom-[-80%] mx-auto aspect-square h-[175%] md:inset-x-10">
        <div className="flex h-full w-full">
          <div
            style={{
              width: '100%',
              aspectRatio: '1/1',
            }}
          >
            <canvas
              ref={canvasRef}
              onMouseEnter={() => {
                // Speed up the globe rotation when hovering
                pointerInteracting.current = window.setInterval(() => {
                  pointerInteractionMovement.current += 0.01;
                  api.start({ r: pointerInteractionMovement.current });
                }, 1600 / 60);
              }}
              onMouseLeave={() => {
                // Reset the globe rotation when not hovering
                if (pointerInteracting.current) {
                  window.clearInterval(pointerInteracting.current);
                }
              }}
              style={{
                width: '100%',
                height: '100%',
                contain: 'layout paint size',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

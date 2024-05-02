'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

interface SpotifyCurrentlyPlaying {
  is_playing: boolean;
  item: {
    name: string;
    artists: [
      {
        name: string;
      },
    ];
  };
}

export function PersonalCard() {
  const [cachedData, setCachedData] = useState<{
    song: SpotifyCurrentlyPlaying | null;
    timestamp: number;
  }>({
    song: null,
    timestamp: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/spotify');
      const song = await res.json();

      if (song.data) {
        setCachedData({
          song: song.data,
          timestamp: Date.now(),
        });

        setLoading(false);
      }

      setLoading(false);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const { song, timestamp } = cachedData;

  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      className="relative col-span-4 row-span-1 row-start-1 h-full overflow-hidden rounded-xl ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10 md:col-span-2 md:col-start-1 md:row-span-2 md:h-full"
    >
      <Image
        alt="Jakob Hoeg Mørk"
        src="/assets/jakob.jpg"
        height={300}
        width={300}
        className="h-full object-cover"
        priority
      />
      <div className="absolute bottom-0 w-full p-1.5">
        <motion.div className="flex h-12 w-full items-center rounded-full border-t border-zinc-900 border-opacity-10 bg-white/60 p-1.5 backdrop-blur-sm dark:border-white/5 dark:bg-muted/60 ">
          <Image
            src="/assets/icons/spotify-color.svg"
            alt="Spotify"
            height={30}
            width={30}
            className="ml-0.5 mr-1 inline-block sm:mr-1.5"
            loading="lazy"
          />

          {/* Loading skeleton for text */}
          {loading && (
            <div className="flex flex-col gap-1 truncate text-sm ">
              <Skeleton className="h-3 w-14 bg-muted-foreground/40 sm:h-4 sm:w-24" />
              <Skeleton className="h-3 w-12 bg-muted-foreground/30 sm:w-20" />
            </div>
          )}

          {song && song.is_playing && (
            <div className="flex flex-col truncate">
              <p className="text-xs font-semibold sm:text-sm">
                {song.item.name}
              </p>
              <p className="text-xs">{song.item.artists[0].name}</p>
            </div>
          )}

          {!song ||
            !song.item ||
            (!song.is_playing && (
              <div className="flex flex-col truncate">
                <p className="text-xs font-semibold sm:text-sm">Currently</p>
                <p className="text-xs">not playing music</p>
              </div>
            ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

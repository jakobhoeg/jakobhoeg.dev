import { motion } from 'framer-motion';
import React from 'react';
import { Skeleton } from './ui/skeleton';

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

export default function SpotifyPlaying() {
  const [cachedData, setCachedData] = React.useState<{
    song: SpotifyCurrentlyPlaying | null;
    timestamp: number;
  }>({
    song: null,
    timestamp: 0,
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/spotify');
      const song = await res.json();

      if (song.status !== 200) {
        setCachedData({
          song: null,
          timestamp: 0,
        });
        setLoading(false);
        return;
      }

      if (song.data.is_playing) {
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
    <div className="flex w-full items-center rounded-full border-t border-zinc-900 border-opacity-10 bg-white/20 p-1.5 backdrop-blur-sm dark:border-white/5 dark:bg-muted/20 sm:h-10 sm:w-3/5 ">
      <motion.svg
        {...(song &&
          song.is_playing && {
            animate: { scale: [1, 1.1, 1] },
            transition: { duration: 0.45, repeat: Infinity },
          })}
        role="img"
        fill="#1DB954"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-0.5 mr-2 inline-block h-6 w-6 shrink-0 text-green-500"
      >
        <title>Spotify</title>
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </motion.svg>

      {/* Loading skeleton for text */}
      {loading && (
        <div className="flex flex-col gap-0.5 truncate ">
          <Skeleton className="h-3 w-20 bg-muted-foreground/20" />
          <Skeleton className="h-3 w-16 bg-muted-foreground/10" />
        </div>
      )}

      {/* If song is playing */}
      {song && song.is_playing && (
        <div className="flex flex-col -space-y-0.5 truncate">
          <p className="text-xs font-semibold">{song.item.name}</p>
          <p className="text-xs">{song.item.artists[0].name}</p>
        </div>
      )}

      {/* If song is not playing */}
      {song === null && !loading && (
        <div className="flex flex-col -space-y-0.5 truncate">
          <p className="text-xs font-semibold">Currently not</p>
          <p className="text-xs">listening to music</p>
        </div>
      )}
    </div>
  );
}

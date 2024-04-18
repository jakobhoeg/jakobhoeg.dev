'use client';

import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

interface IconType {
  id: number;
  iconSrc: string;
  invertColor?: boolean;
}

const icons: IconType[] = [
  {
    id: 1,
    iconSrc: '/assets/icons/nextdotjs.svg',
    invertColor: true,
  },
  {
    id: 2,
    iconSrc: '/assets/icons/docker-color.svg',
    invertColor: false,
  },
  {
    id: 3,
    iconSrc: '/assets/icons/dotnet.svg',
    invertColor: true,
  },
  {
    id: 4,
    iconSrc: '/assets/icons/react-color.svg',
    invertColor: false,
  },
  {
    id: 5,
    iconSrc: '/assets/icons/nodedotjs.svg',
    invertColor: true,
  },
  {
    id: 6,
    iconSrc: '/assets/icons/typescript-color.svg',
    invertColor: false,
  },
  {
    id: 7,
    iconSrc: '/assets/icons/jenkins.svg',
    invertColor: true,
  },
  {
    id: 8,
    iconSrc: '/assets/icons/javascript-color.svg',
    invertColor: false,
  },
  {
    id: 9,
    iconSrc: '/assets/icons/amazonaws.svg',
    invertColor: true,
  },
  {
    id: 10,
    iconSrc: '/assets/icons/mongodb.svg',
    invertColor: true,
  },
  {
    id: 11,
    iconSrc: '/assets/icons/html5-color.svg',
    invertColor: false,
  },
  {
    id: 12,
    iconSrc: '/assets/icons/csharp.svg',
    invertColor: false,
  },
];

export default function IconsCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      className="relative col-span-5 col-start-1 row-start-3 flex justify-center overflow-hidden rounded-xl bg-white/75 p-4 ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:bg-muted/80 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10 md:col-span-2 md:col-start-6 md:row-start-1 md:h-40"
    >
      <div className="absolute bottom-3 z-50 flex w-3/4 justify-center rounded-full border-t border-zinc-900 border-opacity-10 bg-white/60 py-1.5 backdrop-blur-sm dark:border-white/5 dark:bg-muted/60 md:bottom-1.5 md:text-sm">
        <p>Favourite tech</p>
      </div>
      <motion.div className=" flex h-full w-full flex-wrap justify-between sm:gap-2 ">
        {icons.map((icon) => (
          <motion.div
            key={icon.id}
            whileHover={{ scale: 1.15 }}
            animate={{ y: [-3, 3], rotate: 0 }}
            transition={{
              delay: Math.random(),
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
            className="relative flex h-12 w-12 sm:h-16 sm:w-16 md:h-9 md:w-9 "
          >
            <Image
              src={icon.iconSrc}
              alt="icon"
              fill
              className="flex shrink-0"
              {...(icon.invertColor && { className: 'dark:invert' })}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export function PersonalCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      className="relative col-span-4 row-span-1 row-start-1 h-full overflow-hidden rounded-xl ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-400/10 dark:ring-offset-neutral-400/10 md:col-span-2 md:col-start-1 md:row-span-2 md:h-full"
    >
      <Image
        alt="Jakob Hoeg Mørk"
        src="/assets/jakob.jpg"
        height={300}
        width={300}
        className="h-full object-cover"
        priority
      />
    </motion.div>
  );
}

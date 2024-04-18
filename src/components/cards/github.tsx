'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '../ui/button';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

export default function LinkedInCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      className="relative col-span-2 col-start-3 row-start-2 h-full w-full  gap-6 overflow-hidden rounded-xl p-4  ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10"
    >
      <Link
        href="https://github.com/jakobhoeg"
        className={cn(
          buttonVariants({ variant: 'default' }),
          'absolute left-0 top-0 h-full w-full gap-2',
        )}
      >
        <GitHubLogoIcon className="h-8 w-8 shrink-0 md:h-5 md:w-5" />
        <p className="hidden md:flex md:text-sm">GitHub</p>
      </Link>
    </motion.div>
  );
}

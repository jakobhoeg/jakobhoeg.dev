'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { WorkCardProps } from '@/lib/types';

export default function WorkCard({
  id,
  title,
  company,
  description,
  type,
  logoSrc,
  location,
  timeframe,
}: WorkCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      className="relative w-full overflow-hidden rounded-xl  bg-white/75 p-4 ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:bg-muted/80 dark:ring-neutral-400/10 dark:ring-offset-neutral-400/10 sm:p-6 md:p-10"
    >
      <div className="flex h-full w-full flex-col  gap-4">
        <div className="flex  items-center justify-between ">
          <div
            {...(company === 'Bitzer'
              ? { className: 'w-20 shrink-0 grow-0' }
              : { className: 'w-12 shrink-0 grow-0' })}
          >
            <Image src={logoSrc} alt={logoSrc} width={200} height={200} />
          </div>
          <p className="flex text-xs ">{timeframe}</p>
        </div>

        <div className="flex flex-col  gap-1.5">
          <div className="flex flex-col ">
            <h1 className="text-base font-semibold md:text-lg">{title}</h1>
            <p className="text-sm">{company + ' • ' + type}</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              {location}
            </p>
          </div>
          <p className="prose text-sm dark:text-white">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

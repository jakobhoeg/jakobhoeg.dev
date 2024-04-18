'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Navbar() {
  const menuList = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
  ];

  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-4 top-7 z-[99] mx-auto flex max-w-3xl items-center justify-between gap-2 overflow-hidden rounded-full border border-zinc-900 border-opacity-5 bg-white/25 px-7 py-4 text-sm ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100  backdrop-blur dark:border-white/5 dark:bg-muted/50 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10 sm:gap-8">
      <ul className="items-center/50 flex items-center ">
        <Link href="/" className="flex-shrink-0 pr-4">
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={36}
            height={36}
            className="cursor-hover dark:invert"
          />
        </Link>
        {menuList.map((item, idx: number) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.name}>
              <Link className="relative p-2.5" href={item.href}>
                <span>{item.name}</span>

                {isActive && (
                  <motion.span
                    className="absolute inset-x-0 inset-y-0 z-[-1] flex rounded-full bg-neutral-200/40 dark:bg-neutral-700/60"
                    layoutId="bubble"
                    transition={{ type: 'spring', bounce: 0.35, duration: 0.6 }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <ModeToggle />
    </nav>
  );
}

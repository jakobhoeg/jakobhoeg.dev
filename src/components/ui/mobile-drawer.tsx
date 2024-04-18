'use client';

import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { menuList } from '../navbar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MobileDrawer() {
  const pathname = usePathname();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="p-3" variant="ghost">
          <HamburgerMenuIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex w-full flex-col items-center justify-center py-4">
        {menuList.map((item, idx: number) => {
          const isActive = pathname === item.href;

          return (
            <DrawerHeader key={item.name}>
              <Link href={item.href}>
                <h1 className={isActive ? 'text-lg font-semibold' : 'text-lg'}>
                  {item.name}
                </h1>
              </Link>
            </DrawerHeader>
          );
        })}
      </DrawerContent>
    </Drawer>
  );
}

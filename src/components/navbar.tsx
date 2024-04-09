"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Navbar() {
  const menuList = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects", section: "projects" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  const pathname = usePathname();

  return (
    <nav className="text-xs border gap-2 sm:gap-8 md:text-sm bg-muted/10 dark:bg-muted/50 border-zinc-900 border-opacity-5 dark:border-white/5 backdrop-blur flex justify-between items-center px-7 py-4 rounded-full ">
      <Link href="/" className="flex-shrink-0">
        <Image
          src="/assets/logo.svg"
          alt="logo"
          width={36}
          height={36}
          className="dark:invert cursor-hover"
        />
      </Link>
      <ul className="flex items-center/50 items-center ">
        {menuList.map((item, idx: number) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.name}>
              <Link className="relative p-2.5" href={item.href}>
                <span>{item.name}</span>

                {isActive && (
                  <motion.span
                    className="absolute inset-x-0 inset-y-0 z-[-1] hidden rounded-full bg-neutral-200/50 dark:bg-neutral-700 sm:flex"
                    layoutId="bubble"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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

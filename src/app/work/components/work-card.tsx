"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { WorkCardProps } from "@/lib/types";

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
      className="relative p-4 sm:p-12 md:h-64 bg-white/75 dark:bg-muted/80 w-full overflow-hidden rounded-xl ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10"
    >
      <div className="w-full h-full flex flex-col sm:flex-row gap-4">
        <div className="flex  justify-between items-center sm:items-start">
            <div
            {...(company === "Bitzer"
                ? { className: "w-24 shrink-0 grow-0" }
                : { className: "w-14 shrink-0 grow-0" })}
            >
            <Image src={logoSrc} alt={logoSrc} width={200} height={200} />
            </div>
            <p className="text-xs flex sm:hidden">{timeframe}</p>
        </div>


        <div className="flex flex-col  gap-1.5">
          <div className="flex flex-col ">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-base">{title}</h1>
              <p className="text-xs hidden sm:flex">{timeframe}</p>
            </div>
            <p className="text-sm">{company + " • " + type}</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              {location}
            </p>
          </div>
          <p className="text-sm prose dark:text-white">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

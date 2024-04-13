"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function PersonalCard() {
   return (
      <motion.div
      whileHover={{ scale: 1.025 }}
         className="relative overflow-hidden rounded-xl md:col-start-1 row-start-1 col-span-4 row-span-2 md:col-span-2 md:row-span-2 ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10"
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
   )
}
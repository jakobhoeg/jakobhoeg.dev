'use client'

import { motion } from 'framer-motion'
import React from 'react'

export default function ProjectsCard() {
  return (
    <motion.div
    whileHover={{ scale: 1.025 }}
    className="relative h-full gap-6 md:h-40 overflow-hidden rounded-xl bg-white/90 p-4 dark:bg-muted/80 col-start-5 col-span-3 row-start-2 ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10"
    >
        ProjectsCard
    </motion.div>
  )
}
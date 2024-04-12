'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/button'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

export default function LinkedInCard() {
  return (
   <motion.div
    whileHover={{ scale: 1.025 }}
   className='relative h-full gap-6 overflow-hidden rounded-xl  p-4 col-start-3 col-span-2 row-start-2 md:h-40 ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10'>
     <Link href="https://github.com/jakobhoeg"
    className={cn(buttonVariants({ variant: "default" }), 
    'absolute top-0 left-0 h-full w-full gap-1')}
    >
        <GitHubLogoIcon className='w-10 h-10'/>
        <p className='text-lg'>GitHub</p>
    </Link>
   </motion.div>
  )
}

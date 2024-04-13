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
   className='relative h-full w-full gap-6 overflow-hidden rounded-xl  p-4 col-start-3 col-span-2 row-start-2  ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10'>
     <Link href="https://www.linkedin.com/in/jakob-hoeg-moerk/"
    className={cn(buttonVariants({ variant: "linkedin" }), 
    'absolute top-0 left-0 h-full w-full gap-2')}
    >
        <LinkedInLogoIcon className='w-5 h-5 shrink-0'/>
        <p className='hidden md:flex md:text-sm'>LinkedIn</p>
    </Link>
   </motion.div>
  )
}

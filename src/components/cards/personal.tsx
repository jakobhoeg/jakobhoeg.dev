"use client"

import Image from "next/image"

export function PersonalCard() {
   return (
      <div
         className="card-border relative col-span-4 row-span-3 overflow-hidden rounded-xl md:col-span-2 md:row-span-3 ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10"
      >
         <Image
            alt="Jakob Hoeg Mørk"
            src="/assets/jakob.jpg"
            height={300}
            width={300}
            className="h-full object-cover"
            priority
         />
      </div>
   )
}
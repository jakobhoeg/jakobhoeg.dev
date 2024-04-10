"use client"

import { ClockIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

export function TimeCard() {
   const [time, setTime] = useState<Date | null>(null)

   useEffect(() => {
      setTime(new Date())
      const interval = setInterval(() => setTime(new Date()), 10000)

      return () => clearInterval(interval)
   }, [])


   if (!time) return null

   return (
      <div
         className="md:row-span-0 relative col-span-4 col-start-5 row-start-1 flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-white/25 dark:bg-muted/50 p-4 md:col-span-2 md:col-start-6 ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10"
      >
         {/* Render a sun icon if time is morning, and moon icon if night */}
         {time?.getHours() > 6 && time?.getHours() < 18 ? (
            <SunIcon className="w-4 h-4" />
         ) : (
            <MoonIcon className="w-4 h-4" />
         )}
         <h2 className="text-sm">
            {time?.toLocaleTimeString("da-DK", {
               hour: "2-digit",
               minute: "2-digit",
               hour12: true,
            })}
         </h2>
      </div>
   )
}
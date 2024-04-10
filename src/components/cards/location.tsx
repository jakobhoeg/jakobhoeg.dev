"use client"

import createGlobe from "cobe"
import { Globe } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"
import { useSpring } from "react-spring"
import { motion } from "framer-motion"

export function LocationCard() {
   const { resolvedTheme } = useTheme()
   const canvasRef = React.useRef<HTMLCanvasElement>(null)
   const pointerInteracting = React.useRef<number | null>(null)
   const pointerInteractionMovement = React.useRef(0)
  
   const [{ r }, api] = useSpring(() => ({
      r: 0,
      config: {
         mass: 0.5,
         tension: 200,
         friction: 20,
         precision: 0.001,
      },
   }))

   React.useEffect(() => {
      let width = 0
      let phi = 3
      let direction = 1

      const onResize = () => {
         if (canvasRef.current && (width = canvasRef.current.offsetWidth)) {
            window.addEventListener("resize", onResize)
         }
      }
      onResize()

      if (!canvasRef.current) return

      const globe = createGlobe(canvasRef.current, {
         devicePixelRatio: 2,
         width: width * 2,
         height: width * 2,
         phi: 0,
         theta: 0.4,
         dark: resolvedTheme === "dark" ? 1 : 0,
         diffuse: 1.2,
         mapSamples: 12000,
         mapBrightness: 4,
         baseColor: resolvedTheme === "dark" ? [0.5, 0.5, 0.5] : [1, 1, 1],
         markerColor: [0.1, 0.9, 0.3],
         glowColor:
            resolvedTheme === "dark" ? [0.5, 0.5, 0.5] : [0.9, 0.9, 0.9],
         markers: [
            // Kliplev latitute and longitude
            { location: [54.9372, 9.4033], size: 0.2 },
         ],
         scale: 1,
         onRender: (state: any) => {
            state.phi = phi + r.get()

            if (state.phi > 5.5) direction = -1
            else if (state.phi < 3.25) direction = 1

            if (direction === 1) {
               phi += 0.001
            } else {
               phi -= 0.001
            }
            state.width = width * 2
            state.height = width * 2
         },
      })

      return () => {
         globe.destroy()
         window.removeEventListener("resize", onResize)
      }
   }, [r, resolvedTheme])

   return (
      <motion.div
         className="relative flex flex-col h-full gap-6 col-span-4 col-start-5 row-span-3 row-start-2 overflow-hidden rounded-xl bg-white/25 p-4 dark:bg-muted/50 md:col-span-2 md:col-start-6 md:row-span-2 md:row-start-2 md:h-40 ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10"
      >
         <div className="z-10 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <h2 className="text-sm font-light">Kliplev, Denmark</h2>
         </div>
         <div className="absolute inset-x-0 bottom-[-75%] mx-auto aspect-square h-[175%]">
            <div
            className="w-full h-full flex"
            >
               <div
                  style={{
                     width: "100%",
                     aspectRatio: "1/1",
                     
                  }}
               >
                  <canvas
                     ref={canvasRef}
                     onPointerDown={(e) => {
                        pointerInteracting.current =
                           e.clientX - pointerInteractionMovement.current
                        canvasRef.current &&
                           (canvasRef.current.style.cursor = "grabbing")
                     }}
                     onPointerUp={() => {
                        pointerInteracting.current = null
                        canvasRef.current &&
                           (canvasRef.current.style.cursor = "grab")
                     }}
                     onPointerOut={() => {
                        pointerInteracting.current = null
                        canvasRef.current &&
                           (canvasRef.current.style.cursor = "grab")
                     }}
                     onMouseMove={(e) => {
                        if (pointerInteracting.current !== null) {
                           const delta = e.clientX - pointerInteracting.current
                           pointerInteractionMovement.current = delta
                           api.start({
                              r: delta / 200,
                           })
                        }
                     }}
                     onTouchMove={(e) => {
                        if (
                           pointerInteracting.current !== null &&
                           e.touches[0]
                        ) {
                           const delta =
                              e.touches[0].clientX - pointerInteracting.current
                           pointerInteractionMovement.current = delta
                           api.start({
                              r: delta / 100,
                           })
                        }
                     }}
                     style={{
                        width: "100%",
                        height: "100%",
                        contain: "layout paint size",
                        cursor: "auto",
                        userSelect: "none",
                     }}
                  />
               </div>
            </div>
         </div>
      </motion.div>
   )
}
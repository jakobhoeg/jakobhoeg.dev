"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardType {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  videoSrc?: string;
  imageAlt: string;
  videoAlt?: string;
  showcaseUrl?: string;
  githubUrl?: string;
}

export default function ProjectsCard() {
  const router = useRouter();

  const cards: CardType[] = [
    {
      id: 1,
      title: "Proglio",
      description:
        "A full-stack collaborative task management platform coded in React with NextJS, MongoDB & TypeScript.",
      imageSrc: "/assets/proglio.png",
      imageAlt: "Proglio",
      showcaseUrl: "https://www.proglio.app/",
    },
    {
      id: 2,
      title: "Web app for LLMs",
      description:
        "Open source web interface for Ollama. Run open-source large language models (LLMs) locally on your pc. The web interface is coded in NextJS with TypeScript.",
      imageSrc: "/assets/ollama.png",
      imageAlt: "Web UI for Ollama LLMs",
      githubUrl: "https://github.com/jakobhoeg/nextjs-ollama-llm-ui",
    },
    {
      id: 3,
      title: "shadcn-chat",
      description:
        "Open source chat components for NextJS. Built on top of the very popular UI library, shadcn.",
      imageSrc: "/assets/shadcn-chat.png",
      imageAlt: "Moodle Lazy DL Bot",
      showcaseUrl: "https://shadcn-chat.vercel.app/",
      githubUrl: "https://github.com/jakobhoeg/shadcn-chat",
    },
    {
      id: 4,
      title: "Unity Game",
      description:
        "A 2D rougelike, bullet hell top-down game created in Unity Game Engine, coded in C# and designed by me. (Still a WIP).",
      imageSrc: "/assets/unity-game.png",
      imageAlt: "Unity Game",
    },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      className="relative h-2/3 cursor-pointer overflow-hidden gap-6 md:h-40 flex  rounded-xl bg-white/90 dark:bg-muted/80 col-start-1 row-start-2 row-span-2 col-span-4 md:col-start-5 md:col-span-3 md:row-start-2 ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10"
      onClick={() => router.push("/projects")}
    >
      <Carousel
        className="flex w-full h-full object-cover justify-center"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className=" h-full">
          {cards.map((card) => (
            <CarouselItem
              key={card.id}
              className="flex items-center justify-center"
            >
              <Image
                src={card.imageSrc}
                alt={card.imageAlt}
                width={1200}
                height={1200}
                className="object-cover w-full h-full "
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-3 md:bottom-1.5 md:text-sm z-50 flex justify-center w-3/4 py-1.5 border-t rounded-full bg-white/60 dark:bg-muted/60 border-zinc-900 border-opacity-10 dark:border-white/5 backdrop-blur-sm">
        <p>My projects</p>
        </div>
      </Carousel>
    </motion.div>
  );
}

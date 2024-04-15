"use client";

import React from "react";
import { ExternalLinkIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";

interface ProjectCardProps {
  id: number;
  title: string;
  videoUrl?: string;
  videoAlt?: string;
  description: string;
  showcaseUrl?: string;
  githubUrl?: string;
  skills: string[];
}

export default function ProjectCard({
  id,
  title,
  videoUrl,
  description,
  showcaseUrl,
  githubUrl,
  skills,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
      className="relative bg-white/90 dark:bg-muted/80 w-full overflow-hidden rounded-xl ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:ring-neutral-950/10 dark:ring-offset-neutral-950/10"
    >
      <video
        autoPlay={false}
        muted
        controls
        title={title}
        loop
        playsInline
        preload="metadata"
        className="object-cover rounded-xl"
        src={videoUrl}
      ></video>
      <div className="text-left items-start pt-3 w-full p-4 ">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-medium">{title}</p>
              <div className="flex items-center gap-5">
              <div >
                  {skills && (
                    <div className="flex gap-2">
                      {skills.map((skill) => (
                        <Image alt={skill} key={skill} width="24" height="24" src={skill} className="w-4 h-4 md:w-5 md:h-5 dark:invert opacity-40" />
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-x-2">
                {showcaseUrl && (
                  <Button
                  key={showcaseUrl}
                    className="rounded-full"
                    variant="outline"
                    onClick={() => window.open(showcaseUrl, "_blank")}
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                  </Button>
                )}
                {githubUrl && (
                  <Button
                  key={githubUrl}
                    className="rounded-full relative"
                    variant="outline"
                    onClick={() => window.open(githubUrl, "_blank")}
                  >
                    <GitHubLogoIcon className="w-4 h-4" />
                    <span className="sr-only">Github link</span>
                  </Button>
                )}
                </div>
              </div>
            </div>
            <p className="pt-2 md:w-96 lg:w-[450px] text-muted-foreground">
              {description}
            </p>
          </div>    
    </motion.div>
  );
}

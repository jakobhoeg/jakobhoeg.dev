'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { Button, buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectCardProps } from '@/lib/types';

export default function ProjectCard({
  id,
  title,
  videoUrl,
  description,
  showcaseUrl,
  githubUrl,
  skills,
}: ProjectCardProps) {
  const [load, setLoad] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoad(true);
        observer.disconnect();
      }
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={videoRef}
      whileHover={{ scale: 1.025 }}
      className="relative w-full overflow-hidden rounded-xl bg-white/75 ring-1 ring-neutral-200 ring-offset-8 ring-offset-neutral-100 dark:bg-muted/80 dark:ring-neutral-400/10 dark:ring-offset-neutral-400/10"
    >
      {load ? (
        <video
          autoPlay={false}
          muted
          controls
          title={title}
          loop
          playsInline
          preload="metadata"
          className="rounded-xl object-cover"
          src={videoUrl}
        ></video>
      ) : (
        <div className="flex w-full justify-center">
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      )}
      <div className="w-full items-start p-4 pt-3 text-left ">
        <div className="flex items-center justify-between ">
          <p className="text-lg font-medium">{title}</p>
          <div className="flex items-center gap-5">
            <div>
              {skills && (
                <div className="flex gap-2">
                  {skills.map((skill) => (
                    <Image
                      alt={skill}
                      key={skill}
                      width="24"
                      height="24"
                      src={skill}
                      className="h-4 w-4 opacity-40 dark:invert md:h-5 md:w-5"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="space-x-2">
              {showcaseUrl && (
                <Button
                  key={showcaseUrl}
                  className="rounded-full dark:bg-muted-foreground/10"
                  variant="outline"
                  onClick={() => window.open(showcaseUrl, '_blank')}
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                </Button>
              )}
              {githubUrl && (
                <Button
                  key={githubUrl}
                  className="relative rounded-full dark:bg-muted-foreground/10"
                  variant="outline"
                  onClick={() => window.open(githubUrl, '_blank')}
                >
                  <GitHubLogoIcon className="h-4 w-4" />
                  <span className="sr-only">Github link</span>
                </Button>
              )}
            </div>
          </div>
        </div>
        <p className="pt-2  text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

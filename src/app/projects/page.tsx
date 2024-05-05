import Link from 'next/link';
import React from 'react';
import ProjectCard from './components/project-card';
import { Projects } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
};

export default function ProjectsPage() {
  return (
    <div className="flex h-full w-full flex-col gap-5">
      <h1 className="text-xl font-medium">Projects I&apos;ve worked on</h1>
      <p className="prose dark:prose-invert">
        This is a list of some of the projects I&apos;ve worked on. You can find
        more on my{' '}
        <Link href="https://github.com/jakobhoeg" className="font-semibold">
          GitHub
        </Link>
        .
      </p>

      <div className="mt-2 flex flex-col gap-10 ">
        {Projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}

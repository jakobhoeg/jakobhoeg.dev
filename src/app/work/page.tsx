import Link from 'next/link';
import React from 'react';
import WorkCard from './components/work-card';
import { Work } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work',
};

export default function WorkPage() {
  return (
    <div className="flex h-full w-full flex-col gap-5">
      <h1 className="text-xl font-medium">Work experience</h1>
      <p className="prose dark:prose-invert">
        This is a list of my work experience. For more information, please visit
        my{' '}
        <Link
          className="font-semibold"
          href="https://www.linkedin.com/in/jakob-hoeg-moerk/"
        >
          LinkedIn
        </Link>{' '}
        profile.
      </p>

      <div className="mt-2 flex flex-col gap-10 ">
        {Work.map((work, index) => (
          <WorkCard key={index} {...work} />
        ))}
      </div>
    </div>
  );
}

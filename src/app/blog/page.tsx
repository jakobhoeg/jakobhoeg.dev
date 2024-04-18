import Link from 'next/link';
import React from 'react';

export default function BlogPage() {
  return (
    <div className="flex h-full w-full flex-col gap-5">
      <h1 className="text-xl font-medium">Blog posts</h1>
      <p className="prose dark:prose-invert">
        Coming soon. In the meantime, checkout my{' '}
        <Link className="font-semibold" href="https://medium.com/@jakobhoeg">
          Medium
        </Link>{' '}
        profile.
      </p>
    </div>
  );
}

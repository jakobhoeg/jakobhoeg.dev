import Link from 'next/link'
import React from 'react'

export default function BlogPage() {
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <h1 className="text-xl font-medium">Blog posts</h1>
      <p className="max-w-prose">
        Coming soon. In the meantime, checkout my <Link className='font-semibold' href="https://medium.com/@jakobhoeg">Medium</Link> profile.
      </p>
    </div>
  )
}

import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowUpRight, Filter } from 'lucide-react'

import { BlogLoadError, getPublishedPosts } from '@/lib/blog/posts'

interface PageProps {
  searchParams: Promise<{
    category?: string
  }>
}

export const metadata: Metadata = {
  title: 'Blog — Cerveau Analytique',
  description: 'Research, stories, and enterprise insights from Cerveau Analytique.',
}

export const revalidate = 60

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const categoryFilter = resolvedSearchParams.category || ''

  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = []
  let loadError: string | null = null

  try {
    posts = await getPublishedPosts({
      category: categoryFilter || undefined,
      limit: 24,
    })
  } catch (err) {
    loadError =
      err instanceof BlogLoadError
        ? err.message
        : 'We couldn’t load the latest articles right now. Please try again later.'
  }

  const categories = ['All', 'Stories', 'Business', 'Explore', 'Developers', 'Research']

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-12 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 space-y-10">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
            Cerveau <span className="text-neutral-400">Stories & Blog</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400">
            Insights, engineering breakthroughs, and customer stories from the team building analytical intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <Filter size={16} className="text-neutral-400 mr-2 shrink-0" />
          {categories.map((cat) => {
            const isActive =
              cat === 'All' ? !categoryFilter : categoryFilter.toLowerCase() === cat.toLowerCase()
            const href = cat === 'All' ? '/blog' : `/blog?category=${cat}`
            return (
              <Link
                key={cat}
                href={href}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                {cat}
              </Link>
            )
          })}
        </div>

        {loadError ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-10 text-center dark:border-amber-900/40 dark:bg-amber-950/30">
            <h2 className="text-xl font-bold tracking-tight mb-2">Unable to load articles</h2>
            <p className="text-sm text-amber-900/80 dark:text-amber-100/80">{loadError}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 px-6 py-16 text-center">
            <h2 className="text-2xl font-black tracking-tight mb-3">No blogs at the moment</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              We&apos;re preparing new research and insights.
              <br />
              Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col space-y-3 cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                  {post.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.coverImageUrl}
                      alt=""
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                      {post.category}
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                    <span>{post.category}</span>
                    {post.publishedAt ? (
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="text-lg font-bold leading-snug group-hover:underline underline-offset-4 decoration-neutral-300">
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-3">{post.excerpt}</p>
                  ) : null}
                  <span className="inline-flex items-center text-xs font-semibold pt-1">
                    Read article <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

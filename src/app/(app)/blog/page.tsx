import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { SAMPLE_POSTS, seedPostsIfEmpty } from '@/utilities/seedPosts'
import { ArrowUpRight, Filter } from 'lucide-react'

interface PageProps {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const categoryFilter = resolvedSearchParams.category || ''

  let posts: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    await seedPostsIfEmpty(payload)

    const query: any = {}
    if (categoryFilter) {
      query.category = { equals: categoryFilter }
    }

    const result = await payload.find({
      collection: 'posts' as any,
      where: query,
      limit: 20,
      sort: '-publishedAt',
    })

    if (result && result.docs && result.docs.length > 0) {
      posts = result.docs
    }
  } catch (err) {
    // Fallback
  }

  if (posts.length === 0) {
    posts = SAMPLE_POSTS.filter((p) =>
      categoryFilter ? p.category.toLowerCase() === categoryFilter.toLowerCase() : true,
    )
  }

  const categories = ['All', 'Stories', 'Business', 'Explore', 'Developers']

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-12 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 space-y-10">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
            Prysel <span className="text-neutral-400">Stories & Blog</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400">
            Insights, engineering breakthroughs, and customer stories from the team building analytical intelligence.
          </p>
        </div>

        {/* Category Filter Pills */}
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id || post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col space-y-3 cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <img
                  src={
                    post.coverImageUrl ||
                    post.coverImage?.url ||
                    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800'
                  }
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {post.blogId && (
                  <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {post.blogId}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
              <div className="text-xs font-semibold text-neutral-400 pt-1 flex items-center justify-between">
                <span>{post.category || 'Stories'}</span>
                <span className="flex items-center text-blue-500">
                  Read article <ArrowUpRight size={13} className="ml-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Blog & Stories — Prysel',
  description: 'Explore latest stories, business case studies, and engineering blogs.',
}

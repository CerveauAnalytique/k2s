import React from 'react'
import { Hero } from '@/components/Home/Hero'
import { BlogCards, BlogPostItem } from '@/components/Home/BlogCards'
import { WorkspaceHero } from '@/components/Home/WorkspaceHero'
import type { Metadata } from 'next'
import { getPublishedPosts } from '@/lib/blog/posts'

function formatPost(doc: Awaited<ReturnType<typeof getPublishedPosts>>[number]): BlogPostItem {
  return {
    id: doc.id,
    blogId: doc.blogId,
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    coverImageUrl: doc.coverImageUrl,
    excerpt: doc.excerpt,
    publishedAt: doc.publishedAt
      ? new Date(doc.publishedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : undefined,
  }
}

export default async function HomePage() {
  let storiesPosts: BlogPostItem[] = []
  let businessPosts: BlogPostItem[] = []
  let blogError: string | null = null

  try {
    const [stories, business] = await Promise.all([
      getPublishedPosts({ category: 'Stories', limit: 6 }),
      getPublishedPosts({ category: 'Business', limit: 6 }),
    ])
    storiesPosts = stories.map(formatPost)
    businessPosts = business.map(formatPost)
  } catch (error) {
    console.error('[home] blog load failed', error)
    blogError = 'We couldn’t load the latest articles right now. Please try again later.'
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <Hero />
      <BlogCards stories={storiesPosts} business={businessPosts} error={blogError} />
      <WorkspaceHero />
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Cerveau Analytique — AGI Evolution & Analytical Intelligence',
  description:
    'The analytical intelligence layer powering modern engineering teams, neural models, and data labs.',
}

export const revalidate = 60

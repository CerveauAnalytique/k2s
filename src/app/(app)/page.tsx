import React from 'react'
import { Hero } from '@/components/Home/Hero'
import { BlogCards, BlogPostItem } from '@/components/Home/BlogCards'
import { WorkspaceHero } from '@/components/Home/WorkspaceHero'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { seedPostsIfEmpty, SAMPLE_POSTS } from '@/utilities/seedPosts'

function formatPayloadDoc(doc: any): BlogPostItem {
  return {
    id: doc.id,
    blogId: doc.blogId || `BLOG-${doc.id}`,
    title: doc.title,
    slug: doc.slug,
    category: doc.category || 'Stories',
    coverImageUrl: doc.coverImageUrl || doc.coverImage?.url || undefined,
    excerpt: doc.excerpt,
    publishedAt: doc.publishedAt
      ? new Date(doc.publishedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : 'Aug 2026',
  }
}

export default async function HomePage() {
  let storiesPosts: BlogPostItem[] = []
  let businessPosts: BlogPostItem[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    
    // Seed sample posts in database if none exist yet
    await seedPostsIfEmpty(payload)

    // Fetch Stories posts from Payload CMS
    const storiesResult = await payload.find({
      collection: 'posts' as any,
      where: {
        category: {
          equals: 'Stories',
        },
      },
      limit: 6,
      sort: '-publishedAt',
    })

    // Fetch Business posts from Payload CMS
    const businessResult = await payload.find({
      collection: 'posts' as any,
      where: {
        category: {
          equals: 'Business',
        },
      },
      limit: 6,
      sort: '-publishedAt',
    })

    if (storiesResult?.docs?.length > 0) {
      storiesPosts = storiesResult.docs.map(formatPayloadDoc)
    }

    if (businessResult?.docs?.length > 0) {
      businessPosts = businessResult.docs.map(formatPayloadDoc)
    }
  } catch (error) {
    // Swallowed error fallback
  }

  // Fallback to sample posts if DB not ready
  if (storiesPosts.length === 0) {
    storiesPosts = SAMPLE_POSTS.filter((p) => p.category === 'Stories').map((p, i) => ({
      ...p,
      id: `fallback-s-${i}`,
    }))
  }

  if (businessPosts.length === 0) {
    businessPosts = SAMPLE_POSTS.filter((p) => p.category === 'Business').map((p, i) => ({
      ...p,
      id: `fallback-b-${i}`,
    }))
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors">
      <Hero />
      <BlogCards stories={storiesPosts} business={businessPosts} />
      <WorkspaceHero />
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Prysel — AGI Evolution & Analytical Intelligence',
  description:
    'The analytical intelligence layer powering modern engineering teams, neural models, and data labs.',
}

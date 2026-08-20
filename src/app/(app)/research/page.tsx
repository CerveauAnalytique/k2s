import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Research — Prysel',
  description:
    'Cutting-edge research publications from Prysel on AI, analytics, and intelligent systems.',
}

const researchPosts = [
  {
    id: 1,
    category: 'RESEARCH',
    title: 'Advances in Sparse Neural Architectures for Real-Time Market Analysis',
    excerpt:
      'We present a new class of sparse transformer architectures that achieve state-of-the-art accuracy on financial time-series forecasting while reducing inference latency by 4×.',
    date: 'Aug 15, 2026',
    readTime: '12 min read',
    tag: 'New',
    href: '/research/sparse-neural-architectures',
  },
  {
    id: 2,
    category: 'PRODUCT',
    title: 'Prysel API v3: Unified Intelligence Layer',
    excerpt:
      'Our third major API release unifies structured data queries, unstructured document analysis, and predictive modelling behind a single, coherent interface.',
    date: 'Jul 30, 2026',
    readTime: '8 min read',
    tag: null,
    href: '/research/api-v3',
  },
  {
    id: 3,
    category: 'SAFETY',
    title: 'Interpretability Tooling for High-Stakes Decision Systems',
    excerpt:
      'We open-source a suite of interpretability probes designed for auditing model decisions in regulated industries such as healthcare, finance, and public infrastructure.',
    date: 'Jul 12, 2026',
    readTime: '15 min read',
    tag: null,
    href: '/research/interpretability-tooling',
  },
  {
    id: 4,
    category: 'RESEARCH',
    title: 'Chain-of-Thought Distillation for Compact Analytics Models',
    excerpt:
      'Distilling reasoning chains from large models into compact, deployable analytics models while preserving performance on complex multi-step queries.',
    date: 'Jun 28, 2026',
    readTime: '10 min read',
    tag: null,
    href: '/research/cot-distillation',
  },
  {
    id: 5,
    category: 'COMPANY',
    title: 'Announcing Our Series B: Building the Intelligence Substrate',
    excerpt:
      'We have raised $120M to accelerate development of our real-time analytics platform and expand our research team globally.',
    date: 'Jun 10, 2026',
    readTime: '5 min read',
    tag: null,
    href: '/research/series-b',
  },
  {
    id: 6,
    category: 'PRODUCT',
    title: 'Semantic Search Across Structured Data Warehouses',
    excerpt:
      'Natural-language querying over petabyte-scale columnar stores using a fine-tuned retrieval-augmented generation pipeline built on the Prysel platform.',
    date: 'May 22, 2026',
    readTime: '11 min read',
    tag: null,
    href: '/research/semantic-search-dw',
  },
]

const categoryColor: Record<string, string> = {
  RESEARCH: 'research-tag--research',
  PRODUCT: 'research-tag--product',
  SAFETY: 'research-tag--safety',
  COMPANY: 'research-tag--company',
}

export default function ResearchPage() {
  const featured = researchPosts[0]
  const rest = researchPosts.slice(1)

  return (
    <div className="research-page">
      {/* Hero */}
      <section className="research-hero">
        <div className="research-hero-inner">
          <p className="research-hero-eyebrow">Research & Insights</p>
          <h1 className="research-hero-title">
            Intelligence, <em>examined.</em>
          </h1>
          <p className="research-hero-subtitle">
            Discoveries, product updates, and thinking from the Prysel team.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="research-featured-section">
        <div className="research-container">
          <Link href={featured.href} className="research-featured-card">
            <div className="research-featured-meta">
              <span className={`research-tag ${categoryColor[featured.category] ?? ''}`}>
                {featured.category}
              </span>
              {featured.tag && <span className="research-badge">{featured.tag}</span>}
            </div>
            <h2 className="research-featured-title">{featured.title}</h2>
            <p className="research-featured-excerpt">{featured.excerpt}</p>
            <div className="research-featured-footer">
              <span>{featured.date}</span>
              <span className="research-dot" />
              <span>{featured.readTime}</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="research-grid-section">
        <div className="research-container">
          <div className="research-grid">
            {rest.map((post) => (
              <Link key={post.id} href={post.href} className="research-card">
                <span className={`research-tag ${categoryColor[post.category] ?? ''}`}>
                  {post.category}
                </span>
                <h3 className="research-card-title">{post.title}</h3>
                <p className="research-card-excerpt">{post.excerpt}</p>
                <div className="research-card-footer">
                  <span>{post.date}</span>
                  <span className="research-dot" />
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

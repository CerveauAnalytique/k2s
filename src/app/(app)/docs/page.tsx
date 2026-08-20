import type { Metadata } from 'next'
import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Introduction — Prysel Docs',
  description: 'Welcome to the Prysel platform documentation.',
}

const TOC = [
  { id: 'about', title: 'About this documentation', level: 2 },
  { id: 'what-you-can-build', title: 'What you can build', level: 2 },
  { id: 'core-apis', title: 'Core APIs', level: 2 },
  { id: 'prerequisites', title: 'Prerequisites', level: 2 },
]

export default function DocsIndexPage() {
  return (
    <DocsLayout
      title="Introduction"
      description="Welcome to the Prysel platform documentation."
      toc={TOC}
      nextPage={{ title: 'Quickstart', href: '/docs/quickstart' }}
    >
      <h2 id="about">About this documentation</h2>
      <p>
        This documentation covers all public-facing APIs, SDKs, and integrations for the{' '}
        <strong>Prysel</strong> platform. Whether you are running a carbon footprint
        analysis, performing semantic search, or forecasting time-series data, you will find
        everything you need here.
      </p>
      <p>
        The docs are structured in two levels: a top-level <em>category</em> (e.g. Carbon API) and
        a <em>topic</em> within it (e.g. Calculate Footprint). Use the sidebar to navigate.
      </p>

      <div className="docs-callout docs-callout--info">
        <strong>Beta notice:</strong> The Prysel platform is currently in beta. APIs are
        stable but breaking changes will be communicated with 30 days notice and a major version bump.
      </div>

      <h2 id="what-you-can-build">What you can build</h2>
      <ul>
        <li><strong>Carbon footprint tools</strong> — Integrate CNN-powered emission analysis into sustainability dashboards, ESG reporting, or consumer apps.</li>
        <li><strong>Intelligent search</strong> — Add semantic, relevance-ranked search over any text corpus using a single API call.</li>
        <li><strong>Predictive analytics</strong> — Embed multi-step forecasting and anomaly detection into your data pipelines.</li>
        <li><strong>Document intelligence</strong> — Extract tables, entities, and summaries from PDFs and HTML documents at scale.</li>
      </ul>

      <h2 id="core-apis">Core APIs</h2>
      <div className="docs-card-grid">
        <Link href="/docs/carbon" className="docs-feature-card">
          <span className="docs-feature-icon">🌍</span>
          <strong>Carbon API</strong>
          <span>CNN-powered emission analysis by country and lifestyle parameters.</span>
        </Link>
        <Link href="/docs/search" className="docs-feature-card">
          <span className="docs-feature-icon">🔍</span>
          <strong>Search API</strong>
          <span>Natural-language semantic search over structured and unstructured data.</span>
        </Link>
        <Link href="/docs/predict" className="docs-feature-card">
          <span className="docs-feature-icon">📈</span>
          <strong>Predictive API</strong>
          <span>Time-series forecasting, anomaly detection, and confidence intervals.</span>
        </Link>
        <Link href="/docs/sdks/js" className="docs-feature-card">
          <span className="docs-feature-icon">📦</span>
          <strong>SDKs</strong>
          <span>Official clients for JS/TS, Python, Go, Rust, Java, and Swift.</span>
        </Link>
      </div>

      <h2 id="prerequisites">Prerequisites</h2>
      <p>To get started you need:</p>
      <ol>
        <li>A Prysel account — <Link href="/create-account" className="inline-link">sign up here</Link></li>
        <li>An API key — generate one from your <Link href="/dashboard" className="inline-link">dashboard</Link></li>
        <li>Basic familiarity with HTTP and JSON</li>
      </ol>
      <p>
        Ready? Head to the <Link href="/docs/quickstart" className="inline-link">Quickstart →</Link>
      </p>
    </DocsLayout>
  )
}

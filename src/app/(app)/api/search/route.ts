import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

const staticDocs = [
  { title: 'Introduction & Platform Overview', category: 'Docs', href: '/docs', description: 'Overview of APIs, SDKs, and platform capabilities.' },
  { title: 'Quickstart Guide', category: 'Docs', href: '/docs/quickstart', description: 'Get up and running with your first API request.' },
  { title: 'Authentication & API Keys', category: 'Docs', href: '/docs/authentication', description: 'Manage API keys and authentication headers.' },
  { title: 'Carbon API', category: 'Docs', href: '/docs/carbon', description: 'CNN-powered carbon footprint calculation and emissions analysis.' },
  { title: 'Search API', category: 'Docs', href: '/docs/search', description: 'Semantic search over structured and unstructured data.' },
  { title: 'Predictive Analytics API', category: 'Docs', href: '/docs/predict', description: 'Time-series forecasting and anomaly detection.' },
  { title: 'Software Development Kits (SDKs)', category: 'Docs', href: '/docs/sdks', description: 'Official client libraries for JS/TS, Python, Go, and Swift.' },
  { title: 'API Reference & Rate Limits', category: 'Docs', href: '/docs/reference', description: 'Detailed endpoint schemas, status codes, and rate limits.' },
]

const staticResearch = [
  { title: 'Advances in Sparse Neural Architectures', category: 'Research', href: '/research', description: 'Sparse transformer architectures for real-time market analysis.' },
  { title: 'Prysel API v3', category: 'Research', href: '/research', description: 'Unified intelligence layer release notes and capabilities.' },
  { title: 'Interpretability Tooling for Decision Systems', category: 'Research', href: '/research', description: 'Auditing model decisions in regulated industries.' },
  { title: 'Chain-of-Thought Distillation', category: 'Research', href: '/research', description: 'Compact analytics models with preserved reasoning.' },
  { title: 'Semantic Search Across Data Warehouses', category: 'Research', href: '/research', description: 'RAG pipeline over petabyte-scale columnar stores.' },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim() || ''

  if (!q) {
    return NextResponse.json({ products: [], docs: [], research: [] })
  }

  const queryLower = q.toLowerCase()

  // 1. Search products via Payload CMS
  let products: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'products',
      draft: false,
      limit: 5,
      where: {
        or: [
          { title: { like: q } },
          { description: { like: q } },
        ],
      },
    })
    products = result.docs.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      priceInUSD: p.priceInUSD,
      category: 'Product',
      href: `/products/${p.slug}`,
    }))
  } catch (err) {
    // Fallback if db is unavailable
  }

  // 2. Search Docs items
  const matchedDocs = staticDocs.filter(
    (d) =>
      d.title.toLowerCase().includes(queryLower) ||
      d.description.toLowerCase().includes(queryLower),
  )

  // 3. Search Research items
  const matchedResearch = staticResearch.filter(
    (r) =>
      r.title.toLowerCase().includes(queryLower) ||
      r.description.toLowerCase().includes(queryLower),
  )

  return NextResponse.json({
    products,
    docs: matchedDocs,
    research: matchedResearch,
  })
}

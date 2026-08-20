import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'API — Prysel',
  description: 'Integrate the Prysel intelligence layer into your stack.',
}

const CAPABILITIES = [
  {
    icon: '🌍',
    title: 'Carbon Footprint Analysis',
    desc: 'POST emission parameters (country, transport, electricity, diet, waste) and receive a detailed CO₂ breakdown, country comparisons, and reduction tips — powered by our CNN model.',
    endpoint: 'POST /v1/carbon/calculate',
    tag: 'Carbon',
  },
  {
    icon: '🔍',
    title: 'Semantic Search',
    desc: 'Natural-language queries over your structured or unstructured data. Returns ranked results with relevance scores and optional snippet highlights.',
    endpoint: 'POST /v1/search',
    tag: 'Search',
  },
  {
    icon: '📈',
    title: 'Predictive Analytics',
    desc: 'Submit time-series data and receive multi-step forecasts, anomaly scores, and confidence intervals in one call.',
    endpoint: 'POST /v1/predict',
    tag: 'ML',
  },
  {
    icon: '💬',
    title: 'Intelligence Q&A',
    desc: 'Ask questions in natural language about your data or our research corpus. Streaming responses supported.',
    endpoint: 'POST /v1/chat',
    tag: 'NLP',
  },
  {
    icon: '📄',
    title: 'Document Intelligence',
    desc: 'Extract structured information from PDFs, reports, and HTML documents — entities, tables, summaries, and more.',
    endpoint: 'POST /v1/documents/extract',
    tag: 'Extraction',
  },
  {
    icon: '⚡',
    title: 'Streaming Responses',
    desc: 'All inference endpoints support Server-Sent Events for real-time token streaming. Add `stream: true` to any request body.',
    endpoint: 'stream: true',
    tag: 'Infra',
  },
]

const QUICK_EXAMPLE = `curl https://api.prysel.com/v1/carbon/calculate \\
  -H "Authorization: Bearer sk-ca-YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "country": "Germany",
    "daily_commute_km": 20,
    "monthly_electricity_kwh": 300,
    "weekly_waste_kg": 8,
    "meals_per_day": 3
  }'`

const RESPONSE_EXAMPLE = `{
  "total_tonnes_year": 6.12,
  "country_average": 8.4,
  "verdict": "below_average",
  "breakdown": {
    "transportation": 1.26,
    "electricity": 1.37,
    "diet": 2.74,
    "waste": 0.75
  },
  "reduction_tips": [
    "Switch to an EV or public transport",
    "Reduce meat consumption by 2 meals/week"
  ]
}`

const TAG_COLORS: Record<string, string> = {
  Carbon: 'research-tag--safety',
  Search: 'research-tag--research',
  ML: 'research-tag--product',
  NLP: 'research-tag--product',
  Extraction: 'research-tag--company',
  Infra: 'research-tag--research',
}

export default function ApiPage() {
  return (
    <div className="static-page api-welcome-page">
      {/* Hero */}
      <div className="static-page-hero api-hero">
        <div className="static-container">
          <div className="api-hero-badge">
            <span className="dash-beta-badge">API</span>
            <span className="api-hero-version">v1 · REST & GraphQL · Streaming</span>
          </div>
          <h1 className="static-title api-hero-title">
            Hello, developer.<br />
            <em>Here&apos;s what you can build.</em>
          </h1>
          <p className="static-subtitle">
            The Prysel API gives you programmatic access to carbon footprint analysis,
            semantic search, predictive models, and document intelligence — all from a single,
            consistent interface.
          </p>
          <div className="static-hero-actions">
            <Link href="/create-account" className="btn-primary-lg">Get your API key</Link>
            <Link href="/docs" className="btn-ghost-lg">Read the docs →</Link>
          </div>
        </div>
      </div>

      {/* Capabilities grid */}
      <div className="static-container">
        <div className="api-section">
          <h2 className="api-section-title">What you can do</h2>
          <div className="api-capabilities-grid">
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} className="api-cap-card">
                <div className="api-cap-top">
                  <span className="api-cap-icon">{cap.icon}</span>
                  <span className={`research-tag ${TAG_COLORS[cap.tag]}`}>{cap.tag}</span>
                </div>
                <h3 className="api-cap-title">{cap.title}</h3>
                <p className="api-cap-desc">{cap.desc}</p>
                <code className="api-cap-endpoint">{cap.endpoint}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Code example */}
        <div className="api-section">
          <h2 className="api-section-title">Try it in 60 seconds</h2>
          <div className="api-code-grid">
            <div>
              <div className="api-code-label">Request</div>
              <pre className="api-code-block">{QUICK_EXAMPLE}</pre>
            </div>
            <div>
              <div className="api-code-label">Response</div>
              <pre className="api-code-block api-code-response">{RESPONSE_EXAMPLE}</pre>
            </div>
          </div>
        </div>

        {/* Auth info */}
        <div className="api-section api-auth-section">
          <div className="api-auth-icon">🔑</div>
          <div>
            <h2 className="api-auth-title">Authentication</h2>
            <p className="api-auth-desc">
              All requests require a Bearer token in the <code className="api-inline-code">Authorization</code> header.
              Generate a key from your{' '}
              <Link href="/dashboard" className="inline-link">dashboard</Link> or{' '}
              <Link href="/create-account" className="inline-link">create an account</Link> to get started.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="api-bottom-links">
          <Link href="/docs" className="api-bottom-card">
            <span className="api-bottom-icon">📖</span>
            <div>
              <div className="api-bottom-title">Full Documentation</div>
              <div className="api-bottom-sub">Guides, references, and tutorials</div>
            </div>
            <span className="api-bottom-arrow">→</span>
          </Link>
          <Link href="/sdks" className="api-bottom-card">
            <span className="api-bottom-icon">📦</span>
            <div>
              <div className="api-bottom-title">SDKs</div>
              <div className="api-bottom-sub">JS, Python, Go, Rust, Java, Swift</div>
            </div>
            <span className="api-bottom-arrow">→</span>
          </Link>
          <Link href="/status" className="api-bottom-card">
            <span className="api-bottom-icon">✅</span>
            <div>
              <div className="api-bottom-title">System Status</div>
              <div className="api-bottom-sub">Real-time uptime and incidents</div>
            </div>
            <span className="api-bottom-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

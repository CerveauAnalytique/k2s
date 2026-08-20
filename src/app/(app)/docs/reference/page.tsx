import type { Metadata } from 'next'
import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'

export const metadata: Metadata = { title: 'API Reference — Prysel Docs' }

const TOC = [
  { id: 'base-url', title: 'Base URL', level: 2 },
  { id: 'versioning', title: 'Versioning', level: 2 },
  { id: 'endpoints', title: 'Endpoints', level: 2 },
  { id: 'rate-limits', title: 'Rate Limits', level: 2 },
  { id: 'errors', title: 'Error Format', level: 2 },
]

const ENDPOINTS = [
  { method: 'POST', path: '/v1/carbon/calculate', desc: 'Calculate carbon footprint' },
  { method: 'GET',  path: '/v1/carbon/averages', desc: 'Retrieve country CO₂ averages' },
  { method: 'GET',  path: '/v1/carbon/factors', desc: 'Retrieve emission factors' },
  { method: 'POST', path: '/v1/search', desc: 'Semantic search' },
  { method: 'POST', path: '/v1/predict', desc: 'Time-series prediction' },
  { method: 'POST', path: '/v1/documents/extract', desc: 'Document intelligence extraction' },
  { method: 'POST', path: '/v1/chat', desc: 'Intelligence Q&A (streaming)' },
  { method: 'GET',  path: '/v1/keys', desc: 'List API keys' },
  { method: 'POST', path: '/v1/keys', desc: 'Create API key' },
  { method: 'DELETE', path: '/v1/keys/{id}', desc: 'Revoke API key' },
]

const METHOD_COLORS: Record<string, string> = {
  GET: 'docs-method--get',
  POST: 'docs-method--post',
  DELETE: 'docs-method--delete',
}

export default function ReferenceDocsPage() {
  return (
    <DocsLayout
      title="API Reference"
      description="Complete endpoint reference for the Prysel REST API."
      toc={TOC}
    >
      <h2 id="base-url">Base URL</h2>
      <pre className="docs-code-block"><code>https://api.prysel.com</code></pre>

      <h2 id="versioning">Versioning</h2>
      <p>
        The current stable version is <code>v1</code>. The version is included in every URL path.
        We follow semantic versioning — breaking changes only in major version bumps with 30 days notice.
      </p>

      <h2 id="endpoints">Endpoints</h2>
      <div className="docs-endpoint-list">
        {ENDPOINTS.map((ep) => (
          <div key={ep.path} className="docs-endpoint-row">
            <span className={`docs-method-badge ${METHOD_COLORS[ep.method]}`}>{ep.method}</span>
            <code className="docs-endpoint-path">{ep.path}</code>
            <span className="docs-endpoint-desc">{ep.desc}</span>
          </div>
        ))}
      </div>

      <h2 id="rate-limits">Rate Limits</h2>
      <table className="docs-table">
        <thead><tr><th>Plan</th><th>Requests/min</th><th>Requests/month</th></tr></thead>
        <tbody>
          <tr><td>Starter</td><td>60</td><td>10,000</td></tr>
          <tr><td>Pro</td><td>600</td><td>500,000</td></tr>
          <tr><td>Enterprise</td><td>Custom</td><td>Unlimited</td></tr>
        </tbody>
      </table>
      <p>
        Rate limit headers are returned on every response: <code>X-RateLimit-Limit</code>,{' '}
        <code>X-RateLimit-Remaining</code>, and <code>X-RateLimit-Reset</code>.
      </p>

      <h2 id="errors">Error Format</h2>
      <p>All errors return a JSON body with the following shape:</p>
      <pre className="docs-code-block"><code>{`{
  "error": {
    "code": "invalid_key",
    "message": "The provided API key is invalid or has been revoked.",
    "status": 401
  }
}`}</code></pre>
    </DocsLayout>
  )
}

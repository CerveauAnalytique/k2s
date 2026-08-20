import type { Metadata } from 'next'
import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'

export const metadata: Metadata = { title: 'Authentication — Prysel Docs' }

const TOC = [
  { id: 'api-keys', title: 'API Keys', level: 2 },
  { id: 'bearer-auth', title: 'Bearer Token Auth', level: 2 },
  { id: 'scopes', title: 'Key Scopes', level: 2 },
  { id: 'rotation', title: 'Key Rotation', level: 2 },
  { id: 'errors', title: 'Auth Errors', level: 2 },
]

export default function AuthPage() {
  return (
    <DocsLayout
      title="Authentication"
      description="Authenticate with the Prysel API using API keys."
      toc={TOC}
      prevPage={{ title: 'Quickstart', href: '/docs/quickstart' }}
      nextPage={{ title: 'Your First Request', href: '/docs/first-request' }}
    >
      <h2 id="api-keys">API Keys</h2>
      <p>
        All API requests must be authenticated using an API key. Keys are prefixed with <code>sk-ca-</code>{' '}
        and tied to your account. Generate them from your{' '}
        <a href="/dashboard" className="inline-link">dashboard</a>.
      </p>

      <div className="docs-callout docs-callout--info">
        <strong>Environment variables:</strong> Store your key in <code>CA_API_KEY</code> (or any name you prefer) and never hardcode it in source files.
      </div>

      <h2 id="bearer-auth">Bearer Token Auth</h2>
      <p>Pass your key as an HTTP <code>Authorization</code> header:</p>
      <pre className="docs-code-block"><code>Authorization: Bearer sk-ca-YOUR_KEY</code></pre>

      <p>Example:</p>
      <pre className="docs-code-block"><code>{`curl https://api.prysel.com/v1/carbon/calculate \\
  -H "Authorization: Bearer sk-ca-YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "country": "UK", "daily_commute_km": 15, ... }'`}</code></pre>

      <h2 id="scopes">Key Scopes</h2>
      <table className="docs-table">
        <thead><tr><th>Scope</th><th>Access</th></tr></thead>
        <tbody>
          <tr><td><code>carbon:read</code></td><td>Run carbon analyses and read results</td></tr>
          <tr><td><code>search:read</code></td><td>Perform semantic search queries</td></tr>
          <tr><td><code>predict:read</code></td><td>Submit prediction jobs and read results</td></tr>
          <tr><td><code>admin</code></td><td>Full access including key management</td></tr>
        </tbody>
      </table>
      <p>Keys generated from the dashboard have <code>admin</code> scope by default. Use the API to create restricted keys for production services.</p>

      <h2 id="rotation">Key Rotation</h2>
      <p>
        Rotate keys regularly or immediately if compromised. Revoke old keys from the dashboard or via:
      </p>
      <pre className="docs-code-block"><code>{`curl -X DELETE https://api.prysel.com/v1/keys/{key_id} \\
  -H "Authorization: Bearer sk-ca-ADMIN_KEY"`}</code></pre>

      <h2 id="errors">Auth Errors</h2>
      <table className="docs-table">
        <thead><tr><th>Status</th><th>Code</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td>401</td><td><code>unauthorized</code></td><td>Missing or malformed Authorization header</td></tr>
          <tr><td>401</td><td><code>invalid_key</code></td><td>Key does not exist or has been revoked</td></tr>
          <tr><td>403</td><td><code>insufficient_scope</code></td><td>Key lacks required scope for this endpoint</td></tr>
          <tr><td>429</td><td><code>rate_limited</code></td><td>Too many requests — see rate limits</td></tr>
        </tbody>
      </table>
    </DocsLayout>
  )
}

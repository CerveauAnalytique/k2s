import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'SDKs — Prysel',
  description: 'Official client SDKs for the Prysel API.',
}

const sdks = [
  { id: 'js', lang: 'JavaScript / TypeScript', icon: '🟨', install: 'npm install @prysel/sdk', status: 'Stable', version: 'v3.1.0', docs: '/docs/sdks/js' },
  { id: 'python', lang: 'Python', icon: '🐍', install: 'pip install prysel', status: 'Stable', version: 'v3.0.4', docs: '/docs/sdks/python' },
  { id: 'go', lang: 'Go', icon: '🔵', install: 'go get github.com/prysel/sdk-go', status: 'Stable', version: 'v3.0.1', docs: '/docs/sdks/go' },
  { id: 'rust', lang: 'Rust', icon: '🦀', install: 'cargo add prysel', status: 'Beta', version: 'v0.9.0', docs: '/docs/sdks/rust' },
  { id: 'java', lang: 'Java / Kotlin', icon: '☕', install: 'implementation "io.prysel:sdk:3.0.0"', status: 'Stable', version: 'v3.0.0', docs: '/docs/sdks/java' },
  { id: 'swift', lang: 'Swift', icon: '🍎', install: '.package(url: "https://github.com/prysel/sdk-swift", ...)', status: 'Beta', version: 'v0.7.0', docs: '/docs/sdks/swift' },
]

export default function SdksPage() {
  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">SDKs</p>
          <h1 className="static-title">Your language, our intelligence</h1>
          <p className="static-subtitle">
            Official SDKs with first-class TypeScript types, async streaming, and automatic retries.
          </p>
        </div>
      </div>

      <div className="static-container">
        <div className="sdk-grid">
          {sdks.map((sdk) => (
            <div key={sdk.id} id={sdk.id} className="sdk-card">
              <div className="sdk-card-header">
                <span className="sdk-icon">{sdk.icon}</span>
                <div>
                  <h2 className="sdk-lang">{sdk.lang}</h2>
                  <div className="sdk-meta">
                    <span className={`sdk-status ${sdk.status === 'Beta' ? 'sdk-status--beta' : ''}`}>{sdk.status}</span>
                    <span className="sdk-version">{sdk.version}</span>
                  </div>
                </div>
              </div>
              <code className="sdk-install">{sdk.install}</code>
              <Link href={sdk.docs} className="sdk-docs-link">View docs →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

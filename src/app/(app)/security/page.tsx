import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Security — Prysel',
  description: 'Our commitment to security and responsible disclosure.',
}

const measures = [
  { icon: '🔒', title: 'Data Encryption', body: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3+).' },
  { icon: '🛡️', title: 'SOC 2 Type II', body: 'We maintain SOC 2 Type II certification, audited annually by an independent third party.' },
  { icon: '🔑', title: 'Zero-trust Access', body: 'Internal systems follow a zero-trust architecture. No standing privilege.' },
  { icon: '🧪', title: 'Penetration Testing', body: 'External penetration tests are conducted twice per year.' },
]

export default function SecurityPage() {
  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">Security</p>
          <h1 className="static-title">Security is built in, not bolted on</h1>
          <p className="static-subtitle">
            Responsible disclosure, security measures, and our commitment to keeping your data safe.
          </p>
        </div>
      </div>
      <div className="static-container">
        <div className="values-grid">
          {measures.map((m) => (
            <div key={m.title} className="value-card">
              <span className="value-icon">{m.icon}</span>
              <h3 className="value-title">{m.title}</h3>
              <p className="value-body">{m.body}</p>
            </div>
          ))}
        </div>

        <div className="about-section" style={{ marginTop: '3rem' }}>
          <h2 className="about-section-title">Responsible Disclosure</h2>
          <p className="about-body">
            If you believe you have found a security vulnerability, please report it to{' '}
            <a href="mailto:security@prysel.com" className="inline-link">
              security@prysel.com
            </a>
            . We will acknowledge your report within 24 hours and keep you informed as we work to
            resolve it. We ask that you give us a reasonable time to address the issue before public
            disclosure.
          </p>
        </div>
      </div>
    </div>
  )
}

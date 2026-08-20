import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Community — Prysel',
  description: 'Join the Prysel developer community.',
}

const channels = [
  { icon: '💬', name: 'Discord', desc: '4,200+ developers sharing tips, asking questions, and building together.', cta: 'Join Discord', href: 'https://discord.gg/prysel' },
  { icon: '🐙', name: 'GitHub', desc: 'Browse open-source SDKs, examples, and contribute to our tooling.', cta: 'View GitHub', href: 'https://github.com/prysel' },
  { icon: '🐦', name: 'X / Twitter', desc: 'Follow for product updates, research drops, and team thoughts.', cta: 'Follow us', href: 'https://x.com/prysel' },
  { icon: '📧', name: 'Newsletter', desc: 'Monthly digest of research highlights and platform updates.', cta: 'Subscribe', href: '#newsletter' },
]

export default function CommunityPage() {
  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">Community</p>
          <h1 className="static-title">Join builders like you</h1>
          <p className="static-subtitle">
            Connect with developers building intelligent products on the Prysel platform.
          </p>
        </div>
      </div>

      <div className="static-container">
        <div className="community-grid">
          {channels.map((ch) => (
            <a key={ch.name} href={ch.href} target="_blank" rel="noreferrer" className="community-card">
              <span className="community-icon">{ch.icon}</span>
              <h2 className="community-name">{ch.name}</h2>
              <p className="community-desc">{ch.desc}</p>
              <span className="community-cta">{ch.cta} →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Press — Prysel',
  description: 'Press kit, media coverage, and contact information for journalists.',
}

const coverage = [
  { outlet: 'TechCrunch', headline: 'Prysel Raises $120M to Power Real-Time AI Analytics', date: 'Jun 10, 2026', href: '#' },
  { outlet: 'The Information', headline: 'The Quiet Infrastructure Play Powering a New Generation of AI Products', date: 'May 5, 2026', href: '#' },
  { outlet: 'VentureBeat', headline: 'How Prysel is Closing the Data-to-Decision Gap', date: 'Apr 18, 2026', href: '#' },
]

export default function PressPage() {
  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">Press</p>
          <h1 className="static-title">In the news</h1>
          <p className="static-subtitle">
            For media inquiries, please contact{' '}
            <a href="mailto:press@prysel.com" className="inline-link">
              press@prysel.com
            </a>
          </p>
        </div>
      </div>

      <div className="static-container">
        <h2 className="careers-section-title">Recent coverage</h2>
        <div className="press-list">
          {coverage.map((item) => (
            <a key={item.headline} href={item.href} className="press-card" target="_blank" rel="noreferrer">
              <span className="press-outlet">{item.outlet}</span>
              <p className="press-headline">{item.headline}</p>
              <span className="press-date">{item.date}</span>
            </a>
          ))}
        </div>

        <div className="press-kit-section">
          <h2 className="careers-section-title">Press kit</h2>
          <p className="about-body">
            Download our brand assets including logos, screenshots, and executive headshots.
          </p>
          <a href="/press-kit.zip" className="btn-outline" download>Download press kit</a>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'About Us — Prysel',
  description: 'Learn about Prysel, our mission, team, and values.',
}

const values = [
  { icon: '🔬', title: 'Research-first', body: 'Every feature starts as a research question. We publish openly and hold ourselves to academic rigour.' },
  { icon: '🔐', title: 'Trust by default', body: 'Security, privacy, and interpretability are built in — not bolted on.' },
  { icon: '🤝', title: 'Collaborative', body: 'We work in the open with customers, partners, and the broader AI research community.' },
  { icon: '⚡', title: 'Move deliberately', body: 'Speed matters, but not at the cost of correctness or safety.' },
]

export default function AboutPage() {
  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">About Us</p>
          <h1 className="static-title">The analytical intelligence layer for teams building the future</h1>
          <p className="static-subtitle">
            Prysel was founded in 2022 with a single belief: that the gap between raw data
            and actionable intelligence should be milliseconds, not months.
          </p>
        </div>
      </div>

      <div className="static-container">
        <section className="about-section">
          <h2 className="about-section-title">Our mission</h2>
          <p className="about-body">
            We build the intelligence substrate that powers the next generation of data-driven products.
            From real-time anomaly detection to natural-language querying of petabyte-scale warehouses,
            Prysel compresses the distance between question and answer.
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Our values</h2>
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.title} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-body">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">Investors & backers</h2>
          <p className="about-body">
            Backed by leading technology investors who share our long-term vision for intelligent systems
            in enterprise software.
          </p>
          <div className="investor-pills">
            {['Sequoia Capital', 'Andreessen Horowitz', 'Y Combinator', 'Founders Fund'].map((inv) => (
              <span key={inv} className="investor-pill">{inv}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

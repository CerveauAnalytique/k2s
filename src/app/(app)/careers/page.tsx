import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Careers — Prysel',
  description: 'Join the team building the intelligence substrate for the future.',
}

const openRoles = [
  { title: 'Senior ML Engineer — Retrieval Systems', team: 'Research', location: 'Remote / Paris', href: '/careers/ml-engineer-retrieval' },
  { title: 'Staff Backend Engineer — API Platform', team: 'Engineering', location: 'Remote / New York', href: '/careers/staff-backend' },
  { title: 'Product Designer — Developer Experience', team: 'Design', location: 'Remote', href: '/careers/product-designer-dx' },
  { title: 'Research Scientist — Interpretability', team: 'Research', location: 'Remote / London', href: '/careers/research-scientist-interpretability' },
  { title: 'Developer Advocate', team: 'Developer Relations', location: 'Remote', href: '/careers/devrel' },
]

export default function CareersPage() {
  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">Careers</p>
          <h1 className="static-title">Build the future of analytics intelligence</h1>
          <p className="static-subtitle">
            We are a small, highly-motivated team of researchers and engineers. We move fast, publish
            openly, and care deeply about doing the right thing.
          </p>
        </div>
      </div>

      <div className="static-container">
        <h2 className="careers-section-title">Open roles</h2>
        <div className="careers-list">
          {openRoles.map((role) => (
            <Link key={role.href} href={role.href} className="careers-card">
              <div>
                <h3 className="careers-role-title">{role.title}</h3>
                <div className="careers-role-meta">
                  <span className="careers-team">{role.team}</span>
                  <span className="research-dot" />
                  <span>{role.location}</span>
                </div>
              </div>
              <span className="careers-arrow">→</span>
            </Link>
          ))}
        </div>

        <div className="careers-cta">
          <p>Don&apos;t see your role? We are always looking for exceptional people.</p>
          <Link href="/contact" className="btn-outline">Get in touch</Link>
        </div>
      </div>
    </div>
  )
}

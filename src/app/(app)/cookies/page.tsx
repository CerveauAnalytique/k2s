import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Cookie Policy — Prysel',
  description: 'How and why Prysel uses cookies.',
}

const cookieTypes = [
  { name: 'Essential', desc: 'Required for the platform to function. Cannot be disabled.', examples: 'Session token, CSRF token' },
  { name: 'Analytics', desc: 'Help us understand how visitors interact with our platform.', examples: 'Page views, feature usage counts' },
  { name: 'Preferences', desc: 'Remember your settings and customisations.', examples: 'Theme preference, language' },
  { name: 'Marketing', desc: 'Used to show relevant ads and measure campaign performance.', examples: 'UTM attribution, retargeting' },
]

export default function CookiesPage() {
  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">Legal</p>
          <h1 className="static-title">Cookie Policy</h1>
          <p className="static-subtitle">Last updated: August 19, 2026</p>
        </div>
      </div>
      <div className="static-container legal-content">
        <h2>What are cookies?</h2>
        <p>Cookies are small text files stored on your device by your browser. They help us recognise returning visitors, maintain sessions, and understand how our platform is used.</p>

        <h2>Types of cookies we use</h2>
        <div className="cookie-table-wrap">
          <table className="cookie-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Purpose</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              {cookieTypes.map((ct) => (
                <tr key={ct.name}>
                  <td><strong>{ct.name}</strong></td>
                  <td>{ct.desc}</td>
                  <td className="cookie-examples">{ct.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Managing cookies</h2>
        <p>You can control cookies through your browser settings. Note that disabling essential cookies will impact the functionality of the platform.</p>

        <h2>Contact</h2>
        <p>For questions about our use of cookies, contact <a href="mailto:privacy@prysel.com" className="inline-link">privacy@prysel.com</a>.</p>
      </div>
    </div>
  )
}

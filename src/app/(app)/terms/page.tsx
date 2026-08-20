import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Terms of Service — Prysel',
  description: 'Terms and conditions for using Prysel services.',
}

export default function TermsPage() {
  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">Legal</p>
          <h1 className="static-title">Terms of Service</h1>
          <p className="static-subtitle">Last updated: August 19, 2026</p>
        </div>
      </div>
      <div className="static-container legal-content">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using the Prysel platform and APIs, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
        <h2>2. Use of Services</h2>
        <p>You may use our services only as permitted by law and in accordance with these terms. You must not misuse our services, attempt to circumvent usage limits, or use them in a way that could harm other users.</p>
        <h2>3. API Usage</h2>
        <p>API access is subject to the rate limits and quotas described in your subscription plan. Exceeding limits may result in temporary throttling or suspension of access.</p>
        <h2>4. Intellectual Property</h2>
        <p>All intellectual property rights in our platform belong to Prysel, Inc. You retain all rights to data you submit to our services.</p>
        <h2>5. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, Prysel shall not be liable for indirect, incidental, or consequential damages arising from your use of the platform.</p>
        <h2>6. Governing Law</h2>
        <p>These terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law provisions.</p>
        <h2>7. Contact</h2>
        <p>Questions about these terms? Contact us at <a href="mailto:legal@prysel.com" className="inline-link">legal@prysel.com</a>.</p>
      </div>
    </div>
  )
}

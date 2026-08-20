import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Privacy Policy — Prysel',
  description: 'How Prysel collects, uses, and protects your data.',
}

export default function PrivacyPage() {
  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">Legal</p>
          <h1 className="static-title">Privacy Policy</h1>
          <p className="static-subtitle">Last updated: August 19, 2026</p>
        </div>
      </div>
      <div className="static-container legal-content">
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us (such as account registration details, payment information, and communications with us) and information collected automatically when you use our services (such as usage data, log files, and cookies).</p>
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send transactional and promotional communications, and comply with legal obligations.</p>
        <h2>3. Data Retention</h2>
        <p>We retain personal data for as long as necessary to provide our services and comply with our legal obligations. You may request deletion of your data at any time by contacting privacy@prysel.com.</p>
        <h2>4. Data Sharing</h2>
        <p>We do not sell your personal data. We may share data with service providers who assist us in operating our platform, subject to confidentiality agreements.</p>
        <h2>5. Your Rights</h2>
        <p>Depending on your jurisdiction, you may have rights including access, correction, deletion, portability, and the right to object to certain processing of your personal data.</p>
        <h2>6. Contact</h2>
        <p>For privacy-related inquiries, contact us at <a href="mailto:privacy@prysel.com" className="inline-link">privacy@prysel.com</a>.</p>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'API Access — Prysel',
  description: 'Integrate the Prysel intelligence layer directly into your applications.',
}

const plans = [
  {
    name: 'Starter',
    price: '$49',
    period: '/mo',
    description: 'Perfect for prototyping and small projects.',
    features: ['10,000 API calls/month', 'REST & GraphQL', 'Community support', 'Rate limit: 60 req/min'],
    cta: 'Start free trial',
    href: '/create-account',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$199',
    period: '/mo',
    description: 'For growing teams that need reliability.',
    features: ['500,000 API calls/month', 'Streaming responses', 'Priority support', 'Rate limit: 600 req/min', 'Webhooks'],
    cta: 'Get started',
    href: '/create-account',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Dedicated infrastructure for large-scale use.',
    features: ['Unlimited API calls', 'SLA 99.99%', 'Dedicated support', 'Custom rate limits', 'On-premise option'],
    cta: 'Contact sales',
    href: '/contact',
    highlight: false,
  },
]

export default function ApiAccessPage() {
  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">API Access</p>
          <h1 className="static-title">Power your stack with intelligence</h1>
          <p className="static-subtitle">
            Embed real-time analytics, semantic search, and predictive models into any application with
            our developer-first REST and GraphQL APIs.
          </p>
          <div className="static-hero-actions">
            <Link href="/docs" className="btn-primary-lg">Read the docs</Link>
            <Link href="/create-account" className="btn-ghost-lg">Get API key</Link>
          </div>
        </div>
      </div>

      <div className="static-container">
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={`pricing-card ${plan.highlight ? 'pricing-card--highlight' : ''}`}>
              <div className="pricing-card-header">
                <span className="pricing-plan-name">{plan.name}</span>
                <div className="pricing-price">
                  <span className="pricing-amount">{plan.price}</span>
                  <span className="pricing-period">{plan.period}</span>
                </div>
                <p className="pricing-desc">{plan.description}</p>
              </div>
              <ul className="pricing-features">
                {plan.features.map((f) => (
                  <li key={f} className="pricing-feature">
                    <span className="pricing-check">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className={plan.highlight ? 'btn-primary' : 'btn-outline'}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

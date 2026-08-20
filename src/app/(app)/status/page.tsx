import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'System Status — Prysel',
  description: 'Real-time operational status of Prysel services.',
}

const services = [
  { name: 'API (REST)', status: 'operational', uptime: '99.99%' },
  { name: 'API (GraphQL)', status: 'operational', uptime: '99.98%' },
  { name: 'Streaming Endpoint', status: 'operational', uptime: '99.97%' },
  { name: 'Admin Dashboard', status: 'operational', uptime: '100%' },
  { name: 'Documentation Site', status: 'operational', uptime: '100%' },
  { name: 'Authentication', status: 'operational', uptime: '99.99%' },
  { name: 'Webhooks', status: 'degraded', uptime: '98.12%' },
  { name: 'CDN / Asset Delivery', status: 'operational', uptime: '100%' },
]

const incidents = [
  {
    date: 'Aug 18, 2026',
    title: 'Elevated webhook delivery latency',
    status: 'Investigating',
    body: 'We are seeing elevated p99 latency on webhook deliveries. API calls are unaffected. Our team is investigating.',
  },
]

const statusLabel: Record<string, string> = {
  operational: 'Operational',
  degraded: 'Degraded Performance',
  outage: 'Major Outage',
}

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === 'operational')

  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">System Status</p>
          <h1 className="static-title">
            {allOperational ? '✅ All systems operational' : '⚠️ Some systems degraded'}
          </h1>
          <p className="static-subtitle">Last updated: Aug 19, 2026 — 13:00 UTC</p>
        </div>
      </div>

      <div className="static-container">
        <div className="status-services">
          {services.map((s) => (
            <div key={s.name} className="status-row">
              <span className="status-service-name">{s.name}</span>
              <div className="status-right">
                <span className="status-uptime">{s.uptime}</span>
                <span className={`status-badge status-badge--${s.status}`}>{statusLabel[s.status]}</span>
              </div>
            </div>
          ))}
        </div>

        {incidents.length > 0 && (
          <div className="status-incidents">
            <h2 className="careers-section-title">Active incidents</h2>
            {incidents.map((inc) => (
              <div key={inc.title} className="incident-card">
                <div className="incident-header">
                  <span className="incident-date">{inc.date}</span>
                  <span className="incident-status">{inc.status}</span>
                </div>
                <h3 className="incident-title">{inc.title}</h3>
                <p className="incident-body">{inc.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

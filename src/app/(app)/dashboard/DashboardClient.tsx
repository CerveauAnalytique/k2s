'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CarbonCalculator } from '@/components/CarbonCalculator'

type Props = {
  user: { email: string; name?: string }
}

const NAV_ITEMS = [
  { id: 'overview', label: '🏠 Overview', icon: '🏠' },
  { id: 'carbon', label: '🌍 Carbon Calculator', icon: '🌍' },
  { id: 'api', label: '⚡ API Keys', icon: '⚡' },
  { id: 'history', label: '📋 History', icon: '📋' },
  { id: 'settings', label: '⚙️ Settings', icon: '⚙️' },
]

const STATS = [
  { label: 'API Calls This Month', value: '12,847', delta: '+18%', up: true },
  { label: 'Avg Response Time', value: '84ms', delta: '-12ms', up: true },
  { label: 'Carbon Analyses Run', value: '341', delta: '+24', up: true },
  { label: 'Plan', value: 'Pro', delta: 'Active', up: true },
]

const RECENT_ANALYSES = [
  { country: 'United States', total: '12.4t', date: 'Aug 19, 2026', status: 'above' },
  { country: 'Germany', total: '6.1t', date: 'Aug 15, 2026', status: 'below' },
  { country: 'France', total: '4.2t', date: 'Aug 12, 2026', status: 'below' },
  { country: 'Australia', total: '14.7t', date: 'Aug 8, 2026', status: 'above' },
]

export function DashboardClient({ user }: Props) {
  const [activeTab, setActiveTab] = useState('overview')
  const displayName = user.name || user.email.split('@')[0]

  return (
    <div className="dash-root">
      {/* Beta banner */}
      <div className="dash-beta-banner">
        <span className="dash-beta-badge">BETA</span>
        You are using the Prysel beta dashboard. Features may change.{' '}
        <a href="mailto:feedback@prysel.com" className="dash-beta-link">Send feedback</a>
      </div>

      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-brand">
          <Link href="/" className="dash-brand-link">Prysel</Link>
          <span className="dash-beta-pill">β</span>
        </div>
        <nav className="dash-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`dash-nav-item ${activeTab === item.id ? 'dash-nav-item--active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              <span>{item.label.replace(/^.+ /, '')}</span>
            </button>
          ))}
        </nav>
        <div className="dash-sidebar-footer">
          <div className="dash-user-info">
            <div className="dash-user-avatar">{displayName[0].toUpperCase()}</div>
            <div>
              <div className="dash-user-name">{displayName}</div>
              <div className="dash-user-email">{user.email}</div>
            </div>
          </div>
          <Link href="/logout" className="dash-logout">Sign out</Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="dash-main">
        <div className="dash-topbar">
          <div>
            <h1 className="dash-page-title">
              {activeTab === 'overview' && 'Overview'}
              {activeTab === 'carbon' && 'Carbon Footprint Calculator'}
              {activeTab === 'api' && 'API Keys'}
              {activeTab === 'history' && 'Analysis History'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
            <p className="dash-page-sub">Welcome back, {displayName}</p>
          </div>
          <div className="dash-topbar-actions">
            <Link href="/docs" className="dash-action-link">Docs</Link>
            <Link href="/api-access" className="dash-action-link">API</Link>
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="dash-content">
            {/* Stats row */}
            <div className="dash-stats-grid">
              {STATS.map((s) => (
                <div key={s.label} className="dash-stat-card">
                  <span className="dash-stat-label">{s.label}</span>
                  <span className="dash-stat-value">{s.value}</span>
                  <span className={`dash-stat-delta ${s.up ? 'dash-stat-delta--up' : 'dash-stat-delta--down'}`}>{s.delta}</span>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="dash-section">
              <h2 className="dash-section-title">Quick Actions</h2>
              <div className="dash-quick-grid">
                <button className="dash-quick-card" onClick={() => setActiveTab('carbon')}>
                  <span className="dash-quick-icon">🌍</span>
                  <span className="dash-quick-label">Run Carbon Analysis</span>
                  <span className="dash-quick-desc">Calculate your carbon footprint using our CNN-powered model</span>
                </button>
                <button className="dash-quick-card" onClick={() => setActiveTab('api')}>
                  <span className="dash-quick-icon">⚡</span>
                  <span className="dash-quick-label">Manage API Keys</span>
                  <span className="dash-quick-desc">Create and rotate API keys for programmatic access</span>
                </button>
                <Link href="/docs" className="dash-quick-card">
                  <span className="dash-quick-icon">📖</span>
                  <span className="dash-quick-label">Documentation</span>
                  <span className="dash-quick-desc">Guides, API reference, and SDK examples</span>
                </Link>
                <Link href="/research" className="dash-quick-card">
                  <span className="dash-quick-icon">🔬</span>
                  <span className="dash-quick-label">Research Feed</span>
                  <span className="dash-quick-desc">Latest publications and model updates</span>
                </Link>
              </div>
            </div>

            {/* Recent analyses */}
            <div className="dash-section">
              <h2 className="dash-section-title">Recent Analyses</h2>
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Country</th>
                      <th>Total Emissions</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_ANALYSES.map((a) => (
                      <tr key={a.date + a.country}>
                        <td>{a.country}</td>
                        <td>{a.total}</td>
                        <td>{a.date}</td>
                        <td>
                          <span className={`dash-status-badge dash-status-badge--${a.status}`}>
                            {a.status === 'above' ? '⚠️ Above avg' : '✅ Below avg'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CARBON CALCULATOR */}
        {activeTab === 'carbon' && (
          <div className="dash-content">
            <div className="dash-tool-info">
              <span className="dash-tool-badge">CNN-powered</span>
              <p className="dash-tool-desc">
                Advanced carbon footprint analysis using emission factor models calibrated per country.
                Based on the open-source CFC tool by Priyam Parashar.
              </p>
            </div>
            <CarbonCalculator />
          </div>
        )}

        {/* API KEYS */}
        {activeTab === 'api' && (
          <div className="dash-content">
            <div className="dash-section">
              <h2 className="dash-section-title">Your API Keys</h2>
              <div className="dash-api-key-card">
                <div className="dash-api-key-row">
                  <div>
                    <div className="dash-api-key-name">Production Key</div>
                    <code className="dash-api-key-value">sk-ca-•••••••••••••••••••••••••••••••••Ab7x</code>
                  </div>
                  <div className="dash-api-key-actions">
                    <button className="dash-key-btn">Copy</button>
                    <button className="dash-key-btn dash-key-btn--danger">Revoke</button>
                  </div>
                </div>
              </div>
              <button className="btn-primary" style={{ marginTop: '16px' }}>+ Generate New Key</button>
            </div>
            <div className="dash-section">
              <h2 className="dash-section-title">Usage This Month</h2>
              <div className="dash-usage-bar-wrap">
                <div className="dash-usage-bar-track">
                  <div className="dash-usage-bar-fill" style={{ width: '43%' }} />
                </div>
                <span className="dash-usage-label">12,847 / 30,000 calls (43%)</span>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY */}
        {activeTab === 'history' && (
          <div className="dash-content">
            <div className="dash-table-wrap">
              <table className="dash-table">
                <thead>
                  <tr><th>Country</th><th>Total</th><th>Transport</th><th>Electricity</th><th>Diet</th><th>Waste</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {[
                    ['United States', '12.4t', '3.3t', '2.4t', '5.0t', '1.7t', 'Aug 19'],
                    ['Germany', '6.1t', '2.4t', '1.8t', '3.0t', '1.4t', 'Aug 15'],
                    ['France', '4.2t', '2.1t', '0.8t', '2.0t', '1.3t', 'Aug 12'],
                    ['Australia', '14.7t', '3.6t', '4.1t', '5.0t', '2.0t', 'Aug 8'],
                  ].map((row) => (
                    <tr key={row[6]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="dash-content">
            <div className="dash-section">
              <h2 className="dash-section-title">Account</h2>
              <div className="dash-settings-form">
                <div className="dash-settings-row">
                  <label className="dash-settings-label">Email</label>
                  <input className="dash-settings-input" defaultValue={user.email} readOnly />
                </div>
                <div className="dash-settings-row">
                  <label className="dash-settings-label">Display Name</label>
                  <input className="dash-settings-input" defaultValue={displayName} />
                </div>
                <button className="btn-primary">Save changes</button>
              </div>
            </div>
            <div className="dash-section">
              <h2 className="dash-section-title">Notifications</h2>
              <div className="dash-settings-form">
                {['Weekly carbon report', 'API usage alerts', 'Research digest'].map((n) => (
                  <label key={n} className="dash-toggle-row">
                    <input type="checkbox" defaultChecked className="dash-toggle-input" />
                    <span className="dash-toggle-label">{n}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

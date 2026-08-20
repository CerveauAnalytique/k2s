import type { Metadata } from 'next'
import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Carbon API — Prysel Docs' }

const TOC = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'how-it-works', title: 'How it works', level: 2 },
  { id: 'endpoint', title: 'Endpoint reference', level: 2 },
  { id: 'parameters', title: 'Parameters', level: 2 },
  { id: 'countries', title: 'Supported countries', level: 2 },
  { id: 'example', title: 'Full example', level: 2 },
]

const COUNTRIES = ['India','United States','Germany','Brazil','China','Australia','Canada','UK','France','Japan']

export default function CarbonDocsPage() {
  return (
    <DocsLayout
      title="Carbon API"
      description="Calculate individual or organizational carbon footprints using country-specific emission factors."
      toc={TOC}
      nextPage={{ title: 'Calculate Footprint', href: '/docs/carbon/calculate' }}
    >
      <h2 id="overview">Overview</h2>
      <p>
        The Carbon API exposes our CNN-calibrated emission factor models. Given a set of lifestyle or
        operational parameters, it returns a detailed breakdown of annual CO₂ emissions, a comparison
        with the national average, and personalized reduction tips.
      </p>

      <div className="docs-callout docs-callout--success">
        <strong>Open source basis:</strong> The emission factors and model are adapted from the{' '}
        <a href="https://github.com/ViivianREINE/Carbon-Footprint-Calculator-using-Advanced-Machine-Learning-CNN-" className="inline-link" target="_blank" rel="noreferrer">
          Carbon Footprint Calculator (CNN)
        </a>{' '}
        by Priyam Parashar, extended with country-specific calibration.
      </div>

      <h2 id="how-it-works">How it works</h2>
      <ol>
        <li>You submit emission parameters (commute, electricity, diet, waste) along with a country.</li>
        <li>The model annualizes inputs and multiplies by country-specific emission factors.</li>
        <li>Results are returned in metric tonnes CO₂ per year, broken down by category.</li>
        <li>A comparison with the national per-capita average is included.</li>
      </ol>

      <h2 id="endpoint">Endpoint reference</h2>
      <pre className="docs-code-block"><code>POST https://api.prysel.com/v1/carbon/calculate</code></pre>

      <h2 id="parameters">Parameters</h2>
      <table className="docs-table">
        <thead><tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>country</code></td><td>string</td><td>✓</td><td>One of the supported country names</td></tr>
          <tr><td><code>daily_commute_km</code></td><td>number</td><td>✓</td><td>Average daily commute distance in km</td></tr>
          <tr><td><code>monthly_electricity_kwh</code></td><td>number</td><td>✓</td><td>Monthly household electricity consumption</td></tr>
          <tr><td><code>weekly_waste_kg</code></td><td>number</td><td>✓</td><td>Weekly waste generated in kg</td></tr>
          <tr><td><code>meals_per_day</code></td><td>integer</td><td>✓</td><td>Average number of meals consumed per day (0–10)</td></tr>
        </tbody>
      </table>

      <h2 id="countries">Supported countries</h2>
      <div className="docs-country-pills">
        {COUNTRIES.map((c) => <span key={c} className="docs-country-pill">{c}</span>)}
      </div>
      <p>More countries are added quarterly. Subscribe to the <Link href="/research" className="inline-link">research feed</Link> for announcements.</p>

      <h2 id="example">Full example</h2>
      <pre className="docs-code-block"><code>{`// JavaScript SDK
import { PryselAnalytique } from '@prysel/sdk'

const ca = new PryselAnalytique({ apiKey: process.env.CA_API_KEY })

const result = await ca.carbon.calculate({
  country: 'United States',
  dailyCommuteKm: 30,
  monthlyElectricityKwh: 500,
  weeklyWasteKg: 12,
  mealsPerDay: 3,
})

// result.verdict → 'above_average'
// result.totalTonnesYear → 14.2
// result.breakdown.transportation → 4.1`}</code></pre>
    </DocsLayout>
  )
}

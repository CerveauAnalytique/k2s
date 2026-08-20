import type { Metadata } from 'next'
import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Quickstart — Prysel Docs',
}

const TOC = [
  { id: 'step-1', title: '1. Create an account', level: 2 },
  { id: 'step-2', title: '2. Generate an API key', level: 2 },
  { id: 'step-3', title: '3. Make your first request', level: 2 },
  { id: 'step-4', title: '4. Interpret the response', level: 2 },
  { id: 'next-steps', title: 'Next steps', level: 2 },
]

export default function QuickstartPage() {
  return (
    <DocsLayout
      title="Quickstart"
      description="Get up and running with the Prysel API in under 5 minutes."
      toc={TOC}
      prevPage={{ title: 'Introduction', href: '/docs' }}
      nextPage={{ title: 'Authentication', href: '/docs/authentication' }}
    >
      <h2 id="step-1">1. Create an account</h2>
      <p>
        <Link href="/create-account" className="inline-link">Sign up for a free account</Link>.
        No credit card is required for the Starter plan (10,000 API calls/month).
      </p>

      <h2 id="step-2">2. Generate an API key</h2>
      <p>
        After signing in, navigate to your <Link href="/dashboard" className="inline-link">Dashboard → API Keys</Link>{' '}
        and click <strong>Generate New Key</strong>. Copy the key immediately — it will only be shown once.
      </p>
      <div className="docs-callout docs-callout--warning">
        <strong>Keep your key secret.</strong> Never commit API keys to source control. Use environment variables.
      </div>

      <h2 id="step-3">3. Make your first request</h2>
      <p>Run the following with your terminal:</p>
      <pre className="docs-code-block"><code>{`curl https://api.prysel.com/v1/carbon/calculate \\
  -H "Authorization: Bearer sk-ca-YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "country": "Germany",
    "daily_commute_km": 20,
    "monthly_electricity_kwh": 300,
    "weekly_waste_kg": 8,
    "meals_per_day": 3
  }'`}</code></pre>

      <p>Or using our JavaScript SDK:</p>
      <pre className="docs-code-block"><code>{`import { PryselAnalytique } from '@prysel/sdk'

const ca = new PryselAnalytique({ apiKey: process.env.CA_API_KEY })

const result = await ca.carbon.calculate({
  country: 'Germany',
  dailyCommuteKm: 20,
  monthlyElectricityKwh: 300,
  weeklyWasteKg: 8,
  mealsPerDay: 3,
})

console.log(result.totalTonnesYear) // → 6.12`}</code></pre>

      <h2 id="step-4">4. Interpret the response</h2>
      <pre className="docs-code-block docs-code-block--response"><code>{`{
  "total_tonnes_year": 6.12,
  "country_average": 8.4,
  "verdict": "below_average",
  "breakdown": {
    "transportation": 1.26,
    "electricity": 1.37,
    "diet": 2.74,
    "waste": 0.75
  },
  "reduction_tips": [
    "Switch to an EV or public transport",
    "Reduce meat consumption by 2 meals/week"
  ]
}`}</code></pre>

      <table className="docs-table">
        <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>total_tonnes_year</code></td><td>number</td><td>Total annual CO₂ emissions in metric tonnes</td></tr>
          <tr><td><code>country_average</code></td><td>number</td><td>National per-capita average for the selected country</td></tr>
          <tr><td><code>verdict</code></td><td>string</td><td><code>above_average</code> or <code>below_average</code></td></tr>
          <tr><td><code>breakdown</code></td><td>object</td><td>Per-category emission amounts</td></tr>
          <tr><td><code>reduction_tips</code></td><td>string[]</td><td>Personalised tips based on the highest categories</td></tr>
        </tbody>
      </table>

      <h2 id="next-steps">Next steps</h2>
      <ul>
        <li><Link href="/docs/authentication" className="inline-link">Authentication</Link> — learn about API key rotation and OAuth</li>
        <li><Link href="/docs/carbon" className="inline-link">Carbon API overview</Link> — full parameter reference</li>
        <li><Link href="/docs/sdks/js" className="inline-link">JavaScript SDK</Link> — typed client with streaming support</li>
      </ul>
    </DocsLayout>
  )
}

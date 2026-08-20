import type { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import React from 'react'
import { DashboardClient } from './DashboardClient'

export const metadata: Metadata = {
  title: 'Dashboard — Prysel',
  description: 'Your analytics and carbon footprint intelligence dashboard.',
}

export default async function DashboardPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/login?redirect=/dashboard')
  }

  return <DashboardClient user={{ email: user.email ?? '', name: (user as unknown as Record<string, unknown>).name as string | undefined }} />
}

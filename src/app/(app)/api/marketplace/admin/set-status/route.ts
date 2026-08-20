import { NextResponse } from 'next/server'

import { setAppStatus } from '@/lib/marketplace/api'

export async function POST(request: Request) {
  const form = await request.formData()
  const appId = String(form.get('appId') || '')
  const status = String(form.get('status') || '')

  try {
    await setAppStatus(appId, status)
    return NextResponse.redirect(
      new URL(`/marketplace/admin?success=${encodeURIComponent(`Status set to ${status}`)}`, request.url),
      303,
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Status update failed'
    return NextResponse.redirect(
      new URL(`/marketplace/admin?error=${encodeURIComponent(message)}`, request.url),
      303,
    )
  }
}

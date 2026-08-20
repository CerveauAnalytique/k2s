import { NextResponse } from 'next/server'

import { remoderateApp } from '@/lib/marketplace/api'

export async function POST(request: Request) {
  const form = await request.formData()
  const appId = String(form.get('appId') || '')

  try {
    const result = await remoderateApp(appId)
    return NextResponse.redirect(
      new URL(
        `/marketplace/admin?success=${encodeURIComponent(`Remoderated ${result.name} → ${result.status}`)}`,
        request.url,
      ),
      303,
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Remoderation failed'
    return NextResponse.redirect(
      new URL(`/marketplace/admin?error=${encodeURIComponent(message)}`, request.url),
      303,
    )
  }
}

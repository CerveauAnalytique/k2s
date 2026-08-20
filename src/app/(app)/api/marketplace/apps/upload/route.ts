import { NextResponse } from 'next/server'

import { uploadApp } from '@/lib/marketplace/api'
import { getMarketplaceToken } from '@/lib/marketplace/auth'

export async function POST(request: Request) {
  const token = await getMarketplaceToken()
  if (!token) {
    return NextResponse.redirect(new URL('/marketplace/account/login', request.url), 303)
  }

  try {
    const incoming = await request.formData()
    const outbound = new FormData()
    outbound.set('name', String(incoming.get('name') || ''))
    outbound.set('description', String(incoming.get('description') || ''))
    outbound.set('category', String(incoming.get('category') || 'Utilities'))
    outbound.set('developer', String(incoming.get('developer') || 'Community'))
    outbound.set('price', String(incoming.get('price') || 'Free'))
    outbound.set('version', String(incoming.get('version') || '1.0.0'))
    outbound.set('featured', 'false')

    const pkg = incoming.get('package')
    if (!(pkg instanceof File) || pkg.size === 0) {
      throw new Error('Package file is required.')
    }
    outbound.set('package', pkg, pkg.name)

    const icon = incoming.get('icon')
    if (icon instanceof File && icon.size > 0) {
      outbound.set('icon', icon, icon.name)
    }

    const created = await uploadApp(outbound)
    const note =
      created.status === 'blacklisted'
        ? `“${created.name}” was blacklisted by system AI rules (score ${created.moderation_score ?? 0}). ${created.moderation_notes || ''}`
        : `“${created.name}” published with status ${created.status} (score ${created.moderation_score ?? 0}).`

    const target = new URL(`/marketplace/apps/${created.id}`, request.url)
    if (created.status === 'blacklisted') target.searchParams.set('error', note)
    else target.searchParams.set('ok', note)
    return NextResponse.redirect(target, 303)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.redirect(
      new URL(`/marketplace/apps/upload?error=${encodeURIComponent(message)}`, request.url),
      303,
    )
  }
}

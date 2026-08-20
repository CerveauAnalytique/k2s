import { NextResponse } from 'next/server'

import { createRule } from '@/lib/marketplace/api'

export async function POST(request: Request) {
  const form = await request.formData()
  const minRaw = String(form.get('min_description_length') || '').trim()

  try {
    await createRule({
      title: String(form.get('title') || ''),
      description: String(form.get('description') || ''),
      severity: String(form.get('severity') || 'block'),
      pattern: String(form.get('pattern') || '') || null,
      code: String(form.get('code') || '') || null,
      min_description_length: minRaw ? Number(minRaw) : null,
    })
    return NextResponse.redirect(
      new URL(`/marketplace/admin?success=${encodeURIComponent('Rule created')}`, request.url),
      303,
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Rule create failed'
    return NextResponse.redirect(
      new URL(`/marketplace/admin?error=${encodeURIComponent(message)}`, request.url),
      303,
    )
  }
}

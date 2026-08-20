import { NextResponse } from 'next/server'

import { setUserRole } from '@/lib/marketplace/api'

export async function POST(request: Request) {
  const form = await request.formData()
  const userId = String(form.get('userId') || '')
  const role = String(form.get('role') || 'user')

  try {
    await setUserRole(userId, role)
    return NextResponse.redirect(
      new URL(`/marketplace/admin?success=${encodeURIComponent('Role updated')}`, request.url),
      303,
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Role update failed'
    return NextResponse.redirect(
      new URL(`/marketplace/admin?error=${encodeURIComponent(message)}`, request.url),
      303,
    )
  }
}

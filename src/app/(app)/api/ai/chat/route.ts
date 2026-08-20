import { NextResponse } from 'next/server'

import { getAiHealth, runNeuriyChat, type ChatMessage } from '@/lib/ai/chat'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const health = await getAiHealth()
  return NextResponse.json({
    ok: Boolean((health.frc as { ok?: boolean })?.ok || (health.ellofive as { ok?: boolean })?.ok),
    ...health,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = String(body.message || body.prompt || '').trim()
    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    const history: ChatMessage[] = Array.isArray(body.messages)
      ? body.messages
          .filter(
            (m: unknown): m is ChatMessage =>
              Boolean(m) &&
              typeof m === 'object' &&
              ['user', 'assistant', 'system'].includes(String((m as ChatMessage).role)) &&
              typeof (m as ChatMessage).content === 'string',
          )
          .map((m: ChatMessage) => ({ role: m.role, content: String(m.content).slice(0, 8000) }))
      : []

    const result = await runNeuriyChat({
      message,
      history,
      sessionId: typeof body.sessionId === 'string' ? body.sessionId : undefined,
      system: typeof body.system === 'string' ? body.system : undefined,
    })

    return NextResponse.json({
      status: 'completed',
      content: result.content,
      message: { role: 'assistant', content: result.content },
      model: result.model,
      sessionId: result.sessionId,
      engine: result.engine,
    })
  } catch (error) {
    console.error('[ai/chat]', error)
    const message = error instanceof Error ? error.message : 'AI chat failed'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}

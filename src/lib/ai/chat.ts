import { ELLOFIVE_API_URL, FRC_API_KEY, FRC_URL, NEURIY_CHAT_MODEL } from './config'

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export type ChatResult = {
  content: string
  model: string
  sessionId?: string
  engine: 'frc7+ellofive' | 'frc7' | 'ellofive'
  raw?: unknown
}

async function frcChat(payload: {
  message?: string
  messages?: ChatMessage[]
  sessionId?: string
  model?: string
  system?: string
}): Promise<ChatResult> {
  const res = await fetch(`${FRC_URL}/v1/chat`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': FRC_API_KEY,
    },
    body: JSON.stringify({
      model: payload.model || NEURIY_CHAT_MODEL,
      message: payload.message,
      messages: payload.messages,
      sessionId: payload.sessionId,
      system: payload.system,
      tools: true,
    }),
    cache: 'no-store',
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(typeof data.error === 'string' ? data.error : `FRC7 chat failed (${res.status})`)
  }

  const content =
    data.output ||
    data.message?.content ||
    data.reply ||
    data.choices?.[0]?.message?.content ||
    data.result?.output ||
    ''

  if (!String(content).trim()) {
    throw new Error('FRC7 returned an empty response')
  }

  return {
    content: String(content).trim(),
    model: data.model || payload.model || NEURIY_CHAT_MODEL,
    sessionId: data.sessionId || data.session_id,
    engine: data.provider === 'openai-compatible' || data.remote ? 'frc7+ellofive' : 'frc7',
    raw: data,
  }
}

async function elloFiveChat(messages: ChatMessage[], model?: string): Promise<ChatResult> {
  const res = await fetch(`${ELLOFIVE_API_URL}/v1/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ messages, model }),
    cache: 'no-store',
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(typeof data.error === 'string' ? data.error : `ElloFive chat failed (${res.status})`)
  }
  const content = data.output || data.message?.content || ''
  if (!String(content).trim()) {
    throw new Error('ElloFive returned an empty response')
  }
  return {
    content: String(content).trim(),
    model: data.model || model || 'ellofive',
    engine: 'ellofive',
    raw: data,
  }
}

/**
 * Preferred path: FRC7 gateway (Neuriy orchestration) → ElloFive when configured.
 * Fallback: direct ElloFive if FRC7 is down.
 */
export async function runNeuriyChat(input: {
  message: string
  history?: ChatMessage[]
  sessionId?: string
  system?: string
}): Promise<ChatResult> {
  const message = input.message.trim()
  if (!message) throw new Error('Message is required')
  if (message.length > 8000) throw new Error('Message is too long')

  const history = (input.history || []).slice(-20)
  const system =
    input.system ||
    'You are Neuriy AI for Cerveau Analytique — an analytical intelligence assistant. Be clear, accurate, and helpful.'

  try {
    return await frcChat({
      message,
      messages: [{ role: 'system', content: system }, ...history, { role: 'user', content: message }],
      sessionId: input.sessionId,
      system,
    })
  } catch (frcError) {
    try {
      return await elloFiveChat(
        [{ role: 'system', content: system }, ...history, { role: 'user', content: message }],
      )
    } catch {
      throw frcError instanceof Error ? frcError : new Error('AI chat unavailable')
    }
  }
}

export async function getAiHealth(): Promise<{
  frc: unknown
  ellofive: unknown
}> {
  const [frc, ellofive] = await Promise.all([
    fetch(`${FRC_URL}/health`, { cache: 'no-store' })
      .then(async (r) => ({ ok: r.ok, ...(await r.json().catch(() => ({}))) }))
      .catch((e) => ({ ok: false, error: e instanceof Error ? e.message : 'unreachable' })),
    fetch(`${ELLOFIVE_API_URL}/health`, { cache: 'no-store' })
      .then(async (r) => ({ ok: r.ok, ...(await r.json().catch(() => ({}))) }))
      .catch((e) => ({ ok: false, error: e instanceof Error ? e.message : 'unreachable' })),
  ])
  return { frc, ellofive }
}

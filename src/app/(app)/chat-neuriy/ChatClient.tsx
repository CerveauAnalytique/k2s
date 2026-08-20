'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Bot, Send, User, Sparkles, AlertCircle } from 'lucide-react'

type Role = 'user' | 'assistant'

interface Message {
  id: string
  role: Role
  content: string
}

export default function ChatNeuriyPage() {
  const searchParams = useSearchParams()
  const initialQ = useMemo(() => searchParams.get('q')?.trim() || '', [searchParams])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Neuriy AI is connected through FRC7 chat support and the ElloFive engine. Ask about models, APIs, research, or carbon analysis.',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | undefined>()
  const bootstrapped = useRef(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (raw: string) => {
    const text = raw.trim()
    if (!text || loading) return

    const userMsg: Message = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: text,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const history = [...messages, userMsg]
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message: text,
          messages: history,
          sessionId,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Chat request failed')
      }

      const content =
        data.content || data.message?.content || data.output || 'No response returned from the AI engine.'

      if (typeof data.sessionId === 'string') setSessionId(data.sessionId)

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          content: String(content),
        },
      ])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to reach the AI engine'
      setError(message)
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          content: `I couldn’t complete that request: ${message}`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!initialQ || bootstrapped.current || loading) return
    bootstrapped.current = true
    // Defer so the first paint mounts handlers before auto-send
    const t = window.setTimeout(() => {
      void sendMessage(initialQ)
    }, 50)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage(input)
  }

  return (
    <div className="container max-w-4xl py-8 min-h-[calc(100vh-140px)] flex flex-col">
      <header className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-bold">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">Chat Neuriy AI</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              FRC7 chat support · ElloFive engine · Cerveau Analytique
            </p>
          </div>
        </div>
      </header>

      {error ? (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <main className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  m.role === 'user'
                    ? 'bg-neutral-900 text-white dark:bg-neutral-200 dark:text-black ml-3'
                    : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white mr-3'
                }`}
              >
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-medium rounded-tr-none'
                    : 'bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-none'
                }`}
              >
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 p-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl rounded-tl-none text-xs text-neutral-500 dark:text-neutral-400">
              <Bot className="w-4 h-4 animate-pulse" /> Neuriy AI is thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </main>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Neuriy AI anything…"
          disabled={loading}
          className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-neutral-400 dark:focus:border-neutral-600 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </form>
    </div>
  )
}

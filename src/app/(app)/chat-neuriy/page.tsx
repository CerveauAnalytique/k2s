'use client'

import React, { useState } from 'react'
import { Bot, Send, User, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPryselPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Hello! I am Prysel AI, your analytical intelligence assistant. How can I assist you with models, APIs, datasets, or carbon emissions analysis today?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = getAiReply(userMsg.content)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: botResponse,
        },
      ])
      setLoading(false)
    }, 600)
  }

  const getAiReply = (query: string): string => {
    const q = query.toLowerCase()
    if (q.includes('carbon') || q.includes('emission')) {
      return 'The Carbon API leverages CNN-based satellite and lifestyle parameters to compute accurate footprint estimates. You can query endpoints under /docs/carbon.'
    } else if (q.includes('api') || q.includes('sdk')) {
      return 'Our unified API v3 supports structured data queries and predictive analytics behind a single REST/SDK interface. Check out /docs for SDK installation guides.'
    } else if (q.includes('shop') || q.includes('product')) {
      return 'You can explore all analytics hardware, access tokens, and merchandise directly in our Products Shop at /shop.'
    }
    return `Thank you for your message regarding "${query}". The Prysel AI engine is ready to assist. Check our documentation at /docs for deeper integration guides.`
  }

  return (
    <div className="container max-w-4xl py-8 min-h-[calc(100vh-140px)] flex flex-col">
      <header className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 border border-neutral-700 text-white font-bold">
            <Sparkles className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Chat Prysel AI</h1>
            <p className="text-xs text-neutral-400">
              Interactive AI Assistant • Prysel Intelligence System
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start max-w-[85%] ${
                m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  m.role === 'user'
                    ? 'bg-neutral-200 text-black ml-3'
                    : 'bg-neutral-800 border border-neutral-700 text-white mr-3'
                }`}
              >
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-gold" />}
              </div>
              <div
                className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-white text-black font-medium rounded-tr-none'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-tl-none'
                }`}
              >
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 p-3.5 bg-neutral-900 border border-neutral-800 rounded-2xl rounded-tl-none text-xs text-neutral-400">
              <Bot className="w-4 h-4 animate-spin text-gold" /> Prysel AI is thinking…
            </div>
          </div>
        )}
      </main>

      <footer className="pt-4 mt-6 border-t border-neutral-800">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 py-3 px-4 rounded-xl border border-neutral-800 bg-neutral-900 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700"
            value={input}
            placeholder="Ask Prysel AI a question..."
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-white text-black px-5 rounded-xl font-medium text-sm hover:bg-neutral-200 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </footer>
    </div>
  )
}

'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Paperclip,
  Globe,
  Lightbulb,
  MoreHorizontal,
  ArrowUp,
  X,
  Mic,
  MicOff,
  Sparkles,
} from 'lucide-react'

export function HomeChatInput() {
  const [text, setText] = useState('')
  const [isWebSearch, setIsWebSearch] = useState(false)
  const [isDeepThink, setIsDeepThink] = useState(false)
  const [attachment, setAttachment] = useState<string | null>(null)
  const [isListening, setIsListening] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSend = () => {
    if (!text.trim() && !attachment) {
      router.push('/chat-neuriy')
      return
    }
    const queryParam = encodeURIComponent(text.trim())
    router.push(`/chat-neuriy?q=${queryParam}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAttachment(e.target.files[0].name)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto md:mx-0 animate-fade-in relative z-20">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Input Container matching nchat UI design */}
      <div className="bg-white dark:bg-[#1e1e20] rounded-[28px] p-4 border border-neutral-200/80 dark:border-neutral-800 shadow-xl shadow-black/5 transition-all">
        {/* Active badges */}
        {(attachment || isWebSearch || isDeepThink || isListening) && (
          <div className="flex items-center gap-2 mb-2 flex-wrap text-xs">
            {isListening && (
              <span className="flex items-center gap-1.5 bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 px-3 py-1 rounded-full font-medium animate-pulse">
                <Mic className="w-3 h-3 text-red-500" />
                Listening...
                <button onClick={() => setIsListening(false)} className="hover:text-red-800 ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {attachment && (
              <span className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 px-3 py-1 rounded-full font-medium">
                📎 {attachment}
                <button onClick={() => setAttachment(null)} className="hover:text-red-500 ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {isWebSearch && (
              <span className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full font-medium">
                <Globe className="w-3 h-3" />
                Web Search Active
                <button onClick={() => setIsWebSearch(false)} className="hover:text-blue-800 ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {isDeepThink && (
              <span className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full font-medium">
                <Lightbulb className="w-3 h-3" />
                Deep Reasoning Mode
                <button onClick={() => setIsDeepThink(false)} className="hover:text-amber-800 ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Prysel AI anything..."
          rows={1}
          className="w-full bg-transparent resize-none outline-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-[15px] font-normal min-h-[36px] max-h-[140px] leading-relaxed"
        />

        {/* Action Row matching nchat */}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-100 dark:border-neutral-800/60">
          <div className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Attach file"
              className="p-1.5 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsWebSearch(!isWebSearch)}
              title="Toggle Web Search"
              className={`p-1.5 rounded-full transition-colors ${
                isWebSearch
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40'
                  : 'hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Globe className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsDeepThink(!isDeepThink)}
              title="Toggle Deep Reasoning"
              className={`p-1.5 rounded-full transition-colors ${
                isDeepThink
                  ? 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/40'
                  : 'hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Start Chat Action Button - Exact nchat pill style */}
            <button
              type="button"
              onClick={handleSend}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-semibold hover:opacity-90 transition-all hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer"
            >
              <span>Start chat</span>
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-[11.5px] text-neutral-400 dark:text-neutral-500 text-center mt-2.5 font-sans">
        Powered by Prysel AI Engine • Press Enter to chat
      </p>
    </div>
  )
}

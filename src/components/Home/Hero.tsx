'use client'

import React, { useState, useEffect } from 'react'
import { Wifi, Battery, Search, Sparkles } from 'lucide-react'
import { Face } from './Face'
import { HomeChatInput } from './HomeChatInput'
import { SearchModal } from '@/components/SearchModal'

export function Hero() {
  const [time, setTime] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formattedTime =
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }) +
        ' ' +
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      setTime(formattedTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full pt-2 md:pt-4 pb-8 md:pb-12 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 transition-colors overflow-hidden">
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Desktop PC Wallpaper Background & Subtle Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-20 dark:opacity-40 mix-blend-luminosity pointer-events-none"
        style={{ backgroundImage: 'url("/img/hero-bg.png")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-50/95 via-neutral-50/80 to-transparent dark:from-neutral-950/95 dark:via-neutral-950/80 dark:to-neutral-950/40 z-10 pointer-events-none" />

      {/* Main Grid Container */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
          {/* Left Column: Title & Chat Bar aligned left together */}
          <div className="col-span-1 md:col-span-7 space-y-4 text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold rounded-full tracking-widest uppercase">
              <Sparkles size={12} className="text-gold" />
              AGI Evolution
            </span>
            <h1 className="text-4xl md:text-[72px] font-black tracking-tighter text-neutral-900 dark:text-white leading-[0.92]">
              Prysel <span className="text-neutral-400 dark:text-neutral-500">Intelligence</span>
            </h1>

            {/* Left-Aligned Chat Bar close to heading text */}
            <div className="pt-2">
              <HomeChatInput />
            </div>
          </div>

          {/* Right Column: Mac Status Bar & Prysel Face Widget */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-center md:items-end justify-center space-y-3 pt-2">
            {/* MacOS Desktop Status Bar */}
            <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 font-mono text-xs bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <span className="flex items-center">
                <Wifi size={14} />
              </span>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center hover:opacity-60 transition cursor-pointer p-0.5"
                aria-label="Search"
              >
                <Search size={14} />
              </button>
              <span className="flex items-center rotate-90">
                <Battery size={16} />
              </span>
              <span className="font-semibold text-[11.5px] ml-1">{time || 'Wed, Aug 19 8:43 PM'}</span>
            </div>

            {/* Prysel Face Desktop Widget */}
            <div className="w-52 h-28 md:w-64 md:h-36 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[32px] flex flex-col items-center justify-center shadow-lg hover:scale-102 transition-transform cursor-pointer group">
              <div className="group-hover:scale-105 transition-transform">
                <Face />
              </div>
              <span className="mt-2 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">
                Prysel AI Core
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

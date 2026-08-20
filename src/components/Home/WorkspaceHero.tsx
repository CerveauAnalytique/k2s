'use client'

import React from 'react'
import Link from 'next/link'
import { Globe, ChevronLeft, ChevronRight, RotateCcw, Search, Terminal } from 'lucide-react'

export function WorkspaceHero() {
  return (
    <section className="relative w-full py-20 md:py-32 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 transition-colors overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side: Browser Workspace Mockup */}
        <div className="relative group order-2 md:order-1">
          <div className="w-full bg-neutral-50 dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            {/* Browser Toolbar */}
            <div className="bg-neutral-100 dark:bg-neutral-900 px-5 py-3.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="flex items-center space-x-3 text-neutral-400">
                <ChevronLeft size={16} />
                <ChevronRight size={16} />
                <RotateCcw size={16} />
              </div>
              <div className="flex-1 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3.5 py-1.5 flex items-center space-x-2.5 text-xs text-neutral-500 shadow-sm">
                <Globe size={14} className="text-blue-500" />
                <span className="flex-1 truncate font-mono text-[11px]">
                  prysel.com/builder/neural-workspace
                </span>
              </div>
            </div>

            {/* Generated Workspace Content */}
            <div className="aspect-[4/3] bg-neutral-100 dark:bg-neutral-950 p-6 relative overflow-hidden">
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Tools sidebar */}
                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm border border-neutral-200 dark:border-neutral-800 space-y-3">
                  <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full mb-4" />
                  <div className="space-y-2">
                    <div className="h-7 w-full bg-black dark:bg-white rounded-lg flex items-center px-3 text-[10px] text-white dark:text-black font-mono">
                      Neural Model v4
                    </div>
                    <div className="h-7 w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center px-3 text-[10px] text-neutral-400 font-mono">
                      Carbon Analytics API
                    </div>
                    <div className="h-7 w-full bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 flex items-center px-3 text-[10px] text-neutral-400 font-mono">
                      Predictive Vector DB
                    </div>
                  </div>
                </div>

                {/* Canvas Area */}
                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl flex items-center justify-center transform rotate-3 transition-transform group-hover:rotate-0 duration-500">
                    <Terminal size={36} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Prompt Bar Overlay */}
              <div className="absolute bottom-4 inset-x-4">
                <div className="bg-black/80 dark:bg-white/10 backdrop-blur-xl rounded-xl p-3 shadow-xl border border-neutral-700/50 flex items-center space-x-3">
                  <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Search size={14} />
                  </div>
                  <span className="text-xs text-neutral-300 dark:text-neutral-200 font-mono truncate">
                    &quot;Analyze spatial carbon footprint & generate report...&quot;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="space-y-8 order-1 md:order-2">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full tracking-widest uppercase">
              Web Intelligence
            </span>
            <h2 className="text-5xl md:text-[76px] font-black tracking-tighter text-neutral-900 dark:text-white leading-[0.95]">
              Browser <br />
              <span className="text-neutral-400 dark:text-neutral-500">Workspace</span>
            </h2>
          </div>
          <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
            Execute real-time data transformations, AI models, and custom research pipelines from a single intuitive workspace.
          </p>
          <div className="pt-2">
            <Link
              href="/research"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-2xl text-base font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all hover:scale-105 shadow-xl cursor-pointer"
            >
              Open Research Engine →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

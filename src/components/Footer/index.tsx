'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setSubscribed(true)
      setEmail('')
      setLoading(false)
      setTimeout(() => setSubscribed(false), 4000)
    }, 600)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans overflow-hidden transition-colors">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 relative z-10">
        {/* Left Column (Newsletter & Statement) */}
        <div className="col-span-1 border-b lg:border-b-0 lg:col-span-4 p-8 lg:p-12 lg:border-r border-neutral-200 dark:border-neutral-800 relative flex flex-col justify-between lg:min-h-[540px] bg-neutral-50 dark:bg-neutral-950">
          <div>
            <div className="absolute -top-2 -right-[5px] text-neutral-400 dark:text-neutral-700 text-lg hidden lg:block font-light">+</div>
            <div className="absolute -bottom-2 -right-[5px] text-neutral-400 dark:text-neutral-700 text-lg hidden lg:block font-light">+</div>
            
            <h2 className="text-[2.6rem] font-black tracking-tighter mb-4 leading-[1.05] text-black dark:text-white">
              Let&apos;s Build<br />Together
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-[13.5px] leading-relaxed mb-8 max-w-[300px] font-normal">
              Join our global network of developers, researchers, and enterprises deploying real-time analytical intelligence.
            </p>

            <form onSubmit={handleNewsletter} className="relative max-w-[320px] mb-12 shadow-sm rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="Enter email address*"
                className="w-full py-3.5 pl-5 pr-14 border-0 rounded-full outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 bg-transparent text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-[4px] top-[4px] w-[38px] h-[38px] bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center hover:opacity-80 transition disabled:opacity-50"
                aria-label="Subscribe to newsletter"
              >
                {subscribed ? <Check size={16} className="font-bold" /> : <ArrowRight size={16} />}
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium -mt-8 mb-6">
                ✓ Thank you for subscribing to Prysel.
              </p>
            )}
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
            System Operational • Node v18+ • Global Edge
          </div>
        </div>

        {/* Right Grid (Link Columns + Watermark) */}
        <div className="col-span-1 lg:col-span-8 relative flex flex-col bg-neutral-50 dark:bg-neutral-950">
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-neutral-200 dark:border-neutral-800 relative z-10">
            {/* Products Column */}
            <div className="relative p-6 md:p-8 border-b md:border-b-0 border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
              <div className="absolute -top-[12px] -right-[6px] text-neutral-400 dark:text-neutral-700 text-xl hidden md:block font-light">+</div>
              <div className="absolute -bottom-[12px] -right-[6px] text-neutral-400 dark:text-neutral-700 text-xl hidden md:block font-light">+</div>
              <h4 className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-6 font-bold uppercase tracking-widest">Products</h4>
              <ul className="space-y-3 text-[13px] font-medium text-neutral-700 dark:text-neutral-400">
                <li><Link href="/shop" className="hover:text-black dark:hover:text-white transition">Products Shop</Link></li>
                <li><Link href="/research" className="hover:text-black dark:hover:text-white transition">Neural Engine</Link></li>
                <li><Link href="/api" className="hover:text-black dark:hover:text-white transition">API Access</Link></li>
                <li><Link href="/dashboard" className="hover:text-black dark:hover:text-white transition">Analytics Workspace</Link></li>
              </ul>
            </div>

            {/* Platform Column */}
            <div className="relative p-6 md:p-8 border-b md:border-b-0 border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
              <div className="absolute -top-[12px] -right-[6px] text-neutral-400 dark:text-neutral-700 text-xl hidden md:block font-light">+</div>
              <div className="absolute -bottom-[12px] -right-[6px] text-neutral-400 dark:text-neutral-700 text-xl hidden md:block font-light">+</div>
              <h4 className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-6 font-bold uppercase tracking-widest">Platform</h4>
              <ul className="space-y-3 text-[13px] font-medium text-neutral-700 dark:text-neutral-400">
                <li><Link href="/docs/carbon" className="hover:text-black dark:hover:text-white transition">Carbon API</Link></li>
                <li><Link href="/docs/search" className="hover:text-black dark:hover:text-white transition">Search API</Link></li>
                <li><Link href="/docs/predict" className="hover:text-black dark:hover:text-white transition">Predictive API</Link></li>
                <li><Link href="/sdks" className="hover:text-black dark:hover:text-white transition">SDKs & Libraries</Link></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="relative p-6 md:p-8 border-b md:border-b-0 border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
              <div className="absolute -top-[12px] -right-[6px] text-neutral-400 dark:text-neutral-700 text-xl hidden md:block font-light">+</div>
              <div className="absolute -bottom-[12px] -right-[6px] text-neutral-400 dark:text-neutral-700 text-xl hidden md:block font-light">+</div>
              <h4 className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-6 font-bold uppercase tracking-widest">Resources</h4>
              <ul className="space-y-3 text-[13px] font-medium text-neutral-700 dark:text-neutral-400">
                <li><Link href="/docs" className="hover:text-black dark:hover:text-white transition">Documentation</Link></li>
                <li><Link href="/docs/quickstart" className="hover:text-black dark:hover:text-white transition">Quickstart</Link></li>
                <li><Link href="/community" className="hover:text-black dark:hover:text-white transition">Community</Link></li>
                <li><Link href="/status" className="hover:text-black dark:hover:text-white transition">System Status</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="relative p-6 md:p-8 flex flex-col">
              <h4 className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-6 font-bold uppercase tracking-widest">Company</h4>
              <ul className="space-y-3 text-[13px] font-medium text-neutral-700 dark:text-neutral-400">
                <li><Link href="/about" className="hover:text-black dark:hover:text-white transition">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-black dark:hover:text-white transition">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-black dark:hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-black dark:hover:text-white transition">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Watermark Zone */}
          <div className="relative flex-grow min-h-[220px] lg:min-h-[300px] flex items-center justify-center overflow-hidden">
            <div className="text-[14vw] lg:text-[9.5vw] font-black text-neutral-300/60 dark:text-neutral-800/40 select-none tracking-tighter whitespace-nowrap pointer-events-none transform translate-y-3">
              prysel.com
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-[1500px] mx-auto flex flex-col xl:flex-row justify-between items-center py-6 px-8 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 relative z-20 border-t border-neutral-200 dark:border-neutral-900 uppercase tracking-widest">
        <div className="mb-4 xl:mb-0 text-center xl:text-left">
          © 2026 Prysel, Inc. / All Rights Reserved
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/privacy" className="hover:text-black dark:hover:text-white transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-black dark:hover:text-white transition">Terms of Service</Link>
          <Link href="/security" className="hover:text-black dark:hover:text-white transition">Security</Link>
          <Link href="/cookies" className="hover:text-black dark:hover:text-white transition">Cookie Policy</Link>
        </div>
        <button
          className="hidden xl:flex items-center hover:text-black dark:hover:text-white border-l border-neutral-200 dark:border-neutral-800 pl-6 ml-6 transition"
          onClick={scrollToTop}
        >
          Top <ArrowUpRight className="ml-1" size={13} strokeWidth={2.5} />
        </button>
      </div>
    </footer>
  )
}

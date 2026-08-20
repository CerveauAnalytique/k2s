'use client'

import React, { useState } from 'react'
import type { Page } from '@/payload-types'
import { RichText } from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const PryselHero: React.FC<Page['hero']> = ({ links, richText }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleHintClick = (hintText: string) => {
    setSearchValue(hintText)
  }

  return (
    <>
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-grid" />

        <div className="hero-inner">
          {richText ? (
            <RichText data={richText} enableGutter={false} className="mb-6" />
          ) : (
            <h1>
              Research.<br />
            </h1>
          )}

          <p className="hero-sub">
            Prysel is the analytical AI built for teams who need answers, not approximations.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (searchValue) {
                window.location.href = `/shop?q=${encodeURIComponent(searchValue)}`
              }
            }}
            className="hero-search-wrap"
          >
            <span className="hero-search-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <input
              className="hero-search"
              type="text"
              placeholder="Ask Prysel anything…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="hero-search-right">
              <button type="submit" className="hero-search-btn">
                Ask →
              </button>
            </div>
          </form>

          <div className="hero-hints">
            <button
              type="button"
              className="hint-pill"
              onClick={() => handleHintClick('Analyse financial data')}
            >
              Analyse financial data
            </button>
            <button
              type="button"
              className="hint-pill"
              onClick={() => handleHintClick('Write research summaries')}
            >
              Write research summaries
            </button>
            <button
              type="button"
              className="hint-pill"
              onClick={() => handleHintClick('Build with the API')}
            >
              Build with the API
            </button>
            <button
              type="button"
              className="hint-pill"
              onClick={() => handleHintClick('Automate workflows')}
            >
              Automate workflows
            </button>
          </div>

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4 mt-8">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* LOGOS */}
      <div className="logos">
        <div className="logos-inner">
          <span className="logos-label">Trusted by</span>
          <span className="logo-item">Meridian</span>
          <span className="logo-item">Vantage</span>
          <span className="logo-item">Crestline</span>
          <span className="logo-item">Norvik</span>
          <span className="logo-item">Solara</span>
          <span className="logo-item">Halcyon</span>
        </div>
      </div>
    </>
  )
}

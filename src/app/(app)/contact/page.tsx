import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Contact — Prysel',
  description: 'Get in touch with the Prysel team.',
}

export default function ContactPage() {
  return (
    <div className="static-page">
      <div className="static-page-hero">
        <div className="static-container">
          <p className="static-eyebrow">Contact</p>
          <h1 className="static-title">Get in touch</h1>
          <p className="static-subtitle">
            Sales, partnerships, press, or just want to say hello — we read every message.
          </p>
        </div>
      </div>

      <div className="static-container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">General</span>
              <a href="mailto:hello@prysel.com" className="contact-email">
                hello@prysel.com
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Sales</span>
              <a href="mailto:sales@prysel.com" className="contact-email">
                sales@prysel.com
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Press</span>
              <a href="mailto:press@prysel.com" className="contact-email">
                press@prysel.com
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Security</span>
              <a href="mailto:security@prysel.com" className="contact-email">
                security@prysel.com
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={undefined}>
            <div className="contact-form-row">
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="name">Name</label>
                <input id="name" name="name" type="text" className="contact-form-input" placeholder="Your name" required />
              </div>
              <div className="contact-form-group">
                <label className="contact-form-label" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="contact-form-input" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="contact-form-group">
              <label className="contact-form-label" htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" className="contact-form-input" placeholder="How can we help?" required />
            </div>
            <div className="contact-form-group">
              <label className="contact-form-label" htmlFor="message">Message</label>
              <textarea id="message" name="message" className="contact-form-textarea" rows={6} placeholder="Tell us more…" required />
            </div>
            <button type="submit" className="btn-primary">Send message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

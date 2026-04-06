import { useEffect, useRef } from 'react'
import '../styles/Footer.css'

const NAV_LINKS = ['Project', 'Services', 'About', 'Contact']

const META = [
  { label: 'Status',   val: 'Available',    on: true  },
  { label: 'Location', val: 'Jakarta, ID',  on: false },
  { label: 'Response', val: '< 24 Hours',   on: false },
]

const SOCIALS = [
  {
    label: 'IG',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'TW',
    href: '#',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'LI',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'BE',
    href: '#',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.61 1.82 1.887 1.82.862 0 1.374-.369 1.582-.87h4.286zm-6.556-4.636c-.065-1.026-.67-1.624-1.664-1.624-.96 0-1.582.617-1.71 1.624h3.374zM3.811 17.204c1.56 0 2.254-.8 2.254-1.945 0-1.085-.694-1.803-2.254-1.803H2v3.748h1.811zm-.22-5.583c1.365 0 1.926-.6 1.926-1.608 0-.972-.56-1.536-1.926-1.536H2v3.144h1.591zM0 19.5V4.5h4.123c2.543 0 4.28 1.43 4.28 3.762 0 1.13-.476 2.154-1.426 2.729 1.302.508 2.022 1.66 2.022 3.109C9 16.697 7.088 19.5 4.196 19.5H0z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const wmarkRef = useRef(null)

  /* Infinite marquee via JS — CSS animation alternative */
  useEffect(() => {
    const el = wmarkRef.current
    if (!el) return
    let x = 0
    let raf
    const speed = 0.5
    const tick = () => {
      x -= speed
      if (Math.abs(x) >= el.scrollWidth / 2) x = 0
      el.style.transform = `translateX(${x}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const year = new Date().getFullYear()

  const WORDMARK_TEXT = 'LXY Creative Studio — Jakarta — '
  const repeated = WORDMARK_TEXT.repeat(6)

  return (
    <footer className="footer">

      {/* ── CTA Band ── */}
      <div className="footer__cta-band">
        <div className="footer__cta-band-left">
          <span className="footer__cta-label">Ready to start?</span>
          <h2 className="footer__cta-title">
            Let's build<br />
            something <em>great</em><br />
            together.
          </h2>
        </div>

        <div className="footer__cta-band-right">
          <a href="#contact" className="footer__cta-btn">
            Start a project
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          <div className="footer__cta-meta">
            {META.map(m => (
              <div className="footer__cta-meta-item" key={m.label}>
                <span className="footer__cta-meta-label">{m.label}</span>
                <span className={`footer__cta-meta-val${m.on ? ' footer__cta-meta-val--on' : ''}`}>
                  {m.on && <span className="footer__dot" />}
                  {m.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mid row ── */}
      <div className="footer__mid">
        <span className="footer__brand">LXY</span>

        <nav className="footer__nav" aria-label="Footer navigation">
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="footer__nav-link">{l}</a>
          ))}
        </nav>

        <div className="footer__socials">
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} className="footer__social" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="footer__bottom">
        <span className="footer__copy">© {year} LXY Creative Studio</span>
        <span className="footer__copy-right">All rights reserved</span>
      </div>

      {/* ── Scrolling wordmark ── */}
      <div className="footer__wordmark" aria-hidden="true">
        <span className="footer__wordmark-inner" ref={wmarkRef}>
          {repeated}
        </span>
      </div>

    </footer>
  )
}
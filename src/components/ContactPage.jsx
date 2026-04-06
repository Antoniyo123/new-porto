import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/ContactPage.css'

const PROJECT_TYPES = [
  { no: '01', name: 'Brand Identity & Logo',  tag: 'Branding' },
  { no: '02', name: 'Website Design & Build', tag: 'Digital'  },
  { no: '03', name: 'Mobile App UX/UI',       tag: 'Product'  },
  { no: '04', name: 'Motion & Film',          tag: 'Motion'   },
  { no: '05', name: 'Illustration & Art',     tag: 'Art'      },
  { no: '06', name: 'Design System',          tag: 'System'   },
]

const INFO = [
  { label: 'Response time', val: '< 24 hours',    sub: 'We reply to every inquiry, no exceptions.'      },
  { label: 'Project start',  val: '2–4 weeks',    sub: 'Typical lead time from first call to kickoff.'  },
  { label: 'Timezone',       val: 'WIB (UTC+7)',  sub: 'Jakarta — flexible for global clients.'          },
  { label: 'Engagement',     val: 'Project-based', sub: 'Fixed scope or ongoing retainer.'              },
]

const SOCIALS = [
  { label: 'IG', href: '#' },
  { label: 'LI', href: '#' },
  { label: 'BE', href: '#' },
  { label: 'TW', href: '#' },
]

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`ct${mounted ? ' ct--in' : ''}`}>

      {/* ══════════════════════════
          ① DARK — Hero + Options
      ══════════════════════════ */}
      <div className="ct__dark">

        {/* Hero */}
        <header className="ct__hero">
          <Link to="/" className="ct__back">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path d="M16 4L4 16M4 16h9M4 16V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>

          {/* <div className="ct__status">
            <span className="ct__status-dot" />
            Available for projects
          </div> */}

          <h1 className="ct__hero-title">
            <span>Let's</span>
            <span className="ct__outline">work</span>
            <span><em>together</em></span>
          </h1>

          <div className="ct__hero-strip">
            <div className="ct__hero-strip-item">
              <span className="ct__hero-strip-label">Email</span>
              <span className="ct__hero-strip-val">
                <a href="mailto:alexjor1997@gmail.com">alexjor1997@gmail.com</a>
              </span>
            </div>
            <div className="ct__hero-strip-item">
              <span className="ct__hero-strip-label">Based in</span>
              <span className="ct__hero-strip-val">Jakarta, Indonesia</span>
            </div>
            <div className="ct__hero-strip-item">
              <span className="ct__hero-strip-label">Working with</span>
              <span className="ct__hero-strip-val">Global clients</span>
            </div>
          </div>
        </header>

        {/* Two contact options */}
        <div className="ct__options">
          <div className="ct__option">
            <span className="ct__option-no">01 / Email us directly</span>
            <div className="ct__option-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
            </div>
            <h2 className="ct__option-title">Drop us<br />an email</h2>
            <p className="ct__option-desc">
              Tell us about your project — what you're building, your timeline,
              and any references. We'll reply within 24 hours with thoughts
              and clear next steps.
            </p>
            <a href="mailto:hello@lxy.co" className="ct__option-link">
              hello@lxy.co
              <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
                <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="ct__option">
            <span className="ct__option-no">02 / Talk directly</span>
            <div className="ct__option-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
              </svg>
            </div>
            <h2 className="ct__option-title">Schedule<br />a call</h2>
            <p className="ct__option-desc">
              Prefer to talk it through first? Reach us on WhatsApp or book
              a 30-minute intro call. We'll figure out together if we're
              the right fit.
            </p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="ct__option-link">
              WhatsApp us
              <svg width="11" height="11" viewBox="0 0 20 20" fill="none">
                <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </div>{/* end ct__dark */}


      {/* ══════════════════════════
          ② LIGHT — Types + Info + CTA
      ══════════════════════════ */}
      <div className="ct__light">

        {/* Project types */}
        <section className="ct__types">
          <div className="ct__types-header">
            <div>
              <p className="ct__section-label">What we take on</p>
              <h2 className="ct__types-title">
                Type of<br /><em>projects.</em>
              </h2>
            </div>
            <p className="ct__types-note">
              We keep our project load intentionally small to stay focused.
              Here's what we work best with.
            </p>
          </div>

          {PROJECT_TYPES.map(pt => (
            <div className="ct__type-item" key={pt.no}>
              <span className="ct__type-no">{pt.no}</span>
              <h3 className="ct__type-name">{pt.name}</h3>
              <span className="ct__type-tag">{pt.tag}</span>
            </div>
          ))}
        </section>

        {/* Practical info */}
        <div className="ct__info">
          {INFO.map(item => (
            <div className="ct__info-item" key={item.label}>
              <span className="ct__info-label">{item.label}</span>
              <span className="ct__info-val">{item.val}</span>
              <span className="ct__info-sub">{item.sub}</span>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <section className="ct__bottom">
          <div>
            <p className="ct__section-label">Ready to start?</p>
            <h2 className="ct__bottom-title">
              Send us<br />a <em>message.</em>
            </h2>
          </div>
          <div className="ct__bottom-right">
            <p className="ct__bottom-desc">
              No lengthy briefs required upfront. Just tell us what you're
              working on and where you're at — we'll take it from there.
            </p>
            <a href="mailto:alexjor1997@gmail.com" className="ct__bottom-email">
              alexjor1997@gmail.com
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <div className="ct__bottom-socials">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} className="ct__social" aria-label={s.label}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>{/* end ct__light */}

    </div>
  )
}
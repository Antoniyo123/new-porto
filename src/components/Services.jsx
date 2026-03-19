import { useState, useRef, useEffect } from 'react'
import '../styles/Services.css'

const SERVICES = [
  {
    no: '01', title: 'LOGO & BRANDING', tag: 'Identity',
    desc: 'Identity systems built to define and differentiate your brand across every touchpoint.',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=380&q=80&auto=format&fit=crop',
  },
  {
    no: '02', title: 'WEB DESIGN', tag: 'Digital',
    desc: 'Websites crafted with obsessive attention to detail — built to perform and built to impress.',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=380&q=80&auto=format&fit=crop',
  },
  {
    no: '03', title: 'MOBILE APP', tag: 'Product',
    desc: 'Native and cross-platform apps designed for clarity, speed, and real-world usability.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=380&q=80&auto=format&fit=crop',
  },
  {
    no: '04', title: 'ILLUSTRATION', tag: 'Art',
    desc: 'Custom illustrations that give your brand a distinct visual language and personality.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=380&q=80&auto=format&fit=crop',
  },
  {
    no: '05', title: 'DEVELOPMENT', tag: 'Engineering',
    desc: 'Fast, modern, production-ready builds. Clean code that scales with your business.',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14431b9?w=380&q=80&auto=format&fit=crop',
  },
]

const TESTIMONIALS = [
  {
    name: 'Martin Rosser', role: 'CEO, Pentlar',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&auto=format&fit=crop&crop=faces',
    quote: 'We are very happy to work with such an amazing team. Our working experience is great — they have a deep understanding of our brand vision and values, and are able to present them in creative and impressive designs.',
  },
  {
    name: 'Sarah Chen', role: 'Founder, Arkon Studio',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop&crop=faces',
    quote: 'The team transformed our entire brand identity in just a few weeks. Professional, creative, and incredibly detail-oriented. The results exceeded every expectation we had going in.',
  },
]

export default function Services() {
  const [active,  setActive]  = useState(null)
  const [visible, setVisible] = useState(false)
  const [tIdx,    setTIdx]    = useState(0)
  const [tFading, setTFading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef(null)

  /* Detect touch/mobile to switch hover→tap behaviour */
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(hover: none)').matches || window.innerWidth <= 960)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.04 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const switchTo = (next) => {
    if (next === tIdx) return
    setTFading(true)
    setTimeout(() => { setTIdx(next); setTFading(false) }, 280)
  }

  const prev = () => switchTo((tIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => switchTo((tIdx + 1) % TESTIMONIALS.length)
  const t = TESTIMONIALS[tIdx]

  /* On mobile: tap toggles. On desktop: hover controls. */
  const handleItemClick = (i) => {
    if (!isMobile) return
    setActive(prev => prev === i ? null : i)
  }

  return (
    <section
      id="services"
      ref={ref}
      className={`sv${visible ? ' sv--in' : ''}`}
    >
      {/* ── Header ── */}
      <div className="sv__header">
        <div className="sv__header-left">
          <p className="sv__eyebrow">
            <span className="sv__eyebrow-pip" />
            Our Services
          </p>
          <h2 className="sv__heading">OUR AREA OF<br />SPECIALIZATION</h2>
        </div>
        <p className="sv__header-count">
          <strong>{SERVICES.length}</strong> services available
        </p>
      </div>

      {/* ── Service rows ── */}
      <div className="sv__list">
        {SERVICES.map((s, i) => (
          <div
            key={s.no}
            className={`sv__item${active === i ? ' sv__item--on' : ''}`}
            onMouseEnter={() => !isMobile && setActive(i)}
            onMouseLeave={() => !isMobile && setActive(null)}
            onClick={() => handleItemClick(i)}
          >
            {/* Floating preview — desktop only */}
            <div className="sv__preview">
              <img src={s.img} alt={s.title} loading="lazy" />
            </div>

            {/* Main row */}
            <div className="sv__item-inner">
              <span className="sv__no">{s.no}</span>
              <h3 className="sv__title">{s.title}</h3>
              <p className="sv__desc">{s.desc}</p>
              <span className="sv__tag">{s.tag}</span>
              <div className="sv__arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/*
              ── Mobile accordion panel ──
              Only visible on ≤ 960px when item is active (tapped).
              CSS controls visibility — hidden on desktop.
            */}
            <div className="sv__mobile-panel">
              <div className="sv__mobile-panel-inner">
                <img
                  className="sv__mobile-img"
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                />
                <p className="sv__mobile-desc">{s.desc}</p>
                <span className="sv__mobile-tag">{s.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Testimonial ── */}
      <div className="sv__testimonial">
        <div className="sv__t-left">
          <div className="sv__t-avatar-wrap">
            <img className="sv__t-avatar" src={t.avatar} alt={t.name} />
          </div>
          <div className="sv__t-meta">
            <p className="sv__t-name">{t.name}</p>
            <p className="sv__t-role">{t.role}</p>
          </div>
          <div className="sv__t-nav">
            <button className="sv__t-btn" onClick={prev} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="sv__t-btn" onClick={next} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="sv__t-right">
          <span className="sv__t-mark" aria-hidden="true">"</span>
          <p className={`sv__t-quote${tFading ? ' sv__t-quote--out' : ''}`}>
            {t.quote}
          </p>
        </div>
      </div>
    </section>
  )
}
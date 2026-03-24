import { useState, useRef, useEffect, useCallback } from 'react'
import '../styles/Services.css'
import ServiceModal from './ServiceModal'

const SERVICES = [
  {
    no: '01', 
    title: 'WEB DEVELOPMENT', 
    tag: 'Digital',
    color: '#667eea',
    desc: 'Custom websites and web applications built with modern technologies. Fast, responsive, and designed to scale with your business.',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=380&q=80&auto=format&fit=crop',
  },
  {
    no: '02', 
    title: 'ILLUSTRATION', 
    tag: 'Creative',
    color: '#764ba2',
    desc: 'Custom illustrations that bring your brand to life. From digital art to hand-drawn concepts, we create unique visual storytelling.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=380&q=80&auto=format&fit=crop',
  },
  {
    no: '03', 
    title: 'MOTION & VISUAL', 
    tag: 'Animation',
    color: '#c9a84c',
    desc: 'Eye-catching motion graphics and visual effects. From animated logos to full video production, we make your content move.',
    img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=380&q=80&auto=format&fit=crop',
  },
  {
    no: '04', 
    title: 'PHOTOGRAPHY', 
    tag: 'Visual',
    color: '#a855f7',
    desc: 'Professional photography services for products, events, and branding. Capturing moments that tell your story perfectly.',
    img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=380&q=80&auto=format&fit=crop',
  },
]

const TESTIMONIALS = [
  {
    name: 'Michael Anderson', 
    role: 'CEO, TechVision',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&auto=format&fit=crop&crop=faces',
    quote: 'Brauss Networks delivered beyond our expectations. Their creative approach and technical expertise transformed our digital presence completely. The team is professional, responsive, and truly understands modern design.',
  },
  {
    name: 'Sarah Martinez', 
    role: 'Marketing Director, Innovate Co',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop&crop=faces',
    quote: 'Working with Brauss has been an absolute pleasure. From web development to visual content, every project is handled with exceptional creativity and attention to detail. They truly are a one-stop creative agency.',
  },
  {
    name: 'David Chen', 
    role: 'Founder, StartUp Hub',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop&crop=faces',
    quote: 'The motion graphics and photography work they produced for our campaign was outstanding. Brauss Networks brings fresh ideas and flawless execution to every project. Highly recommended!',
  },
]

export default function Services() {
  const [active,   setActive]   = useState(null)
  const [visible,  setVisible]  = useState(false)
  const [tIdx,     setTIdx]     = useState(0)
  const [tFading,  setTFading]  = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [modalSvc, setModalSvc] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(
      window.matchMedia('(hover: none)').matches || window.innerWidth <= 960
    )
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

  const handleMouseEnter = (i) => { if (!isMobile) setActive(i) }
  const handleMouseLeave = ()  => { if (!isMobile) setActive(null) }

  const handleItemClick = (i, s) => {
    if (isMobile) {
      // First tap → expand accordion. Second tap → open modal.
      if (active === i) {
        setModalSvc(s)
      } else {
        setActive(prev => prev === i ? null : i)
      }
    } else {
      setModalSvc(s)
    }
  }

  const openModal  = useCallback((s) => setModalSvc(s), [])
  const closeModal = useCallback(() => setModalSvc(null), [])

  return (
    <>
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
            <h2 className="sv__heading">CREATIVE SOLUTIONS<br />FOR YOUR BRAND</h2>
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
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleItemClick(i, s)}
            >
              <div className="sv__preview">
                <img src={s.img} alt={s.title} loading="lazy" />
              </div>

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

              {/* Mobile accordion */}
              <div className="sv__mobile-panel">
                <div className="sv__mobile-panel-inner">
                  <img className="sv__mobile-img" src={s.img} alt={s.title} loading="lazy" />
                  <p className="sv__mobile-desc">{s.desc}</p>
                  <button
                    className="sv__mobile-detail-btn"
                    onClick={(e) => { e.stopPropagation(); openModal(s) }}
                  >
                    See full details ↗
                  </button>
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

      <ServiceModal service={modalSvc} onClose={closeModal} />
    </>
  )
}